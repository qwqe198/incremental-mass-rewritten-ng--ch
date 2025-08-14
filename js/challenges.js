function setupChalHTML() {
    let chals_table = new Element("chals_table")
	let table = ""
	for (let x = 1; x <= CHALS.cols; x++) {
        table += `<div id="chal_div_${x}" style="width: 120px; margin: 5px;"><img id="chal_btn_${x}" onclick="CHALS.choose(${x})" class="img_chal" src="images/chal_${x}.png"><br><span id="chal_comp_${x}">X</span></div>`
	}
	chals_table.setHTML(table)
}

function updateChalHTML() {
    if (tmp.stab[3]==0){
        for (let x = 1; x <= CHALS.cols; x++) {
            let chal = CHALS[x]
            let unl = chal.unl ? chal.unl() : true
            tmp.el["chal_div_"+x].setDisplay(unl)
            tmp.el["chal_btn_"+x].setClasses({img_chal: true, ch: CHALS.inChal(x), chal_comp: player.chal.comps[x].gte(tmp.chal.max[x])})
            if (unl) {
                tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0)+" / "+format(tmp.chal.max[x],0))
				if(hasPrestige(1,25) && x <= 11)tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0));
				if(hasElement(133) && x == 12)tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0));
				if(hasElement(222) && x == 13)tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0));
				if(hasElement(289) && x == 14)tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0));
				if(hasElement(289) && x == 15)tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0));
				if(hasElement(302) && x == 16)tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0));
				if(hasElement(308) && x == 17)tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0));
				if(hasElement(316) && x == 18)tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0));
				if(hasElement(316) && x == 19)tmp.el["chal_comp_"+x].setTxt(format(player.chal.comps[x],0));
            }
        }
        tmp.el.chal_enter.setVisible(player.chal.active != player.chal.choosed)
        tmp.el.chal_exit.setVisible(player.chal.active != 0)
        tmp.el.chal_exit.setTxt(tmp.chal.canFinish && !hasTree("qol6") ? "Finish Challenge for +"+tmp.chal.gain+" Completions" : "Exit Challenge")
        tmp.el.chal_desc_div.setDisplay(player.chal.choosed != 0)
        if (player.chal.choosed != 0) {
            let chal = CHALS[player.chal.choosed]
            tmp.el.chal_ch_title.setTxt(`[${player.chal.choosed}]${CHALS.getScaleName(player.chal.choosed)}${chal.title}[完成了${format(player.chal.comps[player.chal.choosed],0)+"次，次数上限为"+format(tmp.chal.max[player.chal.choosed],0)}次]`)
            tmp.el.chal_ch_desc.setHTML(chal.desc)
            tmp.el.chal_ch_reset.setTxt(CHALS.getReset(player.chal.choosed))
            tmp.el.chal_ch_goal.setTxt("目标："+CHALS.getFormat(player.chal.choosed)(tmp.chal.goal[player.chal.choosed])+CHALS.getResName(player.chal.choosed))
            tmp.el.chal_ch_reward.setHTML("Reward: "+chal.reward)
			if(player.chal.choosed == 1)tmp.el.chal_ch_reward.setHTML("Reward: "+chal.reward())
			if(player.chal.choosed == 5)tmp.el.chal_ch_reward.setHTML("Reward: "+chal.reward())
			if(player.chal.choosed == 7)tmp.el.chal_ch_reward.setHTML("Reward: "+chal.reward())
			if(player.chal.choosed == 14)tmp.el.chal_ch_reward.setHTML("Reward: "+chal.reward())
			if(player.chal.choosed == 15)tmp.el.chal_ch_reward.setHTML("Reward: "+chal.reward())
                if(player.chal.choosed == 25)tmp.el.chal_ch_reward.setHTML("Reward: "+chal.reward())
            tmp.el.chal_ch_eff.setHTML("Currently: "+chal.effDesc(tmp.chal.eff[player.chal.choosed]))
        }
    }
    if (tmp.stab[3]==1){
        updateQCHTML()
    }
    if (tmp.stab[3]==2){
        updateGCHTML()
    }
}

function updateChalTemp() {
    if (!tmp.chal) tmp.chal = {
        goal: {},
        max: {},
        eff: {},
        bulk: {},
        canFinish: false,
        gain: E(0),
    }
    let s = tmp.qu.chroma_eff[2]
    for (let x = 1; x <= CHALS.cols; x++) {
        let data = CHALS.getChalData(x)
        tmp.chal.max[x] = CHALS.getMax(x)
        tmp.chal.goal[x] = data.goal
        tmp.chal.bulk[x] = data.bulk
        tmp.chal.eff[x] = CHALS[x].effect(FERMIONS.onActive("05")?E(0):player.chal.comps[x].mul(x<=8?s:1))
    }
    tmp.chal.format = player.chal.active != 0 ? CHALS.getFormat() : format
    tmp.chal.gain = player.chal.active != 0 ? tmp.chal.bulk[player.chal.active].min(tmp.chal.max[player.chal.active]).sub(player.chal.comps[player.chal.active]).max(0).floor() : E(0)
    tmp.chal.canFinish = player.chal.active != 0 ? tmp.chal.bulk[player.chal.active].gt(player.chal.comps[player.chal.active]) : false
}

