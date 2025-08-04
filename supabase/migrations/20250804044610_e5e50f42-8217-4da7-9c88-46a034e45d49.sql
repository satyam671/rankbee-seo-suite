-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM public.keyword_research_cache WHERE expires_at < now();
  DELETE FROM public.domain_analysis_cache WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';