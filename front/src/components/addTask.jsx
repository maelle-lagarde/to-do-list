import React, { useState } from "react";

export default function AddTask() {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/add-task', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: task }),
        });

        if (response.ok) {
            const data = await response.json();
            // Ajouter la nouvelle tâche à la liste
            setTaskList([...taskList, { id: data.id, description: task }]);
            setTask(""); // Réinitialiser l'input
            alert(data.message);
        } else {
            console.error("Erreur lors de l'ajout de la tâche:", response.statusText);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche:", error);
    };

    return (
        <div className="wrapper">
            <h2>My todo list</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" id="addtask-input" name="addtask-input" value={task} onChange={(e) => setTask(e.target.value)} placeholder="add a new task here" />
                <button type="submit">save</button>
            </form>
            <div className="results">
                {taskList.length > 0 ? (
                    <ul>
                        {taskList.map((task) => (
                            <li key={task.id}>{task.description}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks added yet</p>
                )}
            </div>
        </div>
    )
    }
}