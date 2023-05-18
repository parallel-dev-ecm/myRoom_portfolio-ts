import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import * as THREE from "three";
import { getDotFromCamera } from "../../functions";
import { gsap } from "gsap";
type textProps = {
  text: string;
  name: string;
  textScale: number;
};

export function ShrinkingText({ text, name, textScale }: textProps) {
  const mainGroupRef = useRef<THREE.Group>(null);

  const characters = text.split("");
  const shrinkingTextRefs = useRef<THREE.Group[]>([]);
  const tl: GSAPTimeline = gsap.timeline();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = shrinkingTextRefs.current;
      if (letters) {
        letters.forEach((char) => {
          tl.add(gsap.to(char.scale, { x: 0, y: 0, z: 0, duration: 0.1 }));
        });
      }
    }, mainGroupRef); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);

  useEffect(() => {
    shrinkingTextRefs.current = shrinkingTextRefs.current.slice(
      0,
      characters.length
    );
  }, [characters.length]);

  useFrame((state) => {
    if (mainGroupRef.current) {
      mainGroupRef.current.lookAt(state.camera.position);
    }

    if (shrinkingTextRefs.current) {
      const dot = getDotFromCamera({
        state,
        objectToGetDistanceFrom: name,
      });

      if (dot < 0.8) {
        tl.play();
      } else {
        tl.reverse();
      }
    }
  });

  return (
    <>
      <group name={name} ref={mainGroupRef}>
        {characters.map((char, index) => (
          <group
            key={index}
            ref={(ref) => {
              if (ref) {
                shrinkingTextRefs.current[index] = ref;
              }
            }}
          >
            <Text3D
              font={"./myFont.json"}
              position={[index * 0.5, 0, 0]}
              scale={textScale}
            >
              {char}
            </Text3D>
          </group>
        ))}
      </group>
    </>
  );
}
