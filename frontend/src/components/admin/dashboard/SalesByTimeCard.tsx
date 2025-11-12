import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../../ui/card";
import { useState } from "react";

export function SalesByTimeCard() {
  // small static dataset to illustrate — replace with real data if available
  const [analyticsData] = useState({
    salesByTime: [
      { period: "Jan 2024", sales: 8500 },
      { period: "Feb 2024", sales: 12300 },
      { period: "Mar 2024", sales: 15700 },
      { period: "Apr 2024", sales: 18200 },
      { period: "May 2024", sales: 21400 },
      { period: "Jun 2024", sales: 24100 },
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Time Period</CardTitle>
        <CardDescription>Monthly sales performance</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {analyticsData.salesByTime.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-600">{item.period}</div>
              <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary_green" style={{ width: `${(item.sales / 25000) * 100}%` }} />
              </div>
              <div className="w-20 text-right">${item.sales.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
