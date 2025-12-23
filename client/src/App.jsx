import React, { useState } from 'react';
import ChatButton from './components/ChatButton';
import ChatWindow from './components/ChatWindow';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      {/* Background content similar to main website to show transparency */}
      <h1 style={{ textAlign: 'center', paddingTop: '20vh', color: 'rgba(255,255,255,0.1)' }}>
        Kenmark ITan Solutions
      </h1>

      <div className="chat-widget">
        {isOpen && <ChatWindow />}
        <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
}

export default App;
