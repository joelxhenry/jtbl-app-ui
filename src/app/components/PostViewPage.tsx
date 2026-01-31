import { useState } from "react";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Calendar,
  User,
  Clock,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";

interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  caption?: string;
  videoId?: string;
  platform?: "youtube" | "vimeo";
}

interface PostViewPageProps {
  post: {
    id: number;
    title: string;
    category: string;
    date: string;
    author?: string;
    readTime?: string;
    image?: string;
    images?: string[];
    media?: MediaItem[];
    content?: string;
  };
  onBack: () => void;
}

export default function PostViewPage({ post, onBack }: PostViewPageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  // Build media array from various sources
  const buildMediaArray = (): MediaItem[] => {
    if (post.media && post.media.length > 0) {
      return post.media;
    }

    // Build from images array or single image
    const images = post.images || (post.image ? [post.image] : []);
    return images.map(url => ({ type: "image" as const, url }));
  };

  // Sample media for demo posts (when no media provided)
  const defaultMedia: MediaItem[] = [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1578574437613-2e801bae9c35?w=800&h=600&fit=crop",
      caption: "Export containers at Kingston Port"
    },
    {
      type: "video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      videoId: "dQw4w9WgXcQ",
      platform: "youtube",
      caption: "Jamaica Trade Board Overview"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      caption: "Trade conference delegates"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      caption: "Digital export documentation"
    },
    {
      type: "video",
      url: "https://vimeo.com/123456789",
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      videoId: "123456789",
      platform: "vimeo",
      caption: "Export Process Tutorial"
    },
  ];

  const media = buildMediaArray().length > 0 ? buildMediaArray() : defaultMedia;

  // Default content if not provided
  const defaultContent = `
Jamaica's export sector continues to show strong growth in 2025, with key industries leading the charge in international markets.

## Key Highlights

The Trade Board has reported significant increases in export permits processed this quarter, reflecting growing demand for Jamaican products worldwide.

**Agricultural Exports**
Blue Mountain Coffee remains our flagship export, with demand from the United States, Japan, and European markets reaching new highs. The certification process has been streamlined to help farmers meet international quality standards.

**Manufacturing Sector**
Local manufacturers have expanded their reach into Caribbean and North American markets, with processed foods and beverages showing particular strength.

## What This Means for Exporters

Businesses looking to expand their export operations should consider:

- Registering with the Trade Board for export permits
- Obtaining necessary certifications for target markets
- Exploring trade agreements that benefit Jamaican exporters

## Next Steps

The Jamaica Trade Board continues to provide support through the Pathway app, offering streamlined permit applications and market intelligence to help businesses succeed in global markets.

For more information, visit the Jamaica Trade Board office or contact our support team through the app.
  `.trim();

  const content = post.content || defaultContent;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setPlayingVideo(null);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setPlayingVideo(null);
  };

  const nextMedia = () => {
    setPlayingVideo(null);
    setLightboxIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setPlayingVideo(null);
    setLightboxIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const getVideoEmbedUrl = (item: MediaItem) => {
    if (item.platform === "youtube") {
      return `https://www.youtube.com/embed/${item.videoId}?autoplay=1`;
    }
    if (item.platform === "vimeo") {
      return `https://player.vimeo.com/video/${item.videoId}?autoplay=1`;
    }
    return "";
  };

  const currentMedia = media[lightboxIndex];

  return (
    <div className="min-h-full bg-background">
      {/* Fixed Header with Back Button */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between px-2 h-14">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Media */}
      {media.length > 0 && (
        <div
          className="aspect-video bg-muted overflow-hidden relative cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          {media[0].type === "video" ? (
            <>
              <img
                src={media[0].thumbnail || media[0].url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                </div>
              </div>
            </>
          ) : (
            <img
              src={media[0].url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          )}
          {media.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
              +{media.length - 1} more
            </div>
          )}
        </div>
      )}

      {/* Media Gallery Thumbnails */}
      {media.length > 1 && (
        <div className="px-4 py-3 border-b border-border">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={item.type === "video" ? item.thumbnail || item.url : item.url}
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-4">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          {post.author && (
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          )}
          {post.readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-sm max-w-none">
          {content.split("\n\n").map((paragraph, index) => {
            // Handle headings
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-lg font-semibold mt-6 mb-3">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            // Handle bold text paragraphs (subheadings)
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h3 key={index} className="text-base font-medium mt-4 mb-2">
                  {paragraph.replace(/\*\*/g, "")}
                </h3>
              );
            }
            // Handle lists
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n");
              return (
                <ul key={index} className="list-disc list-inside space-y-1 my-3 text-sm text-muted-foreground">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            // Regular paragraphs
            return (
              <p key={index} className="text-sm text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="mt-8 pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Related Topics</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Exports", "Trade", "Market Update", "Jamaica"].map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between p-4">
            <span className="text-white text-sm">
              {lightboxIndex + 1} / {media.length}
            </span>
            <button
              onClick={closeLightbox}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Lightbox Content */}
          <div className="flex-1 flex items-center justify-center relative px-4">
            {/* Previous Button */}
            {media.length > 1 && (
              <button
                onClick={prevMedia}
                className="absolute left-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Media Display */}
            <div className="w-full max-w-3xl aspect-video">
              {currentMedia.type === "video" ? (
                playingVideo === currentMedia.videoId ? (
                  <iframe
                    src={getVideoEmbedUrl(currentMedia)}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setPlayingVideo(currentMedia.videoId || null)}
                  >
                    <img
                      src={currentMedia.thumbnail || currentMedia.url}
                      alt={currentMedia.caption || "Video"}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <img
                  src={currentMedia.url}
                  alt={currentMedia.caption || post.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              )}
            </div>

            {/* Next Button */}
            {media.length > 1 && (
              <button
                onClick={nextMedia}
                className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </div>

          {/* Caption */}
          {currentMedia.caption && (
            <div className="p-4 text-center">
              <p className="text-white/80 text-sm">{currentMedia.caption}</p>
            </div>
          )}

          {/* Thumbnail Strip */}
          {media.length > 1 && (
            <div className="p-4 border-t border-white/10">
              <div className="flex justify-center gap-2 overflow-x-auto scrollbar-hide">
                {media.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setLightboxIndex(index);
                      setPlayingVideo(null);
                    }}
                    className={`relative flex-shrink-0 w-12 h-12 rounded overflow-hidden transition-all ${
                      index === lightboxIndex
                        ? "ring-2 ring-white opacity-100"
                        : "opacity-50 hover:opacity-75"
                    }`}
                  >
                    <img
                      src={item.type === "video" ? item.thumbnail || item.url : item.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="w-3 h-3 text-white" fill="currentColor" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
