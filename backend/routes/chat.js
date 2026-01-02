import express, { response } from "express";
import Thread from "../models/Thread.js";
import getHuggingFaceResponse from "../utils/HugingFace.js";

const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "dddq",
      title: "Testing new thread",
    });

    await thread.save();
    res.json(thread);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save" });
  }
});

//Get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ upadtedAt: -1 });
    //decreasing order based on updatedAt.. we are getting the threads
    res.json(threads);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch the thread" });
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId: threadId });

    if (!thread) {
      res.status(500).json({ error: "Thread not found!.." });
    }

    res.json(thread.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch the chat" });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId: threadId });

    if (!deletedThread) {
      res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted Successfully!.." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId: threadId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getHuggingFaceResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.upadtedAt = new Date();

    await thread.save();

    res.json({ reply: assistantReply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
