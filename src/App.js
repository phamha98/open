import logo from './logo.svg';
import './style.css';
import './App.css';
import { data } from './data';
import { useEffect, useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Code to fetch data when the component mounts
    // For example, you can fetch data from an API here
  }, []);

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
    const filteredData = data.filter(item => item.toLowerCase().includes(searchText));
    setResults(filteredData)
    // Code to filter results based on search text
  };

  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Ensure it's out of view
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy'); // Copy the text to clipboard
    document.body.removeChild(textarea); // Clean up
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
          {results.map((result, index) => (
            <li key={index}>
              <code>{result}</code>
              <button className="copy-button" onClick={() => copyToClipboard(result)}>
                <i className="fas fa-copy"></i>
              </button>
            </li>
          ))}
          {results.length === 0 && <li>No results found</li>}
        </ul>
      </div>
    </div>
  );
}

export default App;

// function renderResults(results) {
//   const resultList = document.getElementById('results');
//   resultList.innerHTML = '';

//   if (results.length === 0) {
//     resultList.innerHTML = '<li>No results found</li>';
//     return;
//   }

//   results.forEach(result => {
//     const li = document.createElement('li');
//     const code = document.createElement('code');
//     code.textContent = result;
//     //li.textContent = result;

//     // Create a copy button
//     const copyButton = document.createElement('button');
//     // copyButton.textContent = 'Copyf';
//     const copyIcon = document.createElement('i');
//     copyIcon.className = 'fas fa-copy';
//     copyButton.className = 'copy-button'; // Thêm class copy-button
//     copyButton.appendChild(copyIcon);
//     copyButton.addEventListener('click', () => {
//       copyToClipboard(result);
//     });

//     // Append the copy button to the list item
//     li.appendChild(code);
//     li.appendChild(copyButton);

//     // Append the list item to the results list
//     resultList.appendChild(li);
//   });
// }
// function handleSearch(event) {

//   const searchText = event.target.value.toLowerCase();
//   const filteredData = data.filter(item => item.toLowerCase().includes(searchText));
//   renderResults(filteredData);
// }
// document.getElementById('searchInput').addEventListener('input', handleSearch);
// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded')
//   handleSearch({ target: { value: '' } });
//   document.getElementById('searchInput').focus();
// });
// function copyToClipboard(text) {
//   // Create a temporary textarea element
//   const textarea = document.createElement('textarea');
//   textarea.value = text;
//   textarea.style.position = 'fixed'; // Ensure it's out of view
//   document.body.appendChild(textarea);
//   textarea.select();
//   document.execCommand('copy'); // Copy the text to clipboard
//   document.body.removeChild(textarea); // Clean up
//   // alert('Copied : ' + text);
// }