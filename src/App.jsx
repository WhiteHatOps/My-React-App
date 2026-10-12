import React, { useState } from 'react';
import { Terminal, Plus, Trash2, CheckCircle2, Circle, AlertCircle, Tag, Layers } from 'lucide-react';
import './App.css'; // Custom CSS import

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Setup GitHub Actions CI/CD for Frontend', category: 'CI/CD', priority: 'High', completed: false },
    { id: 2, title: 'Update Kubernetes Cluster to v1.28', category: 'Infrastructure', priority: 'High', completed: true },
    { id: 3, title: 'Configure Prometheus & Grafana Alerts', category: 'Monitoring', priority: 'Medium', completed: false },
    { id: 4, title: 'Rotate AWS IAM Access Keys', category: 'Security', priority: 'High', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('Infrastructure');
  const [priority, setPriority] = useState('Medium');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const taskObj = {
      id: Date.now(),
      title: newTask,
      category: category,
      priority: priority,
      completed: false
    };
    setTasks([taskObj, ...tasks]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <div className="max-w-wrapper">
        
        <header className="app-header">
          <div className="icon-box">
            <Terminal size={32} />
          </div>
          <div>
            <h1>DevOps Task Manager</h1>
            <p><Layers size={16} /> Manage your infrastructure workflows</p>
          </div>
        </header>

        <div className="task-form-card">
          <form onSubmit={addTask} className="task-form">
            <input 
              type="text" 
              placeholder="e.g., Dockerize Node.js application..." 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="task-input"
            />
            
            <div className="form-controls">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="CI/CD">CI/CD</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Security">Security</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Database">Database</option>
              </select>

              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <button type="submit" className="btn-add">
                <Plus size={20} /> Add
              </button>
            </div>
          </form>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <CheckCircle2 size={48} className="empty-icon" />
              <p>No pending tasks. Infrastructure is running smoothly!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <button onClick={() => toggleComplete(task.id)} className="btn-toggle">
                    {task.completed ? <CheckCircle2 size={28} className="icon-completed" /> : <Circle size={28} className="icon-pending" />}
                  </button>

                  <div className="task-details">
                    <span className="task-title">{task.title}</span>
                    <div className="task-meta">
                      <span className="badge category-badge">
                        <Tag size={14} /> {task.category}
                      </span>
                      <span className={`badge priority-badge ${task.priority.toLowerCase()}`}>
                        <AlertCircle size={12} /> {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                <button onClick={() => deleteTask(task.id)} className="btn-delete" title="Delete Task">
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;