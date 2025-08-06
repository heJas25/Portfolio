// Import StarWrapper as SectionWrapper
import StarWrapper from './StarWrapper';


const javascript = "/icons/js.png";
const typescript = "/icons/typescript.svg";
const reactjs = "/icons/react.svg";
const tailwind = "/icons/tailwindcss.svg";
const nodejs = "/icons/node-js.svg";
const python = "/icons/python.png";
// const threejs = "/icons/.svg";
const git = "/icons/git.svg";
const figma = "/icons/figma.png";
const docker = "/icons/docker.png";

const technologies = [

  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  // {
  //   name: "Three JS",
  //   icon: threejs,
  // },
  {
    name: "git",
    icon: git,
  },
   {
    name: "python",
    icon: python,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

// Export both SectionWrapper and technologies
export { StarWrapper as SectionWrapper, technologies };
export default StarWrapper;