import { FloatingButton } from "@/components/button";
import Icon from "@/components/icon";
import Select, { SelectOption } from "@/components/select";
import { getArticle } from "@/features/boards/api";
import BestPost from "@/features/boards/BestPost";
import PostCard from "@/features/boards/PostCard";
import SearchBar from "@/features/boards/SearchBar";
import { Article } from "@/types/article";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce, useIntersectionObserver } from "@uidotdev/usehooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ArticleOrderBy = "recent" | "like";

const PAGE_SIZE = 8;

const options: SelectOption[] = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
];

export default function BoardsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 300);
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    options[0]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["articles", debounceQuery, selectedOption.value],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        getArticle({
          page: pageParam,
          pageSize: PAGE_SIZE,
          orderBy: selectedOption.value as ArticleOrderBy,
          keyword: debounceQuery,
        }),
      getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.length * PAGE_SIZE;
        if (loaded >= lastPage.totalCount) return undefined;
        return allPages.length + 1;
      },
      refetchOnMount: "always",
    });

  const [observerRef, entry] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page...");
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const handleChange = (value: SelectOption) => {
    setSelectedOption(value);
  };

  const articles = data?.pages.flatMap((page) => page.list) ?? [];
  const isEmpty = articles.length === 0;

  return (
    <>
      <div className="desktop:max-w-7xl desktop:pr-9 desktop:pl-24">
        <section className="border-t border-border-primary tablet:border-t-0">
          <div className="mx-auto mt-[25px] mb-5 w-[343px] tablet:mt-[77px] tablet:mb-[29px] tablet:w-[620px] desktop:mt-[87px] desktop:w-full desktop:max-w-[1120px]">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </section>
        <BestPost />
        <section className="min-h-screen">
          <div className="relative mx-auto mt-7 flex w-[340px] flex-col gap-5 tablet:w-[620px] desktop:w-full desktop:max-w-[1074px]">
            <div className="flex items-center justify-between">
              <h2 className="text-2lg-b tablet:text-xl-b">전체</h2>
              <Select
                size="large"
                options={options}
                onChange={handleChange}
                value={selectedOption}
                className="h-10 w-[94px] tablet:h-11 tablet:w-[120px]"
              />
            </div>
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center gap-2 pt-25 text-lg-r text-text-default">
                <span>아직 게시글이 없습니다.</span>
                <span>자유롭게 글을 남겨주세요.</span>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4 desktop:grid desktop:grid-cols-2 desktop:gap-5">
                  {articles.map((post: Article) => (
                    <PostCard key={post.id} article={post} />
                  ))}
                </div>
                {isFetchingNextPage && (
                  <div className="mt-10 flex justify-center text-lg-r text-text-default">
                    로딩 중...
                  </div>
                )}
                <div ref={observerRef} className="h-20" />
              </>
            )}
          </div>

          <div className="sticky right-6 bottom-8 float-right -mr-5">
            <FloatingButton
              icon={<Icon name="pencil" />}
              onClick={() => router.push("/boards/new")}
            />
          </div>
        </section>
      </div>
    </>
  );
}
