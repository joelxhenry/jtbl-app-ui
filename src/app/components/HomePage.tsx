import { useState } from "react";
import { Share2, Bookmark, Bell } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (page: string, requiresAuth?: boolean) => void;
  isAuthenticated: boolean;
}

export default function HomePage({ onNavigate, isAuthenticated }: HomePageProps) {
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

  // Feed data - mix of image and text posts
  const feedItems = [
    {
      id: 1,
      author: "Pathway Official",
      avatar: "JT",
      title: "Export License Processing Time Reduced",
      content: "Great news for exporters! We've streamlined our processes to reduce export license processing time by 40%. This improvement is part of our ongoing commitment to facilitate trade.",
      image: "https://images.unsplash.com/photo-1578574437613-2e801bae9c35?w=800&h=600&fit=crop",
      category: "policy",
      time: "2h",
    },
    {
      id: 2,
      author: "Trade Relations",
      avatar: "TR",
      title: "Important Notice: Document Submission Deadline",
      content: "Reminder: All export documentation for Q1 2026 must be submitted by January 15th. Late submissions may result in processing delays. Please ensure all paperwork is complete and accurate.",
      image: null,
      category: "announcements",
      time: "3h",
    },
    {
      id: 3,
      author: "Trade Relations",
      avatar: "TR",
      title: "New Trade Agreement with EU Countries",
      content: "Jamaica has signed a new trade agreement with EU countries, opening up new markets for local exporters. This historic agreement will boost our agricultural and manufacturing sectors.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      category: "trade",
      time: "5h",
    },
    {
      id: 4,
      author: "Pathway Finance",
      avatar: "JF",
      title: "Updated Fee Schedule Available",
      content: "The 2026 fee schedule for all Pathway services is now available on our website. Key changes include adjusted rates for PSI inspections and expedited processing options. Download the full document from our resources section.",
      image: null,
      category: "announcements",
      time: "8h",
    },
    {
      id: 5,
      author: "Pathway Finance",
      avatar: "JF",
      title: "PSI Inspection Fees Updated for 2026",
      content: "Please note the updated PSI inspection fee schedule effective January 2026. The new rates reflect our commitment to maintaining high-quality inspection standards.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      category: "policy",
      time: "1d",
    },
    {
      id: 6,
      author: "Customer Service",
      avatar: "CS",
      title: "Holiday Office Hours",
      content: "Please note our modified hours for the upcoming holiday season: Dec 23-24 (8AM-2PM), Dec 25-26 (Closed), Dec 27-30 (8AM-4PM), Dec 31 (8AM-12PM), Jan 1 (Closed). Regular hours resume January 2nd.",
      image: null,
      category: "services",
      time: "1d",
    },
    {
      id: 7,
      author: "Pathway Tech",
      avatar: "JT",
      title: "Digital Certificate System Now Live",
      content: "Our new digital certificate system is now live! Exporters can now receive and manage their certificates electronically, reducing paperwork and processing times.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      category: "system",
      time: "2d",
    },
    {
      id: 8,
      author: "Pathway Official",
      avatar: "JT",
      title: "System Maintenance Scheduled",
      content: "Scheduled maintenance will occur on January 5th, 2026 from 11PM to 3AM. During this time, online services may be temporarily unavailable. We apologize for any inconvenience.",
      image: null,
      category: "system",
      time: "2d",
    },
    {
      id: 9,
      author: "Customer Service",
      avatar: "CS",
      title: "Trade Board Office Hours Extended",
      content: "To better serve you, we've extended our office hours. Our Kingston office is now open from 7:30 AM to 5:00 PM on weekdays. Visit us for all your trade-related inquiries.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      category: "services",
      time: "3d",
    },
    {
      id: 10,
      author: "Pathway Official",
      avatar: "JT",
      title: "Trade Fair Registration Open",
      content: "Register now for the International Trade Exhibition 2026! Connect with buyers, showcase your products, and expand your business globally.",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
      category: "announcements",
      time: "4d",
    },
  ];

  const filteredFeed = activeCategory === "all"
    ? feedItems
    : feedItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold">Pathway</h1>
          <button
            onClick={() => onNavigate("notifications")}
            className="relative p-2 hover:bg-muted rounded-full"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="py-3 overflow-x-auto scrollbar-hide">
          <div className="flex justify-around">
            {categories.map((category) => (
              <div key={category.id} className="px-2">
                <button
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                    }`}
                >
                  {category.label}
                </button>
              </div>

            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div>
        {filteredFeed.map((item) => (
          <article key={item.id} className="border-b border-border">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-xs font-semibold">
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{item.author}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-muted rounded-full">
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 hover:bg-muted rounded-full">
                  <Bookmark className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Image */}
            {item.image && (
              <div className="aspect-[16/10] bg-muted">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="px-4 py-3">
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className={`text-sm text-muted-foreground ${item.image ? 'line-clamp-2' : ''}`}>
                {item.content}
              </p>
              {item.image && (
                <button className="text-xs text-primary mt-1">more</button>
              )}
            </div>
          </article>
        ))}

        <div className="py-8 text-center text-sm text-muted-foreground">
          You're all caught up
        </div>
      </div>
    </div>
  );
}
