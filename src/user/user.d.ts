import { ObjectId } from "bson";

interface User {
    _id?: ObjectId;
    hashedPassword: string;
    userName: string;
    email: string;
}