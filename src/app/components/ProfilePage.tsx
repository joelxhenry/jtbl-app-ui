import {
  User,
  Building2,
  Bell,
  Shield,
  BookOpen,
  Info,
  HelpCircle,
  LogIn,
  ChevronRight,
} from "lucide-react";
import GovBranding from "./GovBranding";

interface ProfilePageProps {
  isAuthenticated: boolean;
  onLoginRequest: () => void;
}

export default function ProfilePage({
  isAuthenticated,
  onLoginRequest,
}: ProfilePageProps) {
  const userData = {
    name: "John Smith",
    company: "Caribbean Export Solutions Ltd.",
    registrationId: "PTW-2024-1234",
    email: "j.smith@caribexport.com",
  };

  const recentActivity = [
    {
      id: 1,
      type: "PSI Inspection",
      reference: "PSI-2024-0451",
      date: "2 days ago",
      status: "Completed",
    },
    {
      id: 2,
      type: "Export Permit",
      reference: "EP-2024-0892",
      date: "1 week ago",
      status: "Approved",
    },
    {
      id: 3,
      type: "LPC Certificate",
      reference: "LPC-2024-0156",
      date: "2 weeks ago",
      status: "Active",
    },
  ];

  const settingsSections = [
    {
      title: "Account",
      items: [
        { icon: Shield, label: "Security Center", badge: null },
        { icon: Bell, label: "Notifications", badge: "3" },
      ],
    },
    {
      title: "Resources",
      items: [
        { icon: BookOpen, label: "ExportAcademy", badge: "New" },
        { icon: Info, label: "About Pathway", badge: null },
        { icon: HelpCircle, label: "Help & Support", badge: null },
      ],
    },
  ];

  return (
    <div className="min-h-full bg-background pb-6">
      {/* User Profile / Login Prompt */}
      {isAuthenticated ? (
        <>
          {/* Profile Header */}
          <div className="px-4 py-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <User className="w-7 h-7 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{userData.name}</p>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="truncate">{userData.company}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ID: {userData.registrationId}
            </p>
          </div>

          {/* Recent Activity */}
          <div className="mt-6">
            <p className="px-4 text-xs text-muted-foreground mb-2">Recent Activity</p>
            <div className="divide-y divide-border">
              {recentActivity.map((activity) => (
                <button
                  key={activity.id}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium">{activity.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.reference}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-600">{activity.status}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="px-4 py-8 text-center border-b border-border">
          <LogIn className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="font-semibold mb-2">Sign In to Your Account</p>
          <p className="text-sm text-muted-foreground mb-6">
            Access secure features like JSWIFT status tracking, permit
            applications, and personalized trade insights.
          </p>
          <button
            onClick={onLoginRequest}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
          <p className="text-xs text-muted-foreground mt-3">
            Or use your JSWIFT credentials
          </p>
        </div>
      )}

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mt-6">
          <p className="px-4 text-xs text-muted-foreground mb-2">{section.title}</p>
          <div className="divide-y divide-border">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <button
                  key={itemIndex}
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
      ))}

      {/* Government Branding */}
      <div className="px-4 pt-8 pb-4">
        <GovBranding variant="dark" size="sm" showLabels />
      </div>

      {/* App Info */}
      <div className="px-4 pt-4 pb-2 text-center text-xs text-muted-foreground border-t border-border">
        <p className="mb-2">An official application of the Government of Jamaica</p>
        <p>Pathway v1.0.0</p>
        <p className="mt-1">© 2026 Jamaica Trade Board Limited</p>
        <p className="mt-1">Ministry of Industry, Investment and Commerce</p>
      </div>
    </div>
  );
}
