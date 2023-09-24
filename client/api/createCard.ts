import { API_URL } from './config'
import {TDeck} from './getDecks'
export async function createCard(deckID:string, text:string):Promise<TDeck> {
    
     const response= await fetch(`${API_URL}/decks/${deckID}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        text,
      })
    });
    return response.json();
}