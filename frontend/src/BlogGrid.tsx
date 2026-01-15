import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Post } from '../generatedSanitySchemaTypes';
import { BlogDetailView } from './BlogDetailView';
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
      className="cursor-pointer p-6 rounded-lg border-2 transition-all duration-300"
      style={{
        borderColor: isHovered ? colors.violet : `${colors.white}40`,
        backgroundColor: isHovered ? `${colors.violet}10` : 'transparent',
        boxShadow: isHovered ? `0 0 20px ${colors.violet}40` : 'none',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Title */}
      <h2 
        className="font-mono font-bold text-xl mb-3 line-clamp-2"
        style={{ 
          color: isHovered ? colors.violet : colors.white,
        }}
      >
        {post?.title || 'Untitled'}
      </h2>

      {/* Date */}
      <p 
        className="font-mono text-xs mb-3"
        style={{ color: colors.cyan }}
      >
        {publishedDate}
      </p>

      {/* Excerpt */}
      <p 
        className="text-sm mb-4 line-clamp-3"
        style={{ color: `${colors.white}CC` }}
      >
        {getExcerpt()}
      </p>

      {/* Read More Link */}
      <div 
        className="font-mono text-sm font-bold"
        style={{ color: isHovered ? colors.violet : colors.cyan }}
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
          className="mt-3 inline-flex items-center gap-2 text-xs font-mono border px-3 py-1 rounded transition-all hover:scale-105"
          style={{
            borderColor: colors.cyan,
            color: colors.cyan,
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
        distanceFactor={3}
        style={{
          width: '90vw',
          maxWidth: '1200px',
          pointerEvents: 'auto',
        }}
      >
        <div 
          className="bg-black/95 border-2 border-cyan p-8 rounded-lg backdrop-blur-sm"
          style={{
            borderColor: colors.cyan,
            boxShadow: `0 0 20px ${colors.cyan}40`,
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 
              className="font-mono text-4xl font-bold mb-2"
              style={{ color: colors.yellow }}
            >
              BLOG
            </h1>
            <p className="text-white/70 font-mono text-sm">
              Thoughts on data engineering, innovation & tech
            </p>
          </div>

          {/* Blog Grid */}
          {(!posts || posts.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-white/50 font-mono text-lg">
                No blog posts yet.
                <br />
                Check Sanity Studio to add posts.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post?.slug?.current ?? post?._id}
                  post={post}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                // This will be handled by the Notebook component
                // Just provide a visual back button
              }}
              className="font-mono text-sm px-6 py-2 border-2 rounded-lg transition-all hover:scale-105 active:scale-95"
              style={{
                borderColor: colors.cyan,
                color: colors.cyan,
              }}
            >
              ← BACK TO MENU
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
