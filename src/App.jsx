import React, { useState } from "react";
import { ethers } from "ethers";
import "./index.css";

function App() {
  const [account, setAccount] = useState("");
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);

  const connectWallet = async () => {
  try {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      console.log("Connected account:", accounts[0]);
    } else {
      alert("MetaMask not detected! Please install the MetaMask extension.");
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
};


  const saveEntry = () => {
    if (!entry.trim()) return alert("Write something before saving!");
    const newEntry = {
      id: Date.now(),
      text: entry,
      date: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setEntry("");
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🧠 BlockMind</h1>
        <p>Your private mental health journal secured by blockchain.</p>
        {!account ? (
          <button className="connect-btn" onClick={connectWallet}>
            Connect MetaMask
          </button>
        ) : (
          <p className="connected">Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
        )}
      </header>

      <main className="main">
        <div className="journal-section">
          <textarea
            className="journal-input"
            placeholder="Write your thoughts here..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <button className="save-btn" onClick={saveEntry}>
            Save Entry
          </button>
        </div>

        <div className="entries">
          {entries.length === 0 ? (
            <p className="no-entry">No journal entries yet. Start writing ✍️</p>
          ) : (
            entries.map((e) => (
              <div key={e.id} className="entry-card">
                <p className="entry-text">{e.text}</p>
                <span className="entry-date">{e.date}</span>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="footer">
        <p>💫 Made with care for your mind — Powered by Blockchain</p>
      </footer>
    </div>
  );
}

export default App;
