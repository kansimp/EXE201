import React, { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const up = (): void => {
        setCount(count + 1);
    };
    const down = (): void => {
        setCount(count - 1);
    };
    return (
        <div className="App">
            <div>{count}</div>
            <button onClick={up}>Tang</button>
            <button onClick={down}>Giam</button>
        </div>
    );
}

export default App;
