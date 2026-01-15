import React from 'react';
import { TerminalWindowProps } from './TerminalWindowProps';
import { TerminalWindow } from './TerminalWindow';
import { Typewriter } from './Typewriter';

interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  grade: string;
  modules?: string[];
  activities?: string[];
  skills?: string[];
}

const educationList: Education[] = [
  {
    institution: 'Newcastle University',
    degree: 'MSc Advanced Computer Science',
    field: 'Computer Science',
    duration: 'Sep 2023 - Aug 2024',
    location: 'Newcastle Upon Tyne, UK',
    grade: 'Distinction (71.6)',
    modules: [
      'Engineering for AI (Big Data)',
      'Cloud Computing',
      'Information Security and Cryptography',
      'System Security',
      'Secure Software Development',
      'Advanced Programming in Java',
    ],
    skills: ['Azure Databricks', 'Information Security', 'Security System Design', 'PySpark', 'React.js', 'Firebase'],
  },
  {
    institution: 'Symbiosis Institute of Computer Studies and Research',
    degree: 'Bachelor of Computer Application (BCA)',
    field: 'Computer Science',
    duration: 'Jun 2020 - Jun 2023',
    location: 'Pune, Maharashtra, India',
    grade: '7.68/10 GPA',
    activities: [
      'Vice President - Student Council & Cultural Club',
      'Orator\'s Club',
      'CURSOR College Magazine',
    ],
  },
];

export const EducationWindow = ({
  slide: currentSlide,
  setSlide,
  setScene: setSceneProp,
  ...terminalWindowProps
}: {
  slide?: string;
  setSlide?: (_slide: any) => void;
  setScene?: (_scene: any) => void;
} & Omit<TerminalWindowProps, 'children'>) => (
  <TerminalWindow {...terminalWindowProps} wrapperClassName="overflow-y-auto">
    <div className="p-[0.75em] sm:p-[1em] text-[0.8em] sm:text-[0.85em] md:text-[0.9em]">
      {/* Navigation buttons at top */}
      {setSlide && setSceneProp && (
        <div className="mb-[0.75em] sm:mb-[1em] flex gap-[0.4em] sm:gap-[0.5em] justify-center flex-wrap">
          <button
            type="button"
            onClick={() => setSlide('volunteer')}
            disabled={currentSlide !== 'education'}
            className="bg-lime text-black px-[0.75em] sm:px-[1em] py-[0.4em] sm:py-[0.5em] font-mono font-bold text-[0.75em] sm:text-[0.8em] border-[2px] border-black hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            additional experience? →
          </button>
          <button
            type="button"
            onClick={() => {
              setSceneProp('menu');
              setSlide('intro');
            }}
            disabled={currentSlide !== 'education'}
            className="bg-cyan text-black px-[0.75em] sm:px-[1em] py-[0.4em] sm:py-[0.5em] font-mono font-bold text-[0.75em] sm:text-[0.8em] border-[2px] border-black hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← back to menu
          </button>
        </div>
      )}
      <div className="space-y-[1.5em] sm:space-y-[2em]">
        {educationList.map((edu, index) => (
          <div
            key={edu.institution}
            className="relative pl-[1.5em] sm:pl-[2em] border-l-[2px] sm:border-l-[3px] border-violet"
          >
            {/* Timeline dot */}
            <div className="absolute left-[-0.5em] sm:left-[-0.6em] top-[0.3em] w-[0.8em] h-[0.8em] sm:w-[1em] sm:h-[1em] bg-violet rounded-full border-[2px] sm:border-[3px] border-black" />

            {/* Institution & Degree */}
            <div className="font-bold text-[1em] sm:text-[1.1em] leading-tight text-violet">
              <Typewriter delay={index * 200} timePerChar={1}>
                {edu.institution}
              </Typewriter>
            </div>
            <div className="font-bold mt-[0.2em] sm:mt-[0.3em] text-[0.9em] sm:text-[1em]">
              {edu.degree}
            </div>
            <div className="text-[0.75em] sm:text-[0.85em] opacity-80 mt-[0.15em] sm:mt-[0.2em]">
              {edu.duration} • {edu.location}
            </div>

            {/* Grade */}
            <div className="mt-[0.4em] sm:mt-[0.5em] inline-block bg-lime text-black px-[0.4em] sm:px-[0.5em] py-[0.15em] sm:py-[0.2em] text-[0.7em] sm:text-[0.8em] font-bold">
              {edu.grade}
            </div>

            {/* Modules */}
            {edu.modules && (
              <div className="mt-[0.6em] sm:mt-[0.8em]">
                <div className="text-cyan font-bold text-[0.8em] sm:text-[0.9em] mb-[0.3em] sm:mb-[0.4em]">RELEVANT MODULES:</div>
                <div className="flex flex-wrap gap-[0.3em] sm:gap-[0.4em]">
                  {edu.modules.map((module) => (
                    <span
                      key={module}
                      className="bg-cyan text-black px-[0.4em] sm:px-[0.5em] py-[0.1em] text-[0.65em] sm:text-[0.75em] font-mono"
                    >
                      {module}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Activities */}
            {edu.activities && (
              <div className="mt-[0.6em] sm:mt-[0.8em]">
                <div className="text-yellow font-bold text-[0.8em] sm:text-[0.9em] mb-[0.3em] sm:mb-[0.4em]">ACTIVITIES:</div>
                <ul className="space-y-[0.2em] sm:space-y-[0.3em] text-[0.8em] sm:text-[0.9em]">
                  {edu.activities.map((activity) => (
                    <li key={activity} className="flex gap-[0.4em] sm:gap-[0.5em]">
                      <span className="text-yellow">▸</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {edu.skills && (
              <div className="mt-[0.6em] sm:mt-[0.8em]">
                <div className="text-lime font-bold text-[0.8em] sm:text-[0.9em] mb-[0.3em] sm:mb-[0.4em]">SKILLS ACQUIRED:</div>
                <div className="flex flex-wrap gap-[0.3em] sm:gap-[0.4em]">
                  {edu.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-lime text-black px-[0.4em] sm:px-[0.5em] py-[0.1em] text-[0.65em] sm:text-[0.75em] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </TerminalWindow>
);
