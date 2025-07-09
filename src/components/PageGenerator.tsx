import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from 'lucide-react';
import { BusinessInfoForm } from './generator/BusinessInfoForm';
import { AIProcessing } from './generator/AIProcessing';
import { PagePreview } from './generator/PagePreview';

interface PageGeneratorProps {
  onBack: () => void;
}

export type BusinessData = {
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
  images: File[];
};

export type GeneratedPage = {
  title: string;
  headline: string;
  description: string;
  features: string[];
  callToAction: string;
  trustSignals: string[];
  faq: Array<{ question: string; answer: string }>;
  template: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
};

export const PageGenerator = ({ onBack }: PageGeneratorProps) => {
  const [currentStep, setCurrentStep] = useState<'input' | 'processing' | 'preview'>('input');
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [generatedPage, setGeneratedPage] = useState<GeneratedPage | null>(null);

  const handleBusinessInfoSubmit = (data: BusinessData) => {
    setBusinessData(data);
    setCurrentStep('processing');
  };

  const handleGenerationComplete = (page: GeneratedPage) => {
    setGeneratedPage(page);
    setCurrentStep('preview');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'input':
        return <BusinessInfoForm onSubmit={handleBusinessInfoSubmit} />;
      case 'processing':
        return (
          <AIProcessing 
            businessData={businessData!} 
            onComplete={handleGenerationComplete}
          />
        );
      case 'preview':
        return (
          <PagePreview 
            generatedPage={generatedPage!}
            businessData={businessData!}
            onEdit={() => setCurrentStep('input')}
            onRegenerate={() => setCurrentStep('processing')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="hover:bg-accent/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">AI Payment Page Generator</h1>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full transition-colors ${
                currentStep === 'input' ? 'bg-primary' : 'bg-muted'
              }`} />
              <div className={`h-2 w-2 rounded-full transition-colors ${
                currentStep === 'processing' ? 'bg-primary' : 'bg-muted'
              }`} />
              <div className={`h-2 w-2 rounded-full transition-colors ${
                currentStep === 'preview' ? 'bg-primary' : 'bg-muted'
              }`} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {renderStep()}
      </main>
    </div>
  );
};