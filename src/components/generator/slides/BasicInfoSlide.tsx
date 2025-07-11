import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from 'lucide-react';
import { BusinessData } from '../../PageGenerator';

interface BasicInfoSlideProps {
  formData: BusinessData;
  setFormData: (data: BusinessData | ((prev: BusinessData) => BusinessData)) => void;
}

export const BasicInfoSlide = ({ formData, setFormData }: BasicInfoSlideProps) => {
  const industries = [
    'Travel & Tourism', 'Professional Services', 'E-commerce', 'Events & Experiences', 
    'Education & Training', 'Health & Wellness', 'Creative Services', 'Consulting', 
    'Technology', 'Food & Beverage', 'Real Estate', 'Financial Services'
  ];

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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Basic Information</h2>
        <p className="text-lg text-muted-foreground">
          Tell us about your business and what you're offering
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-purple" />
            Business Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Select 
              value={formData.industry} 
              onValueChange={value => setFormData(prev => ({ ...prev, industry: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.industry && examples[formData.industry as keyof typeof examples] && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="mt-2 text-xs border border-purple/50 text-purple/70 hover:bg-purple/40 hover:border-purple" 
                onClick={() => handleExampleFill(formData.industry)}
              >
                Fill with {formData.industry} example
              </Button>
            )}
          </div>

          <div>
            <Label htmlFor="companyName">Business Name *</Label>
            <Input 
              id="companyName" 
              value={formData.companyName} 
              onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))} 
              placeholder="e.g., Your Company Name" 
              required 
            />
          </div>

          <div>
            <Label htmlFor="businessName">Product/Service Name *</Label>
            <Input 
              id="businessName" 
              value={formData.businessName} 
              onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))} 
              placeholder="e.g., Premium Photography Package" 
              required 
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} 
              placeholder="Describe what you're offering, key benefits, and what makes it special..." 
              rows={4} 
              required 
            />
            <p className="text-xs text-muted-foreground mt-1">
              Be specific about benefits and outcomes. Our AI will enhance this content.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};