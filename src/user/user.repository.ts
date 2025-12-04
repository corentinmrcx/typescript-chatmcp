import { ObjectId } from "bson";
import { mongodb } from "../services/mongo";
import { User } from "./user";

class UserRepository {
    private readonly collection = mongodb.collection<User>('users');

    async findAll(): Promise<User[]> {
        const allUsers = await this.collection.find({}).toArray();
        return allUsers;  
    }

    async findByUserName(userName: string): Promise<User | null>{
        return await this.collection.findOne({ userName });
    }

    async updateUserEmail(user: User, newEmail: string): Promise<boolean> {
        const result = await this.collection.updateOne({
            _id: new ObjectId(user._id)}, {
                $set: {email: newEmail}
        }); 
        return result.modifiedCount == 1; 
    }
}

export const userRepository = new UserRepository;