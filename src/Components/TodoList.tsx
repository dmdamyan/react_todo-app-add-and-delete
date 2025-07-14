import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { deleteTodo } from '../api/todos';
import { TodoItem } from './TodoItem';

type Props = {
  filteredTodos: Todo[];
  setUpdateData: React.Dispatch<React.SetStateAction<Date>>;
  tempTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  setUpdateData,
  tempTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', {
            completed: todo.completed,
            active: !todo.completed,
          })}
          key={todo.id}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => {}}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              deleteTodo(todo.id).then(() => setUpdateData(new Date()));
            }}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      {tempTodo !== null && <TodoItem tempTodo={tempTodo} />}
    </section>
  );
};
