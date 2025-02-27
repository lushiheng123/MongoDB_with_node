import React, { useEffect, useState } from "react";
import axios from "axios";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    title: "",
    reps: "",
    load: "",
  });
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:5051/");
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5051/api/workouts/${id}`);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleUpdate = async (id) => {
    const updatedWorkout = { ...editingWorkout };
    try {
      await axios.patch(
        `http://localhost:5051/api/workouts/${id}`,
        updatedWorkout
      );
      setWorkouts(
        workouts.map((workout) =>
          workout._id === id ? updatedWorkout : workout
        )
      );
      setEditingWorkout(null);
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5051/api/workouts",
        newWorkout
      );
      setWorkouts([...workouts, response.data]);
      setNewWorkout({ title: "", reps: "", load: "" });
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <div>
      <h1>Workouts</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <h2>{workout.title}</h2>
            <p>Reps: {workout.reps}</p>
            <p>Load: {workout.load} kg</p>
            <button onClick={() => handleDelete(workout._id)}>Delete</button>
            <button onClick={() => setEditingWorkout(workout)}>Update</button>
          </li>
        ))}
      </ul>
      <h2>Add New Workout</h2>
      <input
        type="text"
        placeholder="Title"
        value={newWorkout.title}
        onChange={(e) =>
          setNewWorkout({ ...newWorkout, title: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Reps"
        value={newWorkout.reps}
        onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
      />
      <input
        type="number"
        placeholder="Load (kg)"
        value={newWorkout.load}
        onChange={(e) => setNewWorkout({ ...newWorkout, load: e.target.value })}
      />
      <button onClick={handleAdd}>Add Workout</button>

      {editingWorkout && (
        <div>
          <h2>Edit Workout</h2>
          <input
            type="text"
            placeholder="Title"
            value={editingWorkout.title}
            onChange={(e) =>
              setEditingWorkout({ ...editingWorkout, title: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Reps"
            value={editingWorkout.reps}
            onChange={(e) =>
              setEditingWorkout({ ...editingWorkout, reps: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Load (kg)"
            value={editingWorkout.load}
            onChange={(e) =>
              setEditingWorkout({ ...editingWorkout, load: e.target.value })
            }
          />
          <button onClick={() => handleUpdate(editingWorkout._id)}>Save</button>
          <button onClick={() => setEditingWorkout(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Workouts;
