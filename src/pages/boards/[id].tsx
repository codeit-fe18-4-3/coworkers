import {
  deleteCommentById,
  deleteLikeById,
  getArticleById,
  getCommentById,
  patchCommentById,
  postCommentById,
  postLikeById,
} from "@/features/boards/api";
import { GetCommentResponse } from "@/features/boards/api/index";
import ArticleContent from "@/features/boards/article/ArticleContent";
import ArticleHeader from "@/features/boards/article/ArticleHeader";
import ArticleLikeButton from "@/features/boards/article/ArticleLikeButton";
import {
  prefetchArticle,
  prefetchComment,
} from "@/features/boards/query/prefetch-article";
import { CommentSection } from "@/features/comment/components";
import { prefetchUser, useUserQuery } from "@/features/user/query";
import {
  GSSP_NOT_FOUND_RETURN,
  gsspPropsWithTokenReturn,
} from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { Article } from "@/types/article";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/router";

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const params = context.params;
  const articleId = Number(params?.id);
  if (isNaN(articleId)) {
    return GSSP_NOT_FOUND_RETURN;
  }
  const queryClient = new QueryClient();
  try {
    await Promise.all([
      prefetchUser(queryClient, { accessToken }),
      prefetchArticle(queryClient, { articleId }),
      prefetchComment(queryClient, { articleId }),
    ]);
    return gsspPropsWithTokenReturn({
      props: { articleId },
      dehydratedState: dehydrate(queryClient),
      accessToken,
    });
  } catch (error) {
    console.log("prefetch 실패:", error);
    return GSSP_NOT_FOUND_RETURN;
  }
});

interface PageProps {
  articleId: number;
}

export default serverSideComponentWithAuth<PageProps>(({ articleId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUserQuery();
  const userImage = user?.image;
  const userId = user?.id;

  const { data: article } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId),
    refetchOnMount: "always",
  });

  const { data: comments } = useQuery({
    queryKey: ["comment", articleId],
    queryFn: () => getCommentById(articleId),
  });

  const postCommentMutation = useMutation({
    mutationFn: (data: { id: number; content: string }) =>
      postCommentById(articleId, { content: data.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", articleId] });
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  const patchCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => patchCommentById(commentId, { content }),
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["comment", articleId] });
      const prevComment = queryClient.getQueryData<GetCommentResponse>([
        "comment",
        articleId,
      ]);
      if (prevComment) {
        queryClient.setQueryData<GetCommentResponse>(["comment", articleId], {
          ...prevComment,
          list: prevComment.list.map((comment) =>
            comment.id === commentId ? { ...comment, content } : comment
          ),
        });
      }
      return { prevComment };
    },
    onError: (_error, _variables, context) => {
      if (context?.prevComment) {
        queryClient.setQueryData(["comment", articleId], context.prevComment);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", articleId] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteCommentById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", articleId] });
    },
    onError: (error) => {
      console.log("삭제 실패:", error);
    },
  });

  const likeMutation = useMutation({
    mutationFn: async ({
      articleId,
      isLiked,
    }: {
      articleId: number;
      isLiked: boolean | null;
    }) => (isLiked ? deleteLikeById(articleId) : postLikeById(articleId)),
    onMutate: async ({ isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ["article", articleId] });
      const prevArticle = queryClient.getQueryData<Article>([
        "article",
        articleId,
      ]);
      if (prevArticle) {
        queryClient.setQueryData<Article>(["article", articleId], {
          ...prevArticle,
          isLiked: !isLiked,
          likeCount: isLiked
            ? prevArticle.likeCount - 1
            : prevArticle.likeCount + 1,
        });
      }
      return { prevArticle };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (_error, _variables, context) => {
      if (context?.prevArticle) {
        queryClient.setQueryData(["article", articleId], context.prevArticle);
      }
    },
  });

  const handleToggleLike = () => {
    if (!article) return;
    if (article.isLiked === null) {
      router.push("/login");
      return;
    }
    likeMutation.mutate({
      articleId,
      isLiked: article.isLiked ?? false,
    });
  };

  const convertedComments =
    comments?.list.map((comment) => ({
      commentId: comment.id,
      userId: comment.writer.id,
      name: comment.writer.nickname,
      profileImageUrl: comment.writer.image,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    })) ?? [];

  return (
    <section className="min-h-screen w-full bg-background-secondary py-5 tablet:py-[68px]">
      <div className="relative mx-auto w-[343px] rounded-[20px] bg-background-primary tablet:w-[620px] desktop:mr-20 desktop:ml-[184px] desktop:w-auto desktop:max-w-[900px]">
        <div className="mx-auto w-[300px] pt-10 pb-10 tablet:w-[540px] tablet:pt-[54px] tablet:pb-[54px] desktop:mx-[60px] desktop:w-auto desktop:max-w-[780px]">
          {article && (
            <>
              <ArticleHeader currentUserId={userId} article={article} />
              <ArticleContent article={article} />
              <ArticleLikeButton
                likeCount={article?.likeCount}
                isLiked={article?.isLiked ?? false}
                onToggle={handleToggleLike}
              />
              <CommentSection
                comments={convertedComments}
                onSubmit={(content) =>
                  postCommentMutation.mutate({ id: articleId, content })
                }
                onEdit={(commentId, newContent) =>
                  patchCommentMutation.mutate({
                    commentId,
                    content: newContent,
                  })
                }
                onDelete={(commentId) =>
                  deleteCommentMutation.mutate(commentId)
                }
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
});
