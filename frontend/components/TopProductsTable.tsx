"use client";
import { useEffect, useState } from "react";

interface Product {
  description: string;
  units_sold: number;
  revenue: number;
}

export default function TopProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://insightflow-api-fh3o.onrender.com/top-products")
      .then((res) => res.json())
      .then((data) => { setProducts(data); setLoading(false); });
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
        Top 10 products by revenue
      </h3>
      {loading ? (
        <div className="h-48 bg-gray-100 animate-pulse rounded"></div>
      ) : (
        <table className="w-full" style={{ fontFamily: "var(--font-mono-data)", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #3D3A3422" }}>
              <th className="text-left py-2" style={{ color: "#9B9484", fontWeight: 400 }}>Product</th>
              <th className="text-right py-2" style={{ color: "#9B9484", fontWeight: 400 }}>Units sold</th>
              <th className="text-right py-2" style={{ color: "#9B9484", fontWeight: 400 }}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i} style={{ borderBottom: i < products.length - 1 ? "1px solid #3D3A3414" : "none" }}>
                <td className="py-2.5" style={{ color: "#3D3A34" }}>{product.description}</td>
                <td className="py-2.5 text-right" style={{ color: "#3D3A34" }}>{product.units_sold}</td>
                <td className="py-2.5 text-right" style={{ color: "#1F6F5C", fontWeight: 500 }}>
                  £{product.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}