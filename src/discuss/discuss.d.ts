import { Session } from "express-session";
import { User } from "../user/user";

declare module "http" {
    interface IncomingMessage {
        session: Session & {
            user: User
        }
    }
}