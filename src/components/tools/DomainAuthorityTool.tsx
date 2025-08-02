import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Globe, ExternalLink, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DomainData {
  domain: string;
  domainAuthority: number;
  pageAuthority: number;
  mozRank: number;
  backlinks: number;
  referringDomains: number;
  organicTraffic: number;
  spam: number;
  age: number;
  isSecure: boolean;
  loadTime: number;
  mobileOptimized: boolean;
}

export const DomainAuthorityTool = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [domainData, setDomainData] = useState<DomainData | null>(null);
  const { toast } = useToast();

  // Mock domain analysis
  const analyzeDomain = (domain: string): DomainData => {
    const baseScore = Math.random() * 100;
    return {
      domain: domain,
      domainAuthority: Math.floor(baseScore),
      pageAuthority: Math.floor(baseScore * 0.8 + Math.random() * 20),
      mozRank: Math.random() * 10,
      backlinks: Math.floor(Math.random() * 100000) + 1000,
      referringDomains: Math.floor(Math.random() * 5000) + 100,
      organicTraffic: Math.floor(Math.random() * 1000000) + 10000,
      spam: Math.floor(Math.random() * 30),
      age: Math.floor(Math.random() * 20) + 1,
      isSecure: Math.random() > 0.3,
      loadTime: Math.random() * 3 + 0.5,
      mobileOptimized: Math.random() > 0.2
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL or domain",
        variant: "destructive",
      });
      return;
    }

    // Extract domain from URL
    let domain = url.trim();
    try {
      if (!domain.startsWith('http')) {
        domain = 'https://' + domain;
      }
      const urlObj = new URL(domain);
      domain = urlObj.hostname.replace('www.', '');
    } catch {
      // If URL parsing fails, assume it's just a domain
      domain = domain.replace(/^https?:\/\//, '').replace('www.', '').split('/')[0];
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const data = analyzeDomain(domain);
      setDomainData(data);
      setLoading(false);
      toast({
        title: "Analysis Complete",
        description: `Domain authority analysis completed for ${domain}`,
      });
    }, 3000);
  };

  const getAuthorityColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-info";
    if (score >= 40) return "text-warning";
    if (score >= 20) return "text-orange-500";
    return "text-destructive";
  };

  const getAuthorityLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    if (score >= 20) return "Poor";
    return "Very Poor";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-400";
    if (score >= 60) return "from-blue-500 to-blue-400";
    if (score >= 40) return "from-yellow-500 to-yellow-400";
    if (score >= 20) return "from-orange-500 to-orange-400";
    return "from-red-500 to-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <Card className="border-0 shadow-card bg-gradient-secondary">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">Domain Authority Checker</CardTitle>
              <CardDescription className="text-lg">
                Check domain and page authority scores to measure website credibility
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Input Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Enter Domain or URL
          </CardTitle>
          <CardDescription>
            Enter a website URL or domain name to analyze its authority metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="e.g., example.com or https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
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
                    <Award className="w-4 h-4" />
                    Check Authority
                  </>
                )}
              </Button>
            </div>
            {loading && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Analyzing domain authority and metrics...
                </div>
                <Progress value={75} className="w-full" />
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {domainData && (
        <div className="space-y-6">
          {/* Authority Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <CardTitle>Domain Authority</CardTitle>
                <CardDescription>Overall domain strength and credibility</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className={`relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getScoreGradient(domainData.domainAuthority)} flex items-center justify-center`}>
                  <div className="w-28 h-28 bg-background rounded-full flex items-center justify-center">
                    <div className={`text-3xl font-bold ${getAuthorityColor(domainData.domainAuthority)}`}>
                      {domainData.domainAuthority}
                    </div>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className={getAuthorityColor(domainData.domainAuthority)}>
                    {getAuthorityLabel(domainData.domainAuthority)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="text-center">
                <CardTitle>Page Authority</CardTitle>
                <CardDescription>Individual page ranking potential</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className={`relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getScoreGradient(domainData.pageAuthority)} flex items-center justify-center`}>
                  <div className="w-28 h-28 bg-background rounded-full flex items-center justify-center">
                    <div className={`text-3xl font-bold ${getAuthorityColor(domainData.pageAuthority)}`}>
                      {domainData.pageAuthority}
                    </div>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className={getAuthorityColor(domainData.pageAuthority)}>
                    {getAuthorityLabel(domainData.pageAuthority)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Detailed Authority Metrics for {domainData.domain}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Link Metrics */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2">
                    Link Profile
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Backlinks</span>
                      <span className="font-medium">{domainData.backlinks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Referring Domains</span>
                      <span className="font-medium">{domainData.referringDomains.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MozRank</span>
                      <span className="font-medium">{domainData.mozRank.toFixed(1)}/10</span>
                    </div>
                  </div>
                </div>

                {/* Traffic & Quality */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2">
                    Traffic & Quality
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Organic Traffic</span>
                      <span className="font-medium">{domainData.organicTraffic.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Spam Score</span>
                      <span className={`font-medium ${domainData.spam > 15 ? 'text-destructive' : 'text-success'}`}>
                        {domainData.spam}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domain Age</span>
                      <span className="font-medium">{domainData.age} years</span>
                    </div>
                  </div>
                </div>

                {/* Technical */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2">
                    Technical Health
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">SSL Secured</span>
                      {domainData.isSecure ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Load Time</span>
                      <span className={`font-medium ${domainData.loadTime > 2 ? 'text-warning' : 'text-success'}`}>
                        {domainData.loadTime.toFixed(1)}s
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Mobile Optimized</span>
                      {domainData.mobileOptimized ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Authority Score Interpretation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p><strong>Domain Authority (DA):</strong> Predicts how well a website will rank on search engines. Scores range from 1-100.</p>
                    </div>
                    <div>
                      <p><strong>Page Authority (PA):</strong> Predicts how well a specific page will rank. Higher scores indicate stronger ranking potential.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};