import { useBox } from '@react-three/cannon'

export const Cubes = ({ id, pos, texture }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    pos
  }))

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial color='white' attach='material' />
    </mesh>
  )
}
