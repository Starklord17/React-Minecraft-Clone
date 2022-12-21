import { useBox } from '@react-three/cannon'

export const Cube = ({ id, pos, texture }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    pos
  }))

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach='geometry' />
    </mesh>
  )
}
