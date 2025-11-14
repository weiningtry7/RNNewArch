import { create } from 'zustand';
import { PostStat } from '../types/Post';
import { produce, Draft } from 'immer';

type PostStatsState = {
  stats: Record<string, PostStat>;
  setStats: (data: Record<string, PostStat>) => void;
  updateStat: (id: string, stat: Partial<PostStat>) => void;
  incrementLike: (id: string, delta: 1 | -1) => void;
};

export const usePostStats = create<PostStatsState>(set => ({
  stats: {},
  setStats: data => set({ stats: data }),
  incrementLike: (id, delta) =>
    set(
      produce((draft: Draft<PostStatsState>) => {
        const stat = draft.stats[id];
        if (stat) {
          stat.likeNum += delta;
        } else {
          draft.stats[id] = { likeNum: delta > 0 ? delta : 0 };
        }
      }),
    ),
  updateStat: (id, partial) =>
    set(
      produce((draft: Draft<PostStatsState>) => {
        if (draft.stats[id]) {
          Object.assign(draft.stats[id], partial);
        }
      }),
    ),
}));
