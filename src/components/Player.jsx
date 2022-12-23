import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard'

const CHARACTER_SPEED = 5
const CHARACTER_JUMP_FORCE = 4

export const Player = () => {
  const { moveBackward, moveForward, moveLeft, moveRight, jump } = useKeyboard()

  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0] // Posición inicial
  }))

  // Posición del PJ
  const pos = useRef([0, 0, 0])
  useEffect(() => {
    api.position.subscribe(p => {
      pos.current = p
    })
  }, [api.position])

  // Velocidad del PJ
  const vel = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe(v => {
      vel.current = v
    })
  }, [api.velocitiy])

  // Atach the camera to the position of the player
  // Cada vez que hace un Frame va hacia adelante. La posición de la camara copia la posición del pj.
  useFrame(() => {
    camera.position.copy(
      new Vector3(
        pos.current[0], // x
        pos.current[1], // y
        pos.current[2] // z
      )
    )

    const direction = new Vector3()

    /* La variable frontVector es una instancia de la clase Vector3, que representa un vector tridimensional en un sistema de coordenadas.

    La expresión new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)) crea una nueva instancia de Vector3 con los componentes x, y, z inicializados a 0, 0 y (moveBackward ? 1 :   0) - (moveForward ? 1 : 0), respectivamente.

    El tercer componente del vector se calcula usando operadores ternarios. Si moveBackward es verdadero, el componente z se inicializa a 1. Si moveForward es verdadero, el componente z se  inicializa a -1. Si ninguno de estos es verdadero, el componente z se inicializa a 0. */
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    )

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(CHARACTER_SPEED) // walk: 2, run : 5
      .applyEuler(camera.rotation) // Camera rotation ref

    api.velocity.set(
      direction.x,
      vel.current[1], // ??? saltar...
      direction.z
    )

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(
        vel.current[0],
        CHARACTER_JUMP_FORCE,
        vel.current[2]
      )
    }

    // Move the camera forward
    // Pero esto tendría que ser con el teclado
    // api.velocity.set(0, 0, -1)
  })

  return (
    <mesh ref={ref} />
  )
}
