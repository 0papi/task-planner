import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectTaskList } from "../../store/taskReducer";
import EmtptyState from "../EmptyState/EmptyState";
import TaskDisplay from "../TasksList/TaskDisplay";

interface IMainTaskPageProps {
  searchTerm: string;
}

export default function LeftContainer({ searchTerm }: IMainTaskPageProps) {
  const taskList = useSelector(selectTaskList);
  const filteredJobs = useMemo(
    () =>
      taskList.filter((task) =>
        task.title
          .trim()
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      ),
    [searchTerm, taskList]
  );
  const isEmpty = filteredJobs.length <= 0;

  return (
    <div className="bg-backgroundMain">
      {isEmpty && (
        <div>
          {searchTerm.length === 0 ? (
            <div className="flex items-center flex-col justify-center mx-auto">
              <EmtptyState />
            </div>
          ) : (
            <h2>No search results for term: {searchTerm}</h2>
          )}
        </div>
      )}

      <div>
        {filteredJobs.map((item) => (
          <div key={item?.id}>
            <TaskDisplay
              title={item?.title}
              content={item?.content}
              createdAt={item?.createdAt}
              id={item?.id}
              isCompleted={item?.isCompleted}
              isEdited={item?.isEdited}
              lastEdited={item?.lastEdited}
              priority={item?.priority}
              description={item?.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
