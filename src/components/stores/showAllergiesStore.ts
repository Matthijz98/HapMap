import { persistentAtom } from '@nanostores/persistent'

export const showAllergiesStore = persistentAtom('showAllergies', false, {
    encode: JSON.stringify,
    decode: JSON.parse,
});