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
        }
    }
    const handelChecked=(id)=>{
        const newTodos=[...todos]
        const index =newTodos.findIndex(item => item.id===id)
        newTodos[index].isChecked=!newTodos[index].isChecked
        setTodos(newTodos)
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
                    <Col xs={9} className='todo-tilte'>{todos.length!==0&&<h3>We have: {todos.length} to do Today</h3>}</Col>
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
                        <Button className='btn-warning mr-2' onClick={()=>fixTodo(todo.id)}>Fix</Button>
                        <Button className='btn-danger' onClick={()=>removeTodo(todo.id)}>X</Button>
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
                        <Button className='btn-warning mr-2' onClick={()=>fixTodo(todo.id)}>Fix</Button>
                        <Button className='btn-danger' onClick={()=>removeTodo(todo.id)}>X</Button>
                        </Row>
                    </Row>)}</Col>}               
                </Col>
                } 
            </Col>
        )
};
export default TodoList;
