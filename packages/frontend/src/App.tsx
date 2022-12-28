import React, { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Elements/Button";
import { InputField } from "./components/Elements/InputField";
import { Layout } from "./components/Layout";
import { Loader } from "./components/Elements/Loader";
import { useTodos } from "./hooks/useTodos";

function App() {
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
    <Layout>
      <div className="max-w-xl p-7 mx-auto">
        <div className="rounded shadow p-6 bg-white">
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
  );
}

export default App;
