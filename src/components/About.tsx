import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Coffee, Gamepad2, Sparkles, Code2, Palette } from 'lucide-react';

const skills = [
  'React', 'TypeScript', 'Next.js', 'Three.js', 'Framer Motion',
  'Tailwind CSS', 'Node.js', 'Python', 'Figma', 'Blender'
];

const interests = [
  { icon: Gamepad2, label: 'Gaming', color: 'text-neon-green' },
  { icon: Code2, label: 'Coding', color: 'text-primary' },
  { icon: Palette, label: 'Digital Art', color: 'text-accent' },
  { icon: Sparkles, label: 'VTubing', color: 'text-secondary' },
  { icon: Coffee, label: 'Caffeine', color: 'text-neon-orange' },
  { icon: Heart, label: 'Anime', color: 'text-destructive' },
];

export const About = () => {
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
            Bridging the gap between kawaii culture and cutting-edge technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Avatar & Bio */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="cyber-border p-8">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-holographic rounded-full flex items-center justify-center mb-4 animate-float">
                  <Sparkles className="w-16 h-16 text-background" />
                </div>
                <h3 className="text-2xl font-bold text-gradient-primary mb-2">Luna.exe</h3>
                <p className="text-muted-foreground font-mono">Level 42 Frontend Wizard</p>
              </div>

              <div className="space-y-4 text-center">
                <p className="text-foreground/90">
                  Hey there! I'm Luna, a passionate frontend developer with a love for creating 
                  immersive digital experiences. When I'm not coding, you'll find me streaming, 
                  creating digital art, or diving into the latest gaming adventures.
                </p>
                
                <div className="terminal-window">
                  <div className="terminal-header">
                    <div className="terminal-dot bg-destructive"></div>
                    <div className="terminal-dot bg-neon-orange"></div>
                    <div className="terminal-dot bg-neon-green"></div>
                  </div>
                  <div className="font-mono text-sm">
                    <div className="text-neon-green">$ luna.getStats()</div>
                    <div className="text-muted-foreground">→ Experience: 3+ years</div>
                    <div className="text-muted-foreground">→ Projects completed: 50+</div>
                    <div className="text-muted-foreground">→ Coffee consumed: ∞</div>
                    <div className="text-primary">→ Currently: Available for work!</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Skills & Interests */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Skills */}
            <Card className="cyber-border p-6">
              <h4 className="text-xl font-semibold mb-4 text-gradient-secondary flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="outline" className="neon-glow hover:bg-primary/20">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Interests */}
            <Card className="cyber-border p-6">
              <h4 className="text-xl font-semibold mb-4 text-gradient-accent flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Interests
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => {
                  const Icon = interest.icon;
                  return (
                    <motion.div
                      key={interest.label}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <Icon className={`w-5 h-5 ${interest.color}`} />
                      <span className="font-medium">{interest.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* XP Progress */}
            <Card className="cyber-border p-6">
              <h4 className="text-xl font-semibold mb-4 text-gradient-primary">Experience Points</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Frontend Development</span>
                    <span className="text-sm text-primary">85%</span>
                  </div>
                  <div className="xp-bar"></div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">3D Graphics</span>
                    <span className="text-sm text-secondary">70%</span>
                  </div>
                  <div className="xp-bar" style={{ '--progress': '70%' } as any}></div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">UI/UX Design</span>
                    <span className="text-sm text-accent">90%</span>
                  </div>
                  <div className="xp-bar" style={{ '--progress': '90%' } as any}></div>
                </div>
              </div>
            </Card>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button variant="gaming" size="lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Let's Collaborate!
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};