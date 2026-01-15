import React, {
  useEffect, useState,
} from 'react';
import { MeshDistortMaterial, Text } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { animated, useSpring, config } from '@react-spring/three';
import {
  DoubleSide,
} from 'three';
import { useInterval } from 'usehooks-ts';
import { Post } from '../generatedSanitySchemaTypes';
import { BlogEntry } from './BlogEntry';
import colors from './colors';
import { useBreakpoints } from './useBreakpoints';
import { useHasNoMouse } from './useHasNoMouse';
import { useSceneController } from './SceneController';
import { fontUrls } from './typography';
import { BackgroundColorMaterial } from './ProjectBackgroundMaterial';

export function BlogListing({ active, posts, ...groupProps }:
  { active:boolean, posts: Post[] | null; } & GroupProps) {
  const [blobIsBig, setBlobIsBig] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState<null|number>(null);
  const [openIndex, setOpenIndex] = useState<null|number>(null);

  const breakpoints = useBreakpoints();

  const nPosts = posts?.length ?? 0;
  const arcPerPost = posts ? ((Math.PI * 2) / nPosts) : 0;

  const [autoHover, setAutoHover] = useState(false);
  const hasNoMouse = useHasNoMouse();

  const aPostIsOpen = openIndex !== null;

  useInterval(() => {
    if (aPostIsOpen) return;
    if (hasNoMouse && autoHover) setHoveredIndex(((hoveredIndex ?? 0) + 1) % nPosts);
  }, 2000);

  let blobTargetPosition = [0, 0, 0];
  if (!blobIsBig) {
    blobTargetPosition = [1, 3.91, 0];
    if (breakpoints.projects) blobTargetPosition = [3.62, 1.91, 0];
  }

  const { blobScale, blobPosition } = useSpring({
    blobPosition: blobTargetPosition,
    blobScale: blobIsBig ? 1 : 0,
    config: active ? config.gentle : config.stiff,
  });

  useEffect(() => {
    if (active) {
      let delay = 0;
      setTimeout(() => {
        setBlobIsBig(true);
      }, delay += 500);
      setTimeout(() => {
        setAutoHover(true);
      }, delay += 3000);
    } else {
      setHoveredIndex(null);
      setAutoHover(false);
      setTimeout(() => {
        setBlobIsBig(false);
      }, 500);
    }
  }, [active]);

  const radius = breakpoints.projects ? 2.7 : 2.4;

  const { setScene } = useSceneController();

  const currentPost = (openIndex !== null ? posts?.[openIndex] ?? null : null);

  return (
    <group {...groupProps}>
      <animated.group
        position={blobPosition as any}
      >
        <animated.mesh
          scale={blobScale.to((s) => ([1, 1, 1].map((x) => x * s * 13) as [number, number, number]))}
        >
          <sphereGeometry />
          <MeshDistortMaterial
            color={colors.cyan}
            speed={0.2}
            distort={1}
            side={DoubleSide}
          />
        </animated.mesh>
      </animated.group>
      <group>
        {!aPostIsOpen && (
          <Text
            fontSize={0.3}
            color={colors.yellow}
            position={[0, 1.5, 0.01]}
            font={fontUrls.bryantBold}
          >
            BLOG
          </Text>
        )}
        {nPosts === 0 && active && (
          <Text
            fontSize={0.2}
            color={colors.yellow}
            position={[0, 0, 0.01]}
            font={fontUrls.bryantBold}
            anchorX="center"
            anchorY="middle"
          >
            No blog posts yet.
            {'\n'}
            Check Sanity Studio to add posts.
          </Text>
        )}
        {posts?.map((post, index) => {
          const hovering = index === hoveredIndex;
          const open = index === openIndex;
          const angle = arcPerPost * index - (Math.PI / 2);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const basePosition:[number, number, number] = [x, y, 0];
          return (
            <BlogEntry
              post={post}
              basePosition={basePosition}
              key={post?.slug?.current ?? index}
              open={open}
              setOpen={(isOpen) => {
                setOpenIndex(isOpen ? index : null);
                setScene(isOpen ? 'blog-open' : 'blog');
              }}
              somePostIsOpen={aPostIsOpen}
              hovering={hovering}
              setHovering={(isHovering) => {
                setHoveredIndex(isHovering ? index : null);
              }}
            />
          );
        })}
      </group>
      {currentPost && (
        <mesh position={[0, 1, -1]}>
          <planeGeometry args={[30, 30]} />
          <BackgroundColorMaterial opacity project={null} />
        </mesh>
      )}
    </group>
  );
}
