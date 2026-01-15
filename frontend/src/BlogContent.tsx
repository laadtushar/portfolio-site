/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
import React, { ReactNode, useMemo } from 'react';
import {
  PortableText, PortableTextBlockComponent, PortableTextMarkComponent, PortableTextTypeComponent,
} from '@portabletext/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TypedObject } from '@portabletext/types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { ImageFigure, Post } from '../generatedSanitySchemaTypes';
import { getSanityImageUrlFor } from './sanity/sanityImageBuilder';

const P = ({ children, className = '' }: { children: ReactNode; className?: string; }) => (<p className={`my-3 sm:my-4 text-sm sm:text-base text-black ${className}`}>{children}</p>);

const H2 = ({ children }: { children: ReactNode; }) => (
  <h2
    className="mt-8 sm:mt-12 md:mt-16 font-mono text-lg sm:text-xl md:text-2xl font-bold text-black"
  >
    {children}
  </h2>
);

const LinkMark:PortableTextMarkComponent = ({ value, children }) => {
  const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
  return (
    <a
      href={value?.href}
      className="underline decoration-2 underline-offset-4 text-blue font-bold hover:text-violet"
      target={target}
      rel={target === '_blank' ? 'noindex nofollow' : ''}
    >
      {children}
    </a>
  );
};

const ImageBlock:PortableTextTypeComponent = ({ value }:{value:ImageFigure}) => (
  <figure className="border-[1px] border-[currentColor]">
    <img
      src={
      getSanityImageUrlFor(value?.image?.asset as SanityImageSource)
        .width(1000).url()
      }
      alt={value?.alt}
    />
  </figure>
);

const PBlock: PortableTextBlockComponent = ({ children }) => (<P>{children}</P>);
const H2Block: PortableTextBlockComponent = ({ children }) => (
  <H2>
    {children}
  </H2>
);
const H3Block: PortableTextBlockComponent = ({ children }) => (<h3 className="my-4 font-mono font-bold text-black text-xl">{children}</h3>);

export const BlogHeader = ({ post }: { post: Post; }) => (
  <>
    <h1 className="font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl my-4 sm:my-6 md:my-8 lg:my-12 leading-[1.2] font-bold text-black">
      {post?.title}
    </h1>
    {post?.publishedAt && (
      <div className="text-xs sm:text-sm opacity-70 mb-4 sm:mb-6 md:mb-8 text-black">
        📅 {new Date(post.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    )}
    {post?.mainImage && (
      <div className="my-4 sm:my-6 md:my-8 border-[2px] border-black">
        <img
          src={
            getSanityImageUrlFor(post.mainImage as SanityImageSource)
              .width(1000).url()
          }
          alt={post.title ?? 'Blog post image'}
          className="w-full"
        />
      </div>
    )}
  </>
);

export const BlogBody = ({ post }: { post: Post; }) => useMemo(() => (
  <div className="my-8 tracking-wide leading-relaxed">
    <PortableText
      value={((post?.body ?? {}) as TypedObject)}
      components={{
        marks: {
          link: LinkMark,
        },
        types: {
          imageFigure: ImageBlock,
        },
        block: {
          h2: H2Block,
          h3: H3Block,
          normal: PBlock,
        },
      }}
    />
  </div>
), [post?.body]);
