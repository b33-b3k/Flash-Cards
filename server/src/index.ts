import express, { Request, Response } from "express"
import mongoose from "mongoose";
import Deck from "./models/deck"
import { config } from "dotenv";
import cors from "cors";
import {  deleteDecksController, getDecksController,createDeckController,getDeckController } from "../routes/controller/DeckController";
import {  createCardController,deleteCardonDeckController } from "../routes/controller/CardController";

config();
const PORT = 5000


const app = express();
app.use(cors(

));
app.use(express.json());
//using "tsnode" dependencies for ts file


//fetch all created decks
app.get("/decks", getDecksController)

app.delete("/decks/:deckId", deleteDecksController)

app.post("/decks", createDeckController);
app.post("/decks/:deckId/cards", createCardController)
app.get("/decks/:deckId",getDeckController)

app.delete("/deck/:deckId/cards/:index", deleteCardonDeckController)



mongoose.connect(
    process.env.MONGO_URL??""

).then(
    () => {
        console.log(`Connected to database.Listening on port ${PORT}`);
    }
).catch(
    () => {
        console.log("Connection failed");
    }

)
app.listen(PORT);