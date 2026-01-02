import React, { useContext, useState, useEffect } from "react";
import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { ScaleLoader } from "react-spinners";

export const ChatWindow = () => {
  const {
    promt,
    setPromt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: promt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  console.log("ENV:", import.meta.env);
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);


  useEffect(() => {
    if (promt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: promt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPromt("");
  }, [reply]);

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span className="logo">
          KlordGPT <img src="src/assets/down.png" alt="" />
        </span>
        <div className="user_icon_div" onClick={() => setIsOpen(!isOpen)}>
          <span className="user_icon">
            {" "}
            <img src="src/assets/user.png" alt="" />
          </span>
        </div>
      </div>

      {
        isOpen && 
        <div className="dropdown">
          <div className="dropDownItem"><img src="src/assets/setting.png" alt="" />Settings</div>
          <div className="dropDownItem"><img src="src/assets/upgrade.png" alt="" />Upgrade Plane</div>
          <div className="dropDownItem"><img src="src/assets/logout.png" alt="" />Logout</div>
        </div>
      }

      <div className="chatContainer">
        <Chat></Chat>
        {loading && (
          <div className="loadingContainer">
            <ScaleLoader color="#fff" loading={loading}></ScaleLoader>
          </div>
        )}
      </div>

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={promt}
            onChange={(e) => setPromt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          />
          <div id="submit" onClick={getReply}>
            <img src="src/assets/send.png" alt="" />
          </div>
        </div>
        <p className="info">
          KlordGPT can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </div>
    </div>
  );
};
