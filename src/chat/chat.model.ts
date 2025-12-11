import { google } from '@ai-sdk/google';
import { generateText, stepCountIs, StepResult, ToolSet } from 'ai';
import { chatRepository } from './chat.repository';
// import { experimental_createMCPClient as createMCPClient } from 'ai';
// import { Experimental_StdioMCPTransport as StdioClientTransport } from 'ai/mcp-stdio';
import { GenerationConfig } from './chat';

const MODEL_NAME = 'gemma-3-27b-it';

export class ChatModel {
    private _chatId : string;
    // private static _mcptools : ToolSet | null = null;
    // private static _osmMcpTools : ToolSet | null = null;

    static async create(userId: string, chatId?: string): Promise<ChatModel> {
        if (chatId) {
            const exists = await chatRepository.exists(chatId); 
            if (!exists) {
                throw new Error("Le chat n'existe pas");
            }
            return new ChatModel(chatId);
        } 
        
        const newChatId = await chatRepository.create(userId);
        return new ChatModel(newChatId); 
    }

    private constructor(chatId: string) {
        this._chatId = chatId;
    }

    get id(): string {
        return this._chatId;
    }

    async addPrompt(prompt: string): Promise<void> {
        await chatRepository.addMessages(this._chatId, [{ role: 'user', content: prompt }])
    }

    private async createGenerationConfig(toolCallNotification: (toolName: string) => void): Promise<GenerationConfig> {        
        // if (!ChatModel._mcptools){
        //     const mcpClient = await createMCPClient({
        //         transport: new StdioClientTransport({
        //             command: 'node',
        //             args: ['/home/butinfo/mcp-servers/mcp-time/dist/server.js'],
        //         }),
        //     });  
        //     ChatModel._mcptools = await mcpClient.tools();

        // }

        // if (!ChatModel._osmMcpTools){
        //     const osmMcpClient = await createMCPClient({
        //         transport: new StdioClientTransport({
        //             command: '/home/butinfo/bin/uvx',
        //             args: ['osm-mcp-server'],
        //         }),
        //     });
        //     ChatModel._osmMcpTools = await osmMcpClient.tools();
        // }

        // const allTools : ToolSet = { ...ChatModel._mcptools, ...ChatModel._osmMcpTools};

        return {
            model: google(MODEL_NAME),
            messages: (await chatRepository.find(this._chatId)).messages,
            // tools: allTools, 
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
        await chatRepository.addMessages(this._chatId, response.messages);
        return text;
    }
}
