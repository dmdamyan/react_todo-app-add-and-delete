import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  tempTodo: Todo;
};

export const TodoItem: React.FC<Props> = ({ tempTodo }) => {
  return (
    <>
      <span data-cy="TodoItem" className="todo__title">
        {tempTodo.title}
      </span>
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </>
  );
};
