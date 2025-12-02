import Icon from "@/components/icon";
import { Article } from "@/types/article";
import { formatDate } from "@/utils/format-date";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";

interface PostCardProps {
  isPopular?: boolean;
  article: Article;
}

export default function PostCard({ isPopular, article }: PostCardProps) {
  const { title, id, writer, createdAt, likeCount, image } = article;
  const formattedDate = formatDate(createdAt);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/boards/${id}`);
  };
  return (
    <div
      onClick={handleClick}
      className={clsx(
        "flex w-full cursor-pointer flex-col gap-3 rounded-[20px] border border-border-primary bg-background-primary tablet:h-44",
        isPopular
          ? "h-[177px] justify-between p-5 tablet:max-w-none desktop:h-[206px] desktop:w-full desktop:px-5 desktop:py-6"
          : "h-[140px] justify-around p-4 tablet:h-[156px] tablet:w-[620px] tablet:px-6 tablet:py-5 desktop:w-full desktop:max-w-[529px]"
      )}
    >
      {isPopular && (
        <div className="flex h-[30px] w-[72px] items-center justify-center rounded-full bg-background-secondary px-1 py-1.5 text-md-b text-brand-primary">
          <Icon name="best" />
          인기
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div
          className={clsx(
            "flex w-[308px] justify-between",
            isPopular
              ? "tablet:h-[67px] tablet:w-[264px] desktop:w-full desktop:max-w-[310px]"
              : "tablet:h-[88px] tablet:w-[572px] desktop:w-full desktop:max-w-[481px]"
          )}
        >
          <div
            className={clsx(
              "flex flex-col gap-2",
              isPopular
                ? "w-[244px] tablet:w-52 desktop:w-[242px]"
                : "w-[228px] tablet:w-[360px]"
            )}
          >
            <h3 className="line-clamp-1 text-lg-b tablet:text-2lg-b">
              {title}
            </h3>
          </div>
          {image && (
            <div
              className={clsx(
                "relative shrink-0",
                isPopular
                  ? "h-12 w-12 desktop:h-[60px] desktop:w-[60px]"
                  : "h-20 w-20 tablet:w-[88px] desktop:h-[88px]"
              )}
            >
              <Image src={image} alt="썸네일" fill className="rounded-lg" />
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(
          "flex h-4 w-[308px] items-center justify-between",
          isPopular
            ? "tablet:w-[264px] desktop:w-full desktop:max-w-[310px]"
            : "tablet:w-[572px] desktop:w-full desktop:max-w-[481px]"
        )}
      >
        <div>
          <span className="text-sm-m">{writer.nickname}</span>
          <div className="mx-2 inline-block h-3 -translate-y-[0.05rem] border-l border-slate-700 align-middle" />
          <span className="text-sm-m text-slate-400">{formattedDate}</span>
        </div>
        <span className="flex items-center text-sm-m text-slate-400">
          <span className="mt-[3px] mr-1 inline-block">
            <Icon name="heart" size="small" color="white" />
          </span>
          {likeCount}
        </span>
      </div>
    </div>
  );
}
