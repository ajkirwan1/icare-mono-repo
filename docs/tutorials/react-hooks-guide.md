# React Hooks: Comprehensive Guide

A deep-dive tutorial covering the most commonly used React hooks with practical examples.

---

## Table of Contents

1. [useState](#usestate) - Managing component state
2. [useEffect](#useeffect) - Side effects and lifecycle
3. [useContext](#usecontext) - Consuming context
4. [useRef](#useref) - Persistent references
5. [useMemo](#usememo) - Memoizing expensive calculations
6. [useCallback](#usecallback) - Memoizing functions
7. [useReducer](#usereducer) - Complex state management
8. [Custom Hooks](#custom-hooks) - Building reusable logic

---

## useState

The most fundamental hook for managing component state.

### Basic Usage

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Functional Updates

When the new state depends on the previous state, use the functional form:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // ✅ Correct: Uses functional update
    setCount(prevCount => prevCount + 1);
  };

  const incrementTwice = () => {
    // This works correctly because we're using functional updates
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementTwice}>+2</button>
    </div>
  );
}
```

### Complex State Objects

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const handleChange = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <form>
      <input
        type="text"
        value={user.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => handleChange('age', parseInt(e.target.value))}
        placeholder="Age"
      />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </form>
  );
}
```

### Lazy Initialization

For expensive initial state calculations:

```jsx
function ExpensiveComponent() {
  // ❌ Bad: This runs on every render
  const [data, setData] = useState(expensiveCalculation());

  // ✅ Good: This runs only once on mount
  const [data, setData] = useState(() => expensiveCalculation());

  return <div>{data}</div>;
}
```

---

## useEffect

Handles side effects like data fetching, subscriptions, and manual DOM updates.

### Basic Side Effect

```jsx
import { useState, useEffect } from 'react';

function PageTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This runs after every render
    document.title = `You clicked ${count} times`;
  });

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### Effect with Dependencies

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only runs when userId changes
    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [userId]); // ✅ Dependency array

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### Cleanup Function

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Setup: Subscribe to chat room
    const socket = connectToChat(roomId);

    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Cleanup: Unsubscribe when component unmounts or roomId changes
    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <div>
      {messages.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
}
```

### Run Once on Mount

```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Empty dependency array = runs only once on mount
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []); // ✅ Empty array

  return <div>{JSON.stringify(data)}</div>;
}
```

### Multiple Effects

Separate concerns into different effects:

```jsx
function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Effect 1: Fetch user data
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  // Effect 2: Fetch user posts
  useEffect(() => {
    fetch(`/api/users/${userId}/posts`)
      .then(res => res.json())
      .then(setPosts);
  }, [userId]);

  // Effect 3: Update document title
  useEffect(() => {
    if (user) {
      document.title = `${user.name}'s Dashboard`;
    }
  }, [user]);

  return (
    <div>
      {/* Render user and posts */}
    </div>
  );
}
```

---

## useContext

Access context values without prop drilling.

### Creating and Using Context

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext();

// 2. Create provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create custom hook for consuming context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Use in components
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff'
      }}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
}

// 5. Wrap app with provider
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### Multiple Contexts

```jsx
const UserContext = createContext();
const NotificationContext = createContext();

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Dashboard />
      </NotificationProvider>
    </UserProvider>
  );
}

function Dashboard() {
  const { user } = useContext(UserContext);
  const { notifications } = useContext(NotificationContext);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>You have {notifications.length} notifications</p>
    </div>
  );
}
```

---

## useRef

Create mutable references that persist across renders without causing re-renders.

### Accessing DOM Elements

```jsx
import { useRef, useEffect } from 'react';

function TextInputWithFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

### Storing Mutable Values

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) return; // Already running

    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => stopTimer();
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

### Previous Value Tracking

```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## useMemo

Memoize expensive calculations to avoid unnecessary recomputations.

### Basic Memoization

```jsx
import { useState, useMemo } from 'react';

function ExpensiveCalculation({ items }) {
  const [filter, setFilter] = useState('');

  // ❌ Without useMemo: Runs on every render
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  // ✅ With useMemo: Only recalculates when dependencies change
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Computed Values

```jsx
function ShoppingCart({ items }) {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Total: £{total.toFixed(2)}</p>
    </div>
  );
}
```

### When NOT to Use useMemo

```jsx
function SimpleComponent({ name }) {
  // ❌ Don't: Overhead of useMemo is worse than simple calculation
  const greeting = useMemo(() => `Hello, ${name}!`, [name]);

  // ✅ Do: Simple calculations don't need memoization
  const greeting = `Hello, ${name}!`;

  return <h1>{greeting}</h1>;
}
```

---

## useCallback

Memoize function references to prevent unnecessary re-renders of child components.

### Basic Usage

```jsx
import { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // ❌ Without useCallback: New function on every render
  const handleClick = () => {
    console.log('Clicked!');
  };

  // ✅ With useCallback: Same function reference unless dependencies change
  const handleClick = useCallback(() => {
    console.log('Clicked!', count);
  }, [count]);

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <button onClick={() => setOtherState(otherState + 1)}>
        Update Other State
      </button>
    </div>
  );
}

const ChildComponent = React.memo(({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click Me</button>;
});
```

### With Event Handlers

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <TodoItems
        todos={todos}
        onRemove={removeTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}
```

### useCallback vs useMemo

```jsx
// These are equivalent:
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);

