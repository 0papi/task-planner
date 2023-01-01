import { useModal } from "@geist-ui/core";
import { CreateNewModal } from "../../pages";

export default function EmtptyState() {
  const { setVisible, bindings } = useModal();
  return (
    <div className="w-[80%] h-full mt-14 flex items-center justify-center flex-col bg-white shadow-md p-4">
      <h2>No Tasks Added</h2>
      <p>You haven&apos;t created any tasks</p>
      <button
        className="bg-primary text-white py-2 px-6 rounded-xl"
        onClick={() => setVisible(true)}
      >
        Add New Task
      </button>

      <CreateNewModal bindings={bindings} setVisible={setVisible} />
    </div>
  );
}
