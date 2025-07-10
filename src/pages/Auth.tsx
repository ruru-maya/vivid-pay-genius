import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signIn, signUp } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Facebook } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [currentView, setCurrentView] = useState<'signin' | 'signup'>('signin');
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const {
    toast
  } = useToast();
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {
        error
      } = await signIn(signInData.email, signInData.password);
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome!",
          description: "You have successfully signed in."
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      const fullName = `${signUpData.firstName} ${signUpData.lastName}`;
      const {
        error
      } = await signUp(signUpData.email, signUpData.password, fullName);
      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account."
        });
        setCurrentView('signin');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>;
  }
  return <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-cover bg-center bg-no-repeat" style={{
    backgroundImage: 'url(/lovable-uploads/c62d60c2-e0c9-4847-9110-fd8d0777c050.png)'
  }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        

        <div className="bg-card rounded-lg shadow-soft p-8">
          {/* Header and Description */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              {currentView === 'signin' ? 'Welcome Back' : 'Register'}
            </h1>
            <p className="text-muted-foreground text-lg">
              {currentView === 'signin' 
                ? 'Sign in to access your dashboard.' 
                : 'Create stunning AI-powered landing pages in minutes.'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button type="button" variant="outline" className="w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600 h-12" disabled={isLoading}>
              <Facebook className="w-5 h-5 mr-2" />
              {currentView === 'signin' ? 'Sign in with Facebook' : 'Register with Facebook'}
            </Button>
            <Button type="button" variant="outline" className="w-full bg-red-500 hover:bg-red-600 text-white border-red-500 h-12" disabled={isLoading}>
              <span className="w-5 h-5 mr-2 font-bold">G</span>
              {currentView === 'signin' ? 'Sign in with Google' : 'Register with Google'}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">or use email</span>
            </div>
          </div>

          {currentView === 'signin' ? (/* Sign In Form */
        <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Input type="email" placeholder="Email Address" value={signInData.email} onChange={e => setSignInData({
              ...signInData,
              email: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" required />
              </div>
              <div>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" value={signInData.password} onChange={e => setSignInData({
                ...signInData,
                password: e.target.value
              })} className="w-full h-12 bg-muted border-0 rounded-md pr-10" required />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={checked => setRememberMe(checked as boolean)} />
                  <Label htmlFor="remember" className="text-muted-foreground cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <button type="button" className="text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <Button type="submit" variant="default" className="w-full h-12 font-medium rounded-md mt-6" disabled={isLoading}>
                {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Sign In'}
              </Button>
            </form>) : (/* Sign Up Form */
        <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Input type="text" placeholder="First Name" value={signUpData.firstName} onChange={e => setSignUpData({
              ...signUpData,
              firstName: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" required />
              </div>
              <div>
                <Input type="text" placeholder="Last Name" value={signUpData.lastName} onChange={e => setSignUpData({
              ...signUpData,
              lastName: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" required />
              </div>
              <div>
                <Input type="email" placeholder="Email" value={signUpData.email} onChange={e => setSignUpData({
              ...signUpData,
              email: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" required />
              </div>
              <div>
                <Input type="tel" placeholder="Phone" value={signUpData.phone} onChange={e => setSignUpData({
              ...signUpData,
              phone: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" />
              </div>
              <div>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" value={signUpData.password} onChange={e => setSignUpData({
                ...signUpData,
                password: e.target.value
              })} className="w-full h-12 bg-muted border-0 rounded-md pr-10" required />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" checked={agreeTerms} onCheckedChange={checked => setAgreeTerms(checked as boolean)} />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the{' '}
                  <button type="button" className="text-primary hover:underline">
                    terms and conditions
                  </button>
                  .
                </Label>
              </div>
              <Button type="submit" variant="default" className="w-full h-12 font-medium rounded-md mt-6" disabled={isLoading || !agreeTerms}>
                {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Register Now'}
              </Button>
            </form>)}

          {/* Toggle between sign in/up */}
          <div className="text-center mt-6 pt-6 border-t border-border">
            {currentView === 'signin' ? <p className="text-muted-foreground">
                Don't have an account yet?{' '}
                <button type="button" onClick={() => setCurrentView('signup')} className="text-primary hover:underline font-medium">
                  Register now!
                </button>
              </p> : <p className="text-muted-foreground">
                Already have an account?{' '}
                <button type="button" onClick={() => setCurrentView('signin')} className="text-primary hover:underline font-medium">
                  Sign in!
                </button>
              </p>}
          </div>

        </div>
      </div>
    </div>;
};