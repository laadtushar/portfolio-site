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

const P = ({ children, className = '' }: { children: ReactNode; className?: string; }) => (<p className={`my-4 ${className}`}>{children}</p>);

const H2 = ({ children }: { children: ReactNode; }) => (
  <h2
    className="mt-16 font-mono text-2xl"
  >
    {children}
  </h2>
);

const LinkMark:PortableTextMarkComponent = ({ value, children }) => {
  const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
  return (
    <a
      href={value?.href}
      className="underline decoration-1 underline-offset-4 hover:text-projectColor"
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
const H3Block: PortableTextBlockComponent = ({ children }) => (<h3 className="my-4 font-mono">{children}</h3>);

export const BlogHeader = ({ post }: { post: Post; }) => (
  <>
    <h1 className="font-mono text-[clamp(1.5rem,6vw,3rem)] my-12 leading-[1.2] ">
      {post?.title}
    </h1>
    {post?.publishedAt && (
      <div className="text-sm opacity-70 mb-8">
        {new Date(post.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    )}
    {post?.mainImage && (
      <div className="my-8">
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
  <div className="my-8 tracking-wide">
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
