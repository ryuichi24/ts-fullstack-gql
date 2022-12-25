import React, { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Elements/Button";
import { InputField } from "./components/Elements/InputField";
import { Layout } from "./components/Layout";
import { Loader } from "./components/Elements/Loader";
import {
  GetTodosDocument,
  Todo,
  useGetTodosQuery,
  useMakeTodoMutation,
  useRemoveTodoMutation,
} from "./__generated__/graphql";

function App() {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [makeTodoMut, { loading: loadingMakeTodoResult }] =
    useMakeTodoMutation();
  const [removeTodoMut, {}] = useRemoveTodoMutation();
  const { data, loading } = useGetTodosQuery();

  const handleTodoTitleInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => setTodoTitle(event.target.value);

  const handleTodoFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    if (!todoTitle.trim()) return;
    makeTodoMut({
      variables: {
        makeTodoInput: {
          title: todoTitle,
        },
      },
      refetchQueries: [{ query: GetTodosDocument }],
    }).then(() => setTodoTitle(""));
  };

  const editTodoTitle = (todoItem: Todo) => {
    //
  };

  const removeTodo = (todoItem: Todo) => {
    removeTodoMut({
      variables: {
        removeTodoInput: {
          todoId: todoItem.id,
        },
      },
      refetchQueries: [{ query: GetTodosDocument }],
    });
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
            <Button size="sm" isLoading={loadingMakeTodoResult}>
              Add Todo
            </Button>
          </form>
        </div>

        <div>
          {loading ? (
            <div className="flex justify-center mt-9">
              <Loader color="#2563eb" size={10} />
            </div>
          ) : (
            data?.getTodos?.todos?.map((todoItem) => (
              <TodoItem
                key={todoItem?.id}
                todoItem={todoItem!}
                editTodoTitle={editTodoTitle}
                removeTodo={removeTodo}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
