import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { toast } from "sonner";
import { apiService } from "../../../services/api";

export function AddProductPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    costPrice: "",
    sellingPrice: "",
    stock: "",
    sizes: "",
    colors: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [media, setMedia] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();

    // Append text values
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    // Append main image
    if (image) {
      data.append("image", image);
    }

    // Append gallery images
    if (media.length > 0) {
      media.forEach((file) => data.append("media", file));
    }

    try {
      await apiService.post("/api/admin/products", data);
      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="costPrice">Cost Price</Label>
            <Input
              id="costPrice"
              type="number"
              value={form.costPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="sellingPrice">Selling Price</Label>
            <Input
              id="sellingPrice"
              type="number"
              value={form.sellingPrice}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* 🔵 Sizes */}
        <div>
          <Label htmlFor="sizes">Sizes (comma separated)</Label>
          <Input
            id="sizes"
            placeholder="e.g. S, M, L, XL"
            value={form.sizes}
            onChange={handleChange}
          />
        </div>

        {/* 🔵 Colors */}
        <div>
          <Label htmlFor="colors">Colors (comma separated)</Label>
          <Input
            id="colors"
            placeholder="e.g. Red, Blue, Black"
            value={form.colors}
            onChange={handleChange}
          />
        </div>

        {/* 🟢 MAIN IMAGE UPLOAD */}
        <div>
          <Label htmlFor="image">Main Product Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            required
          />
        </div>

        {/* 🟣 MULTIPLE MEDIA UPLOAD */}
        <div>
          <Label htmlFor="media">Gallery Images (Max 6)</Label>
          <Input
            id="media"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setMedia(Array.from(e.target.files || []))}
          />
          {media.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {media.length} images selected
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: "#2FF924" }}
          >
            {isLoading ? "Saving..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
