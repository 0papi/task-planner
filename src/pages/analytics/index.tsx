import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { pageClasses } from "../../utils/classes";

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className={`${pageClasses}`}>
        <h2>Analytics</h2>
      </div>
    </DashboardLayout>
  );
}
