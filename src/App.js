import React, { useState } from 'react';
import { AiFillPlusCircle as Plus } from 'react-icons/ai';
import ToDoList from './components/ToDoList';

function App() {
  const [inputList, setInputList] = useState("");
  const [Item, setItem] = useState([]);

  const addList = (event) => {
    setInputList(event.target.value)
  }

console.log(Item);
  const addItem = () => {
    setItem((oldVal) => {
      return [...oldVal, inputList]
    });
    setInputList("");
  };

  const deleteItem = (id) => {
    setItem((oldval) => {
      return oldval.filter((item, index) => {
        return index !== id;
      });
    });
  };

  return (
    <>
      <div className='bg-blue-200 w-full h-[100vh] pt-10 flex flex-row justify-center'>
        <div className="h-[80vh] flex flex-col rounded-3xl shadow-2xl bg-white text-center overflow-hidden">
          <h1 className='text-5xl text-center font-bold p-3 mt-10 shadow-xl text-white bg-blue-500'>ToDo List</h1>
          <form className='mt-9 mx-auto flex flex-row justify-between'>
            <input className='bg-transparent outline-none text-gray-500 border-b-4 rounded-b-md border-b-blue-500 w-[80%] text-center text-2xl font-semibold tracking-[0.8px]' type="text" placeholder='Add List Item' onChange={addList} />
            <Plus onClick={addItem} className='text-5xl text-blue-500 cursor-pointer font-black hover:text-red-500 duration-300 rounded-full shadow-md' />
          </form>
        <ul className={`mx-12 mt-2 flex flex-col ${Item.length >= 6 ? "overflow-y-scroll" : ""}`}>
            {
              Item.map((item, index) => {
                return <ToDoList key={index} id={index} text={item} deleteItem={deleteItem} />
              })
            }
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
