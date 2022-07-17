import React, {useState, useContext} from 'react'
import './Task.css';
import { Row, Col } from "react-bootstrap";
import TasksContext from '../../contexts/TasksContext';
import axios from "axios";
import API_URL from '../../constants';

const Task = ({task, index}) => {
    const {updateTasks, setLoading, showDialogWithMessage} = useContext(TasksContext)

    const taskCompletedClass = task.completed ? "TaskCompleted" : "";

    const taskId = task.id;
    const taskTitle = task.title;
    const taskCompleted = task.completed;

    const deleteTask = () => {
        setLoading(true);

        axios.delete(API_URL+"/"+taskId).then(()=>{
            //faking as if we received a response from the server
            updateTasks(tasks => tasks.filter((task) => task.id !== taskId))

            setLoading(false);

            showDialogWithMessage("Task deleted")
        }).catch((err) => {
            console.error("Error:", err)
            setLoading(false);

            showDialogWithMessage("Something went wrong")
        });
    }

    const updateCompletionStatus = (completionStatus) => {
        setLoading(true);

        axios({
            method: 'patch',
            url: API_URL+'/'+taskId,
            data: {
                "userId": 100001,
                "id": taskId,
                "title": taskTitle,
                "completed": completionStatus
            }
        }).then((res)=>{
            //faking as if we received a response from the server
            const newUpdatedTask = res.data;

            updateTasks(tasks => 
                tasks.map((task) => {
                    if(task.id === taskId) task.completed = newUpdatedTask.completed
                    return task
                })
            );

            setLoading(false);

            if(newUpdatedTask.completed){
                showDialogWithMessage("Task marked as completed")
            }else{
                showDialogWithMessage("Task marked as incomplete")
            }
                
        }).catch((err) => {
            console.error("Error:", err)
            setLoading(false);

            showDialogWithMessage("Something went wrong")
        });
    }

    return (
        <Col md={4} sm={6}>
            <div className={`Task ${taskCompletedClass}`} data-content={(index+1)+'.'}>

                {/* task title */}
                <p 
                    style={{padding: 20, paddingBottom: 0, maxHeight: 42, overflow: 'hidden', textOverflow: 'ellipsis'}}
                    title={taskTitle}
                >{taskTitle}</p>

                <hr/>

                {
                    /* completed task tick icon */
                    taskCompleted && 
                    <span className='tick'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg>
                    </span>
                }

                {/* task options */}
                <Row style={{padding: 20, paddingTop: 5}}>
                    <Col lg={7}>
                        {
                        !taskCompleted ? 

                            /* MARK AS COMPLETED BUTTON */
                            <button className='custom-button'
                            onClick={
                                ()=>updateCompletionStatus(true)
                            }>
                                Mark as completed
                            </button> 

                        :

                            /* MARK AS INCOMPLETE BUTTON */
                            <button className='custom-button' 
                            onClick={
                                ()=>updateCompletionStatus(false)
                            }
                            style={
                                {background: 'none', padding: 0, paddingTop: 10, width: 'fit-content', color: '#AFAFAF'}
                            }>
                                Mark as incomplete
                            </button>

                        }
                    </Col>
                    <Col style={{padding: 10, textAlign: 'center'}}>
                        <a onClick={deleteTask}>Delete</a>
                    </Col>
                </Row>

            </div>
        </Col>
    )
}

export default Task