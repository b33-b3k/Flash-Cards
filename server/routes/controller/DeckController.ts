
import express, { Request, Response } from "express"
import Deck from "../../src/models/deck"

export async function getDecksController(req:Request,res:Response) {
    const decks = await Deck.find();
    res.json(decks);
}

export async function deleteDecksController(req: Request, res: Response)  {
    const deckId = req.params.deckId;//get deck idd
    const deck= await Deck.findByIdAndDelete(deckId);//delete deck id
    res.json(deck)
    // res.status(200).send();
}

export async function createDeckController (req: Request, res: Response)  {//dont miss that ""
  
    
    const newDeck = new Deck(
        {
            title: req.body.title
        }
    );//new instance of deck
    const createdDeck = await newDeck.save();
    console.log(createdDeck
    )
    res.json(createdDeck);
  
}

export async function getDeckController(req:Request,res:Response) {
    
    const { deckId } = req.params;// req param of deckID
    const decks = await Deck.findById(deckId);
    res.json(decks);
}
