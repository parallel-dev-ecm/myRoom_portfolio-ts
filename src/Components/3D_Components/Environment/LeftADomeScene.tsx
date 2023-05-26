import { useRef, useLayoutEffect, useEffect } from "react";
import * as THREE from "three";
import ToonPlane from "../ModelComponetns/ToonPlane";
import { gsap } from "gsap";
import { useFrame } from "@react-three/fiber";
import { getDotFromCamera } from "../../../functions";
import { Text3D, useAnimations, useGLTF } from "@react-three/drei";
import { ShrinkingText } from "../ModelComponetns/ShrinkingText";

type Props = { name: string };

function LeftADomeScene({ name }: Props) {
  const parentGroupRef = useRef<THREE.Group>(null);
  const toonPlaneRef = useRef<THREE.Group>(null);
  const permanentTextRef = useRef<THREE.Group>(null);
  const mexicanFlagRef = useRef<THREE.Group>(null);
  const mainTextRef = useRef<THREE.Group>(null);

  const aboutMeColor = new THREE.Color("rgb(255, 255, 255)");

  const aboutMeMaterial = new THREE.MeshToonMaterial({ color: aboutMeColor });

  const tl: GSAPTimeline = gsap.timeline();
  let dot: number;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (
        toonPlaneRef.current &&
        mainTextRef.current &&
        permanentTextRef.current
      ) {
        tl.add(gsap.to(permanentTextRef.current.scale, { x: 0, y: 0, z: 0 }));
        tl.add(
          gsap.to(mainTextRef.current.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
        );
        //
        tl.add(
          gsap.to(toonPlaneRef.current.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
          })
        );

        tl.add(
          gsap.to(toonPlaneRef.current.position, {
            x: 300,
            y: 100,
            z: -200,
            duration: 2,
            ease: "power1",
          })
        );
      }
      //   const letters = shrinkingTextRefs.current;
      //   if (letters) {
      //     letters.forEach((char) => {
      //       tl.add(gsap.to(char.scale, { x: 0, y: 0, z: 0, duration: 0.1 }));
      //     });
      //   }
    }, parentGroupRef); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);

  useFrame((state) => {
    if (permanentTextRef.current && mexicanFlagRef) {
      permanentTextRef.current.lookAt(state.camera.position);
      mexicanFlagRef.current?.lookAt(state.camera.position);
    }
    if (parentGroupRef.current) {
      dot = getDotFromCamera({ state, objectToGetDistanceFrom: name });
      if (dot > 0.9) {
        tl.play();
      } else {
        tl.reverse();
      }
    }
  });
  return (
    <>
      <group ref={parentGroupRef} name={name}>
        <group ref={permanentTextRef} position={[0, 400, 0]}>
          <Text3D material={aboutMeMaterial} scale={50} font={"./myFont.json"}>
            About me:
          </Text3D>
        </group>
        <group ref={mainTextRef} scale={0} position={[0, 100, 0]}>
          <group scale={40} position={[0, -250, 100]}>
            <group
              ref={mexicanFlagRef}
              scale={0.8}
              rotation={[0, 10, 0]}
              position={[0, 0.8, 1.5]}
            >
              <MexicanFlag />
            </group>
          </group>
          <group scale={70} position={[0, 100, 100]}>
            <ShrinkingText
              name="softwareEngineerTitle"
              textScale={1}
              lookAtUser={true}
              text="Software Engineer."
              textColor={"rgb(255, 255, 255)"}
            />
          </group>

          <group scale={60} position={[0, -20, 100]}>
            <ShrinkingText
              lookAtUser={true}
              name="versedInText"
              textScale={1}
              textColor={"rgb(255, 255, 255)"}
              text="Love to code in :"
              shrinkingThreshold={0.9}
            />
          </group>
          <group scale={35} position={[0, -120, 100]}>
            <ShrinkingText
              lookAtUser={true}
              name="skillsAboutMeText"
              textScale={1}
              textColor={"rgb(255, 255, 255)"}
              text="Python    TS   Javascript"
              shrinkingThreshold={0.9}
            />
          </group>
        </group>

        <group
          scale={0}
          ref={toonPlaneRef}
          rotation={[-0.8, 180, -1]}
          position={[1000, 2500, -900]}
        >
          <ToonPlane scaleScalar={300} />
        </group>
      </group>
    </>
  );
}

export default LeftADomeScene;

// Mexican flag

type mexicanFlagProps = {};

function MexicanFlag({}: mexicanFlagProps) {
  const model = useGLTF("./mexico.glb");
  const animations = useAnimations(model.animations, model.scene);
  const mexicanFlagRef = useRef<THREE.Group>(null);
  const tl: GSAPTimeline = gsap.timeline();
  let dot: number;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (mexicanFlagRef.current) {
        tl.add(gsap.to(mexicanFlagRef.current.scale, { x: 1, y: 1, z: 1 }));
        //
      }
      //   const letters = shrinkingTextRefs.current;
      //   if (letters) {
      //     letters.forEach((char) => {
      //       tl.add(gsap.to(char.scale, { x: 0, y: 0, z: 0, duration: 0.1 }));
      //     });
      //   }
    }, mexicanFlagRef); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);

  useEffect(() => {
    const idle = animations.actions["KeyAction"];

    idle?.play();
  }, []);

  useFrame((state) => {
    if (mexicanFlagRef.current) {
      mexicanFlagRef.current.lookAt(state.camera.position);
      dot = getDotFromCamera({
        state,
        objectToGetDistanceFrom: "mexicanFlagComponentLocalGroup",
      });
      if (dot > 0.95) {
        tl.play();
      } else {
        tl.reverse();
      }
    }
  });
  return (
    <>
      <group
        name={"mexicanFlagComponentLocalGroup"}
        ref={mexicanFlagRef}
        scale={0}
      >
        <primitive object={model.scene} />
      </group>
    </>
  );
}
