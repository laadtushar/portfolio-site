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
    company: 'Appsatile Ltd',
    role: 'Founding Software Engineer (Data)',
    duration: 'Jun 2024 - Present',
    location: 'Gateshead, England, UK',
    current: true,
    highlights: [
      'Architected Business Operating System (BOS) with 7-layer composable data architecture',
      '0→1 ownership: drove roadmap via customer interviews, PRDs, architectural teardowns',
      'Designed decoupled ERP with Frappe backend and React frontend, exposing versioned REST APIs',
      'Built end-to-end ETL pipelines from web scraping to BI reporting',
      'Led engineering team (5 devs), establishing code review standards and API contracts',
      'Established DevOps foundations: K8s, Helm, CI/CD, autoscaling, observability',
    ],
    technologies: ['Python', 'PySpark', 'Azure Databricks', 'Docker', 'FastAPI', 'React', 'K8s', 'Helm', 'Frappe', 'MySQL', 'Power BI'],
  },
  {
    company: 'Cantos Cautivos',
    role: 'Full-stack Developer (PHP)',
    duration: 'Jun 2024 - Aug 2024',
    location: 'London Area, UK (Remote)',
    highlights: [
      'Built SEO-focused PHP website with SQL backend',
      'Improved site accessibility for wider audience reach',
    ],
    technologies: ['PHP', 'SQL', 'Web Development', 'Full-Stack Development'],
  },
  {
    company: 'Hexis Lab Limited',
    role: 'Data Scientist',
    duration: 'Apr 2024 - Jun 2024',
    location: 'Newcastle Upon Tyne, UK',
    highlights: [
      'Integrated Generative AI into "HexisPro" scientific platform',
      'Developed automated ingredient analysis using GPT-4o API and SpaCy',
      'Architected scraping pipelines aggregating 30,000+ regulatory data points',
      'Prototyped "Faceskin" using GPT-4 Vision for personalized skincare recommendations',
      'End-to-end ML model deployment using FastAPI and Docker',
      'Built interactive frontend visualizations with React, Three.js, and Kekule.js',
    ],
    technologies: ['Python', 'GPT-4', 'SpaCy', 'Pandas', 'FastAPI', 'Docker', 'React', 'Three.js', 'NLP', 'Computer Vision'],
  },
  {
    company: 'OceanFrogs Software',
    role: 'Data Engineer (Freelance)',
    duration: 'Sep 2023 - Oct 2023',
    location: 'Newcastle Upon Tyne, UK',
    highlights: [
      'Owner for Data Enrichment API product built with FastAPI, NginX, MSSQL and Docker',
      'Maintained ETL Data pipelines for business intelligence data enrichment',
      'Deployed on AWS EC2',
    ],
    technologies: ['Python', 'FastAPI', 'Docker', 'Nginx', 'MSSQL', 'AWS EC2', 'SQL', 'Data Analysis'],
  },
  {
    company: 'OceanFrogs Software',
    role: 'Data Engineer & Web Developer',
    duration: 'Jul 2022 - Aug 2023',
    location: 'Pune, Maharashtra, India',
    highlights: [
      'Developed ETL data pipelines using Python with Selenium, Pandas, Beautiful Soup on EC2',
      'Implemented ML-based keyword extraction engine using NLP (80% efficiency increase)',
      'Migrated technographics labeling from SQL to Python (400% speed reduction, 50% accuracy increase)',
      'Designed and deployed REST APIs using Docker, FastAPI, and NGINX on EC2',
      'Generated data visualizations using Google Looker Studio and Data Studio',
      'Overhauled website deployment process (80% reduction in deployment time)',
    ],
    technologies: ['Python', 'FastAPI', 'Docker', 'Selenium', 'AWS EC2', 'MSSQL', 'Cloudflare', 'WordPress', 'Git', 'Nginx', 'S3', 'Beautiful Soup'],
  },
];

export const ExperienceWindow = ({
  slide: currentSlide,
  setSlide,
  setScene: setSceneProp,
  ...terminalWindowProps
}: {
  slide?: string;
  setSlide?: (_slide: any) => void;
  setScene?: (_scene: any) => void;
} & Omit<TerminalWindowProps, 'children'>) => (
  <TerminalWindow {...terminalWindowProps} wrapperClassName="overflow-hidden">
    <div className="p-[1em] text-[0.9em] overflow-y-auto h-full" style={{ maxHeight: 'calc(90vh - 3em)' }}>
      {/* Navigation buttons at top */}
      {setSlide && setSceneProp && (
        <div className="mb-[1em] flex gap-[0.5em] justify-center flex-wrap">
          <button
            type="button"
            onClick={() => setSlide('education')}
            disabled={currentSlide !== 'experience'}
            className="bg-lime text-black px-[1em] py-[0.5em] font-mono font-bold text-[0.8em] border-[2px] border-black hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            education? →
          </button>
          <button
            type="button"
            onClick={() => {
              setSceneProp('menu');
              setSlide('intro');
            }}
            disabled={currentSlide !== 'experience'}
            className="bg-cyan text-black px-[1em] py-[0.5em] font-mono font-bold text-[0.8em] border-[2px] border-black hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← back to menu
          </button>
        </div>
      )}
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
              {exp.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-[0.5em]">
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
