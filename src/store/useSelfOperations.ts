// src/store/useSelfOperations.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce, Draft } from 'immer';
import { SelfOperation } from '../types/Post';
import { usePostStats } from './usePostStats';
type SelfOperationsState = {
  operations: Record<string, SelfOperation>;
  setOperations: (data: Record<string, SelfOperation>) => void;
  toggleLike: (postId: string) => Promise<void>;
};


export const useSelfOperations = create<SelfOperationsState>()(
  devtools(
    (set, get) => ({
      operations: {},
      setOperations: (data) => set({ operations: data }),
      toggleLike: async (postId) => {
        const op = get().operations[postId];
        if (!op) return;

        const willLike = !op.liked;
        const delta = willLike ? 1 : -1;
        // 1. 乐观更新 selfOperation
        set(
          produce((draft: Draft<SelfOperationsState>) => {
            if (draft.operations[postId]) {
              draft.operations[postId].liked = willLike;
            }
          }),
        );
        // 2. 同步更新 likeNum
        usePostStats.getState().incrementLike(postId, delta);
      },
    }),
    { name: 'SelfOperations' },
  ),
);