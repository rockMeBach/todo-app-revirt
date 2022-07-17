import React, {useState, useContext} from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import TasksContext from '../../contexts/TasksContext'
import './AddTask.css'
import axios from "axios"
import API_URL from '../../constants'

const AddTask = () => {

    const [taskTitle, setTaskTitle] = useState("");
    const {tasks, updateTasks, setLoading, showDialogWithMessage} = useContext(TasksContext)

    const handleSubmit = (e) => {
        //prevent form from being submitted
        e.preventDefault();

        if(taskTitle.trim() !== ""){
            //show the loading thing
            setLoading(true);

            //add the task
            axios({
                method: 'post',
                url: API_URL,
                data: {
                    "userId": 100001,
                    "id": 10,
                    "title": taskTitle,
                    "completed": false
                }
            }).then((res)=>{
                const newTask = res.data;
                newTask.id = tasks.length + 1;
                updateTasks((tasks) => [newTask, ...tasks]);
                setLoading(false);

                showDialogWithMessage("Task added");
            }).catch((err) => {
                console.error("Error:", err)
                setLoading(false);

                showDialogWithMessage("Something went wrong")
            });
        }
    }

    return (
        <div className='AddTask'>
            <p>Add a new task to the list</p>

            <Form onSubmit={handleSubmit}>
                <Row style={{marginTop: 40}}>
                    <Col lg={6} style={{marginBottom: 10, marginRight: 20}}>
                        <input
                            type="text"
                            placeholder="Enter the task here"
                            className="custom-input-text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                    </Col>
                    <Col lg={2}>
                        <button 
                            type="submit"
                            style={{width: '100%'}}
                            className="custom-button"
                        >Submit</button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default AddTask