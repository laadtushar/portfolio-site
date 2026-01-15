import React from 'react';
import { TerminalWindowProps } from './TerminalWindowProps';
import { TerminalWindow } from './TerminalWindow';
import { Typewriter } from './Typewriter';

interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
  technologies: string[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    company: 'Appsatile Pm Ltd',
    role: 'Founding Software Engineer (Data)',
    duration: '2024 - Present',
    location: 'Newcastle Upon Tyne, UK',
    current: true,
    highlights: [
      'Leading data engineering initiatives for innovative startup',
      'Building scalable data pipelines and ETL systems',
      'Architecting cloud-native data solutions',
    ],
    technologies: ['Python', 'PySpark', 'Azure Databricks', 'Docker', 'FastAPI', 'React'],
  },
  {
    company: 'OceanFrogs Software',
    role: 'Data Engineer',
    duration: '2022 - 2024',
    location: 'India (Remote)',
    highlights: [
      'Built production-ready REST APIs using FastAPI & Docker',
      'Developed ML data labeling systems with multiple solution approaches',
      'Created ETL pipelines with Azure Databricks & PySpark',
      'Enforced best practices: documentation, GitHub, testing',
    ],
    technologies: ['Python', 'FastAPI', 'Docker', 'Azure', 'SQL Server', 'PySpark', 'ML'],
  },
  {
    company: 'Newcastle University',
    role: 'MSc Computer Security & Resilience',
    duration: '2023 - 2024',
    location: 'Newcastle, UK',
    highlights: [
      'End-to-end encrypted secure chat system project',
      'Advanced cryptography & information security',
      'Research-focused approach to problem solving',
    ],
    technologies: ['Cryptography', 'Security', 'System Architecture'],
  },
];

export const ExperienceWindow = ({
  ...terminalWindowProps
}: Omit<TerminalWindowProps, 'children'>) => {
  return (
    <TerminalWindow {...terminalWindowProps}>
      <div className="p-[1em] text-[0.9em]">
        <div className="space-y-[2em]">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className="relative pl-[2em] border-l-[3px] border-cyan"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-0.6em] top-[0.3em] w-[1em] h-[1em] bg-cyan rounded-full border-[3px] border-black" />
              
              {/* Current badge */}
              {exp.current && (
                <div className="inline-block bg-lime text-black px-[0.5em] py-[0.2em] text-[0.8em] font-bold mb-[0.5em]">
                  CURRENT
                </div>
              )}
              
              {/* Company & Role */}
              <div className="font-bold text-[1.1em] leading-tight">
                <Typewriter delay={index * 200} timePerChar={1}>
                  {exp.role}
                </Typewriter>
              </div>
              <div className="text-cyan font-bold mt-[0.3em]">
                {exp.company}
              </div>
              <div className="text-[0.85em] opacity-80 mt-[0.2em]">
                {exp.duration} • {exp.location}
              </div>
              
              {/* Highlights */}
              <ul className="mt-[0.8em] space-y-[0.3em] text-[0.9em]">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-[0.5em]">
                    <span className="text-lime">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              {/* Technologies */}
              <div className="mt-[0.8em] flex flex-wrap gap-[0.4em]">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-violet text-black px-[0.5em] py-[0.1em] text-[0.75em] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TerminalWindow>
  );
};
