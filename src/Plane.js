import React, { useRef } from "react";

function Plane(props) {
  const ref = useRef();
  // const [ref] = usePlane(() => ({ mass: 0, ...props }));
  return (
    <mesh receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhongMaterial attach="material" color="#171717" />
    </mesh>
  );
}

export default Plane;
