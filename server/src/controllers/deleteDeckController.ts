import type { Request, Response } from 'express';
import Deck from '../models/Deck';

export const deleteDeckController = async (req: Request, res: Response) => {
  const deckToDelete = await Deck.findByIdAndDelete(req.params.deckId);
  res.json(deckToDelete);
};
