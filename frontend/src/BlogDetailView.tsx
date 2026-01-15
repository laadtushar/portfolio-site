import React, { useRef, useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import { useWindowSize } from 'usehooks-ts';
import { Post } from '../generatedSanitySchemaTypes';
import { BlogHeader, BlogBody } from './BlogContent';
import colors from './colors';

interface BlogDetailViewProps {
  post: Post;
  onClose: () => void;
}

export function BlogDetailView({ post, onClose }: BlogDetailViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const { width } = useWindowSize();
  
  // Smaller distanceFactor on mobile = larger content
  const isMobile = width < 640;
  const distanceFactor = isMobile ? 1.2 : 3;

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setScrolledToBottom(isAtBottom);
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <Html
      position={[0, 0, 2]}
      center
      transform
      distanceFactor={distanceFactor}
      style={{
        width: '95vw',
        maxWidth: '900px',
        height: '85vh',
        maxHeight: '85vh',
        pointerEvents: 'auto',
      }}
    >
      <div 
        className="border-[3px] border-black h-full flex flex-col relative font-mono"
        style={{
          backgroundColor: colors.white,
          boxShadow: '-0.3em -0.3em black',
        }}
      >
        {/* Title Bar */}
        <div 
          className="border-b-[3px] border-black p-2 sm:p-3 md:p-4 flex items-center justify-between flex-shrink-0"
          style={{ backgroundColor: colors.lime }}
        >
          <div className="flex items-center gap-2">
            <span className="text-black font-bold text-xs sm:text-sm md:text-base">📖 READING.txt</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center border-[2px] border-black transition-all hover:scale-110 active:scale-95 font-bold text-base sm:text-lg"
            style={{
              backgroundColor: colors.white,
              color: colors.black,
            }}
            aria-label="Close blog post"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pr-6 sm:pr-8 md:pr-12"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: `${colors.black} ${colors.white}`,
            color: colors.black,
          }}
        >
          <div className="max-w-2xl pb-24 sm:pb-32">
            <BlogHeader post={post} />
            
            {/* LinkedIn Link */}
            {(post as any)?.linkedinUrl && (
              <a
                href={(post as any).linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 sm:gap-2 mb-4 sm:mb-6 text-xs sm:text-sm font-mono border-[2px] border-black px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: colors.blue,
                  color: colors.white,
                }}
              >
                <svg width="14" height="14" className="sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="hidden sm:inline">Read Original on LinkedIn →</span>
                <span className="sm:hidden">LinkedIn →</span>
              </a>
            )}
            
            <BlogBody post={post} />
          </div>
        </div>

        {/* Scroll Indicator */}
        {!scrolledToBottom && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none flex items-center justify-center"
            style={{
              background: `linear-gradient(to top, ${colors.white}, transparent)`,
            }}
          >
            <span 
              className="font-mono text-2xl animate-bounce font-bold"
              style={{ color: colors.black }}
            >
              ↓
            </span>
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 10px;
        }
        div::-webkit-scrollbar-track {
          background: ${colors.white};
          border: 1px solid ${colors.black};
        }
        div::-webkit-scrollbar-thumb {
          background: ${colors.black};
          border: 1px solid ${colors.black};
        }
        div::-webkit-scrollbar-thumb:hover {
          background: ${colors.cyan};
        }
      `}</style>
    </Html>
  );
}
