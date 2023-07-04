import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Deck from '../models/Deck';

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.get('/decks', async (req: Request, res: Response) => {
  const decks = await Deck.find({});
  res.json(decks);
});

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log(`Listening on PORT ${PORT}`);
  app.listen(PORT);
});
