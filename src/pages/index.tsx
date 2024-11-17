import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState([
    { text: "Next.js", category: "Work", completed: false },
    { text: "TypeScript", category: "Personal", completed: false },
    { text: "Styling AI", category: "Work", completed: false },
  ]);
  const [temp, setTemp] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  function addTodo() {
    if (temp.trim() !== "") {
      setTodo([
        ...todo,
        { text: temp, category: "Work", completed: false },
      ]);
      setTemp("");
    }
  }

  function deleteTodo(index) {
    setTodo(todo.filter((item, i) => i !== index));
  }

  function editTodo(index) {
    setTemp(todo[index].text);
    deleteTodo(index);
  }

  function toggleCompleted(index) {
    const updatedTodos = todo.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodo(updatedTodos);
  }

  function clearCompleted() {
    setTodo(todo.filter((item) => !item.completed));
  }

  const filteredTodos = categoryFilter === "All"
    ? todo
    : todo.filter(item => item.category === categoryFilter);

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg"> 
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">
        Todo List
      </h1>
 
      <div className="mb-4">
        <input
          className="w-full p-2 mb-2 border text-slate-700 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setTemp(e.target.value)}
          value={temp}
          type="text"
          placeholder="Enter task..."
        />
        <button
          onClick={addTodo}
          className="w-full p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
 
      <div className="mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full p-2 border text-slate-800 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div> 
 
      <div>
        {filteredTodos.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 mb-2 border rounded-lg border-gray-200 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(index)}
                className="form-checkbox h-5 w-5 text-indigo-500"
              />
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
                className="text-gray-700 text-sm"
              >
                {index + 1}: {item.text} - {item.category}
              </span>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => deleteTodo(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => editTodo(index)}
                className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
 
      <div className="mt-4">
        <button
          onClick={clearCompleted}
          className="w-full p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}
