import React from "react";
import BallCanvas from "../components/canvas/Ball";
import { SectionWrapper, technologies, Technology } from "../hoc";

const Tech: React.FC = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology: Technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");