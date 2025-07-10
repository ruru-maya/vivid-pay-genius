-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payment pages table
CREATE TABLE public.payment_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  business_name TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  availability TEXT,
  industry TEXT,
  headline TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  call_to_action TEXT NOT NULL,
  trust_signals TEXT[] NOT NULL DEFAULT '{}',
  faq JSONB NOT NULL DEFAULT '[]',
  colors JSONB NOT NULL DEFAULT '{"primary": "#6366f1", "secondary": "#8b5cf6", "accent": "#9584ff"}',
  template TEXT NOT NULL DEFAULT 'modern',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for payment_pages table
CREATE POLICY "Users can view their own payment pages" 
ON public.payment_pages 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payment pages" 
ON public.payment_pages 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment pages" 
ON public.payment_pages 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own payment pages" 
ON public.payment_pages 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  RETURN new;
END;
$$;

-- Create trigger to call the function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payment_pages_updated_at
  BEFORE UPDATE ON public.payment_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to check payment page limit
CREATE OR REPLACE FUNCTION public.check_payment_page_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  page_count INTEGER;
BEGIN
  -- Count existing payment pages for the user
  SELECT COUNT(*) INTO page_count
  FROM public.payment_pages
  WHERE user_id = NEW.user_id;
  
  -- Check if limit would be exceeded
  IF page_count >= 3 THEN
    RAISE EXCEPTION 'Payment page limit exceeded. Maximum 3 pages allowed per user.';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to enforce payment page limit
CREATE TRIGGER enforce_payment_page_limit
  BEFORE INSERT ON public.payment_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.check_payment_page_limit();