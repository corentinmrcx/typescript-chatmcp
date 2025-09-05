export class ChatRepository<Message> {
    // stockage des conversations, associées à un identifiant
    private chats = new Map<string, Message[]>

    // ajoute une conversation au repository et retourne son identifiant
    create(chat: Message[]): string {
        throw new Error('Method not implemented.');
    }
    
    // retourne vrai si une conversation existe, faux sinon
    exists(chatId: string): boolean {
        throw new Error('Method not implemented.');
    }
    
    // retourne la conversation associée à l'identifiant
    // lance une erreur si la conversation n'existe pas
    find(chatId: string): Message[] {
        throw new Error('Method not implemented.');
    }

    // ajoute des messages à la conversation associée à l'identifiant
    // lance une erreur si la conversation n'existe pas
    addMessages(chatId: string, chat: Message[]): void {
        throw new Error('Method not implemented.');
    }
}

// Code de test, à mettre en commentaire une fois que toutes les méthodes seront correctement implémentées.
const repository = new ChatRepository<string>

console.log('Création de conversations');

const [id1, id2, id3] = [
repository.create(['a', 'b']),
repository.create(['c', 'd', 'e']),
repository.create([])
];

console.log('taille des identifiants (24)');

console.assert(id1.length == 24);
console.assert(id2.length == 24);
console.assert(id3.length == 24);

console.log('Identifiants tous différents');

console.assert(id1 != id2);
console.assert(id1 != id3);
console.assert(id2 != id3);

console.log('Méthode exists');

console.assert(repository.exists(id1));
console.assert(repository.exists(id2));
console.assert(repository.exists(id3));

console.log('Méthode find');

console.assert(repository.find(id1).length == 2);
console.assert(repository.find(id2).length == 3);
console.assert(repository.find(id3).length == 0);

console.log('Méthode find (erreur)');;

try {
    repository.find('pas_bon');
    console.assert(false);
} catch (e) {
    console.assert((e as Error).message == 'chatId invalide : pas_bon');
}

console.log('Méthode addMessages');

repository.addMessages(id1, ['x', 'y', 'z']);
repository.addMessages(id2, []);

console.assert(repository.find(id1).length == 5);
console.assert(repository.find(id1)[1] == 'b');
console.assert(repository.find(id1)[2] == 'x');
console.assert(repository.find(id1)[4] == 'z');
console.assert(repository.find(id2).length == 3);

console.log('Méthode addMessages (erreur)');

try {
    repository.addMessages('pas_bon', [ 'a', 'b', 'c' ]);
    console.assert(false);
} catch (e) {
    console.assert((e as Error).message == 'chatId invalide : pas_bon');
}