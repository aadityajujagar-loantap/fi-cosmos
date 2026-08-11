import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type DemoStore = {
  completedTaskIds: string[];
  selectedClientId: string;
  selectClient: (clientId: string) => void;
  toggleTask: (taskId: string) => void;
  resetDemo: () => void;
};

const initialState = {
  completedTaskIds: [],
  selectedClientId: 'client-001',
};

export const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      ...initialState,
      selectClient: (clientId) => set({ selectedClientId: clientId }),
      toggleTask: (taskId) =>
        set((state) => {
          const isCompleted = state.completedTaskIds.includes(taskId);

          return {
            completedTaskIds: isCompleted
              ? state.completedTaskIds.filter((id) => id !== taskId)
              : [...state.completedTaskIds, taskId],
          };
        }),
      resetDemo: () => set(initialState),
    }),
    {
      name: 'fi-iflow-demo-state',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ completedTaskIds, selectedClientId }) => ({
        completedTaskIds,
        selectedClientId,
      }),
    }
  )
);
