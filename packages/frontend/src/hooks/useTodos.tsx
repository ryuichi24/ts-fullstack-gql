import { toast } from "react-hot-toast";
import {
  useTodosQuery,
  useMakeTodoMutation,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
  TodosDocument,
} from "../__generated__/graphql";
import { isEmptyString } from "../utils/isEmptyString";

export const useTodos = () => {
  const {
    data: todoData,
    loading: todoDataLoading,
    error: todoDataError,
  } = useTodosQuery();
  const [
    makeTodoMut,
    { loading: makeTodoMutLoading, error: makeTodoMutError },
  ] = useMakeTodoMutation();
  const [
    removeTodoMut,
    { loading: removeTodoMutLoading, error: removeTodoMutError },
  ] = useRemoveTodoMutation();
  const [
    updateTodoMut,
    { loading: updateTodoMutLoading, error: updateTodoMutError },
  ] = useUpdateTodoMutation();

  const makeTodo = async (title: string) => {
    if (isEmptyString(title)) {
      toast.error("title is not allowed!");
      return;
    }

    await makeTodoMut({
      variables: {
        makeTodoInput: {
          title,
        },
      },
      refetchQueries: [TodosDocument],
    });

    toast.success("A new todo has been created!");
  };

  const removeTodo = async (id: string) => {
    await removeTodoMut({
      variables: {
        removeTodoInput: {
          todoId: id,
        },
      },
      refetchQueries: [TodosDocument],
    });

    toast.success("The todo has been removed!");
  };

  const updateTodoCompleteStatus = async (id: string, isCompleted: boolean) => {
    updateTodoMut({
      variables: {
        updateTodoInput: {
          todoId: id,
          isCompleted,
        },
      },
      refetchQueries: [TodosDocument],
    });
    toast.success("The todo has been updated!");
  };

  const updateTodoTitle = async (id: string, title: string) => {
    if (isEmptyString(title)) {
      toast.error("title is not allowed!");
      return;
    }

    updateTodoMut({
      variables: {
        updateTodoInput: {
          todoId: id,
          title,
        },
      },
      refetchQueries: [TodosDocument],
    });
    toast.success("The todo has been updated!");
  };

  return {
    todoData,
    todoDataError,
    todoDataLoading,
    makeTodo,
    makeTodoMutLoading,
    makeTodoMutError,
    removeTodo,
    removeTodoMutLoading,
    removeTodoMutError,
    updateTodoCompleteStatus,
    updateTodoTitle,
    updateTodoMutLoading,
    updateTodoMutError,
  } as const;
};
