import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';
import Login from './pages/Login';
import Github from './pages/Github';
import Param from './pages/param';
import BackendData from './pages/BackendData';
import RegisterForm from './pages/register';
import Todo from './pages/Todo';
import TodoList from './pages/Todolistappend';
import Notes from './pages/Notes';
// import TodoLogin from './components/login';
// import TodoRegister from './components/register';

function App() {
  // Function to get current time
  function currentTime() {
    const date = new Date();
    return (
      date.getHours().toString().padStart(2, '0') + ':' +
      date.getMinutes().toString().padStart(2, '0') + ':' +
      date.getSeconds().toString().padStart(2, '0')
    );
  }

  const [time, setTime] = useState(currentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(currentTime());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <>
      {/* Google Material Symbols */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      />

      {/* Wrap everything in Router */}

      <Navbar />

      <div className="App" style={{ minHeight: '81.1vh' }}>
        {/* <h1 align="center">Current Time</h1>
        <h2 align="center">{time}</h2> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/github" element={<Github />} />
          <Route path="/login/:id" element={<Param />} />
          <Route path="/backend" element={<BackendData />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/todolist" element={<TodoList />} />
          {/* <Route path="/todologin" element={<TodoLogin />} /> */}
          {/* <Route path="/todoregister" element={<TodoRegister />} /> */}

        </Routes>
      </div>

    </>
  );
}

export default App;
