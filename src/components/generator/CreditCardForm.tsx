import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Lock } from 'lucide-react';
interface CreditCardFormProps {
  onSubmit: (formData: CreditCardData) => void;
  isLoading?: boolean;
}
export interface CreditCardData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
}
export const CreditCardForm = ({
  onSubmit,
  isLoading = false
}: CreditCardFormProps) => {
  const [formData, setFormData] = useState<CreditCardData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };
  return <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input id="cardholderName" placeholder="John Doe" value={formData.cardholderName} onChange={e => setFormData({
            ...formData,
            cardholderName: e.target.value
          })} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={e => {
            const formatted = formatCardNumber(e.target.value);
            setFormData({
              ...formData,
              cardNumber: formatted
            });
          }} maxLength={19} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={e => {
              const formatted = formatExpiryDate(e.target.value);
              setFormData({
                ...formData,
                expiryDate: formatted
              });
            }} maxLength={5} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" value={formData.cvv} onChange={e => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setFormData({
                ...formData,
                cvv: value
              });
            }} maxLength={4} required />
            </div>
          </div>

          

          <div className="text-center text-sm text-muted-foreground">
            <Lock className="h-3 w-3 inline mr-1" />
            Your payment information is secure and encrypted
          </div>
        </form>
      </CardContent>
    </Card>;
};