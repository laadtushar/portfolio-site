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
