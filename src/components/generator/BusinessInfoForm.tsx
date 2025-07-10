import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Palette, ArrowRight, Lightbulb, Wallet } from 'lucide-react';
import { BusinessData } from '../PageGenerator';
interface BusinessInfoFormProps {
  onSubmit: (data: BusinessData) => void;
}
export const BusinessInfoForm = ({
  onSubmit
}: BusinessInfoFormProps) => {
  const [formData, setFormData] = useState<BusinessData>({
    businessName: '',
    description: '',
    price: '',
    currency: 'USD',
    availability: '',
    industry: '',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6'
    },
    images: []
  });
  const industries = ['Travel & Tourism', 'Professional Services', 'E-commerce', 'Events & Experiences', 'Education & Training', 'Health & Wellness', 'Creative Services', 'Consulting', 'Technology', 'Food & Beverage', 'Real Estate', 'Financial Services'];
  const currencies = [{
    code: 'USD',
    symbol: '$',
    name: 'US Dollar'
  }, {
    code: 'EUR',
    symbol: '€',
    name: 'Euro'
  }, {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound'
  }, {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar'
  }, {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar'
  }, {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen'
  }, {
    code: 'CHF',
    symbol: 'Fr',
    name: 'Swiss Franc'
  }];
  const colorPresets = [{
    primary: '#6366f1',
    secondary: '#8b5cf6',
    name: 'Purple'
  }, {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    name: 'Blue'
  }, {
    primary: '#10b981',
    secondary: '#059669',
    name: 'Green'
  }, {
    primary: '#f59e0b',
    secondary: '#d97706',
    name: 'Orange'
  }, {
    primary: '#ef4444',
    secondary: '#dc2626',
    name: 'Red'
  }, {
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    name: 'Violet'
  }];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.businessName && formData.description && formData.price) {
      onSubmit(formData);
    }
  };
  const examples = {
    'Travel & Tourism': {
      name: 'Sunset Paradise Tours',
      description: 'Experience the magic of Bali with our exclusive 7-day cultural immersion tour. Includes luxury accommodations, private guides, and authentic local experiences.',
      price: '2,499',
      availability: 'Limited to 12 guests per tour'
    },
    'Professional Services': {
      name: 'Strategic Business Consulting',
      description: 'Transform your business with our comprehensive 90-day growth strategy program. Includes market analysis, competitive research, and implementation roadmap.',
      price: '4,999',
      availability: 'Only 5 spots available this quarter'
    },
    'Creative Services': {
      name: 'Premium Brand Photography',
      description: 'Elevate your brand with professional photography that tells your story. Full day shoot with 50+ edited images and commercial usage rights.',
      price: '1,200',
      availability: 'Booking 3-4 weeks in advance'
    }
  };
  const handleExampleFill = (industry: string) => {
    const example = examples[industry as keyof typeof examples];
    if (example) {
      setFormData(prev => ({
        ...prev,
        businessName: example.name,
        description: example.description,
        price: example.price,
        availability: example.availability,
        industry
      }));
    }
  };
  return <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Tell Us About Your Business</h2>
        <p className="text-lg text-muted-foreground">
          Our AI will analyze your information to create the perfect landing page
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-purple" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={value => setFormData(prev => ({
                  ...prev,
                  industry: value
                }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  {formData.industry && examples[formData.industry as keyof typeof examples] && <Button type="button" variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => handleExampleFill(formData.industry)}>
                      Fill with {formData.industry} example
                    </Button>}
                </div>

                <div>
                  <Label htmlFor="businessName">Product/Service Name *</Label>
                  <Input id="businessName" value={formData.businessName} onChange={e => setFormData(prev => ({
                  ...prev,
                  businessName: e.target.value
                }))} placeholder="e.g., Premium Photography Package" required />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea id="description" value={formData.description} onChange={e => setFormData(prev => ({
                  ...prev,
                  description: e.target.value
                }))} placeholder="Describe what you're offering, key benefits, and what makes it special..." rows={4} required />
                  <p className="text-xs text-muted-foreground mt-1">
                    Be specific about benefits and outcomes. Our AI will enhance this content.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-purple" />
                  Pricing & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input id="price" value={formData.price} onChange={e => setFormData(prev => ({
                    ...prev,
                    price: e.target.value
                  }))} placeholder="999" required />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formData.currency} onValueChange={value => setFormData(prev => ({
                    ...prev,
                    currency: value
                  }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(currency => <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.name}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="availability">Availability (Optional)</Label>
                  <Input id="availability" value={formData.availability} onChange={e => setFormData(prev => ({
                  ...prev,
                  availability: e.target.value
                }))} placeholder="e.g., Limited time offer, Only 10 spots left" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Creates urgency and encourages immediate action
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5 text-purple" />
                  Visual Branding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {colorPresets.map((preset, index) => <button key={index} type="button" onClick={() => setFormData(prev => ({
                    ...prev,
                    colors: {
                      primary: preset.primary,
                      secondary: preset.secondary
                    }
                  }))} className={`p-3 rounded-lg border-2 transition-all ${formData.colors.primary === preset.primary ? 'border-primary ring-2 ring-primary/20' : 'border-muted hover:border-primary/50'}`}>
                        <div className="flex justify-center space-x-1 mb-2">
                          <div className="w-4 h-4 rounded" style={{
                        backgroundColor: preset.primary
                      }} />
                          <div className="w-4 h-4 rounded" style={{
                        backgroundColor: preset.secondary
                      }} />
                        </div>
                        <p className="text-xs font-medium">{preset.name}</p>
                      </button>)}
                  </div>
                </div>

                <div>
                  <Label>Custom Colors</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                      <Label htmlFor="primaryColor" className="text-xs">Primary</Label>
                      <div className="flex items-center space-x-2">
                        <input id="primaryColor" type="color" value={formData.colors.primary} onChange={e => setFormData(prev => ({
                        ...prev,
                        colors: {
                          ...prev.colors,
                          primary: e.target.value
                        }
                      }))} className="w-8 h-8 rounded border" />
                        <Input value={formData.colors.primary} onChange={e => setFormData(prev => ({
                        ...prev,
                        colors: {
                          ...prev.colors,
                          primary: e.target.value
                        }
                      }))} className="text-xs" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor" className="text-xs">Secondary</Label>
                      <div className="flex items-center space-x-2">
                        <input id="secondaryColor" type="color" value={formData.colors.secondary} onChange={e => setFormData(prev => ({
                        ...prev,
                        colors: {
                          ...prev.colors,
                          secondary: e.target.value
                        }
                      }))} className="w-8 h-8 rounded border" />
                        <Input value={formData.colors.secondary} onChange={e => setFormData(prev => ({
                        ...prev,
                        colors: {
                          ...prev.colors,
                          secondary: e.target.value
                        }
                      }))} className="text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5 text-primary" />
                  Images (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary/50 transition-colors" onDragOver={e => {
                e.preventDefault();
                e.currentTarget.classList.add('border-primary', 'bg-primary/5');
              }} onDragLeave={e => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-primary', 'bg-primary/5');
              }} onDrop={e => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-primary', 'bg-primary/5');
                const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024);
                if (files.length > 0) {
                  setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...files].slice(0, 5)
                  }));
                }
              }}>
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop images here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Supports JPG, PNG, WebP • Max 5MB per file • Up to 5 files
                  </p>
                  <input type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" id="imageUpload" onChange={e => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files).filter(file => file.size <= 5 * 1024 * 1024);
                    setFormData(prev => ({
                      ...prev,
                      images: [...prev.images, ...files].slice(0, 5)
                    }));
                  }
                }} />
                  <Button type="button" variant="outline" className="mt-2" onClick={() => document.getElementById('imageUpload')?.click()}>
                    Choose Files
                  </Button>
                </div>
                
                {formData.images.length > 0 && <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {formData.images.length} file(s) selected
                      </p>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setFormData(prev => ({
                    ...prev,
                    images: []
                  }))} className="text-xs">
                        Clear all
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                      {formData.images.map((file, index) => <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                           <div className="flex items-center space-x-2 min-w-0 flex-1">
                             <img src={URL.createObjectURL(file)} alt={`Upload preview ${index + 1}`} className="w-8 h-8 object-cover rounded border flex-shrink-0" />
                             <div className="min-w-0 flex-1">
                               <p className="text-xs font-medium truncate">{file.name}</p>
                               <p className="text-xs text-muted-foreground">
                                 {(file.size / 1024 / 1024).toFixed(1)} MB
                               </p>
                             </div>
                           </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }));
                    }} className="h-6 w-6 p-0 flex-shrink-0">
                            ×
                          </Button>
                        </div>)}
                    </div>
                    
                    {formData.images.length >= 5 && <p className="text-xs text-muted-foreground">
                        Maximum of 5 files reached
                      </p>}
                  </div>}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Button type="submit" size="xl" variant="premium" disabled={!formData.businessName || !formData.description || !formData.price} className="group" style={{
          backgroundColor: formData.colors.primary,
          color: 'white'
        }}>
            Generate My Landing Page
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>
    </div>;
};