import { useState } from 'react';
import { ParticleField } from '@/components/ParticleField';
import { Scene3D } from '@/components/Scene3D';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
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
      {/* Background Effects */}
      <ParticleField />
      <Scene3D />
      
      {/* Navigation */}
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={scrollToSection} 
      />
      
      {/* Sections */}
      <div id="home">
        <Hero onExplore={() => scrollToSection('about')} />
      </div>
      
      <div id="about">
        <About />
      </div>
      
      <div id="projects">
        <Projects />
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
