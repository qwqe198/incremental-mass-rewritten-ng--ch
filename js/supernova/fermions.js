const FERMIONS = {
    onActive(id) { 
		if(id.startsWith("0") && player.gc.trapu && player.gc.active)return true
		if(id.startsWith("1") && player.gc.trapu && player.gc.active)return true
		if(id.startsWith("0") && player.supernova.fermions.choosed.startsWith("2"))return true
		if(id.startsWith("1") && player.supernova.fermions.choosed.startsWith("3"))return true
		if(id.startsWith("2") && player.supernova.fermions.choosed == "25")return true
		if(id.startsWith("3") && player.supernova.fermions.choosed == "35")return true
		return player.supernova.fermions.choosed == id 
	},
    gain(i) {
        if (!player.supernova.fermions.unl) return E(0)
        let x = E(1)
        let base = E(1.25).add(tmp.prim.eff[5][0])
        if (tmp.radiation.unl) x = x.mul(tmp.radiation.hz_effect)
        for (let j = 0; j < FERMIONS.types[i].length; j++) x = x.mul(base.pow(player.supernova.fermions.tiers[i][j]))
        if (hasTree("fn1") && tmp.supernova) x = x.mul(tmp.supernova.tree_eff.fn1)
		x = x.pow(SUPERNOVA_GALAXY.galPow4_eff())
	if(player.gc.active || player.chal.active >= 21&&player.chal.active <= 24 || player.exotic.dark_run.active)x = GCeffect(x)
        return x
    },
    backNormal() {
        if (player.supernova.fermions.choosed != "") {
			if(player.supernova.fermions.choosed.startsWith("2") || player.supernova.fermions.choosed.startsWith("3")){
				SUPERNOVA_GALAXY.reset(true)
				player.supernova.fermions.tiers[0]=[E(0),E(0),E(0),E(0),E(0),E(0)];
				player.supernova.fermions.tiers[1]=[E(0),E(0),E(0),E(0),E(0),E(0)];
			}
            player.supernova.fermions.choosed = ""
            SUPERNOVA.reset(false,false,false,true)
        }
    },
    choose(i,x) {
        if (player.confirms.sn) if (!confirm("您确定要切换费米子类型吗？")) return
        let id = i+""+x
        if (player.supernova.fermions.choosed != id) {
			FERMIONS.backNormal()
            player.supernova.fermions.choosed = id
			if(id.startsWith("2") || id.startsWith("3")){
				SUPERNOVA_GALAXY.reset(true)
				player.supernova.fermions.tiers[0]=[E(0),E(0),E(0),E(0),E(0),E(0)];
				player.supernova.fermions.tiers[1]=[E(0),E(0),E(0),E(0),E(0),E(0)];
				player.supernova.fermions.choosed = id
			}else{
				SUPERNOVA.reset(false,false,false,true)
			}
        }
    },
    bonus(i,j) {
		if (i >= 2 || player.supernova.fermions.choosed.startsWith("2") || player.supernova.fermions.choosed.startsWith("3"))return E(0)
        let x = E(0)
        if (hasTree("prim3")) x = x.add(tmp.prim.eff[5][1].min(j>(hasTree('fn15')?5:hasTree('fn14')?4:2)?4:EINF))
        return x
    },
    fp() {
        let x = E(1)
        if (hasTree("qu1")) x = x.mul(1.2)
        if (QCs.active()) x = x.div(tmp.qu.qc_eff[2])
        return x
    },
    getTierScaling(t, bulk=false) {
        let x = t
        let fp = tmp.fermions.fp
        if (bulk) {
            x = t.scaleEvery('fTier',true).mul(fp).add(1).floor()
        } else {
            x = t.div(fp).scaleEvery('fTier')
        }
        return x
    },
    getGTierScaling(t, bulk=false) {
        let x = t
        let fp = E(1.2)
		if(!hasElement(273)){
			if(x.gt(10))fp = E(1)
			if(x.gt(9) && bulk){
				if(x.lt(11))return E(11); else fp = E(1)
			}
		}
        if (bulk) {
            x = t.scaleEvery('gfTier',true).mul(fp).add(1).floor()
        } else {
            x = t.div(fp).scaleEvery('gfTier')
        }
        return x
    },
    getUnlLength(x) {
        let u = 2
        if (hasTree("fn2")) u++
        if (hasTree("fn6")) u++
        if (hasTree("fn7")) u++
        if (hasTree("fn8")) u++
        return u
    },
    getGUnlLength(x) {
        let u = 1
        if (hasElement(245)) u++
        if (hasElement(261)) u++
        if (hasElement(275)) u++
        if (hasElement(284)) u++
        if (hasElement(294)) u++
        return u
    },
    names: ['quark', 'lepton', 'gquark', 'glepton'],
    sub_names: [["上夸克","下夸克","粲夸克","奇夸克","顶夸克","底夸克"],["电子","缪子","陶子","中微子","缪中微子","陶中微子"]],
    types: [
        [
            {
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e50').pow(t.pow(1.25)).mul("e750")
                },
                calcTier() {
                    let res = player.atom.atomic
                    if (res.lt('e750')) return E(0)
                    let x = res.div('e750').max(1).log('e50').max(0).root(1.25)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = i.max(1).log(1.1).mul(t.pow(0.75))
                    return x
                },
                desc(x) {
                    return `Adds ${format(x,0)} free Cosmic Rays`
                },
                inc: "Atomic Powers",
                cons: "^0.6 to the exponent of Atomic Powers gain",
            },{
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e50').pow(t.pow(1.25)).mul("e380")
                },
                calcTier() {
                    let res = player.md.particles
                    if (res.lt('e380')) return E(0)
                    let x = res.div('e380').max(1).log('e50').max(0).root(1.25)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = E(1e5).pow(i.add(1).log10().mul(t)).softcap("ee3",0.9,2)
					if(x.gte("ee1.2e16"))x = Decimal.pow(10,x.log10().pow(1/1.2).log10().pow(1/1.6).pow(1.2e15));
					if(x.gte("ee2e16"))x = Decimal.pow(10,x.log10().pow(1/2).log10().pow(1/1.6).pow(2e15));
                    return x
                },
                desc(x) {
                    return `x${format(x)} to Relativistic Particles gain`+(x.gte('ee3')?"<span class='soft'>(softcapped)</span>":"")
                },
                inc: "Relativistic Particle",
                cons: "The exponent of the RP formula is divided by 10",
            },{
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('ee3').pow(t.pow(1.5)).mul(uni("e32000"))
                },
                calcTier() {
                    let res = player.mass
                    if (res.lt(uni("e32000"))) return E(0)
                    let x = res.div(uni("e32000")).max(1).log('ee3').max(0).root(1.5)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = i.add(1).log10().pow(1.75).mul(t.pow(0.8)).div(100).add(1).softcap(5,0.75,0).softcap(449,0.25,0)
                    return x
                },
                desc(x) {
                    return `Z<sup>0</sup> Boson's first effect is ${format(x.sub(1).mul(100))}% stronger`+(x.gte(449)?"<span class='soft'>(softcapped^2)</span>":x.gte(5)?"<span class='soft'>(softcapped)</span>":"")
                },
                inc: "Mass",
                cons: "You are trapped in Mass Dilation, but they are twice effective",
                isMass: true,
            },{
                maxTier() {
                    let x = 15
                    if (hasTree("fn9")) x += 2
                    if (hasTree("fn11")) x += 5
                    if (hasTree("fn14")) x += 69
					if (hasElement(126)) x = 1/0
                    return x
                },
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e1000').pow(t.pow(1.5)).mul("e27500")
                },
                calcTier() {
                    let res = player.rp.points
                    if (res.lt('e27500')) return E(0)
                    let x = res.div('e27500').max(1).log('e1000').max(0).root(1.5)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    
                    if (!hasChargedElement(224)) return x=i.max(1).log10().add(1).mul(t).pow(0.9).div(100).add(1).softcap(1.5,0.5,0).softcap(5,1/3,0).min(6.5)
                    else if (hasChargedElement(224))return x = i.max(1).log10().add(1).mul(t).pow(0.9).div(100).add(1).softcap(1.5,0.5,0).softcap(5,1/3,0).add(1).log10().add(1).log10()
                },
                desc(x) {
                    if (!hasChargedElement(224))   return `4th Photon & Gluon upgrades are ${format(x)}x stronger`+(x.gte(6.5)?"<span class='soft'>(hardcapped)</span>":x.gte(5)?"<span class='soft'>(softcapped^2)</span>":x.gte(1.5)?"<span class='soft'>(softcapped)</span>":"")
                        else if (hasChargedElement(224)) return `4th Photon & Gluon upgrades are ${format(x)}x stronger`+(x.gte(5)?"<span class='soft'>(softcapped^2)</span>":x.gte(1.5)?"<span class='soft'>(softcapped)</span>":"")
                },
                inc: "Rage Power",
                cons: "You are trapped in Mass Dilation and Challenges 3-5",
            },{
                maxTier() {
                    let x = 30
                    if (hasTree("fn11")) x += 5
                    if (hasTree("fn14")) x += 69
					if (hasElement(126)) x = 1/0
                    return x
                },
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('ee4').pow(t.pow(1.5)).mul(uni('e5e5'))
                },
                calcTier() {
                    let res = player.md.mass
                    if (res.lt(uni('e5e5'))) return E(0)
                    let x = res.div(uni('e5e5')).max(1).log('ee4').max(0).root(1.5)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = i.add(1).log10().div(500).mul(t.root(2)).add(1)
                    if (!hasChargedElement(224))  return x.softcap(1.15,0.5,0).softcap(1.8,1/3,0).min(2)
                    else if  (hasChargedElement(224))  return x.softcap(1.15,0.5,0).softcap(1.8,1/3,0).add(10).log10()
                },
                desc(x) {   
                    if (!hasChargedElement(224))  return `Radiation Boosters are ${format(x)}x cheaper`+(x.gte(2)?"<span class='soft'>(hardcapped)</span>":x.gte(1.8)?"<span class='soft'>(softcapped^2)</span>":x.gte(1.15)?"<span class='soft'>(softcapped)</span>":"")
                    else if (hasChargedElement(224))return  `Radiation Boosters are ${format(x)}x cheaper`+(x.gte(1.8)?"<span class='soft'>(softcapped^2)</span>":x.gte(1.15)?"<span class='soft'>(softcapped)</span>":"")      
                },
                inc: "Dilated Mass",
                cons: "U-Quarks, Photons & Gluons do nothing",
                isMass: true,
            },{
                maxTier() {
                    let x = 10
                    if (hasTree("fn11")) x += 5
					if (hasElement(126)) x = 1/0
                    return x
                },
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e5e8').pow(t.pow(2)).mul('e5e9')
                },
                calcTier() {
                    let res = tmp.tickspeedEffect && tmp.pass?tmp.tickspeedEffect.eff_bottom:E(1)
                    if (res.lt('e5e9')) return E(0)
                    let x = res.div('e5e9').max(1).log('e5e8').max(0).root(2)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = i.add(1).log10().pow(0.5).div(150).add(1).pow(t)
					if(hasTree('fn18') && x.gte(500)){
						x = x.log(500).mul(500);
						if(hasElement(294))return x.pow(player.supernova.fermions.tiers[2][5].add(1).pow(1.5));
						return x;
					}
					if(hasElement(294))return x.min(500).pow(player.supernova.fermions.tiers[2][5].add(1).pow(1.5));
                    return x.min(500)
                },
                desc(x) {
                    return `Meta-Tickspeed starts ${format(x)}x later`+((x.gte(500)  && !hasTree('fn18'))?"<span class='soft'>(hardcapped)</span>":"")+((x.gte(500)  && hasTree('fn18'))?"<span class='soft'>(softcapped)</span>":"")
                },
                inc: "Tickspeed Effect",
                cons: "Challenges are disabled",
            },

        ],[
            {
                maxTier() {
                    if (hasTree("fn10")) return 1/0
                    let x = 15
                    if (hasTree("fn5")) x += 35
					if (hasElement(126)) x = 1/0
                    return x
                },
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e5').pow(t.pow(1.5)).mul("e150")
                },
                calcTier() {
                    let res = player.atom.quarks
                    if (res.lt('e150')) return E(0)
                    let x = res.div('e150').max(1).log('e5').max(0).root(1.5)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = i.add(1).log10().mul(t).div(100).add(1).softcap(1.5,hasTree("fn5")?0.75:0.25,0)
                    if (hasTree("fn10")) x = x.pow(4.5)
                    return x
                },
                desc(x) {
                    return `Collapse Stars gain softcap starts ^${format(x)} later`+(x.gte(1.5)?"<span class='soft'>(softcapped)</span>":"")
                },
                inc: "Quark",
                cons: "^0.625 to the exponent of Atoms gain",
            },{
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e4e4').pow(t.pow(1.25)).mul("e5e5")
                },
                calcTier() {
                    let res = player.bh.mass
                    if (res.lt('e5e5')) return E(0)
                    let x = res.div('e5e5').max(1).log('e4e4').max(0).root(1.25)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = t.pow(1.5).add(1).pow(i.add(1).log10().softcap(10,0.75,0)).softcap(1e6,0.75,0)
                    return x
                },
                desc(x) {
                    return `x${format(x)} to Higgs Bosons & Gravitons gain`+(x.gte(1e6)?"<span class='soft'>(softcapped)</span>":"")
                },
                isMass: true,
                inc: "Mass of Black Hole",
                cons: "The power from the mass of the BH formula is always -1",
            },{
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e5e3').pow(t.pow(1.5)).mul("e4e5")
                },
                calcTier() {
                    let res = player.bh.dm
                    if (res.lt('e4e5')) return E(0)
                    let x = res.div('e4e5').max(1).log('e5e3').max(0).root(1.5)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = t.pow(0.8).mul(0.025).add(1).pow(i.add(1).log10()).min("ee10")
                    if (!hasChargedElement(224)) return x
                    else if  (hasChargedElement(224))  return x = t.pow(0.8).mul(0.025).add(1).pow(i.add(1).log10())
                },
                desc(x) {
                    if (!hasChargedElement(224))  return `使时间速度便宜${format(x)}倍(在元折算之前生效)`+(x.gte("ee10")?" <span class='soft'>(hardcapped)</span>":"")
                    else if  (hasChargedElement(224))  return  `使时间速度便宜${format(x)}倍(在元折算之前生效)`      
                },
                inc: "Dark Matter",
                cons: "You are trapped in Challenges 8-9",
            },{
                maxTier() {
                    if (hasTree("fn16")) return 1/0
                    let x = 15
                    if (hasTree("fn9")) x += 2
                    if (hasTree("fn11")) x += 5
                    if (hasTree("fn14")) x += 69
					if (hasElement(126)) x = 1/0
                    return x
                },
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e400').pow(t.pow(1.5)).mul("e1500")
                },
                calcTier() {
                    let res = player.stars.points
                    if (res.lt('e1500')) return E(0)
                    let x = res.div('e1500').max(1).log('e400').max(0).root(1.5)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = overflow(i.max(1).log10().add(1).mul(t).div(200).add(1).softcap(1.5,0.5,0),1e26,0.2)
					if(hasElement(340))x = i.max(1).log10().add(1).mul(t).div(200).add(1);
                    return x
                },
                desc(x) {
                    return `Tier requirement is ${format(x)}x cheaper`+(x.gte(1e26)&&!hasElement(340)?"<span class='soft'>(softcapped^2)</span>":x.gte(1.5)&&!hasElement(340)?"<span class='soft'>(softcapped)</span>":"")
                },
                inc: "Collapsed Star",
                cons: "Star generators are decreased to ^0.5",
            },{
                maxTier() {
                    if (hasTree("fn17")) return 1/0
                    let x = 25
                    if (hasTree("fn11")) x += 5
                    if (hasTree("fn14")) x += 69
					if (hasElement(126)) x = 1/0
                    return x
                },
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e1.5e7').pow(t.pow(2)).mul("e3e8")
                },
                calcTier() {
                    let res = player.atom.points
                    if (res.lt('e3e8')) return E(0)
                    let x = res.div('e3e8').max(1).log('e1.5e7').max(0).root(2)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = E(0.95).pow(i.add(1).log10().mul(t).root(4).softcap(27,0.5,0)).max(hasTree('fn13')?0:2/3).toNumber()
					if(player.qu.rip.active && x<=0.36){
					if(player.ranks.hex.gte(73))x = (0.36**0.48)*(x**0.52);else x = (0.36*x)**0.5;
					}
                    return x
                },
                desc(x) {
                    return `Pre-Meta-Supernova Scalings are ${format(100-x*100)}% weaker`+((x<=2/3 && !hasTree('fn13'))?"<span class='soft'>(hardcapped)</span>":"")+((x<=0.36 && player.qu.rip.active)?"<span class='soft'>(softcapped)</span>":"")
                },
                inc: "Atom",
                cons: "U-Leptons, Z<sup>0</sup> bosons do nothing",
            },{
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('10').pow(t.pow(1.5)).mul('e70')
                },
                calcTier() {
                    let res = tmp.tickspeedEffect && tmp.pass?tmp.tickspeedEffect.step:E(1)
                    if (res.lt('e70')) return E(0)
                    let x = res.div('e70').max(1).log('10').max(0).root(1.5)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = i.add(1).log10().pow(0.75).div(100).add(1).pow(t.pow(0.75));
					if(!hasUpgrade('bh',24))x = x.min("ee10")
                    return x
                },
                desc(x) {
                    return `Pre-Meta BH Condensers & Cosmic Rays are ${format(x)}x cheaper`
                },
                inc: "Tickspeed Power",
                cons: "Radiation Boosts are disabled",
            },

            /*
            {
                nextTierAt(x) {
                    return EINF
                },
                calcTier() {
                    let res = E(0)
                    let x = E(0)
                    return x
                },
                eff(i, t) {
                    let x = E(1)
                    return x
                },
                desc(x) {
                    return `Placeholder`
                },
                inc: "Placeholder",
                cons: "Placeholder",
            },
            */
        ],[
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.03).pow(t.pow(hasElement(375)?1.2:1.5)).mul(30).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[0][0]
                    if (res.lt(30)) return E(0)
                    let x = res.div(30).max(1).log(1.03).max(0).root(hasElement(375)?1.2:1.5)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = Decimal.pow(1e10,t.pow(3))
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(100)
                    return x
                },
                desc(x) {
                    return `原子能量获取^${format(x)}`
                },
                desc2(x) {
                    return `原子能量获取指数^${format(x)}`
                },
                inc: "[Up] Tiers",
                cons: "强制进行所有U-夸克和挑战13,原子能量获取log10.",
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.03).pow(t.pow(hasElement(375)?1.2:2)).mul(55).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[0][1]
                    if (res.lt(55)) return E(0)
                    let x = res.div(55).max(1).log(1.03).max(0).root(hasElement(375)?1.2:2)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = Decimal.pow(1e10,t.pow(2))
					if(hasElement(503))x = x.pow(tmp.fermions.effs2[2][1]||E(1))
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).sub(99).pow(2)
                    return x
                },
                desc(x) {
                    return `膨胀质量获取^${format(x)}`
                },
                desc2(x) {
                    return `以上效果^${format(x)}`
                },
                inc: "[Down] Tiers",
                cons: "强制进行所有U-夸克和挑战13.相对论粒子获取log10 .",
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.03).pow(t.pow(hasElement(375)?1.2:1.5)).mul(55).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[0][2]
                    if (res.lt(55)) return E(0)
                    let x = res.div(55).max(1).log(1.03).max(0).root(hasElement(375)?1.2:1.5)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = Decimal.pow(1e100,t.pow(3))
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(1000).add(0.9)
                    return x
                },
                desc(x) {
                    return `质量获取^${format(x)}`
                },
                desc2(x) {
                    return `质量获取指数^${format(x)}`
                },
                inc: "[Charm] Tiers",
                cons: "强制进行所有U-夸克和挑战13,20.",
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.03).pow(t.pow(hasElement(375)?1.2:1.5)).mul(75).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[0][3]
                    if (res.lt(75)) return E(0)
                    let x = res.div(75).max(1).log(1.03).max(0).root(hasElement(375)?1.2:1.5)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = Decimal.pow(1e200,t.pow(3))
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(1000).add(0.9)
                    return x
                },
                desc(x) {
                    return `狂怒能量获取^${format(x)}`
                },
                desc2(x) {
                    return `狂怒能量获取指数^${format(x)}`
                },
                inc: "[Strange] Tiers",
                cons: "强制进行所有U-夸克和挑战13. 狂怒能量获取log10.",
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.03).pow(t.pow(hasElement(375)?1.2:2)).mul(15).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[0][4]
                    if (res.lt(15)) return E(0)
                    let x = res.div(15).max(1).log(1.03).max(0).root(hasElement(375)?1.2:2)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = Decimal.pow(100,t)
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(100)
                    return x
                },
                desc(x) {
                    return `星系辐射波获取x${format(x)}`
                },
                desc2(x) {
                    return `星系辐射波获取^${format(x)}`
                },
                inc: "[Top] Tiers",
                cons: "强制进行所有U-夸克和挑战13. 膨胀质量获取log10后^10.",    
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.1).pow(t.pow(hasElement(375)?1.2:2)).mul(100).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[0][5]
                    if (res.lt(100)) return E(0)
                    let x = res.div(100).max(1).log(1.1).max(0).root(hasElement(375)?1.2:2)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = t.add(1).pow(1.5)
					if(hasElement(503))x = x.pow(tmp.fermions.effs2[2][5]||E(1))
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(100)
                    return x
                },
                desc(x) {
                    return `[底夸克]的效果^`+format(x)+`.`
                },
                desc2(x) {
                    return `以上效果^${format(x)}`
                },
                inc: "[Bottom] Tiers",
                cons: "强制进行前5个星系U-夸克，以及时间速度倍率log10.",
            },
        ],[
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.03).pow(t.pow(hasElement(375)?1.2:1.5)).mul(50).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[1][0]
                    if (res.lt(50)) return E(0)
                    let x = res.div(50).max(1).log(1.03).max(0).root(hasElement(375)?1.2:1.5)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = Decimal.pow(1e10,t.pow(3))
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(100)
                    return x
                },
                desc(x) {
                    return `坍缩星辰获取^${format(x)}`
                },
                desc2(x) {
                    return `坍缩星辰获取指数^${format(x)}`
                },
                inc: "[Electron] Tiers",
                cons: "强制进行所有U-轻子和挑战13,16. 夸克获取log10.",
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.03).pow(t.pow(hasElement(375)?1.2:1.5)).mul(30).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[1][1]
                    if (res.lt(30)) return E(0)
                    let x = res.div(30).max(1).log(1.03).max(0).root(hasElement(375)?1.2:1.5)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = Decimal.pow(1e3,t)
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(100)
                    return x
                },
                desc(x) {
                    return `星系玻色子获取x${format(x)}`
                },
                desc2(x) {
                    return `星系玻色子获取^${format(x)}`
                },
                inc: "[Muon] Tiers",
                cons: "强制进行所有U-轻子和挑战13,16. 黑洞质量获取log10后^100.",
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.03).pow(t.pow(hasElement(375)?1.2:1.5)).mul(30).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[1][2]
                    if (res.lt(30)) return E(0)
                    let x = res.div(30).max(1).log(1.03).max(0).root(hasElement(375)?1.2:1.5)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = t.add(1)
					if(hasElement(320))x=x.pow(1.75)
					if(hasElement(503))x = x.pow(tmp.fermions.effs2[3][2]||E(1))
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(100)
                    return x
                },
                desc(x) {
                    return `加速器效果的一重和二重软上限延迟至${format(x)}倍出现`
                },
                desc2(x) {
                    return `以上效果^${format(x)}`
                },
                inc: "[Tau] Tiers",
                cons: "强制进行所有U-轻子和挑战13,16. 暗物质获取log10后^5.",
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.03).pow(t.pow(hasElement(375)?1.2:1.5)).mul(45).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[1][3]
                    if (res.lt(45)) return E(0)
                    let x = res.div(45).max(1).log(1.03).max(0).root(hasElement(375)?1.2:1.5)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = t.add(1)
					if(hasAscension(0,14))x = Decimal.pow(10, t)
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(100)
                    return x
                },
                desc(x) {
                    return `五重阶层的元折算延迟${format(x)}倍出现`
                },
                desc2(x) {
                    return `七重阶层的元折算延迟${format(x)}倍出现`
                },
                inc: "[Neutrino] Tiers",
                cons: "强制进行所有U-轻子和挑战13. 坍缩星辰获取log10.",
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.1).pow(t.pow(hasElement(375)?1.2:2)).mul(5).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[1][4]
                    if (res.lt(5)) return E(0)
                    let x = res.div(5).max(1).log(1.1).max(0).root(hasElement(375)?1.2:2)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = Decimal.pow(hasAscension(1,12)?0.99:0.997,t.pow(hasAscension(1,12)?0.75:0.5));
                    return x
                },
                eff2(i, t) {
                    let x = t.max(100).div(100).pow(-1)
                    return x
                },
                desc(x) {
                    return `使超新星的元折算弱化${format(E(100).sub(x.mul(100)))}%`
                },
                desc2(x) {
                    return `使超新星星系的超级折算弱化${format(E(100).sub(x.mul(100)))}%`
                },
                inc: "[Neut-Muon] Tiers",
                cons: "强制进行所有U-轻子和挑战13. 原子获取log10后^3000.",
            },
            {
                maxTier() {
					return 1/0;
                },
                nextTierAt(x) {
                    let t = FERMIONS.getGTierScaling(x)
                    return E(1.1).pow(t.pow(hasElement(375)?1.2:1.5)).mul(100).ceil()
                },
                calcTier() {
                    let res = player.supernova.fermions.tiers[1][5]
                    if (res.lt(100)) return E(0)
                    let x = res.div(100).max(1).log(1.1).max(0).root(hasElement(375)?1.2:1.5)
                    return FERMIONS.getGTierScaling(x, true)
                },
                eff(i, t) {
                    let x = overflow(t,11,2).add(1).pow(2)
                    return x
                },
                eff2(i, t) {
                    let x = overflow(t.max(100).sub(100),10,2).add(1).pow(2)
                    return x
                },
                desc(x) {
                    return `星系夸克获取x`+format(x);
                },
                desc2(x) {
                    return `星系夸克获取x`+format(x);
                },
                inc: "[Neut-Tau] Tiers",
                cons: "强制进行前5个星系U-轻子，以及时间速度倍率log10.",
            },
        ],
    ],
}

