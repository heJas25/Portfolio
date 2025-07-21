import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Share, Sparkles } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    type: "artwork",
    title: "Cyber Sunset",
    description: "Digital painting of a neon-lit cityscape",
    emoji: "🌆",
    likes: 247,
    category: "Digital Art"
  },
  {
    id: 2,
    type: "screenshot",
    title: "Gaming Setup",
    description: "My RGB battlestation in all its glory",
    emoji: "⚡",
    likes: 189,
    category: "Setup"
  },
  {
    id: 3,
    type: "meme",
    title: "CSS Debugging",
    description: "When your div is 1px off center",
    emoji: "😅",
    likes: 356,
    category: "Memes"
  },
  {
    id: 4,
    type: "artwork",
    title: "VTuber Avatar",
    description: "Character design for streaming",
    emoji: "👾",
    likes: 412,
    category: "Character Design"
  },
  {
    id: 5,
    type: "code",
    title: "3D Animation",
    description: "CSS-only floating cube animation",
    emoji: "🎲",
    likes: 178,
    category: "Code Art"
  },
  {
    id: 6,
    type: "photo",
    title: "Coffee & Code",
    description: "Late night coding session vibes",
    emoji: "☕",
    likes: 234,
    category: "Lifestyle"
  }
];

const categories = ["All", "Digital Art", "Setup", "Memes", "Character Design", "Code Art", "Lifestyle"];

export const Gallery = () => {
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
            <span className="text-gradient-cyber">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of my digital creations, gaming moments, and kawaii inspirations
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "neon" : "ghost"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="cyber-border overflow-hidden hover:neon-glow transition-all duration-300 group-hover:scale-105">
                {/* Image Placeholder */}
                <div className="aspect-square bg-gradient-holographic flex items-center justify-center text-8xl relative overflow-hidden">
                  {item.emoji}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-destructive">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.likes}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-gradient-primary">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Heart className="w-4 h-4 mr-1" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="gaming" size="lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Load More Creations
          </Button>
        </motion.div>

        {/* Social Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="cyber-border p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gradient-primary mb-1">2.1K</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-secondary mb-1">156</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-accent mb-1">8.7K</div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-cyber mb-1">42</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};