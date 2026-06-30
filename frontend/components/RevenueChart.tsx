"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://insightflow-api-fh3o.onrender.com/revenue-over-time")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="rounded-lg p-5" style={{ background: "#fff", border: "1px solid #3D3A3414" }}>
      <h3 className="text-[15px] mb-4" style={{ fontFamily: "var(--font-display)", color: "#3D3A34" }}>
        Revenue over time
      </h3>
      {loading ? (
        <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3D3A3414" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "var(--font-mono-data)", fill: "#9B9484" }} />
            <YAxis tick={{ fontSize: 11, fontFamily: "var(--font-mono-data)", fill: "#9B9484" }} />
            <Tooltip formatter={(value) => [`£${value}`, "Revenue"]} />
            <Line type="monotone" dataKey="revenue" stroke="#1F6F5C" strokeWidth={2} dot={{ fill: "#1F6F5C" }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}