function setupFermionsHTML() {
    for (i = 0; i < 2; i++) {
        let new_table = new Element("fermions_"+FERMIONS.names[i]+"_table")
        let table = ""
        for (let x = 0; x < FERMIONS.types[i].length; x++) {
            let f = FERMIONS.types[i][x]
            let id = `f${FERMIONS.names[i]}${x}`
            table += `
            <button id="${id}_div" class="fermion_btn ${FERMIONS.names[i]}" onclick="FERMIONS.choose(${i},${x})">
                <b>[${FERMIONS.sub_names[i][x]}]</b><br>[<span id="${id}_tier_scale"></span>Tier <span id="${id}_tier">0</span>]<br>
                <span id="${id}_cur">Currently: X</span><br>
                Next Tier at: <span id="${id}_nextTier">X</span><br>
                (Increased by ${f.inc})<br><br>
                Effect: <span id="${id}_desc">X</span><br>
                On Active: ${f.cons}
            </button>
            `
        }
	    new_table.setHTML(table)
    }
    for (i = 2; i < 4; i++) {
        let new_table = new Element("fermions_"+FERMIONS.names[i]+"_table")
        let table = ""
        for (let x = 0; x < FERMIONS.types[i].length; x++) {
            let f = FERMIONS.types[i][x]
            let id = `f${FERMIONS.names[i]}${x}`
            table += `
            <button id="${id}_div" class="fermion_btn ${FERMIONS.names[i].slice(1)}" onclick="FERMIONS.choose(${i},${x})">
                <b>[G-${FERMIONS.sub_names[i-2][x]}]</b><br>[<span id="${id}_tier_scale"></span>Tier <span id="${id}_tier">0</span>]<br>
                <span id="${id}_cur">Currently: X</span><br>
                Next Tier at: <span id="${id}_nextTier">X</span><br>
                (单位为[${FERMIONS.sub_names[i-2][x]}]阶层)<br><br>
                Effect: <span id="${id}_desc">X</span><br>
                激活时: ${f.cons}
            </button>
            `
        }
	    new_table.setHTML(table)
    }
}

