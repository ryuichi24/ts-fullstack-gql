import React, { useState } from "react";
import SyncLoader from 'react-spinners/SyncLoader'
import { Toaster } from "react-hot-toast";
import { Layout } from "./components/Layout";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Elements/Button";
import { InputField } from "./components/Elements/InputField";
import { useTodos } from "./hooks/useTodos";

function App() {
  const [title, setTitle] = useState<string>("");
  const {
    todoData,
    todoDataLoading,
    makeTodo,
    makeTodoMutLoading,
    removeTodo,
    updateTodoCompleteStatus,
    updateTodoTitle,
  } = useTodos();

  const handleTitleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setTitle(event.target.value);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    await makeTodo(title);
    setTitle("");
  };

  return (
    <>
      <Toaster position="top-right" />
      <Layout>
        <div className="max-w-xl mx-auto p-7">
          <div className="bg-white p-6 rounded shadow">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <InputField
                containerClassName="flex flex-col mb-6"
                labelName="New Todo"
                placeholder="buy some food..."
                onChange={handleTitleInputChange}
                value={title}
              />
              <Button
                size="sm"
                variant="primary"
                isLoading={makeTodoMutLoading}
              >
                Add Todo
              </Button>
            </form>
          </div>
          {todoDataLoading ? (
            <div className="flex justify-center mt-9"><SyncLoader color="#2563eb" /></div>
          ) : (
            todoData?.getTodos?.todos?.map((item) => (
              <TodoItem
                key={item?.id}
                todoItem={item!}
                removeTodo={removeTodo}
                updateTodoCompleteStatus={updateTodoCompleteStatus}
                updateTodoTitle={updateTodoTitle}
              />
            ))
          )}
        </div>
      </Layout>
    </>
  );
}

export default App;
