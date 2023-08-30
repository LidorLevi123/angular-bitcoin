import { Move } from "./user-moves"

export interface User {
    name: string
    coins: number
    moves: Move[]
}
