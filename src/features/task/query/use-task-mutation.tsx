import { groupsQueryKey } from "@/features/group/query/query-key";
import { taskListQueryKey } from "@/features/tasklist/query/query-key";
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteTask,
  patchTask,
  PatchTaskParams,
  PatchTaskResult,
  postTask,
  PostTaskBody,
  PostTaskResult,
} from "../apis";
import { tasksQueryKey } from "./query-key";

interface TaskMutationProps
  extends Pick<
    MutationOptions<PatchTaskResult, Error, PatchTaskParams>,
    "onMutate" | "onSuccess" | "onError" | "onSettled"
  > {
  groupId: number;
  taskListId: number;
}

export function useTaskMutation({
  groupId,
  taskListId,
  ...options
}: TaskMutationProps) {
  const queryClient = useQueryClient();
  const handleMutationSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: tasksQueryKey({ groupId, taskListId }),
    });
    queryClient.invalidateQueries({
      queryKey: taskListQueryKey({ groupId, taskListId }),
    });
    queryClient.invalidateQueries({
      queryKey: groupsQueryKey({ groupId }),
    });
  };

  const postMutation = useMutation<PostTaskResult, Error, PostTaskBody>({
    mutationFn: (params) => postTask({ groupId, taskListId, params }),
    onSuccess: handleMutationSuccess,
  });

  const patchMutation = useMutation<PatchTaskResult, Error, PatchTaskParams>({
    mutationFn: (params) => patchTask({ groupId, taskListId, params }),
    onSuccess: handleMutationSuccess,
    ...options,
  });

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: (taskId) => deleteTask({ groupId, taskListId, taskId }),
    onSuccess: handleMutationSuccess,
  });

  return { postMutation, patchMutation, deleteMutation };
}
