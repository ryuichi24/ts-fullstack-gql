import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { Todo } from "../../__generated__/graphql";
import { DropdownMenu } from "../Elements/DropdownMenu";

type TodoItemProps = {
  todoItem: Todo;
  removeTodo: (id: string) => void | Promise<void>;
  updateTodoCompleteStatus: (
    id: string,
    isCompleted: boolean
  ) => void | Promise<void>;
  updateTodoTitle: (id: string, title: string) => void | Promise<void>;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todoItem,
  removeTodo,
  updateTodoCompleteStatus,
  updateTodoTitle,
}) => {
  const [isTitleEditting, setIsTitleEditting] = useState<boolean>(false);
  const [todoTitleInput, setTodoTitleInput] = useState<string>(todoItem.title);

  const handleRemoveBtnClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    removeTodo(todoItem.id);
  };

  const handleCompleteTodoCheckboxChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    updateTodoCompleteStatus(todoItem.id, event.target.checked);
  };

  const handleTodoTitleInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setTodoTitleInput(event.target.value);

  const handleEditTitleBtnClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setIsTitleEditting(true);
  };

  const handleTodoTitleInputBlur: React.FocusEventHandler<
    HTMLInputElement
  > = async (event) => {
    try {
      await updateTodoTitle(todoItem.id, todoTitleInput);
      setIsTitleEditting(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <article
      className={`flex justify-between items-center shadow-sm bg-white rounded border-l-8 my-4 px-4 h-20 ${
        todoItem?.isCompleted ? "border-emerald-500" : "border-blue-600"
      }`}
      key={todoItem?.id}
    >
      <div className="flex items-center">
        <input
          checked={todoItem?.isCompleted}
          type={"checkbox"}
          className="w-4 h-4"
          onChange={handleCompleteTodoCheckboxChange}
        />
        <div className="flex flex-col ml-4">
          {isTitleEditting ? (
            <input
              className="focus:outline-none text-slate-600"
              type={"text"}
              value={todoTitleInput}
              onChange={handleTodoTitleInput}
              autoFocus
              onBlur={handleTodoTitleInputBlur}
            />
          ) : (
            <p
              className={`${
                todoItem?.isCompleted
                  ? "text-emerald-500 line-through"
                  : "text-slate-600"
              }`}
            >
              {todoItem?.title}
            </p>
          )}

          <small className="text-gray-400">
            {todoItem?.createdAt.toISOString().split("T")[0]}
          </small>
        </div>
      </div>

      <DropdownMenu
        clickTarget={
          <small className="text-gray-500 hover:bg-gray-100 rounded-full p-1">
            •••
          </small>
        }
        menuItems={[
          <button
            onClick={handleEditTitleBtnClick}
            key={1}
            className="flex justify-between w-full items-center text-gray-800 cursor-pointer"
          >
            <span>Edit</span>
            <AiOutlineEdit />
          </button>,
          <button
            onClick={handleRemoveBtnClick}
            key={2}
            className="flex justify-between w-full items-center text-red-400 cursor-pointer"
          >
            <span>Remove</span>
            <BiTrash />
          </button>,
        ]}
      />
    </article>
  );
};
