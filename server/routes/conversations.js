const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/", async (req, res) => {
  const { id } = req.body;
  const newConversation = new Conversation({
    id_user: id,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user
router.get("/getAll", async (req, res) => {
  try {
    const conversation = await Conversation.find();
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      id_user: req.params.userId,
    });
    if (!conversation) {
      const newConversation = new Conversation({
        id_user: req.params.userId,
      });
      await newConversation.save();
      return res.status(200).json(newConversation);
    } else {
      res.status(200).json(conversation);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
