import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { motion } from 'motion/react';
import { Package, Image as ImageIcon, Plus, DollarSign, Percent, Upload, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useProducts } from './ProductContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function AdminDashboard() {
  const { products, addProduct } = useProducts();
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: '',
    costPrice: '',
    sellingPrice: '',
    sizes: '',
    colors: '',
    image: '',
  });

  // Gallery Form State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    date: '',
    category: 'past',
    image: '',
  });

  // Generate list of available months from all products
  const availableMonths = Array.from(
    new Set(
      products.flatMap(p => p.monthlySales.map(ms => ms.month))
    )
  ).sort().reverse();

  // Get sales data for selected month
  const getProductSalesForMonth = (product: any, month: string) => {
    if (month === 'all') {
      return product.soldCount;
    }
    const monthData = product.monthlySales.find((ms: any) => ms.month === month);
    return monthData ? monthData.units : 0;
  };

  // Calculate analytics data based on selected month
  const calculateAnalytics = () => {
    let totalRevenue = 0;
    let totalCost = 0;
    let totalUnitsSold = 0;

    products.forEach(p => {
      const units = getProductSalesForMonth(p, selectedMonth);
      totalRevenue += p.sellingPrice * units;
      totalCost += p.costPrice * units;
      totalUnitsSold += units;
    });

    const totalProfit = totalRevenue - totalCost;
    const overallProfitMargin = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

    return { totalRevenue, totalCost, totalProfit, overallProfitMargin, totalUnitsSold };
  };

  const { totalRevenue, totalCost, totalProfit, overallProfitMargin, totalUnitsSold } = calculateAnalytics();

  // Mock analytics data for time-based charts
  const [analyticsData] = useState({
    salesByTime: [
      { period: 'Jan 2024', sales: 8500 },
      { period: 'Feb 2024', sales: 12300 },
      { period: 'Mar 2024', sales: 15700 },
      { period: 'Apr 2024', sales: 18200 },
      { period: 'May 2024', sales: 21400 },
      { period: 'Jun 2024', sales: 24100 },
    ],
    salesByLocation: [
      { location: 'New York', sales: 45200, percentage: 36 },
      { location: 'Los Angeles', sales: 32500, percentage: 26 },
      { location: 'Chicago', sales: 25100, percentage: 20 },
      { location: 'Miami', sales: 15800, percentage: 12 },
      { location: 'Others', sales: 7247, percentage: 6 },
    ],
    salesByPrice: [
      { range: '$0-$50', sales: 15400 },
      { range: '$51-$100', sales: 38200 },
      { range: '$101-$150', sales: 42500 },
      { range: '$151-$200', sales: 21747 },
      { range: '$200+', sales: 8000 },
    ],
  });

  const calculateProfitPercentage = () => {
    const cost = parseFloat(productForm.costPrice);
    const selling = parseFloat(productForm.sellingPrice);
    if (cost && selling && selling > cost) {
      return (((selling - cost) / cost) * 100).toFixed(2);
    }
    return '0';
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cost = parseFloat(productForm.costPrice);
    const selling = parseFloat(productForm.sellingPrice);
    const profitMargin = ((selling - cost) / cost) * 100;

    addProduct({
      name: productForm.name,
      description: productForm.description,
      category: productForm.category,
      costPrice: cost,
      sellingPrice: selling,
      profitMargin: profitMargin,
      sizes: productForm.sizes.split(',').map(s => s.trim()),
      colors: productForm.colors.split(',').map(c => c.trim()),
      image: productForm.image,
    });

    toast.success('Product added successfully and is now live in the shop!');
    setProductForm({
      name: '',
      description: '',
      category: '',
      costPrice: '',
      sellingPrice: '',
      sizes: '',
      colors: '',
      image: '',
    });
    setProductDialogOpen(false);
  };

  const handleAddGalleryPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Gallery photo added successfully!');
    setGalleryForm({
      title: '',
      description: '',
      date: '',
      category: 'past',
      image: '',
    });
    setGalleryDialogOpen(false);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 
            className="mb-2"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Admin Dashboard
          </h1>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Manage products, gallery, and view analytics
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="h-12 px-6 bg-primary_green hover:bg-[#26d41f] text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Package className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Add New Product</DialogTitle>
                <DialogDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                  Enter product details to add to the shop
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-6 mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="product-name" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Product Name *
                    </Label>
                    <Input
                      id="product-name"
                      type="text"
                      placeholder="Elite Performance Tee"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      required
                      className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Category *
                    </Label>
                    <Select
                      value={productForm.category}
                      onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                    >
                      <SelectTrigger className="mt-2 h-12" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tops">Tops</SelectItem>
                        <SelectItem value="bottoms">Bottoms</SelectItem>
                        <SelectItem value="outerwear">Outerwear</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="product-description" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Product Description *
                  </Label>
                  <Textarea
                    id="product-description"
                    placeholder="Describe the product features, materials, and benefits..."
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    required
                    rows={3}
                    className="mt-2 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="cost-price" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Cost Price *
                    </Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="cost-price"
                        type="number"
                        step="0.01"
                        placeholder="50.00"
                        value={productForm.costPrice}
                        onChange={(e) => setProductForm({ ...productForm, costPrice: e.target.value })}
                        required
                        className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="selling-price" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Selling Price *
                    </Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="selling-price"
                        type="number"
                        step="0.01"
                        placeholder="89.00"
                        value={productForm.sellingPrice}
                        onChange={(e) => setProductForm({ ...productForm, sellingPrice: e.target.value })}
                        required
                        className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label style={{ fontFamily: 'Inter, sans-serif' }}>
                      Profit Margin
                    </Label>
                    <div className="relative mt-2">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary_green" />
                      <Input
                        type="text"
                        value={calculateProfitPercentage() + '%'}
                        disabled
                        className="pl-10 h-12 bg-primary_green/10 border-primary_green text-primary_green"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="sizes" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Available Sizes *
                    </Label>
                    <Input
                      id="sizes"
                      type="text"
                      placeholder="S, M, L, XL"
                      value={productForm.sizes}
                      onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                      required
                      className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Available Colors *
                    </Label>
                    <Input
                      id="colors"
                      type="text"
                      placeholder="Black, White, Gray"
                      value={productForm.colors}
                      onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                      required
                      className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="product-image" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Product Image URL *
                  </Label>
                  <Input
                    id="product-image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    required
                    className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={galleryDialogOpen} onOpenChange={setGalleryDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-12 px-6 border-2 border-primary_green text-primary_green hover:bg-primary_green hover:text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Add Gallery Photo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Add Gallery Photo</DialogTitle>
                <DialogDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                  Upload photos from events and activities
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddGalleryPhoto} className="space-y-6 mt-4">
                <div>
                  <Label htmlFor="photo-title" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Photo Title *
                  </Label>
                  <Input
                    id="photo-title"
                    type="text"
                    placeholder="IN2 Launch Event 2024"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    required
                    className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <Label htmlFor="photo-description" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Description (One Line) *
                  </Label>
                  <Textarea
                    id="photo-description"
                    placeholder="A brief description of the event or photo"
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    required
                    rows={2}
                    className="mt-2 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="photo-date" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Event Date *
                    </Label>
                    <Input
                      id="photo-date"
                      type="date"
                      value={galleryForm.date}
                      onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                      required
                      className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="photo-category" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Category *
                    </Label>
                    <Select
                      value={galleryForm.category}
                      onValueChange={(value) => setGalleryForm({ ...galleryForm, category: value })}
                    >
                      <SelectTrigger className="mt-2 h-12" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="past">Past Event</SelectItem>
                        <SelectItem value="upcoming">Upcoming Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="photo-url" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Photo URL *
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="photo-url"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={galleryForm.image}
                      onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                      required
                      className="flex-1 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 px-6"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Gallery
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Analytics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>Total Revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  From {totalUnitsSold} units sold
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>Total Units Sold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {totalUnitsSold}
                </div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Across {products.length} products
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>Total Profit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1 text-primary_green" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  ${totalProfit.toLocaleString()}
                </div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Revenue - Cost
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>Overall Profit Margin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1 text-primary_green" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {overallProfitMargin.toFixed(1)}%
                </div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Weighted average
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Products Performance Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Products Performance</CardTitle>
                  <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                    Individual product sales and profitability
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="month-filter" className="text-sm whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Filter by Month:
                  </Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger id="month-filter" className="w-[180px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" style={{ fontFamily: 'Inter, sans-serif' }}>All Time</SelectItem>
                      {availableMonths.map(month => {
                        const date = new Date(month + '-01');
                        const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                        return (
                          <SelectItem key={month} value={month} style={{ fontFamily: 'Inter, sans-serif' }}>
                            {monthName}
                          </SelectItem>
                        );
                      })}
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
                      <TableHead style={{ fontFamily: 'Inter, sans-serif' }}>Product Name</TableHead>
                      <TableHead style={{ fontFamily: 'Inter, sans-serif' }}>Category</TableHead>
                      <TableHead className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>Units Sold</TableHead>
                      <TableHead className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>Cost Price</TableHead>
                      <TableHead className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>Selling Price</TableHead>
                      <TableHead className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>Revenue</TableHead>
                      <TableHead className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>Profit</TableHead>
                      <TableHead className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .map(product => ({
                        ...product,
                        filteredSales: getProductSalesForMonth(product, selectedMonth),
                      }))
                      .filter(product => product.filteredSales > 0) // Only show products with sales in selected period
                      .sort((a, b) => b.filteredSales - a.filteredSales)
                      .map((product) => {
                        const units = product.filteredSales;
                        const revenue = product.sellingPrice * units;
                        const cost = product.costPrice * units;
                        const profit = revenue - cost;
                        
                        return (
                          <TableRow key={product.id}>
                            <TableCell style={{ fontFamily: 'Inter, sans-serif' }}>
                              <div className="flex items-center gap-3">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div>
                                  <div>{product.name}</div>
                                  <div className="text-xs text-gray-500">Added {product.addedDate}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="capitalize" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {product.category}
                            </TableCell>
                            <TableCell className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>
                              <div className="flex items-center justify-end gap-1">
                                {units}
                                {selectedMonth === 'all' ? (
                                  units > 150 ? (
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                  ) : units < 100 ? (
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                  ) : null
                                ) : (
                                  units > 30 ? (
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                  ) : units < 15 ? (
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                  ) : null
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                              ${product.costPrice}
                            </TableCell>
                            <TableCell className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>
                              ${product.sellingPrice}
                            </TableCell>
                            <TableCell className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>
                              ${revenue.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right text-primary_green" style={{ fontFamily: 'Inter, sans-serif' }}>
                              ${profit.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right" style={{ fontFamily: 'Inter, sans-serif' }}>
                              <span className={product.profitMargin > 100 ? 'text-primary_green' : ''}>
                                {product.profitMargin.toFixed(1)}%
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Sales by Time */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Sales by Time Period</CardTitle>
              <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                Monthly sales performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.salesByTime.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item.period}
                    </div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary_green transition-all duration-500"
                        style={{ width: `${(item.sales / 25000) * 100}%` }}
                      />
                    </div>
                    <div className="w-20 text-right" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ${item.sales.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sales by Location */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Sales by Location</CardTitle>
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                  Top performing regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.salesByLocation.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.location}
                        </span>
                        <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          ${item.sales.toLocaleString()} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary_green"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales by Price Range */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Sales by Price Range</CardTitle>
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                  Revenue distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.salesByPrice.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {item.range}
                      </div>
                      <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary_green transition-all duration-500"
                          style={{ width: `${(item.sales / 45000) * 100}%` }}
                        />
                      </div>
                      <div className="w-20 text-right text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        ${item.sales.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
