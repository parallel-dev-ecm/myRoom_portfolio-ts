import { useProgress, Html } from "@react-three/drei";
useProgress;

type Props = {};

function LoadingScreen({}: Props) {
  const { progress } = useProgress();

  return (
    <Html center style={{ color: "white" }}>
      {progress} % loaded
    </Html>
  );
}

export default LoadingScreen;
