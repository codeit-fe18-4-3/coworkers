import PageController from "@/components/pageController/PageController";
import { useResponsive } from "@/hooks/use-responsive";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getArticle } from "./api";
import PostCard from "./PostCard";

export default function BestPost() {
  const { isTablet, isDesktop } = useResponsive();
  const cardPerPage = isDesktop ? 3 : isTablet ? 2 : 1;
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["articles", "best"],
    queryFn: () => getArticle({ page: 1, pageSize: 12, orderBy: "like" }),
    placeholderData: keepPreviousData,
  });

  const articles = data?.list ?? [];
  const maxLike = Math.max(
    ...articles.map((article) => article.likeCount ?? 0),
    0
  );
  const isEmptyBest = maxLike === 0;
  const bestArticles = articles.filter(
    (article) => (article.likeCount ?? 0) > 0
  );

  const totalPages = Math.ceil(bestArticles.length / cardPerPage);
  const safePage = page > totalPages ? Math.max(totalPages, 1) : page;

  const start = (safePage - 1) * cardPerPage;
  const visiblePage = bestArticles.slice(start, start + cardPerPage) ?? [];

  return (
    <section className="mx-auto desktop:w-full desktop:max-w-[1120px]">
      <div className="h-[314px] w-full bg-background-secondary tablet:h-[326px] desktop:mx-auto desktop:h-[370px] desktop:w-full desktop:max-w-[1120px] desktop:rounded-[20px] desktop:px-6">
        <div className="mx-auto flex h-[218px] w-[340px] flex-col gap-5 pt-[27px] tablet:h-[221px] tablet:w-[620px] desktop:w-full desktop:max-w-[1074px]">
          <h1 className="text-2lg-b tablet:text-xl-b">베스트 게시글</h1>
          {isEmptyBest ? (
            <div className="flex items-end justify-center pt-25 text-lg-r text-text-default">
              아직 베스트 게시글이 없습니다.
            </div>
          ) : (
            <>
              <div className="flex gap-3 desktop:w-full desktop:max-w-[1074px]">
                {visiblePage?.map((post) => (
                  <div key={post.id} className="min-w-0 flex-1">
                    <PostCard article={post} isPopular={true} />
                  </div>
                ))}
              </div>
              <PageController
                page={safePage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
