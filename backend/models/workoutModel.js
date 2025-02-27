import mongoose from "mongoose";
const Schema = mongoose.Schema;
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    reps: {
      type: Number,
      require: true,
    },
    load: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
const Workout = mongoose.model("Workout", workoutSchema);
export { Workout };
