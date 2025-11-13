import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { toast } from "sonner";
import {apiService} from "../../../services/api";
import { Product } from "@/types";
import { MoreHorizontal } from "lucide-react";
import ConfirmDeleteModal from "../../../components/admin/ConfirmDeleteModal";
import { getImageUrl } from "../../../utils/imageUrl";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get<{ data: Product[] }>("/api/admin/products");
      setProducts(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch products.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => navigate("/admin/products/add");

 const handleEditProduct = (id: string) => navigate(`/admin/products/edit/${id}`);

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await apiService.delete(`/api/admin/products/${selectedProduct._id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch {
      toast.error("Failed to delete product.");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const filteredProducts = Array.isArray(products) ? products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (categoryFilter ? p.category === categoryFilter : true)) : [];

  const categories = [...new Set(Array.isArray(products) ? products.map((p) => p.category) : [])];

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Button onClick={handleAddProduct} style={{ backgroundColor: "#2FF924" }}>
          Add Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              {categoryFilter || "Filter by category"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setCategoryFilter("")}>All Categories</DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No products found.</TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                  </TableCell>

                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.sellingPrice.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditProduct(product._id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteProduct(product)} className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedProduct && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          productName={selectedProduct.name}
        />
      )}
    </div>
  );
};

export default AdminProducts;
