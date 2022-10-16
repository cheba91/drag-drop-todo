import { Todo } from '../model';
import './styles.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
   todo: Todo;
   todos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
   index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
   const [edit, setEdit] = useState<boolean>(false);
   const [todoText, setTodoText] = useState<string>(todo.todo);

   const handleDone = (id: number) => {
      setTodos(
         todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
         )
      );
   };
   const handleDelete = (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
   };
   const handleEdit = (todoText: string, id: number) => {
      setTodos(
         todos.map((todo) =>
            todo.id === id ? { ...todo, todo: todoText } : todo
         )
      );
   };

   return (
      <Draggable draggableId={todo.id.toString()} index={index}>
         {(provided, snapshot) => (
            <form
               className={`todos__single ${snapshot.isDragging && 'drag'}`}
               onSubmit={(e) => e.preventDefault()}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               ref={provided.innerRef}
            >
               {edit ? (
                  <input
                     className="todos__single--text"
                     value={todoText}
                     onChange={(e) => setTodoText(e.target.value)}
                  />
               ) : (
                  <span
                     className={`todos__single--text ${
                        todo.isDone && 'todo-done'
                     }`}
                  >
                     {todo.todo}
                  </span>
               )}
               <div>
                  <span
                     className="icon"
                     onClick={() => {
                        setEdit((edit) => !edit);
                        handleEdit(todoText, todo.id);
                     }}
                  >
                     <AiFillEdit />
                  </span>
                  <span className="icon" onClick={() => handleDelete(todo.id)}>
                     <AiFillDelete />
                  </span>
                  {/* <span className="icon" onClick={() => handleDone(todo.id)}>
                     <MdDone />
                  </span> */}
               </div>
            </form>
         )}
      </Draggable>
   );
};

export default SingleTodo;
