import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Palette, RotateCcw } from 'lucide-react';

interface ColorCustomizerProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onColorsChange: (colors: { primary: string; secondary: string; accent: string }) => void;
}

const presetColors = [
  { name: 'Blue', primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' },
  { name: 'Purple', primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
  { name: 'Green', primary: '#10B981', secondary: '#047857', accent: '#34D399' },
  { name: 'Orange', primary: '#F59E0B', secondary: '#D97706', accent: '#FBB040' },
  { name: 'Pink', primary: '#EC4899', secondary: '#DB2777', accent: '#F472B6' },
  { name: 'Red', primary: '#EF4444', secondary: '#DC2626', accent: '#F87171' },
];

export const ColorCustomizer = ({ colors, onColorsChange }: ColorCustomizerProps) => {
  const [customColors, setCustomColors] = useState(colors);

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', value: string) => {
    const newColors = { ...customColors, [colorType]: value };
    setCustomColors(newColors);
    onColorsChange(newColors);
  };

  const applyPreset = (preset: typeof presetColors[0]) => {
    setCustomColors(preset);
    onColorsChange(preset);
  };

  const resetToDefault = () => {
    const defaultColors = { primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' };
    setCustomColors(defaultColors);
    onColorsChange(defaultColors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Custom Color Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex items-center gap-2">
              <input
                id="primary-color"
                type="color"
                value={customColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-12 h-10 rounded border border-input cursor-pointer"
              />
              <div className="flex-1 text-sm font-mono text-muted-foreground">
                {customColors.primary}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <div className="flex items-center gap-2">
              <input
                id="secondary-color"
                type="color"
                value={customColors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-12 h-10 rounded border border-input cursor-pointer"
              />
              <div className="flex-1 text-sm font-mono text-muted-foreground">
                {customColors.secondary}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accent-color">Accent Color</Label>
            <div className="flex items-center gap-2">
              <input
                id="accent-color"
                type="color"
                value={customColors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-12 h-10 rounded border border-input cursor-pointer"
              />
              <div className="flex-1 text-sm font-mono text-muted-foreground">
                {customColors.accent}
              </div>
            </div>
          </div>
        </div>

        {/* Preset Colors */}
        <div className="space-y-3">
          <Label>Color Presets</Label>
          <div className="grid grid-cols-2 gap-2">
            {presetColors.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="flex items-center gap-2 justify-start"
              >
                <div className="flex gap-1">
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: preset.secondary }}
                  />
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: preset.accent }}
                  />
                </div>
                <span className="text-xs">{preset.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={resetToDefault}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  );
};