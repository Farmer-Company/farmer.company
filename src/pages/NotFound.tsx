import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, AlertCircle } from 'lucide-react';

export const NotFound = () => {
 const navigate = useNavigate();

 return (
 <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 noise-bg relative overflow-hidden">
 <div className="absolute inset-0 os-grid opacity-10 pointer-events-none" />
 <div className="scanline" />
 
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="relative z-10 flex flex-col items-center text-center max-w-xl"
 >
 <div className="w-20 h-20 border border-red-500/20 text-red-500 flex items-center justify-center mb-8 relative">
 <AlertCircle size={40} />
 <div className="absolute inset-0 border border-red-500/40 animate-ping opacity-20" />
 </div>

 <h1 className="display text-7xl md:text-9xl font-light text-white normal-case tracking-tight leading-none mb-6">
 ERR<br />
 <span className="text-red-500">404</span>
 </h1>
 
 <div className="space-y-4 mb-12">
 <p className="mono text-xs text-red-500 font-medium normal-case ">Resource node not found</p>
 <p className="text-white/40 text-lg font-light leading-relaxed">
 The path you are attempting to access is either deprecated or does not exist within the Digital Orchard network.
 </p>
 </div>

 <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
 <Button 
 className="h-14 px-8 normal-case font-medium bg-white text-black hover:bg-white/90"
 onClick={() => navigate('/')}
 >
 <Home className="mr-2" size={18} />
 Return Home
 </Button>
 <Button 
 variant="secondary"
 className="h-14 px-8 normal-case font-medium border-white/10 text-white hover:border-primary"
 onClick={() => navigate(-1)}
 >
 Go Back
 </Button>
 </div>
 </motion.div>

 {/* Background Meta */}
 <div className="absolute bottom-12 left-12 hidden lg:block">
 <p className="mono text-[10px] text-white/10 normal-case leading-loose">
 PROTOCOL_ERR_NODE_MISSING<br />
 TIMESTAMP: {new Date().toISOString()}<br />
 D_ORCHARD_OS_v0.1
 </p>
 </div>
 </div>
 );
};
