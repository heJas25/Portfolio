import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TechPlanets from './TechPlanets';
import { Heart, Coffee, Gamepad2, Sparkles, Code2, Palette, Zap } from 'lucide-react';

const skills = [
  { name: 'React', level: 85, category: 'frontend' },
  { name: 'TypeScript', level: 55, category: 'language' },
  { name: 'Three.js', level: 72, category: 'graphics' },
  { name: 'Framer Motion', level: 65, category: 'animation' },
  { name: 'Tailwind CSS', level: 92, category: 'styling' },
  { name: 'Node.js', level: 60, category: 'backend' },
  { name: 'Python', level: 65, category: 'language' },
  { name: 'Figma', level: 88, category: 'design' },

];

const categoryColors = {
  frontend: 'border-primary/50 bg-primary/10 hover:bg-primary/20 hover:border-primary',
  language: 'border-secondary/50 bg-secondary/10 hover:bg-secondary/20 hover:border-secondary',
  graphics: 'border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent',
  animation: 'border-neon-green/50 bg-neon-green/10 hover:bg-neon-green/20 hover:border-neon-green',
  styling: 'border-neon-orange/50 bg-neon-orange/10 hover:bg-neon-orange/20 hover:border-neon-orange',
  backend: 'border-cyber-blue/50 bg-cyber-blue/10 hover:bg-cyber-blue/20 hover:border-cyber-blue',
  design: 'border-destructive/50 bg-destructive/10 hover:bg-destructive/20 hover:border-destructive'
};

const interests = [
  { icon: Gamepad2, label: 'Gaming', color: 'text-neon-green' },
  { icon: Code2, label: 'Coding', color: 'text-primary' },
  { icon: Palette, label: 'Digital Art', color: 'text-accent' },
  { icon: Sparkles, label: 'VTubing', color: 'text-secondary' },
  { icon: Coffee, label: 'Caffeine', color: 'text-neon-orange' },
  { icon: Heart, label: 'Anime', color: 'text-destructive' },
];


export const About = () => {
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-cyber">About Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging the gap between  culture and cutting-edge technology 
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-12 items-start">
         
          {/* Skills & Interests */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Enhanced Skills Section */}
            <Card className="cyber-border p-8 overflow-hidden relative">
              <motion.h2 
                className="text-xl font-semibold mb-6 text-gradient-secondary flex items-center gap-2"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Code2 className="w-5 h-5 text-2xl" />
                Tech Stack
                <motion.div
                  className="ml-auto text-xs bg-primary/20 px-2 py-1 rounded-sm"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-3 h-3 inline mr-1" />
                  {skills.length} skills
                </motion.div>
              </motion.h2 >
              
              <div ref={skillsRef} className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`relative p-3 rounded-lg border transition-all duration-300 cursor-pointer group ${categoryColors[skill.category as keyof typeof categoryColors]}`}>
                      {/* Holographic overlay effect */}
                      <div className="absolute inset-0 bg-gradient-holographic opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        <div className="font-medium text-md mb-1">{skill.name}</div>
                        
                        {/* Animated progress bar */}
                        <div className="w-full bg-muted/30 rounded-full h-1.5 mb-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ 
                              delay: index * 0.1 + 0.5,
                              duration: 1,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                        
                        <div className="text-xs text-muted-foreground capitalize">
                          {skill.category} • {skill.level}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
            </Card>

            {/* Tech Planets */}
            <Card className="cyber-border p-6 relative overflow-hidden">
              <motion.h4 
                className="text-xl font-semibold mb-4 text-gradient-secondary"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Tech Universe
              </motion.h4>
              <TechPlanets />
            </Card>
           

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="gaming" size="lg" className="relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-holographic opacity-0 group-hover:opacity-30"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <Sparkles className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Let's Collaborate!</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};