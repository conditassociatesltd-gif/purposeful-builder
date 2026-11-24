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
      return rows[0] as BookOrder;
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
