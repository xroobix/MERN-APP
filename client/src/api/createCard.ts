import { API_URL } from './config';
import type { Deck } from './getDecks';

export const createCard = async (deckId: string, text: string): Promise<Deck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
