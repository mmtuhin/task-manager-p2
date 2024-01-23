import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Dive into the world of web development with React, a powerful JavaScript library for building user interfaces.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  //console.log(showModal);
  const handleAddTask = (newTask, isAdd) => {
    console.log("Adding a Task....", newTask);
    // console.log(showModal);
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowModal(false);
  };
  const handlEditTask = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };
  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <AddTaskModal onSave={handleAddTask} taskToUpdate={taskToUpdate} />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onAddClick={() => setShowModal(true)} />
          <TaskList tasks={tasks} onEdit={handlEditTask} />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
