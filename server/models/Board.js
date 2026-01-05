import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    movies: {
      type: [Number], // movie IDs from frontend (dummyMovies)
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model("Board", boardSchema);

export default Board;