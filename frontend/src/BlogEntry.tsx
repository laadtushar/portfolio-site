import React, {
  useMemo, useRef, useState,
} from 'react';
import {
  MathUtils, Mesh, Object3D,
} from 'three';
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';
import { useInterval } from 'usehooks-ts';
import { animated, config, useSpring } from '@react-spring/three';
import { RoundedBoxGeometry } from 'three-stdlib';
import { MeshDistortMaterial } from '@react-three/drei';
import { event } from 'nextjs-google-analytics';
import { Post } from '../generatedSanitySchemaTypes';
import { ThreeButton } from './ThreeButton';
import colors from './colors';
import { BlogHtmlModal } from './BlogHtmlModal';
import { useBreakpoints } from './useBreakpoints';
import { CoordArray } from './CoordArray';
import { useHasNoMouse } from './useHasNoMouse';
import { BlogTitlePreview } from './BlogTitlePreview';

const ROTATION_MAX_SPEED = 0.01;
const MAX_WANDER_DISTANCE = 0.5;

const getRandomCubeOffset = ():CoordArray => [
  (Math.random() * 2 - 1) * MAX_WANDER_DISTANCE,
  (Math.random() * 2 - 1) * MAX_WANDER_DISTANCE,
  (Math.random() * 2 - 1) * MAX_WANDER_DISTANCE,
];

const circle = Math.PI * 2;

extend({ RoundedBoxGeometry });

/* eslint-disable no-unused-vars */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'roundedBoxGeometry': ReactThreeFiber.Object3DNode<RoundedBoxGeometry, typeof RoundedBoxGeometry>;
    }
  }
}
/* eslint-enable no-unused-vars */

export const BlogEntry = ({
  post,
  basePosition,
  open,
  setOpen,
  hovering,
  somePostIsOpen,
  setHovering,
}:{
  post: Post;
  basePosition: CoordArray;
  open: boolean;
  setOpen: (_open: boolean) => void;
  somePostIsOpen: boolean;
  hovering: boolean;
  setHovering: (_hovering: boolean) => void;
}) => {
  const breakpoints = useBreakpoints();

  const directionInterval = useMemo(() => Math.random() * 5000 + 2500, []);
  const [cubeFloatingOffset, setCubeFloatingOffset] = useState<CoordArray>(
    getRandomCubeOffset(),
  );
  const { animatedCubeFloatingOffset } = useSpring({
    animatedCubeFloatingOffset: open ? [0, 0, 0] as CoordArray : cubeFloatingOffset,
    config: {
      duration: open ? 100 : directionInterval,
    },
  });

  useInterval(() => {
    setCubeFloatingOffset(getRandomCubeOffset());
  }, directionInterval);

  const cubeRef = useRef<Mesh>();
  const rotationSpeeds = useRef({
    x: (Math.random() * 2 - 1) * ROTATION_MAX_SPEED,
    y: (Math.random() * 2 - 1) * ROTATION_MAX_SPEED,
    z: (Math.random() * 2 - 1) * ROTATION_MAX_SPEED,
  });

  const objectAimedAtCamera = useMemo(() => new Object3D(), []);

  useFrame(({ camera }) => {
    if (!cubeRef.current) return;
    if (hovering || open) {
      cubeRef.current.getWorldPosition(objectAimedAtCamera.position);
      objectAimedAtCamera.lookAt(camera.position);

      const { x, y, z } = cubeRef.current.rotation;
      cubeRef.current.rotation.x = MathUtils.lerp(
        x,
        Math.round(x / (circle)) * circle + objectAimedAtCamera.rotation.x,
        0.1,
      );
      cubeRef.current.rotation.y = MathUtils.lerp(
        y,
        Math.round(y / (circle)) * circle + objectAimedAtCamera.rotation.y,
        0.1,
      );
      cubeRef.current.rotation.z = MathUtils.lerp(
        z,
        Math.round(z / (circle)) * circle + objectAimedAtCamera.rotation.z,
        0.1,
      );
    } else {
      cubeRef.current.rotation.x += rotationSpeeds.current.x;
      cubeRef.current.rotation.y += rotationSpeeds.current.y;
      cubeRef.current.rotation.z += rotationSpeeds.current.z;
    }
  });

  const hasNoMouse = useHasNoMouse();

  const openSpring = useSpring({
    position: open ? [0, breakpoints.projectOpen ? 0 : 0.9, 0.9] : basePosition,
    config: open ? config.gentle : config.default,
  });

  const colorGetter = (post.publishedAt ? colors.violet : colors.cyan);

  return (
    <animated.group position={openSpring.position as any}>
      <animated.group position={animatedCubeFloatingOffset as any}>
        <ThreeButton
          scale={[0.5, 0.5, 0.5]}
          onPointerEnter={somePostIsOpen || hasNoMouse ? undefined : () => setHovering(true)}
          onPointerLeave={somePostIsOpen || hasNoMouse ? undefined : () => setHovering(false)}
          onClick={somePostIsOpen ? undefined : () => {
            setOpen(true);
            event('click_blog', { name: post?.title ?? 'unset' });
          }}
        >
          <mesh ref={cubeRef}>
            <roundedBoxGeometry args={[1, 1, 1, 10, 0.1]} />
            <MeshDistortMaterial
              speed={1.5}
              distort={0.2}
              color={colorGetter}
            />
          </mesh>
        </ThreeButton>
        {open && <BlogHtmlModal post={post} position={[0, -0.9, 0]} setOpen={setOpen} />}
        {(!somePostIsOpen || open) && (
          <BlogTitlePreview post={post} hovering={hovering} open={open} />
        )}
      </animated.group>
    </animated.group>
  );
};
