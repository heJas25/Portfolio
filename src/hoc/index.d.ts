import React from 'react';

export interface Technology {
  name: string;
  icon: string;
}

export declare const technologies: Technology[];

export declare const SectionWrapper: <T extends React.ComponentType<any>>(
  Component: T,
  idName: string
) => React.ComponentType;

declare const StarWrapper: <T extends React.ComponentType<any>>(
  Component: T,
  idName: string
) => React.ComponentType;

export default StarWrapper;