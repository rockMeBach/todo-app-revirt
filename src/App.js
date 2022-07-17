import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import AddTask from './components/AddTask/AddTask';
import TaskList from './components/TaskList/TaskList';
import TasksContext from './contexts/TasksContext';
import axios from "axios";
import API_URL from "./constants";
import Loading from "./components/Loading/Loading";
import Dialog from "./components/Dialog/Dialog";

function App() {  
  const [tasks, updateTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusDialog, showStatusDialog] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(()=>{
    if(statusDialog){
      //auto hide status dialog
      setTimeout(()=>{
        showStatusDialog(false)
      }, 3000)
    }
  }, [statusDialog])

  useEffect(()=>{
      axios.get(API_URL).then((res)=>{
          const tasks = res.data;
          updateTasks(tasks.slice(0, 50));
          setLoading(false);
      }).catch((err) => {
          console.error("Error:", err)
          setLoading(false);

          showDialogWithMessage("Something went wrong")
    });
  }, []);

  const showDialogWithMessage = (message) => {
    setStatusMessage(message)
    showStatusDialog(true)
  }

  return (
    <div>
      {loading && <Loading />}

      {statusDialog && <Dialog message={statusMessage} />}

      <main className="App">

        <p className="heading">To-do list</p>
              
        <TasksContext.Provider value={{tasks, updateTasks, loading, setLoading, showDialogWithMessage}}>
          <AddTask />
          <TaskList />
        </TasksContext.Provider>

      </main>
    </div>
  );
}

export default App;
