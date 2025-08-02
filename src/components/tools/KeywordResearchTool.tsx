import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, TrendingUp, BarChart3, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KeywordSuggestion {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  trend: 'up' | 'down' | 'stable';
  cpc: number;
}

export const KeywordResearchTool = () => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([]);
  const { toast } = useToast();

  // Mock keyword suggestions generator
  const generateSuggestions = (baseKeyword: string): KeywordSuggestion[] => {
    const variations = [
      `${baseKeyword} tool`,
      `${baseKeyword} free`,
      `${baseKeyword} online`,
      `best ${baseKeyword}`,
      `${baseKeyword} guide`,
      `${baseKeyword} tips`,
      `${baseKeyword} software`,
      `${baseKeyword} analysis`,
      `how to ${baseKeyword}`,
      `${baseKeyword} checker`,
    ];

    return variations.map(variation => ({
      keyword: variation,
      searchVolume: Math.floor(Math.random() * 10000) + 100,
      difficulty: Math.floor(Math.random() * 100),
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
      cpc: Math.random() * 5 + 0.1
    }));
  };

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
    
    // Simulate API call
    setTimeout(() => {
      const newSuggestions = generateSuggestions(keyword.trim());
      setSuggestions(newSuggestions);
      setLoading(false);
      toast({
        title: "Success",
        description: `Found ${newSuggestions.length} keyword suggestions`,
      });
    }, 2000);
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
              <CardTitle className="text-2xl">Keyword Research Tool</CardTitle>
              <CardDescription className="text-lg">
                Discover high-volume keywords and analyze search trends
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
            Start with a broad keyword related to your topic or niche
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="e.g., digital marketing, SEO tools, content writing"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading} className="px-8">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Research
                  </>
                )}
              </Button>
            </div>
            {loading && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Analyzing keyword data...
                </div>
                <Progress value={66} className="w-full" />
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {suggestions.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Keyword Suggestions ({suggestions.length})
            </CardTitle>
            <CardDescription>
              Related keywords with search volume and difficulty estimates
            </CardDescription>
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
                    <div className="text-sm text-muted-foreground">
                      ${suggestion.cpc.toFixed(2)} CPC
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
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
                      <div className="text-xs text-muted-foreground mt-1">
                        Trend
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  💡 Tip: Focus on keywords with high search volume and low difficulty for best results
                </div>
                <Button variant="outline" size="sm">
                  Export Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};