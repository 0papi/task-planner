import InsightCard from "../../components/InsightCard/InsightCard";
import { useSelector } from "react-redux";
import { selectTaskList } from "../../store/taskReducer";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { pageClasses } from "../../utils/classes";

export default function Analytics() {
  const allTasks = useSelector(selectTaskList);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((task) => task.isCompleted).length;
  const uncompletedTasks = allTasks.filter(
    (task) => task.isCompleted === false
  ).length;

  return (
    <DashboardLayout>
      <div className={`${pageClasses}`}>
        <h2>Analytics</h2>

        <div className="grid grid-cols-3 bg-">
          <InsightCard title="Total Tasks" type="total" value={totalTasks} />
          <InsightCard
            title="Completed Tasks"
            type="completed"
            value={completedTasks}
          />
          <InsightCard
            title="Uncompleted Tasks"
            type="uncompleted"
            value={uncompletedTasks}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
