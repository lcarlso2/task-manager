import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/TodoList";

export default function App() {
  return (
    <main>
      <h1>Todos</h1>
      <CreateTodo />
      <TodoList />
    </main>
  );
}
