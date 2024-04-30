import { useState, useEffect } from "react";
import axios from "axios";
import { createUrl } from "../utils/Utils";
import PropTypes from "prop-types";

const TaskList = ({ userId }) => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = createUrl(`todo/getTasksById/${userId}`);
                const response = await axios.get(apiUrl);
                setTasks(response.data.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchData();
    }, [userId]); // Fetch data whenever the userId changes

    const handleDelete = async (taskId) => {
        try {
            const apiUrl = createUrl(`todo/deleteTask/${taskId}`);
            await axios.delete(apiUrl);
            setTasks(tasks.filter((task) => task.TaskID !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEdit = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.TaskID === taskId ? { ...task, isEditing: !task.isEditing } : task
            )
        );
    };

    const handleInputChange = (taskId, fieldName, value) => {
        // Update the corresponding field of the task being edited
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.TaskID === taskId ? { ...task, [fieldName]: value } : task
            )
        );
    };

    const handleSave = async (taskId) => {
        try {
            // Find the task that is being edited
            const taskToEdit = tasks.find((task) => task.TaskID === taskId);
            if (!taskToEdit) return;

            // Send a PUT request to update the task on the backend
            const apiUrl = createUrl(`todo/editTask/${taskId}`);
            await axios.put(apiUrl, {
                taskName: taskToEdit.TaskName,
                description: taskToEdit.Description,
                dueDate: taskToEdit.DueDate,
                completed: taskToEdit.Completed
            });

            // Set isEditing to false after saving
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.TaskID === taskId ? { ...task, isEditing: false } : task
                )
            );
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const handleCancel = (taskId) => {
        // Find the original task data before editing
        const originalTask = tasks.find((task) => task.TaskID === taskId);

        // Reset the task fields to their original values
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.TaskID === taskId ? { ...originalTask, isEditing: false } : task
            )
        );
    };

    // Filter tasks based on the search term
    const filteredTasks = tasks.filter((task) =>
        task.TaskName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-5">
            <div className="d-flex justify-content-center">
                <h1>Task List</h1>

            </div>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by task name"
                    className="form-control m-3"
                />
            </div>

            <ul className="list-group m-3">
                {filteredTasks.map((task, index) => (
                    <li className={`list-group-item rounded ${index !== 0 ? 'mt-3' : ''}`} key={task.TaskID}>
                        <div>
                            {task.isEditing ? (
                                <div>
                                    <input
                                        type="text"
                                        value={task.TaskName}
                                        onChange={(e) => handleInputChange(task.TaskID, 'TaskName', e.target.value)}
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="text"
                                        value={task.Description}
                                        onChange={(e) => handleInputChange(task.TaskID, 'Description', e.target.value)}
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="date"
                                        value={task.DueDate}
                                        onChange={(e) => handleInputChange(task.TaskID, 'DueDate', e.target.value)}
                                        className="form-control mb-2"
                                    />
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            checked={task.Completed}
                                            onChange={(e) => handleInputChange(task.TaskID, 'Completed', e.target.checked)}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Completed</label>
                                    </div>
                                    <button className="btn btn-primary mx-2" onClick={() => handleSave(task.TaskID)}>Save</button>
                                    <button className="btn btn-secondary mx-2" onClick={() => handleCancel(task.TaskID)}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <h3>{task.TaskName}</h3>
                                    <p>{task.Description}</p>
                                    <p>Due Date: {new Date(task.DueDate).toLocaleDateString()}</p>
                                    <p>Completed: {task.Completed ? "Yes" : "No"}</p>
                                </>
                            )}
                        </div>
                        {!task.isEditing && (
                            <div>
                                <button className="btn btn-primary mx-2" onClick={() => handleEdit(task.TaskID)}>
                                    {task.isEditing ? "Save" : "Edit"}
                                </button>
                                <button className="btn btn-danger mx-2" onClick={() => handleDelete(task.TaskID)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

TaskList.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default TaskList;
