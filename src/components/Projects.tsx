import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Play, Zap } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "CyberChat 3D",
    description: "Real-time 3D chat application with VTuber avatars and spatial audio. Built with Three.js and WebRTC.",
    image: "🌐",
    technologies: ["React", "Three.js", "WebRTC", "Socket.io"],
    status: "Live",
    color: "primary"
  },
  {
    id: 2,
    title: "Neon Dashboard",
    description: "Cyberpunk-themed admin dashboard with real-time analytics and holographic data visualization.",
    image: "📊",
    technologies: ["Next.js", "D3.js", "Framer Motion", "TypeScript"],
    status: "In Progress",
    color: "secondary"
  },
  {
    id: 3,
    title: "Kawaii Marketplace",
    description: "E-commerce platform for digital art and VTuber assets with blockchain integration.",
    image: "🛍️",
    technologies: ["React", "Solidity", "Web3.js", "IPFS"],
    status: "Coming Soon",
    color: "accent"
  },
  {
    id: 4,
    title: "Stream Overlay Engine",
    description: "Customizable streaming overlays with interactive elements and real-time chat integration.",
    image: "🎮",
    technologies: ["Vue.js", "Canvas API", "OBS WebSocket", "CSS3"],
    status: "Live",
    color: "primary"
  }
];

const statusConfig = {
  "Live": { variant: "default" as const, icon: Play },
  "In Progress": { variant: "secondary" as const, icon: Zap },
  "Coming Soon": { variant: "outline" as const, icon: ExternalLink }
};

export const Projects = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-holographic">My Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Digital realms I've crafted with passion and pixel-perfect precision
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const StatusIcon = statusConfig[project.status as keyof typeof statusConfig].icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="cyber-border h-full p-6 hover:neon-glow transition-all duration-300 group-hover:scale-105">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl mb-4">{project.image}</div>
                    <Badge 
                      variant={statusConfig[project.status as keyof typeof statusConfig].variant}
                      className="flex items-center gap-1"
                    >
                      <StatusIcon className="w-3 h-3" />
                      {project.status}
                    </Badge>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gradient-primary group-hover:text-gradient-holographic transition-all">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Project Actions */}
                    <div className="flex gap-3 pt-4">
                      <Button variant="neon" size="sm" className="flex-1">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button variant="cyber" size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo(´｡• ᵕ •｡`) ♡
                      </Button>
                    </div>
                  </div>

                  {/* Holographic effect overlay */}
                  <div className="absolute inset-0 bg-gradient-holographic opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg pointer-events-none" />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="cyber-border bg-card/50 backdrop-blur-sm p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gradient-cyber">
              Want to see more?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out my GitHub for more projects and experiments, or let's collaborate on something amazing!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="holographic" size="lg">
                <Github className="w-5 h-5 mr-2" />
                View All Projects
              </Button>
              <Button variant="gaming" size="lg">
                <Zap className="w-5 h-5 mr-2" />
                Start a Project
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};