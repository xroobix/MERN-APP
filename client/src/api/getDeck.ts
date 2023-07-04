import type Deck from '../pages/Deck';
import { API_URL } from './config';

export const getDeck = async (deckId: string): Promise<Deck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  return response.json();
};
