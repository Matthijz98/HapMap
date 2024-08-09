import { persistentAtom } from '@nanostores/persistent'

const RoutingStrategies = ["closest", "up", "down", "nearest", "none"];

const DefaultSettings = {
    "rounding_strategy": "closest",
    "rounding_precision": 2,
}


export const SettingsStore = persistentAtom('settings', DefaultSettings, {
    encode: JSON.stringify,
    decode: JSON.parse,
});
