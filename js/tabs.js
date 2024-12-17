const TABS = {
    choose(x, stab=false) {
        if (!stab) {
            if (x==5) tmp.sn_tab = tmp.tab
            tmp.tab = x
            if (x!=5) {
                tmp.sn_tab = tmp.tab
                tree_update = true
            }
        }
        else tmp.stab[tmp.tab] = x
    },
    1: [
        { id: "Main" },
        { id: "Stats" },
        { id: "Upgrades", unl() { return player.rp.unl } },
        { id: "Challenges", unl() { return player.chal.unl } },
        { id: "Atom", unl() { return player.atom.unl }, style: "atom" },
        { id: "Supernova", unl() { return player.supernova.times.gte(1) || quUnl() || player.superGal.gte(1)}, style: "sn" },
        { id: "Quantum", unl() { return quUnl() }, style: "qu" },
        { id: "奇异层级", unl() { return player.exotic.times.gte(1) }, style: "red" },
        { id: "Options" },
    ],
    2: {
        0: [
            { id: "Mass" },
            { id: "Black Hole", unl() { return player.bh.unl }, style: "bh" },
            { id: "Atomic Generator", unl() { return player.atom.unl }, style: "atom" },
            { id: "Stars", unl() { return STARS.unlocked() } },
            { id: "Indescribable Matter", unl() { return quUnl() } },
            { id: "永恒", unl() { return player.et.times.gt(0) } },
            { id: "恒星", unl() { return player.superCluster.gte(21) } },
        ],
        1: [
            { id: "Ranks Rewards" },
            { id: "Scaling", unl() { return tmp.scaling ? tmp.scaling.super.length>0 : false } },
            { id: "Prestige Rewards", unl() { return hasUpgrade("br",9) } },
            { id: "Ascension Rewards", unl() { return hasAscension(0,1) } },
            { id: "行星层级", unl() { return hasAscension(0,10000) } },
        ],
        3: [
            { id: "Challenges" },
            { id: "Quantum Challenge", unl() { return hasTree("unl3") }, style: "qu" },
            { id: "星系挑战", unl() { return hasElement(267) }, style: "sn" },
            //{ id: "Big Rip", unl() { return hasTree("unl4") }, style: "qu" },
        ],
        4: [
            { id: "Particles" },
            { id: "Elements", unl() { return player.chal.comps[7].gte(16) || player.supernova.times.gte(1) || quUnl() } },
            { id: "Mass Dilation", unl() { return MASS_DILATION.unlocked() }, style: "dilation" },
            { id: "Break Dilation", unl() { return hasUpgrade("br",9) }, style: "break_dilation" },
            { id: "星系粒子", unl() { return hasElement(251) } },
        ],
        5: [
            { id: "Neutron Tree" },
            { id: "Bosons", unl() { return player.supernova.post_10 } },
            { id: "Fermions", unl() { return player.supernova.fermions.unl } },
            { id: "Radiation", unl() { return tmp.radiation.unl } },
            { id: "星系", unl() { return hasElement(218) || player.superGal.gte(1)} },
            { id: "星系费米子", unl() { return hasElement(237)} },
            { id: "星团", unl() { return hasElement(387) || player.superCluster.gte(1)} },
        ],
        6: [
            { id: "Chroma" },
            { id: "Quantum Milestones" },
            { id: "Auto-Quantum", unl() { return tmp.qu.mil_reached[6] } },
            { id: "Primordium", unl() { return PRIM.unl() } },
            { id: "Entropy", unl() { return player.qu.en.unl } },
        ],
        7: [
            { id: "奇异里程碑" },
            { id: "次数强化", unl() { return hasUpgrade("exotic",5) } },
            { id: "奇异推进", unl() { return hasUpgrade("exotic",10) } },
            { id: "黑暗效果", unl() { return hasUpgrade("exotic",15) } },
            { id: "黑暗狂奔", unl() { return hasElement(450) } },
            { id: "物质", unl() { return hasElement(486) } },
            { id: "奇异轴", unl() { return hasElement(534) } },
        ],
    },
}