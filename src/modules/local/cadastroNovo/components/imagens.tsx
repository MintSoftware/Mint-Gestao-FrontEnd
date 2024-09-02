import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export function Imagens({ images, currentImageIndex, handleImageUpload, setCurrentImageIndex }: any) {
  return (
    <TabsContent value="imagens" className="space-y-4">
      <div className="flex justify-center">
        <Label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex items-center justify-center w-32 h-32 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </Label>
      </div>
      {images.length > 0 && (
        <div className="relative">
          <div className="overflow-hidden rounded-lg aspect-video">
            <img
              src={images[currentImageIndex]}
              alt={`Imagem ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setCurrentImageIndex((prev: number) => (prev === 0 ? images.length - 1 : prev - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setCurrentImageIndex((prev: number) => (prev === images.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </TabsContent>
  );
}