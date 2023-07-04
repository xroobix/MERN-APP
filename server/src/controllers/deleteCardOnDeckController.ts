import type { Request, Response } from 'express';
import Deck from '../models/Deck';

export const deleteCardOnDeckController = async (
  req: Request,
  res: Response
) => {
  const deck = await Deck.findById(req.params.deckId);
  const index = req.params.index;
  if (!deck) {
    return res.status(400).send('No deck of this id exists');
  }
  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
};
