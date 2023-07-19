"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillCalendarHeartFill } from "react-icons/bs";

export default function Home() {
  const [toDoTaskList, setToDoTaskList] = useState({});
  const [inProgressTaskList, setInProgressTaskList] = useState({});
  const [completedTaskList, setComletedTaskList] = useState({});

  useEffect(() => {
    // localStorage.clear();
    if (localStorage.getItem("To Do") === null)
      localStorage.setItem("To Do", JSON.stringify({}));
    if (localStorage.getItem("In Progress") === null)
      localStorage.setItem("In Progress", JSON.stringify({}));
    if (localStorage.getItem("Completed") === null)
      localStorage.setItem("Completed", JSON.stringify({}));
    setToDoTaskList(JSON.parse(localStorage.getItem("To Do") as string));
    setInProgressTaskList(
      JSON.parse(localStorage.getItem("In Progress") as string)
    );
    setComletedTaskList(
      JSON.parse(localStorage.getItem("Completed") as string)
    );
  }, []);

  return (
    <div className="w-7/12 bg-slate-400 h-screen min-h-screen px-10">
      <div className="h-[100px] min-h-[100px] flex flex-row justify-between items-center border-b-2 border-solid border-stone-800 px-5 rounded-md">
        <BsFillCalendarHeartFill size={30} className="text-[#e0f0e0]" />
        <span className="text-5xl">
          <Link href={"/"}>Todos</Link>
        </span>
        <button className="text-2xl border-2 border-black rounded-lg px-2 py-1 cursor-pointer hover:bg-slate-700 transition-all ease-in-out duration-300">
          <Link href={"/new-task"}> New</Link>
        </button>
      </div>
      <div className="w-full h-[calc(100vh-100px)] pb-5 pt-8 px-5">
        <div className="status-card">
          <div className="h-10 w-auto flex flex-col items-center justify-center pl-5 pt-3 mb-3">
            <span className="text-xl">To Do</span>
          </div>
          <div className="task-list">
            {JSON.stringify(toDoTaskList) === "{}"
              ? null
              : Object.keys(toDoTaskList).map((task: string) => (
                  <Link href={`/task/${task}`} key={task}>
                    <div className="task-card">
                      <p>{(toDoTaskList as any)[task].title}</p>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
        <div className="status-card">
          <div className="h-10 w-auto flex flex-col items-center justify-center pl-5 pt-3 mb-3">
            <span className="text-xl">In Progress</span>
          </div>
          <div className="task-list">
            {JSON.stringify(inProgressTaskList) === "{}"
              ? null
              : Object.keys(inProgressTaskList).map((task: string) => (
                  <Link href={`/task/${task}`} key={task}>
                    <div className="task-card">
                      <p>{(inProgressTaskList as any)[task].title}</p>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
        <div className="status-card">
          <div className="h-10 w-auto flex flex-col items-center justify-center pl-5 pt-3 mb-3">
            <span className="text-xl">Completed</span>
          </div>
          <div className="task-list">
            {JSON.stringify(completedTaskList) === "{}"
              ? null
              : Object.keys(completedTaskList).map((task: string) => (
                  <Link href={`/task/${task}`} key={task}>
                    <div className="task-card">
                      <p>{(completedTaskList as any)[task].title}</p>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
