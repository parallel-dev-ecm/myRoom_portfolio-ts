import { Text3D } from "@react-three/drei";
import { ShrinkingText } from "../ModelComponetns/ShrinkingText";
import { useRef, RefObject } from "react";
import { BufferGeometry, Mesh, Material } from "three";
import { useFrame } from "@react-three/fiber";

type Props = {};

function TopDomeScene({}: Props) {
  const creditsParentText = useRef<
    Mesh<BufferGeometry, Material | Material[]>
  >() as RefObject<Mesh<BufferGeometry, Material | Material[]>>;

  useFrame((state) => {
    if (creditsParentText.current) {
      creditsParentText.current?.lookAt(state.camera.position);
    }
  });

  return (
    <>
      <group name="topDomeParentGroup">
        <group
          name="creditsTextGroup"
          rotation={[0.9, 0, 3.1]}
          scale={20}
          position={[25, 100, -150]}
        >
          <Text3D
            ref={creditsParentText}
            rotation={[0.9, 0, 3.1]}
            font={"./myFont.json"}
          >
            Credits:
          </Text3D>
          <group position={[0, 1.5, 0]}>
            <ShrinkingText
              text="Made with love by: "
              lookAtUser={true}
              name="MadeWithLoveBoyCreditsText"
              textScale={0.8}
              textColor={"rgb(21, 126, 232)"}
            />
            <group position={[0, 1.5, 0]}>
              <ShrinkingText
                text="@Parallel-dev-ecm "
                lookAtUser={true}
                name="userNameCreditsText"
                textScale={0.6}
                textColor={"rgb(255,0,0)"}
              />
            </group>
            {/* <group position={[0, 2, 0]}>
              <ShrinkingText
                text="      Stack: "
                lookAtUser={true}
                name="techStackTitleCreditsText"
                textScale={0.6}
                textColor={"rgb(255,255,255)"}
              />
            </group> */}
            <group position={[0, 3, 0]}>
              <ShrinkingText
                text="     TS - R3F "
                lookAtUser={true}
                name="techStackCreditsText"
                textScale={0.6}
                textColor={"rgb(255,255,255)"}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

export default TopDomeScene;
