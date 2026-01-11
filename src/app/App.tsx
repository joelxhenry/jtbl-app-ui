import { useState, useEffect, useRef } from "react";
import { Home, TrendingUp, Bell, Search, User, Sparkles, MapPin, FileText } from "lucide-react";

// Import pages
import HomePage from "./components/HomePage";
import MarketIntelPage from "./components/MarketIntelPage";
import AIAssistantPage from "./components/AIAssistantPage";
import SearchPage from "./components/SearchPage";
import ProfilePage from "./components/ProfilePage";
import NotificationsPage from "./components/NotificationsPage";
import PSIPage from "./components/PSIPage";
import JswiftPage from "./components/JswiftPage";
import AuthOverlay from "./components/AuthOverlay";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [pendingFeature, setPendingFeature] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);

  // Auto-hide splash screen after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashFading(true);
      setTimeout(() => setShowSplash(false), 400); // Match fade-out animation duration
    }, 4000); // Display for 4 seconds
    return () => clearTimeout(timer);
  }, []);

  // Handle navigation with authentication check
  const handleNavigate = (page: string, requiresAuth: boolean = false) => {
    if (requiresAuth && !isAuthenticated) {
      setPendingFeature(page);
      setShowAuthOverlay(true);
    } else {
      setCurrentPage(page);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthOverlay(false);
    if (pendingFeature) {
      setCurrentPage(pendingFeature);
      setPendingFeature(null);
    }
  };

  const handleAuthCancel = () => {
    setShowAuthOverlay(false);
    setPendingFeature(null);
  };

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "market", icon: TrendingUp, label: "Market" },
    { id: "search", icon: Search, label: "Search" },
    { id: "profile", icon: User, label: "More" },
    { id: "notifications", icon: Bell, label: "Alerts" },
  ];

  // Pages that hide AI FAB
  const hideAiFab = ["ai", "psi", "jswift"];

  // Pages that show the quick actions drawer
  const pagesWithDrawer = ["home", "market", "search"];
  const showDrawer = pagesWithDrawer.includes(currentPage);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showDrawerIndicator, setShowDrawerIndicator] = useState(true);

  // Quick actions for drawer
  const quickActions = [
    { id: "search", icon: Search, label: "Local Search" },
    { id: "psi", icon: MapPin, label: "PSI" },
    { id: "jswift", icon: FileText, label: "JSWIFT" },
  ];

  // Floating button scroll detection
  const [showFab, setShowFab] = useState(true);
  const lastScrollY = useRef(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      const currentScrollY = main.scrollTop;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (Math.abs(scrollDelta) < 5) return;

      // Check if content is actually scrollable
      const isScrollable = main.scrollHeight > main.clientHeight;

      if (!isScrollable) {
        setShowFab(true);
        setShowDrawerIndicator(true);
        return;
      }

      if (currentScrollY <= 10) {
        setShowFab(true);
        setShowDrawerIndicator(true);
      } else if (scrollDelta < 0) {
        setShowFab(true);
        setShowDrawerIndicator(true);
      } else if (scrollDelta > 0) {
        setShowFab(false);
        setShowDrawerIndicator(false);
        setDrawerOpen(false);
      }

      lastScrollY.current = currentScrollY;
    };

    main.addEventListener("scroll", handleScroll, { passive: true });
    return () => main.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  // Reset drawer state when changing pages
  useEffect(() => {
    setDrawerOpen(false);
    setShowDrawerIndicator(true);
    lastScrollY.current = 0;
  }, [currentPage]);

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 overflow-y-auto pb-20 w-full">
        {currentPage === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
          />
        )}
        {currentPage === "market" && <MarketIntelPage />}
        {currentPage === "ai" && <AIAssistantPage />}
        {currentPage === "search" && <SearchPage />}
        {currentPage === "notifications" && <NotificationsPage />}
        {currentPage === "psi" && <PSIPage />}
        {currentPage === "jswift" && <JswiftPage />}
        {currentPage === "profile" && (
          <ProfilePage
            isAuthenticated={isAuthenticated}
            onLoginRequest={() => setShowAuthOverlay(true)}
          />
        )}
      </main>

      {/* Floating AI Button */}
      {!hideAiFab.includes(currentPage) && (
        <button
          onClick={() => handleNavigate("ai")}
          className={`fixed right-4 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/90 ${
            showFab ? "opacity-100" : "translate-y-20 opacity-0"
          } ${drawerOpen ? "bottom-44" : showDrawer && showDrawerIndicator ? "bottom-24" : "bottom-20"}`}
        >
          <Sparkles className="w-5 h-5" />
        </button>
      )}

      {/* Bottom Navigation Bar with Quick Actions Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        {/* Quick Actions Drawer - expands upward */}
        {showDrawer && (
          <div className="bg-white border-t border-border">
            {/* Quick Actions Content - slides up */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                drawerOpen && showDrawerIndicator ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 py-3">
                <div className="flex justify-around">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => {
                          if (action.id === "jswift") {
                            if (isAuthenticated) {
                              handleNavigate("jswift");
                            } else {
                              setPendingFeature("jswift");
                              setShowAuthOverlay(true);
                            }
                          } else if (action.id === "psi") {
                            handleNavigate("psi");
                          } else {
                            handleNavigate("search");
                          }
                          setDrawerOpen(false);
                        }}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-muted transition-colors"
                      >
                        <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center">
                          <Icon className="w-5 h-5 text-foreground" />
                        </div>
                        <span className="text-[11px] font-medium text-foreground">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pull-Up Drawer Indicator */}
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                showDrawerIndicator ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="w-full flex items-center justify-center py-2 hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-1 bg-foreground/30 rounded-full"></div>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Bar */}
        <nav className="bg-white border-t border-border">
          <div className="flex items-center justify-around h-14 max-w-screen-xl mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Authentication Overlay */}
      {showAuthOverlay && (
        <AuthOverlay
          onSuccess={handleAuthSuccess}
          onCancel={handleAuthCancel}
        />
      )}

      {/* Splash Screen */}
      {showSplash && (
        <div className={splashFading ? "animate-fade-out" : ""}>
          <SplashScreen onComplete={() => setShowSplash(false)} />
        </div>
      )}
    </div>
  );
}
