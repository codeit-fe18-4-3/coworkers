import { CommentItem, CommentPost } from "@/features/comment/components";
import { CommentItemProps } from "@/features/comment/components/CommentItem";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CommentItem> = {
  title: "Components/Comment",
  component: CommentItem,
};

export default meta;

type Story = StoryObj<typeof CommentItem>;

const baseProps: CommentItemProps = {
  commentId: 1,
  userId: 1,
  name: "홍길동",
  profileImageUrl: "",
  content: "댓글 내용입니다.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  horizontalPadding: 20,
  editOnSuccess: false,
};

export const Item: Story = {
  args: {
    ...baseProps,
  },
};

export const Post: StoryObj<typeof CommentPost> = {
  render: () => (
    <div className="w-[600px]">
      <CommentPost
        horizontalPadding={20}
        onSubmit={(text) => alert("제출됨: " + text)}
        isPending={false}
        submitOnSuccess={false}
      />
    </div>
  ),
};
