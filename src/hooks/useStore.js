import create from 'zustand'
import { nanoid } from 'nanoid'

export const useStore = create((set) => ({
  texture: 'dirt',
  cubes: [{
    id: nanoid(),
    pos: [1, 1, 1],
    texture: 'dirt'
  }, {
    id: nanoid(),
    pos: [3, 4, 1],
    texture: 'wood'
  },
  {
    id: nanoid(),
    pos: [5, 7, 1],
    texture: 'glass'
  },
  {
    id: nanoid(),
    pos: [7, 10, 1],
    texture: 'log'
  }],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [...prev.cubes, {
        id: nanoid(),
        pos: [x, y, z],
        texture: prev.texture
      }]
    }))
  },
  removeCube: (id) => {
    set(state => ({
      cubes: state.cubes.filter(cube => cube.id !== id)
    }))
  },
  setTexture: (texture) => {
    set(() => ({ texture }))
  },
  saveWorld: () => {},
  resetWorld: () => {}
}))
