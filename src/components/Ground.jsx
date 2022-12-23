import { usePlane } from '@react-three/cannon'
import { useStore } from '../hooks/useStore'
import { groundTexture } from '../images/textures'

export function Ground () {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0] // x, y, z
  }))

  const [addCube] = useStore(state => [state.addCube])

  //  Size
  groundTexture.repeat.set(100, 100)

  const handleClickGround = event => {
    event.stopPropagation()
    // console.log(event.point);
    const [x, y, z] = Object.values(event.point).map(n => Math.ceil(n))

    addCube(x, y, z)
  }

  return (
    <mesh
      onClick={handleClickGround}
      ref={ref}
    >
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial attach='material' map={groundTexture} />
    </mesh>
  )
}
