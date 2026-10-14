import React, { useState } from 'react'
import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button"
import { Shield, Sparkles, CheckCircle2, AlertTriangle, Coins, Award, } from 'lucide-react'

export const DemoPage = () => {
  const [clickCount, setClickCount] = useState(0)
  const [lastClicked, setLastClicked] = useState<string>('None')
  
  // Customizer state
  const [customText, setCustomText] = useState('Interactive CTA')
  const [customType, setCustomType] = useState<'liquid' | 'metal'>('metal')
  const [metalVariant, setMetalVariant] = useState<'default' | 'primary' | 'success' | 'error' | 'gold' | 'bronze'>('gold')
  const [liquidSize, setLiquidSize] = useState<'sm' | 'default' | 'lg' | 'xl' | 'xxl'>('default')

  const handleButtonClick = (name: string) => {
    setClickCount(prev => prev + 1)
    setLastClicked(name)
  }

  return (
    <div className="min-h-screen bg-[#070b0a] text-white pt-24 pb-16 noise-bg relative overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none z-0 opacity-20 blur-[120px] demo-bg-glow-1" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] pointer-events-none z-0 opacity-15 blur-[150px] demo-bg-glow-2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4ADE80] font-mono">
            Ecosystem Components Showcase
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase mt-2 mb-4">
            Glass & Metal UI Components
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            High-fidelity buttons implemented using modern Tailwind CSS styles, SVG displacement filter maps, and 3D metallic gradients.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
            <h3 className="font-bold text-base mb-2 text-[#4ADE80]">Liquid Glass Effect</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Uses an SVG <code className="text-white font-mono text-xs">feTurbulence</code> and <code className="text-white font-mono text-xs">feDisplacementMap</code> filter to refract background pixels under the button, creating a frosted, organic glass look.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
            <h3 className="font-bold text-base mb-2 text-yellow-400">3D Metal Gradients</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Uses layered outer, inner, and core gradients to mimic real-world embossed metals. Implements micro-translations on click for physical responsiveness.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
            <h3 className="font-bold text-base mb-2 text-sky-400">Interaction Tracker</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Total Clicks: <span className="text-white font-bold font-mono">{clickCount}</span><br />
              Last Clicked: <span className="text-white font-bold font-mono">{lastClicked}</span>
            </p>
          </div>
        </div>

        {/* Section 1: Liquid Glass Buttons */}
        <div className="bg-[#0c0f0e] border border-white/10 rounded-xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none z-0 opacity-5 blur-[80px] bg-[#4ADE80]" />
          
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 flex items-center gap-2">
            <Sparkles size={20} className="text-[#4ADE80]" /> Liquid Glass Button
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Frosted glass button with a custom dynamic distortion filter. Best utilized on visual backgrounds.
          </p>

          <div className="relative p-12 rounded-lg bg-cover bg-center border border-white/5 flex flex-col md:flex-row items-center justify-around gap-8 min-h-[220px] demo-unsplash-bg">
            {/* Visual Glass Overlay to make contrast look premium */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

            <div className="z-10 text-center md:text-left">
              <h3 className="text-white font-bold text-lg">Frosted Glass Contrast</h3>
              <p className="text-xs text-white/60 max-w-xs mt-1">
                Notice how the turbulent SVG filter bends the colors of the Unsplash abstract background underneath.
              </p>
            </div>

            <div className="z-10 flex flex-col items-center gap-4">
              <LiquidButton 
                onClick={() => handleButtonClick('Liquid Glass Default')}
                size="xxl"
                className="text-white"
              >
                Liquid Glass
              </LiquidButton>
            </div>
          </div>
        </div>

        {/* Section 2: Metal Buttons Grid */}
        <div className="bg-[#0c0f0e] border border-white/10 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 flex items-center gap-2">
            <Coins size={20} className="text-yellow-400" /> Embossed Metal Buttons
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Embossed metal button plates with inner shadows, outer bevel highlights, and dynamic 3D translation states.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Silver / Default */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-lg flex flex-col items-center justify-between min-h-[160px]">
              <span className="text-xs uppercase tracking-wider text-white/50 mb-4 font-mono">Default (Silver)</span>
              <MetalButton 
                variant="default"
                onClick={() => handleButtonClick('Metal Silver')}
              >
                Silver Plate
              </MetalButton>
            </div>

            {/* Blue / Primary */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-lg flex flex-col items-center justify-between min-h-[160px]">
              <span className="text-xs uppercase tracking-wider text-white/50 mb-4 font-mono">Primary (Steel Blue)</span>
              <MetalButton 
                variant="primary"
                onClick={() => handleButtonClick('Metal Primary')}
              >
                <Shield size={16} className="mr-1.5 inline" /> Steel Blue
              </MetalButton>
            </div>

            {/* Green / Success */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-lg flex flex-col items-center justify-between min-h-[160px]">
              <span className="text-xs uppercase tracking-wider text-white/50 mb-4 font-mono">Success (Jade)</span>
              <MetalButton 
                variant="success"
                onClick={() => handleButtonClick('Metal Success')}
              >
                <CheckCircle2 size={16} className="mr-1.5 inline" /> Jade Success
              </MetalButton>
            </div>

            {/* Red / Error */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-lg flex flex-col items-center justify-between min-h-[160px]">
              <span className="text-xs uppercase tracking-wider text-white/50 mb-4 font-mono">Error (Ruby)</span>
              <MetalButton 
                variant="error"
                onClick={() => handleButtonClick('Metal Error')}
              >
                <AlertTriangle size={16} className="mr-1.5 inline" /> Ruby Danger
              </MetalButton>
            </div>

            {/* Gold */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-lg flex flex-col items-center justify-between min-h-[160px]">
              <span className="text-xs uppercase tracking-wider text-white/50 mb-4 font-mono">Gold (Aurum)</span>
              <MetalButton 
                variant="gold"
                onClick={() => handleButtonClick('Metal Gold')}
              >
                <Award size={16} className="mr-1.5 inline" /> Gold Medal
              </MetalButton>
            </div>

            {/* Bronze */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-lg flex flex-col items-center justify-between min-h-[160px]">
              <span className="text-xs uppercase tracking-wider text-white/50 mb-4 font-mono">Bronze (Cuprum)</span>
              <MetalButton 
                variant="bronze"
                onClick={() => handleButtonClick('Metal Bronze')}
              >
                Bronze Plated
              </MetalButton>
            </div>
          </div>
        </div>

        {/* Section 3: Interactive Customizer Playground */}
        <div className="bg-[#0c0f0e] border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">
            Button Playground
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Customize parameters live and verify behavior, hover states, and responsive styling.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Control Panel */}
            <div className="space-y-6 bg-black/40 border border-white/5 p-6 rounded-lg">
              <div>
                <label htmlFor="custom-text-input" className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-mono">
                  Button Text Label
                </label>
                <input 
                  id="custom-text-input"
                  type="text" 
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-[#4ADE80]"
                  maxLength={30}
                  placeholder="Enter button text"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-mono">
                  Button Category
                </label>
                <div className="flex bg-[#050505] p-1 rounded border border-white/10">
                  <button
                    onClick={() => setCustomType('metal')}
                    className={`flex-1 py-1.5 text-xs font-bold uppercase rounded transition-all ${
                      customType === 'metal' ? 'bg-[#4ADE80] text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Metal Button
                  </button>
                  <button
                    onClick={() => setCustomType('liquid')}
                    className={`flex-1 py-1.5 text-xs font-bold uppercase rounded transition-all ${
                      customType === 'liquid' ? 'bg-[#4ADE80] text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Liquid Glass
                  </button>
                </div>
              </div>

              {customType === 'metal' ? (
                <div>
                  <label htmlFor="metal-variant-select" className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-mono">
                    Metal Color Variant
                  </label>
                  <select 
                    id="metal-variant-select"
                    title="Metal Color Variant"
                    value={metalVariant}
                    onChange={(e: any) => setMetalVariant(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-[#4ADE80]"
                  >
                    <option value="default">Default (Silver)</option>
                    <option value="primary">Primary (Steel Blue)</option>
                    <option value="success">Success (Jade)</option>
                    <option value="error">Error (Ruby)</option>
                    <option value="gold">Gold</option>
                    <option value="bronze">Bronze</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-mono">
                    Liquid Button Size
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {(['sm', 'default', 'lg', 'xl', 'xxl'] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setLiquidSize(sz)}
                        className={`py-1.5 px-1 text-[10px] font-bold uppercase rounded border transition-all ${
                          liquidSize === sz 
                            ? 'border-[#4ADE80] bg-[#4ADE80]/10 text-[#4ADE80]' 
                            : 'border-white/10 hover:border-white/30 text-white/60'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Live Preview Pane */}
            <div className={`bg-[#050505] border border-white/10 rounded-lg p-6 flex flex-col justify-between items-center min-h-[250px] relative overflow-hidden bg-cover bg-center ${
              customType === 'liquid' ? 'demo-unsplash-bg' : ''
            }`}>
              {customType === 'liquid' && <div className="absolute inset-0 bg-black/75 pointer-events-none" />}
              
              <div className="text-xs uppercase tracking-wider text-white/30 font-mono z-10">
                Live Preview
              </div>

              <div className="z-10 py-6">
                {customType === 'metal' ? (
                  <MetalButton 
                    variant={metalVariant}
                    onClick={() => handleButtonClick(`Playground Metal (${metalVariant})`)}
                  >
                    {customText}
                  </MetalButton>
                ) : (
                  <LiquidButton 
                    size={liquidSize}
                    onClick={() => handleButtonClick(`Playground Liquid (${liquidSize})`)}
                    className="text-white"
                  >
                    {customText}
                  </LiquidButton>
                )}
              </div>

              <div className="text-[10px] text-white/40 font-mono z-10">
                Interactive: Click to press and trigger callbacks
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
