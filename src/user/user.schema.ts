import { SchemaManager } from "../utils/schema-manager";

const userSchema = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['hashedPassword', 'userName', 'email'],
        properties: {
            _id: {
                bsonType: 'objectId'
            },
            hashedPassword: {
                bsonType: 'string', 
                description: "Le mot de passe de l'utilisateur crypté"
            }, 
            userName: {
                bsonType: 'string',
                description: "Nom d'utilisateur"
            },
            email: {
                bsonType: 'string',
                pattern: "^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\.[a-zA-Z]{2,}$",
                description: "Email de l'utilisateur"
            }
        }
    }, 
    indexes: [
        {
            key: { userName: 1 }, 
            unique: true,
            name: "unique_userName"
        }
    ]
};

new SchemaManager('users', userSchema).executeCommand(process.argv).then(() => process.exit(0));
