import { Iuser } from "../../interfaces/user";

export interface Istate {
    user: Iuser
    isAuth: boolean,
    isSecretOpen: string
}