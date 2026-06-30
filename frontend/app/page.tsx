import KpiCards from "@/components/KpiCards";
import RevenueChart from "@/components/RevenueChart";
import TopProductsTable from "@/components/TopProductsTable";
import CategoryChart from "@/components/CategoryChart";

export default function Home() {
  return (
    <main className="min-h-screen p-8" style={{ background: "#F7F5F0" }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="flex justify-between items-baseline mb-6 pb-4"
          style={{ borderBottom: "1px solid #3D3A3422" }}
        >
          <div>
            <h1
              className="text-3xl font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "#3D3A34", letterSpacing: "-0.5px" }}
            >
              InsightFlow
            </h1>
            <p
              className="text-xs uppercase tracking-widest mt-1"
              style={{ color: "#9B9484", fontFamily: "var(--font-mono-data)" }}
            >
              Retail intelligence ledger
            </p>
          </div>
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: "#9B9484", fontFamily: "var(--font-mono-data)" }}
          >
            Updated live
          </p>
        </div>
        <KpiCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RevenueChart />
          <CategoryChart />
        </div>
        <div className="mt-6">
          <TopProductsTable />
        </div>
      </div>
    </main>
  );
}