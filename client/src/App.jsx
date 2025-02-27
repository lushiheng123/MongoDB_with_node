import React, { useEffect, useState } from "react";
import axios from "axios";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

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

  return (
    <div>
      <h1>Workouts</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <h2>{workout.title}</h2>
            <p>Reps: {workout.reps}</p>
            <p>Load: {workout.load} kg</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
