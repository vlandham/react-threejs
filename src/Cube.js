import React from "react";
import * as THREE from "three";

function Cube({ position }) {
  console.log(position);
  return (
    <group>
      <mesh position={position}>
        <boxGeometry attach="geometry" args={[10, 10, 10]} />
        <meshPhongMaterial
          attach="material"
          side={THREE.DoubleSide}
          color={"black"}
          emissive={"black"}
          flatShading={true}
        />
      </mesh>
    </group>
  );
}

export default Cube;
