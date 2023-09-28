import { useEffect, useState } from 'react';
import ToDoList from './components/toDo/toDoList';
import Button from './components/UI/button';
import './App.css';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import Header from './components/header/header';
import FilterTask from './components/toDo/filterTodo';

function App() {
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
  const dispatch = useDispatch();
  const addTodosHandler = (e) => {
    e.preventDefault();
    if (modelInput.taskinfo.trim().length > 0) {
      setEnteredTaskIsValid(true);
      const current = new Date();
      const currentDate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
      const currentTime = `${current.getHours()}:${current.getMinutes()}`;
      dispatch({
        type: 'AddTask', payload:
        {
          id: Math.floor(Math.random()*1000),
          name: modelInput.taskinfo,
          date: currentDate,
          time: currentTime,
          IsCompleted: false
        }
      });
      closeModal();
    }
    else {
      setEnteredTaskIsValid(false);
    }
  }
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [enteredTaskIsValid, setEnteredTaskIsValid] = useState(true);
  const [modelInput, setModelInput] = useState({
    taskinfo: "",
    date: "",
    time: "",
    checked: false
  });
  const handleAdd = () => {
    setIsModelOpen(!isModelOpen);
  }
  const closeModal = () => {
    setIsModelOpen(!isModelOpen);
  }
  const handleModelChange = (e) => {
    setModelInput({ [e.target.name]: e.target.value });
  }

  const nameInputClasses = enteredTaskIsValid
    ? 'form-control invalid'
    : 'form-control';
  return (
    <>
      <div className='container_div'>
        <Header></Header>
        <div className='btn_group'>
          <Button className='btn-add' onClick={handleAdd}>ADD Task</Button>
          <FilterTask></FilterTask>
        </div>
        <ToDoList></ToDoList>
      </div>
      <Modal
        isOpen={isModelOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={addTodosHandler} className='form-control'>
          <div className={nameInputClasses}>
            <label htmlFor='taskinfo'>Add New Task</label>
            <input type='text' name='taskinfo' value={modelInput.taskinfo} onChange={handleModelChange} />
            {!enteredTaskIsValid && <p className='error-text'>Task must not be empty..!</p>}
          </div>
          <div className='form-actions'>
            <Button type="submit">Submit</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </div>
        </form>

      </Modal>
    </>
  );
}

export default App;
