import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [titles, setTitles] = useState([]);
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });

  const fetchTitles = async (count) => {
    // const response = await axios.get('http://localhost:5000/api/posts', {
    //   params: {
    //     count: count
    //   }
    // });
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: count
      }
    });


    return response.data.map(item => item.title);
  };

  const updateTiles = useCallback(async () => {
    const tileWidth = 150;
    const tileHeight = 100;
    const tileMargin = 15;
  
    const containerWidth = dimensions.width - 450;
    const containerHeight = dimensions.height;
  
    const cols = Math.floor((containerWidth) / (tileWidth + tileMargin));
    const rows = Math.floor((containerHeight )/ (tileHeight + tileMargin));
  
    const totalTiles = cols * rows;
    
    const titles = await fetchTitles(totalTiles);
    setTitles(titles);
  }, [dimensions]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };

    window.addEventListener('resize', handleResize);
    updateTiles();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensions, updateTiles]);

  return (
    <div>
      <header></header>
      <div className="left-panel"></div>
      <div className="right-panel"></div>
    <div className="container">
      {titles.map((title, index) => (
        <div 
          key={index}
          className="tile"
          style={{
            width: 150,
            height: 50,
            margin: 15
          }}
        >
          {title.length > 20 ? title.substr(0, 20 - 1) + '...' : title}
        </div>
      ))}
    </div>
    <footer></footer>
    </div>
  );
}

export default App;
