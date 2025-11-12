import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useState } from "react";
import { toast } from "sonner";

export function GalleryModal({ onClose }: { onClose?: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "past",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    // basic validation
    if (!form.title || !form.date || !form.image) {
      toast.error("Please fill required fields");
      return;
    }
    try {
      setLoading(true);
      // TODO: call backend to store gallery item
      // await apiService.post("/api/admin/gallery", form);
      toast.success("Gallery photo added successfully!");
      setForm({ title: "", description: "", date: "", category: "past", image: "" });
      onClose?.();
    } catch (err: any) {
      toast.error(err?.message || "Failed to add photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6 mt-4">
      <div>
        <Label htmlFor="photo-title">Photo Title *</Label>
        <Input id="photo-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-2 h-12" />
      </div>

      <div>
        <Label htmlFor="photo-description">Description *</Label>
        <Textarea id="photo-description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="mt-2" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="photo-date">Event Date *</Label>
          <Input id="photo-date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required className="mt-2 h-12" />
        </div>

        <div>
          <Label htmlFor="photo-category">Category *</Label>
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger id="photo-category" className="mt-2 h-12">
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
        <Label htmlFor="photo-url">Photo URL *</Label>
        <div className="flex gap-2 mt-2">
          <Input id="photo-url" type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required className="flex-1 h-12" />
          <Button type="button" variant="outline" className="h-12 px-6" onClick={() => toast("Implement upload flow")}>
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white">
        Add to Gallery
      </Button>
    </form>
  );
}
