import Icon from "@/components/icon";
import { FREQUENCY_LABEL } from "@/features/task/constants/task-frequency";
import {
  prefetchUserHistory,
  useUserHistoryQuery,
} from "@/features/user/query";
import { gsspPropsWithTokenReturn } from "@/libs/ssr/gssp-return";
import { gsspWithAuth } from "@/libs/ssr/with-auth";
import { TaskHistory } from "@/types/task";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const queryClient = new QueryClient();
  await prefetchUserHistory(queryClient, { accessToken });
  return gsspPropsWithTokenReturn({
    accessToken,
    dehydratedState: dehydrate(queryClient),
  });
});

export default function MyHistoryPage() {
  const { history } = useUserHistoryQuery();

  return (
    <div className="h-full bg-background-primary">
      <div className="h-full w-full max-w-7xl">
        <div className="flex flex-col gap-8 p-4 tablet:px-6 tablet:py-20 desktop:p-20">
          <header className="text-xl-b text-text-primary tablet:text-2xl-b">
            My History
          </header>
          <ul className="flex flex-col gap-4">
            {history &&
              history.map((item) => (
                <li key={item.id}>
                  <DoneTask task={item} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DoneTask({ task }: { task: TaskHistory }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl bg-background-secondary px-4 py-3.5">
      <div className="flex gap-2">
        <Icon name="checkboxCheck" size="small" />
        <span className="text-sm-r text-text-disabled line-through tablet:text-md-r">
          {task.name}
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2">
          <Icon name="calendar" size="large" />
          <span className="text-xs-r text-text-default">{task.doneAt}</span>
        </div>
        <div className="h-2 w-px border border-l-text-secondary" />
        <div className="flex items-center gap-2">
          <Icon name="repeat" size="large" color="transparent" />
          <span className="text-xs-r text-text-default">
            {FREQUENCY_LABEL[task.frequency]}
          </span>
        </div>
      </div>
    </div>
  );
}
