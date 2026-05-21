import re

with open('src/components/Home/SocialProofSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_row2 = '''  {/* Row 2 */}
  <div className="opacity-50 border-t border-dashed border-white/20 pt-8 relative">
  <p className="mono text-[10px] text-foreground-muted font-medium normal-case mb-6 px-4">BUILDING TOWARD — ROADMAP</p>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center md:text-left">
  <StatBox number="85%" label="Target Forecast Accuracy" sub="" />
  <StatBox number="Real-time" label="Verified Quote Integration" isMono sub="" />
  <StatBox number="Farmer SKU" label="Portfolio System" sub="" />
  <StatBox number="₹ Live" label="Price Feed Active" isPrimary sub="" />
  </div>
  <p className="text-[10px] text-foreground-muted mt-6 px-4 italic">*Roadmap metrics are targets, not current actuals.</p>
  </div>'''

new_row2 = '''  {/* Row 2 - Impact Tracker */}
  <div className="border-t border-dashed border-primary/20 pt-8 relative">
  <p className="mono text-[10px] text-primary font-medium normal-case mb-6 px-4">IMPACT TRACKER & SUSTAINABILITY</p>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center md:text-left">
  <StatBox number="500+" label="Pilot Farmers" sub="Tamil Nadu region" />
  <StatBox number="12,000kg" label="Waste Diverted" isMono sub="To biogas & composting" />
  <StatBox number="14.2t" label="CO₂ Saved" sub="Optimized logistics" />
  <StatBox number="0" label="Pesticide Markup" isPrimary sub="Direct sourcing" />
  </div>
  
  <div className="mt-12 flex flex-wrap gap-8 items-center justify-center md:justify-start opacity-60">
    <span className="text-[10px] mono text-white/50">DATA PARTNERS:</span>
    <span className="text-sm font-medium">Agmarknet</span>
    <span className="text-sm font-medium">TN Agmark</span>
    <span className="text-sm font-medium">Kisan FPOs</span>
  </div>
  </div>'''

content = content.replace(old_row2, new_row2)
content = content.replace(old_row2.replace('\n', '\r\n'), new_row2)

with open('src/components/Home/SocialProofSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
