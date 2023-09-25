import React,{useState} from "react";
import { useDispatch,useSelector } from "react-redux";
const FilterTask = () => {
    const todolist = useSelector(state => state.todolist);
    const filterStatus = useSelector(state => state.filterStatus);
    const dispatch = useDispatch();
    const updateFilter=(e)=>
    {
        debugger
        const selectedOption = e.target.value;
        dispatch({
            type: 'UpdateFilterStatus', payload: selectedOption
        })
    }

    const handleFilterChange = (e) => {
        //step 1- get data from list from use selector
        // step 2- filter data based on selection
        //step 3 - dispatch filter list  
        const selectedOption = e.target.value;
        let updatedTodoList=[];
        switch (selectedOption) {
            case 'incompleted':
                updatedTodoList = todolist.filter(item => !item.IsCompleted);
                console.log(updatedTodoList,"updatedTodoList")
                break;
            case 'completed':
                updatedTodoList = todolist.filter(item => item.IsCompleted);
                console.log(updatedTodoList,"updatedTodoList");
                break;
            default: 
            updatedTodoList= todolist;
            break;
        }
        dispatch({
            type: 'FilterTask', filterList: updatedTodoList
        })
    }
    const customStyles = {
        content: {
            padding: '0.5rem',
            border: '1px solid #ccc',
            width: '30rem'
        },
    }
    return (
        <select style={customStyles} value={filterStatus}  onChange={updateFilter}>
            <option value="all">All</option>
            <option value="incompleted">Active</option>
            <option value="completed">Completed</option>
        </select>
    );
}
export default FilterTask;