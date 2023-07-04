import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createCard } from '../api/createCard';
import { deleteCard } from '../api/deleteCard';
import { getDeck } from '../api/getDeck';
import type { Deck } from '../api/getDecks';

const Deck = () => {
  const [deck, setDeck] = useState<Deck>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState('');
  const { deckId } = useParams();

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setCards(newDeck.cards);
      setDeck(newDeck);
    };
    fetchDeck();
  }, [deckId]);

  if (!deckId) return <div>No deck id</div>;

  const handleDeleteCard = async (index: number) => {
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  };

  const handleCreateCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId, text);
    setCards(serverCards);
    setText('');
  };

  return (
    <div className="flex flex-col h-screen items-center gap-8 p-8 mx-0 my-auto bg-slate-200">
      <h1 className='text-7xl font-bold'>{deck?.title}</h1>
      <ul className="grid grid-cols-3 my-0 mx-auto w-[50rem] gap-[.625rem]">
        {cards.map((card, index) => (
          <li
            className="relative flex items-center p-2 justify-center min-h-[12rem] bg-white border rounded-3xl border-slate-400 hover:cursor-pointer"
            key={`${card}-${index}`}
          >
            <button
              onClick={() => handleDeleteCard(index)}
              className="absolute top-2 right-2 rounded-full flex items-center justify-center w-6 z-10 hover:bg-slate-100"
            >
              X
            </button>
            {card}
          </li>
        ))}
      </ul>
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleCreateCard}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="card-text"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Card Text
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="card-text"
              type="text"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
            />
          </div>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deck;
