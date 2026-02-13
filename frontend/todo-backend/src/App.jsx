import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import { Trash2, Edit3, PlusCircle, CheckCircle2, Github } from 'lucide-react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!text.trim()) return;
    if (editingId) {
      const res = await updateTask(editingId, { title: text });
      setTasks(tasks.map(t => (t._id === editingId ? res.data : t)));
      setEditingId(null);
    } else {
      const res = await createTask({ title: text });
      setTasks([...tasks, res.data]);
    }
    setText("");
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <CheckCircle2 color="#fff" /> Taskio
        </div>
        <nav>
          <a href="https://github.com" target="_blank" rel="noreferrer">
          </a>
        </nav>
      </header>

      <div className="container">
        <div className="todo-card">
          <h1>My Daily Tasks</h1>
          
          <div className="input-group">
            <input 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder={editingId ? "Edit task..." : "Add a new task..."}
            />
            <button className="add-btn" onClick={handleAddOrUpdate}>
              {editingId ? "Save" : <PlusCircle size={20} />}
            </button>
          </div>

          <ul>
            {tasks.map(task => (
              <li key={task._id} className="task-item">
                <span 
                  className={`task-text ${task.completed ? 'completed' : ''}`}
                  onClick={() => updateTask(task._id, { completed: !task.completed }).then(loadTasks)}
                >
                  {task.title}
                </span>
                
                <div className="actions">
                  <button className="edit-btn" onClick={() => { setEditingId(task._id); setText(task.title); }}>
                    <Edit3 size={18} />
                  </button>
                  <button className="delete-btn" onClick={() => deleteTask(task._id).then(loadTasks)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2026 MERN Stack Project | Developed By Balamurugan</p>
      </footer>
    </>
  );
}

export default App;