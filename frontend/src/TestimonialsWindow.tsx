/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { event } from 'nextjs-google-analytics';
import { TerminalWindowProps } from './TerminalWindowProps';
import { TerminalWindow } from './TerminalWindow';
import { Typewriter } from './Typewriter';
import { useBreakpoints } from './useBreakpoints';
import { aboutContent } from './aboutContent';

const { testimonials } = aboutContent;

type Testimonial = typeof testimonials[number];

// Manually decide which testimony should dictate window length
const longestTestimonial = testimonials[0];

export const QuoteFigure = ({ testimonial, hidden = false }:
  {testimonial:Testimonial, hidden?:boolean}) => (
    <figure
      className={`${hidden ? 'invisible' : ''} col-[1/-1] row-[1/-1]`}
      aria-hidden={hidden}
    >
      <blockquote className="">
        {hidden ? testimonial.quote : <Typewriter timePerChar={2}>{testimonial.quote}</Typewriter>}
        {/* {testimonial.quote} */}
      </blockquote>
      <figcaption className="mt-[2em] text-[0.6em]">
        <div>
          –
          {testimonial.name}
        </div>
        {testimonial?.title?.map((title) => (<div key={title}>{title}</div>))}
      </figcaption>
    </figure>
);

export const TestimonialsWindow = ({
  slide: currentSlide,
  setSlide,
  setScene: setSceneProp,
  breakpoint,
  ...terminalWindowProps
}: {
  slide?: string;
  setSlide?: (_slide: any) => void;
  setScene?: (_scene: any) => void;
  breakpoint?: boolean;
} & Omit<TerminalWindowProps, 'children'>) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const breakpoints = useBreakpoints();
  const breakpointVal = breakpoint ?? breakpoints.about;

  const testimonial = testimonials?.[messageIndex];

  useEffect(() => {
    event('testimonial-viewed', {
      label: testimonial?.name,
    });
  }, [testimonial?.name]);

  return (
    <TerminalWindow
      {...terminalWindowProps}
      wrapperClassName="overflow-y-auto"
    >
      <div
        className={`grid p-[0.75em] sm:p-[1em] ${breakpointVal ? 'grid-cols-[8em_1fr]' : ''}`}
      >
        {/* Navigation buttons at top */}
        {setSlide && setSceneProp && (
          <div className={`mb-[1em] flex gap-[0.5em] justify-center ${breakpointVal ? 'col-span-2' : ''}`}>
            <button
              type="button"
              onClick={() => {
                setSlide('skills');
              }}
              disabled={currentSlide !== 'testimonials'}
              className="bg-violet text-black px-[1em] py-[0.5em] font-mono font-bold text-[0.9em] border-[2px] border-black hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              skills, tho? →
            </button>
            <button
              type="button"
              onClick={() => {
                setSceneProp('menu');
                setSlide('intro');
              }}
              disabled={currentSlide !== 'testimonials'}
              className="bg-lime text-black px-[1em] py-[0.5em] font-mono font-bold text-[0.9em] border-[2px] border-black hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← back to menu
            </button>
          </div>
        )}
        {/* <div className="flex items-center justify-center col-span-2 mt-[-1em] gap-[0.5em]">
          <div className="relative inline-block">
            <span
              className="
                grid place-items-center rounded-full
                bg-blue text-white absolute top-[0em] right-[0em]
                w-[1.5em] h-[1.5em] text-[0.7em]
              "
            >
              3
            </span>
            <img src="/images/messages-icon.svg" className="w-[3em] h-[3em] m-auto"
            alt="Message bubble" />
          </div>
          <h2 className="font-display text-[2em]">
            <span className="text-[1.5em]">B</span>
            MAIL
          </h2>
        </div> */}
        <div>
          <ul className={`${breakpoint ? '' : 'flex flex-wrap justify-center gap-1'}`}>
            {testimonials.map(({ shortName, headshot }, index) => (
              <li key={shortName}>
                <button
                  onClick={() => { setMessageIndex(index); }}
                  type="button"
                  className={`
                  flex flex-col text-center justify-start items-center gap-[0.3em] sm:gap-[0.5em]
                  w-full p-[0.3em] sm:p-[0.5em]
                  sm:text-left sm:flex-row
                  ${messageIndex === index ? 'bg-[#bdffbd]' : ''}
                `}
                >
                  <div className="border-[2px] rounded-full bg-blue">
                    {typeof headshot === 'string'
                      ? (
                        <img
                          src={headshot}
                          className="w-[2.5em] h-[2.5em] min-w-[2.5em] sm:w-[3em] sm:h-[3em] sm:min-w-[3em] pointer-events-none rounded-full object-cover"
                          alt="headshot"
                        />
                      )
                      : (
                        <div className="w-[2.5em] h-[2.5em] sm:w-[3em] sm:h-[3em] relative rounded-full overflow-hidden">
                          <Image
                            src={headshot}
                            className="object-cover rounded-full pointer-events-none"
                            alt="headshot"
                            placeholder="blur"
                            layout="fill"
                          />
                        </div>
                      )}

                  </div>
                  <div className="text-[0.65em] sm:text-[0.75em] leading-[1]">
                    <h2 className="font-bold">
                      {shortName}
                    </h2>

                    {/* <h3 className="">
                      re:
                      {' '}
                      <span className="text-[1.5em]">{subject}</span>
                    </h3> */}
                  </div>
                </button>
              </li>
            ))}
          </ul>

        </div>
        <div className="bg-[#bdffbd] text-[1em] p-[1em] grid">
          {/* A hidden div with the longest testinmonial which will be used to size */}
          <QuoteFigure testimonial={longestTestimonial} hidden />
          <QuoteFigure testimonial={testimonial} />
        </div>
      </div>
    </TerminalWindow>
  );
};
