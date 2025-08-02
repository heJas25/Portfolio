import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';
import { Card } from './ui/card';

interface HeroProps {
  onExplore: () => void;
}
const useTypingAnimation = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

export const Hero = ({ onExplore }: HeroProps) => {
  const { displayText } = useTypingAnimation(`> Frontend Developer • App Devoloper • grafic designer_`, 100);
  return (
    <section className="relative min-h-screen h-[140vh]  flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20" />


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
            src="pphoto.jpg"
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
              {displayText}
            </motion.span>
          </div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Web developer by trade, innovator by nature. I specialize in building clean, efficient, and dynamic web applications that don't just look good, but perform well. My passion lies in crafting seamless digital experiences and turning complex ideas into intuitive, user-friendly realities. Take a look at what I can do.
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



          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12  "
          >
            <div className=" text-center  ">

              <motion.div
                className="terminal-window"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="terminal-header">
                  <div className="terminal-dot bg-destructive"></div>
                  <div className="terminal-dot bg-neon-orange"></div>
                  <div className="terminal-dot bg-neon-green animate-pulse"></div>
                </div>
                <div className="font-mono text-sm space-y-1">
                  <motion.div
                    className="text-neon-green"
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "auto", opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    $ Yasmie.getStats()
                  </motion.div>
                  <motion.div
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    viewport={{ once: true }}
                  >
                    → Experience: 4+ years
                  </motion.div>
                  <motion.div
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    → Projects completed: 20+
                  </motion.div>
                  <motion.div
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    → Coffee consumed: ∞
                  </motion.div>

                </div>
              </motion.div>
            </div>
            {/* <div className="cyber-border mt-4 mb-11 bg-card/50 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Current Status</div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse-neon"></div>
                <span className="font-mono text-sm">Online • Available for collaboration</span>
              </div>
              <div className="mt-2">
                <div className="text-xs text-muted-foreground mb-1">Coding Level</div>
                <div className="xp-bar"></div>
              </div>

            </div> */}

          </motion.div>
        </motion.div>

        {/* // Arrow */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute   left-1/2 transform -translate-x-1/2"
        >

          <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
        </motion.div>

      </div>


    </section>
  );
};