import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { DropdownMenu } from "../Elements/DropdownMenu";

type TodoItemProps = {
  todoItem: any;
  onEditBtnClick: any;
  onRemoveBtnClick: any;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todoItem,
  onEditBtnClick,
  onRemoveBtnClick,
}) => {
  return (
    <>
      <div
        className={`flex justify-between my-4 px-4 h-20 items-center shadow-sm bg-white rounded border-l-8 ${
          todoItem.isCompleted ? "border-emerald-500" : "border-blue-600"
        }`}
      >
        <div className="flex w-full items-center">
          <input type="checkbox" className="w-4 h-4" />
          <div className="flex flex-col ml-4">
            <p
              className={`w-full  ${
                todoItem.isCompleted
                  ? "text-emerald-500 line-through"
                  : "text-slate-600"
              }`}
            >
              {todoItem.title}
            </p>
            <small className="text-gray-400">
              {todoItem.createdAt.split("T")[0]}
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
                onClick={onEditBtnClick}
                className="flex justify-between items-center w-full h-hull text-start text-slate-600"
              >
                <span>Edit</span>
                <AiOutlineEdit />
              </button>
            </div>,
            <button
              key={2}
              onClick={onRemoveBtnClick}
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
