import React, { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Elements/Button";
import { InputField } from "./components/Elements/InputField";
import { Layout } from "./components/Layout";
import { Loader } from "./components/Elements/Loader";
import {
  GetTodosDocument,
  useGetTodosQuery,
  useMakeTodoMutation,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "./__generated__/graphql";

function App() {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [makeTodoMut, { loading: loadingMakeTodoResult }] =
    useMakeTodoMutation();
  const [removeTodoMut, {}] = useRemoveTodoMutation();
  const [updateTodoMut, {}] = useUpdateTodoMutation();
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

  const editTodoTitle = (todoId: string, todoTitle: string) => {
    updateTodoMut({
      variables: {
        updateTodoInput: {
          todoId,
          title: todoTitle,
        },
      },
    });
  };

  const removeTodo = (todoId: string) => {
    removeTodoMut({
      variables: {
        removeTodoInput: {
          todoId,
        },
      },
      refetchQueries: [{ query: GetTodosDocument }],
    });
  };

  const updateTodoCompleteStatus = (todoId: string, isCompleted: boolean) => {
    updateTodoMut({
      variables: {
        updateTodoInput: {
          todoId,
          isCompleted,
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
