import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { DropdownMenu } from "../Elements/DropdownMenu";
import { Todo } from "../../__generated__/graphql";

type TodoItemProps = {
  todoItem: Todo;
  updateTodoTitle: (id: string, title: string) => void;
  removeTodo: (id: string) => void;
  updateTodoCompleteStatus: (id: string, isCompleted: boolean) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todoItem,
  updateTodoTitle,
  removeTodo,
  updateTodoCompleteStatus,
}) => {
  const [isTodoTitleEditing, setisTodoTitleEditing] = useState<boolean>(false);
  const [todoTitleInput, setTodoTitleInput] = useState<string>(todoItem.title);
  const [isCompleted, setIsCompleted] = useState<boolean>(todoItem.isCompleted);

  const handleTodoTitleInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => setTodoTitleInput(event.target.value);

  const handleTodoTitleBlur: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    setisTodoTitleEditing(false);
    if (todoTitleInput === todoItem.title) return;
    updateTodoTitle(todoItem.id, todoTitleInput);
  };

  const handleCompleteTodoCheckboxChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    updateTodoCompleteStatus(todoItem.id, !isCompleted);
    setIsCompleted((prev) => !prev);
  };

  const handleEditTodoTitleBtn: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setisTodoTitleEditing(true);
  };

  const handleRemoveTodoBtn: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    removeTodo(todoItem.id);
  };

  return (
    <>
      <div
        className={`flex justify-between my-4 px-4 h-20 items-center shadow-sm bg-white rounded border-l-8 ${
          todoItem.isCompleted ? "border-emerald-500" : "border-blue-600"
        }`}
      >
        <div className="flex w-full items-center">
          <input
            checked={isCompleted}
            type="checkbox"
            onChange={handleCompleteTodoCheckboxChange}
            className="w-4 h-4"
          />
          <div className="flex flex-col ml-4">
            {isTodoTitleEditing ? (
              <>
                <input
                  type="text"
                  value={todoTitleInput}
                  className="focus:outline-none text-slate-600"
                  autoFocus
                  onChange={handleTodoTitleInputChange}
                  onBlur={handleTodoTitleBlur}
                />
              </>
            ) : (
              <p
                className={`w-full  ${
                  todoItem.isCompleted
                    ? "text-emerald-500 line-through"
                    : "text-slate-600"
                }`}
              >
                {todoItem.title}
              </p>
            )}

            <small className="text-gray-400">
              {todoItem.createdAt.toISOString().split("T")[0]}
            </small>
          </div>
        </div>

        <DropdownMenu
          clickTarget={
            <small className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
              •••
            </small>
          }
          menuItems={[
            <div key={1}>
              <button
                onClick={handleEditTodoTitleBtn}
                className="flex justify-between items-center w-full h-hull text-start text-slate-600"
              >
                <span>Edit</span>
                <AiOutlineEdit />
              </button>
            </div>,
            <button
              key={2}
              onClick={handleRemoveTodoBtn}
              className="flex justify-between items-center w-full h-hull text-start"
            >
              <span className="text-red-400">Remove</span>
              <BiTrash />
            </button>,
          ]}
        />
      </div>
    </>
  );
};