// useCallback is syntactic sugar for useMemo with a function
```

---

## useReducer

Alternative to useState for complex state logic.

### Basic Counter Example

```jsx
import { useReducer } from 'react';

// 1. Define reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  // 2. Use reducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### Complex State Management

```jsx
const initialState = {
  user: null,
  loading: false,
  error: null
};

function userReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

function UserProfile({ userId }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      });
  }, [userId]);

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;
  if (!state.user) return null;

  return (
    <div>
      <h2>{state.user.name}</h2>
      <button onClick={() => dispatch({ type: 'LOGOUT' })}>
        Logout
      </button>
    </div>
  );
}
```

### Todo List with useReducer

```jsx
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear Completed
      </button>
    </div>
  );
}
```

---

## Custom Hooks

Extract and reuse stateful logic across components.

### useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

### useDebounce

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform API call
      fetch(`/api/search?q=${debouncedSearchTerm}`)
        .then(res => res.json())
        .then(data => console.log(data));
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### useFetch

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{user.name}</div>;
}
```

### useToggle

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// Usage
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggleOpen}>Toggle Modal</button>
      {isOpen && (
        <div className="modal">
          <p>Modal Content</p>
          <button onClick={toggleOpen}>Close</button>
        </div>
      )}
    </div>
  );
}
```

### useWindowSize

```jsx
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Usage
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
      {width < 768 ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### useOnClickOutside

```jsx
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Usage
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Dropdown
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <p>Dropdown content</p>
        </div>
      )}
    </div>
  );
}
```

---

## Best Practices

### 1. Rules of Hooks

- Only call hooks at the top level (not inside loops, conditions, or nested functions)
- Only call hooks from React function components or custom hooks

```jsx
// ❌ Don't do this
function BadComponent({ shouldFetch }) {
  if (shouldFetch) {
    const [data, setData] = useState(null); // Hook inside condition!
  }
}

// ✅ Do this
function GoodComponent({ shouldFetch }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (shouldFetch) {
      // Fetch data
    }
  }, [shouldFetch]);
}
```

### 2. Dependency Arrays

Always include all values from component scope that are used in the effect:

```jsx
// ❌ Missing dependency
useEffect(() => {
  console.log(count);
}, []); // count is missing!

// ✅ Complete dependencies
useEffect(() => {
  console.log(count);
}, [count]);
```

### 3. Custom Hook Naming

Always prefix custom hooks with "use":

```jsx
// ✅ Good
function useWindowSize() { }
function useFetch() { }
function useLocalStorage() { }

// ❌ Bad
function windowSize() { }
function fetchData() { }
```

### 4. Separate Concerns

Split complex effects into multiple smaller effects:

```jsx
// ✅ Good: Separate concerns
useEffect(() => {
  // Concern 1: Fetch user
  fetchUser(userId);
}, [userId]);

useEffect(() => {
  // Concern 2: Update title
  document.title = userName;
}, [userName]);
```

### 5. Cleanup Side Effects

Always cleanup subscriptions, timers, and event listeners:

```jsx
useEffect(() => {
  const subscription = api.subscribe();

  return () => {
    subscription.unsubscribe(); // ✅ Cleanup
  };
}, []);
```

---

## Common Pitfalls

### 1. Stale Closures

```jsx
// ❌ Problem: Stale closure
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // Always uses initial count value!
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Solution: Use functional update
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1); // Uses latest value
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
```

### 2. Infinite Loops

```jsx
// ❌ Infinite loop: Object/array in dependency causes new reference each render
function BadComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]); // Creates new array, triggers effect again!
  }, [data]);
}

// ✅ Solution: Use primitive values or useMemo
function GoodComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Only run once
  }, []);
}
```

### 3. Missing Cleanup

```jsx
// ❌ Memory leak: No cleanup
function BadComponent() {
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);
}

// ✅ Cleanup
function GoodComponent() {
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
}
```

---

## Summary

| Hook | Purpose | Common Use Cases |
|------|---------|------------------|
| `useState` | Local component state | Form inputs, toggles, counters |
| `useEffect` | Side effects | Data fetching, subscriptions, DOM updates |
| `useContext` | Access context | Theming, auth, global state |
| `useRef` | Mutable references | DOM access, storing values without re-render |
| `useMemo` | Memoize values | Expensive calculations, derived data |
| `useCallback` | Memoize functions | Passing callbacks to optimized children |
| `useReducer` | Complex state logic | Form state, multi-step workflows |
| Custom Hooks | Reusable logic | Shared stateful behavior |

---

## Further Reading

- [React Hooks Documentation](https://react.dev/reference/react)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
- [Building Your Own Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
