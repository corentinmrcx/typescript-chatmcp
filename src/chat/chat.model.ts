import { google } from '@ai-sdk/google';
import { generateText, ModelMessage } from 'ai';
import { ChatRepository } from './chat.repository';

const MODEL_NAME = 'gemini-2.0-flash';

export class ChatModel {
    private _chatId : string;
    static repository : ChatRepository<ModelMessage> = new ChatRepository;

    constructor(chatId?: string){
        if (chatId) {
            if (!ChatModel.repository.exists(chatId)) {
                throw new Error;
            }
            this._chatId = chatId;
        } else {
            this._chatId = ChatModel.repository.create([]);
        }
    }

    get id(): string {
        return this._chatId;
    }

    addPrompt(prompt: string): void {
        ChatModel.repository.addMessages(this._chatId, [{ role: 'user', content: prompt }])
    }

    private createGenerationConfig(): GenerationConfig {
        return {
            model: google(MODEL_NAME),
            messages: ChatModel.repository.find(this._chatId)
        }
    }

    async fetchAnswer(): Promise<string> {
        const { text, response } = await generateText(this.createGenerationConfig());
        ChatModel.repository.addMessages(this._chatId, response.messages)
        return text;
    }
}
