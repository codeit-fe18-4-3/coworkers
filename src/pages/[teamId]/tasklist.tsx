import { prefetchGroup, useGroupQuery } from "@/features/group/query";
import { TaskDetail } from "@/features/task/components/TaskDetail";
import TasksListContent from "@/features/task/components/TasksListContent";
import TaskListGroup from "@/features/tasklist/components/TaskListGroup";
import TeamHeader from "@/features/tasklist/components/TeamHeader";
import { useTaskListQuery } from "@/features/tasklist/query/use-task-list-query";
import { useResponsive } from "@/hooks/use-responsive";
import {
  GSSP_NOT_FOUND_RETURN,
  gsspPropsWithTokenReturn,
} from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Task } from "@/types/task";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface PageProps {
  groupId: number;
  taskListId: number;
}

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const groupId = Number(context.params?.teamId);
  const taskListId = Number(context.query.id);
  if (isNaN(groupId) || isNaN(taskListId)) {
    return GSSP_NOT_FOUND_RETURN;
  }

  const queryClient = new QueryClient();
  await prefetchGroup(queryClient, { groupId, accessToken });

  return gsspPropsWithTokenReturn({
    props: { groupId, taskListId },
    accessToken,
    dehydratedState: dehydrate(queryClient),
  });
});

export default serverSideComponentWithAuth<PageProps>(
  ({ groupId, taskListId }) => {
    const { isDesktop, isMobile } = useResponsive();
    const { setFold } = useSidebarStore();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTaskListId, setSelectedTaskListId] = useState(taskListId);
    const [selectedTaskId, setSelectedTaskId] = useState<number>();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panelWidth, setPanelWidth] = useState(520);

    const { group } = useGroupQuery({ groupId });
    const { taskList: selectedTaskList } = useTaskListQuery({
      groupId,
      taskListId: selectedTaskListId,
    });

    if (!group || !selectedTaskList) {
      return <div>Loading...</div>;
    }

    const handleCloseDetailPanel = () => {
      setIsPanelOpen(false);
      setFold(false);
    };

    const handleTaskSelect = (task: Task) => {
      setSelectedTaskId(task.id);
      setIsPanelOpen(true);
      setFold(true);
    };

    const handleTaskListSelect = (taskListId: number) => {
      setSelectedTaskListId(taskListId);

      const task = group.taskLists.find((task) => task.id === taskListId);
      if (!task) {
        handleCloseDetailPanel();
        return;
      }

      const selectedDateKey = selectedDate.toISOString().slice(0, 10);
      const firstTodo = (task.tasks ?? []).find(
        (todo) => todo.date.slice(0, 10) === selectedDateKey
      );

      if (isPanelOpen && firstTodo) {
        setSelectedTaskId(firstTodo.id);
        setIsPanelOpen(true);
        setFold(true);
      } else {
        handleCloseDetailPanel();
      }
    };

    const handleResizeStart = () => {
      if (!isDesktop) return;
      document.addEventListener("mousemove", handleResizing);
      document.addEventListener("mouseup", handleResizeEnd);
    };

    const handleResizing = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX;
      const clamped = Math.min(Math.max(newWidth, 520), 780);
      setPanelWidth(clamped);
    };

    const handleResizeEnd = () => {
      document.removeEventListener("mousemove", handleResizing);
      document.removeEventListener("mouseup", handleResizeEnd);
    };

    return (
      <div className="flex h-dvh flex-col overflow-x-hidden bg-background-secondary p-4 tablet:px-[26px] tablet:py-[70px] desktop:px-[84px] desktop:py-[120px]">
        <div className="flex max-w-[1120px] flex-1 flex-col gap-5 tablet:gap-10 desktop:min-w-[780px] desktop:gap-7">
          <TeamHeader group={group} isAdmin />
          <div className="flex flex-1 flex-col gap-[22px] tablet:gap-7 desktop:flex-row desktop:gap-6">
            <TaskListGroup
              groupId={group.id}
              taskLists={group.taskLists}
              selectedTaskListId={selectedTaskListId}
              onSelect={handleTaskListSelect}
            />
            <TasksListContent
              groupId={groupId}
              taskListId={taskListId}
              selectedDate={selectedDate}
              selectedTaskList={selectedTaskList}
              selectedTaskId={selectedTaskId}
              onDateSelect={setSelectedDate}
              onSelect={handleTaskSelect}
            />
          </div>
        </div>

        <AnimatePresence>
          {isPanelOpen && selectedTaskId && (
            <motion.div
              key="todo-detail-panel"
              initial={{ x: panelWidth }}
              animate={{
                x: 0,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              exit={{
                x: panelWidth,
                opacity: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
              className="fixed top-[52px] right-0 h-[calc(100dvh-52px)] overflow-y-auto bg-background-primary shadow-2xl tablet:top-0 tablet:h-full"
              style={{ width: isMobile ? "100%" : panelWidth }}
            >
              {isDesktop && (
                <div
                  className="absolute top-0 left-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-border-primary/20"
                  onMouseDown={handleResizeStart}
                />
              )}

              <TaskDetail
                groupId={group.id}
                taskListId={selectedTaskList.id}
                taskId={selectedTaskId}
                close={handleCloseDetailPanel}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
