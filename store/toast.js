import { create } from 'zustand'

export const useStoreToast = create((set)=>({
    toastDetails: null,
    setShowToast: (detail, summary=null, severity='success', life=3000) => set({ toastDetails: {severity, summary, detail, life: life} }),
}))
