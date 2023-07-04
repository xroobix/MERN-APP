import React, { useEffect, useState } from 'react';
import './App.css';

type Deck = {
  _id: string;
  title: string;
};

function App() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [title, setTitle] = useState('');

  const handleCreateDeck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('http://localhost:5000/decks', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTitle('');
  };

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:5000/decks');
      const newDecks = await response.json();
      setDecks(newDecks);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 max-w-7xl p-8 mx-0 my-auto bg-slate-200">
      <ul className="grid grid-cols-3 my-0 mx-auto w-[50rem] gap-[.625rem]">
        {decks.map((deck) => (
          <li
            className="flex items-center justify-center h-[12rem] bg-slate-50 border rounded-3xl border-slate-400 hover:cursor-pointer hover:bg-white"
            key={deck._id}
          >
            {deck.title}
          </li>
        ))}
      </ul>
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleCreateDeck}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="deck-title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Deck Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="deck-title"
              type="text"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Create Deck
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
