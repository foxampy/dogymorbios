import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Dog {
  name: string
  breed: string
  birthdate?: string
  personalityTags: string[]
  avatarConfig: Record<string, any>
}

interface User {
  id: string
  humanName: string
  dogs: Dog[]
  bonesBalance: number
}

interface UserState {
  user: User | null
  isOnboarded: boolean
  setUser: (user: User) => void
  addDog: (dog: Dog) => void
  updateBonesBalance: (amount: number) => void
  completeOnboarding: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isOnboarded: false,
      setUser: (user) => set({ user }),
      addDog: (dog) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, dogs: [...state.user.dogs, dog] }
            : null,
        })),
      updateBonesBalance: (amount) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                bonesBalance: Math.max(0, state.user.bonesBalance + amount),
              }
            : null,
        })),
      completeOnboarding: () => set({ isOnboarded: true }),
    }),
    {
      name: 'dogymorbios-user-storage',
    }
  )
)

