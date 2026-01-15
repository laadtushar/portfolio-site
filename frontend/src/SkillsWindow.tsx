import React, { useState } from 'react';
import { TerminalWindow } from './TerminalWindow';
import { TerminalWindowProps } from './TerminalWindowProps';
import { TerminalWindowButton } from './TerminalWindowButton';
import { SceneName } from './SceneController';
import { SlideName } from './SlideName';
import { contactHref } from './contactHref';
import { useBreakpoints } from './useBreakpoints';
import { useTrueAfterDelay } from './useTrueAfterDelay';

type SkillCategory = {
  title: string;
  color: string;
  bgColor: string;
  skills: string[];
  emoji: string;
};

const skillCategories: SkillCategory[] = [
  {
    title: 'Data Engineering',
    emoji: '🔧',
    color: 'white',
    bgColor: '#00d4ff',
    skills: [
      'Azure Databricks',
      'Apache Spark',
      'ETL Pipeline Design',
      'Data Warehousing',
      'Data Modeling',
      'Stream Processing',
    ],
  },
  {
    title: 'Programming',
    emoji: '💻',
    color: 'black',
    bgColor: '#FFD700',
    skills: [
      'Python (Expert)',
      'SQL (Advanced)',
      'TypeScript',
      'JavaScript',
      'Java',
      'R',
    ],
  },
  {
    title: 'Cloud & DevOps',
    emoji: '☁️',
    color: 'white',
    bgColor: '#FF6B35',
    skills: [
      'Azure (ADF, Synapse, Functions)',
      'Docker',
      'CI/CD Pipelines',
      'Git & GitHub',
      'Azure DevOps',
      'Serverless Architecture',
    ],
  },
  {
    title: 'Backend Development',
    emoji: '⚙️',
    color: 'black',
    bgColor: '#7DFF8C',
    skills: [
      'FastAPI',
      'Flask',
      'Node.js',
      'RESTful APIs',
      'GraphQL',
      'Microservices',
    ],
  },
  {
    title: 'Frontend & UI',
    emoji: '🎨',
    color: 'white',
    bgColor: '#9B59B6',
    skills: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'TypeScript',
      'HTML/CSS',
      'Responsive Design',
    ],
  },
  {
    title: 'Databases',
    emoji: '🗄️',
    color: 'white',
    bgColor: '#E74C3C',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'Firebase Firestore',
      'SQL Server',
      'Database Optimization',
    ],
  },
  {
    title: 'AI & ML',
    emoji: '🤖',
    color: 'black',
    bgColor: '#F39C12',
    skills: [
      'Natural Language Processing',
      'LLMs (GPT, BERT)',
      'Machine Learning',
      'scikit-learn',
      'TensorFlow',
      'Hugging Face',
    ],
  },
  {
    title: 'Tools & More',
    emoji: '🛠️',
    color: 'white',
    bgColor: '#34495E',
    skills: [
      'Jupyter Notebooks',
      'VS Code',
      'Postman',
      'Jira',
      'Figma',
      'Agile/Scrum',
    ],
  },
];

export const SkillsWindow = ({
  setScene: _setScene,
  setSlide,
  ...terminalWindowProps
}: {
  setScene: (_scene: SceneName) => void;
  setSlide: (_slide: SlideName) => void;
} & Omit<TerminalWindowProps, 'children'>) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const breakpoints = useBreakpoints();
  const showCta = useTrueAfterDelay(2000);

  return (
    <>
      <TerminalWindow
        {...terminalWindowProps}
        draggableByTitleBarOnly
        noCloseButton
        wrapperClassName="overflow-hidden"
      >
        <div className="overflow-y-auto h-full w-full p-3 sm:p-4 md:p-6" style={{ maxHeight: 'calc(90vh - 3em)' }}>
          <div className="font-mono text-white mb-3 sm:mb-4">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-cyan-400">
              {'>'} SKILLS.EXE
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-300 mb-3 sm:mb-4">
              Click any category to explore 👇
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {skillCategories.map((category, index) => (
              <button
                key={category.title}
                type="button"
                onClick={() =>
                  setActiveCategory(activeCategory === index ? null : index)
                }
                className={`
                  text-left p-3 sm:p-4 rounded-lg border-2 
                  transition-all duration-300 ease-out
                  ${
                    activeCategory === index
                      ? 'scale-105 shadow-2xl border-white'
                      : 'border-gray-600 hover:border-gray-400 hover:scale-102'
                  }
                `}
                style={{
                  backgroundColor:
                    activeCategory === index ? category.bgColor : '#1a1a1a',
                  color: activeCategory === index ? category.color : 'white',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">{category.emoji}</span>
                    <h3 className="font-bold text-base sm:text-lg md:text-xl">
                      {category.title}
                    </h3>
                  </div>
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      activeCategory === index ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </div>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${
                      activeCategory === index
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    }
                  `}
                >
                  <div className="pt-2 space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className={`
                          flex items-center gap-2 text-sm md:text-base
                          animate-fade-in
                        `}
                      >
                        <span className="text-lg">→</span>
                        <span className="font-mono">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </TerminalWindow>

      {showCta && (
        <TerminalWindow
          title={null}
          className={`
            justify-self-end
            ${breakpoints.about ? 'mt-[-1em] mr-[-1em]' : 'self-end mt-[-10em] mr-[4em]'}
          `}
        >
          <nav
            className={`
              p-[0.75em] flex gap-[0.75em]
              ${breakpoints.about ? 'items-end h-full' : 'flex-col items-center'}
            `}
          >
            <TerminalWindowButton
              key="view-experience"
              color="black"
              bgColor="yellow"
              onClick={() => {
                setSlide('experience');
              }}
            >
              VIEW_EXPERIENCE
            </TerminalWindowButton>
            <TerminalWindowButton
              key="contact-me"
              bgColor="yellow"
              href={contactHref}
            >
              CONTACT_ME
            </TerminalWindowButton>
          </nav>
        </TerminalWindow>
      )}
    </>
  );
};
