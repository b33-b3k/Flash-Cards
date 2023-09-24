import React,{ useEffect, useState } from 'react'

import './App.css'
import { deleteDeck } from '../api/deleteDeck';
import { createDeck } from '../api/createDeck';
import { getdecks,TDeck} from '../api/getDecks';


import { Link } from "react-router-dom";



function App() {
  const [title, setTitle] = useState("");//store hooks for storing data
  const [decks, setDecks] = useState<TDeck[]>([]);//store hooks for storing data

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();//dont reload and delete data when submitted
    console.log(title);
    const deck = await createDeck(title);

    setDecks([...decks,deck])
    setTitle("") //clear the title out when clicked
    
  }
  async function handleDeleteDeck(deckId: string) {
    deleteDeck(deckId);
    //updates
    const newDecks = decks.filter((deck: any) => deck._id !== deckId);//filter which matches
    setDecks(newDecks);
    
    
  }

  useEffect(() => {
    console.log("we are here");
    async function getDecks() {
      setDecks(await getdecks());
      console.log(decks);
    }
    getDecks();

  }, []);

  // useEffect(//automatically gets deck
  //   () => {
    
  //     async function getDecks() {
  //       const response = await fetch('http://localhost:5000/decks');
  //       const decks = await response.json();
  //       console.log(decks);
  //     }
  //     getDecks();
  //   },[]
  
  
  // );

  return (
    <div className='App'>
      <h1>Your Decks</h1>
     <ul className='decks'>
      {Array.isArray(decks) ? (
        decks.map(function (deck: any) {
          return (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
            </li>
          );
        })
      ) : (
        <p>No decks available.</p>
      )}
    
      </ul>
      <div className='form-field'>
        
      <form onSubmit={handleCreateDeck}>
        
        <label htmlFor='deck-title'>Deck Title</label>
        <input id="deck-title"
          value={title}
          // {/* controlled inputs */}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
            
          }
        }
        
        
        />
          <button>Create deck</button>

      </form>
        </div>

     
    </div>
  )
}

export default App
