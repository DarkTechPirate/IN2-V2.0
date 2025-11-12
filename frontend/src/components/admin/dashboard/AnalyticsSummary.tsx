import { Card, CardContent, CardHeader, CardDescription } from "../../ui/card";
import { useProducts } from "../../ProductContext";

export function AnalyticsSummary({ selectedMonth }: { selectedMonth: string }) {
  const { products } = useProducts();

  // compute totals
  let totalRevenue = 0;
  let totalCost = 0;
  let totalUnitsSold = 0;

  products.forEach((p: any) => {
    const units = selectedMonth === "all" ? p.soldCount : (p.monthlySales?.find((m: any) => m.month === selectedMonth)?.units || 0);
    totalRevenue += p.sellingPrice * units;
    totalCost += p.costPrice * units;
    totalUnitsSold += units;
  });

  const totalProfit = totalRevenue - totalCost;
  const overallProfitMargin = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-1">${totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-gray-600">From {totalUnitsSold} units sold</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Units Sold</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-1">{totalUnitsSold}</div>
          <p className="text-xs text-gray-600">Across {products.length} products</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Profit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-1 text-primary_green">${totalProfit.toLocaleString()}</div>
          <p className="text-xs text-gray-600">Revenue - Cost</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Overall Profit Margin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-1 text-primary_green">{overallProfitMargin.toFixed(1)}%</div>
          <p className="text-xs text-gray-600">Weighted average</p>
        </CardContent>
      </Card>
    </div>
  );
}
