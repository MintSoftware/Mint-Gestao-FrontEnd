import { create } from 'zustand';

type Store = {
    visible: boolean
    setVisible: () => void
  }

const useStore = create<Store>()((set) => ({
    visible: true,
    setVisible: () => set((state : any) => ({ visible: !state.visible })),
}));