import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { useWindowSize } from 'usehooks-ts';
import { Post } from '../generatedSanitySchemaTypes';
import { BlogDetailView } from './BlogDetailView';
import { useSceneController } from './SceneController';
import colors from './colors';

interface BlogCardProps {
  post: Post;
  onClick: () => void;
}

function BlogCard({ post, onClick }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Format date
  const publishedDate = post?.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Draft';

  // Extract excerpt from body (first block of text)
  const getExcerpt = () => {
    if (!post?.body || !Array.isArray(post.body)) return 'Read more...';
    
    const textBlocks = post.body.filter((block) => block._type === 'block' && Array.isArray(block.children));
    
    // eslint-disable-next-line no-restricted-syntax
    for (const block of textBlocks) {
      if (Array.isArray(block.children)) {
        const text = block.children
          .map((child: any) => child.text || '')
          .join('')
          .trim();
        if (text.length > 0) {
          return text.length > 150 
            ? `${text.substring(0, 150)}...` 
            : text;
        }
      }
    }
    return 'Read more...';
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer p-3 sm:p-4 md:p-6 border-[3px] border-black transition-all duration-300 font-mono"
      style={{
        backgroundColor: isHovered ? colors.yellow : colors.white,
        boxShadow: isHovered ? '-0.3em -0.3em black' : '-0.15em -0.15em black',
        transform: isHovered ? 'translate(0.1em, 0.1em)' : 'translate(0, 0)',
      }}
    >
      {/* Title */}
      <h2 
        className="font-mono font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 line-clamp-2"
        style={{ 
          color: colors.black,
        }}
      >
        {post?.title || 'Untitled'}
      </h2>

      {/* Date */}
      <p 
        className="font-mono text-xs mb-2 sm:mb-3"
        style={{ color: colors.black, opacity: 0.7 }}
      >
        📅 {publishedDate}
      </p>

      {/* Excerpt */}
      <p 
        className="text-sm mb-4 line-clamp-3"
        style={{ color: colors.black, opacity: 0.8 }}
      >
        {getExcerpt()}
      </p>

      {/* Read More Link */}
      <div 
        className="font-mono text-sm font-bold mb-3"
        style={{ color: isHovered ? colors.violet : colors.black }}
      >
        READ MORE →
      </div>

      {/* LinkedIn Link */}
      {(post as any)?.linkedinUrl && (
        <a
          href={(post as any).linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 text-xs font-mono border-[2px] border-black px-3 py-1 transition-all hover:scale-105"
          style={{
            backgroundColor: colors.blue,
            color: colors.white,
          }}
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          Read on LinkedIn
        </a>
      )}
    </div>
  );
}

export function BlogGrid({ active, posts, ...groupProps }:
  { active:boolean, posts: Post[] | null; } & GroupProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { setScene } = useSceneController();
  const { width } = useWindowSize();
  
  // Smaller distanceFactor on mobile = larger content
  const isMobile = width < 640;
  const distanceFactor = isMobile ? 1.8 : 3;

  if (!active) return null;

  if (selectedPost) {
    return (
      <group {...groupProps}>
        <BlogDetailView 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)}
        />
      </group>
    );
  }

  return (
    <group {...groupProps}>
      <Html
        position={[0, 0, 2]}
        center
        transform
        distanceFactor={distanceFactor}
        style={{
          width: '95vw',
          maxWidth: '1200px',
          maxHeight: '85vh',
          pointerEvents: 'auto',
        }}
      >
        <div 
          className="border-[3px] border-black p-4 sm:p-6 md:p-8 font-mono overflow-y-auto"
          style={{
            backgroundColor: colors.cyan,
            boxShadow: '-0.3em -0.3em black',
            maxHeight: '85vh',
          }}
        >
          {/* Header */}
          <div className="mb-4 sm:mb-6 md:mb-8 text-center">
            <h1 
              className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
              style={{ color: colors.black }}
            >
              📝 BLOG.exe
            </h1>
            <p className="text-black/80 font-mono text-xs sm:text-sm mb-3">
              Thoughts on data engineering, innovation & tech
            </p>
            {/* Back Button */}
            <button
              type="button"
              onClick={() => setScene('menu')}
              className="border-[2px] border-black px-3 sm:px-4 py-2 font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: colors.white,
                color: colors.black,
              }}
            >
              ← BACK TO MENU
            </button>
          </div>

          {/* Blog Grid */}
          {(!posts || posts.length === 0) ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-white/50 font-mono text-sm sm:text-base md:text-lg">
                No blog posts yet.
                <br />
                Check Sanity Studio to add posts.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post?.slug?.current ?? post?._id}
                  post={post}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
