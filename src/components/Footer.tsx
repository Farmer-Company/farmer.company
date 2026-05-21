import React from 'react';
import { Twitter, Facebook, Instagram, Youtube, Globe } from 'lucide-react';

const DiscordIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

export const Footer = () => {
 return (
 <footer className="bg-[#050505] text-white py-20 px-8 md:px-12 lg:px-24 border-t border-white/5 font-sans">
 <div className="max-w-7xl mx-auto">
 {/* Top: News and Social */}
 <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
 <div className="flex flex-col gap-4">
 <h3 className="text-xl font-medium text-white/90">Field Notes — Coming Soon</h3>
 <p className="text-xs text-white/40 normal-case font-medium">Operational updates, market intelligence, and supply chain insights from our Tamil Nadu pilot. Publishing begins Q3 2026.</p>
 </div>
 
 <div className="flex flex-col gap-6">
 <span className="text-[10px] font-medium normal-case text-white/40">Follow us on social media</span>
 <div className="flex gap-8">
 <a href="#" className="flex flex-col items-center gap-2 group">
 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
 <Twitter size={18} />
 </div>
 <span className="text-[9px] font-medium normal-case text-white/30 group-hover:text-white transition-colors">Twitter</span>
 </a>
 <a href="#" className="flex flex-col items-center gap-2 group">
 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
 <Facebook size={18} />
 </div>
 <span className="text-[9px] font-medium normal-case text-white/30 group-hover:text-white transition-colors">Facebook</span>
 </a>
 <a href="#" className="flex flex-col items-center gap-2 group">
 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
 <Instagram size={18} />
 </div>
 <span className="text-[9px] font-medium normal-case text-white/30 group-hover:text-white transition-colors">Instagram</span>
 </a>
 <a href="#" className="flex flex-col items-center gap-2 group">
 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
 <Youtube size={18} />
 </div>
 <span className="text-[9px] font-medium normal-case text-white/30 group-hover:text-white transition-colors">YouTube</span>
 </a>
 <a href="#" className="flex flex-col items-center gap-2 group">
 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
 <DiscordIcon size={18} />
 </div>
 <span className="text-[9px] font-medium normal-case text-white/30 group-hover:text-white transition-colors">Discord</span>
 </a>
 </div>
 </div>
 </div>

 {/* Middle: Links Columns */}
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
 <div className="flex flex-col gap-6">
 <h4 className="text-[11px] font-medium normal-case text-white/90">About</h4>
 <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
 <a href="#" className="hover:text-white transition-colors">About Digital Orchard</a>
 <a href="#" className="hover:text-white transition-colors">Careers</a>
 <a href="#" className="hover:text-white transition-colors">Farmer Company</a>
 <a href="#" className="hover:text-white transition-colors">Impact & Sustainability</a>
 <a href="#" className="hover:text-white transition-colors">Press & Media</a>
 <a href="#" className="hover:text-white transition-colors">Contact Us</a>
 </div>
 </div>

 <div className="flex flex-col gap-6">
 <h4 className="text-[11px] font-medium normal-case text-white/90">Products</h4>
 <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
 <a href="#" className="hover:text-white transition-colors">Direct Trade Marketplace</a>
 <a href="#" className="hover:text-white transition-colors">Price Intelligence</a>
 <a href="#" className="hover:text-white transition-colors">AI Crop Forecasts</a>
 <a href="#" className="hover:text-white transition-colors">Farmer ID Portfolio</a>
 <a href="#" className="hover:text-white transition-colors">Logistics & Route OS</a>
 <a href="#" className="hover:text-white transition-colors">Supply Chain APIs</a>
 <a href="#" className="hover:text-white transition-colors">OS for FMCG & Retail (Coming Soon)</a>
 </div>
 </div>

 <div className="flex flex-col gap-6">
 <h4 className="text-[11px] font-medium normal-case text-white/90">Values</h4>
 <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
 <a href="#" className="hover:text-white transition-colors">Environment</a>
 <a href="#" className="hover:text-white transition-colors">Accessibility</a>
 <a href="#" className="hover:text-white transition-colors">Online safety</a>
 <a href="#" className="hover:text-white transition-colors">Diversity, equity & inclusion</a>
 </div>
 </div>

 <div className="flex flex-col gap-6">
 <h4 className="text-[11px] font-medium normal-case text-white/90">Support</h4>
 <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
 <a href="#" className="hover:text-white transition-colors">Support Hub</a>
 <a href="#" className="hover:text-white transition-colors">Farmer Safety</a>
 <a href="#" className="hover:text-white transition-colors">System Status</a>
 <a href="#" className="hover:text-white transition-colors">Onboarding Guide</a>
 <a href="#" className="hover:text-white transition-colors">Knowledge Base</a>
 <a href="#" className="hover:text-white transition-colors">Submit a Ticket</a>
 </div>
 </div>

 <div className="flex flex-col gap-6">
 <h4 className="text-[11px] font-medium normal-case text-white/90">Resources</h4>
 <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
 <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
 <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
 <a href="#" className="hover:text-white transition-colors">Farmer Manuals</a>
 <a href="#" className="hover:text-white transition-colors">Developer Portal</a>
 <a href="#" className="hover:text-white transition-colors">API Documentation</a>
 <a href="#" className="hover:text-white transition-colors">Marketplace Rules</a>
 </div>
 </div>
 </div>

 {/* Bottom: Legal and Copyright */}
 <div className="border-t border-white/5 pt-12 flex flex-col gap-10">
 <p className="text-[10px] text-white/30 leading-relaxed max-w-4xl normal-case ">
 Digital Orchard requires an active internet connection for real-time market data synchronization. Professional subscription features for large-scale operations may be subject to additional service fees. Access to the global marketplace is subject to local agricultural regulations and data integrity protocols.
 <br /><br />
 *Real-time updates require network access. Hardware sensors sold separately.
 </p>

 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
 <div className="flex flex-col gap-6">
 <div className="logo text-white/20 font-medium text-2xl tracking-tight normal-case flex items-center gap-1 opacity-50">
 <span className="bg-white/10 text-transparent px-1.5 leading-none py-0.5 bg-clip-text">FARMER</span>
 <span className="text-white/10">COMPANY</span>
 </div>
 <p className="text-[10px] text-white/20 normal-case font-medium">
 © 2026 Farmer Company / Digital Orchard Protocols
 </p>
 <p className="text-[10px] text-white/15 leading-relaxed max-w-2xl font-medium">
 All platform content, market data, and architectural schemas are trademarks or copyright material of Farmer Company. All rights reserved. <a href="#" className="underline hover:text-white transition-colors">Network Status</a>
 </p>
 </div>

 <div className="flex flex-col gap-6 items-start lg:items-end">
 <div className="flex items-center gap-2 text-white/80 text-[11px] font-medium normal-case hover:text-white transition-colors cursor-pointer">
 <Globe size={16} className="text-primary" />
 <span>India</span>
 </div>
 
 <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-medium normal-case text-white/40">
 <a href="#" className="hover:text-white transition-colors">Legal</a>
 <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
 <a href="#" className="hover:text-white transition-colors">Website terms of use</a>
 <a href="#" className="hover:text-white transition-colors">Site Map</a>
 <a href="#" className="hover:text-white transition-colors">Cookies Policy</a>
 <a href="#" className="hover:text-white transition-colors">Software Usage Terms</a>
 </div>
 </div>
 </div>
 </div>
 </div>
 </footer>
 );
};
