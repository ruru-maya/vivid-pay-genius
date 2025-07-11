import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BusinessData } from '../PageGenerator';
import { BasicInfoSlide } from './slides/BasicInfoSlide';
import { PricingSlide } from './slides/PricingSlide';
import { VisualBrandingSlide } from './slides/VisualBrandingSlide';
import { ImagesSlide } from './slides/ImagesSlide';

interface MultiStepFormProps {
  onSubmit: (data: BusinessData) => void;
}

const STEPS = [
  { id: 'basic', title: 'Basic Information', component: BasicInfoSlide },
  { id: 'pricing', title: 'Pricing & Availability', component: PricingSlide },
  { id: 'branding', title: 'Visual Branding', component: VisualBrandingSlide },
  { id: 'images', title: 'Images & Logo', component: ImagesSlide }
];

export const MultiStepForm = ({ onSubmit }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BusinessData>({
    companyName: '',
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

  const isStepValid = (step: number) => {
    switch (step) {
      case 0: // Basic Info
        return formData.companyName && formData.businessName && formData.description;
      case 1: // Pricing
        return formData.price;
      case 2: // Visual Branding
        return true; // Always valid as it has defaults
      case 3: // Images
        return true; // Optional
      default:
        return false;
    }
  };

  const canProceed = isStepValid(currentStep);
  const isLastStep = currentStep === STEPS.length - 1;

  const handleNext = () => {
    if (canProceed) {
      if (isLastStep) {
        onSubmit(formData);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  index <= currentStep 
                    ? 'bg-purple text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              <div className="ml-2 hidden sm:block">
                <p className={`text-sm font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <div 
                  className={`h-0.5 w-16 mx-4 transition-colors ${
                    index < currentStep ? 'bg-purple' : 'bg-muted'
                  }`} 
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className="flex-1">
        <CurrentStepComponent formData={formData} setFormData={setFormData} />
      </div>

      {/* Navigation */}
      <div className="max-w-2xl mx-auto mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button
          type="button"
          onClick={handleNext}
          disabled={!canProceed}
          className="flex items-center"
          style={{
            backgroundColor: formData.colors.primary,
            color: 'white'
          }}
        >
          {isLastStep ? 'Generate My Landing Page' : 'Next'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};