import React, { useState } from "react";
import {
  TodosDocument,
  useMakeTodoMutation,
  useRemoveTodoMutation,
  useTodosQuery,
  useUpdateTodoMutation,
} from "./__generated__/graphql";
import { Layout } from "./components/Layout";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Elements/Button";
import { InputField } from "./components/Elements/InputField";

function App() {
  const [title, setTitle] = useState<string>("");
  const { data, loading, error } = useTodosQuery();
  const [makeTodoMut, { loading: makeTodoMutLoading }] = useMakeTodoMutation();
  const [removeTodoMut, { loading: removeTodoMutLoading }] =
    useRemoveTodoMutation();
  const [updateTodoMut, { loading: updateTodoMutLoading }] =
    useUpdateTodoMutation();

  const handleTitleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setTitle(event.target.value);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      await makeTodoMut({
        variables: {
          makeTodoInput: {
            title,
          },
        },
        refetchQueries: [TodosDocument],
      });

      setTitle("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await removeTodoMut({
        variables: {
          removeTodoInput: {
            todoId: id,
          },
        },
        refetchQueries: [TodosDocument],
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const updateTodoCompleteStatus = async (id: string, isCompleted: boolean) => {
    try {
      updateTodoMut({
        variables: {
          updateTodoInput: {
            todoId: id,
            isCompleted,
          },
        },
        refetchQueries: [TodosDocument],
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const updateTodoTitle = async (id: string, title: string) => {
    try {
      updateTodoMut({
        variables: {
          updateTodoInput: {
            todoId: id,
            title,
          },
        },
        refetchQueries: [TodosDocument],
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
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
            <Button size="sm" variant="primary">
              Add Todo
            </Button>
          </form>
        </div>
        {data?.getTodos?.todos?.map((item) => (
          <TodoItem
            key={item?.id}
            todoItem={item!}
            removeTodo={removeTodo}
            updateTodoCompleteStatus={updateTodoCompleteStatus}
            updateTodoTitle={updateTodoTitle}
          />
        ))}
      </div>
    </Layout>
  );
}

export default App;
