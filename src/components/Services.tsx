import { motion } from 'framer-motion';
import { Code, Palette, Smartphone, Zap, Globe, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies and best practices.",
    features: ["React & Next.js", "TypeScript", "Responsive Design", "Performance Optimization"],
    price: "From $2,500",
    popular: false
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform mobile apps that work seamlessly on iOS and Android devices.",
    features: ["React Native", "Flutter", "Native iOS/Android", "App Store Deployment"],
    price: "From $4,000",
    popular: true
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, user-centered designs that convert visitors into customers.",
    features: ["Figma Design", "Prototyping", "User Research", "Design Systems"],
    price: "From $1,500",
    popular: false
  },
  {
    icon: Globe,
    title: "E-commerce Solutions",
    description: "Complete online stores with payment integration and inventory management.",
    features: ["Shopify", "WooCommerce", "Payment Gateways", "Inventory Systems"],
    price: "From $3,500",
    popular: false
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your existing website and improve search engine rankings.",
    features: ["Core Web Vitals", "SEO Optimization", "Caching Strategies", "CDN Setup"],
    price: "From $800",
    popular: false
  },
  {
    icon: Headphones,
    title: "Consultation & Support",
    description: "Technical guidance and ongoing support for your digital projects.",
    features: ["Technical Advisory", "Code Reviews", "Team Training", "24/7 Support"],
    price: "From $150/hr",
    popular: false
  }
];

export const Services = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-cyber bg-clip-text text-transparent mb-4">
            Services & Solutions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Turning your digital dreams into reality with cutting-edge technology ✨
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-holographic px-3 py-1 text-xs font-bold text-background rounded-full">
                      ⭐ POPULAR
                    </span>
                  </div>
                )}
                
                <Card className="h-full p-6 cyber-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 group">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-accent mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="text-center mb-4">
                      <span className="text-2xl font-bold text-primary">{service.price}</span>
                    </div>
                    
                    <Button 
                      variant={service.popular ? "neon" : "cyber"}
                      className="w-full"
                    >
                      Get Started 🚀
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-primary/10 border-primary/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need Something Custom? 🎯
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every project is unique. Let's discuss your specific needs and create a tailored solution that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="holographic" size="lg">
                Schedule Free Consultation
              </Button>
              <Button variant="outline" size="lg">
                View Portfolio
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};