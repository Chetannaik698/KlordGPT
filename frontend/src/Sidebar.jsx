import React, { useContext, useEffect } from "react";
import "./Sidebar.css";
import { MyContext } from "./MyContext";
import { v1 as uuidv1 } from "uuid";

export const Sidebar = () => {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPromt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getAllThreads = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/thread`);
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      console.log(filteredData);
      setAllThreads(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPromt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/thread/${newThreadId}`
      );
      const res = await response.json();
      console.log(res);
      setPrevChats(res || []);
      setNewChat(false);
      setReply(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/thread/${threadId}`,
        { method: "DELETE" }
      );
      const res = response.json();
      console.log(res);

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src="src/assets/kgpt.png" alt="gpt logo" className="logo" />
        <img src="src/assets/edit.png" alt="" className="edit" />
      </button>

      <ul className="history">
        {allThreads.map((thread, idx) => (
          <li
            key={idx}
            onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : ""}
          >
            {thread.title}

            <img
              src="src/assets/trash.png"
              alt=""
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            />
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By Klord &hearts;</p>
      </div>
    </section>
  );
};
