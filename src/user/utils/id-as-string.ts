import { ObjectId } from "mongodb";

export function idAsString(id?: string | ObjectId) : string {
    if (id === undefined) return ""; 
    if (typeof id == "string")
        return id; 
    return id.toHexString();
}