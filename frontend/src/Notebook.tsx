import React from 'react';
import { animated, config } from '@react-spring/three';
import { Color } from 'three';
import { Text } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import bookFillPoints from './lines/bookFill';
import bookLinesPoints from './lines/bookLines';
// import bookHighlightPoints from './lines/bookHighlight';
import { Scribble } from './Scribble';
import { CoordArray } from './CoordArray';
import { fontUrls } from './typography';
import { useTrueAfterDelay } from './useTrueAfterDelay';
import { ThreeButton } from './ThreeButton';
import { useSceneController } from './SceneController';
import colors from './colors';
import { useBreakpoints } from './useBreakpoints';

export function Notebook({ ...groupProps }:GroupProps) {
  let time = 450;
  const linesVisible = useTrueAfterDelay(time += 1000);
  const fillVisible = useTrueAfterDelay(time += 500);
  const notebookButtonEnabled = useTrueAfterDelay(time += 1000);

  const sceneController = useSceneController();
  const { scene } = sceneController;

  const breakpoints = useBreakpoints();

  const position:CoordArray = breakpoints.menu ? [4, 1.3, 2.5] : [-1.5, 3.8, 1.8];

  return (
    <animated.group
      {...groupProps}
      position={position}
    >
      <Scribble
        points={(bookFillPoints as CoordArray[])}
        size={1.5}
        position={[0.2, 0, -0.3]}
        lineWidth={0.5}
        color={new Color(colors.violet)}
        rotation={[Math.PI, 0, 0]}
        visible={fillVisible}
        drawSpringConfig={config.molasses}
        curved
        nPointsInCurve={100}
      />
      <Scribble
        points={(bookLinesPoints as CoordArray[])}
        size={1.5}
        position={[0, 0, 0]}
        lineWidth={0.015}
        color={new Color(colors.black)}
        rotation={[Math.PI, 0, 0]}
        visible={linesVisible}
        curved
        nPointsInCurve={700}
      />
      <Text
        position={[0, 0, 0.1]}
        rotation={[0, 0, 0]}
        color={colors.black}
        anchorX="center"
        anchorY="middle"
        fontSize={0.25}
        font={fontUrls.bryantBold}
        visible={linesVisible}
      >
        {scene === 'blog' || scene === 'blog-open' ? 'Back'.toUpperCase() : 'Blog'.toUpperCase()}
      </Text>
      {notebookButtonEnabled && scene === 'menu' && (
        <ThreeButton
          position={[0, 0, 0]}
          width={2}
          height={2}
          description={'A notebook with the word "Blog" on it.'}
          activationMsg="Notebook opens, revealing blog posts floating in a 3D carousel."
          cursor="open-blog"
          onClick={() => {
            sceneController.setScene('blog');
          }}
          onFocus={() => {}}
          onBlur={() => {}}
        />
      )}
      {notebookButtonEnabled && (scene === 'blog' || scene === 'blog-open') && (
        <ThreeButton
          position={[0, 0, 0]}
          width={1.5}
          height={1.5}
          description={'A notebook with the word "Back" on it'}
          activationMsg="Notebook closes, returning us to the desk / main menu."
          cursor="close-blog"
          onClick={() => {
            sceneController.setScene('menu');
          }}
          onFocus={() => {}}
          onBlur={() => {}}
        />
      )}
    </animated.group>
  );
}
