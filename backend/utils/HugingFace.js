import { configDotenv } from "dotenv";
configDotenv();

const getHuggingFaceResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.H_F_API_KEY}`,
    },
    body: JSON.stringify({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};

// const getHuggingFaceResponse = async (message) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "sonar-pro",
//       messages: [
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://api.perplexity.ai/chat/completions",
//       options
//     );
//     const data = await response.json();
//     console.log(data);
//     return data.choices[0].message.content;
//   } catch (error) {
//     console.log(error);
//   }
// };

export default getHuggingFaceResponse;
