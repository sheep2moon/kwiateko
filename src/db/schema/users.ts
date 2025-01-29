import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { generateRandomId } from "../../lib/utils";

export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(generateRandomId),
    email: text("email").notNull(),
    password: text("password").notNull(),
    username: text("username").notNull(),
    imgUrl: text("imgUrl").notNull(),
    isModerator: boolean("isModerator").notNull()
});
