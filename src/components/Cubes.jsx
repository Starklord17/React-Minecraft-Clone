import { useStore } from '../hooks/useStore'
import { Cube } from './Cube.jsx'

export const Cubes = () => {
  const [cubes] = useStore(state => [state.cubes])

  return cubes.map(({ id, pos, texture }) => {
    return (
      <Cube
        key={id}
        position={pos}
        texture={texture}
      />
    )
  })
}
