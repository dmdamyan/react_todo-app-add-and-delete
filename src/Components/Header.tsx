import React, { useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { createTodo, USER_ID } from '../api/todos';

type Props = {
  todos: Todo[];
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setUpdateData: React.Dispatch<React.SetStateAction<Date>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setProcessingIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const Header: React.FC<Props> = ({
  todos,
  title,
  setTitle,
  setTodos,
  setUpdateData,
  setErrorMessage,
  setTempTodo,
  setProcessingIds,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage('Title should not be empty');

      return;
    }

    setTempTodo({
      id: 0,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    });

    setIsAdding(true);

    createTodo({ userId: USER_ID, title: trimmedTitle, completed: false })
      .then(newTodo => {
        setProcessingIds(prev => [...prev, newTodo.id]);
        setTodos(currentTodos => [...currentTodos, newTodo]);
        setTempTodo(null);
      })
      .catch(() => setErrorMessage('Unable to add a todo'))
      .finally(() => {
        setTitle('');
        setUpdateData(new Date());
        setIsAdding(false);
        inputRef.current?.focus();
      });
  };

  return (
    <div className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.length > 0 && todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          disabled={isAdding}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </div>
  );
};
