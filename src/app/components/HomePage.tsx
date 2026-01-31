import { useState } from "react";
import { Clock, Bookmark, BookmarkCheck, Images, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  caption?: string;
  videoId?: string;
  platform?: "youtube" | "vimeo";
}

interface Post {
  id: number;
  title: string;
  category: string;
  date: string;
  author?: string;
  readTime?: string;
  image?: string;
  media?: MediaItem[];
  content?: string;
}

interface HomePageProps {
  onPostClick?: (post: Post) => void;
  onToggleSave?: (post: Post) => void;
  isPostSaved?: (postId: number) => boolean;
}

export default function HomePage({ onPostClick, onToggleSave, isPostSaved }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Category pills
  const categories = [
    { id: "all", label: "All" },
    { id: "policy", label: "Policy" },
    { id: "trade", label: "Trade" },
    { id: "announcements", label: "Alerts" },
    { id: "system", label: "System" },
    { id: "services", label: "Services" },
  ];

  // Feed data - blog-style posts (short and long form)
  const feedItems = [
    {
      id: 1,
      author: "Trade Policy Unit",
      title: "Export License Processing Time Reduced by 40%",
      excerpt: "Great news for exporters! We've streamlined our processes to significantly reduce export license processing time. This improvement is part of our ongoing commitment to facilitate trade and reduce bureaucratic barriers.",
      content: "Great news for exporters! We've streamlined our processes to reduce export license processing time by 40%. This improvement is part of our ongoing commitment to facilitate trade.\n\nThe new system implements digital workflows and automated verification, allowing for faster turnaround on standard applications. Businesses can now expect approval within 3-5 business days for routine permits.",
      image: "https://images.unsplash.com/photo-1578574437613-2e801bae9c35?w=800&h=600&fit=crop",
      media: [
        { type: "image" as const, url: "https://images.unsplash.com/photo-1578574437613-2e801bae9c35?w=800&h=600&fit=crop", caption: "New digital processing system" },
        { type: "video" as const, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ", platform: "youtube" as const, caption: "How the new system works" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", caption: "Digital workflow dashboard" },
      ],
      category: "policy",
      date: "Jan 28, 2026",
      readTime: "3 min read",
    },
    {
      id: 2,
      author: "Compliance Office",
      title: "Important: Q1 2026 Document Submission Deadline",
      excerpt: "All export documentation for Q1 2026 must be submitted by January 15th. Late submissions may result in processing delays.",
      content: "Reminder: All export documentation for Q1 2026 must be submitted by January 15th. Late submissions may result in processing delays. Please ensure all paperwork is complete and accurate.",
      image: null,
      category: "announcements",
      date: "Jan 27, 2026",
      readTime: "1 min read",
    },
    {
      id: 3,
      author: "International Trade Division",
      title: "Jamaica Signs Historic Trade Agreement with EU",
      excerpt: "A landmark agreement opens new markets for local exporters across European Union countries, promising significant growth for agricultural and manufacturing sectors.",
      content: "Jamaica has signed a new trade agreement with EU countries, opening up new markets for local exporters. This historic agreement will boost our agricultural and manufacturing sectors.\n\nThe agreement covers preferential tariffs on over 200 product categories, with particular benefits for coffee, rum, and processed foods. Implementation begins March 2026.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      media: [
        { type: "image" as const, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", caption: "Trade agreement signing ceremony" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop", caption: "Jamaican delegation meets EU officials" },
        { type: "video" as const, url: "https://vimeo.com/123456789", thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop", videoId: "123456789", platform: "vimeo" as const, caption: "Minister's remarks on the agreement" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop", caption: "Products benefiting from new tariffs" },
      ],
      category: "trade",
      date: "Jan 25, 2026",
      readTime: "5 min read",
    },
    {
      id: 4,
      author: "Finance Department",
      title: "2026 Fee Schedule Now Available",
      excerpt: "The updated fee schedule for all Pathway services includes adjusted rates for PSI inspections and new expedited processing options.",
      content: "The 2026 fee schedule for all Pathway services is now available on our website. Key changes include adjusted rates for PSI inspections and expedited processing options. Download the full document from our resources section.",
      image: null,
      category: "announcements",
      date: "Jan 22, 2026",
      readTime: "2 min read",
    },
    {
      id: 5,
      author: "PSI Unit",
      title: "Understanding the New PSI Inspection Fee Structure",
      excerpt: "A detailed breakdown of the updated PSI inspection fees effective January 2026, including tier-based pricing and volume discounts.",
      content: "Please note the updated PSI inspection fee schedule effective January 2026. The new rates reflect our commitment to maintaining high-quality inspection standards while remaining competitive.\n\nThe updated structure introduces volume-based discounts for frequent exporters and simplified fee categories.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      media: [
        { type: "image" as const, url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", caption: "New fee structure overview" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop", caption: "Volume discount tiers" },
      ],
      category: "policy",
      date: "Jan 20, 2026",
      readTime: "4 min read",
    },
    {
      id: 6,
      author: "Customer Service",
      title: "Holiday Office Hours Schedule",
      excerpt: "Modified hours for the holiday season: Dec 23-24 (8AM-2PM), Dec 25-26 (Closed), Dec 27-30 (8AM-4PM).",
      content: "Please note our modified hours for the upcoming holiday season: Dec 23-24 (8AM-2PM), Dec 25-26 (Closed), Dec 27-30 (8AM-4PM), Dec 31 (8AM-12PM), Jan 1 (Closed). Regular hours resume January 2nd.",
      image: null,
      category: "services",
      date: "Jan 19, 2026",
      readTime: "1 min read",
    },
    {
      id: 7,
      author: "Digital Services Team",
      title: "Introducing Our New Digital Certificate System",
      excerpt: "Exporters can now receive and manage certificates electronically, eliminating paperwork and dramatically reducing processing times.",
      content: "Our new digital certificate system is now live! Exporters can now receive and manage their certificates electronically, reducing paperwork and processing times.\n\nKey features include instant certificate generation, secure digital signatures, and integration with major customs systems worldwide.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      media: [
        { type: "image" as const, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", caption: "Digital certificate dashboard" },
        { type: "video" as const, url: "https://www.youtube.com/watch?v=abc123xyz", thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop", videoId: "abc123xyz", platform: "youtube" as const, caption: "Step-by-step tutorial: Generating your digital certificate" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop", caption: "Sample digital certificate" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop", caption: "Integration with customs systems" },
        { type: "video" as const, url: "https://vimeo.com/987654321", thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "987654321", platform: "vimeo" as const, caption: "Webinar: Getting started with digital certificates" },
      ],
      category: "system",
      date: "Jan 18, 2026",
      readTime: "6 min read",
    },
    {
      id: 8,
      author: "IT Department",
      title: "Scheduled System Maintenance Notice",
      excerpt: "Planned maintenance on January 5th, 2026 from 11PM to 3AM. Online services may be temporarily unavailable.",
      content: "Scheduled maintenance will occur on January 5th, 2026 from 11PM to 3AM. During this time, online services may be temporarily unavailable. We apologize for any inconvenience.",
      image: null,
      category: "system",
      date: "Jan 15, 2026",
      readTime: "1 min read",
    },
    {
      id: 9,
      author: "Kingston Branch",
      title: "Extended Office Hours at Kingston Location",
      excerpt: "Our Kingston office now operates from 7:30 AM to 5:00 PM on weekdays to better serve the business community.",
      content: "To better serve you, we've extended our office hours. Our Kingston office is now open from 7:30 AM to 5:00 PM on weekdays. Visit us for all your trade-related inquiries.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      media: [
        { type: "image" as const, url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", caption: "Kingston office exterior" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=600&fit=crop", caption: "Customer service area" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop", caption: "Meeting rooms available" },
      ],
      category: "services",
      date: "Jan 12, 2026",
      readTime: "2 min read",
    },
    {
      id: 10,
      author: "Events Team",
      title: "International Trade Exhibition 2026: Registration Now Open",
      excerpt: "Connect with international buyers, showcase your products, and explore new export opportunities at Jamaica's premier trade event.",
      content: "Register now for the International Trade Exhibition 2026! Connect with buyers, showcase your products, and expand your business globally.\n\nThe exhibition runs from March 15-18 at the Jamaica Conference Centre, featuring over 200 exhibitors from 30 countries.",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
      media: [
        { type: "image" as const, url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop", caption: "Last year's exhibition hall" },
        { type: "video" as const, url: "https://www.youtube.com/watch?v=expo2025", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", videoId: "expo2025", platform: "youtube" as const, caption: "Highlights from Trade Exhibition 2025" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop", caption: "Networking sessions" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", caption: "Product showcase area" },
        { type: "image" as const, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop", caption: "Conference sessions" },
        { type: "video" as const, url: "https://vimeo.com/expo2026promo", thumbnail: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&h=600&fit=crop", videoId: "expo2026promo", platform: "vimeo" as const, caption: "2026 Exhibition promo video" },
      ],
      category: "announcements",
      date: "Jan 10, 2026",
      readTime: "3 min read",
    },
  ];

  const filteredFeed = activeCategory === "all"
    ? feedItems
    : feedItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-full bg-background">
      {/* Category Pills */}
      <div className="sticky top-0 z-10 glass-nav border-b border-glass-border-subtle py-3 overflow-x-auto scrollbar-hide">
        <div className="flex justify-around">
          {categories.map((category) => (
            <div key={category.id} className="px-2">
              <button
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${activeCategory === category.id
                    ? "gradient-primary text-white"
                    : "bg-muted text-muted-foreground"
                  }`}
              >
                {category.label}
              </button>
            </div>

          ))}
        </div>
      </div>

      {/* Feed */}
      <div>
        {filteredFeed.map((item) => {
          const handleClick = () => {
            if (onPostClick) {
              onPostClick({
                id: item.id,
                title: item.title,
                category: item.category,
                date: item.date,
                author: item.author,
                readTime: item.readTime,
                image: item.image || undefined,
                media: item.media,
                content: item.content,
              });
            }
          };

          const isSaved = isPostSaved ? isPostSaved(item.id) : false;

          return (
            <article
              key={item.id}
              className="border-b border-border cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={handleClick}
            >
              {/* Image - if available */}
              {item.image && (
                <div className="aspect-[16/9] bg-muted relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Media count indicator */}
                  {item.media && item.media.length > 1 && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {item.media.some(m => m.type === "video") && (
                        <Play className="w-3 h-3" fill="currentColor" />
                      )}
                      <Images className="w-3 h-3" />
                      <span>{item.media.length}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="px-4 py-3">
                {/* Category & Meta row */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary">
                    {categories.find(c => c.id === item.category)?.label || item.category}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm leading-tight mb-1.5">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {item.excerpt}
                </p>

                {/* Actions row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.author}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleSave) {
                        onToggleSave({
                          id: item.id,
                          title: item.title,
                          category: item.category,
                          date: item.date,
                          author: item.author,
                          readTime: item.readTime,
                          image: item.image || undefined,
                          media: item.media,
                          content: item.content,
                        });
                      }
                    }}
                    className="p-1.5 -mr-1.5 hover:bg-muted rounded-full transition-colors"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-primary" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        <div className="py-8 text-center text-sm text-muted-foreground">
          You're all caught up
        </div>
      </div>
    </div>
  );
}
