import React, { useState } from "react";
import Card from "../UI/card";
import clasess from "./addTodo.module.css"
import Button from "../UI/button";

const AddTodoTask=(props)=>{
    const [enteredTodo,setEnteredToDo]=useState('');
    const addToDoHandler=(event)=>{
        event.preventDefault();
        if(enteredTodo.trim().length<=0)
        {
            return;
        }
        props.onAddToDo(enteredTodo);
        setEnteredToDo('');
    };
   
    const toDoChangeHandler=(event)=>
    {
setEnteredToDo(event.target.value);
    };
    
   return( 
    <Card className={clasess.input}>
   <form onSubmit={addToDoHandler}>
        <label htmlFor="todo">Add To Do </label>
        <input type="text" id="todo" value={enteredTodo} onChange={toDoChangeHandler}></input>
        <Button type="submit">Add</Button>
    </form>
    </Card>
    );
}
export default AddTodoTask;