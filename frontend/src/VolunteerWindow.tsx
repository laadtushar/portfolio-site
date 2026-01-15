import React from 'react';
import { TerminalWindowProps } from './TerminalWindowProps';
import { TerminalWindow } from './TerminalWindow';
import { Typewriter } from './Typewriter';

interface VolunteerExperience {
  organization: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
  type: string;
}

const volunteerExperiences: VolunteerExperience[] = [
  {
    organization: 'Build My Site',
    role: 'CEO & Founder',
    duration: 'Mar 2020 - Mar 2023',
    location: 'India',
    type: 'Self-employed',
    highlights: [
      'Head Developer and Director at BuildMySite.in',
      'Built and managed WordPress websites for multiple clients',
      'Websites: BuildMySite.in, DesignsByNimantran.in, CAvpa.in, VailPerfumes.com, SplendorSmiles.com',
      'Developed proprietary Hybrid Web View Application from scratch on Flutter',
    ],
  },
  {
    organization: 'Symbiosis Institute of Computer Studies and Research',
    role: 'Vice President BCA - Student Council',
    duration: 'Sep 2021 - Sep 2022',
    location: 'Pune, Maharashtra, India',
    type: 'Student Leadership',
    highlights: [
      'Managed, organized & facilitated college events',
      'Addressed student issues and organized important meetings',
      'Led the BCA student community',
    ],
  },
  {
    organization: 'Poems India',
    role: 'Community Manager & City Representative',
    duration: 'Dec 2018 - Jun 2022',
    location: 'Pune, Maharashtra, India',
    type: 'Part-time',
    highlights: [
      'Supervised all India city teams and events for the organization',
      'Represented Poems India in Pune and organized their events',
      'Laid out guidelines for Poems India\'s events all over India',
    ],
  },
  {
    organization: 'Freelance',
    role: 'Hindi Content Writer, Poet, Storyteller & Performer',
    duration: 'Jan 2018 - Jun 2022',
    location: 'India',
    type: 'Creative Arts',
    highlights: [
      'Wrote articles, poems, stories for independent clients',
      'Performed as a storyteller & poet over different stages in Pune and Mumbai',
      'Received news coverage for organizing open mics all over Pune',
    ],
  },
  {
    organization: 'Youth India Foundation',
    role: 'Human Resources Positions',
    duration: 'Aug 2020 - Sep 2021',
    location: 'Pune, Maharashtra, India',
    type: 'Part-time',
    highlights: [
      'Managed personnel in various departments in the organization',
      'Organized events for the organization',
    ],
  },
  {
    organization: 'Snabay Networking',
    role: 'Content Writer',
    duration: 'Oct 2020 - Dec 2020',
    location: 'Delhi, India',
    type: 'Freelance',
    highlights: [
      'Wrote relevant blogs for company website in Hindi',
      'Maintained minimal plagiarism standards',
      'Published blogs on WordPress website',
    ],
  },
];

export const VolunteerWindow = ({
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
    <div className="p-[1em] text-[0.9em] overflow-y-auto h-full">
      {/* Navigation button at top */}
      {setSlide && setSceneProp && (
        <div className="mb-[1em] flex gap-[0.5em] justify-center">
          <button
            type="button"
            onClick={() => {
              setSceneProp('menu');
              setSlide('intro');
            }}
            disabled={currentSlide !== 'volunteer'}
            className="bg-lime text-black px-[1em] py-[0.5em] font-mono font-bold text-[0.8em] border-[2px] border-black hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← back to menu
          </button>
        </div>
      )}
      <div className="mb-[1em] text-orange font-bold text-[1.1em]">
        <Typewriter delay={0} timePerChar={2}>
          ADDITIONAL EXPERIENCE
        </Typewriter>
      </div>
      <div className="space-y-[1.5em]">
        {volunteerExperiences.map((exp) => (
          <div
            key={`${exp.organization}-${exp.role}`}
            className="relative pl-[1.5em] border-l-[2px] border-orange"
          >
            {/* Timeline dot */}
            <div className="absolute left-[-0.45em] top-[0.2em] w-[0.7em] h-[0.7em] bg-orange rounded-full border-[2px] border-black" />

            {/* Role & Organization */}
            <div className="font-bold text-[1em] leading-tight">
              {exp.role}
            </div>
            <div className="text-orange text-[0.9em] mt-[0.2em]">
              {exp.organization}
            </div>
            <div className="text-[0.8em] opacity-70 mt-[0.1em]">
              {exp.duration} • {exp.type}
            </div>

            {/* Highlights */}
            <ul className="mt-[0.5em] space-y-[0.2em] text-[0.85em]">
              {exp.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-[0.4em]">
                  <span className="text-orange text-[0.8em]">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </TerminalWindow>
);
