let itemTooltip = document.getElementById("item-tooltip");

let itemTooltipName = document.getElementById("item-tooltip-name");
let itemTooltipRarity = document.getElementById("item-tooltip-rarity");
let itemTooltipType = document.getElementById("item-tooltip-type");

let itemTooltipStats = document.querySelector(".item-tooltip-stats");
let itemTooltipStatsList = document.getElementById("item-tooltip-stats-list");

let itemTooltipEnchants = document.querySelector(".item-tooltip-enchants");
let itemTooltipAbilities = document.querySelector(".item-tooltip-abilities");

let itemTooltipSellPrice = document.getElementById("item-tooltip-sell-price");
let itemTooltipFooter = document.querySelector(".item-tooltip-footer");


function renderItemTooltip(itemData) {
    itemTooltipName.textContent = itemData.name;
    itemTooltipRarity.textContent = itemData.rarity.toUpperCase();
    itemTooltipType.textContent = itemData.type.toUpperCase();

    itemTooltipStatsList.innerHTML = "";

    if (itemData.itemStats === undefined) {
        itemTooltipStats.classList.add("hidden");
    } else {
        itemTooltipStats.classList.remove("hidden");

        let statEntries = Object.entries(itemData.itemStats);

        statEntries.forEach(([statName, statValue]) => {
            let statRow = document.createElement("div");
            statRow.classList.add("item-tooltip-stat");

            let statNameElement = document.createElement("span");
            statNameElement.classList.add("item-tooltip-stat-name");

            let formattedStatName = statName
                .replaceAll("_", " ")
                .replace(/\b\w/g, letter => letter.toUpperCase());

            statNameElement.textContent = formattedStatName;

            let statValueElement = document.createElement("span");
            statValueElement.classList.add("item-tooltip-stat-value");
            statValueElement.textContent = "+" + statValue;

            statRow.appendChild(statNameElement);
            statRow.appendChild(statValueElement);

            itemTooltipStatsList.appendChild(statRow);
        });
    }

    itemTooltipEnchants.classList.add("hidden");
    itemTooltipAbilities.classList.add("hidden");
    itemTooltipFooter.classList.add("hidden");
}


export function showItemTooltip(itemData) {
    renderItemTooltip(itemData);
    itemTooltip.classList.remove("hidden");
}


export function hideItemTooltip() {
    itemTooltip.classList.add("hidden");
}


export function moveItemTooltip(event) {
    let offset = 15;

    let x = event.clientX + offset;
    let y = event.clientY + offset;

    let tooltipRect = itemTooltip.getBoundingClientRect();

    if (x + tooltipRect.width > window.innerWidth) {
        x = event.clientX - tooltipRect.width - offset;
    }

    if (y + tooltipRect.height > window.innerHeight) {
        y = window.innerHeight - tooltipRect.height - offset;
    }

    if (y < offset) {
        y = offset;
    }

    itemTooltip.style.left = x + "px";
    itemTooltip.style.top = y + "px";
}