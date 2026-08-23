import { playerSkills } from "./playerState";

export let skillLevels = {
    "1": 50,
    "2": 125,
    "3": 200,
    "4": 300,
    "5": 500,
    "6": 750,
    "7": 1000,
    "8": 1500,
    "9": 2000,
    "10": 3500,
    "11": 5000,
    "12": 7500,
    "13": 10000,
    "14": 15000,
    "15": 20000,
    "16": 30000,
    "17": 50000,
    "18": 75000,
    "19": 100000,
    "20": 200000,
    "21": 300000,
    "22": 400000,
    "23": 500000,
    "24": 600000,
    "25": 700000,
    "26": 800000,
    "27": 900000,
    "28": 1000000,
    "29": 1100000,
    "30": 1200000,
    "31": 1300000,
    "32": 1400000,
    "33": 1500000,
    "34": 1600000,
    "35": 1700000,
    "36": 1800000,
    "37": 1900000,
    "38": 2000000,
    "39": 2100000,
    "40": 2200000,
    "41": 2300000,
    "42": 2400000,
    "43": 2500000,
    "44": 2600000,
    "45": 2750000,
    "46": 2900000,
    "47": 3100000,
    "48": 3400000,
    "49": 3700000,
    "50": 4000000,
    "51": 4300000,
    "52": 4600000,
    "53": 4900000,
    "54": 5200000,
    "55": 5500000,
    "56": 5800000,
    "57": 6100000,
    "58": 6400000,
    "59": 6700000,
    "60": 7000000,
};


export function updateSkillsUI() {
    for (let skillName in playerSkills) {
        let skill = playerSkills[skillName];
        let targetXp = skillLevels[skill.level] || skillLevels[20];
        let percentage = Math.min((skill.xp / targetXp) * 100, 100);

        document.getElementById(`${skillName}-level`).textContent = skill.level;
        document.getElementById(`${skillName}-xp`).textContent = skill.xp;
        document.getElementById(`${skillName}-next-xp`).textContent = targetXp;
        document.getElementById(`${skillName}-bar`).style.width = percentage + "%";
    }
}

export function addSkillXP(skill, amount) {
    if (skill in playerSkills) {
        let currentSkill = playerSkills[skill];
        currentSkill.xp += amount;
        while (currentSkill.xp >= skillLevels[currentSkill.level]) {
            currentSkill.xp -= skillLevels[currentSkill.level];
            currentSkill.level += 1;
        }
        updateSkillsUI()
    }
}