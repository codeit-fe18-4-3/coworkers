import { openDeleteAlert } from "@/components/modal/DeleteAlert";
import clsx from "clsx";
import { useTaskCommentMutation } from "../query/use-comment-mutation";
import { CommentModel } from "./CommentItem";
import CommentList from "./CommentList";
import CommentPost from "./CommentPost";
import { useUserQuery } from "@/features/user/query";

interface CommentSectionProps {
  comments: CommentModel[];
  onSubmit?: (content: string) => void;
  onEdit?: (commentId: number, newContent: string) => void;
  onDelete?: (commentId: number) => void;
  taskId?: number;
  className?: string;
  horizontalPadding?: number;
}

export default function CommentSection({
  comments,
  onSubmit,
  onEdit,
  onDelete,
  taskId,
  className,
  horizontalPadding,
}: CommentSectionProps) {
  return taskId ? (
    <TaskCommentSection
      comments={comments}
      taskId={taskId}
      className={className}
      horizontalPadding={horizontalPadding}
    />
  ) : (
    <ArticleCommentSection
      comments={comments}
      onSubmit={onSubmit!}
      onEdit={onEdit!}
      onDelete={onDelete!}
      className={className}
      horizontalPadding={horizontalPadding}
    />
  );
}

function TaskCommentSection({
  comments,
  taskId,
  className,
  horizontalPadding,
}: {
  comments: CommentModel[];
  taskId: number;
  className?: string;
  horizontalPadding?: number;
}) {
  const {
    postMutation,
    patchMutation: { mutate: patchCommentMutate },
    deleteMutation,
  } = useTaskCommentMutation({ taskId });

  const handleEditComment = (
    commentId: number,
    editContent: string,
    onSuccess?: () => void
  ) => {
    patchCommentMutate(
      { taskId, commentId, content: editContent },
      { onSuccess }
    );
  };

  const handleDeleteComment = (commentId: number) => {
    openDeleteAlert({
      title: `댓글을 정말 삭제하시겠어요?`,
      onDelete: () => {
        deleteMutation.mutate({ taskId, commentId });
      },
    });
  };

  const handleSubmit = (content: string, onSuccess?: () => void) => {
    postMutation.mutate({ taskId, content: content.trim() }, { onSuccess });
  };

  return (
    <section className={clsx("flex flex-col gap-4", className)}>
      <h2
        className="tabelt:text-2xl-b text-lg-b"
        style={{
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
        }}
      >
        댓글<span className="ml-1 text-brand-primary">{comments.length}</span>
      </h2>
      <CommentPost
        onSubmit={handleSubmit}
        submitOnSuccess={true}
        isPending={postMutation.isPending}
        horizontalPadding={horizontalPadding}
      />
      <CommentList
        comments={comments}
        onEdit={handleEditComment}
        editOnSuccess={true}
        onDelete={handleDeleteComment}
        horizontalPadding={horizontalPadding}
      />
    </section>
  );
}

function ArticleCommentSection({
  comments,
  onSubmit,
  onEdit,
  onDelete,
  className,
  horizontalPadding,
}: CommentSectionProps) {
  const handleDeleteComment = (commentId: number) => {
    openDeleteAlert({
      title: `댓글을 정말 삭제하시겠어요?`,
      onDelete: () => onDelete?.(commentId),
    });
  };

  return (
    <section className={clsx("flex flex-col gap-4", className)}>
      <h2
        className="tabelt:text-2xl-b text-lg-b"
        style={{
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
        }}
      >
        댓글<span className="ml-1 text-brand-primary">{comments.length}</span>
      </h2>
      <CommentPost
        onSubmit={onSubmit}
        submitOnSuccess={false}
        isPending={false}
        horizontalPadding={horizontalPadding}
      />
      <CommentList
        comments={comments}
        onEdit={onEdit}
        editOnSuccess={false}
        onDelete={handleDeleteComment}
        horizontalPadding={horizontalPadding}
      />
    </section>
  );
}
