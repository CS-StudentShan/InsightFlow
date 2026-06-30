"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Products by Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? <div className="h-48 bg-gray-100 animate-pulse rounded"></div> : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Units Sold</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{product.description}</TableCell>
                  <TableCell className="text-right">{product.units_sold}</TableCell>
                  <TableCell className="text-right">£{product.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}