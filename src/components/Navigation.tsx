import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, User, Code, Mail, Image } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Me', icon: User },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'contact', label: 'Contact', icon: Mail },
];

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="cyber-border bg-card/80 backdrop-blur-md rounded-full px-6 py-3"
        >
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "neon" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                  className="rounded-full"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </motion.div>
      </nav>

      {/* Mobile Navigation Toggle */}
      <Button
        variant="neon"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-80 z-40 md:hidden"
      >
        <div className="h-full bg-card/95 backdrop-blur-md cyber-border border-l">
          <div className="p-6 pt-20">
            <div className="space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "neon" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsOpen(false);
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                );
              })}
            </div>

            {/* Mobile XP Bar */}
            <div className="mt-8 p-4 cyber-border rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Skill Level</div>
              <div className="xp-bar mb-2"></div>
              <div className="text-xs text-primary font-mono">Level 42 • Frontend Wizard</div>
            </div>

            {/* Mobile Terminal Status */}
            <div className="mt-4 terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-destructive"></div>
                <div className="terminal-dot bg-neon-orange"></div>
                <div className="terminal-dot bg-neon-green"></div>
              </div>
              <div className="font-mono text-xs">
                <div className="text-neon-green">$ status --online</div>
                <div className="text-muted-foreground">Ready to collaborate!</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
};