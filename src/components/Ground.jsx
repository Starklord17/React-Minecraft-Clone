import { usePlane } from '@react-three/cannon'
import { groundTexture } from '../images/textures'

export function Ground () {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // x, y, z
    position: [0, -0.5, 0] // x, y, z
  }))

  groundTexture.repeat.set(100, 100)

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial attach='material' map={groundTexture} />
    </mesh>
  )
}