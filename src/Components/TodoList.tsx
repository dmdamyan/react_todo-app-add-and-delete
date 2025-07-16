import React from 'react';
import { Todo } from '../types/Todo';
// import classNames from 'classnames';
// import { deleteTodo } from '../api/todos';
import { TodoItem } from './TodoItem';
import classNames from 'classnames';

type Props = {
  filteredTodos: Todo[];
  setUpdateData: React.Dispatch<React.SetStateAction<Date>>;
  tempTodo: Todo | null;
  processingIds: Todo['id'][];
  setProcessingIds: React.Dispatch<React.SetStateAction<number[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  setUpdateData,
  tempTodo,
  processingIds,
  setProcessingIds,
  setErrorMessage,
  setTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setProcessingIds={setProcessingIds}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          setUpdateData={setUpdateData}
          processingIds={processingIds}
        />
      ))}

      {tempTodo !== null && (
        <div
          data-cy="Todo"
          className={classNames('todo', {
            completed: tempTodo.completed,
            active: !tempTodo.completed,
          })}
          key={tempTodo.id}
        >
          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>

          {/* overlay will cover the todo while it is being deleted or updated */}
          {/* {processingIds.includes(tempTodo.id) && ( */}
          <div
            data-cy="TodoLoader"
            className={classNames('modal overlay', {
              'is-active': processingIds.includes(tempTodo.id),
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
          {/* )} */}
        </div>
      )}
    </section>
  );
};

// {
//   tempTodo && (
//     <div className="todo">
//       <span>{tempTodo.title}</span>
//       <div data-cy="TodoLoader" className="modal overlay">
//         ...
//       </div>
//     </div>
//   );
// }

//  <div
//           data-cy="Todo"
//           className={classNames('todo', {
//             completed: todo.completed,
//             active: !todo.completed,
//           })}
//           key={todo.id}
//         >
//           {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//           <label className="todo__status-label">
//             <input
//               data-cy="TodoStatus"
//               type="checkbox"
//               className="todo__status"
//               checked={todo.completed}
//               onChange={() => {}}
//             />
//           </label>

//           <span data-cy="TodoTitle" className="todo__title">
//             {todo.title}
//           </span>

//           <button
//             type="button"
//             className="todo__remove"
//             data-cy="TodoDelete"
//             onClick={() => {
//               setProcessingIds(prev => [...prev, todo.id]);
//               deleteTodo(todo.id)
//                 .then(() =>
//                   setTodos(currentTodos =>
//                     currentTodos.filter(t => t.id !== todo.id),
//                   ),
//                 )
//                 .catch(() => setErrorMessage('Unable to delete a todo'))
//                 .finally(() => {
//                   setProcessingIds(prev => prev.filter(id => id !== todo.id));
//                   setUpdateData(new Date());
//                 });
//             }}
//           >
//             ×
//           </button>

//           {/* overlay will cover the todo while it is being deleted or updated */}
//           {processingIds.includes(todo.id) && (
//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           )}
//         </div>
