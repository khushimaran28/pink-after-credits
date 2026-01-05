import express from "express";
import Board from "../models/Board.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/**
 * @route   POST /api/boards
 * @desc    Create a new board
 * @access  Protected
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Board title is required",
      });
    }

    const newBoard = new Board({
      userId: req.user.id,
      title,
      description: description || "",
    });

    await newBoard.save();

    res.status(201).json(newBoard);
  } catch (error) {
    console.error("Create board error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/**
 * @route   GET /api/boards
 * @desc    Get all boards for logged-in user
 * @access  Protected
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(boards);
  } catch (error) {
    console.error("Fetch boards error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/**
 * @route   DELETE /api/boards/:id
 * @desc    Delete a board
 * @access  Protected
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    await board.deleteOne();

    res.json({
      message: "Board deleted successfully",
    });
  } catch (error) {
    console.error("Delete board error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/**
 * @route   PUT /api/boards/:id
 * @desc    Rename a board
 * @access  Protected
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const board = await Board.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    board.title = title;
    await board.save();

    res.json(board);
  } catch (error) {
    console.error("Rename board error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/**
 * @route   POST /api/boards/:id/movies
 * @desc    Add movie to board
 * @access  Protected
 */
router.post("/:id/movies", authMiddleware, async (req, res) => {
  
  try {
    const movieId = Number(req.body.movieId);

    if (!movieId) {
      return res.status(400).json({
        message: "movieId is required",
      });
    }

    const board = await Board.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    if (board.movies.includes(movieId)) {
      return res.status(400).json({
        message: "Movie already in board",
      });
    }

    board.movies.push(movieId);
    await board.save();

    res.json(board);
  } catch (error) {
    console.error("Add movie error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/**
 * @route   DELETE /api/boards/:id/movies/:movieId
 * @desc    Remove movie from board
 * @access  Protected
 */
router.delete("/:id/movies/:movieId", authMiddleware, async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);

    const board = await Board.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    board.movies = board.movies.filter(
      (id) => id !== movieId
    );

    await board.save();

    res.json(board);
  } catch (error) {
    console.error("Remove movie error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;