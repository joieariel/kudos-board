//import express so we are using express
const express = require("express");

//require prisma client
const { PrismaClient } = require("@prisma/client");

//import express router
const router = express.Router();

const prisma = new PrismaClient();

//retrieve all the boards using database
// name of model - after schema. (not database)
router.get("/", async (req, res) => {
  const boards = await prisma.board.findMany();
  console.log(boards);
  res.json(boards);
});

//retrieve a specific board using database
router.get("/:boardId", async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const boards = await prisma.board.findUnique({
    where: { id: parseInt(boardId) },
  });
  console.log(boards);
  res.json(boards);
});

//create a board (post request) using database
router.post("/", async (req, res) => {
  const { title, description, author } = req.body;
  const newBoard = await prisma.board.create({
    data: {
      title,
      description,
      author,
    },
  });
  res.json(newBoard);
});

//updating a pet (using PUT) using database
router.put("/:boardId", async (req, res) => {
  const { boardId } = req.params;
  const { title, description, author, img } = req.body;
  const updatedBoard = await prisma.board.update({
    where: { id: parseInt(boardId) },
    data: {
      title,
      description,
      author,
      img,
    },
  });
  res.json(updatedBoard);
});

//delete using DELETE using database
router.delete("/:boardId", async (req, res) => {
  try {
    const { boardId } = req.params;
    const boardIdInt = parseInt(boardId);

    // First delete all cards associated with this board
    await prisma.card.deleteMany({
      where: { boardId: boardIdInt },
    });

    // Then delete the board
    const deletedBoard = await prisma.board.delete({
      where: { id: boardIdInt },
    });

    res.json(deletedBoard);
  } catch (error) {
    console.error("Error deleting board:", error);
    res.status(500).json({ error: "Failed to delete board" });
  }
});

module.exports = router;
