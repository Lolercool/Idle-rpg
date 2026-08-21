export let playerInventory = [
    {
        itemId: "wheat",
        quantity: 347,
    },
    {
        itemId: "carrot",
        quantity: 12,
    },
    {
        itemId: "iron_ore",
        quantity: 86,
    },
    {
        itemId: "gold_ore",
        quantity: 3,
    },
    {
        itemId: "oak_log",
        quantity: 152,
    },
    {
        itemId: "goblin_ear",
        quantity: 7,
    },
    {
        itemId: "iron_sword",
        instanceId: "iron_sword_1",
    },
    {
        itemId: "iron_sword",
        instanceId: "iron_sword_2",
    },
    {
        itemId: "steel_sword",
        instanceId: "steel_sword_1",
    },
    {
        itemId: "iron_helmet",
        instanceId: "iron_helmet_1",
    },
    {
        itemId: "explorer_boots",
        instanceId: "explorer_boots_1",
    },
    {
        itemId: "iron_pickaxe",
        instanceId: "iron_pickaxe_1",
    },
    {
        itemId: "iron_pickaxe",
        instanceId: "iron_pickaxe_2",
    },
    {
        itemId: "steel_axe",
        instanceId: "steel_axe_1",
    },
    {
        itemId: "steel_axe",
        instanceId: "steel_axe_2",
    },
];

export let playerEquipment = {
    helmet: null,
    chestplate: null,
    leggings: null,
    boots: null,
    sword: null,
    bow: null,
    pickaxe: null,
    axe: null,
    hoe: null,
    shovel: null,
    rod: null,
    pet: null,
};

export let playerSkills = {
    farming: { level: 1, xp: 0 },
    mining: { level: 1, xp: 0 },
    foraging: { level: 1, xp: 0 },
    combat: { level: 1, xp: 0 },
    fishing: { level: 1, xp: 0 },
};