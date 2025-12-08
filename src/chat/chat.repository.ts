import { ModelMessage } from 'ai';
import { ObjectId } from 'bson';
import { mongodb } from '../services/mongo';
import { Chat } from './chat';

class ChatRepository {
    private readonly collection = mongodb.collection<Chat>('chats');

    async clear(): Promise<void> {
        await this.collection.deleteMany({});
    }

    async create(userId: string): Promise<string> {
        const chatId = new ObjectId();
        const now = new Date();
        
        await this.collection.insertOne({
            _id: chatId,
            userId: new ObjectId(userId),
            title: 'Nouvelle conversation',
            creationDate: now,
            lastModificationDate: now,
            messages: []
        });
        
        return chatId.toHexString();
    }

    async exists(chatId: string): Promise<boolean> {
        const count = await this.collection.countDocuments({
            _id: new ObjectId(chatId)
        });
        return count > 0;
    }

        async find(chatId: string): Promise<Chat> {
        const chat = await this.collection.findOne({
            _id: new ObjectId(chatId)
        });
        
        if (!chat) {
            throw new Error(`Le CHat ${chatId} n'est pas trouver`);
        }
        
        return chat;
    }

    async addMessages(chatId: string, messages: ModelMessage[]): Promise<void> {
        if (messages.length == 0) return;
        
        const result = await this.collection.updateOne(
            { _id: new ObjectId(chatId) },
            {
                $set: { lastModificationDate: new Date() },
                $push: { messages: { $each: messages } }
            }
        );
        
        if (result.matchedCount === 0) {
            throw new Error(`Le CHat ${chatId} n'est pas trouver`);
        }
    }
}

export const chatRepository = new ChatRepository();

// une fois que tous les tests passeront, vous mettrez en commentaire l'ensemble du code ci-dessous

// async function tests() {
//     await chatRepository.clear();
    
//     console.log('Création de conversations');

//     const userId1 = new ObjectId().toHexString();
//     const userId2 = new ObjectId().toHexString();
//     const [id1, id2] = [
//         await chatRepository.create(userId1),
//         await chatRepository.create(userId2),
//     ];

//     console.log('Taille des identifiants (24)');

//     console.assert(id1.length == 24, 'id1 : ' + id1);
//     console.assert(id2.length == 24, 'id2 : ' + id2);

//     console.log('Identifiants tous différents');

//     console.assert(id1 != id2, 'id1 : ' + id1 + '\nid2 : ' + id2);

//     console.log('Méthode exists');

//     console.assert(await chatRepository.exists(id1), 'id1 : ' + id1);
//     console.assert(await chatRepository.exists(id2), 'id2 : ' + id2);

//     console.log('Méthode find');

//     let chat1 = await chatRepository.find(id1);
//     console.assert(chat1.userId.toHexString() == userId1, 'chat1.userId : ' + chat1.userId.toHexString() + '\nuserId1 : ' + userId1);
//     console.assert(chat1.messages.length == 0, 'chat1.messages.length : ' + chat1.messages.length);
//     console.assert(chat1.title == 'Nouvelle conversation', 'chat1.title : ' + chat1.title);
//     console.assert(chat1.creationDate.getTime() == chat1.lastModificationDate.getTime(), 'chat1.creationDate : ' + chat1.creationDate.getTime() + '\nchat1.lastModificationDate : ' + chat1.lastModificationDate.getTime());

//     let chat2 = await chatRepository.find(id2);
//     console.assert(chat2.userId.toHexString() == userId2, 'chat2.userId : ' + chat2.userId.toHexString() + '\nuserId2 : ' + userId2);
//     console.assert(chat2.messages.length == 0, 'chat2.messages.length : ' + chat2.messages.length);
//     console.assert(chat2.title == 'Nouvelle conversation', 'chat2.title : ' + chat2.title);
//     console.assert(chat2.creationDate.getTime() == chat2.lastModificationDate.getTime(), 'chat2.creationDate : ' + chat2.creationDate.getTime() + '\nchat2.lastModificationDate : ' + chat2.lastModificationDate.getTime());

//     console.log('Méthode find (erreur)');

//     try {
//         const badId = new ObjectId().toHexString();
//         await chatRepository.find(badId);
//         console.assert(false);
//     } catch {
//         console.assert(true);
//     }

//     console.log('Méthode addMessages');

//     await chatRepository.addMessages(id1, [
//         {
//             role: 'user',
//             content: 'Bonjour'
//         }
//     ]);
    
//     await chatRepository.addMessages(id1, [
//         {
//             role: 'assistant',
//             content: 'Bonjour. Comment puis-je vous aider ?'
//         }
//     ]);

//     await chatRepository.addMessages(id2, []);

//     chat1 = await chatRepository.find(id1);
//     chat2 = await chatRepository.find(id2);

//     console.assert(chat1.messages.length == 2, 'chat1.messages.length : ' + chat1.messages.length);
//     console.assert(chat1.creationDate.getTime() < chat1.lastModificationDate.getTime(), 'chat1.creationDate : ' + chat1.creationDate + '\nchat1.lastModificationDate : ' + chat1.lastModificationDate);
//     console.assert(chat1.messages[0].role == 'user', 'chat1.messages[0].role : ' + chat1.messages[0].role);
//     console.assert(chat1.messages[0].content == 'Bonjour', 'chat1.messages[0].content : ' + chat1.messages[0].content);
//     console.assert(chat1.messages[1].role == 'assistant', 'chat1.messages[1].role : ' + chat1.messages[1].role);
//     console.assert(chat1.messages[1].content == 'Bonjour. Comment puis-je vous aider ?', 'chat1.messages[1].content : ' + chat1.messages[1].content);   

//     console.assert(chat2.messages.length == 0, 'chat2.messages.length : ' + chat2.messages.length);
//     console.assert(chat2.creationDate.getTime() == chat2.lastModificationDate.getTime(), 'chat2.creationDate : ' + chat2.creationDate + '\nchat2.lastModificationDate : ' + chat2.lastModificationDate);

//     console.log('Méthode addMessages (erreur)');

//     try {
//         const badId = new ObjectId().toHexString();
//         await chatRepository.addMessages(badId, [{ role: 'user', content: 'Bonjour' }]);
//         console.assert(false);
//     } catch {
//         console.assert(true);
//     }
// }

// tests().catch(e => console.error(e));