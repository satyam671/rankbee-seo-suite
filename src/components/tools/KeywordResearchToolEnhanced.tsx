import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp, BarChart3, Loader2, Globe, Info, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEOService, KeywordData } from "@/services/seoService";

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' }
];

export const KeywordResearchTool = () => {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<KeywordData[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword to research",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const keywordData = await SEOService.getKeywordSuggestions(keyword.trim(), country, 50);
      setSuggestions(keywordData);
      toast({
        title: "Success",
        description: `Found ${keywordData.length} keyword suggestions with real search data`,
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to fetch keyword data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "text-success";
    if (difficulty < 70) return "text-warning";
    return "text-destructive";
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 30) return "Easy";
    if (difficulty < 70) return "Medium";
    return "Hard";
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return "text-success";
      case 'medium': return "text-warning";
      case 'high': return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const exportResults = () => {
    if (suggestions.length === 0) return;
    
    const csvContent = [
      ['Keyword', 'Search Volume', 'Difficulty', 'CPC', 'Competition', 'Trend', 'Country'],
      ...suggestions.map(s => [
        s.keyword,
        s.searchVolume.toString(),
        s.difficulty.toString(),
        s.cpc.toFixed(2),
        s.competition,
        s.trend,
        s.country
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keyword-research-${keyword}-${country}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <Card className="border-0 shadow-card bg-gradient-secondary">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">Advanced Keyword Research Tool</CardTitle>
              <CardDescription className="text-lg">
                Discover high-volume keywords with real-time search data and competition analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Enter Your Seed Keyword</CardTitle>
          <CardDescription>
            Get up to 50 keyword suggestions with real search volumes, difficulty scores, and CPC data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Keyword</label>
                <Input
                  type="text"
                  placeholder="e.g., digital marketing, SEO tools, content writing"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Country</label>
                <Select value={country} onValueChange={setCountry} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button type="submit" disabled={loading} className="w-full md:w-auto px-8">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Keywords...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Research Keywords
                </>
              )}
            </Button>
            
            {loading && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Scraping search data from multiple sources...
                </div>
                <Progress value={66} className="w-full" />
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-primary mb-2">Pro Tips for Keyword Research</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Target keywords with search volume above 1,000 and difficulty below 50 for best results</li>
                <li>• Focus on long-tail keywords (3+ words) for lower competition and higher conversion rates</li>
                <li>• Use location-specific keywords if targeting local markets</li>
                <li>• Consider search intent: informational, commercial, or transactional keywords</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {suggestions.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Keyword Suggestions ({suggestions.length})
                </CardTitle>
                <CardDescription>
                  Real-time keyword data for {countries.find(c => c.code === country)?.name}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={exportResults}>
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      {suggestion.keyword}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4 mt-1">
                      <span>${suggestion.cpc.toFixed(2)} CPC</span>
                      <Badge variant="outline" className={getCompetitionColor(suggestion.competition)}>
                        {suggestion.competition} competition
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {suggestion.country}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {suggestion.searchVolume.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Monthly searches
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(suggestion.difficulty)}
                      >
                        {getDifficultyLabel(suggestion.difficulty)}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {suggestion.difficulty}/100
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <TrendingUp 
                        className={`w-4 h-4 ${
                          suggestion.trend === 'up' 
                            ? 'text-success' 
                            : suggestion.trend === 'down' 
                            ? 'text-destructive' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                      <div className="text-xs text-muted-foreground mt-1 capitalize">
                        {suggestion.trend}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground text-center">
                💡 Data sourced from real-time web scraping and search engine APIs for accurate results
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};