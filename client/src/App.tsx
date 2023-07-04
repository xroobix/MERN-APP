import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { createDeck } from './api/createDeck';
import { deleteDeck } from './api/deleteDeck';
import { Deck, getDecks } from './api/getDecks';

function App() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [title, setTitle] = useState('');

  const handleCreateDeck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newDeck = await createDeck(title);
    setDecks([...decks, newDeck]);
    setTitle('');
  };

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  useEffect(() => {
    const fetchDecks = async () => {
      const newDecks = await getDecks();
      setDecks(newDecks);
    };
    fetchDecks();
  }, []);

  return (
    <div className="flex flex-col h-screen items-center gap-8 p-8 mx-0 my-auto bg-slate-200">
      <h1 className='text-7xl font-bold'>Your deck</h1>
      <ul className="grid grid-cols-3 my-0 mx-auto w-[50rem] gap-[.625rem]">
        {decks.map((deck) => (
          <li
            className="relative flex items-center justify-center h-[12rem] bg-white border rounded-3xl border-slate-400 hover:cursor-pointer"
            key={deck._id}
          >
            <button
              onClick={() => handleDeleteDeck(deck._id)}
              className="absolute top-2 right-2 rounded-full flex items-center justify-center w-6 z-10 hover:bg-slate-100"
            >
              X
            </button>
            <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
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
