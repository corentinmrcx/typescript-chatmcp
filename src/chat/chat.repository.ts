import { ModelMessage } from 'ai';
import { ObjectId } from 'bson';
import { mongodb } from '../services/mongo';
import { Chat } from './chat';

export class ChatRepository1<Message> {
    // stockage des conversations, associées à un identifiant
    private chats = new Map<string, Message[]>

    // ajoute une conversation au repository et retourne son identifiant
    create(chat: Message[]): string {
        const objectId = new ObjectId();
        const id = objectId.toHexString();
        this.chats.set(id, chat)
        return id; 
    }
    
    // retourne vrai si une conversation existe, faux sinon
    exists(chatId: string): boolean {
        return this.chats.has(chatId);
    }
    
    // retourne la conversation associée à l'identifiant
    // lance une erreur si la conversation n'existe pas
    find(chatId: string): Message[] {
        const chatsExist = this.exists(chatId);
        if (!chatsExist) {
            throw new Error('chatId invalide : ' + chatId)
        }
        return this.chats.get(chatId) as Message[];
    }

    // ajoute des messages à la conversation associée à l'identifiant
    // lance une erreur si la conversation n'existe pas
    addMessages(chatId: string, chat: Message[]): void {
        const chats : Message[] = this.find(chatId);
        chats.push(...chat);
    }
}

// Code de test, à mettre en commentaire une fois que toutes les méthodes seront correctement implémentées.
// const repository = new ChatRepository<string>

// console.log('Création de conversations');

// const [id1, id2, id3] = [
// repository.create(['a', 'b']),
// repository.create(['c', 'd', 'e']),
// repository.create([])
// ];

// console.log('taille des identifiants (24)');

// console.assert(id1.length == 24);
// console.assert(id2.length == 24);
// console.assert(id3.length == 24);

// console.log('Identifiants tous différents');

// console.assert(id1 != id2);
// console.assert(id1 != id3);
// console.assert(id2 != id3);

// console.log('Méthode exists');

// console.assert(repository.exists(id1));
// console.assert(repository.exists(id2));
// console.assert(repository.exists(id3));

// console.log('Méthode find');

// console.assert(repository.find(id1).length == 2);
// console.assert(repository.find(id2).length == 3);
// console.assert(repository.find(id3).length == 0);

// console.log('Méthode find (erreur)');;

// try {
//     repository.find('pas_bon');
//     console.assert(false);
// } catch (e) {
//     console.assert((e as Error).message == 'chatId invalide : pas_bon');
// }

// console.log('Méthode addMessages');

// repository.addMessages(id1, ['x', 'y', 'z']);
// repository.addMessages(id2, []);

// console.assert(repository.find(id1).length == 5);
// console.assert(repository.find(id1)[1] == 'b');
// console.assert(repository.find(id1)[2] == 'x');
// console.assert(repository.find(id1)[4] == 'z');
// console.assert(repository.find(id2).length == 3);

// console.log('Méthode addMessages (erreur)');

// try {
//     repository.addMessages('pas_bon', [ 'a', 'b', 'c' ]);
//     console.assert(false);
// } catch (e) {
//     console.assert((e as Error).message == 'chatId invalide : pas_bon');
// }

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