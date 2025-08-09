import { PrismaClient } from '@prisma/client';
import addTodo from './actions/addTodo';
import deleteTodo from './actions/deleteTodo';

const prisma = new PrismaClient();

export default async function Home() {
  const todos = await prisma.todo.findMany();
  const priorityOrder = {
    High: 1,
    Normal: 2,
    Low: 3,
  };

  const sortedtodos = [...todos].sort( (a, b) => {
     return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Todo List</h1>
      <form action={addTodo} className="mb-4">
        <input
          name="title"
          type="text"
          placeholder="Add a new todo"
          required
          className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mr-2 text-black"
        />
        <div className="relative inline-block mr-2">
          <select
            name="priority"
            defaultValue={'DEFAULT'}
            className="shadow appearance-none border rounded py-2 px-3 text-grey-darker text-black pr-8"
          >
          <option value="DEFAULT" disabled>Choose your Task Priority ...</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>
          <span className="pointer-events-none  absolute inset-y-0 right-0 flex items-center px-2 text-black text-red-800">
            ▼
          </span>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Todo
        </button>
      </form>
      <ul>
        {sortedtodos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow my-2"
          >
            <span className={` text-lg text-black ${todo.priority === "High" ? "bg-red-500" : todo.priority === 'Normal' ? "bg-yellow-500" : "bg-gray-500 "}`}>{todo.title} {todo.priority}</span>
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}