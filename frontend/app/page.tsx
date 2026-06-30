import KpiCards from "@/components/KpiCards";
import RevenueChart from "@/components/RevenueChart";
import TopProductsTable from "@/components/TopProductsTable";
import CategoryChart from "@/components/CategoryChart";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">InsightFlow</h1>
<p className="text-gray-500 mt-1">Real-time retail intelligence, simplified.</p>
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