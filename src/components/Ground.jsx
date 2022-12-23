import { usePlane } from '@react-three/cannon'
import { useStore } from '../hooks/useStore'
import { groundTexture } from '../images/textures'

export function Ground () {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0] // x, y, z
  }))

  // Adding cubes
  const [addCube] = useStore(state => [state.addCube])

  //  Size
  groundTexture.repeat.set(100, 100)

  // stopPropagation so that the click cannot be passed the view of the ground
  const handleClickGround = event => {
    event.stopPropagation()
    // console.log(event.point);
    const [x, y, z] = Object.values(event.point).map(n => Math.ceil(n))
    // Math.floor || Math.ceil
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
