import * as React from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import Controls from "./Controls";
import Plane from "./Plane";
import Cube from "./Cube";
import Boxes from "./Boxes";
import Effects from "./Effects";

const World = ({ data }, ref) => {
  const controlsRef = React.useRef();
  React.useImperativeHandle(ref, () => ({
    resetCamera: () => {
      return controlsRef.current.resetCamera();
    }
  }));
  return (
    <Canvas
      camera={{ position: [0, 0, 20], far: 15000 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.setClearColor(new THREE.Color("white"));
      }}
    >
      >
      <Controls ref={controlsRef} />
      {/* <ambientLight color="#ffffff" intensity={0.1} /> */}
      <ambientLight />
      <hemisphereLight intensity={0.35} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <pointLight position={[150, 150, 150]} intensity={0.55} />
      <Boxes />
      {/* <Plane /> */}
    </Canvas>
  );
};

export default React.forwardRef(World);
