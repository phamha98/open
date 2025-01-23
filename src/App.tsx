import './style.css';
import './App.css';
import { data as Data } from './data';
import { useEffect, useState } from 'react';
import React from 'react';
// import Microlink from '@microlink/react';
function App() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(Data);
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


const Item = ({ item }:any) => {
  if (Array.isArray(item)) {
    const [command, ...data] = item
    const [links, codes] = data.reduce(([links, codes], str) => {
      str.includes('http') ? links.push(str) : codes.push(str);
      return [links, codes];
    }, [[], []]);
    return (
      <div style={{ marginTop: 15 }}>
        <li >
          <code>{command}</code>
          <button className="copy-button" onClick={() => copyToClipboard(command)}>
            <i className="fas fa-copy"></i>
          </button>
        </li>
        <div style={{ display: data.length > 0 ? 'flex' : 'none', paddingLeft: 10, marginTop: 10, marginBottom: 10 }}>
          <div style={{ display: codes.length > 0 ? 'flex' : 'none', backgroundColor: 'transparent', textAlign: 'left', flexDirection: 'column' }}>
            {codes.map((more, index) =>
              <code key={index} style={{ fontSize: 12, color: 'gray' }}>{more}</code>
            )}
          </div>
          <div style={{ display: links.length > 0 ? 'flex' : 'none', backgroundColor: 'transparent', textAlign: 'left', flexDirection: 'column' }}>
            {links.map((more, index) =>
              <div key={index} style={{}}>
                <a href={more} style={{ fontSize: 12, }}>{more}</a>
                {/* <Microlink url={more} direction={more} style={{ width: '100%' }} /> */}
              </div>
            )}
            <div  >
            </div>
          </div>
        </div>
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
const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed'; // Ensure it's out of view
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy'); // Copy the text to clipboard
  document.body.removeChild(textarea); // Clean up
};
export default App;