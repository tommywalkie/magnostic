import {customAlphabet} from 'nanoid'
export const unique: () => string = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
