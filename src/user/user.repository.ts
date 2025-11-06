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
}

export const userRepository = new UserRepository;