import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const MODEL_NAME = 'gemini-2.0-flash';

export class ChatModel {
    async send(prompt: string): Promise<string> {
        const {text} = await generateText(
            {
                model: google(MODEL_NAME),
                prompt: prompt
            }
        )
        return text;
    }
}
