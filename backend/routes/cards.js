//import express so we are using express
const express = require("express");

//require prisma client
const { PrismaClient } = require("@prisma/client");

//import express router
const router = express.Router();

const prisma = new PrismaClient();

//retrieve all the cards using database
// name of model - after prisma. (not database)
router.get("/", async (req, res) => {
  const cards = await prisma.card.findMany();
  console.log(cards);
  res.json(cards);
});

router.get("/:boardId/cards", async (req, res) => {
  const cards = await prisma.card.findMany({
    where: { boardId: parseInt(req.params.boardId) },
  });
  console.log(cards);
  res.json(cards);
});

//retrieve a specific card using database
router.get("/:cardId", async (req, res) => {
  const cardId = parseInt(req.params.cardId);
  const cards = await prisma.card.findUnique({
    where: { id: parseInt(cardId) },
  });
  console.log(cards);
  res.json(cards);
});

//create a card (post request) using database
router.post("/", async (req, res) => {
  const { title, content, author, gifUrl, boardId } = req.body;
  const newCard = await prisma.card.create({
    data: {
      title,
      content,
      author,
      gifUrl,
      boardId: parseInt(boardId),
    },
  });
  res.json(newCard);
});

//updating a card (using PUT) using database
router.put("/:cardId", async (req, res) => {
  const { cardId } = req.params;
  const { title, content, author, gifUrl } = req.body;
  const updatedCard = await prisma.card.update({
    where: { id: parseInt(cardId) },
    data: {
      title,
      content,
      author,
      gifUrl,
    },
  });
  res.json(updatedCard);
});

//delete using DELETE using database
router.delete("/:cardId", async (req, res) => {
  const { cardId } = req.params;
  const deletedCard = await prisma.card.delete({
    where: { id: parseInt(cardId) },
  });
  res.json(deletedCard);
});

module.exports = router;
