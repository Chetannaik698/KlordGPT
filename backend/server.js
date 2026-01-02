import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(8080, () => {
  console.log("App is listining on the port 8080");
  connectDB();
});

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Coonected with DB!..");
  } catch (error) {
    console.log("Failed to connect", error);
  }
};

// app.post("/test", async (req, res) => {
//   const { message } = req.body;

//   if (!message) {
//     return res.status(400).json({ error: "Message is required" });
//   }

//   try {
//     const response = await fetch(
//       "https://api.perplexity.ai/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "sonar-pro", 
//           messages: [
//             {
//               role: "user",
//               content: message,
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     res.json({
//       reply: data.choices[0].message.content,
//     });

//   } catch (error) {
//     console.error("Perplexity API Error:", error);
//     res.status(500).json({ error: "Perplexity API failed" });
//   }
// });
