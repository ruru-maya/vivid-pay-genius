import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from 'lucide-react';
import { BusinessData } from '../../PageGenerator';

interface PricingSlideProps {
  formData: BusinessData;
  setFormData: (data: BusinessData | ((prev: BusinessData) => BusinessData)) => void;
}

export const PricingSlide = ({ formData, setFormData }: PricingSlideProps) => {
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Pricing & Availability</h2>
        <p className="text-lg text-muted-foreground">
          Set your pricing and availability details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-purple" />
            Pricing Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input 
                id="price" 
                value={formData.price} 
                onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))} 
                placeholder="999" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={formData.currency} 
                onValueChange={value => setFormData(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="availability">Availability (Optional)</Label>
            <Input 
              id="availability" 
              value={formData.availability} 
              onChange={e => setFormData(prev => ({ ...prev, availability: e.target.value }))} 
              placeholder="e.g., Limited time offer, Only 10 spots left" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              Creates urgency and encourages immediate action
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};