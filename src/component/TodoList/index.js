import React, {useState} from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import './TodoList.scss';
import Select from 'react-select';
import option from '../../data';
function TodoList(){
    const [todos, setTodos] =useState([]);
    const [todo, setTodo]= useState([]);
    const [edit, setEdit]=useState('')
    const [onFilter, setOnFilter]= useState(false)
    const [filters, setFilters]=useState(false)
    const [count, setCount]= useState(0)
    const [per, setPer]= useState(0)


    const randomId=()=>{
        return Math.trunc(Math.random()*10000)
    }
    const handelTodo=(e)=>{
        setTodo(e.target.value)
    }
    const handelOnKeyUpTodo=(e)=>{
        
        if(e.keyCode===13 && todo.length!==0)
        {
            if(edit)
            {
                const newTodos=[...todos]
                const index= newTodos.findIndex(item=> item.id===edit)
                newTodos[index].value=todo
                setTodos(newTodos)
                setEdit('')
                setTodo([])
                return;
            }

            const newTodos= [...todos]
            const id=randomId();
            const newTodo={id:id, value: todo, isChecked: false}
            newTodos.push(newTodo)
            setTodos(newTodos)
            setTodo('')
            let countDone=0;
            newTodos.forEach(item =>{if(item.isChecked===true) countDone=countDone+1;})
            if(newTodos.length===1)
            {setPer(0)
            setCount(0)}
            else{
             setPer(Math.trunc((countDone/newTodos.length)*100))
             setCount(countDone)    
            }
            
        }
    }
    const handelChecked=(id)=>{
        const newTodos=[...todos]
        const index =newTodos.findIndex(item => item.id===id)
        newTodos[index].isChecked=!newTodos[index].isChecked
        setTodos(newTodos)
        let countDone=0;
        newTodos.forEach(item =>{if(item.isChecked===true) countDone=countDone+1;})
        setPer(Math.trunc((countDone/todos.length)*100))
        setCount(countDone)
    }

    const handelSelected=(values)=>{
       
        if (values.value===1)
        {setOnFilter(false)
        return;}
        setOnFilter(true)
        if(values.value===2){
        const newFilters=todos.filter(item =>item.isChecked===true);
        setFilters(newFilters)
        }
        else{
            const newFilters=todos.filter(item =>item.isChecked===false);
            setFilters(newFilters)    
        }
    }

    const removeTodo=(id)=>{
        const todosList=[...todos]        
        setTodos(todosList.filter(item=> item.id !== id))
        setFilters(todosList.filter(item=> item.id !== id))
        let countDone=0;
            todosList.forEach(item =>{if(item.isChecked===true && item.id!==id) countDone=countDone+1;})
            if(todos.length===1)
            {setPer(0)
            setCount(0)}
            else{
             setPer(Math.trunc((countDone/(todosList.length-1))*100))
             setCount(countDone)    
            }

    }

    const fixTodo=(id)=>{
        const todosList=[...todos]
        const index =todosList.findIndex(item => item.id===id)
        setTodo(todosList[index].value)
        setEdit(id)
    }
    return (
            <Col xs={12} md={6} className='todo p-2'>
                <input type='text' placeholder='Text Todo hear....' onChange={handelTodo} onKeyUp={handelOnKeyUpTodo} value={todo}></input>
                <Row className='mt-2'>
                    <Col xs={3}>
                        <Select options={option} onChange={handelSelected}></Select>
                    </Col>
                </Row>
                {onFilter?
                <Col className='todo-content mt-2 p-2'>
                    {filters.length === 0 ? <Col><h1>There is no work!!!</h1></Col>:<Col>
                    {filters.map(todo=>
                    <Row className='todo-content-item p-1 mb-2'>
                    <Col xs={10} className={todo.isChecked && 'checked'} onClick={()=>handelChecked(todo.id)}> {todo.value}</Col>
                    <Row>
                    <Button className='btn-warning mr-2' onClick={()=>fixTodo(todo.id)}><i class="fas fa-pen"></i></Button>
                    <Button className='btn-danger' onClick={()=>removeTodo(todo.id)}><i class="fas fa-trash-alt"></i></Button>
                    </Row>
                    </Row>)}</Col>}               
                </Col>
                :
                <Col className='todo-content mt-2 p-2'>
                    {todos.length === 0 ? <Col><h1>Lets add some work !!!</h1></Col>:<Col>
                    {todos.map(todo=>
                    <Row className='todo-content-item p-1 mb-2'>
                    <Col xs={10} className={todo.isChecked && 'checked'} onClick={()=>handelChecked(todo.id)}> {todo.value}</Col>
                    <Row>
                    <Button className='btn-warning mr-2' onClick={()=>fixTodo(todo.id)}><i class="fas fa-pen"></i></Button>
                    <Button className='btn-danger' onClick={()=>removeTodo(todo.id)}><i class="fas fa-trash-alt"></i></Button>
                    </Row>
                    </Row>)}</Col>}               
                </Col>
                }
                {/* Total */}
                <Col xs={4} className='todo-total'>
                        <h5>YOUR WORK</h5>
                        <Col xs={12}> Total: {todos.length}</Col>
                        <Col xs={12} className='mb-2'> Done: {count}</Col>
                        <Col xs={12} className='todo-total-work'>
                            <div className='todo-total-work-all'></div>
                            <div className='todo-total-work-done' style ={{width: `${per}%`}    }></div>
                            
                        </Col>
                        <Col>{per}%</Col>
                        
                </Col>
                {/* Congratulation */}
                {per===100 &&<Col xs={1} className='todo-congra'>
                <h5>C</h5><h5>O</h5><h5>N</h5><h5>G</h5><h5>R</h5><h5>A</h5><h5>T</h5><h5>U</h5><h5>L</h5>
                <h5>A</h5><h5>T</h5><h5>I</h5><h5>O</h5><h5>N</h5><h5>S</h5>
                </Col>}
            </Col>
        )
};
export default TodoList;
