import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Button from "../UI/button";
import Modal from 'react-modal';
const ToDoList = () => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const newtodolist = useSelector(state => state.todolist);
  const filterStatus = useSelector(state => state.filterStatus);
  const filterMethod = (todo) => {
    if (filterStatus === 'all') {
      return true;
    }
    else if (filterStatus === 'incompleted') {
      return todo.IsCompleted === false;
    }
    else {
      return todo.IsCompleted === true;
    }
  }
  const [taskInput, setTaskInput] = useState({
    id: "",
    taskName: '',
    IsCompleted: false
  });
  const [inputTaskIsValid, setInputTaskIsValid] = useState(true);
  const dispatch = useDispatch();
  const modelOpen = (taskId, taskinfo, isTaskCompleted) => {
    setIsModelOpen(!isModelOpen);
    setTaskInput(
      {
        id: taskId,
        taskName: taskinfo,
        IsCompleted: isTaskCompleted
      }
    );
  }
  const closeModal = () => {
    setIsModelOpen(!isModelOpen);
  }
  const handleClick = (taskId) => {
    setTaskInput(
      {
        id: taskId
      })
    setDeleteModelOpen(true);
  }
  const handleDialogClose = () => setDeleteModelOpen(false);
  const handleDelete = () => {
    dispatch({
      type: 'RemoveTask', itemId: taskInput.id
    })
    setDeleteModelOpen(false);
  }
  // const handleDelete = (selItemId) => {
  //   dispatch({
  //     type: 'RemoveTask', itemId: selItemId
  //   })
  //   setDeleteModelOpen(false);
  // }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskInput((prevTaskInput) => ({
      ...prevTaskInput,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleEdit = (e) => {
    e.preventDefault();
    if (taskInput.taskName.trim().length > 0) {
      setInputTaskIsValid(true);
      dispatch({
        type: 'EditTask', payload:
        {
          id: taskInput.id,
          name: taskInput.taskName,
          IsCompleted: taskInput.IsCompleted
        }
      })
      closeModal();
    }
    else {
      setInputTaskIsValid(false);
    }
  }
  return (
    <>
      <div className='card_container'>
        {
          newtodolist?.filter(elem => filterMethod(elem)).map((elem) => {
            return <>
              <div className='card'>
                <div className='card_left'>
                  <input type='checkbox' checked={elem.IsCompleted} className='task_checkbox' />
                  <div className='task_text'>
                    <h4 style={{ textDecoration: elem.IsCompleted === true ? 'line-through' : 'none' }}>{elem.name}</h4>
                    <p>{`${elem.time}, ${elem.date}`}</p>
                  </div>
                </div>
                <div className='card_right'>
                  <Button onClick={() => handleClick(elem.id)} ><i class="fa fa-trash"></i></Button>
                  <Button onClick={() => modelOpen(elem.id, elem.name, elem.IsCompleted)}><i class="fa fa-edit"></i></Button>
                </div>
              </div>
            </>
          })
        }
      </div>
      <Modal
        isOpen={isModelOpen}
        style={customStyles}
        contentLabel="Example Modal">
        <form onSubmit={handleEdit} className='form-control'>
          <div>
            <label htmlFor='taskName'>Task Name</label>
            <input type='text'
              name='taskName' value={taskInput.taskName} onChange={handleInputChange} placeholder="Task Name" />
            {!inputTaskIsValid && <p className='error-text'>Task must not be empty..!</p>}
            <label htmlFor="IsCompleted">Is Completed</label>
            <input type='checkbox'
              name="IsCompleted" onChange={handleInputChange} checked={taskInput.IsCompleted}></input>
          </div>
          <div className='form-actions'>
            <Button type="submit">Save</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={deleteModelOpen}
        style={customStyles}
        contentLabel="Example Modal">
                <h5 color="red">Are you sure you want to delete this task ?"</h5>
                <br/>
                <div className='form-actions'>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={handleDialogClose}>No</Button>
                </div>
            </Modal> 
    </>
  );
}
export default ToDoList;