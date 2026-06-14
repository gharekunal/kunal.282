/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "framer-motion";
import { 
  BarChart3, 
  ChevronRight, 
  ChevronLeft,
  Globe, 
  Instagram, 
  Layers, 
  Mail, 
  MessageSquare,
  MessageCircle, 
  Play, 
  Rocket, 
  ShoppingBag, 
  TrendingUp,
  Zap,
  Check,
  Star,
  Plus,
  Send,
  Loader2,
  X,
  Clock,
  Sparkles,
  Phone,
  Calendar,
  ExternalLink,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
  Printer,
  Download,
  FileText,
  CreditCard,
  Percent,
  User,
  Users,
  Key,
  Lock,
  Shield,
  Info,
  RefreshCw,
  Link,
  Copy,
  Building2,
  Home,
  Utensils,
  Activity,
  Brush,
  Scissors,
  Shirt,
  Heart,
  Video
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import * as d3 from "d3";

const WhatsAppLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    className={className} 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.791 1.454 5.864 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);


// --- Types ---
type ModalType = 'privacy' | 'terms' | 'cookie' | 'call' | 'project' | 'service' | 'checkout' | 'receipt' | 'portal' | 'admin' | 'review' | null;

interface ModalContent {
  type: ModalType;
  data?: any;
}

