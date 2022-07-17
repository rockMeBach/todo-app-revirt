import React, { useContext, useEffect, useState } from 'react'
import './TaskList.css'
import Task from '../Task/Task'
import { Form, Row, Col } from "react-bootstrap"
import TasksContext from '../../contexts/TasksContext'

const TaskList = () => {
    const {tasks} = useContext(TasksContext)
    const [filterNum, setFilterNum] = useState(0); // 0 for incomplete, 1 for completed, 2 for both
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    useEffect(()=>{
        //filtering logic
        if(filterNum < 2){
            //either incomplete or completed
            setFilteredTasks(tasks.filter((task) => task.completed === (filterNum === 1)))
        }else{
            //both
            setFilteredTasks(tasks)
        }
    }, [tasks, filterNum])

    return (
        <div className='TaskList'>
            <p>Added tasks in to-do list</p>

            <Row>

                <Col md="2">
                    <Form.Check 
                        type="radio"
                        checked={filterNum===0}
                        id="incomplete"
                        label="Incomplete"
                        onChange={()=>setFilterNum(0)}
                    />
                </Col>

                <Col md="2">
                    <Form.Check 
                        type="radio"
                        checked={filterNum===1}
                        id="completed"
                        label="Completed"
                        onChange={()=>setFilterNum(1)}
                    />
                </Col>

                <Col md="2">
                    <Form.Check 
                        type="radio"
                        checked={filterNum===2}
                        id="both"
                        label="Both"
                        onChange={()=>setFilterNum(2)}
                    />
                </Col>

            </Row>

            {
            filteredTasks && 
                (filteredTasks.length <= 0 ? <p style={{color: 'grey'}}>No tasks in the list</p> 
                :
                    <Row>
                        {filteredTasks.map((task, i) => 
                            <Task key={i} task={task} index={i} />
                        )}
                    </Row>
                )
            }
        </div>
    )
}

export default TaskList