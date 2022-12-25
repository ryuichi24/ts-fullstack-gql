import React from "react";
import { gql, useQuery } from "@apollo/client";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Elements/Button";
import { InputField } from "./components/Elements/InputField";
import { Layout } from "./components/Layout";

const getTodosQuery = gql`
  query GetTodos {
    getTodos {
      todos {
        title
        id
        isCompleted
        updatedAt
        createdAt
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(getTodosQuery);

  return (
    <Layout>
      <div className="max-w-xl p-7 mx-auto">
        <div className="rounded shadow p-6 bg-white">
          <form className="flex flex-col">
            <InputField
              placeholder="buy some food..."
              className="flex flex-col mb-6"
            />
            <Button size="sm">Add Todo</Button>
          </form>
        </div>

        <div>
          {data?.getTodos.todos.map((todoItem: any) => (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              onEditBtnClick={() => ({})}
              onRemoveBtnClick={() => ({})}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;
