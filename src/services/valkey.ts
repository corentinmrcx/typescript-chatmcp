import { Redis } from "iovalkey";
import { RedisStore } from "../utils/connect-iovalkey";
          
export const valkey = new Redis();

export const valkeyStore = new RedisStore({
    client: valkey,
});