import { google } from '@ai-sdk/google';
import { generateText, ModelMessage, stepCountIs, StepResult, ToolSet } from 'ai';
import { ChatRepository } from './chat.repository';
import { experimental_createMCPClient as createMCPClient } from 'ai';
import { Experimental_StdioMCPTransport as StdioClientTransport } from 'ai/mcp-stdio';

const MODEL_NAME = 'gemini-2.0-flash';

export class ChatModel {
    private _chatId : string;
    static repository : ChatRepository<ModelMessage> = new ChatRepository;
    private static _tools : ToolSet | null = null;

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

    private async createGenerationConfig(toolCallNotification: (toolName: string) => void): Promise<GenerationConfig> {
        if (ChatModel._tools === null) {
            const mcpClient = await createMCPClient({
                transport: new StdioClientTransport({
                    command: 'node',
                    args: ['/home/butinfo/mcp-servers/mcp-time/dist/server.js'],
                }),
            });
            ChatModel._tools = await mcpClient.tools();
        }
        return {
            model: google(MODEL_NAME),
            messages: ChatModel.repository.find(this._chatId),
            tools: ChatModel._tools, 
            stopWhen: stepCountIs(10), 
            onStepFinish: (result: StepResult<ToolSet>) => {
                for (const tool of result.dynamicToolCalls) {
                    toolCallNotification(tool.toolName);
                }
            }
        }
    }

    async fetchAnswer(toolCallNotification: (toolName: string) => void): Promise<string> {
        const config = await this.createGenerationConfig(toolCallNotification);
        const { text, response } = await generateText(config);
        ChatModel.repository.addMessages(this._chatId, response.messages);
        return text;
    }
}
