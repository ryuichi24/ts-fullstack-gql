import React from "react";
import { useTodosQuery } from "./__generated__/graphql";
import { Layout } from "./components/Layout";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Elements/Button";
import { InputField } from "./components/Elements/InputField";

function App() {
  const { data, loading, error } = useTodosQuery();

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-7">
        <div className="bg-white p-6 rounded shadow">
          <form className="flex flex-col">
            <InputField
              containerClassName="flex flex-col mb-6"
              labelName="New Todo"
              placeholder="buy some food..."
            />
            <Button size="sm" variant="primary">
              Add Todo
            </Button>
          </form>
        </div>
        {data?.getTodos?.todos?.map((item) => (
          <TodoItem key={item?.id} todoItem={item!} />
        ))}
      </div>
    </Layout>
  );
}

export default App;
