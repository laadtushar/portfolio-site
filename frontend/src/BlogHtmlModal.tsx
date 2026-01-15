/* eslint-disable react/prop-types */
import React from 'react';
import { Html } from '@react-three/drei';
import { Post } from '../generatedSanitySchemaTypes';
import { CoordArray } from './CoordArray';
import {
  BlogHeader, BlogBody,
} from './BlogContent';
import { CloseButton, ScollingContentContainer } from './ProjectHtmlModal';

export const BlogHtmlModal = ({ post, position, setOpen }:
  { post: Post; position: CoordArray, setOpen: (_open:boolean)=>void }) => (
  <Html
    position={position}
    className="w-[100vw] relative font-light touch-auto"
    style={{
      ['--textColor' as any]: 'white',
      ['--projectColor' as any]: '#8b5cf6', // violet for blog
      color: 'var(--textColor)',
    }}
  >
    <CloseButton setOpen={setOpen} />
    <ScollingContentContainer>
      <BlogHeader post={post} />
      <BlogBody post={post} />
    </ScollingContentContainer>
  </Html>
);
