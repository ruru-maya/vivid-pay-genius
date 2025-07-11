import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from 'lucide-react';
import { BusinessData } from '../../PageGenerator';

interface VisualBrandingSlideProps {
  formData: BusinessData;
  setFormData: (data: BusinessData | ((prev: BusinessData) => BusinessData)) => void;
}

export const VisualBrandingSlide = ({ formData, setFormData }: VisualBrandingSlideProps) => {
  const colorPresets = [
    { primary: '#6366f1', secondary: '#8b5cf6', name: 'Purple' },
    { primary: '#0ea5e9', secondary: '#06b6d4', name: 'Blue' },
    { primary: '#10b981', secondary: '#059669', name: 'Green' },
    { primary: '#f59e0b', secondary: '#d97706', name: 'Orange' },
    { primary: '#ef4444', secondary: '#dc2626', name: 'Red' },
    { primary: '#8b5cf6', secondary: '#7c3aed', name: 'Violet' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Visual Branding</h2>
        <p className="text-lg text-muted-foreground">
          Choose colors that represent your brand
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5 text-purple" />
            Color Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Color Presets</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {colorPresets.map((preset, index) => (
                <button 
                  key={index} 
                  type="button" 
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    colors: {
                      primary: preset.primary,
                      secondary: preset.secondary
                    }
                  }))} 
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.colors.primary === preset.primary 
                      ? 'ring-2 ring-opacity-30' 
                      : 'hover:opacity-75'
                  }`} 
                  style={{
                    borderColor: preset.primary,
                    color: preset.primary,
                    ...(formData.colors.primary === preset.primary && {
                      backgroundColor: `${preset.primary}10`,
                      ringColor: preset.primary
                    })
                  }}
                >
                  <div className="flex justify-center space-x-1 mb-2">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: preset.primary }} 
                    />
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: preset.secondary }} 
                    />
                  </div>
                  <p className="text-xs font-medium">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Custom Colors</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <Label htmlFor="primaryColor" className="text-xs">Primary</Label>
                <div className="flex items-center space-x-2">
                  <input 
                    id="primaryColor" 
                    type="color" 
                    value={formData.colors.primary} 
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      colors: { ...prev.colors, primary: e.target.value }
                    }))} 
                    className="w-8 h-8 rounded border" 
                  />
                  <Input 
                    value={formData.colors.primary} 
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      colors: { ...prev.colors, primary: e.target.value }
                    }))} 
                    className="text-xs" 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="secondaryColor" className="text-xs">Secondary</Label>
                <div className="flex items-center space-x-2">
                  <input 
                    id="secondaryColor" 
                    type="color" 
                    value={formData.colors.secondary} 
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      colors: { ...prev.colors, secondary: e.target.value }
                    }))} 
                    className="w-8 h-8 rounded border" 
                  />
                  <Input 
                    value={formData.colors.secondary} 
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      colors: { ...prev.colors, secondary: e.target.value }
                    }))} 
                    className="text-xs" 
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};