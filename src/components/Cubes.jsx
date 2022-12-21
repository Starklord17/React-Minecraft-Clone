import { useStore } from 'zustand'

export const Cube = () => {
  const [cubes] = useStore(state => [state.cubes])

  return cubes.map(({ id, pos, texture }) => {
    return <Cube key={id} pos={pos} texture={texture} />
  })
}
