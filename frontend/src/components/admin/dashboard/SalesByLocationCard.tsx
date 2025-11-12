import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../../ui/card";
import { useState } from "react";

export function SalesByLocationCard() {
  const [analyticsData] = useState({
    salesByLocation: [
      { location: "New York", sales: 45200, percentage: 36 },
      { location: "Los Angeles", sales: 32500, percentage: 26 },
      { location: "Chicago", sales: 25100, percentage: 20 },
      { location: "Miami", sales: 15800, percentage: 12 },
      { location: "Others", sales: 7247, percentage: 6 },
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Location</CardTitle>
        <CardDescription>Top performing regions</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {analyticsData.salesByLocation.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-sm">{item.location}</span>
                <span className="text-sm">${item.sales.toLocaleString()} ({item.percentage}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary_green" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
