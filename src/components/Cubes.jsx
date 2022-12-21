import { useStore } from 'zustand'
import { Cube } from './Cube.jsx'

export const Cubes = () => {
  const [cubes] = useStore(state => [state.cubes])

  return cubes.map(({ id, pos, texture }) => {
    return <Cube key={id} pos={pos} texture={texture} />
  })
}
