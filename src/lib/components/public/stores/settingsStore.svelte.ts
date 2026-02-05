import "@macfja/svelte-persistent-runes"

const RoutingStrategies = ["closest", "up", "down", "nearest", "none"];

const DefaultSettings = {
    "rounding_strategy": "closest",
    "rounding_precision": 2,
}


export const SettingsStoreSvelte = $persist(DefaultSettings, 'settings');
