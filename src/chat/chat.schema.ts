import { SchemaManager } from "../utils/schema-manager";

const chatSchema = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'title', 'creationDate', 'lastModificationDate', 'messages'],
        properties: {
            _id: {
                bsonType: 'objectId',
                description: "Identifiant de la conversation"
            },
            userId: {
                bsonType: 'string',
                description: "Identifiant de l'utilisateur qui a créé la conversation"
            },
            title: {
                bsonType: 'string',
                description: "Titre de la conversation"
            },
            creationDate: {
                bsonType: 'date',
                description: "Date de création de la conversation"
            },
            lastModificationDate: {
                bsonType: 'date',
                description: "Date de la dernière modification de la conversation"
            },
            messages: {
                bsonType: 'array',
                description: "Tableau des messages de la conversation",
                items: {
                    bsonType: 'object',
                    required: ['role', 'content'],
                    properties: {
                        role: {
                            bsonType: 'string',
                            enum: ['user', 'assistant', 'tool'],
                            description: "Rôle de la personne qui a écrit le message"
                        },
                        content: {
                            bsonType: 'object',
                            description: "Contenu du message"
                        }
                    }
                }
            }
        }
    }
};

new SchemaManager('chats', chatSchema).executeCommand(process.argv).then(() => process.exit(0));
