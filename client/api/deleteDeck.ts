import { API_URL } from './config'
import { TDeck } from './getDecks'


export async function deleteDeck(deckId: string) {
    await fetch(`${API_URL}/decks/${deckId}`, {
        method: 'DELETE',
      

     
    });
}

export async function deleteCard(deckId: string,index:number):Promise<TDeck> {
    const Response= await fetch(`${API_URL}/deck/${deckId}/cards/${index}`, {
        method: 'DELETE',
      

     
    });
    return Response.json()
}
