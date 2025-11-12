import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../../ui/card";
import { useState } from "react";

export function SalesByPriceCard() {
  const [analyticsData] = useState({
    salesByPrice: [
      { range: "$0-$50", sales: 15400 },
      { range: "$51-$100", sales: 38200 },
      { range: "$101-$150", sales: 42500 },
      { range: "$151-$200", sales: 21747 },
      { range: "$200+", sales: 8000 },
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Price Range</CardTitle>
        <CardDescription>Revenue distribution</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {analyticsData.salesByPrice.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-600">{item.range}</div>
              <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary_green" style={{ width: `${(item.sales / 45000) * 100}%` }} />
              </div>
              <div className="w-20 text-right text-sm">${item.sales.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
