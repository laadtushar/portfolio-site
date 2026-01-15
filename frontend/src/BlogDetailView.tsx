import React, { useRef, useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
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
      distanceFactor={3}
      style={{
        width: '90vw',
        maxWidth: '800px',
        height: '90vh',
        pointerEvents: 'auto',
      }}
    >
      <div 
        className="bg-black/95 border-2 border-violet rounded-lg backdrop-blur-sm h-full flex flex-col relative"
        style={{
          borderColor: colors.violet,
          boxShadow: `0 0 30px ${colors.violet}40`,
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all hover:scale-110 active:scale-95"
          style={{
            borderColor: colors.violet,
            backgroundColor: colors.black,
            color: colors.violet,
          }}
          aria-label="Close blog post"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <line x1="5" y1="5" x2="15" y2="15" />
            <line x1="15" y1="5" x2="5" y2="15" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 pr-12"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: `${colors.violet} transparent`,
          }}
        >
          <div className="max-w-2xl">
            <BlogHeader post={post} />
            
            {/* LinkedIn Link */}
            {(post as any)?.linkedinUrl && (
              <a
                href={(post as any).linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mb-6 text-sm font-mono border-2 px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                style={{
                  borderColor: colors.cyan,
                  color: colors.cyan,
                  backgroundColor: `${colors.cyan}10`,
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Read Original on LinkedIn
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
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
              background: `linear-gradient(to top, ${colors.black}DD, transparent)`,
            }}
          >
            <span 
              className="font-mono text-2xl animate-bounce"
              style={{ color: colors.violet }}
            >
              ↓
            </span>
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: ${colors.violet};
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: ${colors.violet}DD;
        }
      `}</style>
    </Html>
  );
}
