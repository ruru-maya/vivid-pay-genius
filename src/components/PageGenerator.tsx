import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Save, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { BusinessInfoForm } from './generator/BusinessInfoForm';
import { AIProcessing } from './generator/AIProcessing';
import { PagePreview } from './generator/PagePreview';
interface PageGeneratorProps {
  onBack: () => void;
}
export type BusinessData = {
  companyName: string;
  businessName: string;
  description: string;
  price: string;
  currency: string;
  availability: string;
  industry: string;
  colors: {
    primary: string;
    secondary: string;
  };
  images: Array<{
    file: File;
    type: 'logo' | 'home-bg' | 'other';
  }>;
};
export type GeneratedPage = {
  title: string;
  headline: string;
  description: string;
  features: string[];
  callToAction: string;
  trustSignals: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  template: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
};
export const PageGenerator = ({
  onBack
}: PageGeneratorProps) => {
  const [currentStep, setCurrentStep] = useState<'input' | 'processing' | 'preview'>('input');
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [generatedPage, setGeneratedPage] = useState<GeneratedPage | null>(null);
  const [saving, setSaving] = useState(false);
  const {
    user,
    signOut
  } = useAuth();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  // Remove authentication redirect

  const handleBusinessInfoSubmit = (data: BusinessData) => {
    setBusinessData(data);
    setCurrentStep('processing');
  };
  const handleGenerationComplete = (page: GeneratedPage) => {
    setGeneratedPage(page);
    setCurrentStep('preview');
  };
  const handleSavePage = async () => {
    if (!businessData || !generatedPage || !user) return;
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from('payment_pages').insert({
        user_id: user.id,
        title: generatedPage.title,
        business_name: businessData.businessName,
        description: businessData.description,
        price: businessData.price,
        currency: businessData.currency,
        availability: businessData.availability,
        industry: businessData.industry,
        headline: generatedPage.headline,
        features: generatedPage.features,
        call_to_action: generatedPage.callToAction,
        trust_signals: generatedPage.trustSignals,
        faq: generatedPage.faq,
        colors: generatedPage.colors,
        template: generatedPage.template
      });
      if (error) throw error;
      toast({
        title: "Page Saved!",
        description: "Your landing page has been saved to your dashboard."
      });
      navigate('/dashboard');
    } catch (error: any) {
      if (error.message.includes('Payment page limit exceeded')) {
        toast({
          title: "Limit Reached",
          description: "You can only have 3 landing pages. Delete one to create a new page.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save landing page. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setSaving(false);
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 'input':
        return <BusinessInfoForm onSubmit={handleBusinessInfoSubmit} />;
      case 'processing':
        return <AIProcessing businessData={businessData!} onComplete={handleGenerationComplete} />;
      case 'preview':
        return <PagePreview generatedPage={generatedPage!} businessData={businessData!} onEdit={() => setCurrentStep('input')} onRegenerate={() => setCurrentStep('processing')} />;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="w-full pl-1 pr-4">
          <div className="flex items-center justify-between h-16 mx-[10px] px-[10px]">
            <div className="flex items-center space-x-1">
              <Sparkles className="h-5 w-5 text-purple" />
              <h1 className="text-xl font-semibold">AI Landing Page Generator</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              
              {/* User Info */}
              
              
              {/* Progress Indicator */}
              <div className="flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full transition-colors ${currentStep === 'input' ? 'bg-purple' : 'bg-muted'}`} />
                <div className={`h-2 w-2 rounded-full transition-colors ${currentStep === 'processing' ? 'bg-purple' : 'bg-muted'}`} />
                <div className={`h-2 w-2 rounded-full transition-colors ${currentStep === 'preview' ? 'bg-purple' : 'bg-muted'}`} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {renderStep()}
      </main>
      
      {/* Powered by footer */}
      
    </div>;
};