import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

export const Player = () => {
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0] // Posición inicial
  }))

  const pos = useRef([0, 0, 0])
  useEffect(() => {
    api.position.subscribe(p => {
      pos.current = p
    })
  }, [api.position])

  // Velocidad del pj
  const vel = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe(p => {
      vel.current = p
    })
  }, [api.velocitiy])

  // Cada vez que hace un Frame va hacia adelante. La posición de la camara copia la posición del pj.
  useFrame(() => {
    camera.position.copy(
      new Vector3(
        pos.current[0], // x
        pos.current[1], // y
        pos.current[2] // z
      )
    )
    // Move the camera forward
    // Pero esto tendría que ser con el teclado
    api.velocity.set(0, 0, -1)
  })

  return (
    <mesh ref={ref} />
  )
}
