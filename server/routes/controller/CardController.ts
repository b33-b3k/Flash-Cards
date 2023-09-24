import { Request, Response } from "express";
import Deck from "../../src/models/deck";





export async function createCardController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if (!deck) {
        res.status(404).send("Deck not found");
        return;
    }
    const {text} = req.body;
    
    deck.cards.push(text);
    await deck.save();
    return res.json(deck);
   
}
export async function deleteCardonDeckController(req: Request, res: Response) {
  try {
    const deckId = req.params.deckId;
    const index = req.params.index;
    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).send("Deck not found");
    }

    // Validate the index parameter
    const cardIndex = parseInt(index);
    if (isNaN(cardIndex) || cardIndex < 0 || cardIndex >= deck.cards.length) {
      return res.status(400).send("Invalid card index");
    }

    // Remove the card from the deck
    deck.cards.splice(cardIndex, 1);

    // Save the updated deck
    await deck.save();

    return res.json(deck);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
