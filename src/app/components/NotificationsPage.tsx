import { useState } from "react";
import {
  Bell,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";

interface Notification {
  id: number;
  type: "alert" | "update" | "success" | "reminder";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "success",
      title: "Export License Approved",
      message: "Your export license application EP-2024-0892 has been approved.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "alert",
      title: "Document Expiring Soon",
      message: "Your PSI certificate will expire in 7 days. Please renew to avoid service interruption.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "update",
      title: "Fee Schedule Updated",
      message: "The 2026 fee schedule is now available. View the changes in your dashboard.",
      time: "3 hours ago",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Scheduled Inspection",
      message: "Reminder: Your PSI inspection is scheduled for tomorrow at 10:00 AM.",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "success",
      title: "Payment Received",
      message: "Your payment of $150.00 for LPC Certificate has been processed.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 6,
      type: "update",
      title: "System Maintenance",
      message: "Scheduled maintenance on Jan 5th, 2026 from 11PM-3AM. Services may be unavailable.",
      time: "2 days ago",
      read: true,
    },
    {
      id: 7,
      type: "alert",
      title: "Action Required",
      message: "Additional documents needed for your JSWIFT application. Please upload within 5 days.",
      time: "3 days ago",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "reminder":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => !n.read);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-full bg-background">
      {/* Filter tabs */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center px-4 py-3 gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`text-sm transition-colors ${
              filter === "all"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`text-sm transition-colors ${
              filter === "unread"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="ml-auto text-sm text-primary"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Bell className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {filter === "unread" ? "No unread notifications" : "No notifications"}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {filteredNotifications.map((notification: Notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`flex gap-3 px-4 py-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                !notification.read ? "bg-primary/5" : ""
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm ${!notification.read ? "font-semibold" : ""}`}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
                className="p-1 hover:bg-muted rounded-full transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Clear all */}
      {notifications.length > 0 && (
        <div className="p-4 text-center">
          <button
            onClick={() => setNotifications([])}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
