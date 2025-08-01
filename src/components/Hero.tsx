import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';
import vtuberAvatar from '@/assets/vtuber-avatar.png';

interface HeroProps {
  onExplore: () => void;
}

export const Hero = ({ onExplore }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1
          }}
          className="mb-8"
        >
          <img 
            src={vtuberAvatar} 
            alt=" Avatar" 
            className="w-48 h-48 mx-auto rounded-full neon-glow animate-float"
          />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="glitch-text text-gradient-holographic" data-text="Luna.exe">
              Yasmine.exe
            </span>
          </h1>
          
          <div className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ delay: 0.5, duration: 2 }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              &gt; Frontend Developer • App Devoloper • grafic designer _
            </motion.span>
          </div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Welcome to my digital dimension! I craft immersive web experiences 
            with a blend of kawaii aesthetics and cutting-edge technology. 
            Let's build something amazing together! ✨
          </motion.p>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              variant="holographic" 
              size="lg"
              onClick={onExplore}
              className="group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Explore My Universe
            </Button>
            
            <Button variant="cyber" size="lg">
              <Zap className="w-5 h-5 mr-2" />
              View Projects
            </Button>
          </motion.div>

          {/* Gaming UI Element */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 inline-block"
          >
            <div className="cyber-border bg-card/50 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Current Status</div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse-neon"></div>
                <span className="font-mono text-sm">Online • Available for collaboration</span>
              </div>
              <div className="mt-2">
                <div className="text-xs text-muted-foreground mb-1">Coding Level</div>
                <div className="xp-bar"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-0  left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-lg opacity-20"
      />
      
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-accent rounded-full opacity-30"
      />
    </section>
  );
};