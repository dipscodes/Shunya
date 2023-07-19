"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillCalendarHeartFill } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";

export default function NewTask() {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const onAdd = () => {
    setAdded(true);
    if (localStorage.getItem(status) === null) localStorage.setItem(status, JSON.stringify({}));
    const temp = JSON.parse(localStorage.getItem(status) as string);
    temp[`${Date.now()}~${status}`] = {title: title, description: description, status: status};
    localStorage.setItem(status, JSON.stringify(temp));
    console.log({title: title, description: description, status: status});
    setTimeout(() => {
      (document.getElementById("title") as HTMLInputElement).value = "";
      (document.getElementById("description") as HTMLInputElement).value = "";
      setAdded(false);
    }, 1000)
    
  }
  return (
    <div className="w-7/12 bg-slate-400 h-screen min-h-screen px-10">
      <div className="h-[100px] min-h-[100px] flex flex-row justify-between items-center border-b-2 border-solid border-stone-800 px-5 rounded-md mb-8">
        {(added)? (<TiTickOutline size={30} className="text-green-400" />) : (<BsFillCalendarHeartFill size={30} />)}
        
        <span className="text-5xl"><Link href={'/'}>Todos</Link></span>
        <span className="text-2xl border-2 border-black rounded-lg px-2 py-1 cursor-pointer hover:bg-slate-700 transition-all ease-in-out duration-300" onClick={() => onAdd()}>Add</span>
      </div>
      <div className="status-card">
        <div className="input-container">
          <input type="text" id="title" className="text-slate-600 text-center" onChange={(e) => setTitle(e.target.value)}/>
          <label className="label">Title</label>
          <div className="underline"></div>
        </div>
        <div className="input-container">
          <input type="text" id="description" className="text-slate-600 text-center" onChange={(e) => setDescription(e.target.value)}/>
          <label className="label">Description</label>
          <div className="underline"></div>
        </div>
        <div className="input-container">
          <select className="bg-inherit text-black w-full text-center border-2 border-slate-800 py-2 rounded-md" defaultValue={"To Do"} onChange={(e) => setStatus(e.target.value)}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <div className="underline"></div>
        </div>
      </div>
    </div>
  );
}