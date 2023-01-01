import { useSelector } from "react-redux";
import { selectTaskList } from "../../store/taskReducer";
import EmtptyState from "../EmptyState/EmptyState";
import TaskDisplay from "../TasksList/TaskDisplay";

export default function LeftContainer() {
  const taskList = useSelector(selectTaskList);
  const isEmpty = taskList.length <= 0;

  return (
    <div className="bg-backgroundMain">
      <h2>Hello left</h2>

      {isEmpty && (
        <div className="flex items-center flex-col justify-center mx-auto">
          <EmtptyState />
        </div>
      )}

      <div>
        {taskList.map((item) => (
          <div key={item?.id}>
            <TaskDisplay
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
              id={item.id}
              isCompleted={item.isCompleted}
              isEdited={item.isEdited}
              lastEdited={item.lastEdited}
              priority={item.priority}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
