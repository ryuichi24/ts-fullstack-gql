import React from 'react'
import { useTodosQuery } from './__generated__/graphql';


function App() {
  const { data, loading, error } = useTodosQuery();

  return (
    <div className="App">
      <div>
        {data?.getTodos?.todos?.map((item) => <p key={item?.id}>{item?.title} {item?.createdAt.toISOString()}</p>)}
      </div>
    </div>
  )
}

export default App
