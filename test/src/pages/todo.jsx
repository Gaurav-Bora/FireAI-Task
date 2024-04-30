
import AddTaskForm from "../components/addTaskForm";
import NavigationBar from "../components/navbar";
import TaskList from "../components/taskList";
import "../style/todo.css";

const Todo = () => {
    // Get userId from sessionStorage
    const userId = sessionStorage.getItem("userId");

    return (
        <div className="container-fluid full-page">
            <NavigationBar />
            <div className="container pb-5">
                <div className="d-flex justify-content-end">
                    <AddTaskForm />
                </div>

                <TaskList userId={userId ? parseInt(userId) : null} />
            </div>
        </div>
    );
};


export default Todo;
