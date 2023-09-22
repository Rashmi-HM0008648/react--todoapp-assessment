import { createStore } from 'redux';

const initialTodoState = {
    todolist: [
        {
            id: Math.floor(Math.random() * 1000),
            name: "Create react App",
            date: "20/09/2023",
            time: "06:30",
            IsCompleted: false
        }
    ],
}
const toDoListReducer = (state = initialTodoState, action) => {
    if (action.type === "AddTask") {
        const newItem = action.payload;
        state.todolist.push({
            id: newItem.id
            , name: newItem.name
            , date: newItem.date
            , time: newItem.time
            , IsCompleted: newItem.IsCompleted
        })
    }
    if (action.type === "EditTask") {
        const editItem = action.payload;
        const existingTaskIndex = state.todolist.findIndex(item => item.id === editItem.id)
        if (existingTaskIndex === -1) {
            state.todolist.push({
                id: editItem.id
                , name: editItem.name
                , IsCompleted: editItem.IsCompleted
            })
        }
        else {

            const updatedTodoList = [...state.todolist];
            updatedTodoList[existingTaskIndex] = {
                ...updatedTodoList[existingTaskIndex],
                name: editItem.name,
                IsCompleted: editItem.IsCompleted,
            };
            console.log(updatedTodoList, "updatedTodoList");
            return {

                ...state, todolist: updatedTodoList
            };
        }

    }
    if (action.type === "RemoveTask") {
        const updatedTodoList = state.todolist.filter(item => item.id !== action.itemId)
        return {
            ...state, todolist: updatedTodoList
        };
    }
    if (action.type === "FilterTask") {
        return { ...state, todolist: action.filterList };
    }
    return state;
}
const store = createStore(toDoListReducer);
export default store;