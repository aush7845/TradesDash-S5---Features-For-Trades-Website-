import { Mic, FileText, MessageCircle, ShieldCheck, Wrench, Zap, Flame, Home, Sparkles } from "lucide-react";

// The database stores icon NAMES (strings). Add new icons here to use them.
const icons = { Mic, FileText, MessageCircle, ShieldCheck, Wrench, Zap, Flame, Home, Sparkles };

export const getIcon = (name) => icons[name] ?? Sparkles;
