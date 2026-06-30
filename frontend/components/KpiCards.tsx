"use client";
import { useEffect, useState } from "react";

interface KPIs {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  avg_order_value: number;
}

export default function KpiCards() {
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://insightflow-api-fh3o.onrender.com/kpis")
        .then((res) => res.json())
        .then((data) => {
          setKpis(data);
          setLoading(false);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: "Revenue", value: kpis ? `£${kpis.total_revenue.toLocaleString()}` : "—", rule: "#1F6F5C" },
    { label: "Orders", value: kpis ? kpis.total_orders.toLocaleString() : "—", rule: "#9B9484" },
    { label: "Customers", value: kpis ? kpis.total_customers.toLocaleString() : "—", rule: "#9B9484" },
    { label: "Avg order", value: kpis ? `£${kpis.avg_order_value.toLocaleString()}` : "—", rule: "#C75D3A" },
  ];

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 rounded-lg overflow-hidden"
      style={{ background: "#0B0D0E" }}
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className="p-5"
          style={{ borderRight: i < 3 ? "1px solid #ffffff14" : "none" }}
        >
          {loading ? (
            <div className="h-10 bg-white/10 rounded animate-pulse"></div>
          ) : (
            <>
              <p
                className="text-[11px] uppercase tracking-widest mb-1.5"
                style={{ color: "#9B9484", fontFamily: "var(--font-mono-data)" }}
              >
                {m.label}
              </p>
              <p
                className="text-[22px] font-medium"
                style={{ color: "#F7F5F0", fontFamily: "var(--font-mono-data)" }}
              >
                {m.value}
              </p>
              <div className="h-0.5 w-7 mt-2" style={{ background: m.rule }}></div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}