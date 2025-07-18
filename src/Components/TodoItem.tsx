import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { deleteTodo } from '../api/todos';

type Props = {
  todo: Todo;
  setProcessingIds: React.Dispatch<React.SetStateAction<number[]>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setUpdateData: React.Dispatch<React.SetStateAction<Date>>;
  processingIds: number[];
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setProcessingIds,
  setTodos,
  setErrorMessage,
  setUpdateData,
  processingIds,
}) => {
  const handleClick = () => {
    setProcessingIds(prev => [...prev, todo.id]);
    deleteTodo(todo.id)
      .then(() =>
        setTodos(currentTodos => currentTodos.filter(t => t.id !== todo.id)),
      )
      .catch(() => setErrorMessage('Unable to delete a todo'))
      .finally(() => {
        setProcessingIds(prev => prev.filter(id => id !== todo.id));
        setUpdateData(new Date());
      });
  };

  return (
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
        onClick={handleClick}
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={`modal overlay ${processingIds.includes(todo.id) ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
