import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import { apiService } from "../../../services/api";
import { Product } from "@/types";
import { getImageUrl } from "../../../utils/imageUrl";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Product>>({});
  const [image, setImage] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewMedia, setPreviewMedia] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement | null>(null);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiService.get(`/api/admin/products/${id}`);

        const product = res.data;

        setForm(product);
        setPreviewImage(getImageUrl(product.image));
        setPreviewMedia(product.media?.map((m: string) => getImageUrl(m)) || []);
      } catch {
        toast.error("Failed to load product.");
        navigate("/admin/products");
      }
    };
    fetchProduct();
  }, [id]);

  // Handle text inputs
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Scroll thumbnails
  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailRef.current) {
      const amt = direction === "left" ? -200 : 200;
      thumbnailRef.current.scrollBy({ left: amt, behavior: "smooth" });
    }
  };

  // Submit update
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();

    // Add form fields
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        data.append(key, value.toString());
      }
    });

    if (image) data.append("image", image);
    mediaFiles.forEach((file) => data.append("media", file));

    try {
      await apiService.put(`/api/admin/products/${id}`, data);
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch {
      toast.error("Failed to update product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-16">

        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/admin/products")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* ------------------------- LEFT: IMAGE GALLERY ------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* MAIN IMAGE */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={previewImage}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Scroll */}
            {previewMedia.length > 0 && (
              <div className="relative w-full mt-6">
                {/* Left arrow */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full shadow"
                  onClick={() => scrollThumbnails("left")}
                >
                  <ChevronLeft />
                </Button>

                <div
                  ref={thumbnailRef}
                  className="flex gap-4 overflow-x-auto px-10 scrollbar-hide"
                >
                  {previewMedia.map((m, idx) => (
                    <div
                      key={idx}
                      className="w-24 h-24 rounded-xl overflow-hidden border cursor-pointer"
                      onClick={() => setPreviewImage(m)}
                    >
                      <img src={m} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Right arrow */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full shadow"
                  onClick={() => scrollThumbnails("right")}
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </motion.div>

          {/* ------------------------- RIGHT: FORM ------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-semibold mb-6">Edit Product</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Name */}
              <div>
                <Label>Name</Label>
                <Input id="name" value={form.name || ""} onChange={handleChange} />
              </div>

              {/* Description */}
              <div>
                <Label>Description</Label>
                <Textarea id="description" value={form.description || ""} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Input id="category" value={form.category || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input id="stock" type="number" value={form.stock || ""} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cost Price</Label>
                  <Input id="costPrice" type="number" value={form.costPrice || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Selling Price</Label>
                  <Input id="sellingPrice" type="number" value={form.sellingPrice || ""} onChange={handleChange} />
                </div>
              </div>

              {/* Main image upload */}
              <div>
                <Label>Change Main Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>

              {/* Media upload */}
              <div>
                <Label>Upload Additional Images</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setMediaFiles(files);
                    setPreviewMedia(files.map((f) => URL.createObjectURL(f)));
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline" onClick={() => navigate("/admin/products")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-primary_green">
                  {isLoading ? "Saving..." : "Update Product"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
