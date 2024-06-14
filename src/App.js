import './style.css';
import './App.css';
import { data as Data } from './data';
import { useEffect, useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(Data);

  useEffect(() => {
    // Code to fetch data when the component mounts
    // For example, you can fetch data from an API here
  }, []);

  const handleSearch = (event) => {
    const txt = event.target.value.toLowerCase();
    setSearchText(txt);
    const filteredData = Data.filter(arrStr => {
      for (let i = 0; i < arrStr.length; i++) {
        const str = arrStr[i];
        if (str.toLowerCase().includes(txt)) {
          return true
        }
      }
      return false
    });
    setResults(filteredData)
  };



  return (
    <div className="App">
      <div class="container">
        <h1>Search</h1>
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <ul id="results">
          {results.map((item, index) => <Item item={item} index={index} />)}
          {results.length === 0 && <li>No results found</li>}
        </ul>
      </div>
    </div>
  );
}
const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed'; // Ensure it's out of view
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy'); // Copy the text to clipboard
  document.body.removeChild(textarea); // Clean up
};

const Item = ({ item }) => {
  if (Array.isArray(item)) {
    const [command, ...data] = item
    return (
      <div>
        <li >
          <code>{command}</code>
          <button className="copy-button" onClick={() => copyToClipboard(command)}>
            <i className="fas fa-copy"></i>
          </button>
        </li>
        {data.length > 0 && data.map((more, index) =>
          <code key={index} style={{ fontSize: 12, color: 'gray' }}>{more}</code>
        )}
      </div>
    )
  }
  return (
    <li >
      <code>{item}</code>
      <button className="copy-button" onClick={() => copyToClipboard(item)}>
        <i className="fas fa-copy btn-copy"></i>
      </button>
    </li>
  )

}
export default App;