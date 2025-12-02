import { FloatingButton } from "@/components/button";
import Icon from "@/components/icon";
import { openDeleteAlert } from "@/components/modal/DeleteAlert";
import TasksListItem from "@/features/task/components/TasksListItem";
import { useTaskMutation, useTasksQuery } from "@/features/task/query";
import { Task, TaskList } from "@/types/task";
import DateSelector from "../../tasklist/components/DateSelector";
import { openTaskCreateSheet } from "./TaskCreateSheet";
import { openTaskEditSheet } from "./TaskEditSheet";

interface Props {
  groupId: number;
  taskListId: number;
  selectedDate: Date;
  selectedTaskList?: TaskList;
  selectedTaskId?: number;
  onDateSelect: (date: Date) => void;
  onSelect: (task: Task) => void;
}

export default function TasksListContent({
  groupId,
  taskListId,
  selectedDate,
  selectedTaskList,
  selectedTaskId,
  onDateSelect,
  onSelect,
}: Props) {
  const { patchMutation, deleteMutation } = useTaskMutation({
    groupId,
    taskListId,
  });
  const { tasks } = useTasksQuery({
    groupId: groupId,
    taskListId: taskListId,
    date: selectedDate.toISOString(),
    enabled: !!taskListId,
  });

  const handleCheckboxClick = (task: Task) => {
    if (!groupId || !taskListId) return;
    patchMutation.mutate({
      taskId: task.id,
      done: !task.doneAt,
    });
  };

  const handleEditTask = (task: Task) => {
    if (!groupId || !taskListId) return;
    openTaskEditSheet({
      groupId,
      taskListId,
      taskId: task.id,
      initialData: {
        name: task.name,
        description: task.description,
        done: !!task.doneAt,
      },
    });
  };
  const handleDeleteTask = (task: Task) => {
    if (!groupId || !taskListId) return;
    openDeleteAlert({
      title: `'${task.name}'\n할 일을 정말 삭제하시겠어요?`,
      onDelete: () =>
        deleteMutation.mutate(task.id, { onSuccess: () => close() }),
    });
  };

  return (
    <section className="relative min-h-full flex-1 rounded-3xl bg-background-primary p-6">
      <div className="relative">
        {selectedTaskList ? (
          <h2 className="text-xl-b">{selectedTaskList.name}</h2>
        ) : (
          <button className="text-state-400">할 일을 입력해주세요</button>
        )}
      </div>

      <DateSelector selectedDate={selectedDate} onSelect={onDateSelect} />

      <TasksList
        tasks={tasks || []}
        selectedTaskId={selectedTaskId}
        onSelect={onSelect}
        onCheckboxClick={handleCheckboxClick}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <div className="fixed right-4 bottom-10 desktop:absolute desktop:top-[260px] desktop:-right-7">
        <FloatingButton
          icon={<Icon name="plus" size="medium" color="white" />}
          onClick={() => openTaskCreateSheet({ groupId, taskListId })}
        />
      </div>
    </section>
  );
}

function TasksList({
  tasks,
  selectedTaskId,
  onSelect,
  onCheckboxClick,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  selectedTaskId?: number;
  onSelect: (task: Task) => void;
  onCheckboxClick: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  return (
    <div className="mt-6 flex flex-col gap-3">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TasksListItem
            key={task.id}
            title={task.name}
            commentCount={task.commentCount}
            createdAt={task.date}
            frequency={task.frequency}
            isSelected={selectedTaskId === task.id}
            isDone={!!task.doneAt}
            onClick={() => onSelect(task)}
            onCheckboxClick={() => onCheckboxClick(task)}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task)}
          />
        ))
      ) : (
        <TasksListItem
          title="할 일을 달성하기 위한 체크리스트를 입력해주세요"
          commentCount={0}
          createdAt={new Date().toISOString()}
          frequency="DAILY"
          isEmpty
        />
      )}
    </div>
  );
}
