import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { deleteTodo } from '../api/todos';

type Props = {
  todos: Todo[];
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  setProcessingIds: React.Dispatch<React.SetStateAction<number[]>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterStatus,
  setFilterStatus,
  setProcessingIds,
  setTodos,
  setErrorMessage,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => {
      setProcessingIds(prev => [...prev, todo.id]);
      deleteTodo(todo.id)
        .then(() => {
          setTodos(currentTodos => currentTodos.filter(t => t.id !== todo.id));
        })
        .catch(() => setErrorMessage('Unable to delete a todo'))
        .finally(() => {
          setProcessingIds(prev => prev.filter(id => id !== todo.id));
        });
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterStatus === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterStatus('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterStatus === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterStatus('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterStatus === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterStatus('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
