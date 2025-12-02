import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import EditDropdown from "@/components/dropdown/EditDropdown";
import Icon from "@/components/icon";
import { openDeleteAlert } from "@/components/modal/DeleteAlert";
import { CommentSection } from "@/features/comment/components";
import { useTaskCommentsQuery } from "@/features/comment/query/use-comment-query";
import { useResponsive } from "@/hooks/use-responsive";
import clsx from "clsx";
import { FREQUENCY_LABEL } from "../constants/task-frequency";
import { useTaskMutation, useTaskQuery } from "../query";
import { openTaskEditSheet } from "./TaskEditSheet";

interface Props {
  groupId: number;
  taskListId: number;
  taskId: number;
  close: () => void;
}

export function TaskDetail({ groupId, taskListId, taskId, close }: Props) {
  const { isTablet, isDesktop } = useResponsive();

  const { patchMutation, deleteMutation } = useTaskMutation({
    groupId,
    taskListId,
  });
  const { task } = useTaskQuery({
    groupId,
    taskListId,
    taskId,
    enabled: !!taskListId && !!taskId,
  });

  const { taskComments } = useTaskCommentsQuery({ taskId, enabled: !!taskId });

  if (!task) return null;

  const handleEditTaskDone = () => {
    patchMutation.mutate({
      taskId: taskId,
      done: !task.doneAt,
    });
  };

  const handleEditTask = () => {
    if (!groupId || !taskListId) return;
    openTaskEditSheet({
      groupId,
      taskListId,
      taskId,
      initialData: {
        name: task.name,
        description: task.description,
        done: !!task.doneAt,
      },
    });
  };
  const handleDeleteTask = () => {
    if (!groupId || !taskListId) return;
    openDeleteAlert({
      title: `'${task.name}'\n할 일을 정말 삭제하시겠어요?`,
      onDelete: () =>
        deleteMutation.mutate(task.id, { onSuccess: () => close() }),
    });
  };

  const comments = taskComments?.map((comment) => ({
    commentId: comment.id,
    userId: comment.userId,
    name: comment.user.nickname,
    profileImageUrl: comment.user.image,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  }));

  return (
    <>
      <div className="px-4 py-3 tablet:px-7 tablet:py-10 desktop:py-10">
        <button
          onClick={close}
          className="mb-5 cursor-pointer tablet:mb-[74px]"
        >
          <Icon name="xmark" size="large" />
        </button>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <header className="flex w-full justify-between">
              <div className="flex items-center gap-3">
                <h2
                  className={clsx(
                    "text-xl-b tablet:text-2xl-b",
                    task.doneAt && "text-text-default line-through"
                  )}
                >
                  {task.name}
                </h2>
                {task.doneAt && (
                  <span className="rounded-lg bg-brand-secondary px-2.5 py-1.5 text-md-b text-brand-primary">
                    완료
                  </span>
                )}
              </div>

              <EditDropdown
                anchor={
                  <div
                    role="button"
                    aria-label="할일 설정 열기"
                    className="cursor-pointer"
                  >
                    <Icon name="dots" size="small" />
                  </div>
                }
                alignment="right"
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </header>

            <div className="flex items-center gap-3">
              <Avatar size="medium" source={task.writer.image ?? ""} />
              <p className="text-md-m">{task.writer.nickname}</p>
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-2">
                <p className="flex gap-1.5">
                  <Icon name="calendar" />
                  <span className="text-xs-r text-text-default">시작 날짜</span>
                  <span className="ml-6 text-xs-r">
                    {new Date(task.date).toLocaleDateString("ko-KR")}
                  </span>
                </p>
                <p className="flex gap-1.5">
                  <Icon name="repeat" color="transparent" />
                  <span className="text-xs-r text-text-default">반복 설정</span>
                  <span className="ml-6 text-xs-r">
                    {FREQUENCY_LABEL[task.frequency]}
                  </span>
                </p>
              </div>

              <Button
                iconName={task.doneAt ? "checkPrimary" : "checkCompact"}
                iconCustomColor="transparent"
                variant={task.doneAt ? "outlinedPrimary" : "primary"}
                title={task.doneAt ? "완료 취소하기" : "완료하기"}
                size="medium"
                isFullWidth={false}
                rounded
                className="fixed right-5 bottom-[30px] tablet:relative tablet:right-0 tablet:bottom-0"
                onClick={handleEditTaskDone}
              />
            </div>
          </div>

          <div className="h-px bg-border-primary" />

          <article
            className={clsx("w-full", !task.description && "text-text-default")}
          >
            {task.description || "등록된 설명이 없습니다."}
          </article>
        </section>
      </div>

      <CommentSection
        comments={comments ?? []}
        taskId={taskId}
        horizontalPadding={isDesktop ? 40 : isTablet ? 28 : 16}
        className="py-7 tablet:py-4"
      />
    </>
  );
}
