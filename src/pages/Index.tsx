import { useState } from 'react';
import { ParticleField } from '@/components/ParticleField';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Services } from '@/components/Services';
import { Projects } from '@/components/Projects';
import { TypingGame } from '@/components/TypingGame';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticleField />
    

      <Navigation 
        activeSection={activeSection} 
        onSectionChange={scrollToSection} 
      />
      
      {/* Sections */}
      <div id="home" className="mt-28">
        <Hero onExplore={() => scrollToSection('about')} />
      </div>
      
      <div id="about">
        <About />
      </div>
      
      <div id="experience">
        <Experience />
      </div>
      
      {/* <div id="services">
        <Services />
      </div>
       */}
      <div id="projects">
        <Projects />
      </div>
      
      <div id="game">
        <TypingGame />
      </div>
      
    
      
      <div id="gallery">
        <Gallery />
      </div>
      
      <div id="contact">
        <Contact />
      </div> 
    </div>
  );
};

export default Index;
