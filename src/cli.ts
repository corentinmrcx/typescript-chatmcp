import { symlink } from 'fs';
import { ChatModel } from './chat/chat.model';
import { createInterface } from "readline/promises";

const COLOR_ANSWER = '\x1b[96m';
const COLOR_USER = '\x1b[92m';
const COLOR_DEFAULT = '\x1b[0m';

const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const chat = new ChatModel();
    let stop : boolean = false;
    while (stop == false) {
        const prompt : string = await readLine.question(COLOR_USER + "Corentin : " + COLOR_DEFAULT)
        if (prompt === ""){
            stop = true;
            console.log(COLOR_DEFAULT + "Fin du chat")
        }
        else {
            const answer = await chat.send(prompt);
            console.log(COLOR_ANSWER + "Gemini : " + COLOR_DEFAULT, answer);
        }
    }
}

main();