function updateFermionsTemp() {
    let tf = tmp.fermions

    tf.ch = player.supernova.fermions.choosed == "" ? [-1,-1] : [Number(player.supernova.fermions.choosed[0]),Number(player.supernova.fermions.choosed[1])]
    tf.fp = FERMIONS.fp()
    for (i = 0; i < 2; i++) {
        tf.gains[i] = FERMIONS.gain(i)

        for (let x = 0; x < FERMIONS.types[i].length; x++) {
            let f = FERMIONS.types[i][x]

            tf.bonuses[i][x] = FERMIONS.bonus(i,x)
            tf.maxTier[i][x] = typeof f.maxTier == "function" ? f.maxTier() : f.maxTier||1/0
            tf.tiers[i][x] = f.calcTier().min(tf.maxTier[i][x])
            tf.effs[i][x] = f.eff(player.supernova.fermions.points[i], (FERMIONS.onActive("04") && i == 0) || (FERMIONS.onActive("14") && i == 1) ? E(0) : player.supernova.fermions.tiers[i][x].add(tmp.fermions.bonuses[i][x]).mul(i==1?tmp.radiation.bs.eff[16]:1).mul(i==0?tmp.radiation.bs.eff[19]:1))
        }
    }
    for (i = 2; i < 4; i++) {

        for (let x = 0; x < FERMIONS.types[i].length; x++) {
            let f = FERMIONS.types[i][x]

            tf.bonuses[i][x] = FERMIONS.bonus(i,x)
            tf.maxTier[i][x] = typeof f.maxTier == "function" ? f.maxTier() : f.maxTier||1/0
            tf.tiers[i][x] = f.calcTier().min(tf.maxTier[i][x])
            tf.effs[i][x] = f.eff(player.supernova.fermions.points[i],player.supernova.fermions.tiers[i][x])
            tf.effs2[i][x] = f.eff2(player.supernova.fermions.points[i],player.supernova.fermions.tiers[i][x])
        }
    }
}

