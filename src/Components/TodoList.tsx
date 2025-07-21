import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import classNames from 'classnames';

type Props = {
  filteredTodos: Todo[];
  tempTodo: Todo | null;
  processingIds: Todo['id'][];
  setProcessingIds: React.Dispatch<React.SetStateAction<number[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  focusInput: () => void | undefined;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  tempTodo,
  processingIds,
  setProcessingIds,
  setErrorMessage,
  setTodos,
  focusInput,
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
          processingIds={processingIds}
          focusInput={focusInput}
        />
      ))}

      {tempTodo && (
        <div
          data-cy="Todo"
          className={classNames('todo', {
            completed: tempTodo.completed,
            active: !tempTodo.completed,
          })}
          key="temp"
        >
          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