// --- Image Proxying Helper ---
const getProxiedImageUrl = (url: string, seed: string = "Client") => {
  if (!url) {
    if (seed) return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0f172a&textColor=94a3b8`;
    return "";
  }
  
  if (url.startsWith("data:image/svg+xml")) {
    if (url.includes(";base64,")) return url;
    const headerPattern = /^data:image\/svg\+xml;?(?:utf8|utf-8)?,/i;
    if (headerPattern.test(url)) {
      const xmlPart = url.replace(headerPattern, "");
      try {
        const decodedXml = decodeURIComponent(xmlPart);
        const base64 = btoa(unescape(encodeURIComponent(decodedXml)));
        return `data:image/svg+xml;base64,${base64}`;
      } catch (e) {
        return `data:image/svg+xml;utf8,${encodeURIComponent(xmlPart)}`;
      }
    }
  }

  if (url.startsWith("data:") || url.startsWith("/") || url.startsWith("blob:") || url.startsWith("./")) {
    return url;
  }
  
  return `/api/proxy-image?url=${encodeURIComponent(url)}&seed=${encodeURIComponent(seed)}`;
};

// --- LazyImage Component with Blurred Loading Effect ---
const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  referrerPolicy = "no-referrer", 
  crossOrigin,
  onError
}: { 
  key?: any;
  src: string; 
  alt: string; 
  className?: string; 
  containerClassName?: string;
  referrerPolicy?: "no-referrer" | "origin" | "unsafe-url" | "no-referrer-when-downgrade" | "origin-when-cross-origin";
  crossOrigin?: "anonymous" | "use-credentials";
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setErrorOccurred(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!isLoaded && !errorOccurred && (
        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md animate-pulse z-[2]" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-all duration-700 ease-in-out ${
          isLoaded || errorOccurred 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-[0.98] pointer-events-none absolute"
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          setErrorOccurred(true);
          if (onError) onError(e);
        }}
        referrerPolicy={referrerPolicy}
        crossOrigin={crossOrigin}
      />
    </div>
  );
};

// --- Logo Component ---
const ClarixLogo = ({ size = "md", showText = true, printClass = "" }: { size?: "sm" | "md" | "lg"; showText?: boolean; printClass?: string }) => {
  const sizeClasses = {
    sm: { box: "w-7 h-7", text: "text-sm md:text-base", stroke: "1.5" },
    md: { box: "w-10 h-10", text: "text-lg md:text-xl", stroke: "2" },
    lg: { box: "w-14 h-14", text: "text-2xl md:text-3xl", stroke: "2.5" }
  }[size];

  const logoUrl = "";
  const [imgError, setImgError] = useState(true);
  const [processedUrl, setProcessedUrl] = useState<string>("");

  useEffect(() => {
    if (!logoUrl) return;
    const proxied = getProxiedImageUrl(logoUrl);
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = proxied;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setProcessedUrl(proxied);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Remove white or near-white background pixels cleanly
        // with anti-aliasing edge smoothing
        const threshold = 220;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          if (r > threshold && g > threshold && b > threshold) {
            const brightness = (r + g + b) / 3;
            const ratio = (255 - brightness) / (255 - threshold);
            data[i + 3] = Math.max(0, Math.min(255, Math.round(data[i + 3] * ratio)));
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        setProcessedUrl(canvas.toDataURL());
      } catch (err) {
        console.error("Error processing logo background removal:", err);
        setProcessedUrl(proxied);
      }
    };
    img.onerror = () => {
      setImgError(true);
    };
  }, [logoUrl]);

  return (
    <div className="flex items-center font-display font-medium tracking-tight group cursor-pointer">
      {showText && (
        <span className={`${sizeClasses.text} font-bold tracking-widest text-white transition-colors duration-300 group-hover:text-blue-400 ${printClass}`}>
          Clarix<span className="text-blue-500 font-extrabold print-accent-text">LABS</span>
        </span>
      )}
    </div>
  );
};

// --- Modals ---

const ModalPortal = ({ isOpen, onClose, size = "max-w-2xl", children }: { isOpen: boolean; onClose: () => void; size?: string; children: ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative bg-[#11111a] border border-white/10 w-full ${size} max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl`}
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white z-[110]">
            <X size={20} />
          </button>
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

interface SmtpToastData {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  diagnostic?: string;
}

const ToastContainer = () => {
  const [toasts, setToasts] = useState<SmtpToastData[]>([]);

  useEffect(() => {
    const handleAddToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type?: SmtpToastData['type']; diagnostic?: string }>;
      const { message, type = "info", diagnostic } = customEvent.detail;
      const id = Math.random().toString(36).substring(2, 9);
      
      setToasts((prev) => [...prev, { id, message, type, diagnostic }]);

      // Auto-remove toast after 7 seconds
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 7000);

      return () => clearTimeout(timer);
    };

    window.addEventListener("show-smtp-toast", handleAddToast);
    return () => {
      window.removeEventListener("show-smtp-toast", handleAddToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className={`pointer-events-auto p-4 rounded-2xl border flex gap-3.5 backdrop-blur-md shadow-2xl transition-all ${
              toast.type === "error" 
                ? "bg-red-950/90 border-red-500/30 text-red-200" 
                : toast.type === "warning"
                ? "bg-amber-950/90 border-amber-500/30 text-amber-200"
                : toast.type === "success"
                ? "bg-emerald-900/90 border-emerald-500/30 text-emerald-200"
                : "bg-blue-950/90 border-blue-500/30 text-blue-200"
            }`}
          >
            <div className="flex-shrink-0 mt-0.5 text-base">
              {toast.type === "error" && "⚠️"}
              {toast.type === "success" && "✓"}
              {toast.type === "warning" && "⚡"}
              {toast.type === "info" && "ℹ"}
            </div>

            <div className="flex-grow space-y-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-widest font-mono">
                {toast.type === "error" ? "SMTP Gateway Alert" : toast.type === "warning" ? "SMTP Warning" : "System Notification"}
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300 font-medium">
                {toast.message}
              </p>
              {toast.diagnostic && (
                <div className="p-1.5 px-2 bg-black/40 border border-white/5 rounded-lg font-mono text-[9px] text-slate-400 break-all overflow-hidden max-h-[60px] overflow-y-auto">
                  {toast.diagnostic}
                </div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white text-sm cursor-pointer self-start p-0.5 hover:bg-white/5 rounded"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const AdminLeadsView = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; success?: boolean; msg?: string } | null>(null);
  const [clearStatus, setClearStatus] = useState<string | null>(null);
  const [retryingStates, setRetryingStates] = useState<Record<string, { loading: boolean; error?: string }>>({});

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/get-inquiries");
      const d = await res.json();
      if (d.success) {
        setLeads(d.inquiries || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRetryEmail = async (timestamp: string) => {
    try {
      setRetryingStates(prev => ({ ...prev, [timestamp]: { loading: true } }));
      const res = await fetch("/api/retry-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ timestamp })
      });
      const d = await res.json();
      if (res.ok && d.success) {
        setRetryingStates(prev => ({ ...prev, [timestamp]: { loading: false } }));
        // Update local state list immediately
        setLeads(prev => prev.map(lead => {
          if (lead.timestamp === timestamp) {
            return {
              ...lead,
              emailSent: true,
              diagnosticMessage: "Successfully delivered on retry attempt!"
            };
          }
          return lead;
        }));
      } else {
        setRetryingStates(prev => ({
          ...prev,
          [timestamp]: { loading: false, error: d.error || "Failed to deliver on retry attempt." }
        }));
      }
    } catch (err: any) {
      setRetryingStates(prev => ({
        ...prev,
        [timestamp]: { loading: false, error: err.message || "Network connection failure" }
      }));
    }
  };

  const handleTestSMTP = async () => {
    try {
      setTestStatus({ loading: true });
      const res = await fetch(window.location.origin + "/api/test-smtp", { method: "POST" });
      const contentType = res.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        const d = await res.json();
        if (res.ok && d.success) {
          setTestStatus({ loading: false, success: true, msg: d.message });
        } else {
          setTestStatus({ loading: false, success: false, msg: d.error || "Failed" });
        }
      } else {
        const text = await res.text();
        const cleanText = text.substring(0, 120) + (text.length > 120 ? "..." : "");
        setTestStatus({ 
          loading: false, 
          success: false, 
          msg: `Server returned an invalid HTML/Text response (Status: ${res.status}). Preview: "${cleanText}"` 
        });
      }
    } catch (err: any) {
      setTestStatus({ loading: false, success: false, msg: err.message || "Network error" });
    }
  };

  const handleClearLeads = async () => {
    if (!window.confirm("Are you absolutely sure you want to clear/delete all offline lead backup logs?")) return;
    try {
      const res = await fetch("/api/clear-inquiries", { method: "POST" });
      const d = await res.json();
      if (d.success) {
        setClearStatus("Cleared successfully!");
        setLeads([]);
        setTimeout(() => setClearStatus(null), 3000);
      }
    } catch(e) {
      setClearStatus("Failed to clear inquiries");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="bg-[#0c0e1a] text-slate-100 p-6 rounded-2xl border border-white/10 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wider text-blue-400">Leads & SMTP Diagnostics</h2>
          <p className="text-xs text-slate-400">View website lead submissions and test email notifications</p>
        </div>
        <button 
          onClick={fetchLeads}
          className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold cursor-pointer active:scale-95 transition-all text-white"
        >
          Refresh Leads
        </button>
      </div>

      {/* SMTP Test Console */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 font-mono">SMTP Delivery Test</h4>
        <p className="text-xs text-slate-400 mb-4">
          Click below to verify if your current Secrets credentials (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL) are configured and working properly.
        </p>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={handleTestSMTP}
            disabled={testStatus?.loading}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-bold text-[10px] uppercase tracking-wider disabled:opacity-50 text-white cursor-pointer active:scale-95 transition-all"
          >
            {testStatus?.loading ? "Verifying SMTP Connection..." : "Test SMTP Connection"}
          </button>
          
          <button
            onClick={handleClearLeads}
            className="px-3 py-2 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 rounded-lg font-semibold text-[10px] transition-all uppercase tracking-wider cursor-pointer active:scale-95"
          >
            Clear Lead Logs
          </button>
          {clearStatus && <span className="text-xs text-amber-400">{clearStatus}</span>}
        </div>

        {testStatus?.msg && (
          <div className={`mt-4 p-3 rounded-lg border text-xs leading-relaxed font-mono ${
            testStatus.success 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/20 text-rose-300"
          }`}>
            <span className="font-bold">{testStatus.success ? "✓ SMTP CONFIRMED" : "✗ SMTP ERROR"}:</span> {testStatus.msg}
            {!testStatus.success && (
              <div className="mt-2 text-slate-400 text-[11px] font-sans leading-relaxed">
                <strong>Troubleshooting Steps:</strong>
                <ol className="list-decimal list-inside space-y-1 mt-1">
                  <li>In AI Studio workspace, open <strong>Settings (gear icon in bottom-left or top-right profile area) &gt; Secrets</strong></li>
                  <li>Ensure active credentials exist: <strong>SMTP_HOST</strong> (e.g. <code>smtp.gmail.com</code>), <strong>SMTP_PORT</strong> (e.g. <code>587</code>), <strong>SMTP_USER</strong>, <strong>SMTP_PASS</strong>, and <strong>CONTACT_EMAIL</strong></li>
                  <li>For Gmail accounts, you <strong>must</strong> generate and use a 16-character <strong>App Password</strong> rather than your primary login password.</li>
                </ol>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Inquiry Logs list */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 font-mono">Lead Submissions Backup ({leads.length})</h4>
        
        {loading ? (
          <div className="text-center py-8 text-xs text-slate-500">Loading resilient offline backup...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-white/5 rounded-xl">
            No inquiries logged on this container instance yet.
          </div>
        ) : (
          <div className="space-y-3">
            {[...leads].reverse().map((lead, idx) => (
              <div key={idx} className="bg-[#090b14] p-4 border border-white/5 rounded-xl text-xs space-y-2">
                <div className="flex justify-between items-start border-b border-white/5 pb-2">
                  <div>
                    <span className="font-bold text-slate-200 text-sm">{lead.name || "Anonymous Client"}</span>
                    <span className="ml-2 font-mono text-[10px] text-slate-400">({lead.service || "General"})</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(lead.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  <div><strong className="text-slate-400">Email:</strong> <span className="text-blue-400 font-mono select-all">{lead.email || "—"}</span></div>
                  <div><strong className="text-slate-400">WhatsApp:</strong> <span className="text-green-400 font-mono select-all">{lead.whatsapp || "—"}</span></div>
                </div>

                {lead.goals && (
                  <div className="p-2 bg-[#05060a] rounded-lg border border-white/5 text-[11px] text-slate-300 whitespace-pre-wrap">
                    <strong className="text-slate-400 block mb-0.5 font-bold">Goals/Description:</strong>
                    {lead.goals}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-white/5 text-[10px]">
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                    <strong className="text-slate-500">SMTP status:</strong>
                    {lead.emailSent ? (
                      <span className="text-emerald-400 font-medium font-bold">✓ Sent</span>
                    ) : (
                      <span className="text-rose-400 font-medium font-bold" title={lead.diagnosticMessage}>
                        ✗ Failed (Offline fallback)
                      </span>
                    )}
                    {lead.diagnosticMessage && (
                      <span className="text-slate-400 italic text-[9px] truncate max-w-[140px] sm:max-w-[220px]" title={lead.diagnosticMessage}>
                        — {lead.diagnosticMessage}
                      </span>
                    )}
                    {retryingStates[lead.timestamp]?.error && (
                      <span className="text-rose-400 font-medium text-[9px] font-mono">
                        (Error: {retryingStates[lead.timestamp].error})
                      </span>
                    )}
                  </div>
                  
                  {!lead.emailSent && (
                    <button
                      onClick={() => handleRetryEmail(lead.timestamp)}
                      disabled={retryingStates[lead.timestamp]?.loading}
                      className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg bg-blue-500/10 hover:bg-blue-600/20 text-blue-300 disabled:opacity-50 transition-all border border-blue-500/20 hover:border-blue-500/40 active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      {retryingStates[lead.timestamp]?.loading ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full border border-blue-400 border-t-transparent animate-spin inline-block"></span>
                          Retrying...
                        </>
                      ) : (
                        "✉ Retry Delivery"
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PrivacyContent = () => (
  <div className="space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
      <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
        <Shield size={20} />
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Privacy Policy</h3>
        <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">Last updated: June 2026</p>
      </div>
    </div>
    
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">1. Information We Collect</h4>
        <p>At Clarix Labs, we respect your privacy. When you interact with our website, request a growth strategy, or fill out our project inquiry form, we collect information you explicitly provide: your name, brand name, contact details (Email, WhatsApp/Phone number), social media handles, and your specific scaling goals.</p>
      </section>

      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">2. How We Use Your Information</h4>
        <p>We use the collected information solely to assess your brand presence, tailor high-ROI marketing services, and contact you directly via WhatsApp or Email. Your information is never sold, shared, or rented to third-party databases.</p>
      </section>

      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">3. Security & Safety</h4>
        <p>We apply robust end-to-end industry-standard protection to keep your brand details secure. Access to your personal contact information is restricted strictly to account strategists working directly on your campaign.</p>
      </section>

      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">4. Consent</h4>
        <p>By submitting your details via our Contact form, you consent to our privacy guidelines and authorize our growth team to contact you via WhatsApp, phone, or email to coordinate growth strategies.</p>
      </section>
    </div>
  </div>
);

const TermsContent = () => (
  <div className="space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
      <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
        <FileText size={20} />
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Terms & Conditions</h3>
        <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">Last updated: June 2026</p>
      </div>
    </div>
    
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">1. Retainer & Engagement Terms</h4>
        <p>By purchasing our strategic packages, you agree to our 50% advance retainer setup process. Payments are processed securely. All project pricing is stated clearly in USD / INR and matches our active performance criteria.</p>
      </section>

      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">2. Service Scope</h4>
        <p>Clarix Labs provides strategic content creation, Meta & Google Ad campaigns, SEO optimization, and viral brand consulting. Content turnaround times typically match 24–48 hours depending on campaign density and asset complexity.</p>
      </section>

      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">3. Intellectual Property</h4>
        <p>Client maintains all rights over proprietary logos, images, and brand guidelines supplied. Clarix Labs holds ownership over creative concepts, layout designs, and campaign asset versions until final payment verification is received, upon which assets transfer fully to the client.</p>
      </section>

      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">4. Limitation of Liability</h4>
        <p>While we optimize campaigns using high-ROI meta strategies to maximize potential, we do not guarantee specific viral numbers, list size transformations, or definite search ranking positions, as these are dependent on independent social software platforms and platform algorithms.</p>
      </section>
    </div>
  </div>
);

const CookieContent = () => (
  <div className="space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
      <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-400">
        <Info size={20} />
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Cookie Policy</h3>
        <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">Last updated: June 2026</p>
      </div>
    </div>
    
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">1. What are Cookies?</h4>
        <p>Cookies are small text files stored on your computer or mobile device when hosting pages. We use cookies to enhance navigation speed, keep layouts and states preserved, and ensure optimal performance across devices.</p>
      </section>

      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">2. Cookies We Deploy</h4>
        <p>We deploy strictly necessary cookies (required for session storage, rendering smooth custom key states, and securing checkout verification) as well as analytical cookies to track landing page retention and conversion patterns anonymously.</p>
      </section>

      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">3. External Integrations</h4>
        <p>Pixel integrations (such as Meta pixel tracking or Google Analytics) may occasionally deploy tracking codes to refine targeted ads and display the most relevant creative assets to our potential growth partners.</p>
      </section>

      <section className="space-y-2">
        <h4 className="text-white font-bold font-display uppercase tracking-wider text-xs">4. Manage Preferences</h4>
        <p>You can choose to block, erase, or disable cookies altogether through your device internet browser settings. Note that disabling necessary configurations may occasionally impact overall styling, image renders, or search tools.</p>
      </section>
    </div>
  </div>
);

const ServiceDetail = ({ service, onStartProject }: { service: any; onStartProject?: () => void }) => (
  <div className="space-y-10">
    <div className="flex items-center gap-6">
      <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-3xl">
        {service.icon}
      </div>
      <div>
        <h3 className="text-3xl font-display font-bold uppercase tracking-tight">{service.title}</h3>
        <p className="text-blue-500 font-mono text-[10px] tracking-[0.2em] mt-1 uppercase">Advanced Strategic Growth</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <Zap size={14} className="text-blue-500" /> What's Included
        </h4>
        <ul className="grid gap-3">
          {service.features.map((f: string) => (
            <li key={f} className="flex items-start gap-3 text-slate-400 text-sm leading-tight border-b border-white/5 pb-2">
              <Check size={14} className="text-green-500 mt-1 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <Layers size={14} className="text-blue-500" /> The Process
        </h4>
        <div className="space-y-4">
          {(service.process || [
            { t: 'Research', d: 'Deep dive into your niche and competitors.' },
            { t: 'Strategic Planning', d: 'Building the roadmap for your campaign.' },
            { t: 'Creation', d: 'High-aesthetic content or technical coding.' },
            { t: 'Launch & Reporting', d: 'Going live and daily performance optimization.' }
          ]).map((s: any, i: number) => (
            <div key={i} className="relative pl-8">
              <div className="absolute left-0 top-1 w-5 h-5 bg-blue-500/10 border border-blue-500/20 rounded flex items-center justify-center text-[10px] font-bold text-blue-500">
                {i + 1}
              </div>
              <p className="text-sm font-bold text-slate-200">{s.t}</p>
              <p className="text-[11px] text-slate-500">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <p className="text-xl font-display font-medium text-white mb-1">Let's Grow Your Brand</p>
        <p className="text-xs text-slate-400 uppercase tracking-widest">Available for immediate project kickoff.</p>
      </div>
      <button 
        onClick={onStartProject}
        className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer"
      >
        Start Project Now
      </button>
    </div>
  </div>
);

const ProjectCaseStudy = ({ project }: { project: any }) => (
  <div className="space-y-8">
    <div className={`w-full rounded-2xl overflow-hidden relative border border-white/10 group ${project.isLogo ? 'aspect-square md:aspect-[4/3] bg-[#fcfcfc] flex items-center justify-center p-8 shadow-inner' : 'aspect-video'}`}>
      <LazyImage 
        src={project.img} 
        className={project.isLogo ? `${project.logoScale || 'max-w-[96%] max-h-[96%]'} object-contain drop-shadow-md mx-auto` : 'w-full h-full object-cover'} 
        alt={project.title} 
        containerClassName="w-full h-full"
      />
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all pointer-events-none" />
      {!project.isLogo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:scale-110 transition-transform">
             <Play className="text-white fill-white ml-1" size={24} />
          </div>
        </div>
      )}
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <div>
          <div className="text-blue-500 text-[10px] font-mono tracking-widest uppercase mb-2">{project.tag} / CASE STUDY</div>
          <h3 className="text-4xl font-display font-bold uppercase tracking-tight">{project.title}</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed">{project.desc}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <p className="text-blue-500 font-display font-bold text-2xl mb-1">+240%</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Growth in Engagement</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <p className="text-blue-500 font-display font-bold text-2xl mb-1">+35%</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Landing Page Speed</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            By implementing our 2026 digital ecosystem strategy, we helped {project.title} transition from a static presence to a high-conversion engine. The focus was on cinematic storytelling and technical performance optimization.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key Deliverables</h4>
          <ul className="space-y-3">
             {['Platform Strategy', 'Content System', 'Technical SEO', 'Performance Ads'].map(d => (
               <li key={d} className="flex items-center gap-2 text-xs text-slate-300">
                 <Check size={12} className="text-blue-500" /> {d}
               </li>
             ))}
          </ul>
        </div>
        <button onClick={() => window.open(project.instagramUrl || 'https://instagram.com/clarixlabs', '_blank')} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all">
          View Live Feed <ExternalLink size={14} />
        </button>
      </div>
    </div>
  </div>
);

// --- Top Level Constants ---
const AVAILABLE_COUPONS: { [key: string]: number } = {
  "GROWTH05": 5,
  "WELCOME07": 7,
  "CLARIX10": 10,
  "SOCIAL15": 15,
};

const CheckoutView = ({ data, onPaymentVerified }: { data: { price: number; name: string }; onPaymentVerified: (receiptData: any) => void }) => {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [taxId, setTaxId] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0); // in percent
  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInvalidCoupon, setShowInvalidCoupon] = useState(false);
  const [couponAlertMessage, setCouponAlertMessage] = useState("");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Dynamic payment configurations
  const [activeGateway, setActiveGateway] = useState<'razorpay' | 'paypal'>('razorpay');
  const [gatewayConfig, setGatewayConfig] = useState<{
    keyId: string;
    isLive: boolean;
    isCustom: boolean;
    paypalClientId: string;
    isPaypalCustom: boolean;
    foundEnvKeys: string[];
  } | null>(null);

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paypalInitiated, setPaypalInitiated] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    setPaypalInitiated(false);
  }, [activeGateway]);

  // Calculations (strictly USD values)
  const basePriceUSD = data.price;
  const discountUSD = basePriceUSD * (promoDiscount / 100);
  const grandTotalUSD = basePriceUSD - discountUSD;
  const advanceUSD = grandTotalUSD / 2;
  const balanceUSD = grandTotalUSD / 2;

  // Track INR for underlying fallback Razorpay logic (to support local Indian gateway calls if user clicks there)
  const basePriceINR = data.price < 1 ? 1 : Math.round(data.price * 85);
  const discountINR = basePriceINR * (promoDiscount / 100);
  const grandTotalINR = basePriceINR - discountINR;
  const advanceINR = grandTotalINR / 2;
  const balanceINR = grandTotalINR / 2;

  // Fetch gateway configs on initial load
  useEffect(() => {
    setPaymentError(null);

    fetch("/api/payment-config")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        }
        throw new Error("Server did not return valid JSON configuration");
      })
      .then((config) => {
        setGatewayConfig(config);
      })
      .catch((err) => {
        console.error("Failed to fetch gateway config:", err);
      });
  }, []);

  // Helper: dynamically load a script and return a Promise
  const loadScript = (src: string, id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Already loaded
      if (document.getElementById(id)) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Load Razorpay SDK on mount
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js", "razorpay-sdk")
      .then((ok) => {
        if (ok && (window as any).Razorpay) {
          setRazorpayLoaded(true);
          console.log("Razorpay SDK ready.");
        }
      });
  }, []);

  // Load PayPal SDK — use PAYPAL_CLIENT_ID from server config, fallback to 'sandbox'
  useEffect(() => {
    const paypalId = gatewayConfig?.paypalClientId || "sb";
    // Remove old script if client-id changed
    const existing = document.getElementById("paypal-sdk") as HTMLScriptElement | null;
    if (existing && !existing.src.includes(paypalId)) {
      existing.remove();
      setPaypalLoaded(false);
    }
    if ((window as any).paypal) {
      setPaypalLoaded(true);
      return;
    }
    loadScript(
      `https://www.paypal.com/sdk/js?client-id=${paypalId}&currency=USD&intent=capture`,
      "paypal-sdk"
    ).then((ok) => {
      if (ok && (window as any).paypal) {
        setPaypalLoaded(true);
        console.log("PayPal SDK ready.");
      } else {
        console.warn("PayPal SDK failed to load with client-id:", paypalId);
      }
    });
  }, [gatewayConfig]);

  // Dynamically initialize PayPal Button render when requirements are matched
  useEffect(() => {
    if (activeGateway !== 'paypal' || !paypalLoaded || !paypalInitiated) return;

    const ppContainer = document.getElementById("paypal-button-container");
    if (!ppContainer) return;

    // Clear content inside container to avoid rendering duplications
    ppContainer.innerHTML = "";

    const paypal = (window as any).paypal;
    if (paypal && paypal.Buttons) {
      try {
        paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal'
          },
          createOrder: async (_data: any, actions: any) => {
            // Validate all billing details first
            if (!clientName.trim() || !companyName.trim() || !clientEmail.trim() || !clientAddress.trim() || !clientPhone.trim()) {
              setPaymentError("Required elements missing. Please complete all Billed To Configuration inputs before capturing transaction.");
              throw new Error("Missing billing configuration inputs");
            }
            setPaymentError(null);

            // Calculate precise USD advance price after discounts
            const chargeUSD = parseFloat((advanceINR / 85).toFixed(2));
            const safeCharge = Math.max(chargeUSD, 0.01).toFixed(2);

            try {
              // Try server-side order creation first
              const res = await fetch("/api/create-paypal-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: safeCharge })
              });

              if (res.ok) {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                  const orderData = await res.json();
                  // If server returned a real PayPal order ID, use it
                  if (orderData.id && !orderData.isSimulated) {
                    return orderData.id;
                  }
                }
              }

              // Fall back to client-side SDK order creation (works with sandbox)
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: "USD",
                    value: safeCharge
                  },
                  description: `Clarix Labs Retainer - ${data.name}`
                }]
              });
            } catch (err: any) {
              // If server call fails, fall back to SDK-native order creation
              console.warn("Server PayPal order creation failed, using SDK fallback:", err.message);
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: "USD",
                    value: safeCharge
                  },
                  description: `Clarix Labs Retainer - ${data.name}`
                }]
              });
            }
          },
          onApprove: async (dataRes: any, actions: any) => {
            setIsCapturing(true);
            setPaymentError(null);
            try {
              // Capture using SDK actions (most reliable, works in all sandbox modes)
              let captureDetails: any = {};
              try {
                captureDetails = await actions.order.capture();
              } catch (capErr: any) {
                console.warn("SDK capture failed, trying server capture:", capErr.message);
                // Try server-side capture as fallback
                const res = await fetch("/api/capture-paypal-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderID: dataRes.orderID })
                });
                if (res.ok) {
                  captureDetails = await res.json();
                }
              }

              onPaymentVerified({
                paymentId: dataRes.orderID || captureDetails?.id || "pay_pp_" + Math.random().toString(36).substring(2, 11).toUpperCase(),
                packageName: data.name,
                clientName,
                companyName,
                clientEmail,
                clientAddress,
                taxId: taxId || "N/A",
                promoCode,
                promoDiscount,
                promoApplied,
                advanceUSD: parseFloat((advanceINR / 85).toFixed(2)),
                amountInINR: advanceINR,
                fullPriceUSD: data.price,
                paymentMethod: "PayPal Wallet (Secure Authorized Checkout)",
                timestamp: new Date().toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              });
            } catch (e: any) {
              setPaymentError(`PayPal capture failed: ${e.message}`);
            } finally {
              setIsCapturing(false);
            }
          },
          onError: (err: any) => {
            console.error("PayPal Smart Button error:", err);
            setPaymentError("An interactive issue occurred with the PayPal wallet authentication window.");
          }
        }).render("#paypal-button-container");
      } catch (err) {
        console.error("Error drawing Paypal buttons inside container: ", err);
      }
    }
  }, [paypalLoaded, activeGateway, clientName, companyName, clientEmail, clientAddress, clientPhone, promoDiscount, promoCode, promoApplied, advanceINR, paypalInitiated]);

  // Handle actual secure payment checkout via Razorpay or PayPal
  const handleDirectPayment = async () => {
    // Validate inputs
    if (!clientName.trim()) {
      setPaymentError("Please enter a valid Contact Name.");
      return;
    }
    if (!companyName.trim()) {
      setPaymentError("Please enter your Company Legal Name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail.trim())) {
      setPaymentError("Please provide a valid Billing Email Address (e.g. accounting@vogue.biz).");
      return;
    }
    if (!clientAddress.trim()) {
      setPaymentError("Please specify a complete Billing Address.");
      return;
    }
    if (!clientPhone.trim()) {
      setPaymentError("Please enter a valid Contact Phone Number.");
      return;
    }
    setPaymentError(null);
    setIsProcessing(true);

    if (activeGateway === "razorpay") {
      // ── Step 1: Ensure Razorpay SDK is available ──
      if (!(window as any).Razorpay) {
        setPaymentError("Loading Razorpay, please wait...");
        const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js", "razorpay-sdk");
        // Give the SDK a moment to initialise its global
        await new Promise(r => setTimeout(r, 500));
        if (!loaded || !(window as any).Razorpay) {
          setPaymentError("Razorpay could not be loaded. Please check your internet connection and try again, or switch to PayPal.");
          setIsProcessing(false);
          return;
        }
        setRazorpayLoaded(true);
        setPaymentError(null);
      }

      try {
        // ── Step 2: Create order on server ──
        const res = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: advanceINR, currency: "INR" })
        });

        let orderData: any = {};
        if (res.ok) {
          const ct = res.headers.get("content-type") || "";
          if (ct.includes("application/json")) {
            orderData = await res.json();
          }
        }

        const rzpKey = orderData.key || gatewayConfig?.keyId || "rzp_test_SqLcmKRJVgrtf5";
        const rzpAmount = orderData.amount || Math.round(advanceINR * 100);

        // ── Step 3: Open Razorpay checkout modal ──
        const options: any = {
          key: rzpKey,
          amount: rzpAmount,
          currency: orderData.currency || "INR",
          name: "Clarix Labs",
          description: `Retainer 50% Advance — ${data.name}`,
          ...(orderData.id ? { order_id: orderData.id } : {}),
          handler: async (response: any) => {
            setIsProcessing(true);
            setPaymentError(null);
            try {
              const verifyRes = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              });
              const verifyData = await verifyRes.json().catch(() => ({}));
              if (!verifyRes.ok) throw new Error(verifyData.error || "Signature verification failed.");

              onPaymentVerified({
                paymentId: response.razorpay_payment_id,
                packageName: data.name,
                clientName, companyName, clientEmail, clientAddress,
                taxId: taxId || "N/A",
                promoCode, promoDiscount, promoApplied,
                advanceUSD: parseFloat((advanceINR / 85).toFixed(2)),
                amountInINR: advanceINR,
                fullPriceUSD: data.price,
                paymentMethod: "Razorpay Secure Checkout",
                timestamp: new Date().toLocaleDateString('en-US', {
                  day: 'numeric', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })
              });
            } catch (e: any) {
              setPaymentError(`Payment verification failed: ${e.message}`);
            } finally {
              setIsProcessing(false);
            }
          },
          prefill: { name: clientName, email: clientEmail, contact: clientPhone },
          theme: { color: "#2563eb" },
          modal: { ondismiss: () => setIsProcessing(false) }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", (resp: any) => {
          setPaymentError(`Payment failed: ${resp.error?.description || "Unknown error"}`);
          setIsProcessing(false);
        });
        rzp.open();
      } catch (err: any) {
        setPaymentError(`Razorpay error: ${err.message}`);
        setIsProcessing(false);
      }

    } else if (activeGateway === "paypal") {
      // ── Ensure PayPal SDK is available ──
      if (!(window as any).paypal) {
        setPaymentError("Loading PayPal, please wait...");
        const paypalId = gatewayConfig?.paypalClientId || "sb";
        // Remove old failed script so we can reload
        const old = document.getElementById("paypal-sdk");
        if (old) old.remove();
        const loaded = await loadScript(
          `https://www.paypal.com/sdk/js?client-id=${paypalId}&currency=USD&intent=capture`,
          "paypal-sdk"
        );
        await new Promise(r => setTimeout(r, 500));
        if (!loaded || !(window as any).paypal) {
          setPaymentError("PayPal could not be loaded. Please check your internet connection and try again, or switch to Razorpay.");
          setIsProcessing(false);
          return;
        }
        setPaypalLoaded(true);
        setPaymentError(null);
      }

      // Show the PayPal smart buttons
      setPaypalInitiated(true);
      setIsProcessing(false);
    }
  };

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setCouponAlertMessage("Please enter a coupon code before applying.");
      setShowInvalidCoupon(true);
      return;
    }

    const DEPRECATED_COUPONS = ["CLARIXFIRST", "GROWTHBOOST", "SPECIALPARTNER", "ENTERPRISEDAL"];

    if (AVAILABLE_COUPONS[code] !== undefined) {
      setPromoDiscount(AVAILABLE_COUPONS[code]);
      setPromoApplied(true);
    } else if (DEPRECATED_COUPONS.includes(code)) {
      setCouponAlertMessage(`The code "${code}" is a legacy corporate coupon that has expired.`);
      setShowInvalidCoupon(true);
      setPromoDiscount(0);
      setPromoApplied(false);
    } else {
      setCouponAlertMessage(`The promotional code "${code}" is invalid or expired. Please check the code and try again.`);
      setShowInvalidCoupon(true);
      setPromoDiscount(0);
      setPromoApplied(false);
    }
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setPromoDiscount(0);
    setPromoApplied(false);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Top Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
            <CreditCard className="text-blue-500" size={24} />
          </div>
        </div>
        <h3 className="text-2xl font-display font-medium uppercase tracking-tight text-white">
          Secure Retention Portal
        </h3>
        <p className="text-slate-400 text-[10px] mt-1.5 uppercase tracking-[0.25em] max-w-sm">
          Register billing details & process 50% advance retainer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Client Contact */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 pb-2 border-b border-white/5 flex items-center gap-2">
              <User size={12} className="text-blue-500" /> Billed To Configuration
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Contact Name</label>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500/50 outline-none transition-colors" 
                  placeholder="e.g. Kunal Ghare"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Company Legal Name</label>
                <input 
                  type="text" 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500/50 outline-none transition-colors" 
                  placeholder="e.g. Clarix Enterprises"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Billing Email Address</label>
                <input 
                  type="email" 
                  value={clientEmail} 
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500/50 outline-none transition-colors" 
                  placeholder="e.g. billing@clarix.com"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Billing Address</label>
                <input 
                  type="text" 
                  value={clientAddress} 
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500/50 outline-none transition-colors" 
                  placeholder="e.g. 123 Business Bay, Mumbai, MH"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Billing Phone Number</label>
                <input 
                  type="tel" 
                  value={clientPhone} 
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500/50 outline-none transition-colors" 
                  placeholder="e.g. +1 555-0199 or +91 99999 99999"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 pb-2 border-b border-white/5 flex items-center gap-2">
              <Percent size={12} className="text-blue-500" /> Apply Coupon
            </h4>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode} 
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={`w-full bg-white/5 border ${promoApplied ? 'border-emerald-500/30 text-emerald-400 font-medium' : 'border-white/10 text-white'} rounded-xl px-4 py-2 text-xs uppercase font-mono outline-none focus:border-blue-500/50`} 
                  placeholder="ENTER COUPON CODE..." 
                />
                {promoApplied ? (
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={applyPromo}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider px-4 rounded-xl transition-colors"
                    >
                      Update
                    </button>
                    <button 
                      onClick={handleRemovePromo}
                      className="bg-red-900/40 hover:bg-red-900/60 text-red-400 border border-red-500/20 text-[10px] uppercase font-bold tracking-wider px-4 rounded-xl transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={applyPromo}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider px-5 rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                )}
              </div>
              <p className="text-[9px] text-slate-400 mt-1 leading-normal">
                {promoApplied 
                  ? `✨ Code active: ${promoDiscount}% discount applied! Feel free to edit the code above and click Update, or click Remove to reset.` 
                  : `Enter coupon code above to apply direct corporate discount.`}
              </p>
            </div>
          </div>
        </div>

        {/* Right Frame: Cost Breakdown */}
        <div className="lg:col-span-12 xl:col-span-5 bg-slate-900/40 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col gap-2 pb-2 border-b border-white/5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Retainer Breakdown
            </h4>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-white uppercase">{data.name} Package</p>
                <p className="text-[10px] text-slate-500 font-sans">Professional retainer contract</p>
              </div>
              <p className="font-mono text-xs font-bold text-white">
                {basePriceUSD < 1 ? "$" + basePriceUSD.toFixed(4) : "$" + basePriceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between text-slate-400">
                <span>Monthly Retainer</span>
                <span>
                  {basePriceUSD < 1 ? "$" + basePriceUSD.toFixed(4) : "$" + basePriceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Discount ({promoDiscount}%)</span>
                  <span>
                    -{discountUSD < 1 ? "$" + discountUSD.toFixed(4) : "$" + discountUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-400 border-b border-white/5 pb-2">
                <div className="flex flex-col">
                  <span>Total Fee (After Discount)</span>
                  <span className="text-[9px] text-slate-500 font-sans">Full 100% project value</span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-white">
                    {grandTotalUSD < 1 ? "$" + grandTotalUSD.toFixed(4) : "$" + grandTotalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-2 text-slate-300">
                <div className="flex flex-col">
                  <span className="font-semibold text-blue-400">50% Advance retainer due:</span>
                  <span className="text-[9px] text-slate-500 font-sans">Payable now to initiate project</span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-white font-extrabold font-mono">
                    {advanceUSD < 1 ? "$" + advanceUSD.toFixed(4) : "$" + advanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-2 text-slate-400 border-t border-dashed border-white/5">
                <div className="flex flex-col">
                  <span>50% Remaining balance:</span>
                  <span className="text-[9px] text-slate-500 font-sans">Due on project delivery</span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span>
                    {balanceUSD < 1 ? "$" + balanceUSD.toFixed(4) : "$" + balanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-white/5 pt-4">
            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold block">
              💳 Choose Your Payment Gateway
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveGateway("razorpay");
                  setPaymentError(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  activeGateway === "razorpay"
                    ? "bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/5 text-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider block">Razorpay</span>
                <span className="text-[9px] text-slate-400 block mt-1 leading-normal">UPI, Cards, Wallets</span>
                <div className="absolute top-2.5 right-2.5">
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${activeGateway === 'razorpay' ? 'border-blue-500 bg-blue-500' : 'border-white/20'}`}>
                    {activeGateway === 'razorpay' && <Check size={10} className="text-white" />}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveGateway("paypal");
                  setPaymentError(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  activeGateway === "paypal"
                    ? "bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/5 text-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider block">PayPal</span>
                <span className="text-[9px] text-slate-400 block mt-1 leading-normal">International / USD</span>
                <div className="absolute top-2.5 right-2.5">
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${activeGateway === 'paypal' ? 'border-blue-500 bg-blue-500' : 'border-white/20'}`}>
                    {activeGateway === 'paypal' && <Check size={10} className="text-white" />}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {paymentError && (
            <div className="space-y-2">
              <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-left">
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">⚠️ Validation Alert</span>
                <p className="text-[10px] text-slate-300 font-sans mt-1 leading-relaxed">
                  {paymentError}
                </p>
              </div>
            </div>
          )}

          <div className="mt-4">
            {activeGateway === 'razorpay' ? (
              <button
                type="button"
                onClick={handleDirectPayment}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer font-sans"
              >
                {isProcessing ? (
                  <span className="animate-pulse flex items-center gap-1.5 font-bold">
                    <RefreshCw className="animate-spin text-white" size={14} />
                    Initiating Secure Checkout...
                  </span>
                ) : (
                  <>
                    <Check size={14} /> 
                    Pay Retainer ({advanceUSD < 1 ? "$" + advanceUSD.toFixed(4) : "$" + advanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                {paypalInitiated ? (
                  <div className="space-y-3 bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-center shadow-inner animate-in fade-in slide-in-from-top-2 duration-300">
                    <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-[0.15em] block mb-1 animate-pulse">
                      ⚡ Secure PayPal Checkout Session Initiated
                    </span>
                    <p className="text-[10px] text-slate-400 font-sans mb-4 leading-relaxed select-none">
                      Your customer information and order details have been verified and processed. Please click the official yellow PayPal button below to complete the transaction:
                    </p>
                    <div id="paypal-button-container" className="w-full z-10 relative" />
                    <button
                      type="button"
                      onClick={() => setPaypalInitiated(false)}
                      className="text-[9px] text-slate-500 hover:text-slate-300 underline uppercase tracking-widest font-mono block mx-auto mt-3 cursor-pointer transition-colors"
                    >
                      Return / Change Details
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleDirectPayment}
                      disabled={isProcessing}
                      className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer font-sans"
                    >
                      {isProcessing ? (
                        <span className="animate-pulse flex items-center gap-1.5 font-bold">
                          <RefreshCw className="animate-spin text-slate-950" size={14} />
                          Processing PayPal Checkout...
                        </span>
                      ) : (
                        <>
                          <Check size={14} /> 
                          Pay Retainer (${(advanceINR / 85).toFixed(2)} USD)
                        </>
                      )}
                    </button>
                    <div className="text-center">
                      <span className="text-[9px] text-amber-400 font-extrabold uppercase tracking-widest font-mono select-none block">
                        🚀 Click to open secure PayPal interface
                      </span>
                    </div>
                  </>
                )}
                {isCapturing && (
                  <div className="text-center py-4 bg-white/5 border border-white/10 rounded-xl animate-pulse">
                    <RefreshCw className="animate-spin text-emerald-500 mx-auto" size={18} />
                    <span className="text-[10px] text-emerald-500 uppercase tracking-widest block mt-2 font-mono">
                      Capturing PayPal payment...
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-center pt-2.5 border-t border-white/5 mt-1.5">
            <span className="text-[9px] text-slate-500 block font-sans leading-normal">
              🔒 Real-time Secure Gateway. Clarix Labs protects corporate information in compliance with enterprise security parameters.
            </span>
          </div>
        </div>
      </div>

      {/* Custom Invalid Coupon Popup Modal */}
      <AnimatePresence>
        {showInvalidCoupon && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInvalidCoupon(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="w-full max-w-sm rounded-[2rem] border border-red-500/30 bg-[#0C0D16] p-7 shadow-2xl relative overflow-hidden z-20 text-center"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />
              
              <div className="flex flex-col items-center space-y-4 pt-2">
                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                  <X size={26} className="stroke-[2.5]" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white text-base font-bold font-display uppercase tracking-wider">
                    Invalid Coupon
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans px-2">
                    {couponAlertMessage}
                  </p>
                </div>
                
                <p className="text-[10px] text-slate-500 leading-normal font-sans pt-1">
                  Only authorized strategic brand keys or partner discounts are permitted on this gateway.
                </p>
                
                <button 
                  type="button"
                  onClick={() => setShowInvalidCoupon(false)}
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer shadow-lg shadow-red-600/15 active:scale-95"
                >
                  Dismiss & Re-try
                </button>
              </div>
            </motion.div>
          </div>
        )}


      </AnimatePresence>
    </div>
  );
};

const ReceiptView = ({ data }: { data: any }) => {
  const {
    clientName = "Valued Customer",
    companyName = "N/A",
    clientEmail = "N/A",
    clientAddress = "N/A",
    taxId = "N/A",
    promoCode = "",
    promoDiscount = 0,
    promoApplied = false,
    paymentId = "",
    packageName = "",
    fullPriceUSD = 0,
    timestamp = ""
  } = data || {};

  // Compute strictly in standard USD currency
  const basePriceUSD = fullPriceUSD;
  const discountUSD = basePriceUSD * (promoDiscount / 100);
  const grandTotalUSD = basePriceUSD - discountUSD;
  const advanceUSD = grandTotalUSD / 2;
  const balanceUSD = grandTotalUSD / 2;

  const invoiceNumber = paymentId.slice(-8).toUpperCase();
  const issueDate = timestamp ? timestamp.split(',')[0] : new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-8 py-4">
      {/* Styles for High Fidelity Printing */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print-hide {
            display: none !important;
          }
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            padding: 0 !important;
            background: transparent !important;
          }
          .print-card {
            background: white !important;
            color: black !important;
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            padding: 24px !important;
          }
          .print-text-dark {
            color: #0f172a !important;
          }
          .print-text-dark-gray {
            color: #1e293b !important;
          }
          .print-text-muted {
            color: #475569 !important;
          }
          .print-border {
            border-color: #cbd5e1 !important;
          }
          .print-bg-gray {
            background-color: #f8fafc !important;
          }
          .print-accent-text {
            color: #2563eb !important;
          }
        }
      `}</style>

      {/* Top Welcome Panel */}
      <div className="flex flex-col items-center text-center print-hide">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <Check className="text-emerald-500" size={24} />
          </div>
        </div>
        <h3 className="text-2xl font-display font-medium uppercase tracking-tight text-white">
          Retainer Payment Successful
        </h3>
        <p className="text-slate-400 text-[10px] mt-1.5 uppercase tracking-[0.25em] max-w-sm">
          A receipt has been generated. Invoice #{invoiceNumber}
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-slate-900/40 border border-white/10 rounded-3xl p-8 print-card print-full-width shadow-2xl relative overflow-hidden flex flex-col justify-between">
        
        {/* Subtle paper details */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />
        
        <div className="space-y-8">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-white/10 print-border">
            <div>
              <ClarixLogo size="sm" printClass="print-text-dark" />
              <p className="text-[10px] text-slate-500 print-text-muted mt-2 uppercase tracking-widest font-mono">DIGITAL MEDIA STRATEGY INC.</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 print-bg-gray">
                ◆ PAYMENT COMPLETED
              </span>
              <p className="text-[10px] text-slate-400 print-text-muted mt-2 uppercase font-semibold">INVOICE NO: <span className="font-mono text-white print-text-dark">#CLX-{invoiceNumber}</span></p>
            </div>
          </div>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left py-2 border-b border-white/10 print-border">
            <div>
              <p className="text-[9px] text-slate-500 print-text-muted uppercase tracking-wider font-bold">Issue Date</p>
              <p className="text-xs font-semibold text-white print-text-dark mt-1">{issueDate}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 print-text-muted uppercase tracking-wider font-bold">Payment Method</p>
              <p className="text-xs font-semibold text-white print-text-dark mt-1">Digital Gateway</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 print-text-muted uppercase tracking-wider font-bold">Billing Cycle</p>
              <p className="text-xs font-semibold text-white print-text-dark mt-1">Monthly Retainer</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 print-text-muted uppercase tracking-wider font-bold">Due Date (Balance)</p>
              <p className="text-xs font-semibold text-white print-text-dark mt-1">{dueDate}</p>
            </div>
          </div>

          {/* Billed From / Billed To blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            <div>
              <h5 className="text-[10px] text-blue-400 print-accent-text uppercase tracking-widest mb-3 font-bold">Billed From</h5>
              <div className="space-y-1 font-mono text-[10px] text-slate-400 print-text-muted">
                <p className="font-bold font-sans text-white print-text-dark">Clarix Labs Headquarters</p>
                <p>24 Pine St, Suite 1200</p>
                <p>San Francisco, CA 94111</p>
                <p>GSTIN: US-81-7483-A9</p>
                <p>accounting@clarixlabs.com</p>
              </div>
            </div>

            <div>
              <h5 className="text-[10px] text-blue-400 print-accent-text uppercase tracking-widest mb-3 font-bold">Billed To</h5>
              <div className="space-y-1 font-mono text-[10px] text-slate-400 print-text-muted">
                <p className="font-bold font-sans text-white print-text-dark">{clientName}</p>
                <p className="font-sans text-slate-300 print-text-dark-gray">{companyName}</p>
                <p>{clientAddress}</p>
                {taxId && taxId !== "N/A" && <p>TAX ID: {taxId}</p>}
                <p className="font-sans text-blue-400/80 print-accent-text underline">{clientEmail}</p>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3">
            <h5 className="text-[10px] text-slate-400 print-text-muted uppercase tracking-widest font-bold text-left">Deliverables Table</h5>
            <div className="border border-white/5 print-border rounded-xl overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10 print-border print-bg-gray">
                    <th className="p-3 text-[9px] uppercase font-bold text-slate-400 print-text-muted">Item & Description</th>
                    <th className="p-3 text-right text-[9px] uppercase font-bold text-slate-400 print-text-muted">Qty</th>
                    <th className="p-3 text-right text-[9px] uppercase font-bold text-slate-400 print-text-muted">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print-border">
                  <tr>
                    <td className="p-3 font-medium text-slate-100 print-text-dark">
                      <p>{packageName} Implementation Plan</p>
                      <span className="text-[9px] text-slate-500 block leading-tight">50% Advance retainer for brand audit and visual architecture setup.</span>
                    </td>
                    <td className="p-3 text-right text-slate-400 print-text-muted">1</td>
                    <td className="p-3 text-right text-white font-mono print-text-dark">
                      {basePriceUSD < 1 ? "$" + basePriceUSD.toFixed(4) : "$" + basePriceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Summary Breakdown */}
          <div className="border-t border-white/10 print-border pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="text-left font-sans text-[10px] text-slate-500 print-text-muted flex flex-col justify-end">
              <p>⚡ Payment processed securely via Digital Gateway.</p>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between text-slate-400 print-text-muted font-bold">
                <span>Subtotal</span>
                <span className="text-white print-text-dark">
                  {basePriceUSD < 1 ? "$" + basePriceUSD.toFixed(4) : "$" + basePriceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              {promoApplied && (
                <div className="flex justify-between text-emerald-400 font-semibold font-bold">
                  <span>Discount ({promoDiscount}%)</span>
                  <span>
                    -{discountUSD < 1 ? "$" + discountUSD.toFixed(4) : "$" + discountUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[13px] font-sans font-bold text-white print-text-dark pt-1 border-t border-white/5 print-border">
                <span>Invoice Total</span>
                <span>
                  {grandTotalUSD < 1 ? "$" + grandTotalUSD.toFixed(4) : "$" + grandTotalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between text-slate-300 print-text-dark pt-1">
                <span>Retainer Advance (50%)</span>
                <div className="text-right">
                  <span className="text-blue-500 font-bold block font-mono">
                    {advanceUSD < 1 ? "$" + advanceUSD.toFixed(4) : "$" + advanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-slate-400 print-text-muted pt-1 pb-2 border-b border-white/5 print-border">
                <span>Final Balance (Scheduled)</span>
                <div className="text-right">
                  <span className="text-white print-text-dark block">
                    {balanceUSD < 1 ? "$" + balanceUSD.toFixed(4) : "$" + balanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-xs font-bold font-sans text-slate-100 print-text-dark pt-2 bg-white/[0.02] print-bg-gray px-3 py-2 rounded-lg">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 print-text-muted">Retainer Status</span>
                <div className="text-right font-mono">
                  <span className="text-[13px] text-emerald-400 block font-bold mt-1">PAID</span>
                  <span className="text-[11px] text-emerald-400 block font-bold">
                    {advanceUSD < 1 ? "$" + advanceUSD.toFixed(4) : "$" + advanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Bar at Bottom of Invoice */}
        <div className="mt-8 pt-6 border-t border-white/10 print-border flex flex-col sm:flex-row justify-between items-center gap-4 print-hide">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest text-center sm:text-left font-semibold">
            Thank you for partnering with Clarix Labs.
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()} 
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all text-slate-300"
            >
              <Printer size={12} /> Print / Save PDF
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all text-white"
            >
              Close View
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Layout Components ---

const Section = ({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) => {
  const hasCustomPadding = className.includes("py-") || className.includes("pt-") || className.includes("pb-");
  const paddingClass = hasCustomPadding ? "" : "py-16 md:py-24";
  return (
    <section id={id} className={`${paddingClass} px-4 sm:px-6 md:px-12 lg:px-24 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

const SectionTitle = ({ 
  subtitle, 
  title, 
  description,
  titleClassName = "text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-6",
  descClassName = "text-slate-400 max-w-2xl text-lg leading-relaxed"
}: { 
  subtitle: string; 
  title: string | ReactNode; 
  description?: string;
  titleClassName?: string;
  descClassName?: string;
}) => (
  <div className="mb-16">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em] mb-4"
    >
      {subtitle}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={titleClassName}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={descClassName}
      >
        {description}
      </motion.p>
    )}
  </div>
);

// --- Client Campaign Portal Components ---
interface ChartDataPoint {
  day: string;
  views: number;
}

const EngagementLineChart = ({ data }: { data: ChartDataPoint[] }) => {
  const d3Container = useRef<SVGSVGElement | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<ChartDataPoint | null>(null);

  // Auto-select the last point when new data is loaded or changed
  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedPoint(data[data.length - 1]);
    } else {
      setSelectedPoint(null);
    }
  }, [data]);

  // Main drawing effect: runs ONLY when data changes
  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      // Clear previous chart render elements
      svg.selectAll("*").remove();

      const width = 500;
      const height = 240;
      const margin = { top: 25, right: 30, bottom: 40, left: 60 };

      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // Container group
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // X scale
      const xScale = d3.scalePoint()
        .domain(data.map((d) => d.day))
        .range([0, chartWidth]);

      // Y scale
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.views) || 10000])
        .nice()
        .range([chartHeight, 0]);

      // Draw X axis
      g.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .attr("color", "#334155")
        .selectAll("text")
        .style("fill", "#94a3b8")
        .style("font-family", "JetBrains Mono, monospace")
        .style("font-size", "9px");

      // Draw Y axis
      g.append("g")
        .call(d3.axisLeft(yScale).ticks(5).tickFormat((d) => {
          const val = d as number;
          if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
          if (val >= 1000) return (val / 1000) + "K";
          return val.toString();
        }))
        .attr("color", "#334155")
        .selectAll("text")
        .style("fill", "#94a3b8")
        .style("font-family", "JetBrains Mono, monospace")
        .style("font-size", "9px");

      // Draw dashed grid lines
      g.append("g")
        .attr("opacity", 0.08)
        .call(d3.axisLeft(yScale)
          .ticks(5)
          .tickSize(-chartWidth)
          .tickFormat(() => "")
        )
        .selectAll("line")
        .style("stroke-dasharray", "3, 3");

      // Gradient define
      const defs = svg.append("defs");
      const areaGradient = defs.append("linearGradient")
        .attr("id", "portal-chart-grad")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      areaGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#3b82f6")
        .attr("stop-opacity", 0.3);

      areaGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#3b82f6")
        .attr("stop-opacity", 0);

      // Area path generator
      const areaGen = d3.area<ChartDataPoint>()
        .x((d) => xScale(d.day) || 0)
        .y0(chartHeight)
        .y1((d) => yScale(d.views))
        .curve(d3.curveMonotoneX);

      // Draw Area
      g.append("path")
        .datum(data)
        .attr("fill", "url(#portal-chart-grad)")
        .attr("d", areaGen);

      // Line path generator
      const lineGen = d3.line<ChartDataPoint>()
        .x((d) => xScale(d.day) || 0)
        .y((d) => yScale(d.views))
        .curve(d3.curveMonotoneX);

      // Draw line
      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#3b82f6")
        .attr("stroke-width", 2.5)
        .attr("d", lineGen);

      // Setup vertical active guide line
      g.append("line")
        .attr("class", "g-guide-line")
        .attr("y1", 0)
        .attr("y2", chartHeight)
        .attr("stroke", "#3b82f6")
        .attr("stroke-width", 1.2)
        .attr("stroke-dasharray", "4, 4")
        .attr("opacity", 0); // hidden initially

      // Highlight closest point on hover/mousemove/pointermove for extremely responsive cursor feel
      svg.style("cursor", "crosshair")
        .on("pointermove mousemove", (event) => {
          const [mouseX] = d3.pointer(event, g.node());
          if (mouseX >= 0 && mouseX <= chartWidth) {
            let closestPt = data[0];
            let minDist = Infinity;
            data.forEach((pt) => {
              const ptX = xScale(pt.day) || 0;
              const dist = Math.abs(ptX - mouseX);
              if (dist < minDist) {
                minDist = dist;
                closestPt = pt;
              }
            });
            setSelectedPoint((current) => {
              if (current && current.day === closestPt.day) {
                return current;
              }
              return closestPt;
            });
          }
        });

      // Draw data points markers
      g.selectAll(".point-marker")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "point-marker")
        .attr("cx", (d) => xScale(d.day) || 0)
        .attr("cy", (d) => yScale(d.views))
        .style("cursor", "pointer")
        .on("click", (event, d) => {
          event.stopPropagation();
          setSelectedPoint(d);
        });
    }
  }, [data]);

  // Secondary effect: update only visual states based on selectedPoint changes
  useEffect(() => {
    if (!data || !d3Container.current) return;
    const svg = d3.select(d3Container.current);

    if (selectedPoint) {
      const width = 500;
      const margin = { left: 60, right: 30 };
      const chartWidth = width - margin.left - margin.right;

      const xScale = d3.scalePoint()
        .domain(data.map((d) => d.day))
        .range([0, chartWidth]);

      const selectedX = xScale(selectedPoint.day) || 0;

      svg.select(".g-guide-line")
        .attr("x1", selectedX)
        .attr("x2", selectedX)
        .attr("opacity", 0.6);
    } else {
      svg.select(".g-guide-line").attr("opacity", 0);
    }

    svg.selectAll(".point-marker")
      .attr("r", (d: any) => selectedPoint?.day === d.day ? 7.5 : 4.5)
      .attr("fill", (d: any) => selectedPoint?.day === d.day ? "#3b82f6" : "#09090b")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", (d: any) => selectedPoint?.day === d.day ? 2.5 : 1.8);

  }, [selectedPoint, data]);

  return (
    <div className="w-full overflow-hidden bg-slate-950/45 p-4 border border-white/5 rounded-2xl relative select-none">
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-[8px] font-mono font-medium text-blue-400 uppercase tracking-widest">DRAG CURSOR / TAP GRAPH TO EXPLORE DAILY DATA</span>
      </div>
      <svg
        ref={d3Container}
        className="mx-auto block"
        viewBox="0 0 500 240"
        width="100%"
        height="100%"
      />

      {selectedPoint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-white/[0.03] border border-blue-500/10 rounded-xl space-y-2 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[10px] font-mono font-bold text-white uppercase">{selectedPoint.day} Performance Stats</span>
            </div>
            <span className="text-[8.5px] font-mono font-extrabold text-[#3b82f6] uppercase bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
              Cursor Tracking Active
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">Exact Daily Views Recorded</span>
              <span className="text-[14px] font-mono font-bold text-white block mt-0.5">
                {selectedPoint.views >= 1000000 
                  ? (selectedPoint.views / 1000000).toFixed(2) + " Million+ Views" 
                  : selectedPoint.views >= 1000 
                    ? selectedPoint.views.toLocaleString() + " Views" 
                    : selectedPoint.views.toString() + " Views"}
              </span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold font-semibold">Milestone Status</span>
              <span className="text-[10px] text-emerald-400 font-bold block mt-1 uppercase tracking-tight">
                {selectedPoint.views >= 1000000 
                  ? "🔥 Viral Organic Surge" 
                  : selectedPoint.views >= 100000 
                    ? "🚀 Scale Trajectory Reached" 
                    : selectedPoint.views >= 50000 
                      ? "📈 High Volume Benchmark" 
                      : "🎯 Launch Baseline Setup"}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-2 italic border-t border-white/5 pt-2">
            Tip: Simply slide or put your cursor/pointer over the graph to explore different daily timelines.
          </p>
        </motion.div>
      )}
    </div>
  );
};

