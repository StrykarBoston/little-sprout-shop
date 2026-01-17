import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ChevronLeft, ChevronRight, Heart, MessageCircle, Share2, Facebook, Twitter, Linkedin, Bookmark } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getBlogPostBySlug, getRelatedBlogPosts, blogPosts } from '@/data/blogData';
import { BlogPost } from '@/types/blog';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(getRelatedBlogPosts(foundPost));
      } else {
        navigate('/blog', { replace: true });
      }
    }
  }, [slug, navigate]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  const getCurrentPostIndex = () => {
    return blogPosts.findIndex(p => p.id === post.id);
  };

  const getPreviousPost = () => {
    const index = getCurrentPostIndex();
    return index < blogPosts.length - 1 ? blogPosts[index + 1] : null;
  };

  const getNextPost = () => {
    const index = getCurrentPostIndex();
    return index > 0 ? blogPosts[index - 1] : null;
  };

  const previousPost = getPreviousPost();
  const nextPost = getNextPost();

  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container text-white">
          <div className="max-w-4xl mx-auto pb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {post.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
              />
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm opacity-75">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Article Actions */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button
                  variant={isBookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Share:</span>
                <Button variant="ghost" size="sm" onClick={() => handleShare('facebook')}>
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare('twitter')}>
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare('linkedin')}>
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare('copy')}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div>{post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}</div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Related Products */}
            {post.relatedProducts && post.relatedProducts.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Related Products</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {post.relatedProducts.map((product) => (
                    <Card key={product} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-muted rounded-lg mb-3" />
                        <h4 className="font-medium text-sm mb-1">{product}</h4>
                        <p className="text-xs text-muted-foreground">View Product</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{post.author.name}</h3>
                      <p className="text-muted-foreground mb-4">{post.author.bio}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Follow Author
                        </Button>
                        <Button variant="ghost" size="sm">
                          View All Articles
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t">
              <div className="grid md:grid-cols-2 gap-6">
                {previousPost && (
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <ChevronLeft className="h-5 w-5" />
                        <span className="text-sm text-muted-foreground">Previous Article</span>
                      </div>
                      <h4 className="font-semibold hover:text-primary transition-colors cursor-pointer">
                        <Link to={`/blog/${previousPost.slug}`}>
                          {previousPost.title}
                        </Link>
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {previousPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                )}
                
                {nextPost && (
                  <Card className="hover:shadow-md transition-shadow md:text-right">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3 md:justify-end">
                        <span className="text-sm text-muted-foreground">Next Article</span>
                        <ChevronRight className="h-5 w-5" />
                      </div>
                      <h4 className="font-semibold hover:text-primary transition-colors cursor-pointer">
                        <Link to={`/blog/${nextPost.slug}`}>
                          {nextPost.title}
                        </Link>
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {nextPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-8 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <Badge variant="secondary" className="text-xs">{relatedPost.category}</Badge>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(relatedPost.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {relatedPost.readTime} min
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-heading font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                        <Link to={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={relatedPost.author.avatar}
                            alt={relatedPost.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium">{relatedPost.author.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blog/${relatedPost.slug}`}>
                            Read More
                            <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8">Comments</h2>
            
            {/* Comment Form */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <textarea
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button>Post Comment</Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
              <p className="text-muted-foreground text-center py-8">
                Be the first to comment on this article!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-8 border-t">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Button variant="outline" asChild>
              <Link to="/blog">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
