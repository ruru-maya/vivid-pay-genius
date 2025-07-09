import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Palette, FileText, CheckCircle } from 'lucide-react';
import { BusinessData, GeneratedPage } from '../PageGenerator';

interface AIProcessingProps {
  businessData: BusinessData;
  onComplete: (page: GeneratedPage) => void;
}

export const AIProcessing = ({ businessData, onComplete }: AIProcessingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      icon: Brain,
      title: "Analyzing Business Context",
      description: "Understanding your industry and target audience",
      duration: 2000
    },
    {
      icon: FileText,
      title: "Generating Compelling Content",
      description: "Creating headlines, descriptions, and persuasive copy",
      duration: 3000
    },
    {
      icon: Palette,
      title: "Designing Visual Layout",
      description: "Selecting optimal templates and color schemes",
      duration: 2000
    },
    {
      icon: Sparkles,
      title: "Optimizing for Conversions",
      description: "Fine-tuning elements for maximum impact",
      duration: 2000
    },
    {
      icon: CheckCircle,
      title: "Finalizing Your Page",
      description: "Adding finishing touches and preparing preview",
      duration: 1000
    }
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    let currentTime = 0;
    let stepIndex = 0;

    const interval = setInterval(() => {
      currentTime += 100;
      const progressPercent = (currentTime / totalDuration) * 100;
      setProgress(Math.min(progressPercent, 100));

      // Update current step based on elapsed time
      let accumulatedTime = 0;
      for (let i = 0; i < steps.length; i++) {
        accumulatedTime += steps[i].duration;
        if (currentTime <= accumulatedTime) {
          setCurrentStep(i);
          break;
        }
      }

      if (currentTime >= totalDuration) {
        clearInterval(interval);
        // Simulate AI generation with realistic data
        setTimeout(() => {
          const generatedPage = generatePageContent(businessData);
          onComplete(generatedPage);
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [businessData, onComplete]);

  const generatePageContent = (data: BusinessData): GeneratedPage => {
    // Simulate AI-generated content based on business data
    const templates = ['modern', 'classic', 'minimal', 'bold'];
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

    // Generate industry-specific content
    const industryContent = getIndustryContent(data.industry);
    
    return {
      title: `${data.businessName} - ${industryContent.titleSuffix}`,
      headline: generateHeadline(data),
      description: enhanceDescription(data.description, data.industry),
      features: generateFeatures(data),
      callToAction: generateCTA(data),
      trustSignals: industryContent.trustSignals,
      faq: generateFAQ(data),
      template: selectedTemplate,
      colors: {
        primary: data.colors.primary,
        secondary: data.colors.secondary,
        accent: generateAccentColor(data.colors.primary)
      }
    };
  };

  const getIndustryContent = (industry: string) => {
    const industryMap: Record<string, any> = {
      'Travel & Tourism': {
        titleSuffix: 'Unforgettable Adventures Await',
        trustSignals: ['Licensed Tour Operator', '10,000+ Happy Travelers', 'IATA Certified', '24/7 Support']
      },
      'Professional Services': {
        titleSuffix: 'Expert Solutions Delivered',
        trustSignals: ['Industry Certified', '15+ Years Experience', '200+ Successful Projects', 'Money-Back Guarantee']
      },
      'Creative Services': {
        titleSuffix: 'Bringing Your Vision to Life',
        trustSignals: ['Award-Winning Team', 'Featured in Publications', '500+ Projects Completed', 'Client Testimonials']
      },
      default: {
        titleSuffix: 'Premium Quality Guaranteed',
        trustSignals: ['Satisfaction Guaranteed', 'Secure Payment', 'Fast Delivery', 'Expert Support']
      }
    };

    return industryMap[industry] || industryMap.default;
  };

  const generateHeadline = (data: BusinessData): string => {
    const headlines = [
      `Transform Your Experience with ${data.businessName}`,
      `Discover the Premium ${data.businessName} Difference`,
      `Exclusive ${data.businessName} - Limited Availability`,
      `Professional ${data.businessName} Solutions`,
      `Elevate Your Success with ${data.businessName}`
    ];
    return headlines[Math.floor(Math.random() * headlines.length)];
  };

  const enhanceDescription = (description: string, industry: string): string => {
    const enhancementMap: Record<string, string[]> = {
      'Travel & Tourism': [
        'Create memories that last a lifetime.',
        'Experience authentic local culture and breathtaking destinations.',
        'All-inclusive packages with premium accommodations.'
      ],
      'Professional Services': [
        'Proven methodologies deliver measurable results.',
        'Customized solutions tailored to your specific needs.',
        'Expert guidance every step of the way.'
      ],
      'Creative Services': [
        'Professional quality that exceeds expectations.',
        'Collaborative process ensures your vision comes to life.',
        'Industry-leading creativity and technical expertise.'
      ]
    };

    const enhancements = enhancementMap[industry] || [
      'Premium quality and exceptional service.',
      'Tailored solutions for your unique needs.',
      'Trusted by customers worldwide.'
    ];

    return `${description} ${enhancements[Math.floor(Math.random() * enhancements.length)]}`;
  };

  const generateFeatures = (data: BusinessData): string[] => {
    const baseFeatures = [
      'Premium Quality Guarantee',
      'Expert Professional Service',
      'Comprehensive Support Included',
      'Flexible Scheduling Options'
    ];

    const industryFeatures: Record<string, string[]> = {
      'Travel & Tourism': [
        'Small Group Experience (Max 12 guests)',
        'Local Expert Guides',
        'All Meals & Accommodations Included',
        '24/7 Travel Support'
      ],
      'Professional Services': [
        '90-Day Implementation Timeline',
        'Dedicated Project Manager',
        'Weekly Progress Reports',
        'Post-Project Support'
      ],
      'Creative Services': [
        '50+ High-Resolution Images',
        'Commercial Usage Rights',
        'Quick 48-Hour Turnaround',
        'Unlimited Minor Revisions'
      ]
    };

    return industryFeatures[data.industry] || baseFeatures;
  };

  const generateCTA = (data: BusinessData): string => {
    const ctas = [
      'Book Your Experience Now',
      'Get Started Today',
      'Secure Your Spot',
      'Reserve Now - Limited Availability',
      'Start Your Journey'
    ];
    return ctas[Math.floor(Math.random() * ctas.length)];
  };

  const generateFAQ = (data: BusinessData): Array<{ question: string; answer: string }> => {
    return [
      {
        question: "What's included in this package?",
        answer: `This comprehensive package includes everything mentioned in the description, plus additional premium features and dedicated support to ensure your complete satisfaction.`
      },
      {
        question: "How does the booking process work?",
        answer: `Simply complete your purchase using our secure payment system. You'll receive immediate confirmation and detailed next steps within 24 hours.`
      },
      {
        question: "What if I need to make changes?",
        answer: `We understand plans can change. Contact us within 48 hours for modifications, and we'll work with you to find the best solution.`
      },
      {
        question: "Is there a satisfaction guarantee?",
        answer: `Absolutely! We stand behind our work with a 100% satisfaction guarantee. If you're not completely happy, we'll make it right.`
      }
    ];
  };

  const generateAccentColor = (primaryColor: string): string => {
    // Simple color manipulation to generate accent color
    const hex = primaryColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Create a complementary accent color
    const accentR = Math.min(255, r + 50);
    const accentG = Math.min(255, g + 30);
    const accentB = Math.min(255, b + 20);
    
    return `#${accentR.toString(16).padStart(2, '0')}${accentG.toString(16).padStart(2, '0')}${accentB.toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-primary/20 shadow-strong">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-2">AI is Creating Your Payment Page</h2>
            <p className="text-muted-foreground">
              Analyzing your business to generate the perfect conversion-optimized page
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generation Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isComplete = index < currentStep;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary/10 border border-primary/20 scale-105' 
                        : isComplete 
                        ? 'bg-accent/10 border border-accent/20' 
                        : 'bg-muted/20'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : isComplete 
                        ? 'bg-accent text-white' 
                        : 'bg-muted'
                    }`}>
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-medium ${isActive ? 'text-primary' : ''}`}>
                          {step.title}
                        </h3>
                        {isComplete && (
                          <Badge variant="secondary" className="bg-accent text-white">
                            Complete
                          </Badge>
                        )}
                        {isActive && (
                          <Badge variant="default" className="animate-pulse">
                            Processing...
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium mb-2">Based on your input:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Business:</span>
                  <p className="font-medium">{businessData.businessName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Industry:</span>
                  <p className="font-medium">{businessData.industry}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <p className="font-medium">{businessData.currency} {businessData.price}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Images:</span>
                  <p className="font-medium">{businessData.images.length || 'Stock photos'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};