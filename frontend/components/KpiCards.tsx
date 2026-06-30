"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    fetch("https://insightflow-api-fh3o.onrender.com/kpis") 
      .then((res) => res.json())
      .then((data) => {
        setKpis(data);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader><div className="h-4 bg-gray-200 rounded w-24"></div></CardHeader>
          <CardContent><div className="h-8 bg-gray-200 rounded w-32"></div></CardContent>
        </Card>
      ))}
    </div>
  );

  const metrics = [
    { title: "Total Revenue", value: `£${kpis?.total_revenue.toLocaleString()}`, color: "text-green-600" },
    { title: "Total Orders", value: kpis?.total_orders.toLocaleString(), color: "text-blue-600" },
    { title: "Total Customers", value: kpis?.total_customers.toLocaleString(), color: "text-purple-600" },
    { title: "Avg Order Value", value: `£${kpis?.avg_order_value.toLocaleString()}`, color: "text-orange-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}