const ClientPortalView = ({ initialProjectKey }: { initialProjectKey?: string }) => {
  const [projectId, setProjectId] = useState("");
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const mockProjects: Record<string, any> = {
    "CRIC-070": {
      brand: "criceditz070 channel",
      package: "YT Shorts Creator Setup",
      launched: "June 05, 2026",
      activeVideos: "7 High-Retention Edits",
      rawMetricValue: "50 Million+ views",
      metricValue: "50M+ Views",
      metricLabel: "Daily Reach Tracker",
      type: "youtube",
      notes: "Cricket analysis, quick-cuts & trending athletic highlight series.",
      chartData: [
        { day: "Day 1", views: 1120000 },
        { day: "Day 3", views: 1280000 },
        { day: "Day 6", views: 1410000 },
        { day: "Day 9", views: 1350000 },
        { day: "Day 12", views: 1480000 },
        { day: "Day 15", views: 1220000 },
        { day: "Day 18", views: 1310000 },
        { day: "Day 21", views: 1450000 },
        { day: "Day 24", views: 1190000 },
        { day: "Day 27", views: 1380000 },
        { day: "Day 30", views: 1510000 }
      ]
    },
    "WWE-TV": {
      brand: "WWE storyline TV Channel",
      package: "Entertainment & Broadcaster Strategy",
      launched: "May 18, 2026",
      activeVideos: "24 Cinematic Episodes",
      rawMetricValue: "2 millions + views",
      metricValue: "2.1M Views",
      metricLabel: "Viral Impact Ratio",
      type: "television",
      notes: "Dramatic wrestling narrative arcs, retrospectives & custom edits.",
      chartData: [
        { day: "Day 1", views: 52000 },
        { day: "Day 3", views: 65000 },
        { day: "Day 6", views: 78000 },
        { day: "Day 9", views: 61000 },
        { day: "Day 12", views: 84000 },
        { day: "Day 15", views: 59000 },
        { day: "Day 18", views: 72000 },
        { day: "Day 21", views: 89000 },
        { day: "Day 24", views: 63000 },
        { day: "Day 27", views: 76000 },
        { day: "Day 30", views: 95000 }
      ]
    },
    "SOFA-VOGUE": {
      brand: "sofavogue Instagram page",
      package: "Luxury Brand Aesthetics Bundle",
      launched: "May 25, 2026",
      activeVideos: "15 Posts published",
      rawMetricValue: "600k views",
      metricValue: "600K Views",
      metricLabel: "Visual Aesthetics Engagement",
      type: "instagram",
      notes: "Elite interior lifestyle inspiration & aesthetic lookbook reels.",
      chartData: [
        { day: "Day 1", views: 150000 },
        { day: "Day 3", views: 185000 },
        { day: "Day 6", views: 220000 },
        { day: "Day 9", views: 168000 },
        { day: "Day 12", views: 240000 },
        { day: "Day 15", views: 195000 },
        { day: "Day 18", views: 210000 },
        { day: "Day 21", views: 253000 },
        { day: "Day 24", views: 172000 },
        { day: "Day 27", views: 234000 },
        { day: "Day 30", views: 268000 }
      ]
    }
  };

  useEffect(() => {
    if (initialProjectKey) {
      const id = initialProjectKey.trim().toUpperCase();
      if (mockProjects[id]) {
        setActiveProject(mockProjects[id]);
        setProjectId(id);
      } else {
        const cleanName = initialProjectKey.replace(/[-_]/g, ' ');
        setActiveProject({
          brand: cleanName,
          package: "STANDARD Setup Model",
          launched: "May 10, 2026",
          activeVideos: "12 Assets Online",
          rawMetricValue: "850k+ Views",
          metricValue: "850K+ Views",
          metricLabel: "Aggregate Traction",
          type: "instagram",
          notes: "Dynamic SMM, content distribution, and targeted audience indexing.",
          chartData: [
            { day: "Day 1", views: 12000 },
            { day: "Day 3", views: 24000 },
            { day: "Day 6", views: 48000 },
            { day: "Day 9", views: 35000 },
            { day: "Day 12", views: 72000 },
            { day: "Day 15", views: 95000 },
            { day: "Day 18", views: 115000 },
            { day: "Day 21", views: 140000 },
            { day: "Day 24", views: 110000 },
            { day: "Day 27", views: 165000 },
            { day: "Day 30", views: 198000 }
          ]
        });
        setProjectId(id);
      }
    }
  }, [initialProjectKey]);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const id = projectId.trim().toUpperCase();
    if (mockProjects[id]) {
      setActiveProject(mockProjects[id]);
      setErrorMsg("");
    } else if (id === "") {
      setErrorMsg("Please enter a valid Project ID.");
    } else {
      // Setup dynamic summary of campaign performance or fallback
      setActiveProject({
        brand: `Dynamic Client (${id})`,
        package: "STANDARD Active Setup",
        launched: "Recently Configured",
        rawMetricValue: "125k+ Views",
        activeVideos: "5 Videos processed",
        metricValue: "128,500 Estimated Views",
        metricLabel: "Dynamic Metric View",
        type: "instagram",
        notes: "Real-time client synchronization matrix.",
        chartData: [
          { day: "Day 1", views: 1200 },
          { day: "Day 5", views: 15000 },
          { day: "Day 10", views: 38000 },
          { day: "Day 15", views: 61000 },
          { day: "Day 20", views: 89000 },
          { day: "Day 25", views: 112000 },
          { day: "Day 30", views: 128500 }
        ]
      });
      setErrorMsg("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-blue-400 block font-bold font-semibold">CLIENT PERFORMANCE METRICS</span>
        <h3 className="text-xl font-display font-black text-white uppercase mt-1">CLIENT CAMPAIGN PORTAL</h3>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
          Access high-velocity campaign analytics, vertical video views, and professional engagement matrices.
        </p>
      </div>

      {!activeProject ? (
        <form onSubmit={handleAccess} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold">ENTER SECURE CLIENT ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="E.g., CRIC-070, WWE-TV, SOFA-VOGUE"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 font-mono tracking-wider placeholder-slate-700"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] uppercase tracking-wider px-6 rounded-xl transition-all font-sans cursor-pointer"
              >
                ACCESS
              </button>
            </div>
            {errorMsg && <p className="text-[10px] text-rose-400 font-mono">{errorMsg}</p>}
          </div>

          <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Examples of some channels and pages</span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Below are real campaign setup profiles. Click any card to launch its live analytic model:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {Object.keys(mockProjects).map((key) => {
                const proj = mockProjects[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setProjectId(key);
                      setActiveProject(proj);
                    }}
                    className="w-full text-left bg-white/[0.02] hover:bg-blue-500/[0.05] border border-white/5 hover:border-blue-500/30 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg group-hover:bg-blue-600/15 transition-colors shrink-0">
                        {proj.type === "youtube" ? (
                          <Youtube className="text-red-500" size={18} />
                        ) : proj.type === "instagram" ? (
                          <Instagram className="text-pink-500" size={18} />
                        ) : (
                          <Play className="text-blue-400" size={18} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight truncate">{proj.brand}</p>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{proj.notes}</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded uppercase tracking-wider block text-center">
                        {proj.rawMetricValue}
                      </span>
                      <p className="text-[7.5px] text-slate-500 font-mono uppercase tracking-wider">Access: {key}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
              * Select a preset to explore responsive, dynamic daily tracking charts in milliseconds.
            </p>
          </div>
        </form>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl sm:col-span-2 md:col-span-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-semibold tracking-wider">CLIENT PARTNER</span>
              <span className="text-[10px] sm:text-xs font-bold text-white block mt-1 tracking-tight font-display uppercase truncate">{activeProject.brand}</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-semibold tracking-wider">CAMPAIGN LEVEL</span>
              <span className="text-[10px] sm:text-xs font-bold text-blue-400 block mt-1 font-mono uppercase truncate">{activeProject.package}</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-semibold tracking-wider">LAUNCH DATE</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-300 block mt-1 font-mono truncate">{activeProject.launched}</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-semibold tracking-wider">POSTS RATE</span>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-400 block mt-1 font-mono truncate">{activeProject.activeVideos}</span>
            </div>
            <div className="bg-emerald-500/[0.02] border border-emerald-500/10 hover:border-emerald-500/20 p-3 rounded-xl sm:col-span-2 md:col-span-1">
              <span className="text-[8px] font-mono text-emerald-400 uppercase block font-extrabold tracking-wider">TOTAL VIEWS GAINED</span>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-400 block mt-1 font-mono break-all">{activeProject.rawMetricValue}</span>
            </div>
          </div>

          <p className="text-[10.5px] text-slate-400 italic">
            Note: This is an example of active client channels and pages configured to divide tracking metrics in days.
          </p>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold">30-Day Daily Views Velocity Matrix (D3.js)</span>
              <span className="text-[8px] font-mono text-blue-400 font-bold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded animate-pulse">
                Interactive Cursor Sync Active
              </span>
            </div>
            
            <EngagementLineChart data={activeProject.chartData} />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveProject(null);
                setProjectId("");
              }}
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[10px] uppercase py-3 rounded-xl cursor-pointer text-center font-mono transition-colors"
            >
              EXIT SECURE PROFILE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-components ---

const Navbar = ({ setModal, currentView, setCurrentView, handleBack, viewHistory }: { setModal: (m: ModalContent) => void; currentView: 'home' | 'packages' | 'contact' | 'clients'; setCurrentView: (v: 'home' | 'packages' | 'contact' | 'clients') => void; handleBack?: () => void; viewHistory?: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: "Services", href: "#services", view: "home" as const },
    { name: "Clients", href: "#clients", view: "clients" as const },
    { name: "Packages", href: "#packages", view: "packages" as const },
    { name: "About Us", href: "#about", view: "home" as const }, 
    { name: "Contact", href: "#contact", view: "contact" as const },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setIsOpen(false);
    if (link.view === 'packages') {
      setCurrentView('packages');
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else if (link.view === 'contact') {
      setCurrentView('contact');
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else if (link.view === 'clients') {
      setCurrentView('clients');
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: 'auto' });
        }
      }, 20);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-white/5 py-4 px-6 md:px-12 lg:px-24 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {currentView !== 'home' && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (handleBack) {
                  handleBack();
                } else {
                  setCurrentView('home');
                }
              }}
              className="group inline-flex items-center justify-center bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 w-9 h-9 rounded-full text-[#94A3B8] hover:text-white transition-all shadow-md active:scale-95 cursor-pointer outline-none"
              aria-label="Go Back"
            >
              <ChevronLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform text-blue-400 stroke-[2.5]" />
            </button>
          )}
          <a href="#home" onClick={(e) => { e.preventDefault(); setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'auto' }); }}>
            <ClarixLogo size="md" />
          </a>
        </div>
        
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link);
              }}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
                (link.view === 'contact' && currentView === 'contact') || 
                (link.view === 'clients' && currentView === 'clients') || 
                (link.view === 'packages' && currentView === 'packages') || 
                (link.view === 'home' && currentView === 'home' && link.view === link.view)
                  ? 'text-blue-400' 
                  : 'text-white/70 hover:text-blue-400'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setModal({ type: 'portal' })}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[10px] uppercase px-5 py-3.5 rounded-lg transition-all tracking-widest cursor-pointer"
            id="nav-desktop-portal-btn"
          >
            <User size={12} className="text-blue-400" />
            CLIENT PORTAL
          </button>
          <button 
            onClick={() => setCurrentView('contact')} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] uppercase px-5 py-3.5 rounded-lg transition-all tracking-widest shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            START A PROJECT
            <ChevronRight size={14} />
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          <div className="w-5 h-4 flex flex-col justify-between items-end group cursor-pointer">
            <span className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'w-5 translate-y-[7px] -rotate-45' : 'w-5'}`} />
            <span className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'w-0 opacity-0' : 'w-3.5 group-hover:w-5'}`} />
            <span className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'w-5 -translate-y-[7px] rotate-45' : 'w-5'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-[#0A0A0F]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4.5 shadow-2xl z-[100]"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                className="text-base font-display font-medium text-white/85 hover:text-blue-500 transition-colors py-1 block"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2.5 mt-2">
              <button 
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setModal({ type: 'portal' });
                }}
                className="w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 cursor-pointer text-white"
                id="nav-mobile-portal-btn"
              >
                <User size={13} className="text-blue-400" />
                CLIENT PORTAL
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setCurrentView('contact');
                }}
                className="w-full text-center bg-blue-600 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] text-white cursor-pointer"
              >
                START A PROJECT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ setModal, setCurrentView }: { setModal: (m: ModalContent) => void; setCurrentView: (v: 'home' | 'packages' | 'contact') => void }) => {
  return (
    <Section id="home" className="pt-20 lg:pt-24 pb-8 lg:pb-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="bg-orb-primary top-[-100px] left-[-100px] pointer-events-none" />
      <div className="bg-orb-blue bottom-[-50px] right-[-50px] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left column info */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 font-bold text-[10px] tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            The Secret Formula Behind 10,000,000+ Organic Reach 🪄
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6.5xl font-display font-extrabold tracking-tight leading-[1.1] uppercase"
          >
            <span className="text-white">See Your Brand</span><br />
            <span className="text-blue-500">At Top In 3 Months.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            We craft scroll-stopping content, run high-ROI Meta & Google Ads, and build social media brands people actually love — worldwide.
          </motion.p>
          
          {/* Action buttons matching screen references */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => setCurrentView('contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase px-8 py-4 rounded-full transition-all tracking-wider shadow-lg shadow-blue-600/20"
            >
              Start a Project
            </button>
            <a 
              href="#services"
              className="border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase px-8 py-4 rounded-full transition-all tracking-wider flex items-center gap-2"
            >
              Explore Services <ArrowRight size={14} />
            </a>
          </div>

          {/* SocialVishwa brand stats */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-md">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">31+</div>
              <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400 mt-1">Brands Managed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">10M+</div>
              <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400 mt-1">Reach Generated</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">98%</div>
              <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400 mt-1">Client Retention</div>
            </div>
          </div>
        </div>

        {/* Right column - Magnificent 3D glassmorphic phone mockup directly matching image 2 */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Phone housing frame */}
          <div className="relative w-[285px] h-[550px] rounded-[42px] bg-black border-4 border-neutral-800 shadow-2xl p-3 overflow-hidden flex flex-col justify-between selection:bg-none">
            {/* Camera speaker screen notch */}
            <div className="absolute top-2.5 left-1/2 -track-x-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-slate-950 flex items-center justify-center z-30">
              <div className="w-10 h-1 bg-neutral-800 rounded-full" />
            </div>
            
            {/* Screen background with glowing graphic */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F1A] to-[#05050A] z-10 p-5 pt-10 flex flex-col justify-between rounded-[38px]">
              {/* Fake web header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[9px] font-mono text-slate-500 tracking-widest lowercase">clarixlabs.com</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>

              {/* Central grid and promo card */}
              <div className="my-auto space-y-5">
                <div className="grid grid-cols-3 gap-2 p-3 bg-white/5 border border-white/5 rounded-2xl">
                  {[
                    { icon: <Instagram className="text-pink-500" size={14} />, label: "REELS" },
                    { icon: <Facebook className="text-sky-500" size={14} />, label: "FACEBOOK" },
                    { icon: <Youtube className="text-red-500" size={14} />, label: "YOUTUBE" },
                    { icon: <TrendingUp className="text-emerald-400" size={14} />, label: "GO VIRAL" },
                    { icon: <Globe className="text-teal-400" size={14} />, label: "SEO ENGINE" },
                    { icon: <BarChart3 className="text-amber-500" size={14} />, label: "META ADS" },
                  ].map((p, i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      {p.icon}
                      <span className="text-[7px] text-slate-300 font-bold tracking-wider font-mono mt-1">{p.label}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/25 p-3.5 rounded-xl text-left space-y-1.5">
                  <div className="text-[8px] uppercase tracking-widest text-[#93c5fd] font-mono font-bold">Organic growth engine</div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-tight">Viral Content Machine</div>
                  <p className="text-[8.5px] text-slate-400 leading-normal">
                    Transforming feeds worldwide with high-impact, immersive creative strategy.
                  </p>
                </div>
              </div>

              {/* Frame footer */}
              <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-[8px] text-white">CX</div>
                <div>
                  <div className="text-[8px] font-extrabold text-white">@clarixlabs</div>
                  <div className="text-[7px] font-mono text-slate-500">GLOBAL HEADQUARTERS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating metrics blocks flanking the mockup */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-16 z-20 bg-[#0A0A14]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-2.5 shadow-xl"
          >
            <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
              <Star size={12} className="fill-red-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">+2.4K</div>
              <div className="text-[8px] text-slate-400 font-mono">NEW LIKES TODAY</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute -right-6 top-40 z-20 bg-[#0A0A14]/90 backdrop-blur-md border border-white/10 p-2.5 rounded-xl flex items-center gap-2.5 shadow-xl"
          >
            <div className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Users size={12} />
            </div>
            <div>
              <div className="text-xs font-bold text-white">+12.8K</div>
              <div className="text-[8px] text-slate-400 font-mono">FOLLOWERS THIS MONTH</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -left-8 bottom-16 z-20 bg-[#0A0A14]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-2.5 shadow-xl"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <TrendingUp size={12} />
            </div>
            <div>
              <div className="text-xs font-bold text-white">340%</div>
              <div className="text-[8px] text-slate-400 font-mono">REACH GROWTH</div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

const About = () => {
  return (
    <Section id="about" className="bg-white/[0.02] relative overflow-hidden py-8">
      {/* Abstract Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)', 
        backgroundSize: '24px 24px' 
      }} />
      
      <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10 max-w-6xl mx-auto">
        {/* Left Column: Who We Are & Statement (5 COLS) */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="lg:col-span-5 space-y-5"
        >
          <div className="text-blue-400 font-mono text-[10px] tracking-widest uppercase">WHO WE ARE</div>
          <h2 className="text-xl md:text-2xl font-display font-black leading-snug text-white tracking-widest uppercase">
            We are not just an agency,<br />
            <span className="text-[#facc15]">we are your growth partner.</span>
          </h2>
          <div className="text-slate-400 text-sm leading-relaxed space-y-4 font-sans">
            <p>
              At Clarix Labs, we don't just "post" — we position. We are a digital-first creative studio dedicated to turning brands, creators, and business giants into worldwide household names.
            </p>
            <p>
              We manage high-performance campaigns, scroll-stopping creative visuals, and conversion strategies so you can focus on building your brand.
            </p>
          </div>
        </motion.div>
        
        {/* Right Column: 4 Key Points (7 COLS) */}
        <motion.div 
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="lg:col-span-7 bg-[#0D0D19]/60 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md relative"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-slate-300 font-mono text-[10px] tracking-wider uppercase mb-5 flex items-center gap-1">
            <span className="text-yellow-400">★</span> WHY CLARIX LABS?
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Creative-First",
                icon: <Sparkles className="text-yellow-400" size={16} />,
                description: "Scroll-stopping reels and ads built to capture audience attention instantly."
              },
              {
                title: "Data-Driven Results",
                icon: <BarChart3 className="text-blue-400" size={16} />,
                description: "Real conversion tracking and transparent reporting. ROI focused."
              },
              {
                title: "Global Growth",
                icon: <Globe className="text-pink-400" size={16} />,
                description: "Fully remote online network scaling brands across international markets."
              },
              {
                title: "Fast Turnaround",
                icon: <Clock className="text-emerald-400" size={16} />,
                description: "Fast assets delivery in 24–48 hours with hyper-responsive updates."
              }
            ].map((feat, idx) => (
              <div 
                key={idx} 
                className="bg-[#121124] border border-white/5 rounded-2xl p-4 flex flex-col hover:border-[#2563eb]/30 hover:bg-[#16152F] transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase font-display">
                    {feat.title}
                  </h4>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400 font-sans">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

const Services = ({ onSelect }: { onSelect: (service: any) => void }) => {
  const items = [
    {
      title: "Social Media Marketing",
      icon: "📱",
      description: "End-to-end Instagram, Facebook & LinkedIn management with viral-worthy content. We write scroll-stopping scripts, engineer high-retention hooks in the first 3 seconds, and execute cutting-edge content systems designed to game-match social media algorithms and guarantee organic exposure.",
      tags: ["Instagram", "Facebook", "Reels"],
      features: [
        "Instagram Feed Curation & Aesthetics Synchronization",
        "Facebook Page Engagement & Strategic Seeding",
        "High-Retention Short-Form Reels & Video Production",
        "Viral Hook Engineering & Dynamic Script Copywriting",
        "Platform Algorithm Tuning & Community Moderation"
      ],
      process: [
        { t: "Audience Audit", d: "Analyzing target demographic trends & viral opportunities on social networks." },
        { t: "Hook Formula", d: "Designing custom scroll-stopping script copies and storyboard frames." },
        { t: "Visual Production", d: "Generating dynamic video edits, static layouts, and audio patterns." },
        { t: "Algorithm Distribution", d: "Scheduling content at active hours and triggering maximum feed discovery." }
      ]
    },
    {
      title: "Meta & Google Ads",
      icon: "🎯",
      description: "Laser-targeted paid campaigns that deliver real customers to your business. We engineer full-funnel media models, execute hyper-segmented laser targeting, and continuously deploy high-conversion creative variations to continuously compound your Return on Ad Spend (ROAS).",
      tags: ["Meta Ads", "Google PPC", "ROAS Optimization"],
      features: [
        "Highly Optimized Facebook & Instagram Campaigns",
        "High-Intent Google PPC Search & Display Ad Structures",
        "Expert Conversion API Tracking & Meta Pixel Assembly",
        "Dynamic Ad Design Variables & Scientific A/B Tests",
        "Continuous ROAS Scaling & Lead Flow Refinement"
      ],
      process: [
        { t: "Pixel Activation", d: "Configuring security tokens, conversion APIs, and event analytics." },
        { t: "Ad Segmenting", d: "Mapping target demographic criteria, keywords, and copy variants." },
        { t: "Creative Launch", d: "Deploying media tests and allocating strategic budgets across ads." },
        { t: "ROAS Multiplier", d: "Running daily bid adjustments and redirecting funds to visual winners." }
      ]
    },
    {
      title: "Brand Identity & Design",
      icon: "🎨",
      description: "Logo, brand kit, colours & typography — a premium identity that turns heads. We map elite aesthetic layouts, perform strict color and typography audits, and deliver clean, high-impact branding systems that instantly build customer trust and authority.",
      tags: ["Logo Design", "Brand Guidelines", "Asset Kit"],
      features: [
        "Custom Tailored Vector Brand Logos & Geometry",
        "Harmonized Theme Color Palettes & Font Pairings",
        "Standard Style Guideline Manuals & Asset Rules",
        "Stunning Premium Social Layouts & Overlays",
        "Professional Corporate Pitch Decks & Digital Cards"
      ],
      process: [
        { t: "Mood Mapping", d: "Curating custom style palettes, design aesthetics, and layouts." },
        { t: "Logo Crafting", d: "Forging dynamic master vectors and wordmarks with visual revisions." },
        { t: "Asset Packaging", d: "Exporting high-fidelity components, icons, and template kits." },
        { t: "Style Recording", d: "Documenting rules to ensure seamless presentation across all portals." }
      ]
    },
    {
      title: "SEO & Digital Marketing",
      icon: "🚀",
      description: "Rank #1 on Google globally or locally for search intent keywords and drive high-intent organic traffic. We assemble complete topical authority systems, execute technical search optimizations, and command high-intent inbound buyer queries to fuel your business pipeline.",
      tags: ["Global SEO", "Local Authority", "Keyword Rankings"],
      features: [
        "Comprehensive Technical Audits & Page Speed Boosts",
        "Low-Competition, High-Value Organic Keyword Extraction",
        "Authority Content Silos & Topical Context Layouts",
        "Google Analytics & Search Console Calibration",
        "High-Integrity Backlink Signals & Citation Creation"
      ],
      process: [
        { t: "Keyword Audit", d: "Finding high-intent questions and customer queries in your niche." },
        { t: "Technical Tuning", d: "Optimizing code attributes, load speeds, and crawl-friendly architectures." },
        { t: "Topical Seeding", d: "Drafting highly informative content hierarchies to build authority." },
        { t: "Citation Sowing", d: "Acquiring domain reference backlinks and directory validations." }
      ]
    }
  ];

  return (
    <Section id="services" className="py-12 bg-transparent text-white">
      <SectionTitle 
        subtitle="WHAT WE DO" 
        title={<>Services That Make <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-extrabold">Brands Go Viral</span></>}
        description="From strategy to execution — we handle every aspect of your social media & digital marketing so your brand stands out globally."
        titleClassName="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tight mb-4"
        descClassName="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed"
      />
      
      <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto px-2 sm:px-4">
        {items.map((service, idx) => {
          // Define beautiful distinct color overlays/glow paths for each collage quadrant
          const colorSchemes = [
            { 
              border: "hover:border-blue-500/30",
              glow: "bg-blue-500/[0.04]",
              iconBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
              textHover: "group-hover:text-blue-400"
            },
            { 
              border: "hover:border-purple-500/30",
              glow: "bg-purple-500/[0.04]",
              iconBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
              textHover: "group-hover:text-purple-400"
            },
            { 
              border: "hover:border-pink-500/30",
              glow: "bg-pink-500/[0.04]",
              iconBg: "bg-pink-500/10 border-pink-500/20 text-pink-400",
              textHover: "group-hover:text-pink-400"
            },
            { 
              border: "hover:border-emerald-500/30",
              glow: "bg-emerald-500/[0.04]",
              iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
              textHover: "group-hover:text-emerald-400"
            }
          ];
          const scheme = colorSchemes[idx] || colorSchemes[0];

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelect(service)}
              className={`p-3.5 sm:p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] ${scheme.border} transition-all duration-300 group flex flex-col justify-between relative overflow-hidden h-full min-h-[180px] sm:min-h-[220px] lg:min-h-[260px] shadow-lg cursor-pointer hover:scale-[1.01] active:scale-[0.99] select-none`}
            >
              {/* Subtle dynamic radiant glow matching each design item */}
              <div className={`absolute -right-12 -bottom-12 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-all duration-300 group-hover:scale-150 ${scheme.glow}`} />
              
              {/* Compact collage layout top layout */}
              <div className="w-full">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <motion.div 
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className={`w-7 h-7 sm:w-9 sm:h-9 ${scheme.iconBg} rounded-xl flex items-center justify-center text-sm sm:text-lg cursor-pointer select-none`}
                  >
                    {service.icon}
                  </motion.div>
                  
                  {/* Subtle index numbers */}
                  <span className="font-mono text-[10px] sm:text-xs md:text-sm font-extrabold text-white/10 select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <h3 className={`text-xs sm:text-sm lg:text-base font-bold mb-1 sm:mb-2 tracking-tight text-white ${scheme.textHover} transition-colors`}>
                  {service.title}
                </h3>
                
                <p className="text-slate-400 text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                  {service.description}
                </p>
              </div>

              {/* Responsive Tags and CTAs aligned cleanly to the bottom */}
              <div className="w-full">
                {/* Meta details (visible on all screen sizes since columns fill perfectly) */}
                <div className="hidden sm:flex flex-wrap gap-1 mb-3 pt-2.5 border-t border-white/5">
                  {(service.tags || service.features).map(tag => (
                    <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center gap-1 text-[8px] sm:text-[9.5px] uppercase font-bold text-slate-500 ${scheme.textHover} transition-colors outline-none`}>
                   Learn More <ChevronRight size={8} className="transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

const Portfolio = () => null;

const BrandLogoIllustration = ({ name }: { name: string }) => {
  const getRender = () => {
    switch (name) {
      case "The Skincare Club":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#FFF1F2"/>
            <path d="M50 25C40 38 40 50 50 75C60 50 60 38 50 25Z" fill="#FDA4AF" opacity="0.6"/>
            <path d="M50 30C45 40 45 48 50 68C55 48 55 40 50 30Z" fill="#FB7185"/>
            <circle cx="50" cy="50" r="28" stroke="#F43F5E" strokeWidth="1" strokeDasharray="3 3"/>
            <text x="50" y="86" textAnchor="middle" fill="#BE123C" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">EST. 2026</text>
          </svg>
        );
      case "Aesthetic Studio":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#FEF3C7"/>
            <circle cx="50" cy="50" r="30" stroke="#D97706" strokeWidth="1"/>
            <path d="M35 65L50 32L65 65" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M42 55H58" stroke="#B45309" strokeWidth="1.5"/>
            <circle cx="50" cy="24" r="3" fill="#D97706"/>
          </svg>
        );
      case "Glow & Co":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#ECFDF5"/>
            <circle cx="50" cy="50" r="32" stroke="#059669" strokeWidth="1" strokeDasharray="4 2"/>
            <path d="M50 28L52.5 42.5L67 45L52.5 47.5L50 62L47.5 47.5L33 45L47.5 42.5L50 28Z" fill="#10B981"/>
            <circle cx="34" cy="34" r="2" fill="#34D399"/>
            <circle cx="66" cy="66" r="2.5" fill="#34D399"/>
            <circle cx="65" cy="32" r="1.5" fill="#6EE7B7"/>
          </svg>
        );
      case "Aesthetic Care":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#FDF4FF"/>
            <circle cx="50" cy="50" r="30" stroke="#C084FC" strokeWidth="1"/>
            <path d="M50 35V65M35 50H65" stroke="#A855F7" strokeWidth="3" strokeLinecap="round"/>
            <path d="M40 40C43 35 57 35 60 40C63 45 63 55 60 60C57 65 43 65 40 60C37 55 37 45 40 40Z" stroke="#D8B4FE" strokeWidth="1"/>
          </svg>
        );
      case "Luxe Aesthetic":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#EEF2FF"/>
            <path d="M50 24L72 45L50 76L28 45L50 24Z" fill="#818CF8" opacity="0.4"/>
            <path d="M50 24V76" stroke="#4F46E5" strokeWidth="1.5"/>
            <path d="M28 45H72" stroke="#4F46E5" strokeWidth="1.5"/>
            <path d="M50 24L39 45L50 76L61 45L50 24Z" stroke="#4F46E5" strokeWidth="1.5" fill="none"/>
          </svg>
        );
      case "Aesthetic Wellness":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#FFF5F5"/>
            <path d="M35 50C35 41.7 41.7 35 50 35C53.5 35 56.8 36.2 59.4 38.2C54.6 39.5 51 43.8 51 49C51 54.2 54.6 58.5 59.4 59.8C56.8 61.8 53.5 63 50 63C41.7 63 35 56.3 35 50Z" fill="#F43F5E" opacity="0.25"/>
            <path d="M50 32C40 32 32 40 32 50C32 60 40 68 50 68C53.5 68 56.5 67 59 65C53 63 49 57 49 50C49 43 53 37 59 35C56.5 33 53.5 32 50 32Z" stroke="#E11D48" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="62" cy="40" r="1.5" fill="#FDA4AF"/>
            <circle cx="65" cy="48" r="2.5" fill="#E11D48"/>
          </svg>
        );
      case "Aesthetic Lounge":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#F5F3FF"/>
            <circle cx="50" cy="50" r="30" stroke="#7C3AED" strokeWidth="1" strokeDasharray="2 2"/>
            <path d="M32 55C40 55 42 42 50 42C58 42 60 55 68 55" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round"/>
            <path d="M32 62C40 62 42 49 50 49C58 49 60 62 68 62" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      case "Aesthetic Clinic":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#F9FBF7"/>
            <circle cx="50" cy="50" r="32" stroke="#65A30D" strokeWidth="1.2"/>
            <path d="M50 32V68M32 50H68" stroke="#4D7C0F" strokeWidth="3" strokeLinecap="round"/>
            <rect x="42" y="42" width="16" height="16" rx="2" stroke="#A3E635" strokeWidth="1.5"/>
          </svg>
        );
      case "Aesthetic Skin & Laser":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#ECFEFF"/>
            <circle cx="50" cy="50" r="30" stroke="#0891B2" strokeWidth="1"/>
            <path d="M50 25L52 42L69 44L52 46L50 63L48 46L31 44L48 42L50 25Z" fill="#06B6D4" opacity="0.3"/>
            <path d="M30 30L70 70" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/>
            <path d="M70 30L30 70" stroke="#0891B2" strokeWidth="0.5" strokeDasharray="3 3"/>
            <circle cx="50" cy="50" r="5" fill="#22D3EE" stroke="#0891B2" strokeWidth="1"/>
          </svg>
        );
      case "Aesthetic Skin Studio":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#F0F9FF"/>
            <path d="M50 22C35 34 35 60 50 78C65 60 65 34 50 22Z" fill="#38BDF8" opacity="0.25"/>
            <path d="M50 22C38 34 38 54 50 72C62 54 62 34 50 22Z" stroke="#0284C7" strokeWidth="1.5"/>
            <path d="M50 22C42 34 42 48 50 65C58 48 58 34 50 22Z" stroke="#0284C7" strokeWidth="0.8"/>
            <line x1="50" y1="22" x2="50" y2="78" stroke="#0284C7" strokeWidth="1.5"/>
          </svg>
        );
      case "Aesthetic Skin Lab":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#F4F4F5"/>
            <circle cx="50" cy="50" r="28" stroke="#71717A" strokeWidth="1.2"/>
            <path d="M42 38C45 38 48 44 48 50C48 56 45 62 42 62C39 62 36 56 36 50C36 44 39 38 42 38Z" fill="#A1A1AA" opacity="0.6"/>
            <path d="M58 38C61 38 64 44 64 50C64 56 61 62 58 62C55 62 52 56 52 50C52 44 55 38 58 38Z" fill="#A1A1AA" opacity="0.6"/>
            <circle cx="50" cy="50" r="14" fill="#E4E4E7" stroke="#52525B" strokeWidth="1.5"/>
            <path d="M46 50H54M50 46V54" stroke="#27272A" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      case "Aesthetic Skin Co":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#FFF1F2"/>
            <circle cx="44" cy="50" r="18" fill="#FCA5A5" opacity="0.6"/>
            <circle cx="56" cy="50" r="18" fill="#FECDD3" opacity="0.6"/>
            <path d="M44 50C44 43.4 49.4 38 56 38" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M56 50C56 56.6 50.6 62 44 62" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      case "Aesthetic Skin Clinic":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#F0FDF4"/>
            <path d="M50 25C65 25 68 35 68 45C68 62 50 75 50 75C50 75 32 62 32 45C32 35 35 25 50 25Z" fill="#86EFAC" opacity="0.4"/>
            <path d="M50 25C65 25 68 35 68 45C68 62 50 75 50 75C50 75 32 62 32 45C32 35 35 25 50 25Z" stroke="#16A34A" strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="50" cy="46" r="6" fill="#15803D"/>
          </svg>
        );
      case "Aesthetic Skin & Body":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#FFF8F8"/>
            <path d="M38 30C45 30 45 42 50 42C55 42 55 30 62 30C62 30 65 48 50 68C35 48 38 30 38 30Z" fill="#F43F5E" opacity="0.15"/>
            <path d="M50 24C53 24 55 26.5 55 29.5C55 32.5 52.5 35 50 35C47.5 35 45 32.5 45 29.5C45 26.5 47 24 50 24Z" fill="#E11D48"/>
            <path d="M38 36C45 36 45 46 50 46C55 46 55 36 62 36C62 53 58 64 50 76C42 64 38 53 38 36Z" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#E0F2FE"/>
            <circle cx="50" cy="50" r="30" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3"/>
            <text x="50" y="55" textAnchor="middle" fill="#0369A1" fontSize="16" fontWeight="extrabold" fontFamily="sans-serif">{name.substring(0, 2).toUpperCase()}</text>
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-full rounded-full overflow-hidden select-none">
      {getRender()}
    </div>
  );
};

const ClientLogoCircle = ({ brand }: { brand: any }) => {
  const getUsername = () => {
    return brand.handle ? brand.handle.replace("@", "").trim() : "";
  };

  const getUrlsQueue = () => {
    const queue: string[] = [];
    
    // 1. Primary priority: original provided image (routed through secure server proxy)
    if (brand.image) {
      queue.push(brand.image);
    }
    
    // 2. Second priority: Unavatar provider based on category/url
    const username = getUsername();
    if (username) {
      const isYoutube = brand.url && brand.url.toLowerCase().includes("youtube");
      const isInstagram = brand.url && brand.url.toLowerCase().includes("instagram");
      
      if (isYoutube) {
        queue.push(`https://unavatar.io/youtube/${username}`);
      } else if (isInstagram) {
        queue.push(`https://unavatar.io/instagram/${username}`);
      } else {
        // Safe dual search cascade
        queue.push(`https://unavatar.io/instagram/${username}`);
        queue.push(`https://unavatar.io/youtube/${username}`);
      }
    }

    // 3. Third priority: Try host-domain extraction cascades for known properties (like Orbis Schools)
    if (brand.image && brand.image.includes("theorbisschool.com")) {
      queue.push(`https://unavatar.io/theorbisschool.com`);
    }

    return queue.filter(Boolean);
  };

  const urlsQueueRef = useRef<string[]>([]);
  const [currentUrlIdx, setCurrentUrlIdx] = useState<number>(0);
  const [imgState, setImgState] = useState<'loading' | 'loaded' | 'failed'>('loading');

  useEffect(() => {
    const queue = getUrlsQueue();
    urlsQueueRef.current = queue;
    setCurrentUrlIdx(0);
    setImgState(queue.length > 0 ? 'loading' : 'failed');
  }, [brand.image, brand.handle]);

  const handleError = () => {
    if (currentUrlIdx < urlsQueueRef.current.length - 1) {
      console.log(`[ClientLogoCircle] Failed loading "${urlsQueueRef.current[currentUrlIdx]}". Trying cascade fallback index ${currentUrlIdx + 1}`);
      setCurrentUrlIdx(prev => prev + 1);
    } else {
      console.log(`[ClientLogoCircle] Fallbacks exhausted for "${brand.name}". Rendering high-contrast partner badge.`);
      setImgState('failed');
    }
  };

  const handleLoad = () => {
    setImgState('loaded');
  };

  const currentUrl = urlsQueueRef.current[currentUrlIdx] || "";

  return (
    <div className="w-[105px] h-[105px] xs:w-[115px] xs:h-[115px] sm:w-[120px] sm:h-[120px] md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-slate-200/95 shadow-sm bg-white flex items-center justify-center p-1 relative shrink-0 aspect-square select-none">
      <div className="absolute inset-0 z-0 bg-neutral-50 rounded-full w-full h-full flex items-center justify-center">
        {imgState === 'loading' && (
          <div className="absolute inset-2 bg-slate-50/80 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-ping" />
          </div>
        )}
        {imgState === 'failed' && (
          <div className="w-full h-full rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-slate-300 font-bold select-none p-1.5 relative shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-1.5 rounded-full border border-dashed border-blue-500/10 animate-[spin_60s_linear_infinite]" />
            <span className="font-mono text-[9px] font-bold text-blue-400/80 uppercase tracking-wider leading-none mb-0.5">
              {brand.category && brand.category.toLowerCase().includes("partner") ? "Partner" : "Client"}
            </span>
            <span className="text-xs font-sans font-extrabold text-white leading-none tracking-tight">
              {brand.name ? (
                brand.name.includes("Brand Partner") 
                  ? brand.name.replace("Brand Partner ", "")
                  : brand.name.slice(0, 3).toUpperCase()
              ) : "CLX"}
            </span>
          </div>
        )}
      </div>

      {currentUrl && imgState !== 'failed' && (
        <img 
          key={currentUrl}
          src={getProxiedImageUrl(currentUrl, brand.name)} 
          alt={`${brand.name} Logo`} 
          onLoad={handleLoad}
          onError={handleError}
          referrerPolicy="no-referrer"
          className={`absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full z-10 transition-all duration-300 ease-out ${
            imgState === "loaded" ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />
      )}
    </div>
  );
};

const Clients = ({ setModal }: { setModal?: any }) => {
  return (
    <section id="clients" className="py-0 overflow-hidden w-full">
      {/* Dark Banner Card matching the screenshot */}
      <div className="bg-[#050510] border-y border-white/10 py-12 px-6 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="relative z-10 max-w-4xl mx-auto space-y-2"
        >
          <span className="text-blue-400 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] font-bold block">
            Trusted by Industry Leaders
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-widest uppercase">
            Our Some Special Clients
          </h2>
          <div className="w-16 h-0.5 bg-blue-500 mx-auto mt-4 rounded-full animate-pulse" />
        </motion.div>
      </div>

      {/* High-Contrast White Brand Board with Direct Image requested by user */}
      <div className="bg-white text-slate-900 py-12 px-0 xs:px-4 sm:px-6 md:px-8 w-full flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="w-full md:max-w-[1400px] mx-auto overflow-hidden rounded-none xs:rounded-xl shadow-lg border-y border-slate-100/90 xs:border hover:shadow-xl transition-all duration-300 bg-neutral-50 flex items-center justify-center p-0.5 xs:p-2 sm:p-4 md:p-6"
        >
          {/* Mobile View Image */}
          <img 
            src="https://cdn.corenexis.com/f/9EnsbMt5ZIU.jpg"
            alt="Our Special Clients (Mobile)"
            loading="eager"
            fetchPriority="high"
            className="block md:hidden w-full h-auto object-contain rounded-none xs:rounded-lg max-h-[85vh]"
            referrerPolicy="no-referrer"
          />
          {/* Computer View Image */}
          <img 
            src="https://cdn.corenexis.com/f/J82PKPSPHCg.png"
            alt="Our Special Clients (Desktop)"
            loading="eager"
            fetchPriority="high"
            className="hidden md:block w-full h-auto object-contain rounded-lg max-h-[1000px]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Packages = ({ onPayment }: { onPayment: (amount: string, name: string) => void }) => {
  const [activeIdx, setActiveIdx] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIdx < tiers.length - 1) {
      setActiveIdx(prev => prev + 1);
    }
    if (isRightSwipe && activeIdx > 0) {
      setActiveIdx(prev => prev - 1);
    }
  };

  const tiers = [
    {
      name: "BASIC",
      price: "0.010526",
      subtitle: '"Perfect for Startups"',
      features: [
        "Advance: $0.005 (50% Now)",
        "Balance: $0.005 (After 1 Week)",
        "5 REELS",
        "10 GRAPHICS | STORIES",
        "SOCIAL MEDIA MANAGEMENT",
        "AD CAMPAIGN SETUP",
        "ADS MANAGEMENT",
        "PAGE OPTIMIZATION",
        "CONTENT CREATION",
        "BRAND VISIBILITY"
      ],
      action: "PAY 50% ADVANCE",
      color: "bg-white/5"
    },
    {
      name: "STANDARD",
      price: "274",
      subtitle: '"Perfect for Brands"',
      features: [
        "Advance: $137 (50% Now)",
        "Balance: $137 (After 1 Week)",
        "8 REELS",
        "15 GRAPHICS | STORIES",
        "SOCIAL MEDIA MANAGEMENT",
        "AD CAMPAIGN SETUP",
        "ADS MANAGEMENT",
        "PAGE OPTIMIZATION",
        "CONTENT CREATION",
        "BRAND VISIBILITY"
      ],
      action: "PAY 50% ADVANCE",
      color: "bg-white/5"
    },
    {
      name: "PREMIUM",
      price: "589",
      subtitle: '"Perfect for Growing Enterprises"',
      popular: true,
      features: [
        "Advance: $294.50 (50% Now)",
        "Balance: $294.50 (After 1 Week)",
        "13 REELS",
        "20 GRAPHICS | STORIES",
        "SOCIAL MEDIA MANAGEMENT",
        "COMMUNITY MANAGEMENT",
        "AD CAMPAIGN SETUP",
        "ADS MANAGEMENT",
        "PAGE OPTIMIZATION",
        "CONTENT CREATION",
        "BRAND VISIBILITY"
      ],
      action: "PAY 50% ADVANCE",
      color: "bg-blue-600"
    }
  ];

  return (
    <section id="packages" className="py-6 md:py-10 px-4 sm:px-8 md:px-12 lg:px-24 relative overflow-hidden w-full max-w-7xl mx-auto">
      <SectionTitle 
        subtitle="THE INVESTMENT" 
        title="Choose the tier that matches your brand's current velocity"
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        <div 
          className="w-full overflow-hidden md:overflow-visible px-1 pt-6"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="flex md:grid md:grid-cols-3 md:gap-6 lg:gap-8 gap-4 w-full transition-transform duration-500 ease-out pt-6 md:pt-8 pb-4"
            style={{
              transform: isMobile ? `translateX(calc(-${activeIdx * 100}% - ${activeIdx * 16}px))` : 'none'
            }}
          >
            {tiers.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`w-full shrink-0 md:shrink md:w-auto relative p-6 lg:p-7 rounded-3xl border border-white/10 backdrop-blur-xl flex flex-col h-full ${tier.popular ? 'bg-gradient-to-br from-blue-600/20 to-transparent border-blue-500/30 md:scale-105 z-10' : 'bg-white/5'}`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue-600 text-white text-[9px] font-bold tracking-widest px-3 py-1 rounded-full uppercase z-30">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-blue-400 font-mono text-[10px] tracking-widest uppercase mb-3">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl lg:text-4xl font-display font-medium tracking-tighter">
                      ${parseFloat(tier.price) < 1 ? parseFloat(tier.price).toFixed(2) : Math.round(parseFloat(tier.price)).toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-[9px] uppercase tracking-widest font-mono">USD/mo</span>
                  </div>
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-tight">{tier.subtitle}</p>
                </div>

                <ul className="space-y-3.5 mb-10 flex-grow text-left">
                  {tier.features.map(f => (
                    <li key={f} className="flex gap-2.5 text-slate-400 text-[10px] lg:text-[11px] leading-tight">
                      <Check className="text-blue-500 shrink-0 mt-0.5" size={13} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => onPayment(tier.price, tier.name)}
                  className="w-full py-3.5 rounded-xl font-bold text-[9px] uppercase tracking-widest text-center transition-all cursor-pointer bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                >
                  {tier.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3 dots navigation below */}
        <div className="flex gap-2.5 mt-8 md:hidden">
          {tiers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 outline-none ${activeIdx === idx ? 'bg-blue-500 w-6' : 'bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "1", title: "Blueprint & Competitor Audit", desc: "We analyze your goals and your competition." },
    { num: "2", title: "Architecture & Content Design", desc: "We design your websites and content pillars." },
    { num: "3", title: "Precision Launch & Optimization", desc: "We deploy ads and content with precision." },
    { num: "4", title: "Scale & Daily Performance Audit", desc: "We monitor, adjust, and scale your results daily." },
  ];

  return (
    <Section className="pt-6 pb-2 bg-black/20">
      <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
        <div className="mb-1">
          <SectionTitle 
            subtitle="THE CLARIX PROCESS" 
            title="Step-by-Step Evolution" 
            titleClassName="text-2xl sm:text-3xl font-display font-extrabold tracking-tight mb-1"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="relative pl-12 group"
            >
              <div className="absolute left-0 top-0 text-[10px] bg-white/10 w-8 h-8 flex items-center justify-center rounded-full font-bold group-hover:text-blue-400 transition-colors">
                {s.num}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-white">{s.title}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const GrowthCalculator = ({ setCurrentView }: { setCurrentView: (v: 'home' | 'packages' | 'contact' | 'clients') => void }) => {
  const [selectedPkgIndex, setSelectedPkgIndex] = useState<number>(1); // Default to STANDARD index 1

  const calculatorPackages = [
    {
      id: "basic",
      name: "BASIC",
      subtitle: "Organic Presence Seedling",
      avgViews: "42,500 VIEWS",
      avgViewsRange: "35,000 - 50,000 views / month",
      deliverables: "5 Reels + 10 Graphics | Stories",
      description: "Ideal for testing vertical content and establishing a baseline brand presence."
    },
    {
      id: "standard",
      name: "STANDARD",
      subtitle: "High-Velocity Acceleration",
      avgViews: "150,000 VIEWS",
      avgViewsRange: "125,000 - 175,000 views / month",
      deliverables: "8 Reels + 15 Graphics | Stories",
      description: "Accelerate your digital footprint with interactive storytelling reels."
    },
    {
      id: "premium",
      name: "PREMIUM",
      subtitle: "Enterprise Domination Hub",
      avgViews: "450,000 VIEWS",
      avgViewsRange: "400,000 - 500,000 views / month",
      deliverables: "13 Reels + 20 Graphics | Stories",
      description: "Total omnipresent organic reach managed end-to-end by dedicated team."
    }
  ];

  const activePkg = calculatorPackages[selectedPkgIndex];

  const handleApplyStrategy = () => {
    const goalsPrefillText = `Hi Clarix team! I ran your Interactive Package Calculator. Selected Package: ${activePkg.name}, Expected Views Range: ${activePkg.avgViewsRange}. I want to claim my designed scaling blueprint!`;
    localStorage.setItem('clarix_prefill_goals', goalsPrefillText);
    setCurrentView('contact');

    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }, 20);
  };

  return (
    <Section id="scale-calculator" className="bg-[#0c0c14] relative overflow-hidden mt-2 mb-6">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <SectionTitle 
        subtitle="INTERACTIVE REACH PROJECTION" 
        title={
          <span>
            Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-500 font-extrabold font-display">Package Growth Potential</span>
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto mt-2 relative z-10">
        
        {/* LEFT COLUMN: HALF OF THE WIDGET DISPLAY OF PACKAGES (NOW SHOW NAMES IN A HORIZONTAL GRID) */}
        <div className="bg-[#11111c]/60 border border-white/5 p-4 sm:p-6 rounded-3xl backdrop-blur-xl">
          <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#94a3b8] mb-4 font-bold">
            1. SELECT CAMPAIGN PACKAGE
          </span>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {calculatorPackages.map((pkg, idx) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedPkgIndex(idx)}
                className={`py-4 px-2 sm:py-5 rounded-2xl border text-center transition-all flex items-center justify-center cursor-pointer outline-none relative overflow-hidden font-extrabold font-display text-xs sm:text-sm uppercase tracking-wider ${
                  selectedPkgIndex === idx
                    ? 'bg-[#18182d] border-blue-500 text-blue-400 shadow-lg ring-1 ring-blue-500/20'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED VIEW OF EXPECTED AVERAGE VIEWS */}
        <div className="flex flex-col justify-between bg-gradient-to-b from-[#12121f] to-[#0a0a0f] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="block text-[8px] font-extrabold uppercase font-mono tracking-widest text-blue-500">
                  ESTIMATED ORGANIC GROWTH IMPACT
                </span>
                <h4 className="text-lg font-display font-black text-white uppercase mt-0.5">
                  {activePkg.name} EXPECTANCY
                </h4>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-[#10b981]/10 border border-[#10b981]/20 px-2.5 py-1 rounded-full text-[#10b981] font-mono text-[9px] font-bold uppercase tracking-wider select-none">
                <TrendingUp size={10} />
                <span>ROI FOCUS</span>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.08] p-5 rounded-2xl space-y-2 relative overflow-hidden select-none">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#94a3b8] block font-bold">
                AVERAGE MONTHLY VIEWS OBTAINABLE
              </span>
              <span className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 tracking-tight leading-none block uppercase">
                {activePkg.avgViews}
              </span>
              <span className="text-[10px] font-mono text-slate-400 block mt-1">
                Range Projection: {activePkg.avgViewsRange}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <Check size={12} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-normal">
                  <strong className="text-white">Active Deliverables:</strong> {activePkg.deliverables}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Check size={12} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-normal">
                  {activePkg.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 select-none relative z-10">
            <button
              onClick={() => handleApplyStrategy()}
              type="button"
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-500 text-white font-extrabold text-[10px] uppercase tracking-widest py-3.5 rounded-2xl shadow-xl shadow-blue-500/10 active:scale-95 transition-all outline-none flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <span>Explore My Scaling Potential</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </Section>
  );
};

const renderStars = (rating: number, sizeClass = "w-3 h-3 sm:w-3.5 sm:h-3.5", iconSize = 11) => {
    return (
        <div className="flex gap-0.5 items-center">
            {[...Array(5)].map((_, starIdx) => {
                const value = starIdx + 1;
                if (rating >= value) {
                    return <Star key={starIdx} size={iconSize} className={`fill-blue-500 text-blue-500 ${sizeClass}`} />;
                } else if (rating >= value - 0.5) {
                    return (
                        <div key={starIdx} className={`${sizeClass} relative flex items-center justify-start shrink-0`}>
                            <Star size={iconSize} className={`text-blue-500/20 ${sizeClass} absolute inset-0`} />
                            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: '52%' }}>
                                <Star size={iconSize} className={`fill-blue-500 text-blue-500 ${sizeClass}`} />
                            </div>
                        </div>
                    );
                } else {
                    return <Star key={starIdx} size={iconSize} className={`text-blue-500/20 ${sizeClass}`} />;
                }
            })}
        </div>
    );
};

const ReviewModalContent = ({ review, onClose }: { review: any; onClose: () => void }) => {
  const [avatarFailed, setAvatarFailed] = useState(false);
  if (!review) return null;
  const hasAvatar = review.avatar && !avatarFailed;
  
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none rounded-t-[2rem]" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-1.5 mb-6">
          {renderStars(review.rating, "w-4 h-4 sm:w-5 sm:h-5", 10)}
          <span className="text-sm sm:text-base text-blue-400 font-mono font-bold select-none ml-2">{review.rating.toFixed(1)}</span>
        </div>
        
        <span className="text-blue-500/20 text-6xl sm:text-8xl font-serif leading-none select-none -mb-4 sm:-mb-6">“</span>
        <p className="text-slate-200 text-lg sm:text-2xl md:text-3xl leading-relaxed sm:leading-relaxed font-sans italic font-medium px-4 sm:px-12">
          {review.text}
        </p>
        
        <div className="mt-10 sm:mt-12 flex flex-col items-center gap-4">
          <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/10 shrink-0 flex items-center justify-center ${review.logoBg || 'bg-black/60'} shadow-xl text-xl sm:text-3xl font-bold text-blue-300 uppercase font-mono select-none`}>
              {review.author ? review.author.charAt(0) : "C"}
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">{review.author}</h4>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase mt-2">{review.role}</p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="mt-6 px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

const Reviews = ({ setModal }: { setModal?: (m: ModalContent) => void }) => {
    const [showAll, setShowAll] = useState(false);

    const allClientReviews = [
{
            text: "Clarix Labs helped us scale our presence with high-quality reel edits that actually capture the audience's attention. Our engagement metrics have never been higher.",
            author: "WWEStorylines TV",
            avatar: `https://yt3.googleusercontent.com/aT3rROjnCKDW3wqzu9VxIOa6GyLGzduQnAxNY64NKHjmg13B7VgXV7dG42acJmeI8Ce8gRgJ6-A=s160-c-k-c0x00ffffff-no-rj`,
            role: "YouTube Creator",
                        logoBg: "bg-red-500/10",
            initials: "WT",
            rating: 5
        },
        {
            text: "The content strategy for our cricket edits was a game-changer. They understand trending formats and how to make videos go viral in the sports niche.",
            author: "CricEditz070",
            avatar: `https://yt3.googleusercontent.com/Fs1_ykz6l09-hFKRpcdBv3WtxZp64FYklJwojbXjt64vpiJ3XpubPt0WoE1do2Ms_KLI2sk74aM=s160-c-k-c0x00ffffff-no-rj`,
            role: "Sports Creator",
                        logoBg: "bg-blue-500/10",
            initials: "CE",
            rating: 4.5
        },
        {
            text: "Our Instagram looks incredibly premium now. They managed to capture the luxury vibe of our furniture perfectly through their visual storytelling.",
            author: "Sofa Vogue",
            avatar: `https://scontent.cdninstagram.com/v/t51.82787-19/617022993_17929988142172968_6579848652965690981_n.jpg?_nc_cat=106&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDIxLkMzIn0%3D&_nc_ohc=VFLAmE5-aEQQ7kNvwHICbbx&_nc_oc=AdoeAX6qGEkKzTBuld43YO9c6UD8zZlhrpoVZFuVIOMEpa_ClUgURCubJuLZH5znn5s&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=72ivlsn1eTt66ayJ4YYjRA&_nc_ss=7aaaf&oh=00_Af964w2QY1E1r7vrIf65EzF2rgr6TX6XFC_i4X0yaDtqXw&oe=6A317896`,
            role: "Luxury Furniture Brand",
                        logoBg: "bg-emerald-500/10",
            initials: "SV",
            rating: 4.5
        },
        {
            text: "Managing social media for an educational school requires a delicate balance. Clarix Labs nailed the tone and boosted our community engagement.",
            author: "The Orbis Schools",
            avatar: `https://www.theorbisschool.com/images/orbis-logo.png`,
            role: "Education Institution",
                        logoBg: "bg-indigo-500/10",
            initials: "TO",
            rating: 4
        },
        {
            text: "Incredible response to our interior showcase reels. Their team delivered high-intent local customer inquiries and walk-ins within weeks.",
            author: "Adarsh Furniture",
            avatar: `https://scontent.cdninstagram.com/v/t51.2885-19/135577492_1109583126137965_2053276050173247067_n.jpg?_nc_cat=108&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=A2fbwt67UmcQ7kNvwEEiHGQ&_nc_oc=AdoIsmXrlZG_0WMkid0HHlh93eCSAJyYU0_ghnT-RY6QH5Ov7qfJTppy_sDj14GBmhA&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_ss=7aaaf&oh=00_Af9Ep_r2vi-MUpfc6TrsbJ90DExw8qo6h_40SG_tZ8mgag&oe=6A331CD0`,
            role: "Luxury Furniture",
                        logoBg: "bg-amber-500/10",
            initials: "AF",
            rating: 4.5
        },
        {
            text: "Our commercial real estate campaigns achieved unmatched local reach. They transformed complex property walk-throughs into premium social assets.",
            author: "Goldust",
            avatar: `https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.82787-19/700245304_17914309416383009_1988574807126396619_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2gHU8aHG98MudpFUUAqidlZPvuRNw07gPhaaSvWw_IdvXznPMvxHhFyrzsuEqdl6mbw&_nc_ohc=tl2_BSvP7MsQ7kNvwFVeXsn&_nc_gid=DcO_1Z6cRb-wvOxocydaUw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af-8VINO5Va51-BCziF8_G0-NxR69cLKf_gXl8ej--diyA&oe=6A331154&_nc_sid=7a9f4b`,
            role: "Real Estate Builder",
                        logoBg: "bg-yellow-500/10",
            initials: "GI",
            rating: 4.5
        },
        {
            text: "A highly professional team that understands premium bathroom branding. Our showroom video concepts looked like cinematic masterpieces.",
            author: "Bath Valley",
            avatar: `https://scontent.cdninstagram.com/v/t51.75761-19/495434363_18047683580596274_4615189033362699522_n.jpg?_nc_cat=108&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy41MDAuQzMifQ%3D%3D&_nc_ohc=e2jl5WXZI7kQ7kNvwF4F-5W&_nc_oc=AdrQSYseeMOh3q6lZhioC39jBL-l3fCj6Ce-Cs8UQDexNFeb3Bbp6NvV_vUONsnSd18&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=ZoIXqIBGw3koA_MKUjTQDw&_nc_ss=7aaaf&oh=00_Af-4QRiWeKyAHH5EtB3Jtnte6E7LdTDmu3VVglFh4hrQXA&oe=6A32F8E8`,
            role: "Bathroom Decor",
                        logoBg: "bg-cyan-500/10",
            initials: "BV",
            rating: 5
        },
        {
            text: "Stunning cinematic drone visual edits and premium post-production. They captured the true essence of luxury estate living.",
            author: "Florence Premium Residencies",
            avatar: `https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.82787-19/662934027_17921630649295438_4798090874910342606_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2gGnGCfIZn4eGEUhujCW7VJ86F9bn0like1cB57WitjPiUmdr2YX8dyNmeJOayCBKIU&_nc_ohc=dwh0vliHMx4Q7kNvwGy0unh&_nc_gid=FT6LSQoBXgcM48wiARjSfQ&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af_R_oKyWNZo7BPYf3bslQoKpuECPUJ2rfcFgNkajpuJSA&oe=6A331E16&_nc_sid=7a9f4b`,
            role: "Luxury Developer",
                        logoBg: "bg-indigo-500/10",
            initials: "FP",
            rating: 4.5
        },
        {
            text: "Our fashion clothing collections look absolutely gorgeous in their reel edit formats. We saw a dramatic rise in Instagram direct inquiries.",
            author: "Japnam Designs",
            avatar: `https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.82787-19/684494725_18093480071333659_1626973247680032194_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2gHn4wymzAd71BnfnQNs610_sYjBpstmHksL2NnXiVYmiXf2ollAYgLNjJ83Zu7tNn0&_nc_ohc=A7RY1nH8trQQ7kNvwEUHr4s&_nc_gid=y5ZrHW2lRZ7NuLMr_4Rq-Q&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af_HT80VfBT_LcDMNfAJVQyiFpg6WU--gxlIbmbczmxVKg&oe=6A331E44&_nc_sid=7a9f4b`,
            role: "Bespoke Fashion Label",
                        logoBg: "bg-fuchsia-500/10",
            initials: "JD",
            rating: 5
        },
        {
            text: "They beautifully balanced traditional natural healing values with modern video aesthetics. Highly recommend their organic content blueprints.",
            author: "Vedra",
            avatar: `https://scontent.cdninstagram.com/v/t51.82787-19/653420414_17913156126340385_6405599024310218400_n.jpg?_nc_cat=102&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=iPpEFcN3Z6MQ7kNvwG5bOG1&_nc_oc=AdpLqQQD_84qccPT3KNSFjOw4vRU9vLq-iBGlPz_bgKNkd-YYSV6zX8ybhVQOpHEsrI&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=p1nxy5cHHiThOghYHKfCng&_nc_ss=7aaaf&oh=00_Af9ueCWM0koJ2iYcIqa6snRx6zwN6L87r_y644GSDDAw4w&oe=6A3305E9`,
            role: "Natural Wellness Clinic",
                        logoBg: "bg-green-500/10",
            initials: "VA",
            rating: 4.5
        },
        {
            text: "The gourmet close-ups and cozy lounge vibe reels get food lovers through our doors every single weekend. Pure aesthetic magic!",
            author: "The Loft",
            avatar: `https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.2885-19/277701845_136362555592511_4182201739617833675_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gHMdzGYTUMy22EvcqsF-f7nFrc3hyfT33lRtIdaI2EnEcYsXI6Mjhxub2H_-LS9CJk&_nc_ohc=nFmICh3a4ysQ7kNvwEi-1Vy&_nc_gid=ebl5rPzzMb9Ujk-SOb_tDg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af-1dXx7I-a6lu1UBlf2ytjKZSxND3lCoX1kEzEWpaRvAQ&oe=6A32EDAE&_nc_sid=7a9f4b`,
            role: "Gourmet Lounge",
                        logoBg: "bg-zinc-800/10",
            initials: "TL",
            rating: 4
        },
        {
            text: "Highly professional, communicative, and creative realty content assets. They made our commercial portfolio stand out.",
            author: "Diwa Realty LLP",
            avatar: `https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.2885-19/487788030_901786798634428_8545367450685331146_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2gEAitZ_XQJiCBdw06OELfkkVkRqBrZLTr403D8rGBfqSpUNNmcIzuhUUHQy-Qtl8JY&_nc_ohc=ImqeCW-4iZIQ7kNvwESGDng&_nc_gid=M6eZ-G1WhLkAE41PtGeU8Q&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af9iDolnnf0B9PRY2d5vUOuK4LCzY1PVOvkncWPM3YeRvA&oe=6A32F1EE&_nc_sid=7a9f4b`,
            role: "Commercial Realty Firm",
                        logoBg: "bg-slate-500/10",
            initials: "DR",
            rating: 4.5
        },
        {
            text: "Superb localized real estate targeting. They showcased our premium hill-view properties with breath-taking clarity and visual flare.",
            author: "Vista Properties",
            avatar: `https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.82787-19/574346049_17927921838140600_1851671913411036774_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2gFPBKk1UrsPKbjGfijJm2Fw5elyal6icO_MIGV-sy_80DeWYV9N55uHOriBj857zGU&_nc_ohc=imyYcKwvH6wQ7kNvwFiXReS&_nc_gid=pg1eTPMHGNBCKXUKEHediQ&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af-W8ALEw3hn8YneZgWCbC5s6ftW0dPrv1P_fvpAHkQJyA&oe=6A33178B&_nc_sid=7a9f4b`,
            role: "Scenic Property Agency",
                        logoBg: "bg-blue-400/10",
            initials: "VP",
            rating: 4.5
        },
        {
            text: "Their Middle-East travel guides and business setup explainer videos received global appreciation and amazing organic traffic.",
            author: "Better",
            avatar: `https://scontent.cdninstagram.com/v/t51.82787-19/572694792_17903445861282376_5553938321115714422_n.jpg?_nc_cat=102&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=ci9CzKB5ApMQ7kNvwHzWcpL&_nc_oc=AdovIg5UKD1BkPYXhTvvuvtk6WNUZ7bTpRPNFskwBYgQ4PsNjIiOrD8YEXYQUlLgL8Y&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=R-s2wPBXEQpO57fNkS3eiA&_nc_ss=7aaaf&oh=00_Af-z2FielR0aE34S6Exys16rRj1xAJM1vCReng_Db9uXCw&oe=6A32F16E`,
            role: "Travel Portal",
                        logoBg: "bg-white p-0.5",
            initials: "BU",
            rating: 4.5
        },
        {
            text: "Vibrant colors, high energy background music, and premium editing that made our gourmet Indian dishes irresistible to local foodies.",
            author: "Sylvania Indian Restaurant",
            avatar: `https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.2885-19/470894028_1630157414202770_8780468391616460573_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2gEVBK2BUtcT9Aji-6j4__3wzaTa9g_EY0WYWjq3xALtXarD4zI6NZhFrF7OUPBHTA8&_nc_ohc=dj_-nbT0xgwQ7kNvwHd3Q-8&_nc_gid=9EuUFSIs_5gjvadf9ZBwQg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af_spZsfD2hMk3Vi-6CfF1ZBj4XNW0Z78GR2hho2unY3xQ&oe=6A318951&_nc_sid=7a9f4b`,
            role: "Indian Fine Dining",
                        logoBg: "bg-white p-0.5",
            initials: "SR",
            rating: 4.5
        },
        {
            text: "Our viral food challenge reels absolutely blew up. They know exactly how to trigger visual cravings and trending reach.",
            author: "Meat Mechanics",
            avatar: `https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.2885-19/454722908_1978419785920994_1331566226510301920_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby45NjAuYzIifQ&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2gHusmBthz2jJynneUTIvKElCSeMEKYqLzvlfFqeXOfyN15q-spb_mOnWd_93Muhksc&_nc_ohc=AdTrhT6vMJ4Q7kNvwEeyzHU&_nc_gid=ZCSLEyfeSWiAig06rcQzGw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af_pwR6uCdpN48p4jzK4Tc1arw-Bp3ApFrAT2vX7EgYe9Q&oe=6A318C0C&_nc_sid=7a9f4b`,
            role: "Food & Restaurant Brand",
                        logoBg: "bg-white p-0.5",
            initials: "MM",
            rating: 5
        },
        {
            text: "Prompt responses, flawless video exports, and crisp graphic ads that directly boosted our domestic sweep-service inquiries.",
            author: "Sweepy Maid",
            avatar: `https://scontent.cdninstagram.com/v/t51.2885-19/301153963_136262702444487_9101385390772307234_n.jpg?_nc_cat=109&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=EFLrVHXNsG4Q7kNvwEz6Mpb&_nc_oc=AdqgFE2OC62pdavGwdfxujnx5YdVQtD5jmhTRXJXJbi-KbZZrg1YGTOdp0sozMdngxE&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_ss=7aaaf&oh=00_Af_01psqMh0PllToDmo5rlUDjBglvTnzUPr58KiH0ud1Ew&oe=6A31624B`,
            role: "Home Cleaning Service",
                        logoBg: "bg-sky-400/10",
            initials: "SM",
            rating: 4.5
        },
        {
            text: "Their fine-dining media push gave us beautiful gourmet videos that reach high-intent customers who appreciate true premium dining quality.",
            author: "The Grand Pavilion",
            avatar: `https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.2885-19/274398235_4652225414876387_398269555590706351_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby41MDAuYzIifQ&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gHzhkadpeAyLslXTePuud4HmutWNAq4HlYySjheo5Xmu2r18dcZ845bny9UmnVmhpo&_nc_ohc=1Ho6KKnb1w4Q7kNvwGEr8H_&_nc_gid=VHRANpIH9CNAVOj4FU6UFw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af_e1u1Ttz9BALsIVrkx74jMHIGMyiq6CqI4jcQ78k1mpw&oe=6A317AB8&_nc_sid=7a9f4b`,
            role: "Premium Restaurant",
                        logoBg: "bg-white p-0.5",
            initials: "GP",
            rating: 4.5
        }
];

    const displayedReviews = showAll ? allClientReviews : allClientReviews.slice(0, 4);

    const averageRating = (
        allClientReviews.reduce((sum, r) => sum + r.rating, 0) / allClientReviews.length
    ).toFixed(1);

    const handleToggleShowAll = () => {
        if (!showAll) {
            setShowAll(true);
            // Instantly scroll/position to the top of the reviews section without smooth animation
            setTimeout(() => {
                const titleElement = document.getElementById("reviews-section-header");
                if (titleElement) {
                    titleElement.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
            }, 10);
        } else {
            setShowAll(false);
            // Instantly scroll back to the reviews section start helper
            setTimeout(() => {
                const titleElement = document.getElementById("reviews-section-header");
                if (titleElement) {
                    titleElement.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
            }, 10);
        }
    };

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.04
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 8, scale: 0.99 },
        show: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                type: "spring", 
                stiffness: 240, 
                damping: 22,
                mass: 0.5
            } 
        },
        exit: { opacity: 0, scale: 0.98, transition: { duration: 0.12 } }
    };

    return (
        <Section className="bg-white/[0.01] py-14 relative overflow-hidden">
            <div id="reviews-section-header">
                <SectionTitle subtitle="CLIENT FEEDBACK" title="Voices of Success" />
            </div>
            
            <div className="max-w-5xl mx-auto px-4">
                {/* Average overall rating display block */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[110px] shadow-inner select-none">
                            <span className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">{averageRating}</span>
                            <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-1">out of 5.0</span>
                        </div>
                        <div className="space-y-1 py-1">
                            <div className="flex items-center justify-center sm:justify-start gap-1">
                                {renderStars(parseFloat(averageRating), "w-4 h-4 sm:w-5 sm:h-5", 16)}
                            </div>
                            <p className="text-[11px] sm:text-xs text-slate-400 font-sans mt-1">
                                Outstanding satisfaction score based on <span className="text-blue-400 font-semibold">{allClientReviews.length} verified reviews</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-center sm:text-right shrink-0">
                        <div className="space-y-0.5">
                            <span className="block text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">100% Verified</span>
                            <span className="block text-[8px] sm:text-[9px] text-slate-500 font-mono uppercase tracking-widest">Creator & Brand Network</span>
                        </div>
                    </div>
                </div>
 
                {/* Clean responsive layout: 2 columns to show as 2x2 squares */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.02 }}
                    className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6"
                >
                    <AnimatePresence mode="sync">
                        {displayedReviews.map((r, i) => {
                             return (
                                 <motion.div
                                     key={r.author}
                                     variants={itemVariants}
                                     exit="exit"
                                     onClick={() => {
                                       if (setModal) {
                                         setModal({ type: 'review', data: r });
                                       }
                                     }}
                                     className="h-full relative bg-white/5 border border-white/10 p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:scale-[1.025] hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-blue-500/5 select-none"
                                 >
                                     <div className="space-y-1 sm:space-y-2 lg:space-y-3.5 overflow-hidden">
                                         <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-1">
                                                 {renderStars(r.rating, "w-2 h-2 sm:w-2.5 sm:h-2.5", 8)}
                                                 <span className="text-[7px] sm:text-[9px] text-blue-400 font-mono font-bold select-none">{r.rating.toFixed(1)}</span>
                                             </div>
                                             <span className="text-blue-500/10 text-xl sm:text-3xl lg:text-4xl font-serif leading-none select-none group-hover:text-blue-500/25 transition-colors">“</span>
                                         </div>
                                         <p className="text-slate-300 text-[8px] sm:text-[10px] md:text-[11px] lg:text-sm leading-relaxed sm:leading-relaxed lg:leading-relaxed italic font-sans line-clamp-4 sm:line-clamp-5">
                                             "{r.text}"
                                         </p>
                                     </div>
                                     
                                     <div className="flex flex-col items-center pt-2 sm:pt-3 mt-1 sm:mt-2 lg:mt-4 border-t border-white/5 shrink-0 text-center">
                                         <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/10 shrink-0 flex items-center justify-center mb-1.5 sm:mb-2 ${r.logoBg || 'bg-black/60'} shadow-md text-xs sm:text-sm font-bold text-blue-300 uppercase font-mono select-none`}>
                                             {r.author ? r.author.charAt(0) : "C"}
                                         </div>
                                         <h4 className="text-[8px] sm:text-[10px] md:text-xs font-bold text-white uppercase tracking-wider truncate w-full">{r.author}</h4>
                                         <p className="text-[6px] sm:text-[8px] md:text-[9px] text-slate-500 font-mono tracking-widest uppercase truncate mt-0.5 w-full">{r.role}</p>
                                     </div>
                                 </motion.div>
                             );
                         })}
                     </AnimatePresence>
                 </motion.div>

                {/* View More / Show Less Button Slider Control block */}
                <div className="flex justify-center mt-10">
                    <button
                        type="button"
                        onClick={handleToggleShowAll}
                        className="group border border-white/10 hover:border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-all flex items-center gap-2.5 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 active:scale-95 cursor-pointer outline-none"
                    >
                        {showAll ? "Show Less Reviews" : "View More Reviews"}
                        <Plus size={11} className={`transform transition-transform text-blue-500 ${showAll ? "rotate-45 text-red-400" : "group-hover:rotate-90 text-blue-400"}`} />
                    </button>
                </div>
            </div>
        </Section>
    );
};

const Contact = () => {
  const [userName, setUserName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [whatsAppNum, setWhatsAppNum] = useState("");
  const [emailAddr, setEmailAddr] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [goalsText, setGoalsText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ emailSent: boolean; diagnostic?: string } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    const prefill = localStorage.getItem('clarix_prefill_goals');
    if (prefill) {
      setGoalsText(prefill);
      localStorage.removeItem('clarix_prefill_goals');
    }
    const prefillSvc = localStorage.getItem('clarix_prefill_service');
    if (prefillSvc) {
      setServiceNeeded(prefillSvc);
      localStorage.removeItem('clarix_prefill_service');
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!userName.trim()) {
      setFormError("Kindly supply your name.");
      return;
    }
    if (!whatsAppNum.trim()) {
      setFormError("Kindly supply your WhatsApp / Phone number.");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    const waMsg = `🔥 *New Brand Inquiry - Clarix Labs* 🔥\n\n` +
                  `👤 *Name:* ${userName}\n` +
                  `🏢 *Company/Brand:* ${brandName || 'N/A'}\n` +
                  `📞 *WhatsApp/Phone:* ${whatsAppNum}\n` +
                  `✉️ *Email:* ${emailAddr || 'N/A'}\n` +
                  `🛠️ *Service Selected:* ${serviceNeeded || 'General Growth Consultation'}\n\n` +
                  `🎯 *Goals & Vision:* \n${goalsText || 'Let\'s scale our brand together!'}`;
    const generatedWaUrl = `https://wa.me/917507042023?text=${encodeURIComponent(waMsg)}`;
    setWhatsappUrl(generatedWaUrl);
    
    // Background submission to avoid popup blocker or iframe redirect refusal
    fetch("/api/submit-inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: userName,
        whatsapp: whatsAppNum,
        email: emailAddr,
        service: serviceNeeded,
        goals: goalsText
      })
    })
    .then(() => {
      setSubmissionStatus({
        emailSent: true,
        diagnostic: ""
      });
    })
    .catch((err: any) => {
      console.error("Submission API request failed:", err);
      setSubmissionStatus({
        emailSent: true,
        diagnostic: ""
      });
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    try {
      window.open(generatedWaUrl, "_blank");
    } catch (err) {
      console.error("WhatsApp redirect failed:", err);
      window.location.href = generatedWaUrl;
    }
  };

  const contactOptions = [
    {
      title: "WhatsApp Us",
      value: "+91 75070 42023",
      desc: "Open direct chat with pre-filled message",
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-400/20 hover:text-emerald-350",
      action: "https://wa.me/917507042023?text=" + encodeURIComponent("Hi Clarix Labs Team,\n\nI am writing to scale our brand's online presence with Clarix Labs. Here is some information about my inquiry:\n\n👤 My Name: \n🏢 Brand Name: \n📞 WhatsApp/Phone number: \n\nPlease share the available packages and next steps with me.\n\nBest regards,"),
      icon: <WhatsAppLogo size={20} />
    },
    {
      title: "Email Us",
      value: "clarixlabs@gmail.com",
      desc: "Open direct web draft with pre-filled message",
      color: "bg-pink-500/10 border-pink-500/20 text-pink-400 hover:bg-pink-400/20 hover:text-pink-350",
      action: "https://mail.google.com/mail/?view=cm&fs=1&to=clarixlabs@gmail.com&su=" + encodeURIComponent("Brand Growth Inquiry - Clarix Labs") + "&body=" + encodeURIComponent("Hi Clarix Labs Team,\n\nI am writing to scale our brand's online presence with Clarix Labs. Here is some information about my inquiry:\n\n👤 My Name: \n🏢 Brand Name: \n📞 WhatsApp/Phone number: \n\nPlease share the available packages and next steps with me.\n\nBest regards,"),
      icon: <Mail size={20} />
    }
  ];

  return (
    <section id="contact" className="bg-transparent pt-6 pb-20 relative overflow-hidden w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      {/* Absolute ambient light orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-16 items-start relative z-10">
        
        {/* Left Column content info */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 border border-[#2563eb]/20 px-4 py-1.5 rounded-full text-blue-400 font-bold text-[10px] tracking-widest uppercase">
            GET IN TOUCH
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-black leading-tight text-white tracking-tight">
            We're a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-pink-500">world-class</span> social media team.
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Drop us a message — we respond lightning fast on WhatsApp! We operate on a fully worldwide scale, ensuring your brand enjoys elite growth, engagement, and reach.
          </p>

          {/* Quick interactive action buttons */}
          <div className="space-y-4 pt-4">
            {contactOptions.map((opt, i) => (
              <a 
                href={opt.action}
                target={opt.action.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer block text-left"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${opt.color}`}>
                  {opt.icon}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd] transition-colors">{opt.title}</div>
                  <div className="text-base font-bold text-white mt-0.5 group-hover:text-blue-400 transition-colors">{opt.value}</div>
                  <div className="text-slate-400 text-xs mt-1 leading-normal font-sans">{opt.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column Contact Form matching the beautiful UI in screenshot */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-6">
              <div className="max-w-md">
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white">Send Us a Message</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
                  Fill this out — our growth team will analyze your brand and reach out within 2 hours on WhatsApp or Email. 🎯
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 rounded-full text-green-400 font-extrabold text-[9px] tracking-wide uppercase select-none shrink-0 self-start sm:self-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                ⚡ Instant Delivery
              </div>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.05
                    }
                  }
                }}
                className="text-center py-12 space-y-6 relative flex flex-col items-center justify-center min-h-[350px]"
              >
                {/* Subtle colored radiant glowing circles behind the success message */}
                <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

                {/* Highly animated icon ring and bouncing rocket */}
                <motion.div 
                  variants={{
                    hidden: { scale: 0.8, opacity: 0 },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: { type: "spring", stiffness: 200, damping: 15 }
                    }
                  }}
                  className="relative flex items-center justify-center h-24 w-24 mb-2"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.4, 0.15] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute w-20 h-20 rounded-full bg-blue-500/20 blur-md pointer-events-none"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.6, 1], opacity: [0.05, 0.2, 0.05] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                    className="absolute w-20 h-20 rounded-full bg-purple-500/10 blur-lg pointer-events-none"
                  />
                  
                  {/* Rotating decorative dashed border ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-blue-500/30"
                  />

                  {/* Centered brand-styled Rocket container */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-400 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                    <motion.div
                      animate={{ 
                        y: [-2, 2, -2],
                        rotate: [45, 41, 49, 45]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2.5, 
                        ease: "easeInOut" 
                      }}
                      className="flex items-center justify-center"
                    >
                      <Rocket size={26} className="transform rotate-45" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Animated transmission tag */}
                <motion.div
                  variants={{
                    hidden: { y: 15, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                  }}
                  className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3.5 py-1.25 rounded-full text-green-400 font-mono text-[9px] font-extrabold uppercase tracking-widest"
                >
                  <Check size={10} className="stroke-[3]" />
                  <span>TRANSMISSION COMPLETE</span>
                </motion.div>

                {/* Staggered heading */}
                <motion.div
                  variants={{
                    hidden: { y: 15, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                  }}
                  className="space-y-2 max-w-sm"
                >
                  <h4 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">
                    Inquiry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-500">Captured!</span>
                  </h4>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto" />
                </motion.div>

                {/* Beautiful descriptive message */}
                <motion.p 
                  variants={{
                    hidden: { y: 15, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                  }}
                  className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto font-sans"
                >
                  Your brand details and growth objectives have been compiled. Our strategy department is analyzing your market ecosystem and will reach out via WhatsApp/Email within <span className="text-white font-semibold">2 hours</span> with your customized roadmap. 📈
                </motion.p>



                {/* Success actions */}
                <motion.div
                  variants={{
                    hidden: { y: 15, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                  }}
                  className="w-full flex flex-col sm:flex-row gap-3 justify-center items-center mt-6"
                >
                  {whatsappUrl && (
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-8 py-4 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white text-[10px] uppercase tracking-widest font-extrabold transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/35 flex items-center justify-center gap-2 group w-full sm:w-auto"
                    >
                      <WhatsAppLogo size={16} />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                  )}
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsSubmitted(false);
                      setUserName("");
                      setBrandName("");
                      setWhatsAppNum("");
                      setEmailAddr("");
                      setServiceNeeded("");
                      setGoalsText("");
                      setSubmissionStatus(null);
                    }}
                    className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-white/20 text-[10px] uppercase tracking-widest font-extrabold transition-all duration-300 text-blue-400 cursor-pointer shadow-md flex items-center justify-center gap-2 group w-full sm:w-auto"
                  >
                    <span>Submit Another Response</span>
                    <RefreshCw size={10} className="group-hover:rotate-180 transition-transform duration-500" />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1 Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-mono text-slate-400 mb-1.5 font-bold">Your Name *</label>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. John Doe" 
                      className="w-full bg-[#111119]/80 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 transition-colors text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-mono text-slate-400 mb-1.5 font-bold">Brand / Company</label>
                    <input 
                      type="text" 
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Acme Corp" 
                      className="w-full bg-[#111119]/80 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 transition-colors text-white" 
                    />
                  </div>
                </div>

                {/* Row 2 Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-mono text-slate-400 mb-1.5 font-bold">WhatsApp / Phone Number *</label>
                    <input 
                      type="text" 
                      value={whatsAppNum}
                      onChange={(e) => setWhatsAppNum(e.target.value)}
                      placeholder="e.g. +91 99999 99999" 
                      className="w-full bg-[#111119]/80 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 transition-colors text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-mono text-slate-400 mb-1.5 font-bold">Email (Optional)</label>
                    <input 
                      type="email" 
                      value={emailAddr}
                      onChange={(e) => setEmailAddr(e.target.value)}
                      placeholder="e.g. hello@brand.com" 
                      className="w-full bg-[#111119]/80 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 transition-colors text-white" 
                    />
                  </div>
                </div>

                {/* Service Selection Dropdown */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-mono text-slate-400 mb-1.5 font-bold">Select Service You Need</label>
                  <select 
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    className="w-full bg-[#111119] border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 text-slate-300 appearance-none text-white cursor-pointer"
                  >
                    <option value="">Select Service You Need...</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Meta & Google Ads">Meta & Google Ads</option>
                    <option value="Brand Identity & Design">Brand Identity & Design</option>
                    <option value="SEO & Digital Marketing">SEO & Digital Marketing</option>
                  </select>
                </div>

                {/* Goals Textarea */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-mono text-slate-400 mb-1.5 font-bold">Goals & Vision</label>
                  <textarea 
                    rows={4} 
                    value={goalsText}
                    onChange={(e) => setGoalsText(e.target.value)}
                    placeholder="Tell us about your goals (e.g. I want to grow my Instagram page, run high-converting Meta ads globally...)" 
                    className="w-full bg-[#111119]/80 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 transition-colors resize-none text-white leading-relaxed"
                  ></textarea>
                </div>

                {formError && (
                  <p className="text-[11px] text-[#f43f5e] font-mono italic">{formError}</p>
                )}

                 <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#25d366] hover:bg-[#20ba5a] agro-cta disabled:opacity-50 text-white font-black text-xs uppercase py-4 rounded-xl transition-all tracking-wider flex items-center justify-center gap-2 mt-4 hover:shadow-green-500/20 shadow-lg shadow-green-500/10 cursor-pointer animate-none border border-green-400/20"
                >
                   <WhatsAppLogo size={16} />
                   {isSubmitting ? "Connecting to WhatsApp..." : "Submit & Send on WhatsApp 💬"}
                </button>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const Footer = ({ currentView, setCurrentView, setModal }: { currentView: 'home' | 'packages' | 'contact' | 'clients'; setCurrentView: (v: 'home' | 'packages' | 'contact' | 'clients') => void; setModal: (m: ModalContent) => void }) => {
    return (
        <footer className="relative z-10 p-10 md:p-24 border-t border-white/10 bg-black/40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-8">
                <div className="space-y-8">
                    <a href="#home" onClick={(e) => { e.preventDefault(); setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'auto' }); }}>
                        <ClarixLogo size="md" />
                    </a>
                    <p className="text-slate-500 text-xs leading-relaxed uppercase tracking-widest">Building high-conversion digital ecosystems for the next generation of brands.</p>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            {[
                                { icon: <Instagram size={18} />, href: "https://instagram.com/clarixlabs" },
                                { icon: <Facebook size={18} />, href: "https://facebook.com/clarixlabs" }
                            ].map((s, i) => (
                               <a key={i} href={s.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all">
                                   {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 md:col-span-2">
                    <div>
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {['Services', 'Clients', 'Packages', 'About Us', 'Contact'].map(l => (
                              <li key={l}>
                                 <a 
                                   href={`#${l === 'About Us' ? 'about' : l.toLowerCase().replace(' ', '')}`}
                                   onClick={(e) => {
                                     if (l === 'Packages') {
                                       e.preventDefault();
                                       setCurrentView('packages');
                                       window.scrollTo({ top: 0, behavior: 'auto' });
                                     } else if (l === 'Contact') {
                                       e.preventDefault();
                                       setCurrentView('contact');
                                       window.scrollTo({ top: 0, behavior: 'auto' });
                                     } else if (l === 'Clients') {
                                       e.preventDefault();
                                       setCurrentView('clients');
                                       window.scrollTo({ top: 0, behavior: 'auto' });
                                     } else {
                                       setCurrentView('home');
                                       if (currentView !== 'home') {
                                         setTimeout(() => {
                                           const el = document.querySelector(l === 'About Us' ? '#about' : `#${l.toLowerCase().replace(' ', '')}`);
                                           if (el) el.scrollIntoView({ behavior: 'auto' });
                                         }, 20);
                                       }
                                     }
                                   }}
                                   className="text-xs text-slate-500 hover:text-blue-500 uppercase tracking-widest transition-colors font-medium"
                                 >
                                   {l}
                                 </a>
                              </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-8">Legal</h4>
                        <ul className="space-y-4">
                            {[
                              { name: 'Privacy Policy', type: 'privacy' as const },
                              { name: 'Terms & Conditions', type: 'terms' as const },
                              { name: 'Cookie Policy', type: 'cookie' as const }
                            ].map(item => (
                              <li key={item.name}>
                                 <a 
                                   href="#" 
                                   onClick={(e) => {
                                     e.preventDefault();
                                     setModal({ type: item.type });
                                   }}
                                   className="text-xs text-slate-500 hover:text-white uppercase tracking-widest transition-colors font-medium"
                                 >
                                   {item.name}
                                 </a>
                              </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <div 
                    className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium text-center md:text-left select-none"
                  >
                      Clarix Labs © 2026 — ALL RIGHTS RESERVED
                  </div>
                </div>
                <div className="flex gap-8">
                     <span className="text-[10px] text-slate-600 uppercase tracking-widest">Designed for high conversion</span>
                     <span className="text-[10px] text-slate-600 uppercase tracking-widest">Built for speed</span>
                </div>
            </div>
        </footer>
    );
};

// --- AI Chatbot Component ---

const parseMarkdown = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    let cleanLine = line.trim();
    if (!cleanLine) {
      return <div key={idx} className="h-2" />;
    }

    // Bold text replacements (**text**)
    const parts: React.ReactNode[] = [];
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let match;
    let lastIndex = 0;

    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="font-extrabold text-blue-400">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    // Render as bullet list item
    if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ")) {
      return (
        <li key={idx} className="ml-4 list-disc text-slate-300 text-sm py-0.5 leading-relaxed">
          {parts.length > 0 ? parts : cleanLine.substring(2)}
        </li>
      );
    }

    // Render as numbered list item
    const numMatch = cleanLine.match(/^(\d+)\.\s(.*)/);
    if (numMatch) {
      return (
        <li key={idx} className="ml-4 list-decimal text-slate-300 text-sm py-0.5 leading-relaxed">
          {parts.length > 0 ? parts : numMatch[2]}
        </li>
      );
    }

    // Render as header
    if (cleanLine.startsWith("### ")) {
      return (
        <h4 key={idx} className="text-sm font-bold text-blue-400 mt-2 mb-1 uppercase tracking-wider font-mono">
          {parts.length > 0 ? parts : cleanLine.substring(4)}
        </h4>
      );
    } else if (cleanLine.startsWith("## ") || cleanLine.startsWith("# ")) {
      const hText = cleanLine.startsWith("## ") ? cleanLine.substring(3) : cleanLine.substring(2);
      return (
        <h3 key={idx} className="text-base font-bold text-white mt-3 mb-1">
          {parts.length > 0 ? parts : hText}
        </h3>
      );
    }

    // Standard paragraph
    return (
      <p key={idx} className="text-slate-300 text-sm leading-relaxed mb-1.5">
        {parts.length > 0 ? parts : line}
      </p>
    );
  });
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { 
      role: 'model', 
      content: "👋 Hello! I am your **Clarix Labs AI Growth Strategist**.\n\nAsk me anything about our SMM packages, viral content systems, Meta/Google Ads setups, or how we deliver high-ROI scaling map for brands!" 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : inputValue;
    if (!text.trim() || isLoading) return;

    if (textToSend === undefined) {
      setInputValue("");
    }
    setErrorMsg("");

    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!res.ok) {
        throw new Error("Failed to contact the strategist");
      }

      const data = await res.json();
      if (data && data.text) {
        setMessages(prev => [...prev, { role: 'model', content: data.text }]);
      } else {
        throw new Error("Empty response received");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Strategist is currently busy drafting campaigns. Please try writing again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      { 
        role: 'model', 
        content: "👋 Hello! I am your **Clarix Labs AI Growth Strategist**.\n\nAsk me anything about our SMM packages, viral content systems, Meta/Google Ads setups, or how we deliver high-ROI scaling map for brands!" 
      }
    ]);
    setInputValue("");
    setErrorMsg("");
  };

  const suggestionChips = [
    "Tell me about SMM plans",
    "How fast is delivery?",
    "Do you do ads?",
    "What is the Growth Calculator?"
  ];

  return (
    <div className="relative">
      {/* Floating Button triggers */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-20 z-[90] w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 text-white cursor-pointer border border-blue-400/20 active:scale-95 transition-all outline-none"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <X size={18} className="text-white" />
        ) : (
          <div className="relative">
            <Sparkles size={18} className="text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-slate-900 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-slate-900" />
          </div>
        )}
      </motion.button>

      {/* Floating Chat Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.23, ease: "easeOut" }}
          className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] bg-[#0B0B13]/98 border border-white/10 rounded-2xl shadow-[0_24px_60px_rgba(37,99,235,0.22)] flex flex-col overflow-hidden z-[110] backdrop-blur-xl transition-all"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#0C0E1A] to-[#12162E] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-blue-600/10 border border-blue-500/25 flex items-center justify-center">
                <Sparkles size={16} className="text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold tracking-wide text-white uppercase font-sans">Growth AI Assistant</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9.5px] font-mono tracking-widest text-[#25D366] font-bold uppercase">Ready to scale</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Restart Chat"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar bg-radial from-[#0C0E1B] to-[#08080C]">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div key={index} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Bot Avatar Icon */}
                    {!isUser && (
                      <div className="w-6.5 h-6.5 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles size={11} className="text-blue-400" />
                      </div>
                    )}
                    <div 
                      className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed select-text ${
                        isUser 
                          ? 'bg-blue-600/90 text-white rounded-tr-none' 
                          : 'bg-white/[0.03] border border-white/5 text-slate-300 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {isUser ? <p className="text-white text-sm">{msg.content}</p> : parseMarkdown(msg.content)}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex w-full justify-start items-center gap-2">
                <div className="w-6.5 h-6.5 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Loader2 size={11} className="text-blue-400 animate-spin" />
                </div>
                <div className="bg-white/[0.02] border border-white/5 px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="flex w-full justify-center">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-center text-xs text-red-400 max-w-[90%]">
                  {errorMsg}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Interactive Suggestions Bar */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-black/[0.15] border-t border-white/5 overflow-x-auto whitespace-nowrap flex items-center gap-2 no-scrollbar scroll-smooth">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  disabled={isLoading}
                  className="px-3 py-1 rounded-full bg-white/[0.02] hover:bg-blue-600/20 hover:text-white border border-white/5 hover:border-blue-500/30 text-slate-400 text-xs transition-all cursor-pointer font-sans select-none shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Form Input Area */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-gradient-to-t from-[#090A11] to-[#0A0A0F] border-t border-white/5 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask for scaling, SMM models, pricing..."
              disabled={isLoading}
              className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.05] border border-white/5 focus:border-blue-500/40 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder-slate-500 transition-all outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:bg-white/[0.02] disabled:text-slate-600 text-white flex items-center justify-center transition-all cursor-pointer border border-blue-500/10 disabled:border-transparent outline-none"
            >
              <Send size={15} />
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [modal, setModal] = useState<ModalContent>({ type: null });
  const [currentView, setCurrentViewRaw] = useState<'home' | 'packages' | 'contact' | 'clients'>('home');
  const [viewHistory, setViewHistory] = useState<('home' | 'packages' | 'contact' | 'clients')[]>([]);
  const homeScrollPositionRef = useRef(0);

  const setCurrentView = (v: 'home' | 'packages' | 'contact' | 'clients') => {
    setCurrentViewRaw((prev) => {
      if (prev === 'home' && v !== 'home') {
        homeScrollPositionRef.current = window.scrollY;
      }
      if (prev !== v) {
        setViewHistory((history) => [...history, prev]);
      }
      return v;
    });
  };

  const handleBack = () => {
    if (viewHistory.length > 0) {
      const prev = viewHistory[viewHistory.length - 1];
      setViewHistory((history) => history.slice(0, -1));
      setCurrentViewRaw(prev);
      if (prev === 'home') {
        setTimeout(() => {
          window.scrollTo({ top: homeScrollPositionRef.current, behavior: 'auto' });
        }, 10);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else {
      setCurrentViewRaw('home');
      setTimeout(() => {
        window.scrollTo({ top: homeScrollPositionRef.current, behavior: 'auto' });
      }, 10);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 overflow-x-hidden selection:bg-blue-500 selection:text-white relative">
      <div id="debug-render-check" className="sr-only">App Rendered Successfully</div>
      
      {/* Global Background Orbs */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-100px] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Floating Elements */}

      <motion.a
        href={"https://wa.me/917507042023?text=" + encodeURIComponent("Hi Clarix Labs Team,\n\nI am writing to scale our brand's online presence with Clarix Labs. Here is some information about my inquiry:\n\n👤 My Name: \n🏢 Brand Name: \n📞 WhatsApp/Phone number: \n\nPlease share the available packages and next steps with me.\n\nBest regards,")}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-[90] w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/45 text-white cursor-pointer"
      >
        <WhatsAppLogo size={20} className="text-white" />
      </motion.a>

      <Navbar setModal={setModal} currentView={currentView} setCurrentView={setCurrentView} handleBack={handleBack} viewHistory={viewHistory} />
      
      {currentView === 'home' && (
        <>
          <Hero setModal={setModal} setCurrentView={setCurrentView} />
          <About />
          <Services onSelect={(service) => setModal({ type: 'service', data: service })} />
          <Portfolio />
          <Process />
          <GrowthCalculator setCurrentView={setCurrentView} />
          <Reviews setModal={setModal} />
        </>
      )}

      {currentView === 'clients' && (
        <div className="pt-20 lg:pt-24 min-h-[70vh] flex flex-col justify-start w-full">
          <Clients setModal={setModal} />
        </div>
      )}

      {currentView === 'packages' && (
        <div className="pt-20 lg:pt-24 min-h-[70vh] flex flex-col justify-start w-full">
          <Packages onPayment={(amount, packageName) => {
            const floatPrice = parseFloat(amount.replace(/[^0-9.]/g, ''));
            setModal({ type: 'checkout', data: { price: floatPrice, name: packageName } });
          }} />
        </div>
      )}

      {currentView === 'contact' && (
        <div className="pt-20 lg:pt-24 min-h-[70vh] flex flex-col justify-start w-full">
          <Contact />
        </div>
      )}
      
      <Footer currentView={currentView} setCurrentView={setCurrentView} setModal={setModal} />

      {/* Modal Management */}
      <ModalPortal 
        isOpen={modal.type !== null} 
        onClose={() => setModal({ type: null })} 
        size={modal.type === 'receipt' || modal.type === 'checkout' ? 'max-w-6xl' : 'max-w-2xl'}
      >
        {modal.type === 'privacy' && <PrivacyContent />}
        {modal.type === 'terms' && <TermsContent />}
        {modal.type === 'cookie' && <CookieContent />}
        {modal.type === 'service' && (
          <ServiceDetail 
            service={modal.data} 
            onStartProject={() => {
              if (modal.data?.title) {
                localStorage.setItem('clarix_prefill_service', modal.data.title);
                const prefillGoals = `Hi Clarix team! I want to start a project under your "${modal.data.title}" service segment. Let's kickoff my brand's digital evolution roadmap!`;
                localStorage.setItem('clarix_prefill_goals', prefillGoals);
              }
              setModal({ type: null });
              setCurrentView('contact');
              setTimeout(() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "auto", block: "start" });
                }
              }, 20);
            }} 
          />
        )}
        {modal.type === 'project' && <ProjectCaseStudy project={modal.data} />}
        {modal.type === 'checkout' && (
          <CheckoutView 
            data={modal.data} 
            onPaymentVerified={(receiptData) => {
              setModal({ type: 'receipt', data: receiptData });
            }} 
          />
        )}
        {modal.type === 'receipt' && <ReceiptView data={modal.data} />}
        {modal.type === 'review' && <ReviewModalContent review={modal.data} onClose={() => setModal({ type: null })} />}
        {modal.type === 'portal' && <ClientPortalView initialProjectKey={modal.data?.initialProjectKey} />}
        {modal.type === 'admin' && <AdminLeadsView />}
      </ModalPortal>

      {/* Global SMTP and System Notification Toasts */}
      <ToastContainer />
    </div>
  );
}
