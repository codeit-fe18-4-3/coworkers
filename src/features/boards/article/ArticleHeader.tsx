import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import EditDropdown from "@/components/dropdown/EditDropdown";
import Icon from "@/components/icon";
import { Alert } from "@/components/modal";
import { Article } from "@/types/article";
import { formatDate } from "@/utils/format-date";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";
import { useDeleteArticleMutation } from "../hooks/mutation";

interface ArticleHeaderProps {
  article: Article;
  currentUserId?: number;
}

export default function ArticleHeader({
  currentUserId,
  article,
}: ArticleHeaderProps) {
  const router = useRouter();
  const { id } = router.query;
  const { deleteArticleMutation } = useDeleteArticleMutation();

  const alertDeleteArticle = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <Alert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="게시글을 삭제하시겠어요?"
          allowsBackgroundDismiss={false}
          message={`삭제된 게시글은 다시 복구할 수 없습니다.`}
          actions={[
            <Button
              key="alert-close"
              variant="outlinedSecondary"
              title="닫기"
              onClick={close}
            />,
            <Button
              key="alert-action"
              variant="danger"
              title="삭제"
              onClick={() => {
                handleDeleteArticle();
                close();
              }}
            />,
          ]}
        />
      ),
      { overlayId: "delete-article-alert" }
    );
  };

  const handleDeleteArticle = () => {
    deleteArticleMutation?.mutate(Number(id));
  };

  return (
    <div className="flex flex-col gap-2 border-b border-b-border-primary">
      <div className="flex justify-between">
        <div className="text-2lg-b tablet:text-xl-b">{article?.title}</div>
        {article?.writer.id === currentUserId && (
          <button className="cursor-pointer">
            <EditDropdown
              anchor={<Icon name="dots" />}
              onEdit={() => router.push(`/boards/edit/${id}`)}
              onDelete={alertDeleteArticle}
              direction="bottom"
              alignment="right"
            />
          </button>
        )}
      </div>
      <div className="flex h-9 items-center gap-2">
        <Avatar size="small" />
        <div>
          <span className="text-xs-m text-text-primary tablet:text-md-m">
            {article?.writer.nickname}
          </span>
          <div className="mx-2 inline-block h-3 -translate-y-[0.05rem] border-l border-slate-700 align-middle" />
          <span className="text-xs-m text-slate-400 tablet:text-md-m">
            {formatDate(article?.createdAt ?? "")}
          </span>
        </div>
      </div>
    </div>
  );
}
