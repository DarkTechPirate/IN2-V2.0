import { useState } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Image as ImageIcon, Upload } from "lucide-react";
import { GalleryModal } from "./GalleryModal";

/**
 * Action bar for admin. NOTE: Add Product button removed per request.
 */
export function ActionBar() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <div className="flex gap-4 mb-8">
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-12 px-6 border-2 border-primary_green text-primary_green hover:bg-primary_green hover:text-white" style={{ fontFamily: "Inter, sans-serif" }}>
            <ImageIcon className="w-4 h-4 mr-2" />
            Add Gallery Photo
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "Poppins, sans-serif" }}>Add Gallery Photo</DialogTitle>
          </DialogHeader>
          <GalleryModal onClose={() => setGalleryOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
