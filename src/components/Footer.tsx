import React from 'react';
import { Twitter, Facebook, Instagram, Youtube, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-20 px-8 md:px-12 lg:px-24 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top: News and Social */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium text-white/90">Field Notes — Coming Soon</h3>
            <p className="text-xs text-white/40 normal-case font-medium">
              Operational updates, market intelligence, and supply chain insights from our Tamil
              Nadu pilot. Publishing begins Q3 2026.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-medium normal-case text-white/40">
              Follow us on social media
            </span>
            <div className="flex gap-8">
              <a href="#" className="flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
                  <Twitter size={18} />
                </div>
                <span className="text-[9px] font-medium normal-case text-white/30 group-hover:text-white transition-colors">
                  Twitter
                </span>
              </a>
              <a href="#" className="flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
                  <Facebook size={18} />
                </div>
                <span className="text-[9px] font-medium normal-case text-white/30 group-hover:text-white transition-colors">
                  Facebook
                </span>
              </a>
              <a href="#" className="flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
                  <Instagram size={18} />
                </div>
                <span className="text-[9px] font-medium normal-case text-white/30 group-hover:text-white transition-colors">
                  Instagram
                </span>
              </a>
              <a href="#" className="flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
                  <Youtube size={18} />
                </div>
                <span className="text-[9px] font-medium normal-case text-white/30 group-hover:text-white transition-colors">
                  YouTube
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Middle: Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-medium normal-case text-white/90">About</h4>
            <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
              <a href="#" className="hover:text-white transition-colors">
                About Digital Orchard
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Careers
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Farmer Company
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Impact & Sustainability
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Press & Media
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-medium normal-case text-white/90">Products</h4>
            <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
              <a href="#" className="hover:text-white transition-colors">
                Direct Marketplace
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Price Intelligence
              </a>
              <a href="#" className="hover:text-white transition-colors">
                AI Crop Forecasts
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Farmer ID Portfolio
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Logistics Network
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Agricultural APIs
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-medium normal-case text-white/90">Values</h4>
            <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
              <a href="#" className="hover:text-white transition-colors">
                Environment
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Online safety
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Diversity, equity & inclusion
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-medium normal-case text-white/90">Support</h4>
            <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
              <a href="#" className="hover:text-white transition-colors">
                Support Hub
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Farmer Safety
              </a>
              <a href="#" className="hover:text-white transition-colors">
                System Status
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Onboarding Guide
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Knowledge Base
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Submit a Ticket
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-medium normal-case text-white/90">Resources</h4>
            <div className="flex flex-col gap-3 text-[11px] font-medium text-white/40">
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Farmer Manuals
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Developer Portal
              </a>
              <a href="#" className="hover:text-white transition-colors">
                API Documentation
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Marketplace Rules
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Legal and Copyright */}
        <div className="border-t border-white/5 pt-12 flex flex-col gap-10">
          <p className="text-[10px] text-white/30 leading-relaxed max-w-4xl normal-case ">
            Digital Orchard requires an active internet connection for real-time market data
            synchronization. Professional subscription features for large-scale operations may be
            subject to additional service fees. Access to the global marketplace is subject to local
            agricultural regulations and data integrity protocols.
            <br />
            <br />
            *Real-time updates require network access. Hardware sensors sold separately.
          </p>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="flex flex-col gap-6">
              <div className="logo text-white/20 font-medium text-2xl tracking-tight normal-case flex items-center gap-1 opacity-50">
                <span className="bg-white/10 text-transparent px-1.5 leading-none py-0.5 bg-clip-text">
                  FARMER
                </span>
                <span className="text-white/10">COMPANY</span>
              </div>
              <p className="text-[10px] text-white/20 normal-case font-medium">
                © 2026 Farmer Company / Digital Orchard Protocols
              </p>
              <p className="text-[10px] text-white/15 leading-relaxed max-w-2xl font-medium">
                All platform content, market data, and architectural schemas are trademarks or
                copyright material of Farmer Company. All rights reserved.{' '}
                <a href="#" className="underline hover:text-white transition-colors">
                  Network Status
                </a>
              </p>
            </div>

            <div className="flex flex-col gap-6 items-start lg:items-end">
              <div className="flex items-center gap-2 text-white/80 text-[11px] font-medium normal-case hover:text-white transition-colors cursor-pointer">
                <Globe size={16} className="text-primary" />
                <span>India</span>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-medium normal-case text-white/40">
                <a href="#" className="hover:text-white transition-colors">
                  Legal
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Website terms of use
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Site Map
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookies Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Software Usage Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
