import {API_URL} from './config'
export type TDeck =
  {
    _id: string,
    title: string,

    cards: []
  }

export async function getdecks(): Promise<TDeck[]>{
    
      const response = await fetch(`${API_URL}/decks`);
    return response.json();
      
}

export async function getdeck(deckId:String): Promise<TDeck>{
    
      const response = await fetch(`${API_URL}/decks/${deckId}`);
    return response.json();
      
}

