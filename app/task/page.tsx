"use client";
import Link from "next/link";
import { useState } from "react";
import { BsFillCalendarHeartFill } from "react-icons/bs";

export default function Task() {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onEdit = () => {
    setEdit(true);
  };
  const onSave = () => {
    setEdit(false);
  };

  return (
    <div className="w-7/12 bg-slate-400 h-screen min-h-screen px-10">
      <div className="h-[100px] min-h-[100px] flex flex-row justify-between items-center border-b-2 border-solid border-stone-800 px-5 rounded-md mb-8">
        <BsFillCalendarHeartFill size={30} />
        <span className="text-5xl">
          <Link href={"/"}>Todos</Link>
        </span>
        {!edit ? (
          <span
            className="text-2xl border-2 border-black rounded-lg px-2 py-1 cursor-pointer hover:bg-slate-700 transition-all ease-in-out duration-300"
            onClick={() => onEdit()}
          >
            Edit
          </span>
        ) : (
          <span
            className="text-2xl border-2 border-black rounded-lg px-2 py-1 cursor-pointer hover:bg-slate-700 transition-all ease-in-out duration-300"
            onClick={() => onSave()}
          >
            Save
          </span>
        )}
      </div>
      <div className="status-card">
        <div className="input-container">
          <input
            type="text"
            id="title"
            className="text-slate-600 text-center"
            onChange={(e) => setTitle(e.target.value)}
            disabled={!edit}
          />
          <label className="label">Title</label>
          <div className="underline"></div>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="description"
            className="text-slate-600 text-center"
            onChange={(e) => setDescription(e.target.value)}
            disabled={!edit}
          />
          <label className="label">Description</label>
          <div className="underline"></div>
        </div>
        <div className="input-container">
          <select
            className="bg-inherit text-black w-full text-center border-2 border-slate-800 py-2 rounded-md"
            id="status"
          >
            <option value={"To Do"}>To Do</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"Completed"}>Completed</option>
          </select>
          <div className="underline"></div>
        </div>
      </div>
    </div>
  );
}
