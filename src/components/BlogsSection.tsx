import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight, BookOpen, TrendingUp } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to Keyword Research in 2024",
    excerpt: "Learn how to find profitable keywords with high search volume and low competition using advanced research techniques and tools.",
    category: "Keyword Research",
    readTime: "8 min read",
    publishDate: "2024-01-15",
    slug: "complete-guide-keyword-research-2024",
    featured: true
  },
  {
    id: 2,
    title: "Domain Authority: What It Is and How to Improve It",
    excerpt: "Understand domain authority metrics, how they're calculated, and proven strategies to increase your website's authority score.",
    category: "SEO Authority",
    readTime: "6 min read", 
    publishDate: "2024-01-12",
    slug: "domain-authority-guide-improve-website-ranking"
  },
  {
    id: 3,
    title: "Backlink Analysis: Finding High-Quality Link Opportunities",
    excerpt: "Master the art of backlink analysis to discover valuable link building opportunities and improve your SEO performance.",
    category: "Link Building",
    readTime: "10 min read",
    publishDate: "2024-01-10",
    slug: "backlink-analysis-link-building-opportunities"
  },
  {
    id: 4,
    title: "Meta Tags Optimization for Better Search Rankings",
    excerpt: "Optimize your meta titles and descriptions for higher click-through rates and improved search engine rankings.",
    category: "On-Page SEO",
    readTime: "5 min read",
    publishDate: "2024-01-08",
    slug: "meta-tags-optimization-search-rankings"
  },
  {
    id: 5,
    title: "Technical SEO: XML Sitemaps and Site Structure",
    excerpt: "Learn how to create proper XML sitemaps and optimize your site structure for better crawling and indexing.",
    category: "Technical SEO",
    readTime: "7 min read",
    publishDate: "2024-01-05",
    slug: "technical-seo-xml-sitemaps-site-structure"
  },
  {
    id: 6,
    title: "YouTube SEO: Optimizing Videos for Search",
    excerpt: "Discover how to optimize your YouTube videos for better visibility and ranking in both YouTube and Google search.",
    category: "Platform SEO",
    readTime: "9 min read",
    publishDate: "2024-01-03",
    slug: "youtube-seo-video-optimization-guide"
  }
];

const categories = [
  "All Posts",
  "Keyword Research", 
  "SEO Authority",
  "Link Building",
  "On-Page SEO",
  "Technical SEO",
  "Platform SEO"
];

export const BlogsSection = () => {
  const handleReadMore = (slug: string) => {
    // In a real app, this would navigate to the blog post
    console.log(`Navigate to blog post: ${slug}`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="w-3 h-3 mr-1" />
            SEO Knowledge Base
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest SEO Insights & Guides
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master SEO with our comprehensive guides, tutorials, and industry insights. 
            Learn how to use each tool effectively and stay updated with the latest SEO trends.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button 
              key={category}
              variant="outline" 
              size="sm"
              className="hover:border-primary/50"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {blogPosts.find(post => post.featured) && (
          <Card className="mb-12 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border-0 bg-gradient-hero text-white">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
                <Badge variant="outline" className="text-white border-white/30">
                  {blogPosts.find(post => post.featured)?.category}
                </Badge>
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                {blogPosts.find(post => post.featured)?.title}
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                {blogPosts.find(post => post.featured)?.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(blogPosts.find(post => post.featured)?.publishDate || '').toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blogPosts.find(post => post.featured)?.readTime}
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleReadMore(blogPosts.find(post => post.featured)?.slug || '')}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Card 
              key={post.id}
              className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-secondary"
              onClick={() => handleReadMore(post.slug)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(post.publishDate).toLocaleDateString()}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary hover:text-primary/80 p-0 h-auto"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <BookOpen className="w-4 h-4" />
            View All Blog Posts
          </Button>
        </div>
      </div>
    </section>
  );
};