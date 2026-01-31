import { useState, useEffect } from "react";
import { Home, TrendingUp, Bell, Search, Sparkles, MapPin, FileText, Menu, X, BookOpen, Info, HelpCircle, ChevronRight, Bookmark } from "lucide-react";

// Import pages
import HomePage from "./components/HomePage";
import MarketIntelPage from "./components/MarketIntelPage";
import AIAssistantPage from "./components/AIAssistantPage";
import SearchPage from "./components/SearchPage";
import ProfilePage from "./components/ProfilePage";
import NotificationsPage from "./components/NotificationsPage";
import PSIPage from "./components/PSIPage";
import JswiftPage from "./components/JswiftPage";
import HelpSupportPage from "./components/HelpSupportPage";
import PostViewPage from "./components/PostViewPage";
import BookmarksPage from "./components/BookmarksPage";
import SplashScreen from "./components/SplashScreen";

// Media item type for posts
interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  caption?: string;
  videoId?: string;
  platform?: "youtube" | "vimeo";
}

// Post type for viewing
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

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [previousPage, setPreviousPage] = useState("home");
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  // Handle saving/unsaving posts
  const handleToggleSave = (post: Post) => {
    setSavedPosts((prev: Post[]) => {
      const exists = prev.some((p: Post) => p.id === post.id);
      if (exists) {
        return prev.filter((p: Post) => p.id !== post.id);
      }
      return [...prev, post];
    });
  };

  const handleRemoveBookmark = (postId: number) => {
    setSavedPosts((prev: Post[]) => prev.filter((p: Post) => p.id !== postId));
  };

  const isPostSaved = (postId: number) => savedPosts.some((p: Post) => p.id === postId);

  // Auto-hide splash screen after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashFading(true);
      setTimeout(() => setShowSplash(false), 400); // Match fade-out animation duration
    }, 4000); // Display for 4 seconds
    return () => clearTimeout(timer);
  }, []);

  // Handle navigation
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedPost(null);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    setPreviousPage(currentPage);
    setSelectedPost(post);
    setCurrentPage("post");
  };

  // Handle back from post
  const handleBackFromPost = () => {
    setSelectedPost(null);
    setCurrentPage(previousPage);
  };

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "market", icon: TrendingUp, label: "Market" },
    { id: "notifications", icon: Bell, label: "Alerts" },
  ];

  // Left drawer state
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);

  // Resources section for left drawer
  const resourcesItems = [
    { id: "academy", icon: BookOpen, label: "ExportAcademy", badge: "New" },
    { id: "about", icon: Info, label: "About Pathway", badge: null },
    { id: "help", icon: HelpCircle, label: "Help & Support", badge: null },
  ];

  // Quick actions for left drawer
  const quickActions = [
    { id: "psi", icon: MapPin, label: "PSI Lookup" },
    { id: "jswift", icon: FileText, label: "JSWIFT" },
    { id: "bookmarks", icon: Bookmark, label: "Saved Posts" },
  ];

  // Reset drawer state when changing pages
  useEffect(() => {
    setLeftDrawerOpen(false);
  }, [currentPage]);

  return (
    <div className="min-h-screen w-full bg-muted/30 flex justify-center">
      {/* Phone Container */}
      <div className="flex flex-col h-screen w-full max-w-[430px] bg-background shadow-xl relative">
        {/* Header Bar - Hidden when viewing a post */}
        {currentPage !== "post" && (
          <header className="flex items-center justify-between px-4 h-14 bg-background z-40">
            <button
              onClick={() => setLeftDrawerOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            {currentPage === "home" ? (
              <img src={`${import.meta.env.BASE_URL}logos/logo.svg`} alt="Pathway" className="h-8" />
            ) : (
              <h1 className="font-semibold text-lg">
                {currentPage === "search" && "Search"}
                {currentPage === "market" && "Market Intel"}
                {currentPage === "notifications" && "Notifications"}
                {currentPage === "ai" && "AI Assistant"}
                {currentPage === "psi" && "PSI Lookup"}
                {currentPage === "jswift" && "JSWIFT"}
                {currentPage === "profile" && "Profile"}
                {currentPage === "help" && "Help & Support"}
                {currentPage === "about" && "About Pathway"}
                {currentPage === "academy" && "ExportAcademy"}
                {currentPage === "bookmarks" && "Saved Posts"}
              </h1>
            )}
            {currentPage === "home" ? (
              <button
                onClick={() => handleNavigate("notifications")}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
              </button>
            ) : (
              <div className="w-10 h-10" />
            )}
          </header>
        )}

        {/* Left Drawer Overlay */}
        {leftDrawerOpen && (
          <>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 z-50 animate-fade-in"
              onClick={() => setLeftDrawerOpen(false)}
            />

            {/* Left Drawer */}
            <div className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-background z-50 animate-slide-in-left flex flex-col">
              {/* Drawer Header */}
              <div className="px-4 py-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">Menu</p>
                  <button
                    onClick={() => setLeftDrawerOpen(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Services Section */}
                <div className="mt-4">
                  <p className="px-4 text-xs text-muted-foreground mb-2">Services</p>
                  <div className="divide-y divide-border">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => {
                            handleNavigate(action.id);
                            setLeftDrawerOpen(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors"
                        >
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <span className="flex-1 text-left text-sm">{action.label}</span>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Resources Section */}
                <div className="mt-4">
                  <p className="px-4 text-xs text-muted-foreground mb-2">Resources</p>
                  <div className="divide-y divide-border">
                    {resourcesItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleNavigate(item.id);
                            setLeftDrawerOpen(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors"
                        >
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <span className="flex-1 text-left text-sm">{item.label}</span>
                          {item.badge && (
                            <span className="text-xs text-primary font-medium">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="px-4 py-4 border-t border-border text-center text-xs text-muted-foreground">
                <img src={`${import.meta.env.BASE_URL}logos/logo.svg`} alt="Pathway" className="h-6 mx-auto mb-2" />
                <p>v1.0.0</p>
                <p className="mt-1">© 2026 Jamaica Trade Board Limited</p>
              </div>
            </div>
          </>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto w-full ${currentPage !== "post" ? "pb-20" : ""}`}>
        {currentPage === "home" && (
          <HomePage
            onPostClick={handlePostClick}
            onToggleSave={handleToggleSave}
            isPostSaved={isPostSaved}
          />
        )}
        {currentPage === "post" && selectedPost && (
          <PostViewPage post={selectedPost} onBack={handleBackFromPost} />
        )}
        {currentPage === "market" && <MarketIntelPage />}
        {currentPage === "ai" && <AIAssistantPage />}
        {currentPage === "search" && <SearchPage />}
        {currentPage === "notifications" && <NotificationsPage />}
        {currentPage === "psi" && <PSIPage />}
        {currentPage === "jswift" && <JswiftPage />}
        {currentPage === "profile" && <ProfilePage />}
        {currentPage === "help" && <HelpSupportPage />}
        {currentPage === "bookmarks" && (
          <BookmarksPage
            savedPosts={savedPosts}
            onPostClick={handlePostClick}
            onRemoveBookmark={handleRemoveBookmark}
          />
        )}
      </main>

      {/* Bottom Navigation Bar with Center FAB - Hidden when viewing a post */}
      {currentPage !== "post" && (
      <div className="absolute bottom-0 left-0 right-0 z-40">
        {/* Curved background behind FAB */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-20 h-10 bg-background rounded-t-full" />

        <nav className="bg-background/95 backdrop-blur-sm border-t border-border relative">
          <div className="flex items-center justify-around h-16 px-2">
            {/* Left nav items */}
            {navItems.slice(0, 2).map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="flex flex-col items-center justify-center min-w-[64px] py-1 transition-all"
                >
                  <div className={`p-1.5 rounded-full transition-all ${
                    isActive ? "bg-primary/10" : ""
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <span className={`text-[10px] mt-0.5 font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* Center FAB spacer */}
            <div className="w-20" />

            {/* Right nav items */}
            {navItems.slice(2).map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="flex flex-col items-center justify-center min-w-[64px] py-1 transition-all"
                >
                  <div className={`relative p-1.5 rounded-full transition-all ${
                    isActive ? "bg-primary/10" : ""
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`} />
                    {/* Notification dot for Alerts */}
                    {item.id === "notifications" && (
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </div>
                  <span className={`text-[10px] mt-0.5 font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Center Floating AI Button */}
          <button
            onClick={() => handleNavigate("ai")}
            className={`absolute left-1/2 -translate-x-1/2 -top-7 w-14 h-14 rounded-full shadow-lg flex flex-col items-center justify-center transition-all ${
              currentPage === "ai"
                ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                : "bg-primary text-primary-foreground hover:shadow-xl hover:scale-105"
            }`}
          >
            <Sparkles className={`w-6 h-6 ${currentPage === "ai" ? "animate-pulse" : ""}`} />
          </button>
          {/* AI Label */}
          <span className={`absolute left-1/2 -translate-x-1/2 bottom-1 text-[10px] font-medium transition-colors ${
            currentPage === "ai" ? "text-primary" : "text-muted-foreground"
          }`}>
            AI
          </span>
        </nav>
      </div>
      )}

      {/* Splash Screen */}
      {showSplash && (
        <div className={splashFading ? "animate-fade-out" : ""}>
          <SplashScreen onComplete={() => setShowSplash(false)} />
        </div>
      )}
      </div>
    </div>
  );
}
