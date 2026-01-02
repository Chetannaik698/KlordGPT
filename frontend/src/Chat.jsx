import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";

const Chat = () => {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);


  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!prevChats?.length || !reply) {
      return;
    }

    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      const nextText = content.slice(0, idx + 1).join(" ");
      setLatestReply(nextText); 
      idx++;

      if (idx >= content.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}
      <div className="chats">
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown
                rehypePlugins={rehypeHighlight}
                remarkPlugins={remarkGfm}
              >
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {prevChats.length > 0 && latestReply !== null && (
          <div className="gptDiv" key={"typing"}>
            <ReactMarkdown
              rehypePlugins={rehypeHighlight}
              remarkPlugins={remarkGfm}
            >
              {latestReply}
            </ReactMarkdown>
          </div>
        )}

        
        {prevChats.length > 0 && latestReply === null && (
          <div className="gptDiv" key={"non-typing"}>
            <ReactMarkdown
              rehypePlugins={rehypeHighlight}
              remarkPlugins={remarkGfm}
            >
              {prevChats[prevChats.length-1].content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
