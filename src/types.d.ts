import { Connection } from "mongoose";

declare global {
    var mongoose:{  // here : is used instesad of = (Noted point)
        conn: Connection | null,
        promise: Promise<Connection> | null,
    }
}

export {}; // To ensure this file is treated as a module and it's not compiled as a script