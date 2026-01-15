import React from 'react';
import { Html } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import { Post } from '../generatedSanitySchemaTypes';
import colors from './colors';

export const BlogTitlePreview = ({ post, hovering, open }:{post:Post, hovering:boolean, open:boolean}) => {
  const { scale } = useSpring({
    scale: hovering || open ? 1 : 0,
  });

  const shortTitle = post?.title ?? 'Untitled';

  return (
    <animated.group scale={scale as any}>
      <Html
        position={[0, 1.1, 0]}
        center
        style={{
          pointerEvents: 'none',
          ['--textColor' as any]: colors.yellow,
        }}
      >
        <div
          className="font-mono font-bold text-[1.2rem] whitespace-nowrap text-center px-3 py-2"
          style={{
            color: 'var(--textColor)',
            backgroundColor: colors.black,
            border: `2px solid ${colors.yellow}`,
            filter: 'drop-shadow(0 0 0.2rem var(--textColor))',
          }}
        >
          {shortTitle}
        </div>
      </Html>
    </animated.group>
  );
};