function updateFermionsHTML() {
    for (i = 0; i < 2; i++) {
        tmp.el["f"+FERMIONS.names[i]+"Amt"].setTxt(format(player.supernova.fermions.points[i],2)+formatGain(player.supernova.fermions.points[i],tmp.fermions.gains[i].mul(tmp.preQUGlobalSpeed)))
        let unls = FERMIONS.getUnlLength(i)
        for (let x = 0; x < FERMIONS.types[i].length; x++) {
            let unl = x < unls
            let f = FERMIONS.types[i][x]
            let id = `f${FERMIONS.names[i]}${x}`
            let fm = f.isMass?formatMass:format

            tmp.el[id+"_div"].setDisplay(unl)

            if (unl) {
                let active = (tmp.fermions.ch[0] == i && tmp.fermions.ch[1] == x) || tmp.fermions.ch[0] == i+2 || (player.gc.trapu && player.gc.active)
                let active2 = (tmp.fermions.ch[0] == i && tmp.fermions.ch[1] == x) || (tmp.fermions.ch[0] == i+2 && tmp.fermions.ch[1] == x)
                tmp.el[id+"_div"].setClasses({fermion_btn: true, [FERMIONS.names[i]]: true, choosed: active})
                tmp.el[id+"_nextTier"].setTxt(fm(f.nextTierAt(player.supernova.fermions.tiers[i][x])))
                tmp.el[id+"_tier_scale"].setTxt(getScalingName('fTier', i, x))
                tmp.el[id+"_tier"].setTxt(format(player.supernova.fermions.tiers[i][x],0)+(tmp.fermions.maxTier[i][x] < Infinity?"，上限为"+format(tmp.fermions.maxTier[i][x],0):"") + (tmp.fermions.bonuses[i][x].gt(0)?"，额外阶层为"+tmp.fermions.bonuses[i][x].format():""))
                tmp.el[id+"_desc"].setHTML(f.desc(tmp.fermions.effs[i][x]))
				if(hasUpgrade('bh',24)&&i==1&&x==5)tmp.el[id+"_desc"].setHTML(f.desc(tmp.fermions.effs[i][x].add(10).log10()))

                tmp.el[id+"_cur"].setDisplay(active2)
                if (active2) {
                    tmp.el[id+"_cur"].setTxt(`当前为：${fm(
                        [
                            [player.atom.atomic, player.md.particles, player.mass, player.rp.points, player.md.mass, tmp.tickspeedEffect.eff],
                            [player.atom.quarks, player.bh.mass, player.bh.dm, player.stars.points, player.atom.points, tmp.tickspeedEffect.step]
                        ][i][x]
                    )}`)
                }
            }
        }
    }
    for (i = 2; i < 4; i++) {
        tmp.el["f"+FERMIONS.names[i]+"Amt"].setTxt()
        let unls = FERMIONS.getGUnlLength(i)
		let total = E(0)
        for (let x = 0; x < FERMIONS.types[i].length; x++) {
            let unl = x < unls
            let f = FERMIONS.types[i][x]
            let id = `f${FERMIONS.names[i]}${x}`
            let fm = f.isMass?formatMass:format

            tmp.el[id+"_div"].setDisplay(unl)
			
			total = total.add(player.supernova.fermions.tiers[i][x])
            if (unl) {
                let active = tmp.fermions.ch[0] == i && tmp.fermions.ch[1] == x
                tmp.el[id+"_div"].setClasses({fermion_btn: true, [FERMIONS.names[i].slice(1)]: true, choosed: active})
                tmp.el[id+"_nextTier"].setTxt(format(f.nextTierAt(player.supernova.fermions.tiers[i][x]),0))
                tmp.el[id+"_tier_scale"].setTxt(getScalingName('gfTier', i, x))
                tmp.el[id+"_tier"].setTxt(format(player.supernova.fermions.tiers[i][x],0)+(tmp.fermions.maxTier[i][x] < Infinity?" / "+format(tmp.fermions.maxTier[i][x],0):"") + (tmp.fermions.bonuses[i][x].gt(0)?" + "+tmp.fermions.bonuses[i][x].format():""))
                tmp.el[id+"_desc"].setHTML(f.desc(tmp.fermions.effs[i][x])+(hasElement(503)?"<br>"+f.desc2(tmp.fermions.effs2[i][x]):""))

                tmp.el[id+"_cur"].setDisplay(active)
                if (active) {
                    tmp.el[id+"_cur"].setTxt(`Currently: ${format(player.supernova.fermions.tiers[i-2][x],0)}`)
                }
            }
        }
		tmp.el["f"+FERMIONS.names[i]+"Amt"].setTxt(format(total,0))
    }
}
