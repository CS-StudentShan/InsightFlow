"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#1F6F5C", "#C75D3A", "#9B9484", "#3D3A34", "#5DCAA5", "#D85A30", "#888780", "#26215C"];

export default function CategoryChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://insightflow-api-fh3o.onrender.com/categories")
      .then((res) => res.json())
      .then((data) => { setData(data); setLoading(false); });
  }, []);

  return (
    <div
      className="rounded-lg p-5"
      style={{ background: "#fff", border: "1px solid #3D3A3414" }}
    >
      <h3
        className="text-[15px] mb-4"
        style={{ fontFamily: "var(--font-display)", color: "#3D3A34" }}
      >
        Revenue by category
      </h3>
      {loading ? (
        <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="revenue" nameKey="category" cx="50%" cy="50%" outerRadius={80}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`£${value}`, "Revenue"]} />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-mono-data)" }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}