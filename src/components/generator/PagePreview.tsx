import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Monitor, Smartphone, Edit, RefreshCw, Eye, Star, Shield, Clock, Users, CreditCard, Check, ChevronDown, ChevronUp, Palette, Maximize, Minimize, Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { BusinessData, GeneratedPage } from '../PageGenerator';
import { InlineEditor } from './InlineEditor';
import { ColorCustomizer } from './ColorCustomizer';
import { CreditCardForm, CreditCardData } from './CreditCardForm';
interface PagePreviewProps {
  generatedPage: GeneratedPage;
  businessData: BusinessData;
  onEdit: () => void;
  onRegenerate: () => void;
}
export const PagePreview = ({
  generatedPage,
  businessData,
  onEdit,
  onRegenerate
}: PagePreviewProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showInlineEditor, setShowInlineEditor] = useState(false);
  const [showColorCustomizer, setShowColorCustomizer] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSocialEditor, setShowSocialEditor] = useState(false);
  const [currentContent, setCurrentContent] = useState({
    headline: generatedPage.headline,
    description: generatedPage.description,
    features: generatedPage.features,
    callToAction: generatedPage.callToAction,
    trustSignals: generatedPage.trustSignals,
    faq: generatedPage.faq
  });
  const [currentColors, setCurrentColors] = useState(generatedPage.colors);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const {
    toast
  } = useToast();
  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'CAD': 'C$',
      'AUD': 'A$',
      'JPY': '¥',
      'CHF': 'Fr'
    };
    return symbols[currency] || '$';
  };
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };
  const handleContentChange = (newContent: any) => {
    setCurrentContent(newContent);
    toast({
      title: "Content Updated",
      description: "Your page content has been updated successfully."
    });
  };
  const handleColorsChange = (newColors: {
    primary: string;
    secondary: string;
    accent: string;
  }) => {
    setCurrentColors(newColors);
    toast({
      title: "Colors Updated",
      description: "Your page colors have been updated successfully."
    });
  };
  const handlePaymentSubmit = async (paymentData: CreditCardData) => {
    setIsProcessingPayment(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessingPayment(false);
    setShowPaymentDialog(false);
    toast({
      title: "Payment Successful!",
      description: "Your landing page has been published successfully."
    });
  };
  const handleSocialLinksUpdate = (newSocialLinks: typeof socialLinks) => {
    setSocialLinks(newSocialLinks);
    setShowSocialEditor(false);
    toast({
      title: "Social Links Updated",
      description: "Your social media links have been updated successfully."
    });
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return Facebook;
      case 'twitter':
        return Twitter;
      case 'instagram':
        return Instagram;
      case 'linkedin':
        return Linkedin;
      case 'youtube':
        return Youtube;
      default:
        return ExternalLink;
    }
  };
  const displayedContent = {
    ...generatedPage,
    ...currentContent,
    colors: currentColors
  };
  return <div className="min-h-screen bg-background">
      {/* Control Panel */}
      <div className="border-b bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">Preview Your Landing Page</h2>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button variant={viewMode === 'desktop' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('desktop')} className="h-8">
                  <Monitor className="h-4 w-4 mr-1" />
                  Desktop
                </Button>
                <Button variant={viewMode === 'mobile' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('mobile')} className="h-8">
                  <Smartphone className="h-4 w-4 mr-1" />
                  Mobile
                </Button>
              </div>

              {/* Action Buttons */}
              <Button variant="outline" onClick={() => setIsFullscreen(!isFullscreen)}>
                {isFullscreen ? <Minimize className="h-4 w-4 mr-2" /> : <Maximize className="h-4 w-4 mr-2" />}
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </Button>
              <Button variant="outline" onClick={() => setShowInlineEditor(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Content
              </Button>
              <Button variant="outline" onClick={onRegenerate}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogTrigger asChild>
                  <Button variant="premium" style={{
                  backgroundColor: displayedContent.colors.primary,
                  color: 'white'
                }}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Publish Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                </DialogContent>
              </Dialog>
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
            </CardHeader>
            <CardContent className="p-0">
                {/* Fullscreen Overlay */}
                {isFullscreen && <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="w-full max-w-6xl max-h-full overflow-auto bg-white rounded-lg shadow-2xl">
                      <div className="min-h-screen" style={{
                  background: `linear-gradient(135deg, ${displayedContent.colors.primary}15, ${displayedContent.colors.secondary}10)`
                }}>
                        {/* Generated Payment Page Content in Fullscreen */}
                        {/* Header Navigation */}
                        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                          <div className="max-w-6xl mx-auto px-6 py-4">
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-xl" style={{
                          color: displayedContent.colors.primary
                        }}>
                                {businessData.businessName}
                              </div>
                              <nav className="hidden md:flex items-center space-x-8">
                                <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                  Home
                                </button>
                                <button onClick={() => scrollToSection('features')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                  What's Included
                                </button>
                                <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                  FAQ
                                </button>
                                <button onClick={() => scrollToSection('cta')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                  Get Started
                                </button>
                              </nav>
                              <Button variant="outline" size="sm" onClick={() => setIsFullscreen(false)}>
                                <Minimize className="h-4 w-4 mr-1" />
                                Exit Fullscreen
                              </Button>
                            </div>
                          </div>
                        </header>

                        {/* Hero Section */}
                        <section id="home" className="relative overflow-hidden">
                          {/* Background Image or Gradient */}
                          {businessData.images.length > 0 ? (
                            <div 
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${URL.createObjectURL(businessData.images[0])})`
                              }}
                            />
                          ) : (
                            <div className="absolute inset-0 opacity-20" style={{
                              background: `linear-gradient(135deg, ${displayedContent.colors.primary}, ${displayedContent.colors.secondary})`
                            }} />
                          )}
                          {/* Dark overlay for text readability */}
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="relative px-6 py-12 text-center text-white">{/* Make text white over image */}
                            
                            <Badge className="mb-4" style={{
                        backgroundColor: displayedContent.colors.primary,
                        color: 'white'
                      }}>
                              {businessData.industry}
                            </Badge>
                            <h1 className="text-4xl font-bold mb-4">
                              {displayedContent.headline}
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                              {displayedContent.description}
                            </p>
                            
                            {/* Pricing */}
                            <div className="mb-8">
                              <div className="text-4xl font-bold mb-2">
                                {getCurrencySymbol(businessData.currency)}{businessData.price}
                              </div>
                              {businessData.availability && <div className="text-sm text-orange-600 font-medium">
                                  🔥 {businessData.availability}
                                </div>}
                            </div>

                            {/* CTA Button */}
                            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                              <DialogTrigger asChild>
                                <Button size="xl" className="mb-8" style={{
                            backgroundColor: displayedContent.colors.primary,
                            color: 'white'
                          }}>
                                  {displayedContent.callToAction}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                              </DialogContent>
                            </Dialog>

                            {/* Trust Signals */}
                            <div className="flex flex-wrap justify-center gap-4">
                              {displayedContent.trustSignals.map((signal, index) => <Badge key={index} variant="secondary" className="text-xs">
                                  {signal}
                                </Badge>)}
                            </div>
                          </div>
                        </section>

                        {/* Features Section */}
                        <section id="features" className="px-6 py-12 bg-white/50">
                          <h2 className="text-2xl font-bold text-center mb-8">What's Included</h2>
                          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                            {displayedContent.features.map((feature, index) => <div key={index} className="flex items-center space-x-3">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{
                          backgroundColor: displayedContent.colors.primary
                        }}>
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm">{feature}</span>
                              </div>)}
                          </div>
                        </section>

                        {/* Social Proof */}
                        <section className="px-6 py-12">
                          <div className="text-center mb-8">
                            <div className="flex justify-center items-center space-x-1 mb-2">
                              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                              <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 200+ customers</span>
                            </div>
                            <p className="text-muted-foreground italic">
                              "Absolutely exceeded my expectations. Professional, reliable, and outstanding results!"
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">— Sarah M., Verified Customer</p>
                          </div>
                        </section>

                        {/* FAQ Section */}
                        <section id="faq" className="px-6 py-12 bg-white/30">
                          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                          <div className="max-w-2xl mx-auto space-y-4">
                            {displayedContent.faq.map((item, index) => <div key={index} className="border border-gray-200 rounded-lg bg-white">
                                <button onClick={() => toggleFAQ(index)} className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                                  <span className="font-medium">{item.question}</span>
                                  {expandedFAQ === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                                {expandedFAQ === index && <div className="px-4 pb-3 text-sm text-muted-foreground">
                                    {item.answer}
                                  </div>}
                              </div>)}
                          </div>
                        </section>

                        {/* Final CTA */}
                        <section id="cta" className="px-6 py-12 text-center">
                          <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                          <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                            <DialogTrigger asChild>
                              <Button size="xl" style={{
                          backgroundColor: displayedContent.colors.primary,
                          color: 'white'
                        }}>
                                {displayedContent.callToAction}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                            </DialogContent>
                          </Dialog>
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
                        </section>

                        {/* Footer with Social Media */}
                        <footer className="bg-gray-900 text-white px-6 py-8">
                          <div className="max-w-6xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                              <div className="mb-4 md:mb-0">
                                <h3 className="font-bold text-lg mb-2" style={{
                            color: displayedContent.colors.primary
                          }}>
                                  {businessData.businessName}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                  © 2024 {businessData.businessName}. All rights reserved.
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                  Powered by <span className="text-primary font-medium">Vivid Money</span>
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-400 mr-2">Follow us:</span>
                                {Object.entries(socialLinks).map(([platform, url]) => {
                            const IconComponent = getSocialIcon(platform);
                            return url ? <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                      <IconComponent className="h-5 w-5" />
                                    </a> : null;
                          })}
                                <Button variant="outline" size="sm" onClick={() => setShowSocialEditor(true)} className="ml-4 text-xs">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit Social Links
                                </Button>
                              </div>
                            </div>
                          </div>
                        </footer>
                      </div>
                    </div>
                  </div>}

                {/* Regular Preview (Non-fullscreen) */}
                {!isFullscreen && <div className={`transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-sm mx-auto border-8 border-gray-300 rounded-3xl bg-gray-300 p-2' : 'w-full'}`}>
                    <div className={`${viewMode === 'mobile' ? 'rounded-2xl overflow-hidden bg-white' : 'rounded-lg overflow-hidden border'} shadow-medium`}>
                      {/* Generated Payment Page */}
                      <div className="min-h-screen" style={{
                  background: `linear-gradient(135deg, ${displayedContent.colors.primary}15, ${displayedContent.colors.secondary}10)`
                }}>
                    {/* Header Navigation */}
                    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                      <div className="max-w-6xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-xl" style={{
                          color: displayedContent.colors.primary
                        }}>
                            {businessData.businessName}
                          </div>
                          <nav className="hidden md:flex items-center space-x-8">
                            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                              Home
                            </button>
                            <button onClick={() => scrollToSection('features')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                              What's Included
                            </button>
                            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                              FAQ
                            </button>
                            <button onClick={() => scrollToSection('cta')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                              Get Started
                            </button>
                          </nav>
                          {isFullscreen && <Button variant="outline" size="sm" onClick={() => setIsFullscreen(false)}>
                              <Minimize className="h-4 w-4 mr-1" />
                              Exit
                            </Button>}
                        </div>
                      </div>
                    </header>

                    {/* Hero Section */}
                    <section id="home" className="relative overflow-hidden">
                      {/* Background Image or Gradient */}
                      {businessData.images.length > 0 ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(${URL.createObjectURL(businessData.images[0])})`
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 opacity-20" style={{
                          background: `linear-gradient(135deg, ${displayedContent.colors.primary}, ${displayedContent.colors.secondary})`
                        }} />
                      )}
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="relative px-6 py-12 text-center text-white">{/* Make text white over image */}
                        
                        <Badge className="mb-4" style={{
                        backgroundColor: displayedContent.colors.primary,
                        color: 'white'
                      }}>
                          {businessData.industry}
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                          {displayedContent.headline}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                          {displayedContent.description}
                        </p>
                        
                        {/* Pricing */}
                        <div className="mb-8">
                          <div className="text-4xl font-bold mb-2">
                            {getCurrencySymbol(businessData.currency)}{businessData.price}
                          </div>
                          {businessData.availability && <div className="text-sm text-orange-600 font-medium">
                              🔥 {businessData.availability}
                            </div>}
                        </div>

                        {/* CTA Button */}
                        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                          <DialogTrigger asChild>
                            <Button size="xl" className="mb-8 !border-none" style={{
                            backgroundColor: displayedContent.colors.primary + ' !important',
                            color: 'white !important',
                            borderColor: displayedContent.colors.primary + ' !important'
                          }}>
                              {displayedContent.callToAction}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                          </DialogContent>
                        </Dialog>

                        {/* Trust Signals */}
                        <div className="flex flex-wrap justify-center gap-4">
                          {displayedContent.trustSignals.map((signal, index) => <Badge key={index} variant="secondary" className="text-xs">
                              {signal}
                            </Badge>)}
                        </div>
                      </div>
                    </section>

                    {/* Features Section */}
                    <section id="features" className="px-6 py-12 bg-white/50">
                      <h2 className="text-2xl font-bold text-center mb-8">What's Included</h2>
                      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {displayedContent.features.map((feature, index) => <div key={index} className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{
                          backgroundColor: displayedContent.colors.primary
                        }}>
                              <Check className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </div>)}
                      </div>
                    </section>

                    {/* Social Proof */}
                    <section className="px-6 py-12">
                      <div className="text-center mb-8">
                        <div className="flex justify-center items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                          <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 200+ customers</span>
                        </div>
                        <p className="text-muted-foreground italic">
                          "Absolutely exceeded my expectations. Professional, reliable, and outstanding results!"
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">— Sarah M., Verified Customer</p>
                      </div>
                    </section>

                    {/* FAQ Section */}
                    <section id="faq" className="px-6 py-12 bg-white/30">
                      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                      <div className="max-w-2xl mx-auto space-y-4">
                        {displayedContent.faq.map((item, index) => <div key={index} className="border border-gray-200 rounded-lg bg-white">
                            <button onClick={() => toggleFAQ(index)} className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                              <span className="font-medium">{item.question}</span>
                              {expandedFAQ === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                            {expandedFAQ === index && <div className="px-4 pb-3 text-sm text-muted-foreground">
                                {item.answer}
                              </div>}
                          </div>)}
                      </div>
                    </section>

                    {/* Final CTA */}
                    <section id="cta" className="px-6 py-12 text-center">
                      <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                        <DialogTrigger asChild>
                          <Button size="xl" style={{
                          backgroundColor: displayedContent.colors.primary,
                          color: 'white'
                        }}>
                            {displayedContent.callToAction}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                        </DialogContent>
                      </Dialog>
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
                    </section>

                    {/* Footer with Social Media */}
                    <footer className="bg-gray-900 text-white px-6 py-8">
                      <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-bold text-lg mb-2" style={{
                            color: displayedContent.colors.primary
                          }}>
                              {businessData.businessName}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              © 2024 {businessData.businessName}. All rights reserved.
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              Powered by <span className="font-medium text-red-500">Vivid Money</span>
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-400 mr-2">Follow us:</span>
                            {Object.entries(socialLinks).map(([platform, url]) => {
                            const IconComponent = getSocialIcon(platform);
                            return url ? <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                  <IconComponent className="h-5 w-5" />
                                </a> : null;
                          })}
                            <Button variant="outline" size="sm" onClick={() => setShowSocialEditor(true)} className="ml-4 text-xs">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit Social Links
                            </Button>
                          </div>
                        </div>
                      </div>
                     </footer>
                       </div>
                     </div>
                   </div>}
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

          {/* Color Customization */}
          <ColorCustomizer colors={currentColors} onColorsChange={handleColorsChange} />

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
                    <div className="w-4 h-4 rounded border" style={{
                    backgroundColor: currentColors.primary
                  }} />
                    <span className="font-mono text-xs">{currentColors.primary}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Secondary Color:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded border" style={{
                    backgroundColor: currentColors.secondary
                  }} />
                    <span className="font-mono text-xs">{currentColors.secondary}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div><strong>Features:</strong> {currentContent.features.length} items</div>
                <div><strong>FAQ Items:</strong> {currentContent.faq.length}</div>
                <div><strong>Trust Signals:</strong> {currentContent.trustSignals.length}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Inline Editor Modal */}
      {showInlineEditor && <InlineEditor content={currentContent} onContentChange={handleContentChange} onExit={() => setShowInlineEditor(false)} />}

      {/* Social Media Editor Modal */}
      <Dialog open={showSocialEditor} onOpenChange={setShowSocialEditor}>
        <DialogContent className="max-w-md">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Edit Social Media Links</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your social media URLs to display icons in the footer
              </p>
            </div>
            
            <div className="space-y-4">
              {Object.entries(socialLinks).map(([platform, url]) => {
              const IconComponent = getSocialIcon(platform);
              return <div key={platform} className="space-y-2">
                    <Label className="flex items-center capitalize">
                      <IconComponent className="h-4 w-4 mr-2" />
                      {platform}
                    </Label>
                    <Input placeholder={`Enter your ${platform} URL`} value={url} onChange={e => setSocialLinks({
                  ...socialLinks,
                  [platform]: e.target.value
                })} />
                  </div>;
            })}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowSocialEditor(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSocialLinksUpdate(socialLinks)}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Powered by footer */}
      
    </div>;
};