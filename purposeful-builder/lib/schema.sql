-- Schema for "The Boy and Addictions" Book Orders
-- Compatible with Neon Postgres / Supabase / Vercel Postgres

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

-- Index for fast order lookups and admin sorting
CREATE INDEX IF NOT EXISTS idx_book_orders_ref ON book_orders (order_reference);
CREATE INDEX IF NOT EXISTS idx_book_orders_type ON book_orders (order_type);
CREATE INDEX IF NOT EXISTS idx_book_orders_created ON book_orders (created_at DESC);
