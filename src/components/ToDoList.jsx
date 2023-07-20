import React from 'react';
import { AiFillPlusCircle as Plus } from 'react-icons/ai';

const ToDoList = (props) => {
    return (
        <li className='flex p-2 my-2 shadow-md rounded-lg'>
            <Plus onClick={() => props.deleteItem(props.id)} className='text-4xl text-blue-500 cursor-pointer font-black hover:text-red-500 duration-300 hover:rotate-45' />
            <span className='px-2 text-2xl font-semibold text-gray-500'>
                {props.text}
            </span>
        </li>
    );
}

export default ToDoList;