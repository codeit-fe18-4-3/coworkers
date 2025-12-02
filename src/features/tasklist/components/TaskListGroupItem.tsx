import DoneBadge from "@/components/badge/DoneBadge";
import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import { TaskList } from "@/types/task";
import clsx from "clsx";
import TaskListEditDropdown from "./TaskListEditDropdown";

interface Props {
  taskList?: TaskList;
  onClick?: () => void;
}

export default function TaskListGroupItem({ taskList, onClick }: Props) {
  const { isDesktop } = useResponsive();
  const totalCount = taskList?.tasks.length ?? 0;
  const doneCount = taskList?.tasks.filter((task) => task.doneAt).length ?? 0;

  return (
    <div
      className={clsx(
        "flex items-center justify-start",
        isDesktop &&
          "h-[54px] cursor-pointer rounded-xl border border-border-primary bg-background-primary pr-3 pl-5"
      )}
      onClick={onClick}
    >
      <span className="text-sm-s desktop:text-md-s">
        {taskList?.name ?? "제목 없음"}
      </span>
      <div className="desktop:ml-auto">
        <DoneBadge current={doneCount} total={totalCount} size="small" />
      </div>
      {isDesktop && taskList && (
        <TaskListEditDropdown
          taskList={taskList}
          anchor={
            <div
              role="button"
              aria-label="댓글 설정 열기"
              className="cursor-pointer py-1.5"
            >
              <Icon name="dots" size="large" />
            </div>
          }
        />
      )}
    </div>
  );
}
