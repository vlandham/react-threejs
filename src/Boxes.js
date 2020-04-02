import React, { useState, useEffect, useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const _object = new THREE.Object3D();
const _color = new THREE.Color();

function Boxes() {
  const [hovered, set] = useState();
  const previous = useRef();
  useEffect(() => void (previous.current = hovered), [hovered]);

  const colors = useMemo(() => new Array(1000).fill().map(() => "orange"), []);
  const colorArray = useMemo(() => {
    const color = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      _color.set(colors[i]);
      _color.toArray(color, i * 3);
    }
    return color;
  }, []);

  const ref = useRef();
  const attrib = useRef();
  useFrame(state => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(time / 4);
    ref.current.rotation.y = Math.sin(time / 2);
    let i = 0;
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++;
          _object.position.set(5 - x, 5 - y, 5 - z);
          _object.rotation.y =
            Math.sin(x / 4 + time) +
            Math.sin(y / 4 + time) +
            Math.sin(z / 4 + time);
          _object.rotation.z = _object.rotation.y * 2;
          if (hovered !== previous.current) {
            _color.set(id === hovered ? "white" : colors[id]);
            _color.toArray(colorArray, id * 3);
            attrib.current.needsUpdate = true;
          }
          const scale = id === hovered ? 2 : 1;
          _object.scale.set(scale, scale, scale);
          _object.updateMatrix();
          ref.current.setMatrixAt(id, _object.matrix);
        }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, 1000]}
      onPointerMove={e => set(e.instanceId)}
      onPointerOut={e => set(undefined)}
    >
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
        <instancedBufferAttribute
          ref={attrib}
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </boxBufferGeometry>
      <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
    </instancedMesh>
  );
}
export default Boxes;
