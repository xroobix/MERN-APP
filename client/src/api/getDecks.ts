import { API_URL } from './config';

export type Deck = {
  _id: string;
  title: string;
};
export const getDecks = async (): Promise<Deck[]> => {
  const response = await fetch(`${API_URL}/decks`);
  return response.json();
};
