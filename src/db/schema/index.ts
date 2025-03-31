import * as plants from "./plants";
import * as authSchema from "./auth-schema";

export const schema = {
    ...authSchema,
    ...plants
};
