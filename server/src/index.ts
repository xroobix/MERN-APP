import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { createCardForDeckController } from './controllers/createCardForDeckController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { getDeckController } from './controllers/getDeckController';
import { getDecksController } from './controllers/getDecksController';
import { deleteCardOnDeckController } from './controllers/deleteCardOnDeckController';

export const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.post('/decks', createDeckController);
app.get('/decks', getDecksController);
app.get('/decks/:deckId', getDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.post('/decks/:deckId/cards', createCardForDeckController);
app.delete('/decks/:deckId/cards/:index', deleteCardOnDeckController);

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log(`Listening on PORT ${PORT}`);
  app.listen(PORT);
});
