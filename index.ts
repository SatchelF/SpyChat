import express from "express";
import { engine } from 'express-handlebars';
import {createServer} from "node:http";
import { Server } from "socket.io";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();



const DEBUG = process.env.NODE_ENV !== "production";
const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
const server = createServer(app);
const io = new Server(server);

let messages: Array<{codename: string, password: string, message: string}> = []; // Store chat messages as objects

io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Send existing messages to the new client
    socket.emit('load messages', messages);
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    
    socket.on('new message', (msgObject) => {
        messages.push(msgObject); // Store new message object
        io.emit('update messages', msgObject); // Broadcast new message object
    });
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}


console.log(MANIFEST);
app.get("/", (req, res) => {
  res.render('index', {
    debug: DEBUG,
    jsBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["file"],
    cssBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["css"][0],
    assetUrl: process.env.ASSET_URL || "http://localhost:5173",
    layout: false
  });
});



server.listen(3000, () => {
  console.log("Listening on port 3000...");
});