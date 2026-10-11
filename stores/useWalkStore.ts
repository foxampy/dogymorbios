import { create } from 'zustand'

interface Walk {
  id: string
  startTime: Date
  path: Array<{ lat: number; lng: number }>
  poops: number
  encounters: string[]
}

interface WalkState {
  currentWalk: Walk | null
  walks: Walk[]
  startWalk: () => void
  endWalk: () => void
  addPathPoint: (point: { lat: number; lng: number }) => void
  addPoop: () => void
  addEncounter: (dogId: string) => void
}

export const useWalkStore = create<WalkState>((set) => ({
  currentWalk: null,
  walks: [],
  startWalk: () =>
    set({
      currentWalk: {
        id: Date.now().toString(),
        startTime: new Date(),
        path: [],
        poops: 0,
        encounters: [],
      },
    }),
  endWalk: () =>
    set((state) => {
      if (state.currentWalk) {
        return {
          walks: [...state.walks, state.currentWalk],
          currentWalk: null,
        }
      }
      return state
    }),
  addPathPoint: (point) =>
    set((state) => ({
      currentWalk: state.currentWalk
        ? { ...state.currentWalk, path: [...state.currentWalk.path, point] }
        : null,
    })),
  addPoop: () =>
    set((state) => ({
      currentWalk: state.currentWalk
        ? { ...state.currentWalk, poops: state.currentWalk.poops + 1 }
        : null,
    })),
  addEncounter: (dogId) =>
    set((state) => ({
      currentWalk: state.currentWalk
        ? {
            ...state.currentWalk,
            encounters: [...state.currentWalk.encounters, dogId],
          }
        : null,
    })),
}))

