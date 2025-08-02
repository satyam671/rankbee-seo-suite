import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, FileText, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KeywordDensity {
  keyword: string;
  count: number;
  density: number;
  isTarget: boolean;
}

interface TextAnalysis {
  totalWords: number;
  totalCharacters: number;
  sentences: number;
  readabilityScore: number;
  keywordDensities: KeywordDensity[];
}

export const KeywordDensityTool = () => {
  const [content, setContent] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [analysis, setAnalysis] = useState<TextAnalysis | null>(null);
  const { toast } = useToast();

  const analyzeText = () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content to analyze",
        variant: "destructive",
      });
      return;
    }

    // Basic text analysis
    const words = content.toLowerCase().match(/\b\w+\b/g) || [];
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Count word frequencies
    const wordCounts: { [key: string]: number } = {};
    words.forEach(word => {
      if (word.length > 2) { // Ignore very short words
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    // Calculate keyword densities
    const keywordDensities: KeywordDensity[] = Object.entries(wordCounts)
      .map(([word, count]) => ({
        keyword: word,
        count,
        density: (count / words.length) * 100,
        isTarget: targetKeyword.toLowerCase().includes(word.toLowerCase()) || word.toLowerCase().includes(targetKeyword.toLowerCase())
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 keywords

    // Simple readability score (based on sentence and word length)
    const avgWordsPerSentence = words.length / sentences.length;
    const avgCharsPerWord = content.replace(/\s/g, '').length / words.length;
    const readabilityScore = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence * 2) - (avgCharsPerWord * 5)));

    const newAnalysis: TextAnalysis = {
      totalWords: words.length,
      totalCharacters: content.length,
      sentences: sentences.length,
      readabilityScore: Math.round(readabilityScore),
      keywordDensities
    };

    setAnalysis(newAnalysis);
    toast({
      title: "Analysis Complete",
      description: `Analyzed ${newAnalysis.totalWords} words and ${newAnalysis.keywordDensities.length} unique keywords`,
    });
  };

  const getDensityColor = (density: number) => {
    if (density < 1) return "text-muted-foreground";
    if (density < 2) return "text-success";
    if (density < 4) return "text-warning";
    return "text-destructive";
  };

  const getDensityRecommendation = (density: number) => {
    if (density < 0.5) return "Too low - consider adding more";
    if (density <= 2) return "Good density range";
    if (density <= 4) return "Slightly high - be careful";
    return "Too high - may be keyword stuffing";
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <Card className="border-0 shadow-card bg-gradient-secondary">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">Keyword Density Analyzer</CardTitle>
              <CardDescription className="text-lg">
                Analyze keyword frequency and density percentages in your content
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Content to Analyze
              </CardTitle>
              <CardDescription>
                Paste your article, blog post, or web page content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your content here... The more content you provide, the more accurate the analysis will be."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {content.split(/\s+/).filter(word => word.length > 0).length} words, {content.length} characters
                </span>
                <Button 
                  onClick={analyzeText}
                  disabled={!content.trim()}
                  variant="default"
                >
                  <Zap className="w-4 h-4" />
                  Analyze Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Target Keyword</CardTitle>
              <CardDescription>
                Optional: Specify your target keyword for focused analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., SEO tools"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
              />
            </CardContent>
          </Card>

          {analysis && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Content Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Words</span>
                    <span className="font-medium">{analysis.totalWords.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Characters</span>
                    <span className="font-medium">{analysis.totalCharacters.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sentences</span>
                    <span className="font-medium">{analysis.sentences}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Readability</span>
                    <Badge variant={analysis.readabilityScore > 70 ? "default" : "outline"}>
                      {analysis.readabilityScore}/100
                    </Badge>
                  </div>
                  <Progress value={analysis.readabilityScore} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Keyword Density Analysis
            </CardTitle>
            <CardDescription>
              Top keywords and their density percentages in your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.keywordDensities.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    item.isTarget 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {item.keyword}
                        {item.isTarget && (
                          <Badge variant="default" className="text-xs">
                            Target
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getDensityRecommendation(item.density)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className={`text-lg font-bold ${getDensityColor(item.density)}`}>
                      {item.density.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.count} times
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-success">✅ Good Practices</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Keep keyword density between 1-2%</li>
                    <li>• Use variations and synonyms</li>
                    <li>• Focus on natural language</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-destructive">⚠️ Avoid</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Keyword density above 4%</li>
                    <li>• Unnatural keyword stuffing</li>
                    <li>• Ignoring content quality</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};