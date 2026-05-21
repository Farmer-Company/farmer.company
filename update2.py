import re

with open('src/components/Home/SocialProofSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Sprout import
content = re.sub(r'  Globe\r?\n\} from \'lucide-react\';', '  Globe,\n  Sprout\n} from \'lucide-react\';', content)

new_block = '''
  {/* AgriOS Intelligence Layer */}
  <div className="w-full max-w-[1400px] mx-auto mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#050505] border border-primary/20 p-8 md:p-16 relative overflow-hidden group">
    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    <div className="space-y-8 text-left relative z-10">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 text-primary rounded-sm"><Sprout size={24} /></div>
        <span className="mono text-[10px] text-primary font-medium normal-case">NEW MODULE</span>
      </div>
      <h2 className="text-[34px] md:text-[40px] font-semibold text-white tracking-[-0.02em] leading-[1.1]">
        AgriOS Intelligence.<br />
        Grow clean, earn more.
      </h2>
      <div className="space-y-4 text-foreground-muted text-[17px] font-normal leading-[1.47]">
        <p>We're integrating AI for Low-Pesticide Agriculture to create the ultimate Farm Intelligence Score.</p>
        <ul className="space-y-4 mt-4">
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">✓</span>
            <div>
              <strong className="text-white block">Pest & Weed Detection Engine</strong>
              <span className="text-sm">Identify threats via smartphone camera; deploy spot treatments instead of blanket sprays.</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">✓</span>
            <div>
              <strong className="text-white block">Input Optimization Dashboard</strong>
              <span className="text-sm">Benchmark fertilizer/pesticide use to qualify for premium vendor pricing.</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">✓</span>
            <div>
              <strong className="text-white block">Surplus-to-Biocontrol Loop</strong>
              <span className="text-sm">Routing unsold organic matter to biocontrol and composting centers.</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="pt-4 border-t border-white/10">
        <p className="text-[14px] text-white/80 font-medium">Earn 15-25% premium for certified clean crops.</p>
      </div>
    </div>
    <div className="relative h-full min-h-[300px] md:min-h-[500px] bg-[#021f0d] flex items-center justify-center border border-white/5 rounded-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
      <div className="w-[200px] h-[200px] rounded-full bg-primary/10 blur-[60px]" />
      <p className="text-white/40 mono text-sm px-8 text-center relative z-10">[AI Computer Vision Target — Live Crop Feed]</p>
    </div>
  </div>
'''

content = content.replace('{/* Built From The Field */}', new_block + '\n  {/* Built From The Field */}')

with open('src/components/Home/SocialProofSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
