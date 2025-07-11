import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from 'lucide-react';
import { BusinessData } from '../../PageGenerator';
import { removeBackground, loadImage } from '@/lib/backgroundRemoval';
import { useToast } from "@/hooks/use-toast";

interface ImagesSlideProps {
  formData: BusinessData;
  setFormData: (data: BusinessData | ((prev: BusinessData) => BusinessData)) => void;
}

export const ImagesSlide = ({ formData, setFormData }: ImagesSlideProps) => {
  const { toast } = useToast();
  const [processingImages, setProcessingImages] = useState<Set<number>>(new Set());

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
    const newImages = validFiles.map(file => ({ file, type: 'home-bg' as const }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5)
    }));
  };

  const handleTypeChange = async (index: number, newType: 'logo' | 'home-bg') => {
    const currentImage = formData.images[index];
    
    // Just update type without background removal
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, type: newType } : img
      )
    }));
    
    if (newType === 'logo') {
      toast({
        title: "Logo set",
        description: "Image has been set as logo."
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Images & Logo</h2>
        <p className="text-lg text-muted-foreground">
          Upload images for your landing page (optional)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5 text-purple" />
            Upload Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="border-2 border-dashed border-purple/30 rounded-lg p-6 text-center hover:border-purple/50 transition-colors" 
            onDragOver={e => {
              e.preventDefault();
              e.currentTarget.classList.add('border-primary', 'bg-primary/5');
            }} 
            onDragLeave={e => {
              e.preventDefault();
              e.currentTarget.classList.remove('border-primary', 'bg-primary/5');
            }} 
            onDrop={e => {
              e.preventDefault();
              e.currentTarget.classList.remove('border-primary', 'bg-primary/5');
              const files = Array.from(e.dataTransfer.files).filter(
                file => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
              );
              if (files.length > 0) {
                processFiles(files);
              }
            }}
          >
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag & drop images here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Supports JPG, PNG, WebP • Max 5MB per file • Up to 5 files
            </p>
            <input 
              type="file" 
              multiple 
              accept="image/jpeg,image/png,image/webp" 
              className="hidden" 
              id="imageUpload" 
              onChange={e => {
                if (e.target.files) {
                  const files = Array.from(e.target.files).filter(file => file.size <= 5 * 1024 * 1024);
                  processFiles(files);
                }
              }} 
            />
            <Button 
              type="button" 
              variant="outline" 
              className="mt-2 text-purple/50 border-purple/50 hover:bg-purple hover:text-white hover:border-purple" 
              onClick={() => document.getElementById('imageUpload')?.click()}
            >
              Choose Files
            </Button>
          </div>
          
          {formData.images.length > 0 && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {formData.images.length} file(s) selected
                </p>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFormData(prev => ({ ...prev, images: [] }))} 
                  className="text-xs"
                >
                  Clear all
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                {formData.images.map((imageData, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <img 
                        src={URL.createObjectURL(imageData.file)} 
                        alt={`Upload preview ${index + 1}`} 
                        className="w-8 h-8 object-cover rounded border flex-shrink-0" 
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate">{imageData.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(imageData.file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                      <Select 
                        value={imageData.type} 
                        onValueChange={(value) => handleTypeChange(index, value as 'logo' | 'home-bg')}
                        disabled={processingImages.has(index)}
                      >
                        <SelectTrigger className="w-20 h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="logo">Logo</SelectItem>
                          <SelectItem value="home-bg">Home BG</SelectItem>
                        </SelectContent>
                      </Select>
                      {processingImages.has(index) && (
                        <div className="text-xs text-muted-foreground">Processing...</div>
                      )}
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index)
                        }));
                      }} 
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
              
              {formData.images.length >= 5 && (
                <p className="text-xs text-muted-foreground">
                  Maximum of 5 files reached
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};