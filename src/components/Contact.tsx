import { motion } from 'framer-motion';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  Send,
  Zap,
} from 'lucide-react';
import AnimatedCatIcon from './AnimatedCatIcon';

const socialLinks = [
  { icon: Github, label: "GitHub", handle: "@heyjas", color: "text-foreground" },
  { icon: Linkedin, label: "LinkedIn", handle: "yasmine-harfouche", color: "text-blue-400" },
  { icon: Mail, label: "Email", handle: "yasmineharfouche0@gmail.com", color: "text-pink-400" },
  { icon: MessageCircle, label: "Discord", handle: "_0jas0_", color: "text-indigo-400" },
];

export const Contact = () => {
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
            <span className="text-gradient-holographic">Let's Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to build something amazing together? Drop me a message or find me on social!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="cyber-border p-8">
              <div className="terminal-header mb-6">
                <div className="terminal-dot bg-destructive"></div>
                <div className="terminal-dot bg-neon-orange"></div>
                <div className="terminal-dot bg-neon-green"></div>
                <span className="ml-3 font-mono text-sm text-muted-foreground">contact_terminal.exe</span>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-primary">Name</label>
                    <Input
                      placeholder="Your name"
                      className="cyber-border bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-primary">Email</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="cyber-border bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-primary">Subject</label>
                  <Input
                    placeholder="Let's collaborate!"
                    className="cyber-border bg-background/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-primary">Message</label>
                  <Textarea
                    placeholder="Tell me about your project ideas..."
                    rows={6}
                    className="cyber-border bg-background/50 resize-none"
                  />
                </div>

                <Button variant="neon" size="lg" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-neon-green" />
                  Usually responds within 24 hours
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >


            {/* Social Links */}
            <Card className="cyber-border p-6">
              <h3 className="text-xl font-semibold mb-4 text-gradient-secondary">
                Find Me Online
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.div
                      key={social.label}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 p-4 h-auto hover:neon-glow"
                      >
                        <Icon className={`w-5 h-5 ${social.color}`} />
                        <div className="text-left">
                          <div className="font-medium text-sm">{social.label}</div>
                          <div className="text-xs text-muted-foreground">{social.handle}</div>
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Status Card */}
            <Card className="cyber-border p-6">
              <h3 className="text-xl font-semibold mb-4 text-gradient-accent">Current Status</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse-neon"></div>
                  <span className="font-medium">Available for new projects</span>
                </div>
                <div className="terminal-window">
                  <div className="font-mono text-sm">
                    <div className="text-neon-green">$ luna.status()</div>
                    <div className="text-muted-foreground">→ Currently: Building cool stuff</div>
                    <div className="text-muted-foreground">→ Location: Digital realm</div>
                    <div className="text-muted-foreground">→ Timezone: UTC+1</div>
                    <div className="text-primary">→ Let's create magic together! ✨</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="cyber-border bg-card/50 backdrop-blur-sm p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gradient-cyber">
              Ready to start your project?
            </h3>
            <p className="text-muted-foreground mb-6">
              Whether it's a stunning website, an interactive 3D experience, or a complete digital transformation,
              I'm here to bring your vision to life with cutting-edge technology and kawaii aesthetics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="holographic" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Start a Conversation
              </Button>
              <Button variant="gaming" size="lg">
                <Zap className="w-5 h-5 mr-2" />
                View My Work
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
      <AnimatedCatIcon />
    </section>
  );
};