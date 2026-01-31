import { Bookmark, Clock } from "lucide-react";
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

interface BookmarksPageProps {
  savedPosts: Post[];
  onPostClick?: (post: Post) => void;
  onRemoveBookmark?: (postId: number) => void;
}

export default function BookmarksPage({ savedPosts, onPostClick, onRemoveBookmark }: BookmarksPageProps) {
  if (savedPosts.length === 0) {
    return (
      <div className="min-h-full bg-background flex flex-col items-center justify-center px-6 py-12">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Bookmark className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold mb-2">No saved posts yet</h2>
        <p className="text-sm text-muted-foreground text-center">
          Tap the bookmark icon on any post to save it for later reading.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <p className="text-sm text-muted-foreground">
          {savedPosts.length} saved {savedPosts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {/* Saved Posts List */}
      <div>
        {savedPosts.map((post) => (
          <article
            key={post.id}
            className="border-b border-border cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => onPostClick?.(post)}
          >
            <div className="flex gap-3 p-4">
              {/* Thumbnail */}
              {post.image && (
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-primary">
                  {post.category}
                </span>
                <h3 className="font-semibold text-sm leading-tight mt-1 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  {post.readTime && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveBookmark?.(post.id);
                }}
                className="p-2 -mr-2 hover:bg-muted rounded-full transition-colors self-start"
              >
                <Bookmark className="w-4 h-4 text-primary" fill="currentColor" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
