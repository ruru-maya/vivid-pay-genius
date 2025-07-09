import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Monitor, 
  Smartphone, 
  Edit, 
  RefreshCw, 
  Share, 
  Download,
  Eye,
  Star,
  Shield,
  Clock,
  Users,
  CreditCard,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BusinessData, GeneratedPage } from '../PageGenerator';

interface PagePreviewProps {
  generatedPage: GeneratedPage;
  businessData: BusinessData;
  onEdit: () => void;
  onRegenerate: () => void;
}

export const PagePreview = ({ generatedPage, businessData, onEdit, onRegenerate }: PagePreviewProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      'USD': '$', 'EUR': '€', 'GBP': '£', 'CAD': 'C$', 'AUD': 'A$', 'JPY': '¥', 'CHF': 'Fr'
    };
    return symbols[currency] || '$';
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Control Panel */}
      <div className="border-b bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">Preview Your Payment Page</h2>
              <Badge variant="success" className="bg-accent text-white">
                Generated Successfully
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="h-8"
                >
                  <Monitor className="h-4 w-4 mr-1" />
                  Desktop
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="h-8"
                >
                  <Smartphone className="h-4 w-4 mr-1" />
                  Mobile
                </Button>
              </div>

              {/* Action Buttons */}
              <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Content
              </Button>
              <Button variant="outline" onClick={onRegenerate}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button variant="premium">
                <CreditCard className="h-4 w-4 mr-2" />
                Publish & Go Live
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Live Preview
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className={`transition-all duration-300 ${
                viewMode === 'mobile' 
                  ? 'max-w-sm mx-auto border-8 border-gray-300 rounded-3xl bg-gray-300 p-2' 
                  : 'w-full'
              }`}>
                <div className={`${
                  viewMode === 'mobile' 
                    ? 'rounded-2xl overflow-hidden bg-white' 
                    : 'rounded-lg overflow-hidden border'
                } shadow-medium`}>
                  {/* Generated Payment Page */}
                  <div 
                    className="min-h-screen"
                    style={{ 
                      background: `linear-gradient(135deg, ${generatedPage.colors.primary}15, ${generatedPage.colors.secondary}10)` 
                    }}
                  >
                    {/* Hero Section */}
                    <div className="relative overflow-hidden">
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{ 
                          background: `linear-gradient(135deg, ${generatedPage.colors.primary}, ${generatedPage.colors.secondary})` 
                        }}
                      />
                      <div className="relative px-6 py-12 text-center">
                        <Badge 
                          className="mb-4"
                          style={{ 
                            backgroundColor: generatedPage.colors.primary,
                            color: 'white' 
                          }}
                        >
                          {businessData.industry}
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                          {generatedPage.headline}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                          {generatedPage.description}
                        </p>
                        
                        {/* Pricing */}
                        <div className="mb-8">
                          <div className="text-4xl font-bold mb-2">
                            {getCurrencySymbol(businessData.currency)}{businessData.price}
                          </div>
                          {businessData.availability && (
                            <div className="text-sm text-orange-600 font-medium">
                              🔥 {businessData.availability}
                            </div>
                          )}
                        </div>

                        {/* CTA Button */}
                        <Button 
                          size="xl"
                          className="mb-8"
                          style={{ 
                            backgroundColor: generatedPage.colors.primary,
                            color: 'white'
                          }}
                        >
                          {generatedPage.callToAction}
                        </Button>

                        {/* Trust Signals */}
                        <div className="flex flex-wrap justify-center gap-4">
                          {generatedPage.trustSignals.map((signal, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {signal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Features Section */}
                    <div className="px-6 py-12 bg-white/50">
                      <h2 className="text-2xl font-bold text-center mb-8">What's Included</h2>
                      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {generatedPage.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: generatedPage.colors.primary }}
                            >
                              <Check className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Proof */}
                    <div className="px-6 py-12">
                      <div className="text-center mb-8">
                        <div className="flex justify-center items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 200+ customers</span>
                        </div>
                        <p className="text-muted-foreground italic">
                          "Absolutely exceeded my expectations. Professional, reliable, and outstanding results!"
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">— Sarah M., Verified Customer</p>
                      </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="px-6 py-12 bg-white/30">
                      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                      <div className="max-w-2xl mx-auto space-y-4">
                        {generatedPage.faq.map((item, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg bg-white">
                            <button
                              onClick={() => toggleFAQ(index)}
                              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                            >
                              <span className="font-medium">{item.question}</span>
                              {expandedFAQ === index ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                            {expandedFAQ === index && (
                              <div className="px-4 pb-3 text-sm text-muted-foreground">
                                {item.answer}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Final CTA */}
                    <div className="px-6 py-12 text-center">
                      <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                      <Button 
                        size="xl"
                        style={{ 
                          backgroundColor: generatedPage.colors.primary,
                          color: 'white'
                        }}
                      >
                        {generatedPage.callToAction}
                      </Button>
                      <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-1" />
                          Secure Payment
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Instant Confirmation
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          24/7 Support
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics & Settings Panel */}
        <div className="space-y-6">
          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <div className="text-xs text-muted-foreground">Conversion Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">A+</div>
                  <div className="text-xs text-muted-foreground">SEO Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">1.2s</div>
                  <div className="text-xs text-muted-foreground">Load Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">98%</div>
                  <div className="text-xs text-muted-foreground">Mobile Score</div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Trust Signals</span>
                  <Badge variant="success">Excellent</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Call-to-Action</span>
                  <Badge variant="success">Optimized</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Content Quality</span>
                  <Badge variant="success">High</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Visual Appeal</span>
                  <Badge variant="success">Strong</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Page Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Template:</span>
                  <span className="font-medium capitalize">{generatedPage.template}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Primary Color:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: generatedPage.colors.primary }}
                    />
                    <span className="font-mono text-xs">{generatedPage.colors.primary}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Secondary Color:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: generatedPage.colors.secondary }}
                    />
                    <span className="font-mono text-xs">{generatedPage.colors.secondary}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div><strong>Features:</strong> {generatedPage.features.length} items</div>
                <div><strong>FAQ Items:</strong> {generatedPage.faq.length}</div>
                <div><strong>Trust Signals:</strong> {generatedPage.trustSignals.length}</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="h-4 w-4 mr-2" />
                Customize Colors
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Different Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Assets
              </Button>
              <Separator />
              <Button variant="premium" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};