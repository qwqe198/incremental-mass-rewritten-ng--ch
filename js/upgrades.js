const UPGS = {
    mass: {
        cols: 4,
        temp() {
            for (let x = this.cols; x >= 1; x--) {
                let d = tmp.upgs.mass
                let data = this.getData(x)
                d[x].cost = data.cost
                d[x].bulk = data.bulk
                
                d[x].bonus = this[x].bonus?this[x].bonus():E(0)
                d[x].eff = this[x].effect(player.massUpg[x]||E(0))
                d[x].effDesc = this[x].effDesc(d[x].eff)
            }
        },
        autoSwitch(x) {
            player.autoMassUpg[x] = !player.autoMassUpg[x]
        },
        buy(x, manual=false) {
            let cost = manual ? this.getData(x).cost : tmp.upgs.mass[x].cost
            if (player.mass.gte(cost)) {
                if (!player.mainUpg.bh.includes(1)) player.mass = player.mass.sub(cost)
                if (!player.massUpg[x]) player.massUpg[x] = E(0)
                player.massUpg[x] = player.massUpg[x].add(1)
            }
        },
        buyMax(x) {
            let d = tmp.upgs.mass[x]
            let bulk = d.bulk
            let cost = d.cost
            if (player.mass.gte(cost)) {
                let m = player.massUpg[x]
                if (!m) m = E(0)
                m = m.max(bulk.floor().max(m.plus(1)))
                player.massUpg[x] = m
                if (!player.mainUpg.bh.includes(1)) player.mass = player.mass.sub(cost)
            }
        },
        getData(i) {
            let upg = this[i]
            let inc = upg.inc
            let start = upg.start
            let lvl = player.massUpg[i]||E(0)
            let cost, bulk

            if (i==4) {
                cost = mlt(inc.pow(lvl.scaleEvery("massUpg4")).mul(start))
                bulk = player.mass.div(1.5e56).max(1).log10().div(start.mul(1e9)).max(1).log(inc).scaleEvery("massUpg4",true).add(1).floor()
                if (player.mass.lt(start)) bulk = E(0)
            } else {
                if (i == 1 && player.ranks.rank.gte(2)) inc = inc.pow(0.8)
                if (i == 2 && player.ranks.rank.gte(3)) inc = inc.pow(0.8)
                if (i == 3 && player.ranks.rank.gte(4)) inc = inc.pow(0.8)
                if (player.ranks.tier.gte(3)) inc = inc.pow(0.8)
                cost = inc.pow(lvl.scaleEvery("massUpg")).mul(start)
                bulk = E(0)
                if (player.mass.gte(start)) bulk = player.mass.div(start).max(1).log(inc).scaleEvery("massUpg",true).add(1).floor()
            }
        
            return {cost: cost, bulk: bulk}
        },
        1: {
            unl() { return (!hasChargedElement(223)) },
            title: "锻体器",
            start: E(10),
            inc: E(1.5),
            effect(x) {
                let step = E(1)
                if (player.ranks.rank.gte(3)) step = step.add(RANKS.effect.rank[3]())
                step = step.mul(tmp.upgs.mass[2]?tmp.upgs.mass[2].eff.eff:1)
                let ret = step.mul(x.add(tmp.upgs.mass[1].bonus))
				if(hasAscension(2,1))ret = step.mul(x.add(1).mul(tmp.upgs.mass[1].bonus.add(1)))
				if(hasElement(174))ret = ret.pow(tmp.elements.effect[174]||1);
                return {step: step, eff: ret}
            },
            effDesc(eff) {
                return {
                    step: "+"+formatMass(eff.step),
                    eff: "+"+formatMass(eff.eff)+"质量获取速度"
                }
            },
            bonus() {
                let x = E(0)
                if (player.mainUpg.rp.includes(1)) x = x.add(tmp.upgs.main?tmp.upgs.main[1][1].effect:E(0))
                if (player.mainUpg.rp.includes(2)) x = x.add(tmp.upgs.mass[2].bonus)
                x = x.mul(getEnRewardEff(4))
                return x
            },
        },
        2: {
            unl() { return (!hasChargedElement(223))},
            title: "助推器",
            start: E(100),
            inc: E(4),
            effect(x) {
                let step = E(2)
                if (player.ranks.rank.gte(5)) step = step.add(RANKS.effect.rank[5]())
				if (hasElement(472)) step = step.mul(tmp.tickspeedEffect?(tmp.tickspeedEffect.step||E(1)):E(1))
                step = step.pow(tmp.upgs.mass[3]?tmp.upgs.mass[3].eff.eff:1)
                let ret = step.mul(x.add(tmp.upgs.mass[2].bonus)).add(1)
				if(hasAscension(2,1))ret = step.mul(x.add(1).mul(tmp.upgs.mass[2].bonus.add(1))).add(1)
				if(hasElement(173))ret = ret.pow(tmp.elements.effect[173]||1);
                return {step: step, eff: ret}
            },
            effDesc(eff) {
                return {
                    step: "+"+format(eff.step)+"倍",
                    eff: "x"+format(eff.eff)+" to Muscler Power"
                }
            },
            bonus() {
                let x = E(0)
                if (player.mainUpg.rp.includes(2)) x = x.add(tmp.upgs.main?tmp.upgs.main[1][2].effect:E(0))
                if (player.mainUpg.rp.includes(7)) x = x.add(tmp.upgs.mass[3].bonus)
                x = x.mul(getEnRewardEff(4))
                return x
            },
        },
        3: {
            unl() { return player.ranks.rank.gte(3) || player.mainUpg.atom.includes(1) },
            title: "强化器",
            start: E(1000),
            inc: E(9),
            effect(x) {
                let xx = x.add(tmp.upgs.mass[3].bonus)
				if(hasAscension(2,1))xx = x.add(1).mul(tmp.upgs.mass[3].bonus.add(1))
                if (hasElement(81)) xx = xx.pow(1.1)
                if (hasChargedElement(81)) xx = xx.pow(2)
                let ss = E(10)
                if (player.ranks.rank.gte(34)) ss = ss.add(2)
                if (player.mainUpg.bh.includes(9)) ss = ss.add(tmp.upgs.main?tmp.upgs.main[2][9].effect:E(0))
                if (hasElement(331)) ss = EINF
                let step = E(1)
				if (player.ranks.tetr.gte(2) || player.superGal.lt(1)) step = step.add(RANKS.effect.tetr[2]())
                if (player.mainUpg.rp.includes(9)) step = step.add(0.25)
                if (player.mainUpg.rp.includes(12)) step = step.add(tmp.upgs.main?tmp.upgs.main[1][12].effect:E(0))
                if (hasElement(4)) step = step.mul(tmp.elements.effect[4])
                if (player.md.upgs[3].gte(1)) step = step.mul(tmp.md.upgs[3].eff)
					
				if (hasUpgrade("exotic",3))step = step.pow(tmp.upgs.mass[4]?tmp.upgs.mass[4].eff.eff:1)
					
                let sp = 0.5
                if (player.mainUpg.atom.includes(9)) sp *= 1.15
                if (player.ranks.tier.gte(30)) sp *= 1.1
                let sp2 = 0.1
                let ss2 = E(5e15)
                if (hasElement(85)) {
                    sp2 **= 0.9
                    ss2 = ss2.mul(3)
                }
				if (hasUpgrade('rp',17))sp = sp ** 0.75
                let ret = step.mul(xx.mul(hasElement(80)?25:1)).add(1).softcap(ss,sp,0)
				if (!hasElement(292))ret = ret.softcap(1.8e5,hasPrestige(0,12)?0.525:0.5,0)
                ret = ret.mul(tmp.prim.eff[0])
                if (!player.ranks.pent.gte(15) && (!hasElement(292))) ret = ret.softcap(ss2,sp2,0)
                 tmp.strongerOverflowStart = E("e4e6")
				if (!hasTree('qp39'))tmp.strongerOverflowPower = player.ranks.oct.gte(8)?0.6:0.5;
				if (hasElement(305))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.9;
				if (hasElement(315))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.8;
				if (hasPrestige(2,81))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.5;
				if (player.ranks.enne.gte(3))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.99;
				if (hasChargedElement(77))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.99;
				if (hasChargedElement(80))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.997;
				if (hasChargedElement(85))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.997;
				if (hasChargedElement(110))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.95;
				if (hasElement(478))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.986;
				if (hasElement(516))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.75;
				if (hasElement(521))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.9;
				if (hasElement(537))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.85;
				if (hasElement(557))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.75;
				if (player.ranks.enne.gte(4360))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.95;
				if (player.ranks.enne.gte(4570))tmp.strongerOverflowPower = tmp.strongerOverflowPower ** 0.9;
				if (hasChargedElement(164))tmp.strongerOverflowStart = tmp.strongerOverflowStart.pow(tmp.chal?(tmp.chal.eff[15].add(9).log10()||1):1)
				tmp.strongerOverflow = overflow(ret, tmp.strongerOverflowStart, tmp.strongerOverflowPower).log(ret);
				if (!hasTree('qp39'))ret = overflow(ret, tmp.strongerOverflowStart, tmp.strongerOverflowPower);
                return {step: step, eff: ret, ss: ss}
            },
            effDesc(eff) {
                return {
                    step: "+"+format(eff.step)+"次方",
                    eff: "^"+format(eff.eff)+" to Booster Power"+(eff.eff.gte(eff.ss)?`<span class='soft'>(softcapped${(eff.eff.gte(1.8e5)&&(!hasElement(292)))?eff.eff.gte(5e15)&&!player.ranks.pent.gte(15)?"^3":"^2":""})</span>`:"")
                }
            },
            bonus() {
                let x = E(0)
                if (player.mainUpg.rp.includes(7)) x = x.add(tmp.upgs.main?tmp.upgs.main[1][7].effect:0)
                x = x.mul(getEnRewardEff(4))
                return x
            },
        },
        4: {
            unl() { return hasUpgrade("exotic",3) },
            title: "降伏器",
            start: E("ee10"),
            inc: E("ee10"),
            effect(x) {
                let xx = x.add(tmp.upgs.mass[4].bonus)
				if(hasAscension(2,1))xx = x.add(1).mul(tmp.upgs.mass[4].bonus.add(1)).sub(1)
				let step = E(0.03)
				if (player.prestiges[2].gte(165))step = step.add(tmp.prestigeRPEffect)
                let ss = E(10)
				let sp = 0.5
                let ss2 = E(1000)
				let sp2 = 0.1
                
                let ret = step.mul(xx).add(1).softcap(ss,sp,0).softcap(ss2,sp2,0)
                return {step: step, eff: ret, ss: ss, ss2: ss2}
            },
            effDesc(eff) {
                return {
                    step: "+^"+format(eff.step),
                    eff: "^"+format(eff.eff)+"强化器倍率"+(eff.eff.gte(eff.ss)?` <span class='soft'>(softcapped${eff.eff.gte(eff.ss2)?"^2":""})</span>`:"")
                }
            },
            bonus() {
                let x = E(0)
                if (player.mainUpg.exotic.includes(6)) x = x.add(tmp.upgs.main?tmp.upgs.main[6][6].effect:0)
                return x
            },
        },
    },
    prestigeMass: {
        cols: 4,
        temp() {
            for (let x = this.cols; x >= 1; x--) {
                let d = tmp.upgs.prestigeMass
                let data = this.getData(x)
                d[x].cost = data.cost
                d[x].bulk = data.bulk
                
                d[x].bonus = this[x].bonus?this[x].bonus():E(0)
                d[x].eff = this[x].effect(player.prestigeMassUpg[x]||E(0))
                d[x].effDesc = this[x].effDesc(d[x].eff)
            }
        },
        autoSwitch(x) {
            player.autoprestigeMassUpg[x] = !player.autoprestigeMassUpg[x]
        },
        buy(x, manual=false) {
            let cost = manual ? this.getData(x).cost : tmp.upgs.prestigeMass[x].cost
            if (player.prestigeMass.gte(cost)) {
                if (!player.prestigeMassUpg[x]) player.prestigeMassUpg[x] = E(0)
                player.prestigeMassUpg[x] = player.prestigeMassUpg[x].add(1)
            }
        },
        buyMax(x) {
            let d = tmp.upgs.prestigeMass[x]
            let bulk = d.bulk
            let cost = d.cost
            if (player.prestigeMass.gte(cost)) {
                let m = player.prestigeMassUpg[x]
                if (!m) m = E(0)
                m = m.max(bulk.floor().max(m.plus(1)))
                player.prestigeMassUpg[x] = m
            }
        },
        getData(i) {
            let upg = this[i]
            let inc = upg.inc
            let start = upg.start
            let lvl = player.prestigeMassUpg[i]||E(0)
            let cost, bulk

            if (i==4) {
                cost = mlt(inc.pow(lvl).mul(start))
                bulk = player.prestigeMass.div(1.5e56).max(1).log10().div(start.mul(1e9)).max(1).log(inc).add(1).floor()
                if (player.prestigeMass.lt(mlt(start))) bulk = E(0)
			} else {
				cost = inc.pow(lvl).mul(start)
				bulk = E(0)
				if (player.prestigeMass.gte(start)) bulk = player.prestigeMass.div(start).max(1).log(inc).add(1).floor()
			}
            return {cost: cost, bulk: bulk}
        },
        1: {
            unl() { return hasPrestige(2,38) },
            title: "转生锻体器",
            start: E(10),
            inc: E(1.5),
            effect(x) {
                let step = player.prestiges[0]
                if (hasPrestige(2,51)) step = step.mul(prestigeEff(2,51))
                step = step.mul(tmp.upgs.prestigeMass[2]?tmp.upgs.prestigeMass[2].eff.eff:1)
                let ret = step.mul(x).add(1)
				if(hasPrestige(3,24))ret = ret.pow(prestigeEff(3,24));
				if(hasChargedElement(168))ret = ret.pow(tmp.elements.ceffect[168]||1);
                return {step: step, eff: ret}
            },
            effDesc(eff) {
                return {
                    step: "+"+format(eff.step),
                    eff: "x"+format(eff.eff)+"转生质量获取速度"
                }
            },
        },
        2: {
            unl() { return hasPrestige(2,39) },
            title: "转生助推器",
            start: E(100),
            inc: E(4),
            effect(x) {
                let step = player.prestiges[1]
                if (hasPrestige(2,52)) step = step.mul(prestigeEff(2,52))
                step = step.pow(tmp.upgs.prestigeMass[3]?tmp.upgs.prestigeMass[3].eff.eff:1)
                let ret = step.mul(x).add(1)
				if(hasPrestige(3,28))ret = ret.pow(prestigeEff(3,28));
                return {step: step, eff: ret}
            },
            effDesc(eff) {
                return {
                    step: "+"+format(eff.step)+"x",
                    eff: "x"+format(eff.eff)+"转生锻体器倍率"
                }
            },
        },
        3: {
            unl() { return hasPrestige(2,40) },
            title: "转生强化器",
            start: E(1000),
            inc: E(9),
            effect(x) {
                let step = E(0.001)
                if (hasPrestige(2,53)) step = step.mul(prestigeEff(2,53))
                if (hasPrestige(3,11)) step = step.mul(prestigeEff(3,11))
                step = step.mul(tmp.upgs.prestigeMass[4]?tmp.upgs.prestigeMass[4].eff.eff:1)
				let ret = step.mul(x).add(1).softcap(2000,hasAscension(1,154)?0.675:hasAscension(1,35)?0.65:hasAscension(1,32)?0.6:hasAscension(1,31)?0.55:0.5,0);
            
                return {step: step, eff: ret, ss: 2000}
            },
            effDesc(eff) {
                return {
                    step: "+^"+format(eff.step),
                    eff: "^"+format(eff.eff)+"转生助推器倍率"+(eff.eff.gte(eff.ss)?` <span class='soft'>(受软上限限制)</span>`:"")
                }
            },
        },
        4: {
            unl() { return hasUpgrade("exotic",4) },
            title: "转生降伏器",
            start: E(1e-4),
            inc: E(1.0005),
            effect(x) {
                let step = E(0.001)
				if(hasElement(378))step = step.mul(2)
				let ret = step.mul(x).add(1);
                return {step: step, eff: ret}
            },
            effDesc(eff) {
                return {
                    step: "+"+format(eff.step)+"x",
                    eff: "x"+format(eff.eff)+"转生强化器倍率"
                }
            }
        },
    },
    ascensionMass: {
        cols: 4,
        temp() {
            for (let x = this.cols; x >= 1; x--) {
                let d = tmp.upgs.ascensionMass
                let data = this.getData(x)
                d[x].cost = data.cost
                d[x].bulk = data.bulk
                
                d[x].bonus = this[x].bonus?this[x].bonus():E(0)
                d[x].eff = this[x].effect(player.ascensionMassUpg[x]||E(0))
                d[x].effDesc = this[x].effDesc(d[x].eff)
            }
        },
        autoSwitch(x) {
            player.autoascensionMassUpg[x] = !player.autoascensionMassUpg[x]
        },
        buy(x, manual=false) {
            let cost = manual ? this.getData(x).cost : tmp.upgs.ascensionMass[x].cost
            if (player.ascensionMass.gte(cost)) {
                if (!player.ascensionMassUpg[x]) player.ascensionMassUpg[x] = E(0)
                player.ascensionMassUpg[x] = player.ascensionMassUpg[x].add(1)
            }
        },
        buyMax(x) {
            let d = tmp.upgs.ascensionMass[x]
            let bulk = d.bulk
            let cost = d.cost
            if (player.ascensionMass.gte(cost)) {
                let m = player.ascensionMassUpg[x]
                if (!m) m = E(0)
                m = m.max(bulk.floor().max(m.plus(1)))
                player.ascensionMassUpg[x] = m
            }
        },
        getData(i) {
            let upg = this[i]
            let inc = upg.inc
            let start = upg.start
            let lvl = player.ascensionMassUpg[i]||E(0)
            let cost, bulk

            if (i==4) {
                cost = mlt(inc.pow(lvl).mul(start))
                bulk = player.ascensionMass.div(1.5e56).max(1).log10().div(start.mul(1e9)).max(1).log(inc).add(1).floor()
                if (player.ascensionMass.lt(mlt(start))) bulk = E(0)
			} else {
				cost = inc.pow(lvl).mul(start)
				bulk = E(0)
				if (player.ascensionMass.gte(start)) bulk = player.ascensionMass.div(start).max(1).log(inc).add(1).floor()
			}
            return {cost: cost, bulk: bulk}
        },
        1: {
            unl() { return hasAscension(1,4) },
            title: "飞升锻体器",
            start: E(10),
            inc: E(1.5),
            effect(x) {
                let step = player.ascensions[0]
                step = step.mul(tmp.upgs.ascensionMass[2]?tmp.upgs.ascensionMass[2].eff.eff:1)
                let ret = step.mul(x).add(1)
				if(hasAscension(1,16))ret = ret.pow(ascensionEff(1,16));
                return {step: step, eff: ret}
            },
            effDesc(eff) {
                return {
                    step: "+"+format(eff.step),
                    eff: "x"+format(eff.eff)+"飞升质量获取速度"
                }
            },
        },
        2: {
            unl() { return hasAscension(1,5) },
            title: "飞升助推器",
            start: E(100),
            inc: E(4),
            effect(x) {
                let step = player.ascensions[1]
                step = step.pow(tmp.upgs.ascensionMass[3]?tmp.upgs.ascensionMass[3].eff.eff:1)
                let ret = step.mul(x).add(1)
				if(hasAscension(1,18))ret = ret.pow(ascensionEff(1,18));
                return {step: step, eff: ret}
            },
            effDesc(eff) {
                return {
                    step: "+"+format(eff.step)+"x",
                    eff: "x"+format(eff.eff)+"飞升锻体器倍率"
                }
            },
        },
        3: {
            unl() { return hasAscension(1,6) },
            title: "飞升强化器",
            start: E(1000),
            inc: E(9),
            effect(x) {
                let step = E(0.1)
                step = step.mul(tmp.upgs.ascensionMass[4]?tmp.upgs.ascensionMass[4].eff.eff:1)
				let ret = step.mul(x).add(1).softcap(2000,0.5,0);
                return {step: step, eff: ret, ss: 2000}
            },
            effDesc(eff) {
                return {
                    step: "+^"+format(eff.step),
                    eff: "^"+format(eff.eff)+"飞升助推器倍率"+(eff.eff.gte(eff.ss)?` <span class='soft'>（受软上限限制）</span>`:"")
                }
            },
        },
        4: {
            unl() { return hasAscension(2,16) },
            title: "飞升降伏器",
            start: E(2e-5),
            inc: E(1.0005),
            effect(x) {
                let step = E(0.0001)
				let ret = step.mul(x).add(1);
                return {step: step, eff: ret}
            },
            effDesc(eff) {
                return {
                    step: "+"+format(eff.step)+"x",
                    eff: "x"+format(eff.eff)+"飞升强化器倍率"
                }
            }
        },
    },
    main: {
        temp() {
            for (let x = 1; x <= this.cols; x++) {
                for (let y = 1; y <= this[x].lens; y++) {
                    let u = this[x][y]
                    if (u.effDesc) tmp.upgs.main[x][y] = { effect: u.effect(), effDesc: u.effDesc() }
                }
            }
        },
        ids: [null, 'rp', 'bh', 'atom', 'br', 'inf', 'exotic', 'st'],
        cols: 7,
        over(x,y) { player.main_upg_msg = [x,y] },
        reset() { player.main_upg_msg = [0,0] },
        1: {
            title: "Rage Upgrades",
            res: "Rage Power",
            getRes() { return player.rp.points },
            unl() { return player.rp.unl },
            can(x) { return player.rp.points.gte(this[x].cost) && !player.mainUpg.rp.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.rp.points = player.rp.points.sub(this[x].cost)
                    player.mainUpg.rp.push(x)
                }
            },
            auto_unl() { return player.mainUpg.bh.includes(5) },
            lens: 25,
            1: {
                desc: "Boosters adds Musclers.",
                cost: E(1),
                effect() {
                    let ret = E(player.massUpg[2]||0)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x,0)+" Musclers"
                },
            },
            2: {
                desc: "Strongers adds Boosters.",
                cost: E(10),
                effect() {
                    let ret = E(player.massUpg[3]||0)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x,0)+" Boosters"
                },
            },
            3: {
                desc: "You can automatically buys mass upgrades.",
                cost: E(25),
            },
            4: {
                desc: "Ranks no longer resets anything.",
                cost: E(50),
            },
            5: {
                desc: "You can automatically rank up.",
                cost: E(1e4),
            },
            6: {
                desc: "You can automatically tier up.",
                cost: E(1e5),
            },
            7: {
                desc: "For every 3 tickspeeds adds Stronger.",
                cost: E(1e7),
                effect() {
                    let ret = player.tickspeed.div(3).add(hasElement(38)?tmp.elements.effect[38]:0).floor()
                    return ret
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x,0)+" Stronger"
                },
            },
            8: {
                desc: "Super, Hyper Mass Upgrades scaling is weaker by Rage Points.",
                cost: E(1e15),
                effect() {
					if(hasElement(526))return E(0);
                    let ret = E(0.9).pow(player.rp.points.max(1).log10().max(1).log10().pow(1.25).softcap(2.5,0.5,0))
                    return ret
                },
                effDesc(x=this.effect()) {
					if(hasElement(526))return format(E(1).sub(x).mul(100))+"% weaker";
                    return format(E(1).sub(x).mul(100))+"% weaker"+(x.log(0.9).gte(2.5)?"<span class='soft'>(softcapped)</span>":"")
                },
            },
            9: {
                unl() { return player.bh.unl || player.chal.unl},
                desc: "Stronger Power is added +^0.25.",
                cost: E(1e31),
            },
            10: {
                unl() { return player.bh.unl || player.chal.unl},
                desc: "Super Rank scaling is 20% weaker.",
                cost: E(1e43),
            },
            11: {
                unl() { return player.chal.unl },
                desc: "Black Hole mass's gain is boosted by Rage Points.",
                cost: E(1e72),
                effect() {
					if(hasElement(526))return player.rp.points.add(1).root(10);
                    let ret = player.rp.points.add(1).root(10).softcap('e4000',0.1,0)
                    return overflow(ret,"ee11000",0.5);
                },
                effDesc(x=this.effect()) {
					if(hasElement(526))return format(x)+"x";
                    return format(x)+"x"+(x.gte("e4000")?"<span class='soft'>(softcapped)</span>":"")
                },
            },
            12: {
                unl() { return player.chal.unl },
                desc: "For every OoM of Rage Powers adds Stronger Power at a reduced rate.",
                cost: E(1e120),
                effect() {
					if(hasElement(526))return player.rp.points.max(1).log10().div(1000);
                    let ret = player.rp.points.max(1).log10().softcap(200,hasUpgrade('rp',23)?0.8:0.75,0).div(1000)
					return ret;
                },
                effDesc(x=this.effect()) {
					if(hasElement(526))return "+^"+format(x);
                    return "+^"+format(x)+(x.gte(0.2)?"<span class='soft'>(softcapped)</span>":"")
                },
            },
            13: {
                unl() { return player.chal.unl },
                desc: "Mass gain softcap starts 3x later for every Rank you have.",
                cost: E(1e180),
                effect() {
                    let ret = E(3).pow(player.ranks.rank)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return "x"+format(x)
                },
            },
            14: {
                unl() { return player.atom.unl },
                desc: "Hyper Tickspeed starts 50 later.",
                cost: E('e320'),
            },
            15: {
                unl() { return player.atom.unl },
                desc: "Mass boost Atom gain.",
                cost: E('e480'),
                effect() {
                    let ret = player.mass.max(1).log10().pow(1.25)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return "x"+format(x)
                },
            },
            16: {
                unl() { return hasUpgrade('inf',15) },
                desc: "移除时间速度倍率的软上限。",
                cost: E('ee99'),
            },
            17: {
                unl() { return hasUpgrade('inf',15) },
                desc: "弱化第1个强化器软上限。",
                cost: E('e2e101'),
            },
            18: {
                unl() { return hasUpgrade('inf',15) },
                desc: "使狂怒能量可以加成无限质量获取速度。",
                cost: E('e1e113'),
                effect() {
                    let ret = player.rp.points.add(1).log10().add(1).log10().sub(111).max(1).log2().add(1);
					if(hasTree('qp6'))ret = player.rp.points.add(1).log10().add(1).log10().add(1).log10().add(1).pow(3);
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            19: {
                unl() { return hasUpgrade('inf',15) },
                desc: "使质量溢出延迟10次方出现。",
                cost: E('e2e123'),
            },
            20: {
                unl() { return hasUpgrade('inf',15) && hasElement(134) },
                desc: "使狂怒能量可以加成加速器倍率。",
                cost: E('ee151'),
                effect() {
                    let ret = player.rp.points.add(1).log10().add(1).log10().add(1).log10().add(1).pow(0.1);
					if(hasUpgrade('rp',25))ret = ret.pow(20);
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            21: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "降伏器的超级折算延迟至1.08倍出现.",
                cost: E('ee1.04e14'),
            },
            22: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "狂怒能量加成时间速度倍率.",
                cost: E('ee1.25e14'),
                effect() {
                    let ret = expMult(player.rp.points.add(1e10),player.rp.points.add(1e10).log10().add(1).log10().add(1).log10().div(500).add(0.001).min(0.07));
					if(!hasElement(526))if(ret.gte("eee34"))ret = E(10).pow(overflow(ret.log10(),"ee34",0.5));
					if(!hasElement(526))if(ret.gte("eee36"))ret = E(10).pow(overflow(ret.log10(),"ee36",0.5));
					if(ret.gte("eee55"))ret = overflow(ret,"eee55",0.5);
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            23: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "弱化狂怒升级12的软上限.",
                cost: E('ee1.5e14'),
            },
            24: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "狂怒升级18加成星系夸克获取.",
                cost: E('ee2.22222222e14'),
            },
            25: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "狂怒升级20变得更好.",
                cost: E('ee4.5e14'),
            },
        },
        2: {
            title: "Black Hole Upgrades",
            res: "Dark Matter",
            getRes() { return player.bh.dm },
            unl() { return player.bh.unl },
            auto_unl() { return player.mainUpg.atom.includes(2) },
            can(x) { return player.bh.dm.gte(this[x].cost) && !player.mainUpg.bh.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.bh.dm = player.bh.dm.sub(this[x].cost)
                    player.mainUpg.bh.push(x)
                }
            },
            lens: 25,
            1: {
                desc: "Mass Upgardes no longer spends mass.",
                cost: E(1),
            },
            2: {
                desc: "Tickspeeds boosts BH Condenser Power.",
                cost: E(10),
                effect() {
                    let ret = player.tickspeed.add(1).root(8)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            3: {
                desc: "Super Mass Upgrade scales later based on mass of Black Hole.",
                cost: E(100),
                effect() {
                    let ret = player.bh.mass.max(1).log10().pow(1.5).softcap(100,1/3,0).floor()
                    return ret.min(400)
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x,0)+" later"+(x.gte(100)?"<span class='soft'>(softcapped)</span>":"")
                },
            },
            4: {
                desc: "Tiers no longer resets anything.",
                cost: E(1e4),
            },
            5: {
                desc: "You can automatically buy tickspeed and Rage Power upgrades.",
                cost: E(5e5),
            },
            6: {
                desc: "Gain 100% of Rage Power gained from reset per second. Rage Powers are boosted by mass of Black Hole.",
                cost: E(2e6),
                effect() {
                    let ret = player.bh.mass.max(1).log10().add(1).pow(2)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            7: {
                unl() { return player.chal.unl },
                desc: "Mass gain softcap start later based on mass of Black Hole.",
                cost: E(1e13),
                effect() {
                    let ret = player.bh.mass.add(1).root(3)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x later"
                },
            },
            8: {
                unl() { return player.chal.unl },
                desc: "Raise Rage Power gain by 1.15.",
                cost: E(1e17),
            },
            9: {
                unl() { return player.chal.unl },
                desc: "Stronger Effect's softcap start later based on unspent Dark Matters.",
                cost: E(1e27),
                effect() {
                    let ret = player.bh.dm.max(1).log10().pow(0.5)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x)+" later"
                },
            },
            10: {
                unl() { return player.chal.unl },
                desc: "Mass gain is boosted by OoM of Dark Matters.",
                cost: E(1e33),
                effect() {
                    let ret = E(2).pow(overflow(player.bh.dm.add(1).log10().softcap(11600,0.5,0),"e5e13",0.2))
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"+(x.max(1).log2().gte(11600)?"<span class='soft'>(softcapped)</span>":"")
                },
            },
            11: {
                unl() { return player.atom.unl },
                desc: "Mass gain softcap is 10% weaker.",
                cost: E(1e80),
            },
            12: {
                unl() { return player.atom.unl },
                desc: "Hyper Tickspeed scales 15% weaker.",
                cost: E(1e120),
            },
            13: {
                unl() { return player.atom.unl },
                desc: "Quark gain is multiplied by 10.",
                cost: E(1e180),
            },
            14: {
                unl() { return player.atom.unl },
                desc: "Neutron Powers boosts mass of Black Hole gain.",
                cost: E(1e210),
                effect() {
                    let ret = player.atom.powers[1].add(1).pow(2)
                    return ret//.softcap("ee13",0.9,2)
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            15: {
                unl() { return player.atom.unl },
                desc: "Atomic Powers adds Black Hole Condensers at a reduced rate.",
                cost: E('e420'),
                effect() {
                    let ret = player.atom.atomic.add(1).log(5).softcap(2e9,0.25,0).softcap(1e10,0.1,0)
                    return ret.floor()
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x,0)
                },
            },
            16: {
                unl() { return hasUpgrade('inf',15) },
                desc: "使黑洞溢出延迟10次方出现。",
                cost: E('ee100'),
            },
            17: {
                unl() { return hasUpgrade('inf',15) },
                desc: "移除黑洞质量公式软上限。使黑洞质量获取的软上限弱化10%。",
                cost: E('e3e102'),
            },
            18: {
                unl() { return hasUpgrade('inf',15) },
                desc: "使暗物质可以加成无限质量获取速度。",
                cost: E('e1e116'),
                effect() {
                    let ret = player.bh.dm.add(1).log10().add(1).log10().sub(113).max(1).log2().add(1);
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            19: {
                unl() { return hasUpgrade('inf',15) },
                desc: "使暗物质可以加成质量获取速度。",
                cost: E('e2e130'),
                effect() {
					if(hasChargedElement(71))return (tmp.bh?(tmp.bh.effect||E(1)):E(1)).add(1).log10();
					if(hasElement(279))return expMult((tmp.bh?(tmp.bh.effect||E(1)):E(1)).add(1).log10(),0.8);
                    return (tmp.bh?(tmp.bh.effect||E(1)):E(1)).add(1).log10().add(1).log10().pow(0.1);
                },
                effDesc(x=this.effect()) {
                    return "^"+format(x)
                },
            },
            20: {
                unl() { return hasUpgrade('inf',15) },
                desc: "弱化第1个黑洞溢出效果。",
                cost: E('ee170'),
            },
            21: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "暗物质加成黑洞压缩器倍率.",
                cost: E('ee1.22e14'),
                effect() {
                    let ret = expMult(player.bh.dm.add(1e10),player.bh.dm.add(1e10).log10().add(1).log10().add(1).log10().div(500).add(0.001));
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            22: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "暗物质升级18加成星系夸克获取.",
                cost: E('ee1.5e14'),
            },
            23: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "弱化黑洞溢出.",
                cost: E('ee2.33333333e14'),
            },
            24: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "改变[陶中微子]的效果,它能对黑洞压缩器和宇宙射线元折算的所有折算生效.熵加倍的效果变得更好.",
                cost: E('ee3.6e14'),
            },
            25: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "黑洞质量加成奇异物质获取.",
                cost: E('ee4.7e14'),
                effect() {
                    let ret = player.bh.mass.add(1e10).slog();
					if(player.exotic.dark_run.upgs[5].gte(1))ret = Decimal.pow(10,ret.add(1).sqrt());
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
        },
        3: {
            title: "Atom Upgrades",
            res: "Atom",
            getRes() { return player.atom.points },
            unl() { return player.atom.unl },
            can(x) { 
				if (x >= 13 && x <= 15 && player.prestiges[0].gte(50))return player.atom.points.gte(this[x].cost.pow(1/20000)) && !player.mainUpg.atom.includes(x);
				return player.atom.points.gte(this[x].cost) && !player.mainUpg.atom.includes(x) 
			},
            buy(x) {
				if (x >= 13 && x <= 15 && player.prestiges[0].gte(50)){
					if (this.can(x)) {
						player.atom.points = player.atom.points.sub(this[x].cost.pow(1/20000))
						player.mainUpg.atom.push(x)
					}
				}
                if (this.can(x)) {
                    player.atom.points = player.atom.points.sub(this[x].cost)
                    player.mainUpg.atom.push(x)
                }
            },
            auto_unl() { return hasTree("qol1") },
            lens: 25,
            1: {
                desc: "重置时保留质量升级3解锁，狂怒能量的获取变为原来的5倍.",
                cost: E(1),
            },
            2: {
                desc: "You can automatically buy BH Condenser and upgrades. Tickspeed no longer spent Rage Powers.",
                cost: E(100),
            },
            3: {
                desc: "[Tetr Era] Unlock Tetr.",
                cost: E(25000),
            },
            4: {
                desc: "Keep 1-4 Challenge on reset. BH Condensers adds Cosmic Rays Power at a reduced rate.",
                cost: E(1e10),
                effect() {
                    let ret = player.bh.condenser.pow(0.8).mul(0.01)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x)+"x"
                },
            },
            5: {
                desc: "You can automatically Tetr up. Super Tier starts 10 later.",
                cost: E(1e16),
            },
            6: {
                desc: "Gain 100% of Dark Matters gained from reset per second. Mass gain from Black Hole softcap starts later based on Atomic Powers.",
                cost: E(1e18),
                effect() {
                    let ret = player.atom.atomic.add(1).pow(0.5)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x later"
                },
            },
            7: {
                desc: "Tickspeed boost each particle powers gain.",
                cost: E(1e25),
                effect() {
                    let ret = E(1.025).pow(player.tickspeed)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            8: {
                desc: "Atomic Powers boosts Quark gain.",
                cost: E(1e35),
                effect() {
                    let ret = player.atom.atomic.max(1).log10().add(1)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            9: {
                desc: "Stronger effect softcap is 15% weaker.",
                cost: E(2e44),
            },
            10: {
                desc: "Tier requirement is halved. Hyper Rank starts later based on Tiers you have.",
                cost: E(5e47),
                effect() {
                    let ret = player.ranks.tier.mul(2).floor()
                    return ret
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x,0)+" later"
                },
            },
            11: {
                unl() { return MASS_DILATION.unlocked() },
                desc: "Dilated mass also boost BH Condenser & Cosmic Ray powers at a reduced rate.",
                cost: E('e1640'),
                effect() {
                    let ret = player.md.mass.max(1).log10().add(1).pow(0.1)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            12: {
                unl() { return MASS_DILATION.unlocked() },
                desc: "Mass from Black Hole effect is better.",
                cost: E('e2015'),
            },
            13: {
                unl() { return player.md.break.active && (player.qu.rip.active || player.prestiges[0].gte(50)) },
                desc() {if(player.prestiges[0].gte(50))return "使宇宙射线效果的软上限延迟至12倍出现."; return "使宇宙射线效果的软上限延迟至10倍出现.";},
                cost: E('e3.2e11'),
            },
            14: {
                unl() { return player.md.break.active && (player.qu.rip.active || player.prestiges[0].gte(50)) },
                desc() {if(player.prestiges[0].gte(50))return "Tickspeed, Black Hole Condenser and Cosmic Ray scalings up to Meta start x12 later."; return "Tickspeed, Black Hole Condenser and Cosmic Ray scalings up to Meta start x10 later.";},
                cost: E('e4.3e13'),
            },
            15: {
                unl() { return player.md.break.active && (player.qu.rip.active || player.prestiges[0].gte(50)) },
                desc() {if(player.prestiges[0].gte(50))return "Reduce Cosmic Ray scaling by 24%."; return "Reduce Cosmic Ray scaling by 20%.";},
                cost: E('e3.4e14'),
            },
            16: {
                unl() { return hasUpgrade('inf',15) },
                desc: "解锁新的元素。",
                cost: E('e1e88'),
            },
            17: {
                unl() { return hasUpgrade('inf',15) },
                desc: "使阶层的超究折算弱化20%。",
                cost: E('e5e89'),
            },
            18: {
                unl() { return hasUpgrade('inf',15) },
                desc: "使原子可以加成无限质量获取速度。",
                cost: E('e1e101'),
                effect() {
                    let ret = player.atom.points.add(1).log10().add(1).log10().sub(99).max(1).log2().add(1);
					if(hasTree('qp5'))ret = player.atom.points.add(1).log10().add(1).log10().add(1).log10().add(1).pow(3);
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            19: {
                unl() { return hasUpgrade('inf',15) },
                desc: "弱化宇宙射线效果的软上限。",
                cost: E('e3e108'),
            },
            20: {
                unl() { return hasUpgrade('inf',15) && hasElement(134) },
                desc: "使原子可以加成加速器倍率。",
                cost: E('e2e124'),
                effect() {
                    let ret = player.atom.atomic.add(1).log10().add(1).log10().add(1).log10().add(1).pow(0.1);
                    return ret
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            21: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "夸克获取公式变得更好,电子能量第二个效果^4.",
                cost: E('ee1.92e11'),
            },
            22: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "增加星辰生成器获取.",
                cost: E('ee2.1e11'),
            },
            23: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "原子升级18对星系夸克生效.",
                cost: E('ee3e11'),
            },
            24: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "移除原子溢出.",
                cost: E('ee4.2e11'),
            },
            25: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "解锁元素阶层4.",
                cost: E('ee1e12'),
            },
        },
        4: {
            title: "Big Rip Upgrades",
            res: "Death Shard",
            getRes() { return player.qu.rip.amt },
            unl() { return player.qu.rip.first },
            can(x) { return player.qu.rip.amt.gte(this[x].cost) && !player.mainUpg.br.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.qu.rip.amt = player.qu.rip.amt.sub(this[x].cost)
                    player.mainUpg.br.push(x)
                }
            },
            auto_unl() { return hasUpgrade('inf',1) },
            lens: 25,
            1: {
                desc: `Start with Hydrogen-1 unlocked in Big Rip.`,
                cost: E(5),
            },
            2: {
                desc: `Mass Upgrades & Ranks are no longer nerfed by 8th QC modifier.`,
                cost: E(10),
            },
            3: {
                desc: `Pre-Quantum Global Speed is raised based on Death Shards (before division).`,
                cost: E(50),
                effect() {
                    let x = overflow(player.qu.rip.amt.add(1).log10().div(25).add(1).softcap(500,0.25,0),1e9,0.5);
                    return x
                },
                effDesc(x=this.effect()) { return "^"+format(x)+(x.gte(500)?" <span class='soft'>(softcapped"+(x.gte(1e9)?"^2":"")+")</span>":"") },
            },
            4: {
                desc: `Start with 2 tiers of each Fermion in Big Rip.`,
                cost: E(250),
            },
            5: {
                desc: `Reduce Star Booster’s starting cost to ^0.1. Star Booster’s base is increased based on Death Shards.`,
                cost: E(2500),
                effect() {
                    let x = player.qu.rip.amt.add(1).log10().add(1).pow(3)
                    return x
                },
                effDesc(x=this.effect()) { return "x"+format(x) },
            },
            6: {
                desc: `Start with all Radiation features unlocked.`,
                cost: E(15000),
            },
            7: {
                desc: `Hybridized Uran-Astatine is twice effective, while Big Ripped.`,
                cost: E(100000),
            },
            8: {
                desc: `Passively gain 10% of Quantum Foams & Death Shards you would get from resetting each second.`,
                cost: E(750000),
            },
            9: {
                desc: `Unlock Break Dilation.`,
                cost: E(1e7),
            },
            10: {
                unl() { return player.md.break.active },
                desc: `Chromas are 10% stronger.`,
                cost: E(2.5e8),
            },
            11: {
                unl() { return player.md.break.active },
                desc: `Prestige Level no longer resets anything.`,
                cost: E(1e10),
            },
            12: {
                unl() { return player.md.break.active },
                desc: `Mass gain softcap^5 starts later based on Atom.`,
                cost: E(1e16),
                effect() {
                    let x = player.atom.points.add(1).log10().add(1).log10().add(1).root(3)
                    return x
                },
                effDesc(x=this.effect()) { return "^"+format(x)+" later" },
            },
            13: {
                unl() { return player.md.break.active },
                desc: `Death Shard gain is boosted based on Prestige Base.`,
                cost: E(1e17),
                effect() {
                    let x = (tmp.prestiges.base||E(1)).add(1).log10().tetrate(1.5).add(1)
                    return x
                },
                effDesc(x=this.effect()) { return "x"+format(x) },
            },
            14: {
                unl() { return player.md.break.active },
                desc: `Super Fermion Tier starts 10 later (after QC8 nerf).`,
                cost: E(1e22),
            },
            15: {
                unl() { return player.md.break.active },
                desc: `Blueprint Particles give slightly more Pre-Quantum Global Speed.`,
                cost: E(1e24),
            },
            16: {
                unl() { return hasUpgrade('inf',15) },
                desc: "Timeshard Effect is slightly stronger.",
                cost: E(1e229),
            },
            17: {
                unl() { return hasUpgrade('inf',15) },
                desc: "Timeshard Effect is slightly stronger again.",
                cost: E(1e232),
            },
            18: {
                unl() { return hasUpgrade('inf',15) },
                desc: "Timeshard Effect is slightly stronger again.",
                cost: E(1e266),
            },
            19: {
                unl() { return hasUpgrade('inf',15) },
                desc: "Timeshard Effect is slightly stronger again.",
                cost: E("1e337"),
            },
            20: {
                unl() { return hasUpgrade('inf',15) },
                desc: "使死寂碎片可以加成质量获取速度。",
                cost: E("1e375"),
                effect() {
                    let x = player.qu.rip.amt.add(1).log10().add(1).log10().add(1).pow(1.5);
					if(hasElement(313))x = expMult(player.qu.rip.amt.add(100),0.75);
					x = overflow(x,"ee50",0.5);
                    return x
                },
                effDesc(x=this.effect()) { return "^"+format(x)+softcapHTML(x,"ee50") },
            },
            21: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "移除死寂碎片获取的软上限.",
                cost: E('e1.8e13'),
            },
            22: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "改变挑战14的效果.",
                cost: E('e1.5e14'),
            },
            23: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "死寂碎片加成奇异物质获取.",
                cost: E('e4e14'),
				effect(){
					return player.qu.rip.amt.add(1e10).slog().pow(2.5);
				},
                effDesc(x=this.effect()) { return "x"+format(x) },
            },
            24: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "所有挑战折算弱化20%.",
                cost: E('e6e14'),
            },
            25: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "量子泡沫获取基数^(16/9)",
                cost: E('e2.4e15'),
            },
        },
        5: {
            title: "无限升级",
            res: "无限质量",
            getRes() { return player.inf.points },
            unl() { return player.inf.times.gte(1) },
            can(x) { return player.inf.points.gte(this[x].cost) && !player.mainUpg.inf.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.inf.points = player.inf.points.sub(this[x].cost)
                    player.mainUpg.inf.push(x)
                }
            },
            auto_unl() { return hasUpgrade('exotic',1)  },
            lens: 25,
            1: {
                desc: `使量子次数乘以(200+无限次数)。无限质量加成量子泡沫获取速度,自动购买大撕裂升级。该升级只花费1毫克无限质量。`,
                cost: E(1e-3),
                effect() {
                    let x = player.inf.points.add(1).pow(2);
                    return x
                },
                effDesc(x=this.effect()) { return "x"+format(x) },
            },
            2: {
                desc: `无限时保留中子树。无限质量加成熵获取速度和上限。`,
                cost: E(1),
                effect() {
                    let x = player.inf.points.mul(20).add(1);
					if(hasUpgrade('inf',16))x = x.pow(2);
					if(hasElement(211))x = x.pow(1.2);
					if(hasElement(321))x = x.pow(5);
                    return x
                },
                effDesc(x=this.effect()) { return "熵获取速度变为"+format(x.pow(0.1).mul(2))+"倍，熵上限变为"+format(x)+"倍" },
            },
            3: {
                desc: `无限时保留升级和量子碎片。无限时初始拥有200量子次数。无限质量加成死寂碎片获取速度。`,
                cost: E(1),
                effect() {
					if(hasChargedElement(211))return player.inf.points.add(1).log10().add(1).log10().add(1);
					if(hasElement(308))return player.inf.points.add(1).pow(2);
                    let x = overflow(player.inf.points.add(1).pow(2),1e10,hasUpgrade('inf',18)?0.6:0.5);
                    return x
                },
                effDesc(x=this.effect()) { return hasChargedElement(211)?("^"+format(x)):("x"+format(x)+(x.gte(1e10)&&!hasElement(308)?" <span class='soft'>(softcapped)</span>":"")) },
            },
            4: {
                desc: `无限次数加成无限质量获取。`,
                cost: E(2),
                effect() {
                    let x = player.inf.times.add(1);
					if(hasUpgrade('inf',23))x = expMult(x.add(100),1.5);
                    return x
                },
                effDesc(x=this.effect()) { return "x"+format(x) },
            },
            5: {
                desc: `无限时保留元素。无限质量加成转生质量获取速度。`,
                cost: E(5),
                effect() {
					if(hasElement(430))return player.inf.points.add(1).pow(0.5);
                    let x = overflow(player.inf.points.add(1).pow(0.5),"1e2500",hasUpgrade("inf",22)?0.7:0.5);
                    return x
                },
                effDesc(x=this.effect()) { return "x"+format(x)+((x.gte("1e2500") && !hasElement(430))?" <span class='soft'>(softcapped)</span>":"") },
            },
            6: {
                desc: `使质量获取速度的六重软上限和七重软上限弱化50%.`,
                cost: E(100),
            },
            7: {
                desc: `无限质量的基础公式变得更好.`,
                cost: E(200),
            },
            8: {
                desc: `质量对无限质量的获取公式变得更好.`,
                cost: E(1000),
            },
            9: {
                desc: `质量对无限质量的获取公式变得更好. 无限质量加成量子之前的全局速度.`,
                cost: E(10000),
                effect() {
                    let x = overflow(player.inf.points.add(1).pow(hasElement(341)?1:0.4),"1e2000",hasElement(341)?1:0.5);
                    return x
                },
                effDesc(x=this.effect()) { return "x"+format(x)+(x.gte("1e2000")&&!hasElement(341)?" <span class='soft'>(softcapped)</span>":"") },
            },
            10: {
                desc: `转生质量对无限质量的获取公式变得更好.使质量获取速度的八重软上限弱化50%.`,
                cost: E(5e6),
            },
            11: {
                desc: `每秒获取当前能获取的100%无限质量和1无限次数.`,
                cost: E(1e8),
            },
            12: {
                desc: `无限质量加成无限次数获取.`,
                cost: E(5e10),
                effect() {
                    let x = player.inf.points.add(1).log10();
                    return x
                },
                effDesc(x=this.effect()) { return "x"+format(x) },
            },
            13: {
                desc: `使质量获取速度的八重软上限和九重软上限弱化1%.`,
                cost: E(1e12),
            },
            14: {
                desc: `无限质量的基础公式变得更好.`,
                cost: E(6e12),
            },
            15: {
                desc: `解锁更多升级.永恒质量的基础公式变得更好.`,
                cost: E(3e13),
            },
            16: {
                unl() { return hasUpgrade('inf',15) },
                desc: `无限质量的基础公式变得更好, 无限升级2效果平方.`,
                cost: E(1e14),
            },
            17: {
                unl() { return hasUpgrade('inf',15) },
                desc: `时间碎片加成无限质量获取.永恒质量的基础公式变得更好.`,
                cost: E(1e16),
                effect() {
                    let x = player.et.shards.add(1).pow(0.05);
                    return x
                },
                effDesc(x=this.effect()) { return "x"+format(x) },
            },
            18: {
                unl() { return hasUpgrade('inf',15) },
                desc: `无限质量的基础公式变得更好,使无限升级3的软上限弱化.`,
                cost: E(1e27),
            },
            19: {
                unl() { return hasUpgrade('inf',15) },
                desc: `无限质量的基础公式变得更好,使死寂碎片获取的软上限弱化.`,
                cost: E(1e34),
            },
            20: {
                unl() { return hasUpgrade('inf',15) },
                desc: `死寂碎片对无限质量的获取公式变得更好,使死寂碎片获取的软上限弱化.`,
                cost: E(1e51),
            },
            21: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "降低超新星星系要求.",
                cost: E('e110000'),
            },
            22: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "弱化无限升级5的软上限.",
                cost: E('e120000'),
            },
            23: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "无限升级4变得更好.",
                cost: E('e123000'),
            },
            24: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "无限质量加成奇异物质获取.",
                cost: E('e126000'),
                effect() {
                    let x = player.inf.points.add(1).log10().add(1).log10();
					if(hasElement(471))x = player.inf.points.add(1).log10().pow(0.2);
					if(hasElement(447))x = x.pow(2);
                    return x
                },
                effDesc(x=this.effect()) { return "x"+format(x) },
            },
            25: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "无限升级24对星系夸克生效.",
                cost: E('e141000'),
            },
        },
        6: {
            title: "奇异升级",
            res: "奇异物质",
            getRes() { return player.exotic.points },
            unl() { return player.exotic.times.gte(1) },
            can(x) { return player.exotic.points.gte(this[x].cost) && !player.mainUpg.exotic.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.exotic.points = player.exotic.points.sub(this[x].cost)
                    player.mainUpg.exotic.push(x)
                }
            },
            auto_unl() { return false },
            lens: 25,
            1: {
                desc: `永恒次数x(200+奇异次数).移除质量和星辰溢出，自动购买无限升级.`,
                cost: E(1),
            },
            2: {
                desc: `超新星的超级折算延迟5次出现.`,
                cost: E(5),
            },
            3: {
                desc: `解锁质量升级4.`,
                cost: E(15),
            },
            4: {
                desc: `解锁转生质量升级4.`,
                cost: E(30),
            },
            5: {
                desc: `解锁次数强化.`,
                cost: E(150),
            },
            6: {
                unl() { return hasUpgrade('exotic',5) },
                desc: "转生降伏器赠送免费的降伏器.",
                cost: E(750),
                effect() {
                    let ret = player.prestigeMassUpg[4].div(40);
					if(hasUpgrade('exotic',7))ret = ret.mul(2);
					if(hasUpgrade('exotic',9))ret = ret.mul(2.5);
					if(hasUpgrade('exotic',14))ret = ret.mul(2);
					if(hasUpgrade('exotic',16))ret = ret.mul(2);
					if(hasUpgrade('exotic',23))ret = ret.mul(2);
                    return ret.floor()
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x,0)+"降伏器"
                },
            },
            7: {
                unl() { return hasUpgrade('exotic',5) },
                desc: "奇异升级6的效果翻倍.",
                cost: E(10000)
            },
            8: {
                unl() { return hasUpgrade('exotic',5) },
                desc: "黑洞辐射的获取变得更好.",
                cost: E(25000)
            },
            9: {
                unl() { return hasUpgrade('exotic',5) },
                desc: "奇异升级6的效果变为原来的2.5倍.",
                cost: E(50000)
            },
            10: {
                unl() { return hasUpgrade('exotic',5) },
                desc: "解锁奇异推进.",
                cost: E(200000)
            },
            11: {
                unl() { return hasUpgrade('exotic',10) },
                desc: "解锁一个新的奇异推进类型.",
                cost: E(800000)
            },
            12: {
                unl() { return hasUpgrade('exotic',10) },
                desc: "撕裂膨胀升级5对五重阶层的元折算生效.",
                cost: E(2000000)
            },
            13: {
                unl() { return hasUpgrade('exotic',10) },
                desc: "中子能量和电子能量的效果变为原来的5次方.",
                cost: E(4000000)
            },
            14: {
                unl() { return hasUpgrade('exotic',10) },
                desc: "奇异升级6的效果翻倍.",
                cost: E(10000000)
            },
            15: {
                unl() { return hasUpgrade('exotic',10) },
                desc: "解锁黑暗效果.",
                cost: E(1e8)
            },
            16: {
                unl() { return hasUpgrade('exotic',15) },
                desc: "奇异升级6的效果翻倍.",
                cost: E(1e9)
            },
            17: {
                unl() { return hasUpgrade('exotic',15) },
                desc: "奇异物质获取x(1+奇异次数).",
                cost: E(1e10)
            },
            18: {
                unl() { return hasUpgrade('exotic',15) },
                desc: "解锁一个新的奇异推进类型.",
                cost: E(3e11)
            },
            19: {
                unl() { return hasUpgrade('exotic',15) },
                desc: "在下层重置前保留所有升级,解锁新的升级.",
                cost: E(3e12)
            },
            20: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "解锁一个新的奇异推进类型.",
                cost: E(1e14)
            },
            21: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "奇异物质延迟五重阶层的元折算.",
                cost: E(2e15),
				effect(){
					return overflow(player.exotic.points.add(1),1e10,hasAscension(1,8)?2.5:2);
				},
                effDesc(x=this.effect()) { return "x"+format(x)+" later"; },
            },
            22: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "奇异物质获取公式变得更好.",
                cost: E(2e16),
            },
            23: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "奇异升级6的效果翻倍.",
                cost: E(2e20),
            },
            24: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "解锁一个新的奇异推进类型.",
                cost: E(1e25),
            },
            25: {
                unl() { return hasUpgrade('exotic',19) },
                desc: "解锁最后一个奇异推进类型,和奇异推进的导入和导出.",
                cost: E(1e30),
            },
        },
        7: {
            title: "星尘升级",
            res: "星尘",
            getRes() { return player.stardust },
            unl() { return player.sun.shard.gte(1) },
            can(x) { return player.stardust.gte(this[x].cost) && !player.mainUpg.st.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.stardust = player.stardust.sub(this[x].cost)
                    player.mainUpg.st.push(x)
                }
            },
            auto_unl() { return false },
            lens: 5,
            1: {
                unl() { return player.sun.shard.gte(1)},
                desc: `轴空间获取基于星尘而增加.`,
                effect(){
					return player.stardust.add(10).log10().div(10000).add(1);
				},
                effDesc(x=this.effect()) { return "x"+format(x) },
                cost: E(1e65),
            },
            2: {
                unl() { return player.sun.shard.gte(1)},
                desc: `暗射线获取基于星尘而增加.`,
                effect(){
					return player.stardust.add(10).log10().pow(0.5);
				},
                effDesc(x=this.effect()) { return "x"+format(x) },
                cost: E(1e100),
            },
            3: {
                unl() { return player.sun.shard.gte(1)},
                desc: `转生星辰获取基于星尘而增加.`,
                effect(){
					return player.stardust.add(10).log10().pow(0.2);
				},
                effDesc(x=this.effect()) { return "x"+format(x) },
                cost: E(1e154),
            },
            4: {
                unl() { return player.sun.shard.gte(1)},
                desc: `星系挑战的效果基于星尘而减少.`,
                effect(){
					return player.stardust.add(10).log10().div(100000).min(0.1);
				},
                effDesc(x=this.effect()) { return "-"+format(x) },
                cost: E(1e165),
            }, 
            5: {
                unl() { return player.sun.shard.gte(1)},
                desc: `恭喜通关.`,
             
                cost: E(7e177),
            }, 
        },
    },
}


/*
1: {
    desc: "Placeholder.",
    cost: E(1),
    effect() {
        let ret = E(1)
        return ret
    },
    effDesc(x=this.effect()) {
        return format(x)+"x"
    },
},
*/

function hasUpgrade(id,x) { return player.mainUpg[id].includes(x) }
function upgEffect(id,x,def=E(1)) { return tmp.upgs.main[id][x]?tmp.upgs.main[id][x].effect:def }
