
import './App.css';
import { useEffect, useState ,useRef} from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({})
  const ref=useRef(null);

  useEffect(()=>{
    console.log(currentTask);
  },[currentTask])

  const change = (event) => {
    setNewTask(event.target.value);
  }

  const addTask = () => {
    if(newTask!==""){
    if (isEditing === false) {
      const task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: newTask,
        check: "Done",
        textColor: "black"

      };
      const newTodoList = [...todoList, task];
      setTodoList(newTodoList);

    }
    else {
      const newtodo = todoList.map((task) => {
        if (task.id === currentTask.id) {
          return { ...task, taskName: newTask }
        }

        return task
      })
      setTodoList(newtodo);
      setIsEditing(false);

    }
  }
    setNewTask("");
  }

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => {
      if (task.id === id) {
        return false;
      }
      else {
        return true;
      }
    }));
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  }
  const handleCheck = (id) => {
    const newtodo = todoList.map((task) => {
      if (task.id === id) {
        // task.check=(task.check==="Undone"?"Done":"Undone");
        return { ...task, textColor: (task.check === "Undone" ? "black" : "grey"), check: (task.check === "Undone" ? "Done" : "Undone") }
      }

      return task
    })
    setTodoList(newtodo);
    console.log(newtodo);
  }
  const handleEdit = (task) => {
    ref.current.focus();
    setIsEditing(true)
    
   setCurrentTask(task)
   setNewTask(task.taskName)
  //  console.log(newTask);
  }

  return (

    <div className="App">
      <div className='main'>
        <div className='head'><h1>TODO-LIST</h1></div>
        <div className='addTask'>
          <input ref={ref} type='text' placeholder='Write your task....' onChange={change} value={newTask} onKeyDown={handleKeyDown}></input>
          <button onClick={addTask}>Add task</button>
        </div>
        <div className='list'> {todoList.map((task) => {
          return (<div className='listItems' key={task.id}>
            <div className='left'>
            <input type="checkbox" id="checkBox" onChange={()=>handleCheck(task.id)}></input>
            <p style={{ color: task.textColor }}>{task.taskName}</p>
            </div>
            <div className='buttons'>
              <button className='edit' onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)} className='delete'>Delete</button>
              {/* <button onClick={() => handleCheck(task.id)} className='check'>{task.check}</button> */}
            </div></div>)
        })}
        </div>
      </div>

    </div>
  );
}

export default App;
