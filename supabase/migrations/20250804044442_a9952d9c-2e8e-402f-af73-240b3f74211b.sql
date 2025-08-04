-- Create tables for SEO data storage and caching
CREATE TABLE public.keyword_research_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  suggestions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '24 hours')
);

CREATE TABLE public.domain_analysis_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT NOT NULL,
  metrics JSONB NOT NULL,
  health_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '12 hours')
);

CREATE TABLE public.user_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  search_type TEXT NOT NULL,
  search_query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.keyword_research_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domain_analysis_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to cached data
CREATE POLICY "Anyone can read keyword cache" 
ON public.keyword_research_cache 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert keyword cache" 
ON public.keyword_research_cache 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can read domain cache" 
ON public.domain_analysis_cache 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert domain cache" 
ON public.domain_analysis_cache 
FOR INSERT 
WITH CHECK (true);

-- User searches policies (user-specific)
CREATE POLICY "Users can view their own searches" 
ON public.user_searches 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own searches" 
ON public.user_searches 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create indexes for performance
CREATE INDEX idx_keyword_cache_lookup ON public.keyword_research_cache(keyword, country);
CREATE INDEX idx_domain_cache_lookup ON public.domain_analysis_cache(domain);
CREATE INDEX idx_keyword_cache_expires ON public.keyword_research_cache(expires_at);
CREATE INDEX idx_domain_cache_expires ON public.domain_analysis_cache(expires_at);

-- Function to cleanup expired cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM public.keyword_research_cache WHERE expires_at < now();
  DELETE FROM public.domain_analysis_cache WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically cleanup expired cache
CREATE OR REPLACE FUNCTION public.auto_cleanup_cache()
RETURNS TRIGGER AS $$
BEGIN
  -- Only cleanup on select queries, and only occasionally (1% chance)
  IF random() < 0.01 THEN
    PERFORM public.cleanup_expired_cache();
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_cleanup_trigger
  AFTER SELECT ON public.keyword_research_cache
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.auto_cleanup_cache();