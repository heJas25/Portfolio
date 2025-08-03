import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Innovation",
    location: "Remote",
    period: "2023 - Present",
    description: "Leading frontend development for cutting-edge web applications using React, TypeScript, and modern frameworks.",
    achievements: [
      "Increased user engagement by 40% through UI/UX improvements",
      "Mentored 5 junior developers",
      "Implemented design system used across 10+ projects"
    ],
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
  },
  {
    title: "Full Stack Developer",
    company: "StartupHub",
    location: "San Francisco, CA",
    period: "2021 - 2023",
    description: "Developed and maintained full-stack applications for various startups in the tech ecosystem.",
    achievements: [
      "Built 3 MVPs from concept to deployment",
      "Reduced loading times by 60%",
      "Implemented CI/CD pipelines"
    ],
    tech: ["Vue.js", "Node.js", "PostgreSQL", "AWS"]
  },
  {
    title: "Frontend Developer",
    company: "DigitalFlow Agency",
    location: "New York, NY",
    period: "2020 - 2021",
    description: "Created responsive websites and web applications for clients in various industries.",
    achievements: [
      "Delivered 15+ client projects on time",
      "Improved SEO rankings by 50% average",
      "Established company's design system"
    ],
    tech: ["JavaScript", "SCSS", "WordPress", "Figma"]
  }
];

export const Experience = () => {
  return (
    <section className="py-20 px-6 relative mt-[-2rem] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-noise opacity-20" />
      <h2 className="text-4xl text-center md:text-5xl font-bold mb-6">
        <span className="text-gradient-cyber">Experience Journey</span>
      </h2>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-holographic bg-clip-text text-transparent mb-4">
            Experience Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional adventure through the tech universe 
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary opacity-50" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background neon-glow z-10" />

                <Card className="ml-20 p-6 cyber-border bg-card/80 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-accent">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">▶</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-holographic text-background font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Download Full Resume 📄
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};