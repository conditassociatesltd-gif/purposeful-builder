"use client";

import { useState } from "react";
import { Download, RefreshCw, Lock, Shield, Package, Heart, DollarSign } from "lucide-react";
import { BookOrder } from "@/lib/db";

export default function AdminOrdersPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<BookOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "personal" | "outreach">("all");

  const fetchOrders = async (pwdToUse?: string) => {
    const pwd = pwdToUse || password;
    if (!pwd) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/orders?password=${encodeURIComponent(pwd)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Incorrect admin password.");
      }

      setOrders(data.orders || []);
      setAuthenticated(true);
    } catch (err: any) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(password);
  };

  // Metrics
  const personalCopies = orders
    .filter((o) => o.order_type === "personal")
    .reduce((sum, o) => sum + (o.copies || 0), 0);

  const outreachCopies = orders
    .filter((o) => o.order_type === "outreach")
    .reduce((sum, o) => sum + (o.copies || 0), 0);

  const totalCopies = personalCopies + outreachCopies;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

  // Filtered orders
  const displayedOrders = orders.filter((o) => {
    if (filter === "all") return true;
    return o.order_type === filter;
  });

  // Export CSV
  const downloadCSV = () => {
    if (orders.length === 0) return;

    const headers = [
      "Order Reference",
      "Order Type",
      "Full Name",
      "Phone",
      "Email",
      "Copies",
      "Unit Price (NGN)",
      "Total Amount (NGN)",
      "Street",
      "City",
      "State",
      "Country",
      "Status",
      "Date (UTC)",
    ];

    const rows = orders.map((o) => [
      `"${o.order_reference}"`,
      `"${o.order_type}"`,
      `"${(o.full_name || "").replace(/"/g, '""')}"`,
      `"${(o.phone || "").replace(/"/g, '""')}"`,
      `"${(o.email || "").replace(/"/g, '""')}"`,
      o.copies,
      o.unit_price,
      o.total_amount,
      `"${(o.street || "").replace(/"/g, '""')}"`,
      `"${(o.city || "").replace(/"/g, '""')}"`,
      `"${(o.state || "").replace(/"/g, '""')}"`,
      `"${(o.country || "Nigeria").replace(/"/g, '""')}"`,
      `"${(o.status || "").replace(/"/g, '""')}"`,
      `"${o.created_at || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `book_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If not authenticated, show password screen
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-5">
        <div className="w-full max-w-md p-8 bg-white dark:bg-[#161616] rounded-xl border border-black/10 dark:border-white/10 shadow-lg">
          <div className="flex items-center gap-3 mb-6 text-[#c4572a]">
            <Lock size={28} />
            <h1 className="font-serif text-2xl font-bold text-black dark:text-white">Admin Dashboard</h1>
          </div>
          <p className="text-sm opacity-70 mb-6">
            Enter your admin password to view and manage book orders for <em>The Boy and Addictions</em>.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Admin Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-sm focus:border-[#c4572a] outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md font-bold uppercase tracking-wider text-xs text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--rust)" }}
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <main className="min-h-screen py-12 px-5 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c4572a] font-bold mb-1">
            <Shield size={14} /> Admin Console
          </div>
          <h1 className="font-serif text-3xl md:text-4xl">Book Orders & Outreach</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchOrders()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-black/20 dark:border-white/20 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button
            onClick={downloadCSV}
            disabled={orders.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 shadow-sm"
            style={{ background: "var(--rust)" }}
          >
            <Download size={14} /> Download CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* Personal Copies */}
        <div className="p-6 bg-white dark:bg-[#161616] rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider opacity-60 font-semibold">Personal Copies</span>
            <Package size={20} className="text-[#c4572a]" />
          </div>
          <div className="font-serif text-3xl font-bold">{personalCopies}</div>
          <p className="text-xs opacity-60 mt-1">For direct delivery</p>
        </div>

        {/* Outreach Copies */}
        <div className="p-6 bg-white dark:bg-[#161616] rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider opacity-60 font-semibold">Outreach Copies</span>
            <Heart size={20} className="text-rose-500" />
          </div>
          <div className="font-serif text-3xl font-bold text-rose-500">{outreachCopies}</div>
          <p className="text-xs opacity-60 mt-1">Sponsored for secondary schools</p>
        </div>

        {/* Total Copies */}
        <div className="p-6 bg-white dark:bg-[#161616] rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider opacity-60 font-semibold">Total Copies</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">{orders.length} orders</span>
          </div>
          <div className="font-serif text-3xl font-bold">{totalCopies}</div>
          <p className="text-xs opacity-60 mt-1">Combined total volume</p>
        </div>

        {/* Total Value */}
        <div className="p-6 bg-white dark:bg-[#161616] rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider opacity-60 font-semibold">Total Revenue</span>
            <DollarSign size={20} className="text-emerald-500" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            ₦{totalRevenue.toLocaleString()}
          </div>
          <p className="text-xs opacity-60 mt-1">Total order value</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-black/10 dark:border-white/10 pb-3">
        {(["all", "personal", "outreach"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
              filter === tab
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {tab === "all" ? `All (${orders.length})` : tab === "personal" ? `Personal (${orders.filter(o => o.order_type === "personal").length})` : `Outreach (${orders.filter(o => o.order_type === "outreach").length})`}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#161616] rounded-xl border border-black/10 dark:border-white/10 shadow-sm overflow-hidden">
        {displayedOrders.length === 0 ? (
          <div className="p-12 text-center opacity-60 text-sm">
            No orders found matching the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 dark:bg-white/5 text-[11px] uppercase tracking-wider font-semibold opacity-75">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Copies</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 font-sans">
                {displayedOrders.map((o) => (
                  <tr key={o.order_reference} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono font-bold text-xs text-[#c4572a]">
                      {o.order_reference}
                    </td>
                    <td className="p-4">
                      {o.order_type === "personal" ? (
                        <span className="inline-block px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          Personal
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                          Outreach
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold">{o.full_name}</div>
                      <div className="text-xs opacity-60">{o.phone} · {o.email}</div>
                    </td>
                    <td className="p-4 font-bold">
                      {o.copies}
                    </td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      ₦{o.total_amount?.toLocaleString()}
                    </td>
                    <td className="p-4 text-xs opacity-80">
                      {o.order_type === "personal" ? (
                        <span>{o.city || "—"}, {o.state || "—"}</span>
                      ) : (
                        <span className="italic text-rose-500">School Outreach (Jan 2027)</span>
                      )}
                    </td>
                    <td className="p-4 text-xs opacity-60 whitespace-nowrap">
                      {o.created_at ? new Date(o.created_at).toLocaleDateString("en-GB") : "Just now"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
