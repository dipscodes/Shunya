"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillCalendarHeartFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";

export default function TaskPage({ params }: any) {
  const [edit, setEdit] = useState(false);
  const [tick, setTick] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const status: string = params.id.split("~")[1].replace("%20", " ");
    const temp: object = JSON.parse(localStorage.getItem(status) as string)[
      params.id.replace("%20", " ")
    ];
    setTitle((temp as any).title);
    setDescription((temp as any).description);
    setStatus((temp as any).status);
    (document.getElementById("status") as HTMLSelectElement).value = status;
  }, [params.id]);

  const onEdit = () => {
    setEdit(true);
  };
  const onSave = () => {
    setTick(true);
    if (localStorage.getItem(status) === null)
      localStorage.setItem(status, JSON.stringify({}));

    let temp = JSON.parse(
      localStorage.getItem(
        params.id.split("~")[1].replace("%20", " ")
      ) as string
    );
    delete temp[params.id.replace("%20", " ")];
    localStorage.setItem(
      params.id.split("~")[1].replace("%20", " "),
      JSON.stringify(temp)
    );

    temp = JSON.parse(localStorage.getItem(status) as string);
    delete temp[`${Date.now()}~${status}`];
    temp[`${Date.now()}~${status}`] = {
      title: title,
      description: description,
      status: status,
    };
    localStorage.setItem(status, JSON.stringify(temp));

    setEdit(false);

    setTimeout(() => {
      setTick(false);
    }, 1000);
  };

  const router = useRouter();

  const onDelete = () => {
    if (confirm("Delete this task?")) {
      const temp = JSON.parse(localStorage.getItem(status) as string);
      delete temp[params.id.replace("%20", " ")];
      localStorage.setItem(status, JSON.stringify(temp));
      router.push("/");
    }
  };

  return (
    <div className="w-7/12 bg-slate-400 h-screen min-h-screen px-10">
      <div className="h-[100px] min-h-[100px] flex flex-row justify-between items-center border-b-2 border-solid border-stone-800 px-5 rounded-md mb-8">
        {tick ? (
          <TiTickOutline size={30} className="text-green-400" />
        ) : (
          <BsFillCalendarHeartFill size={30} />
        )}

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
      <div className="status-card pb-5">
        <div className="input-container">
          <input
            value={title}
            type="text"
            id="title"
            className="text-slate-600 text-center"
            onChange={(e) => setTitle(e.target.value)}
            disabled={!edit}
          />
          <label className="label1">Title</label>
          <div className="underline"></div>
        </div>
        <div className="input-container">
          <input
            value={description}
            type="text"
            id="description"
            className="text-slate-600 text-center"
            onChange={(e) => setDescription(e.target.value)}
            disabled={!edit}
          />
          <label className="label1">Description</label>
          <div className="underline"></div>
        </div>
        <div className="input-container">
          <select
            defaultValue={status}
            className="bg-inherit text-black w-full text-center border-2 border-slate-800 py-2 rounded-md"
            id="status"
            disabled={!edit}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={"To Do"}>To Do</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"Completed"}>Completed</option>
          </select>
          <div className="underline"></div>
        </div>
        <div className="flex flex-row justify-center items-center w-full h-auto text-red-600">
          <AiFillDelete
            size={50}
            onClick={() => onDelete()}
            className="self-center cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
