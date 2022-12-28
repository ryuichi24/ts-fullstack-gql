import toast from "react-hot-toast";
import {
  GetTodosDocument,
  useGetTodosQuery,
  useMakeTodoMutation,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "../__generated__/graphql";
import { isEmptyStr } from "../utils/isEmptyStr";
import { isError } from "../utils/isError";

export const useTodos = () => {
  const { data: todoData, loading: todoLoading } = useGetTodosQuery();
  const [makeTodoMut, { loading: makeTodoLoading }] = useMakeTodoMutation();
  const [updateTodoMut, { loading: updateTodoLoading }] =
    useUpdateTodoMutation();
  const [removeTodoMut, { loading: removeTodoLoading }] =
    useRemoveTodoMutation();

  const makeTodo = async (title: string) => {
    try {
      if (isEmptyStr(title)) return toast.error("The title is empty...");

      await makeTodoMut({
        variables: {
          makeTodoInput: {
            title,
          },
        },
        refetchQueries: [{ query: GetTodosDocument }],
      });

      toast.success("A new todo has been created.");
    } catch (error) {
      if (isError(error)) return alert(error.message);
    }
  };

  const updateTodoTitle = async (id: string, title: string) => {
    try {
      if (isEmptyStr(title)) return toast.error("The title is empty...");

      await updateTodoMut({
        variables: {
          updateTodoInput: {
            todoId: id,
            title,
          },
        },
      });

      toast.success("The todo has been updated.");
    } catch (error) {
      if (isError(error)) return alert(error.message);
    }
  };

  const updateTodoCompleteStatus = async (id: string, isCompleted: boolean) => {
    try {
      await updateTodoMut({
        variables: {
          updateTodoInput: {
            todoId: id,
            isCompleted,
          },
        },
        refetchQueries: [{ query: GetTodosDocument }],
      });

      toast.success("The todo has been updated.");
    } catch (error) {
      if (isError(error)) return alert(error.message);
    }
  };

  const removeTodo = async (id: string) => {
    await removeTodoMut({
      variables: {
        removeTodoInput: {
          todoId: id,
        },
      },
      refetchQueries: [{ query: GetTodosDocument }],
    });

    toast.success("The todo has been removed.");
  };

  return {
    todoData,
    todoLoading,
    makeTodo,
    makeTodoLoading,
    updateTodoTitle,
    updateTodoCompleteStatus,
    updateTodoLoading,
    removeTodo,
    removeTodoLoading,
  } as const;
};
