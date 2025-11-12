import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { useProducts } from "../../ProductContext";
import { TrendingUp, TrendingDown } from "lucide-react";

export function ProductPerformanceTable({ selectedMonth, setSelectedMonth }: { selectedMonth: string; setSelectedMonth: (m: string) => void; }) {
  const { products } = useProducts();

  // build months list from products
  const availableMonths = Array.from(new Set(products.flatMap((p: any) => (p.monthlySales || []).map((m: any) => m.month)))).sort().reverse();

  const getSalesFor = (product: any) => {
    if (selectedMonth === "all") return product.soldCount || 0;
    return product.monthlySales?.find((m: any) => m.month === selectedMonth)?.units || 0;
  };

  const rows = products
    .map((p: any) => ({ ...p, filteredSales: getSalesFor(p) }))
    .filter((p: any) => p.filteredSales > 0)
    .sort((a: any, b: any) => b.filteredSales - a.filteredSales);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Products Performance</CardTitle>
            <CardDescription>Individual product sales and profitability</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="month-filter" className="text-sm whitespace-nowrap">Filter by Month:</label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger id="month-filter" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                {availableMonths.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Units Sold</TableHead>
                <TableHead className="text-right">Cost Price</TableHead>
                <TableHead className="text-right">Selling Price</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Margin</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((product: any) => {
                const units = product.filteredSales;
                const revenue = product.sellingPrice * units;
                const cost = product.costPrice * units;
                const profit = revenue - cost;

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div>{product.name}</div>
                          <div className="text-xs text-gray-500">Added {product.addedDate}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="capitalize">{product.category}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {units}
                        {selectedMonth === "all" ? (
                          units > 150 ? <TrendingUp className="w-4 h-4 text-green-600" /> :
                          units < 100 ? <TrendingDown className="w-4 h-4 text-red-600" /> : null
                        ) : (
                          units > 30 ? <TrendingUp className="w-4 h-4 text-green-600" /> :
                          units < 15 ? <TrendingDown className="w-4 h-4 text-red-600" /> : null
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-right text-gray-600">${product.costPrice}</TableCell>
                    <TableCell className="text-right">${product.sellingPrice}</TableCell>
                    <TableCell className="text-right">${revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-primary_green">${profit.toLocaleString()}</TableCell>
                    <TableCell className="text-right"><span className={product.profitMargin > 100 ? "text-primary_green" : ""}>{product.profitMargin.toFixed(1)}%</span></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
