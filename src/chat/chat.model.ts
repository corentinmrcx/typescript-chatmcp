import { google } from '@ai-sdk/google';
import { generateText, ModelMessage } from 'ai';
import { ChatRepository } from './chat.repository';

const MODEL_NAME = 'gemini-2.0-flash';

export class ChatModel {
    private _chatId : string;
    static repository : ChatRepository<ModelMessage> = new ChatRepository;

    constructor(){
        this._chatId = ChatModel.repository.create([]);
    }

    get id(): string {
        return this._chatId;
    }
    
    async send(prompt: string): Promise<string> {
        ChatModel.repository.addMessages(this._chatId, [{ role: 'user', content: prompt }])
        const { text, response } = await generateText(
            {
                model: google(MODEL_NAME),
                prompt: ChatModel.repository.find(this._chatId)
            }
        );
        ChatModel.repository.addMessages(this._chatId, response.messages)
        return text;
    }
}
