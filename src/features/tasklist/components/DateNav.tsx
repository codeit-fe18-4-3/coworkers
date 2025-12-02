import Icon from "@/components/icon";

interface DateNavProps {
  selectedDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onCalendarOpen?: () => void;
}

export default function DateNav({
  selectedDate,
  onPrev,
  onNext,
  onCalendarOpen,
}: DateNavProps) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-sm-m text-text-primary tablet:text-lg-m">
        {year}년 {month}월
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          aria-label="이전 달 이동"
          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-state-200 hover:bg-gray-50"
        >
          <Icon name="chevronLeft" size="small" color="none" />
        </button>

        <button
          onClick={onNext}
          aria-label="다음 달 이동"
          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-state-200 hover:bg-gray-50"
        >
          <Icon name="chevronRight" size="small" color="none" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCalendarOpen?.();
          }}
          aria-label="날짜 선택창 열기"
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-background-secondary hover:bg-gray-300"
        >
          <Icon name="calendar" size="small" color="icon-primary" />
        </button>
      </div>
    </div>
  );
}