const CHALS = {
    choose(x) {
        if (player.chal.choosed == x) {
            this.enter()
        }
        player.chal.choosed = x
    },
    inChal(x) {
		if(player.supernova.fermions.choosed.startsWith("2") || player.supernova.fermions.choosed.startsWith("3"))if(x == 13)return true
		if(player.supernova.fermions.choosed.startsWith("3"))if(x == 16)return true
		if(FERMIONS.onActive("22"))if(x == 20)return true
		if(player.gc.active && x <= player.gc.trap)return true
		//if(player.gc.active)if(x == 13)return true
		return player.chal.active == x
	},
    reset(x, chal_reset=true) {
        if (x < 5) FORMS.bh.doReset()
        else if (x < 9) ATOM.doReset(chal_reset)
        else if (x < 13) SUPERNOVA.reset(true, true)
		else if (x < 17) {
			INFINITY_LAYER.doReset();
			updateTemp();
			updateTemp();
			updateTemp();
			updateTemp();
			updateTemp();
			if(x == 14 && chal_reset == false){
				player.qu.rip.active = true;
				QUANTUM.enter(false,true,true)
			}
			if(x == 16 && chal_reset == false){
				player.prestigeMass = E(0);
			}
		}else if (x < 21) {
			ETERNITY_LAYER.doReset();
			updateTemp();
			updateTemp();
			updateTemp();
			updateTemp();
			updateTemp();
			if(x == 19 && chal_reset == false){
				player.qu.rip.active = true;
				QUANTUM.enter(false,true,true)
				player.prestigeMass = E(0);
			}
		}else if (x < 25){
			EXOTIC.doReset();
            updateTemp();
			updateTemp();
			updateTemp();
			updateTemp();
			updateTemp();
		}else{
            sunshard.reset(true);
            updateTemp();
			updateTemp();
			updateTemp();
			updateTemp();
			updateTemp();
        }
    },
    
    exit(auto=false) {
        if (!player.chal.active == 0) {
            if (tmp.chal.canFinish) {
                player.chal.comps[player.chal.active] = player.chal.comps[player.chal.active].add(tmp.chal.gain).min(tmp.chal.max[player.chal.active])
            }
            if (!auto) {
                this.reset(player.chal.active)
                player.chal.active = 0
            }
        }
    },
    enter() {
        if (player.chal.active == 0) {
            player.chal.active = player.chal.choosed
            this.reset(player.chal.choosed, false)
        } else if (player.chal.choosed != player.chal.active) {
            if (tmp.chal.canFinish) {
                player.chal.comps[player.chal.active] = player.chal.comps[player.chal.active].add(tmp.chal.gain).min(tmp.chal.max[player.chal.active])
            }
            this.reset(player.chal.active)
            player.chal.active = player.chal.choosed
            this.reset(player.chal.choosed, false)
        }
    },
    getResource(x, y) {
		if (x == 20 && y == 1 && hasElement(558)) return player.mass.add(1).log10().mul(FORMS.getPreQUGlobalSpeed().add(1))
		if (x == 20 && y == 1) return player.mass.add(1).log10()
        if (x < 5 || x > 8&&x < 25) return player.mass
        if (x == 25) return player.prestigeMass
        return player.bh.mass
    },
    getResName(x) {
        if (x < 5 || x > 8&&x < 25) return ''
        if (x == 25) return '转生质量'
        return '黑洞质量'
    },
    getFormat(x) {
          return formatMass
       
    },
    getReset(x) {
        if (x < 5) return "进入挑战时将同时进行暗物质重置！"
        if (x < 9) return "进入挑战时将同时进行原子重置！但不会影响到之前挑战的完成次数。"
        if (x < 13) return "进入挑战时将同时在未成为超新星的前提下重置！"
        if (x < 17) return "进入挑战时将强制进行无限重置！"
		if (x < 21) return "进入挑战时将强制进行永恒重置！"
		if (x < 25) return "进入挑战时将强制进行奇异物质重置！"
        return "进入挑战时将强制进行行星重置！"
    },
    getMax(i) {
        if (hasPrestige(1,25) && (i<=11)) return EINF
        if (hasElement(133) && (i==12)) return EINF
        if (hasElement(222) && (i==13)) return EINF
        if (hasElement(289) && (i==14||i==15)) return EINF
        if (hasElement(302) && (i==16)) return EINF
        if (hasElement(308) && (i==17)) return EINF
        if (hasElement(316) && (i==18||i==19)) return EINF
		
        let x = this[i].max
        if (i <= 4) x = x.add(tmp.chal?tmp.chal.eff[7]:0)
        if (hasElement(13) && (i==5||i==6)) x = x.add(tmp.elements.effect[13])
        if (hasElement(20) && (i==7)) x = x.add(50)
        if (hasElement(41) && (i==7)) x = x.add(50)
        if (hasElement(60) && (i==7)) x = x.add(100)
        if (hasElement(33) && (i==8)) x = x.add(50)
        if (hasElement(56) && (i==8)) x = x.add(200)
        if (hasElement(65) && (i==7||i==8)) x = x.add(200)
        if (hasElement(70) && (i==7||i==8)) x = x.add(200)
        if (hasElement(73) && (i==5||i==6||i==8)) x = x.add(tmp.elements.effect[73])
        if (hasTree("chal1") && (i==7||i==8))  x = x.add(100)
        if (hasTree("chal4b") && (i==9))  x = x.add(100)
        if (hasTree("chal8") && (i>=9 && i<=12))  x = x.add(200)
        if (hasElement(104) && (i>=9 && i<=12))  x = x.add(200)
        if (hasTree("chal9") && (i==9))  x = x.add(2000)
        if (hasTree("chal10") && (i==10))  x = x.add(500)
        if (hasTree("chal10") && (i==11))  x = x.add(500)
        if (hasTree("chal11") && (i==9))  x = x.add(500)
        if (hasTree("chal11") && (i==10))  x = x.add(500)
        if (hasTree("chal11") && (i==11))  x = x.add(500)
        if (hasTree("chal12") && (i==9))  x = x.add(1900)
        if (hasTree("chal12") && (i==10))  x = x.add(3500)
        if (hasTree("chal12") && (i==11))  x = x.add(3500)
        if (hasTree("chal13") && (i>=9 && i<=11))  x = x.add(5000)
        if (hasTree("chal14") && (i==12))  x = x.add(900)
        if (hasPrestige(1,13) && (i==12))  x = x.add(100)
        if (hasPrestige(0,129) && (i>=9 && i<=11))  x = x.add(5000)
        if (player.ranks.hex.gte(20) && (i==7)) x = x.add(1e5)
        if (player.ranks.hex.gte(41) && (i==12)) x = x.add(500)
        if (player.ranks.hex.gte(56) && (i==12)) x = x.add(500)
        if (player.ranks.hex.gte(60) && (i==12)) x = x.add(500)
        if (player.ranks.hex.gte(65) && (i==12)) x = x.add(1000)
        if (player.ranks.hex.gte(70) && (i==12)) x = x.add(1000)
        if (player.ranks.hex.gte(73) && (i==12)) x = x.add(1000)
        if (player.ranks.hex.gte(104) && (i==12)) x = x.add(2000)
        if (player.ranks.hex.gte(110) && (i==12)) x = x.add(2000)
        if (hasElement(175) && (i==13||i==15))  x = x.add(100)
        if (hasElement(182) && (i==13||i==16))  x = x.add(100)
        if (hasElement(186) && (i==13||i==15))  x = x.add(300)
        if (hasElement(190) && (i==13||i==16))  x = x.add(200)
        if (hasElement(194) && (i==13))  x = x.add(200)
        if (hasElement(204) && (i==13))  x = x.add(1000)
        if (hasElement(206) && (i==14||i==16))  x = x.add(100)
        if (hasElement(210) && (i==14||i==17))  x = x.add(100)
        if (hasElement(214) && (i==15||i==16))  x = x.add(200)
		if (i<=16)x = x.add(SUPERNOVA_GALAXY.effects.chal())
		if (i<=20 && i>=17)x = x.add(SUPERNOVA_GALAXY.effects.chal2())
        if (hasElement(227) && (i==17))  x = x.add(300)
        if (hasElement(235) && (i==19))  x = x.add(300)
        if (hasElement(236) && (i==18))  x = x.add(300)
        if (hasElement(247) && (i==14))  x = x.add(400)
		if (hasElement(249) && (i==18||i==19))  x = x.add(100)
		if (hasElement(252) && (i==17||i==18||i==19))  x = x.add(250)
		if (hasElement(258) && (i==17||i==18||i==19))  x = x.add(250)
		if (hasElement(277) && (i==20))  x = x.add(100)
		if (hasElement(280) && (i==17||i==18||i==19))  x = x.add(500)
		if (hasTree('qp32') && (i==21||i==22||i==23))  x = x.add(100)
        if (hasChargedElement(227) && (i==22))  x = x.add(300)    
        if ((hasChargedElement(258)&&player.chal.comps[22].gte(280)) && (i==21))  x = x.add(100) 
        return x.floor()
    },
    getScaleName(i) {
        if (player.chal.comps[i].gte(i>12?100:1000)) return "无望~"
        if (player.chal.comps[i].gte(i==8?200:i>8?50:300)) return "疯狂·"
        if (player.chal.comps[i].gte(i>8?10:75)) return "硬化-"
        return ""
    },
    getPower(i) {
		if(hasElement(379) && i <= 19)return E(0)
        let x = E(1)
        if (hasElement(2)) x = x.mul(0.75)
        if (hasElement(26)) x = x.mul(tmp.elements.effect[26])
		if (player.ranks.hex.gte(2)) x = x.mul(0.75)
		if (i >= 16 && i!=19) x = x.mul(30);
		if (i <= 12) x = x.mul(tmp.chal.eff[17]||1);
		if (hasChargedElement(192) && i==20) x = x.mul(tmp.elements.ceffect[192]||1);
		if (hasPrestige(1,122)) x = x.mul(0.9)
        return x
    },
    getPower2(i) {
		if(hasElement(379) && i <= 19)return E(0)
        let x = E(1)
        if (hasElement(92)) x = x.mul(0.75)
        if (player.ranks.hex.gte(92) && (i<=8 || i>=10) && i<=12) x = x.mul(0.75)
		if (i >= 17 && i <= 19) x = x.mul(3);
        return x
    },
    getPower3(i) {
        let x = E(1)
		if (i>12)x = E(50)
		if(hasUpgrade('br',24))x = x.mul(0.8)
        if (hasChargedElement(2)) x = x.mul(0.95)
        if (hasChargedElement(26)) x = x.mul(tmp.elements.ceffect[26])
        if (hasChargedElement(92)) x = x.mul(0.95)
        return x
    },
    getChalData(x, r=E(-1), y) {
        let res = this.getResource(x,y)
        let lvl = r.lt(0)?player.chal.comps[x]:r
        let chal = this[x]
		let inc = chal.inc
		if(hasElement(170)&&x==15)inc = E(2);
		if(hasChargedElement(170)&&x==21)inc = E(2);
		if(hasTree('qp29')&&x<=23)inc = E(2);
        let fp = 1
        if (QCs.active() && x <= 12) fp /= tmp.qu.qc_eff[5]
        let s1 = x > 8 ? 10 : 75
        let s2 = 300
        if (x == 8) s2 = 200
        if (x > 8) s2 = 50
        let s3 = 1000
        if (x > 12) s3 = 100
        let pow = chal.pow
        if (hasElement(10) && (x==3||x==4)) pow = pow.mul(0.95)
        if (player.ranks.hex.gte(10) && (x==3||x==4)) pow = pow.mul(0.95)
        if (hasChargedElement(10) && x==20) pow = pow.mul(0.95)
		if (hasElement(453) && x==21) pow = pow.mul(0.8)
		if (hasElement(477) && x==21) pow = pow.mul(0.79)
		if(hasChargedElement(175)&&x==13) pow = pow.mul(0.5)
		if(hasChargedElement(175)&&x==15) pow = pow.mul(0.5)
		if(hasTree('qp29')&&x<=19)pow = E(1);
		if(hasTree('qp29')&&x==20)pow = E(1.15);
		if(hasTree('qp29')&&x==21)pow = E(6);
		if(hasTree('qp30')&&x==21)pow = E(5.7);
		if(hasTree('qp32')&&x==21)pow = E(5);
        if((hasChargedElement(258)&&player.chal.comps[22].gte(280))&&x==21)pow = E(3.325);
		if(hasTree('qp32')&&x==22)pow = E(1);
		if(hasTree('qp32')&&x==23)pow = E(1.5);
		let st = chal.start
		if(hasTree('qp30')&&x<=19)st = E(1);
        chal.pow = chal.pow.max(1)
        let goal = inc.pow(lvl.div(fp).pow(pow)).mul(st)
        let bulk = res.div(st).max(1).log(inc).root(pow).mul(fp).add(1).floor()
        if (res.lt(st)) bulk = E(0)
        if (lvl.max(bulk).gte(s1)) {
            let start = E(s1);
            let exp = E(3).pow(this.getPower(x));
            goal =
            inc.pow(
                    lvl.div(fp).pow(exp).div(start.pow(exp.sub(1))).pow(pow)
                ).mul(st)
            bulk = res
                .div(st)
                .max(1)
                .log(inc)
                .root(pow)
                .times(start.pow(exp.sub(1)))
                .root(exp).mul(fp)
                .add(1)
                .floor();
        }
        if (lvl.max(bulk).gte(s2)) {
            let start = E(s1);
            let exp = E(3).pow(this.getPower(x));
            let start2 = E(s2);
            let exp2 = E(4.5).pow(this.getPower2(x))
            goal =
            inc.pow(
                    lvl.div(fp).pow(exp2).div(start2.pow(exp2.sub(1))).pow(exp).div(start.pow(exp.sub(1))).pow(pow)
                ).mul(st)
            bulk = res
                .div(st)
                .max(1)
                .log(inc)
                .root(pow)
                .times(start.pow(exp.sub(1)))
                .root(exp)
                .times(start2.pow(exp2.sub(1)))
                .root(exp2).mul(fp)
                .add(1)
                .floor();
        }
        if (lvl.max(bulk).gte(s3)) {
            let start = E(s1);
            let exp = E(3).pow(this.getPower(x));
            let start2 = E(s2);
            let exp2 = E(4.5).pow(this.getPower2(x))
            let start3 = E(s3);
            let exp3 = E(1.001).pow(this.getPower3(x))
            goal =
            inc.pow(
                    exp3.pow(lvl.div(fp).sub(start3)).mul(start3)
                    .pow(exp2).div(start2.pow(exp2.sub(1))).pow(exp).div(start.pow(exp.sub(1))).pow(pow)
                ).mul(st)
            bulk = res
                .div(st)
                .max(1)
                .log(inc)
                .root(pow)
                .times(start.pow(exp.sub(1)))
                .root(exp)
                .times(start2.pow(exp2.sub(1)))
                .root(exp2)
                .div(start3)
			    .max(1)
			    .log(exp3)
			    .add(start3).mul(fp)
                .add(1)
                .floor();
        }
        return {goal: goal, bulk: bulk}
    },
    1: {
      
        title: "即时折算",
        desc: "Super Ranks, Mass Upgrades starts at 25. In addtional, Super Tickspeed start at 50.",
        reward() {
			if(hasElement(348))return `延迟时间速度的元折算出现。`;
			return `Super Ranks starts later, Super Tickspeed scaling weaker by completions.`
		},
        max: E(100),
        inc: E(5),
        pow: E(1.3),
        start: E(1.5e58),
        effect(x) {
            let rank = x.softcap(20,4,1).floor()
            let tick = E(0.96).pow(x.root(2))
            return {rank: rank, tick: tick}
        },
        effDesc(x) { if(hasElement(348))return format(x.rank.add(1),0)+"x later";return "+"+format(x.rank,0)+" later to Super Ranks, Super Tickspeed scaling "+format(E(1).sub(x.tick).mul(100))+"% weaker" },
    },
  
    2: {
        unl() { return player.chal.comps[1].gte(1) || player.atom.unl },
        title: "反对时速",
        desc: "You cannot buy Tickspeed.",
        reward: `For every completions adds +7.5% to Tickspeed Power.`,
        max: E(100),
        inc: E(10),
        pow: E(1.3),
        start: E(1.989e40),
        effect(x) {
            let sp = E(0.5)
            if (hasElement(8)) sp = sp.pow(0.25)
            if (hasElement(39)) sp = E(1)
            let ret = x.mul(0.075).add(1).softcap(1.3,sp,0).sub(1)
            return ret
        },
        effDesc(x) { return "+"+format(x.mul(100))+"%"+((x.gte(0.3)&&!hasElement(39))?" <span class='soft'>(softcapped)</span>":"") },
    },
    3: {
        unl() { return player.chal.comps[2].gte(1) || player.atom.unl },
        title: "质量熔化",
        desc: "Mass gain softcap is divided by 1e150, and is stronger.",
        reward: `Mass gain are raised by completions, but cannot append while in this challenge!`,
        max: E(100),
        inc: E(25),
        pow: E(1.25),
        start: E(2.9835e49),
        effect(x) {
            if (hasElement(64)) x = x.mul(1.5)
            if (hasChargedElement(64))return expMult(x.add(1),2.6);
            let ret = x.root(1.5).mul(0.01).add(1)
			if(hasElement(310))return ret;
            return ret.softcap(3,E(0.25).pow(tmp.chal.eff[17]||1),0)
        },
        effDesc(x) { return "^"+format(x)+(x.gte(3)&&!hasElement(310)?"<span class='soft'>(softcapped)</span>":"") },
    },
    4: {
        unl() { return player.chal.comps[3].gte(1) || player.atom.unl },
        title: "怒意减弱",
        desc: "Rage Points gain is rooted by 10. In addtional, mass gain softcap is divided by 1e100.",
        reward: `Rage Powers gain are raised by completions.`,
        max: E(100),
        inc: E(30),
        pow: E(1.25),
        start: E(1.736881338559743e133),
        effect(x) {
            if (hasElement(64)) x = x.mul(1.5)
            if (hasChargedElement(64))return expMult(x.add(1),2.6);
            let ret = x.root(1.5).mul(0.01).add(1)
			if(hasElement(310))return ret;
			if (player.ranks.hex.gte(39))return ret.softcap(3,E(0.26).pow(tmp.chal.eff[17]||1),0);
            return ret.softcap(3,E(0.25).pow(tmp.chal.eff[17]||1),0)
        },
        effDesc(x) { return "^"+format(x)+(x.gte(3)&&!hasElement(310)?"<span class='soft'>(softcapped)</span>":"") },
    },
    5: {
        unl() { return player.atom.unl },
        title: "移除级别",
        desc: "You cannot rank up.",
        reward() {
			if(hasElement(519))return `使七重阶层的元折算延迟出现. 但削弱蓝色色度效果对它的提升.`;
			if(hasElement(421))return `使六重阶层的元折算延迟出现. 但削弱蓝色色度效果对它的提升.`;
			if(hasElement(348))return `使五重阶层的元折算延迟出现. 但削弱蓝色色度效果对它的提升.`;
			if(hasElement(265))return `Meta-Tetr scaling starts later.`;
			if(hasElement(230))return `Meta-Tier scaling starts later.`;
			if(hasElement(170))return `Meta-Rank scaling starts later.`;
			return `Rank requirement are weaker by completions.`
		},
        max: E(50),
        inc: E(50),
        pow: E(1.25),
        start: E(1.5e136),
        effect(x) {
			if(hasChargedElement(199))return x.add(1).log10().mul(player.chal.comps[5]).pow(hasAscension(0,23)?1:1/3).add(10).log10().pow(0.6);
			if(hasChargedElement(170))return x.add(1).log10().mul(player.chal.comps[5]).pow(hasAscension(0,23)?1:1/3).add(10).log10().sqrt();
			if(hasElement(519))return x.add(1).log10().mul(player.chal.comps[5]).pow(hasAscension(0,23)?1:1/3).add(10).log10().add(10).log10();
			if(hasElement(421))return x.add(1).log10().mul(player.chal.comps[5]).pow(hasAscension(0,23)?1:1/3).add(10).log10();
			if(hasElement(348))return x.add(1).log10().mul(player.chal.comps[5]).pow(hasAscension(0,23)?1:1/3).add(1);
			if(hasElement(170))return x.pow(hasElement(230)?1:hasElement(199)?0.8:0.6).add(1);
            let ret = E(0.97).pow(x.root(2).softcap(5,0.5,0)).max(E("e-1e10"));
            return ret
        },
        effDesc(x) { if(hasElement(170))return format(x)+"x later";return format(E(1).sub(x).mul(100))+"% weaker"+(x.log(0.97).gte(5)?" <span class='soft'>(softcapped)</span>":"") },
    },
    6: {
        unl() { return player.chal.comps[5].gte(1) || player.supernova.times.gte(1) || quUnl() },
        title: "无时不压",
        desc: "You cannot buy Tickspeed & BH Condenser.",
        reward: `For every completions adds +10% to Tickspeed & BH Condenser Power.`,
        max: E(50),
        inc: E(64),
        pow: E(1.25),
        start: E(1.989e38),
        effect(x) {
            let ret = x.mul(0.1).add(1).softcap(1.5,hasElement(39)?1:0.5,0).sub(1)
            return ret
        },
        effDesc(x) { return "+"+format(x)+"x"+((x.gte(0.5)&&!hasElement(39))?" <span class='soft'>(softcapped)</span>":"") },
    },
    7: {
        unl() { return player.chal.comps[6].gte(1) || player.supernova.times.gte(1) || quUnl() },
        title: "明镜止水",
        desc: "You cannot gain Rage Powers, but Dark Matters are gained by mass instead of Rage Powers at a reduced rate.<br>In addtional, mass gain softcap is stronger.",
        reward() {
			if(hasElement(348))return `使狂怒能量的获取随着完成次数变为原来的一个指数，但削弱蓝色色度效果对它的提升.<br><span class="yellow">On 16th completion, unlock Elements</span>`;
			return `Completions adds 2 maximum completions of 1-4 Challenge.<br><span class="yellow">On 16th completion, unlock Elements</span>`
		},
        max: E(50),
        inc: E(64),
        pow: E(1.25),
        start: E(1.5e76),
        effect(x) {
            let ret = x.mul(2)
            if (hasElement(5)) ret = ret.mul(2)
            if (hasChargedElement(5)) ret = ret.pow(20)
            if (hasChargedElement(13)) ret = ret.pow(1.7)
            if (hasChargedElement(20)) ret = ret.pow(1.1)
            if (hasChargedElement(41)) ret = ret.pow(1.3)
            if (hasChargedElement(60)) ret = ret.pow(1.7)
            if (hasChargedElement(65)) ret = ret.pow(1.3)
            if (hasChargedElement(70)) ret = ret.pow(1.3)
            return ret.floor()
        },
        effDesc(x) { if(hasElement(348))return "^"+format(E(2).pow(player.chal.comps[7].mul(x.add(1).log10()).pow(0.625).add(1)));return "+"+format(x,0) },
    },
    8: {
        unl() { return player.chal.comps[7].gte(1) || player.supernova.times.gte(1) || quUnl() },
        title: "宇宙白洞",
        desc: "Dark Matter & Mass from Black Hole gains are rooted by 8.",
        reward: `Dark Matter & Mass from Black Hole gains are raised by completions.<br><span class="yellow">On first completion, unlock 3 rows of Elements</span>`,
        max: E(50),
        inc: E(80),
        pow: E(1.3),
        start: E(1.989e38),
        effect(x) {
            if (hasElement(64)) x = x.mul(1.5)
			if(hasChargedElement(70))return expMult(x.add(1),2.65);
			if(hasChargedElement(65))return expMult(x.add(1),2.64);
			if(hasChargedElement(56))return expMult(x.add(1),2.63);
			if(hasChargedElement(33))return expMult(x.add(1),2.62);
            let ret = x.root(1.75).mul(0.02).add(1)
			if(hasElement(310))return ret;
            return ret.softcap(2.3,0.25,0)
        },
        effDesc(x) { return "^"+format(x)+(x.gte(2.3)&&!hasElement(310)?"<span class='soft'>(softcapped)</span>":"") },
    },
    9: {
        unl() { return hasTree("chal4") },
        title: "粒子消失",
        desc: "You cannot assign quarks. In addtional, mass gains exponent is raised to 0.9th power.",
        reward: `Improve Magnesium-12 better.`,
        max: E(100),
        inc: E('e500'),
        pow: E(2),
        start: E('e9.9e4').mul(1.5e56),
        effect(x) {
            let ret = x.root(hasTree("chal4a")?3.5:4).mul(0.1).add(1).softcap(82,hasChargedElement(104)?0.3:0.2,0)
            return ret
        },
        effDesc(x) { return "^"+format(x) },
    },
    10: {
        unl() { return hasTree("chal5") },
        title: "现实 I",
        desc: "All challenges 1-8 are applied at once. In addtional, you are trapped in Mass Dilation!",
        reward: `The exponent of the RP formula is multiplied by completions. (this effect doesn't work while in this challenge)<br><span class="yellow">On first completion, unlock Fermions!</span>`,
        max: E(100),
        inc: E('e2000'),
        pow: E(2),
        start: E('e29000').mul(1.5e56),
        effect(x) {
			if(hasChargedElement(104))return x.add(1)
            let ret = x.root(1.75).mul(0.01).add(1)
            return ret
        },
        effDesc(x) { return format(x)+"x" },
    },
    11: {
        unl() { return hasTree("chal6") },
        title: "绝对论",
        desc: "You cannot gain relativistic particles or dilated mass. However, you are stuck in Mass Dilation.",
        reward: `Star Booster is stonger by completions.`,
        max: E(100),
        inc: E("ee6"),
        pow: E(2),
        start: uni("e3.8e7"),
        effect(x) {
			if(hasChargedElement(104))return x.add(1)
            let ret = x.root(2).div(10).add(1)
            return ret
        },
        effDesc(x) { return format(x)+"x stronger" },
    },
    12: {
        unl() { return hasTree("chal7") },
        title: "原子衰变",
        desc: "You cannot gain Atoms & Quarks.",
        reward: `Completions add free Radiation Boosters.<br><span class="yellow">On first completion, unlock new prestige layer!</span>`,
        max: E(100),
        inc: E('e2e7'),
        pow: E(2),
        start: uni('e8.4e8'),
        effect(x) {
			if(hasChargedElement(133))return Decimal.pow(10,expMult(x.add(10),0.5)).sub(1e10)
			if(hasChargedElement(104))return x
            let ret = x.root(hasTree("chal7a")?1.5:2)
            return ret
        },
        effDesc(x) { return "+"+format(x) },
    },
    13: {
        unl() { return hasElement(155) },
        title: "量子失效",
        desc: "您无法获得量子泡沫、量子次数、死寂碎片、色度、蓝图粒子和熵。",
        reward: `当你不在大撕裂中时，加成色度的获取和效果。<br><span class="yellow">当完成第4次该挑战时，解锁更多元素</span>`,
        max: E(100),
        inc: E('ee40'),
        pow: E(8.2),
        start: E('ee40'),
        effect(x) {
			if(CHALS.inChal(17) || CHALS.inChal(19))return E(1)
                if(hasChargedElement(222)){
                    if(x.gte(100000))x=x.log10().pow(1.3).mul(20000).mul(5**0.1).max(x.log10().pow(1.5).mul(1250));                
			}else if(hasChargedElement(204)){
				if(x.gte(100000))x=x.log10().pow(0.9).mul(20000).mul(5**0.1).max(x.log10().pow(1.5).mul(1250));
			}else if(hasChargedElement(194)){
				if(x.gte(100000))x=x.log10().pow(0.85).mul(20000).mul(5**0.15).max(x.log10().pow(1.5).mul(1250));
			}else if(hasChargedElement(190)){
				if(x.gte(10000))x=x.log10().pow(1.5).mul(1250);
			}else if(hasChargedElement(182)){
				if(x.gte(10000))x=x.log10().pow(1.25).mul(1250).mul(2**0.5);
			}else if(hasChargedElement(155)){
				if(x.gte(10000))x=x.log10().mul(2500);
			}else if(hasChargedElement(39)){
				if(x.gte(200))x=x.div(2).log10().mul(100);
			}else if(hasChargedElement(8)){
				if(x.gte(100))x=x.log10().mul(50);
			}else{
				if(x.gte(10))x=x.log10().mul(10);
			}
            let ret = x.div(100).add(1)
            return ret
        },
        effDesc(x) { return "^"+format(x)+(x.gte(1.1)?" <span class='soft'>(softcapped)</span>":"") },
    },
    14: {
        unl() { return hasElement(159) },
        title: "现实 II",
        desc: "挑战1-挑战12同时触发，并强制进行大撕裂。",
        reward() {
			if(hasUpgrade('br',22))return `使死寂碎片获取随着完成次数变为原来的一个指数。`;
			return `死寂碎片获取的软上限被削弱。`
		},
        max: E(100),
        inc: E('e2.5e11'),
        pow: E(2),
        start: E('e2e12'),
        effect(x) {
			if(CHALS.inChal(17) || CHALS.inChal(19))return E(1)
			if(hasUpgrade('br',22)){
        if(hasChargedElement(252)&&tmp.preQUGlobalSpeed>=("e5e204"))return x.pow(0.1);
				if(hasChargedElement(210))return x.add(1e10).log10().div(10).pow(4);
				if(hasChargedElement(206))return x.add(1e10).log10().div(10).pow(3);
				if(hasChargedElement(159))return x.add(1e10).log10().div(10).pow(2);
				return x.add(1e10).log10().div(10);
			}
            let ret = E(0.97).pow(x.root(2).softcap(25,0.56,0).softcap(42,0.1,0))
            return ret
        },
        effDesc(x) { if(hasUpgrade('br',22))return "^"+format(x);return format(E(1).sub(x).mul(100))+"% weaker"+(x.log(0.97).gte(25)?" <span class='soft'>(softcapped)</span>":"") },
    },
    15: {
        unl() { return hasElement(164) },
        title: "超级溢出",
        desc: "质量溢出在10克开始并且增强12倍。黑洞溢出在10克开始并且被增强。",
        reward() {
            if(hasChargedElement(230))return `雕文质量的获取变得更好.`;            
			if(hasChargedElement(164))return `Stronger Overflow starts later.`;
			return `质量溢出延迟出现。`
		},
        max: E(100),
        inc: E('e1e14'),
        pow: E(5),
        start: E('e1e13'),
        effect(x) {
			if(CHALS.inChal(17) || CHALS.inChal(19))return E(1)
            let ret = x.add(1)
            if(hasChargedElement(230))ret = ret.add(10).log10().pow(0.055);
			if(hasChargedElement(186)&&!hasChargedElement(230))ret = overflow(ret,10,3);
            if(hasChargedElement(214)&&!hasChargedElement(230))ret = overflow(ret,10,3);
            return ret
        },
        effDesc(x) {   if(hasChargedElement(164))return "^"+format(x); return "^"+format(x) },
    },
    16: {
        unl() { return hasElement(168) },
        title: "无转生质量",
        desc: "您不能获得转生质量。进入该挑战时重置转生质量。",
        reward: `转生质量效果的第一个软上限被削弱。<br><span class="yellow">当完成第3次该挑战时，解锁更多元素</span>`,
        max: E(100),
        inc: E('e3e86'),
        pow: E(1.45),
        start: E('e1.65e87'),
        effect(x) {
			if(CHALS.inChal(17) || CHALS.inChal(19))return E(1)
            let ret = E(0.93).pow(x.root(2))

            return ret
        },
        effDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
    },
    17: {
        unl() { return hasElement(192) },
        title: "无挑战",
        desc: "您不能完成挑战1-12。挑战13-16没有效果。",
        reward: `挑战3-4的软上限被削弱。弱化挑战1-12的硬化折算。<br><span class="yellow">当完成第3次该挑战时，解锁更多元素</span>`,
        max: E(100),
        inc: E('e3e619'),
        pow: E(3),
        start: E('ee619'),
        effect(x) {
            let ret = E(0.95).pow(x.root(2))

            return ret
        },
        effDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
    },
    18: {
        unl() { return hasElement(205) },
        title: "无限失效",
        desc: "您不能获取无限质量。",
        reward: `无限质量获取公式变得更好。<br><span class="yellow">当完成第3次该挑战时，解锁更多元素</span>`,
        max: E(100),
        inc: E('ee2684'),
        pow: E(9),
        start: E('ee2683'),
        effect(x) {
			if(hasChargedElement(205))return x.add(1).log10().add(1).log10().mul(1.8).pow(2);
			if(hasElement(351))return x.add(1).log10().add(1).log10().mul(1.75).pow(2);
            let ret = x.add(1).log10().add(1).log10().add(1).log10().softcap(0.09,hasElement(233)?1:0.25,0).mul(hasElement(233)?4.2:1);
            return ret
        },
        effDesc(x) { return "+"+format(x)+((x.gte(0.09) && !hasElement(233))?" <span class='soft'>(softcapped)</span>":"") },
    },
    19: {
        unl() { return hasElement(209) },
        title: "现实 III",
        desc: "挑战1-挑战18同时触发。",
        reward: `使碎片生成器倍率基于该挑战完成次数变得更好。<br><span class="yellow">当完成第8次该挑战时，解锁更多元素</span>`,
		max: E(100),
		inc: E(10),
		pow: E(1.25),
        start: E("1e191"),
        effect(x) {
            let ret = x.div(4).add(1);
			if(hasChargedElement(209))ret = x.add(1).pow(2);
            if(hasChargedElement(252)&&tmp.preQUGlobalSpeed>=("e5e204"))ret = x.add(1).pow(3);
			return ret
        },
        effDesc(x) { return format(x)+"x" },
    },
    20: {
        unl() { return hasElement(213) },
        title: "质量对数",
        desc: "质量获取变为log10(质量获取)，量子之前所有资源获取速度如果高于ee50将会设定为ee50。",
        reward: `使质量获取速度随着完成次数变为原来的一个指数。`,
		max: E(100),
		inc: E(10),
		pow: E(1.25),
        start: E("1e3149"),
        effect(x) {
			if(player.chal.active == 22)return E(1);
			if(player.chal.active == 23)return E(1);
			if(hasPrestige(2,17))x = x.pow(2);
			if(hasElement(277))x = x.pow(1.25);
			if(!hasTree('qp19'))x = x.softcap(1e6,hasElement(489)?0.86:hasElement(465)?0.84:hasElement(433)?0.7:hasElement(429)?0.5:hasElement(417)?0.3:hasElement(409)?0.1:hasElement(397)?0.03:0.01,0);
			if(!hasElement(538))x = x.softcap(hasElement(527)?1.5e7:1e7,hasTree('qp27')?0.85:hasTree('qp25')?0.7:0.1,0);
			x = x.softcap(2.1e8,hasTree('ax31')?0.15:hasTree('ax24')?0.12:0.1,0);
            let ret = E(2).pow(x);
			if(hasElement(229))ret = ret.pow(3);
			if(hasElement(334))ret = Decimal.pow(10,Decimal.pow(2.6,x.root(4)));
			if(hasElement(343))ret = Decimal.pow(10,Decimal.pow(1.44,x.root(3)));
			if(player.chal.active == 21)return ret.min('e2e25');
            return ret
        },
        effDesc(x) { return "^"+format(x) },
    },
    21: {
        unl() { return hasElement(438) },
        title: "无超新星星系",
        desc: "超新星星系，星系资源和星系粒子无效（保留自动化效果）.并且进入难度为10级的星系挑战和挑战20的效果上限限制为^e2e25.",
        reward: `超新星星系的超级折算延迟.`,
		max: E(100),
		inc: E(1e10),
		pow: E(10),
        start: E("4e18493813"),
        effect(x) {
			if(x.lt(1))return E(0);
			let ret = x.mul(2).add(10);
			if(hasElement(552))ret = ret.max(x.mul(3));
            if(hasChargedElement(252)&&tmp.preQUGlobalSpeed>=("e5e204"))return ret.max(x.mul(3).pow(1.01));
			return ret
        },
        effDesc(x) { return "延迟"+format(x)+"次出现" },
    },
    22: {
        unl() { return hasElement(476) },
        title: "无黑洞质量",
        desc: "你不能获取黑洞质量. 并且进入难度为12级的星系挑战和挑战20奖励失效 .",
        reward: `黑洞质量的第二个溢出弱化.`,
		max: E(100),
		inc: E(1e100),
		pow: E(2),
        start: E("1e30000"),
        effect(x) {
            let ret = E(0.99).pow(x.root(2))
            return ret
        },
        effDesc(x) { return format(E(1).sub(x).mul(100))+"%" },
    },
    23: {
        unl() { return hasElement(545) },
        title: "物质湮灭",
        desc: "物质的效果失效.并且进入难度为14级的星系挑战和挑战20奖励失效,超新星的元折算锁定于1次出现且不可弱化.",
        reward: `增加物质指数.`,
		max: E(100),
		inc: E(1e10),
		pow: E(2),
        start: E("1e7900"),
        effect(x) {
            let ret = x.div(100);
            if(hasChargedElement(236))ret =ret.mul(1.1) ;
            return ret
        },
        effDesc(x) { return "+"+format(x) },
    },
    24: {
        unl() { return hasTree('qp40') },
        title: "最简单的挑战",
        desc: "进入难度为16级的星系挑战.",
        reward: `奇异物质的获取变得更好.`,
		max: E(100),
		inc: E(10),
		pow: E(2),
        start: E("1e1400"),
        effect(x) {
            let ret = x.div(20);
            return ret
        },
        effDesc(x) { return "+"+format(x) },
    },
    25: {
        unl() { return player.sun.shard.gte(999999999999999) },//咕咕咕
        title: "转生黑矮星",
        desc: "使所有星辰相关资源的获取速度指数变为原来的0.5次方,使星辰发生器的效果指数变为原来的0.5次方.   +充能挑战1:六重阶层^0.5,七重阶层/10,八重阶层/5,九重阶层/2.",
        reward() {
		return `每次完成获得1转生量子碎片,转生星辰获取基于挑战完成次数增加.`
			
		},
        max: E(100),
        inc: E('ee10'),
        pow: E(10),
        start:E('ee10'),
        effect(x) {
            let ret = x.add(1).pow(4)
            return ret
        },
        effDesc(x) { return  "x"+format(x) },
    },
    cols: 25,
}

/*
3: {
    unl() { return player.chal.comps[2].gte(1) },
    title: "Placeholder",
    desc: "Placeholder.",
    reward: `Placeholder.`,
    max: E(50),
    inc: E(10),
    pow: E(1.25),
    start: EINF,
    effect(x) {
        let ret = E(1)
        return ret
    },
    effDesc(x) { return format(x)+"x" },
},
*/

