import { Collection, Document, MongoServerError,Filter, WithId } from "mongodb";
import { mongodb } from "../services/mongo";
import { readFile } from "node:fs/promises";
import { EJSON } from "bson";

export class SchemaManager<T extends Document> {
    private collection: Collection<T>;
    private schema: Filter<WithId<T>>;

    constructor(collectionName: string, schema: Filter<WithId<T>>) {
        this.collection = mongodb.collection<T>(collectionName);
        this.schema = schema;
    }

    async showInvalidDocuments(): Promise<void> {
        console.log(await this.collection.find({ $nor: [this.schema] }).toArray());
    }

    async applyToCollection(): Promise<void> {
        await mongodb.command({
            collMod: this.collection.collectionName,
            validator: this.schema
        });
    }
    
    async dumpFromCollection(): Promise<void> {
        const options = await this.collection.options();
        console.log(`Schéma de la collection '${this.collection.collectionName}'`);
        console.dir(options.validator, { depth: null });
    }

    async executeCommand(args: string[]): Promise<void> {
        switch (args[2]) {
            case 'apply-schema':
                await this.applyToCollection();
                // eslint-disable-next-line no-fallthrough
            case 'dump-schema':
                return this.dumpFromCollection();
            case 'show-invalid-documents':
                return this.showInvalidDocuments();
            case 'insert-document':
                if (args.length < 4) { 
                    console.log('Veuillez spécifier le fichier JSON contenant le document à insérer');
                } else {
                    try { 
                        const data = await readFile(args[3], 'utf-8' );
                        await this.collection.insertOne(EJSON.parse(data)); 
                    } catch (error) { 
                        if (error instanceof MongoServerError) { 
                            const err = error as MongoServerError;
                            console.error(err.errmsg); 
                            console.dir(err.errorResponse.errInfo?.details, { depth: null }); 
                        } else {
                            console.error(error); 
                        } 
                    } 
                } 
                break;
            default: console.log(`
Opérations disponibles :
    dump-schema             affiche le schéma de la collection
    show-invalid-documents  affiche les documents invalides 
    apply-schema            applique le schéma de la collection 
    insert-document         insère un document contenu dans un fichier JSON. Le fichier doit être passé en
                            paramètre. Exemple : node dist/user/user.schema.js insert-document user.json `);
        }
    }
}