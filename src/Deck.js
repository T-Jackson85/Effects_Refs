import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Card from './Card.js';

const BASE_URL = 'http://deckofcardsapi.com/api/deck/';

const Deck = () => {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState(undefined);
  const [isNotDrawing, setisNotDrawing] = useState(true);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(function fetchDeckOnStart() {
    async function fetchDeck() {
      const { data } = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
      setDeck({deckId: data.deck_id, remaining: data.remaining});
    };
    fetchDeck();
  }, [card]);

  const draw = () => {
    setisNotDrawing(!isNotDrawing);
    if (isNotDrawing) {
      const id = setInterval(async () => {
        if (deck.remaining <= 1) {
          window.alert('Error: no cards left');
          clearInterval(intervalId);
          return;
        }
        const { data } = await axios.get(`${BASE_URL}${deck.deckId}/draw/?count=1`);
        setCard(data.cards[0]);
        setDeck({deckId: deck.deckId, remaining: data.remaining});
      }, 1000);
      setIntervalId(id);
    }
    else {
      clearInterval(intervalId);
    }
  };
  
  return (
    <>
      <div>
        <button onClick={draw}>{isNotDrawing? 'Start' : 'Stop'}</button>
      </div>
      {card === undefined ? <p>Cards will be displayed here</p> :
      <Card
        src={card.image}
        name={`${card.value} of ${card.suit}`}
        key={uuid()}
        codeName={card.code}
      />}
    </>
  );
};

export default Deck;