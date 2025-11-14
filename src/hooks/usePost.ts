// usePost.ts
import { usePostStats } from '../store/usePostStats';
import { useSelfOperations } from '../store/useSelfOperations';

export const usePost = (postId: string) => {
  const stat = usePostStats(s => s.stats[postId]);
  const op = useSelfOperations(s => s.operations[postId]);
  const toggleLike = useSelfOperations(s => s.toggleLike);

  return {
    likeNum: stat?.likeNum ?? 0,
    liked: op?.liked ?? false,
    toggleLike: () => toggleLike(postId),
  };
};