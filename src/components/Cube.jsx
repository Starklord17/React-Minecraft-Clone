import { useStore } from '../hooks/useStore.js'
import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import * as textures from '../images/textures.js'

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)

  const [addCube, removeCube] = useStore(state => [state.addCube, state.removeCube])

  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  // +'Texture' to use the different textures
  const activeTexture = textures[texture + 'Texture']

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      // ref={ref}
      onClick={(e) => {
        e.stopPropagation()
				const clickedFace = Math.floor(e.faceIndex / 2)
				const { x, y, z } = ref.current.position
				if (e.altKey) {
					removeCube(x, y, z)
					return
				} /* Guessing what face is what direction */
				else if (clickedFace === 0) {
					addCube(x + 1, y, z)
					return
				}
				else if (clickedFace === 1) {
					addCube(x - 1, y, z)
					return
				}
				else if (clickedFace === 2) {
					addCube(x, y + 1, z)
					return
				}
				else if (clickedFace === 3) {
					addCube(x, y - 1, z)
					return
				}
				else if (clickedFace === 4) {
					addCube(x, y, z + 1)
					return
				}
				else if (clickedFace === 5) {
					addCube(x, y, z - 1)
					return
				}
			}}
			ref={ref}
		>
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        color={isHovered ? 'grey' : 'white'}
        transparent
        map={activeTexture}
        attach='material'
      />
    </mesh>
  )
}
