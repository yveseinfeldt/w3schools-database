import './App.css';
import React, { useEffect, useState } from 'react';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Categories</h2>
        
        <CategoryList />
        
      </header>
    </div>
  );
}

function CategoryList() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetch(`${api}/categories`)
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);
  
  return (
    <ul>
      {categories.map(category => (
        <li key={category.CategoryID}>{category.CategoryName} ({category.CategoryID})</li>
      ))}
    </ul>
  );
}



export default App;
