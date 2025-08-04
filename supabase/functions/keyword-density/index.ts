import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface KeywordDensityResult {
  density: number;
  totalWords: number;
  keywordCount: number;
  suggestions: string[];
  relatedKeywords: { keyword: string; count: number; density: number }[];
  seoScore: number;
  improvements: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, targetKeyword, content } = await req.json();

    if (!targetKeyword || (!url && !content)) {
      return new Response(
        JSON.stringify({ error: 'Target keyword and either URL or content is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Keyword density analysis for: ${targetKeyword}`);

    let textContent = content;
    
    // If URL is provided, scrape the content
    if (url && !content) {
      textContent = await scrapePageContent(url);
    }

    if (!textContent || textContent.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Could not extract content from the provided URL' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Perform keyword density analysis
    const result = analyzeKeywordDensity(textContent, targetKeyword);

    console.log(`Analysis completed. Density: ${result.density}%`);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in keyword density analysis:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function scrapePageContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    
    // Remove script and style elements
    const scripts = doc.querySelectorAll('script, style, nav, header, footer');
    scripts.forEach(el => el.remove());
    
    // Extract main content
    const mainContent = doc.querySelector('main') || doc.querySelector('article') || doc.querySelector('body');
    const textContent = mainContent?.textContent || '';
    
    return textContent.trim();
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    throw error;
  }
}

function analyzeKeywordDensity(content: string, targetKeyword: string): KeywordDensityResult {
  // Clean and normalize content
  const cleanContent = content.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = cleanContent.split(' ').filter(word => word.length > 0);
  const totalWords = words.length;
  
  // Count target keyword occurrences (including partial matches)
  const targetKeywordLower = targetKeyword.toLowerCase();
  const keywordWords = targetKeywordLower.split(' ');
  
  let keywordCount = 0;
  
  // Exact phrase matches
  const exactMatches = cleanContent.split(targetKeywordLower).length - 1;
  keywordCount += exactMatches;
  
  // Individual word matches (for multi-word keywords)
  if (keywordWords.length > 1) {
    keywordWords.forEach(word => {
      const wordMatches = words.filter(w => w === word).length;
      keywordCount += Math.floor(wordMatches / keywordWords.length);
    });
  }
  
  // Calculate density
  const density = totalWords > 0 ? (keywordCount / totalWords) * 100 : 0;
  
  // Find related keywords (most frequent words)
  const wordCounts: { [key: string]: number } = {};
  words.forEach(word => {
    if (word.length > 3 && !isStopWord(word)) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });
  
  const relatedKeywords = Object.entries(wordCounts)
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: (count / totalWords) * 100
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
  
  // Generate SEO suggestions
  const suggestions = generateSuggestions(density, keywordCount, totalWords, targetKeyword);
  
  // Calculate SEO score
  const seoScore = calculateSEOScore(density, keywordCount, totalWords, relatedKeywords);
  
  // Generate improvement recommendations
  const improvements = generateImprovements(density, keywordCount, totalWords, seoScore);
  
  return {
    density: Math.round(density * 100) / 100,
    totalWords,
    keywordCount,
    suggestions,
    relatedKeywords,
    seoScore,
    improvements
  };
}

function isStopWord(word: string): boolean {
  const stopWords = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with',
    'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her',
    'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up',
    'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time',
    'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
    'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
    'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
    'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
  ];
  
  return stopWords.includes(word);
}

function generateSuggestions(density: number, keywordCount: number, totalWords: number, targetKeyword: string): string[] {
  const suggestions = [];
  
  if (density < 0.5) {
    suggestions.push(`Keyword density is too low (${density.toFixed(2)}%). Consider adding "${targetKeyword}" naturally throughout the content.`);
    suggestions.push('Use the target keyword in headings, subheadings, and the first paragraph.');
  } else if (density > 3) {
    suggestions.push(`Keyword density is too high (${density.toFixed(2)}%). This might be considered keyword stuffing by search engines.`);
    suggestions.push('Replace some keyword instances with synonyms or related terms.');
  } else {
    suggestions.push(`Keyword density is within the optimal range (${density.toFixed(2)}%).`);
  }
  
  if (keywordCount < 3) {
    suggestions.push('Consider using the target keyword at least 3-5 times in the content.');
  }
  
  if (totalWords < 300) {
    suggestions.push('Content is quite short. Consider expanding to at least 300-500 words for better SEO.');
  }
  
  suggestions.push('Use keyword variations and LSI (Latent Semantic Indexing) keywords to make content more natural.');
  suggestions.push('Include the target keyword in meta description, title tag, and image alt text.');
  suggestions.push('Focus on user intent and content quality rather than just keyword density.');
  
  return suggestions;
}

function calculateSEOScore(density: number, keywordCount: number, totalWords: number, relatedKeywords: any[]): number {
  let score = 0;
  
  // Density score (0-30 points)
  if (density >= 0.5 && density <= 2.5) {
    score += 30;
  } else if (density >= 0.3 && density <= 3.5) {
    score += 20;
  } else if (density > 0 && density <= 5) {
    score += 10;
  }
  
  // Keyword frequency score (0-20 points)
  if (keywordCount >= 3 && keywordCount <= 10) {
    score += 20;
  } else if (keywordCount >= 1 && keywordCount <= 15) {
    score += 15;
  } else if (keywordCount > 0) {
    score += 5;
  }
  
  // Content length score (0-20 points)
  if (totalWords >= 500) {
    score += 20;
  } else if (totalWords >= 300) {
    score += 15;
  } else if (totalWords >= 150) {
    score += 10;
  } else if (totalWords >= 50) {
    score += 5;
  }
  
  // Keyword diversity score (0-30 points)
  const uniqueKeywords = relatedKeywords.length;
  if (uniqueKeywords >= 15) {
    score += 30;
  } else if (uniqueKeywords >= 10) {
    score += 20;
  } else if (uniqueKeywords >= 5) {
    score += 15;
  } else if (uniqueKeywords >= 3) {
    score += 10;
  }
  
  return Math.min(score, 100);
}

function generateImprovements(density: number, keywordCount: number, totalWords: number, seoScore: number): string[] {
  const improvements = [];
  
  if (seoScore < 50) {
    improvements.push('Overall SEO score needs significant improvement.');
  }
  
  if (density < 0.5) {
    improvements.push('Increase keyword usage naturally throughout the content.');
    improvements.push('Add the target keyword to H2 and H3 headings.');
  } else if (density > 3) {
    improvements.push('Reduce keyword density to avoid over-optimization.');
    improvements.push('Replace some keyword instances with synonyms.');
  }
  
  if (totalWords < 300) {
    improvements.push('Expand content length to at least 300-500 words.');
    improvements.push('Add more detailed explanations and examples.');
  }
  
  if (keywordCount < 3) {
    improvements.push('Use the target keyword more frequently (aim for 3-7 times).');
  } else if (keywordCount > 15) {
    improvements.push('Reduce keyword frequency to appear more natural.');
  }
  
  improvements.push('Include related keywords and LSI terms.');
  improvements.push('Ensure keyword placement in title, meta description, and first paragraph.');
  improvements.push('Focus on semantic relevance and user intent.');
  improvements.push('Add internal links with keyword-rich anchor text.');
  
  return improvements;
}