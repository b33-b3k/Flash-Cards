import React,{ useEffect, useState } from 'react'

import './Deck.css'
import { deleteCard } from '../api/deleteDeck';

import { getdeck,TDeck} from '../api/getDecks';


import { createCard } from '../api/createCard';
import { useParams } from 'react-router-dom';



export default function Deck() {
    const [deck, setDeck] = useState<TDeck|undefined>();//store hooks for storing data
  const [text, setText] = useState("");//store hooks for storing data
  const [cards, setCards] = useState<string[]>([]);
    const { deckId } = useParams();
    
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();//dont reload and delete data when submitted
      const { cards: serverCards } = await createCard(deckId!, text);
      setCards(serverCards);

    // setDecks([...decks,deck])
    setText("") //clear the title out when clicked
    
  }
    async function handleDeleteCard(index: number) {
        if (!deckId) return;
      const newDeck= await deleteCard(deckId, index);
      
      setCards(newDeck.cards);

      

    //updates
    
    
    
  }


  useEffect(//automatically gets deck
    () => {
    
      async function fetchDecks() {
          const newDeck = await getdeck(deckId!);
          setDeck(newDeck);
          setCards(newDeck.cards);
      }
      fetchDecks();
    },[]
  
  
  );

  return (
    <div className='Deck'>
      <h1>{deck?.title}</h1>
     <ul className='cards'>
              {
                  cards.map((card, index) =>
                  (
                      <li key={index}>
                          <button onClick={() => handleDeleteCard(index)}>X</button>
                          {card}
                      </li>
                  ))}
           
      
    
      </ul>

      <form onSubmit={handleCreateDeck}>
        <label htmlFor='card-text'>Card Text</label>
        <input id="card-text"
          value={text}
          // {/* controlled inputs */}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);

          }
          }  
          />
          <button>Create Card</button>

      </form>

     
    </div>
  )
}


