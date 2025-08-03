import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Target, 
  Zap, 
  BarChart3, 
  Search, 
  Users,
  CheckCircle,
  Star
} from "lucide-react";

export const SEOImportanceSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Organic Traffic",
      description: "Drive 53% more traffic with proper SEO optimization",
      stat: "+53%"
    },
    {
      icon: Target,
      title: "Higher SERP Rankings",
      description: "Rank on the first page for your target keywords",
      stat: "Page 1"
    },
    {
      icon: Users,
      title: "Better User Experience",
      description: "Improve site speed and mobile responsiveness",
      stat: "98% Mobile"
    },
    {
      icon: BarChart3,
      title: "Measurable ROI",
      description: "Track conversions and revenue growth",
      stat: "300% ROI"
    }
  ];

  const features = [
    "Real-time web scraping and analysis",
    "50+ keyword suggestions per search",
    "Comprehensive domain authority metrics",
    "Free alternative to expensive SEO tools",
    "No API limits or subscription required",
    "Advanced filtering and location targeting"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        {/* Main Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Why SEO Matters
          </Badge>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Transform Your Website's Performance with RankBee
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join millions of website owners who've increased their organic traffic and search rankings 
            using our comprehensive SEO toolkit. No technical expertise required.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 bg-gradient-secondary">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto p-3 bg-primary/10 text-primary rounded-full w-fit mb-2">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="text-primary border-primary/30 w-fit mx-auto">
                  {benefit.stat}
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Illustration */}
          <div className="relative">
            <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <Search className="w-16 h-16" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Advanced SEO Analytics</h3>
                <p className="text-primary-foreground/80">
                  Get real-time insights with our powerful web scraping technology
                </p>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 bg-white/10 rounded-lg p-2">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/10 rounded-lg p-2">
                <Zap className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Right: Features List */}
          <div>
            <div className="mb-8">
              <Badge className="mb-4 bg-success/10 text-success border-success/20">
                RankBee Advantage
              </Badge>
              <h3 className="text-3xl font-bold mb-4">
                Why Choose RankBee Over Expensive Alternatives?
              </h3>
              <p className="text-lg text-muted-foreground">
                Get professional-grade SEO insights without the hefty price tag. 
                Our platform delivers the same data quality as premium tools like Ahrefs and SEMrush.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-success/10 text-success rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4" fill="currentColor" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-warning fill-current" />
                <span className="font-semibold">Pro Tip</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Start with keyword research to identify high-traffic, low-competition opportunities. 
                Then use our domain analysis tools to understand your competition and improve your strategy.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="inline-block border-0 shadow-card bg-gradient-hero text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">Ready to Dominate Search Results?</h3>
              <p className="text-white/90 mb-6">
                Join 50,000+ websites already using RankBee to improve their SEO performance
              </p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4" fill="currentColor" />
                <span>100% Free Forever</span>
                <span className="mx-2">•</span>
                <CheckCircle className="w-4 h-4" fill="currentColor" />
                <span>No Registration Required</span>
                <span className="mx-2">•</span>
                <CheckCircle className="w-4 h-4" fill="currentColor" />
                <span>Instant Results</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};