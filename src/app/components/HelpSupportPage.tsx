import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function HelpSupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I apply for an export permit?",
      answer:
        "To apply for an export permit, navigate to the JSWIFT section from the menu. You'll need to provide details about your goods, destination country, and supporting documentation. Processing typically takes 3-5 business days.",
    },
    {
      question: "What is a PSI certificate?",
      answer:
        "A Pre-Shipment Inspection (PSI) certificate verifies that imported goods meet Jamaica's regulatory standards. It's required for certain categories of imports and must be obtained before goods are shipped.",
    },
    {
      question: "How can I check my permit status?",
      answer:
        "Use the JSWIFT Lookup feature in the app to check your permit status. Enter your permit reference number (e.g., EP-2024-0892) to view current status, dates, and any notes from reviewers.",
    },
    {
      question: "What documents are required for export?",
      answer:
        "Required documents vary by product type but typically include: Commercial Invoice, Packing List, Certificate of Origin, and product-specific certifications (e.g., phytosanitary certificates for agricultural products).",
    },
    {
      question: "How do I renew an expired certificate?",
      answer:
        "To renew an expired certificate, submit a new application through JSWIFT referencing your previous certificate number. Renewal applications are typically processed faster than new applications.",
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+1 (876) 967-0507",
      action: "tel:+18769670507",
    },
    {
      icon: Mail,
      label: "Email",
      value: "support@tradeboard.gov.jm",
      action: "mailto:support@tradeboard.gov.jm",
    },
    {
      icon: MessageCircle,
      label: "Live Chat",
      value: "Available 8AM - 5PM",
      action: null,
    },
  ];

  const resources = [
    { icon: FileText, label: "User Guide", description: "Complete app documentation" },
    { icon: HelpCircle, label: "Video Tutorials", description: "Step-by-step walkthroughs" },
    { icon: ExternalLink, label: "JTBL Website", description: "tradeboard.gov.jm" },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-full bg-background pb-6">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <h1 className="text-lg font-semibold">Help & Support</h1>
        <p className="text-sm text-muted-foreground">
          Get answers and assistance
        </p>
      </div>

      {/* Contact Methods */}
      <div className="px-4 py-4">
        <p className="text-xs text-muted-foreground mb-3">Contact Us</p>
        <div className="grid grid-cols-3 gap-3">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <button
                key={index}
                onClick={() => method.action && window.open(method.action, "_self")}
                className="flex flex-col items-center p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium">{method.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Office Hours */}
      <div className="px-4 py-3 mx-4 bg-muted/30 rounded-xl flex items-center gap-3">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Office Hours</p>
          <p className="text-xs text-muted-foreground">
            Monday - Friday, 8:00 AM - 5:00 PM
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="mt-6">
        <p className="px-4 text-xs text-muted-foreground mb-2">
          Frequently Asked Questions
        </p>
        <div className="divide-y divide-border">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="text-sm text-left pr-4">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="mt-6">
        <p className="px-4 text-xs text-muted-foreground mb-2">Resources</p>
        <div className="divide-y divide-border">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <button
                key={index}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{resource.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Physical Location */}
      <div className="mt-6 px-4">
        <p className="text-xs text-muted-foreground mb-2">Visit Us</p>
        <div className="p-4 bg-muted/30 rounded-xl">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Jamaica Trade Board Limited</p>
              <p className="text-xs text-muted-foreground mt-1">
                Air Jamaica Building
                <br />
                72 Harbour Street
                <br />
                Kingston, Jamaica
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Feedback */}
      <div className="mt-6 px-4">
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
          Submit Feedback
        </button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Help us improve the Pathway app
        </p>
      </div>
    </div>
  );
}
