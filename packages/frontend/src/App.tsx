import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Elements/Button";
import { InputField } from "./components/Elements/InputField";
import { Layout } from "./components/Layout";
import { Loader } from "./components/Elements/Loader";
import { useTodos } from "./hooks/useTodos";
import { useDarkModeContext } from "./context/DarkModeContext";

function App() {
  const { isDarkMode } = useDarkModeContext();
  const [todoTitle, setTodoTitle] = useState<string>("");
  const {
    todoData,
    todoLoading,
    makeTodo,
    makeTodoLoading,
    updateTodoTitle,
    updateTodoCompleteStatus,
    removeTodo,
  } = useTodos();

  const handleTodoTitleInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => setTodoTitle(event.target.value);

  const handleTodoFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    makeTodo(todoTitle).then(() => setTodoTitle(""));
  };

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <Toaster position="top-right" reverseOrder={false} toastOptions={{
        className: `dark:bg-zinc-700 dark:text-zinc-100`
      }} />
      <Layout>
        <div className="max-w-xl p-7 mx-auto">
          <div className="rounded shadow p-6 bg-white dark:bg-zinc-700">
            <form onSubmit={handleTodoFormSubmit} className="flex flex-col">
              <InputField
                labelName="New Todo"
                placeholder="buy some food..."
                className="flex flex-col mb-6"
                value={todoTitle}
                onChange={handleTodoTitleInputChange}
              />
              <Button size="sm" isLoading={makeTodoLoading}>
                Add Todo
              </Button>
            </form>
          </div>

          <div>
            {todoLoading ? (
              <div className="flex justify-center mt-9">
                <Loader color="#2563eb" size={10} />
              </div>
            ) : (
              todoData?.getTodos?.todos?.map((todoItem) => (
                <TodoItem
                  key={todoItem?.id}
                  todoItem={todoItem!}
                  updateTodoTitle={updateTodoTitle}
                  removeTodo={removeTodo}
                  updateTodoCompleteStatus={updateTodoCompleteStatus}
                />
              ))
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default App;
