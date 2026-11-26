import { neon } from "@neondatabase/serverless";

export interface BookOrder {
  id?: number;
  order_reference: string;
  order_type: "personal" | "outreach";
  full_name: string;
  phone: string;
  email: string;
  copies: number;
  unit_price: number;
  total_amount: number;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  status?: string;
  created_at?: string;
  paid_at?: string | null;
  payment_method?: string | null; // "paystack" or "bank_transfer"
}

// In-memory fallback if DATABASE_URL is not set yet in Vercel
const fallbackOrders: BookOrder[] = [];

/**
 * Returns a Neon SQL execution instance if DATABASE_URL is configured
 */
function getDbClient() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;
  return neon(dbUrl);
}

/**
 * Ensures the book_orders table exists
 */
export async function ensureTableExists(): Promise<void> {
  const sql = getDbClient();
  if (!sql) return;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS book_orders (
        id SERIAL PRIMARY KEY,
        order_reference VARCHAR(50) UNIQUE NOT NULL,
        order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('personal', 'outreach')),
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        copies INTEGER NOT NULL CHECK (copies >= 1),
        unit_price INTEGER NOT NULL,
        total_amount INTEGER NOT NULL,
        street TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(50) DEFAULT 'Nigeria',
        status VARCHAR(50) DEFAULT 'pending_payment',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    // Added later: when and how the order was paid (safe to run on an existing table)
    await sql`ALTER TABLE book_orders ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE;`;
    await sql`ALTER TABLE book_orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(30);`;
  } catch (error) {
    console.error("Error creating book_orders table:", error);
  }
}

/**
 * Save a new order to the database
 */
export async function saveOrder(order: BookOrder): Promise<BookOrder> {
  const sql = getDbClient();

  if (sql) {
    try {
      await ensureTableExists();
      const rows = await sql`
        INSERT INTO book_orders (
          order_reference,
          order_type,
          full_name,
          phone,
          email,
          copies,
          unit_price,
          total_amount,
          street,
          city,
          state,
          country,
          status
        ) VALUES (
          ${order.order_reference},
          ${order.order_type},
          ${order.full_name},
          ${order.phone},
          ${order.email},
          ${order.copies},
          ${order.unit_price},
          ${order.total_amount},
          ${order.street || null},
          ${order.city || null},
          ${order.state || null},
          ${order.country || "Nigeria"},
          ${order.status || "pending_payment"}
        )
        RETURNING *;
      `;
      if (rows && rows.length > 0) {
        return rows[0] as BookOrder;
      }
    } catch (err) {
      console.error("Neon DB insert error, saving to memory fallback:", err);
    }
  }

  // Fallback to memory store if no DATABASE_URL or query failed
  const fallbackOrder: BookOrder = {
    ...order,
    id: fallbackOrders.length + 1,
    created_at: new Date().toISOString(),
  };
  fallbackOrders.unshift(fallbackOrder);
  return fallbackOrder;
}

/**
 * Retrieve a single order by reference
 */
export async function getOrderByReference(order_reference: string): Promise<BookOrder | null> {
  const sql = getDbClient();

  if (sql) {
    try {
      await ensureTableExists();
      const rows = await sql`
        SELECT * FROM book_orders WHERE order_reference = ${order_reference} LIMIT 1;
      `;
      if (rows && rows.length > 0) {
        return rows[0] as BookOrder;
      }
    } catch (err) {
      console.error("Neon DB fetch by ref error:", err);
    }
  }

  const found = fallbackOrders.find((o) => o.order_reference === order_reference);
  return found || null;
}

/**
 * Update order status (e.g. 'paid_and_confirmed')
 */
export async function updateOrderStatus(order_reference: string, newStatus: string): Promise<BookOrder | null> {
  const sql = getDbClient();

  if (sql) {
    try {
      await ensureTableExists();
      const rows = await sql`
        UPDATE book_orders
        SET status = ${newStatus}
        WHERE order_reference = ${order_reference}
        RETURNING *;
      `;
      if (rows && rows.length > 0) {
        return rows[0] as BookOrder;
      }
    } catch (err) {
      console.error("Neon DB update status error:", err);
    }
  }

  const order = fallbackOrders.find((o) => o.order_reference === order_reference);
  if (order) {
    order.status = newStatus;
    return order;
  }
  return null;
}

/**
 * Retrieve all orders for the admin dashboard
 */
export async function getAllOrders(): Promise<BookOrder[]> {
  const sql = getDbClient();

  if (sql) {
    try {
      await ensureTableExists();
      const rows = await sql`
        SELECT * FROM book_orders ORDER BY created_at DESC;
      `;
      return rows as BookOrder[];
    } catch (err) {
      console.error("Neon DB fetch error, using memory fallback:", err);
    }
  }

  return [...fallbackOrders];
}

/** Statuses that mean "this order has been paid" */
export const PAID_STATUSES = ["paid_and_confirmed", "confirmed"];

/**
 * Mark an order as paid. Safe to call many times, and safe if Paystack's webhook and the
 * customer's redirect arrive at the same moment: only ONE caller ever gets changed = true,
 * so only one set of confirmation emails is sent.
 */
export async function markOrderPaid(
  order_reference: string,
  method: "paystack" | "bank_transfer"
): Promise<{ order: BookOrder | null; changed: boolean }> {
  const sql = getDbClient();

  if (sql) {
    try {
      await ensureTableExists();
      const updated = (await sql`
        UPDATE book_orders
        SET status = 'paid_and_confirmed', paid_at = CURRENT_TIMESTAMP, payment_method = ${method}
        WHERE order_reference = ${order_reference}
          AND status NOT IN ('paid_and_confirmed', 'confirmed')
        RETURNING *;
      `) as BookOrder[];
      if (updated && updated.length > 0) return { order: updated[0], changed: true };

      // Nothing changed: either it was already paid, or the reference does not exist
      const existing = (await sql`
        SELECT * FROM book_orders WHERE order_reference = ${order_reference} LIMIT 1;
      `) as BookOrder[];
      return { order: existing && existing.length > 0 ? existing[0] : null, changed: false };
    } catch (err) {
      console.error("Neon DB markOrderPaid error, trying memory fallback:", err);
    }
  }

  const found = fallbackOrders.find((o) => o.order_reference === order_reference);
  if (!found) return { order: null, changed: false };
  if (found.status && PAID_STATUSES.includes(found.status)) return { order: found, changed: false };
  found.status = "paid_and_confirmed";
  found.paid_at = new Date().toISOString();
  found.payment_method = method;
  return { order: found, changed: true };
}
