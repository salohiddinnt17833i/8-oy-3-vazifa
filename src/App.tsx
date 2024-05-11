import React, { createContext, useEffect, useState } from "react"
import Cart from "./components/Cart"

function App() {
  const [addTask, setAddTask] = useState<(number | string)[]>([])
  const [task, setTask] = useState<(number | string)>('')

  useEffect(() => {
    const storeTodos = localStorage.getItem('todos');
    if (storeTodos) {
      setAddTask(JSON.parse(storeTodos));
      console.log(addTask);
    }
  }, []);

  interface TaskTypes {
    name: string;
    dateTime: string;
    date: string;
    id: number;
    status?: boolean
  }

  function handleSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (task.trim() === '') {
      alert('Please fill in the main field');
      return;
    }

    function getDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      return `${month}/${date}/${year}`;
    }

    const obj: TaskTypes = {
      name: task,
      dateTime: getDate(),
      date: new Date().toLocaleTimeString(),
      id: Date.now(),
      status: false
    }

    const updatedTasks = [...addTask, obj];
    setAddTask(updatedTasks);
    localStorage.setItem('todos', JSON.stringify(updatedTasks));

    setTask('');
    document.getElementById('my_modal_1').close();
  }


  return (
    <div>
      <div className="Title text-center">
        <h1 className="uppercase text-[40px] font-semibold">Todo LIst</h1>
      </div>
      <div className="Header w-[900px] mx-auto py-10 flex justify-between items-center">
        <div>
          <button className="btn btn-primary text-[16px]" onClick={() => document.getElementById('my_modal_1').showModal()}>Add Task</button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add Task!</h3>
              <p className="py-4">Fill in the header</p>
              <div className="modal-action flex justify-between">
                <input value={task} onChange={(e) => { setTask(e.target.value) }} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <form method="dialog flex">
                  <button className="btn" onClick={handleSave}>Add</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        <div>
          <select className="select select-bordered w-full max-w-xs bg-neutral-content">
            <option value={'all'}>All</option>
            <option value={'active'}>Active</option>
            <option value={'inActive'}>In Active</option>
          </select>
        </div>
      </div>
      <div className="w-[900px] rounded-xl mx-auto flex flex-col gap-4 bg-neutral-content p-4">
        {
          addTask.map((ele, index) => {
            return <Cart data={ele} key={index}></Cart>
          })
        }
      </div>
    </div>
  )
}

export default App
