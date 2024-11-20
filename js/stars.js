const STARS = {
    unlocked() { return hasElement(36) },
    gain() {
        let x = player.stars.generators[0]
        if (player.md.upgs[8].gte(1)) x = x.mul(tmp.md.upgs[8].eff)
        if (hasPrestige(1,1)) x = x.pow(2)
			
		
		x = x.pow(tmp.fermions.effs[3][0]||E(1))
        x = x.softcap(tmp.stars.softGain,tmp.stars.softPower,0)
	
			if(hasUpgrade('exotic',18) && x.gte(10))x = expMult(x,tmp.ex.exb_eff[3])
				if(hasChargedElement(36) && x.gte(10))x = expMult(x,1.1)
				
				if(hasTree('qp31') && x.gte(10))x = expMult(x,treeEff('qp31'))
		if(hasElement(503) && x.gte(10))x = expMult(x,tmp.fermions.effs2[3][0]||E(1))	
				
				
			if (FERMIONS.onActive("33"))x = x.add(1).log10()
	
		if (player.gc.active || player.chal.active >= 21&&player.chal.active <= 24 || player.exotic.dark_run.active) x = GCeffect(x)
	
		tmp.starOverflowPower = E(0.8)
		if (player.ranks.hept.gte(2))tmp.starOverflowPower = tmp.starOverflowPower.pow(RANKS.effect.hept[2]())
			
		
		if (hasUpgrade('exotic',1))return x;
		tmp.starOverflow = overflow(x,"e1e43",tmp.starOverflowPower).log(x);
        return overflow(x,"e1e43",tmp.starOverflowPower);
    },
    softGain() {
        let s = E("e1000").pow(tmp.fermions.effs[1][0]||1)
		if(hasTree('s5'))s = EINF
        return s
    },
    softPower() {
        let p = E(0.75)
        return p
    },
    effect() {
		if (hasElement(531)){
			tmp.stars.effectPower = E("ee45");
			return E("ee100");
		}
        let [p, pp] = [E(1), E(1)]
        if (hasElement(48)) p = p.mul(1.1)
        if (player.ranks.hex.gte(48)) p = p.mul(1.1)
        if (hasElement(76)) [p, pp] = player.qu.rip.active?[p.mul(1.1), pp.mul(1.1)]:[p.mul(1.25), pp.mul(1.25)]
        if (player.ranks.hex.gte(76)) [p, pp] = player.qu.rip.active?[p.mul(1.1), pp.mul(1.1)]:[p.mul(1.25), pp.mul(1.25)]
        let [s,r,t1,t2,t3] = [player.stars.points.mul(p)
            ,player.ranks.rank.softcap(2.5e6,0.25,0).mul(p)
            ,player.ranks.tier.softcap(1.5e5,0.25,0).softcap(1.3e6,0.25,0).mul(p)
            ,player.ranks.tetr.mul(p).softcap(5,hasTree("s2")?1.5:5,1).softcap(9,0.3,0)
            ,(hasElement(69)?player.ranks.pent.mul(pp):E(0)).softcap(9,0.5,0)]
		
		if(hasElement(330)){
			r = player.ranks.rank.mul(p)
			t1 = player.ranks.tier.mul(p)
			t2 = player.ranks.tetr.mul(p)
			t3 = player.ranks.pent.mul(pp)
		}
        let x =
        s.max(1).log10().add(1).pow(r.mul(t1.pow(2)).add(1).pow(t2.add(1).pow(5/9).mul(0.25).mul(t3.pow(0.85).mul(0.0125).add(1))))
		let l = E(145);
		if(player.ranks.hex.gte(69)){
			l = E(214).sub(player.ranks.hex);
		}
		if(player.ranks.hex.gte(204)){
			l = E(10);
		}
		let l2=Decimal.pow(10,Decimal.pow(10,l));
		tmp.stars.effectPowerRaw = x.add(1).mul(l2).log10().log10().div(l).sqrt()
		if(player.ranks.hex.gte(69))tmp.stars.effectPowerRaw = tmp.stars.effectPowerRaw.pow(player.ranks.hex.sub(68).mul(0.01).add(1))
		if(hasChargedElement(69))tmp.stars.effectPowerRaw = tmp.stars.effectPowerRaw.pow(player.ranks.hept.mul(0.01).add(1))
		if(!hasTree('qp20'))tmp.stars.effectPower = overflow(tmp.stars.effectPowerRaw,"ee3",hasElement(502)?0.75:hasElement(497)?0.65:hasElement(491)?0.6:hasChargedElement(76)?0.56:hasChargedElement(48)?0.55:0.5);
		else tmp.stars.effectPower = tmp.stars.effectPowerRaw;
		if(!hasChargedElement(46))tmp.stars.effectPower = overflow(tmp.stars.effectPower,"ee8",0.5);
		if(!hasElement(515))tmp.stars.effectPower = overflow(tmp.stars.effectPower,"ee15",player.ranks.enne.gte(12)?0.7:0.5);
		if(!hasTree('qp28'))tmp.stars.effectPower = overflow(tmp.stars.effectPower,"e5e19",0.5);
		if(!hasElement(522))tmp.stars.effectPower = overflow(tmp.stars.effectPower,"ee21",0.5);
		tmp.stars.effectPower = overflow(tmp.stars.effectPower,"ee33",hasAscension(1,25)?0.2:0.1);
		tmp.stars.effectPower = overflow(tmp.stars.effectPower,"ee39",0.1);
		tmp.stars.effectPower = tmp.stars.effectPower.min("ee45");
		tmp.stars.effectRaw = x
		if(hasPrestige(1,24))return x.min("e1e85");
        return overflow(x.softcap("ee15",0.95,2).softcap("e5e22",0.95,2).softcap("e1e24",0.91,2).softcap("e2e56",0.95,2).softcap("e1e70",0.95,2),"e1e70",0.6).min("e1e75");
    },
    effectExpPower() {
		let ret=E(1);
        for(let i=0;i<8;i++){
			ret = ret.mul(player.ranks[RANKS.names[i]].add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1));
		}
		ret = ret.mul(player.stars.points.add(1).log10().add(1).log10().add(1).log10().add(1).log10().pow(2.5));
        ret = ret.sqrt().div(400).add(1)
        if(hasChargedElement(241)&&player.bh.mass.gte("eee126"))ret = ret.pow(100)
		return ret
    },
    generators: {
        req: [E(1e225),E(1e280),E('e320'),E('e430'),E('e870')],
        unl(auto=false) {
            if (player.atom.quarks.gte(!hasTree("s4")||player.stars.unls < 5?tmp.stars.generator_req:tmp.stars.generator_boost_req)) {
                if(hasTree("s4")&&player.stars.unls > 4) player.stars.boost = auto?player.stars.boost.max(tmp.stars.generator_boost_bulk):player.stars.boost.add(1)
                else player.stars.unls++
            }
        },
        gain(i) {
            let pow = E(1.5)
            if (FERMIONS.onActive("13")) pow = E(0.5)
            else {
                if (hasElement(50)) pow = pow.mul(1.05)
                if (player.ranks.hex.gte(50)) pow = pow.mul(1.05)
                if (hasTree("s3")) pow = pow.mul(tmp.supernova.tree_eff.s3)
            }
            if (QCs.active() && pow.gte(1)) pow = pow.pow(tmp.qu.qc_eff[0][1])
                if (CHALS.inChal(25)) pow = expMult(pow,0.5)
            let x = E(player.stars.unls > i ? 1 : 0).add(player.stars.generators[i+1]||0).pow(pow)
        

            if (hasElement(49) && i==4) x = x.mul(tmp.elements.effect[49])
            if (hasTree("s1") && i==4) x = x.mul(tmp.supernova.tree_eff.s1)
            if (player.md.upgs[8].gte(1)) x = x.mul(tmp.md.upgs[8].eff)
            if (hasElement(54) && !hasChargedElement(54)) x = x.mul(tmp.elements.effect[54])
            x = x.mul(tmp.stars.generator_boost_eff)
            if (hasChargedElement(54)) x = x.pow(tmp.elements.effect[54])
            if(hasElement(404))x = x.pow(tmp.bosons.upgs.photon[3].effect);else x = x.mul(tmp.bosons.upgs.photon[3].effect)
            if (hasPrestige(1,1)) x = x.pow(2)

		if (hasTree('qp36')) x = x.pow(tmp.chal?(tmp.chal.eff[20]||1):1)
				
				if(hasUpgrade('atom',22)) x = expMult(x,1.005)
				if(hasChargedElement(49)) x = expMult(x,1.02)
				if(hasChargedElement(50)) x = expMult(x,1.02)
                if(hasChargedElement(254)&&player.exotic.dr.gte(1e160)) x = expMult(x,player.superCluster.add(1).pow(0.05))
			if(hasElement(444) && x.gte(10))x = expMult(x,tmp.ex.exb_eff[3])
            if (QCs.active()) x = expMult(x,tmp.qu.qc_eff[0][0])
            if (CHALS.inChal(25)) x = expMult(expMult(x,0.5),0.5)
				if(hasTree('qp33') && x.gte(10))x = expMult(x,treeEff('qp31'))
            return x
        },
    },
    colors: ["#0085FF","#BFE0FF","#FFD500","#FF5200","#990000"],
}

function calcStars(dt) {
    player.stars.points = player.stars.points.add(tmp.stars.gain.mul(dt))
    if (!player.supernova.post_10) player.stars.points = player.stars.points.min(tmp.supernova.maxlimit)
    for (let x = 0; x < 5; x++) player.stars.generators[x] = player.stars.generators[x].add(tmp.stars.generators_gain[x].mul(dt))
}

function updateStarsTemp() {
    if (!tmp.stars) tmp.stars = {
        generators_gain: [],
    }
    tmp.stars.generator_req = player.stars.unls<5?STARS.generators.req[player.stars.unls]:EINF
    let s = E("e8000")
    let inc = E("e100")
    if (hasUpgrade('br',5)) {
        s = s.root(10)
        inc = inc.root(10)
    }
    tmp.stars.generator_boost_req = inc.pow(player.stars.boost.pow(1.25)).mul(s)
    tmp.stars.generator_boost_bulk = player.atom.quarks.gte(s)?player.atom.quarks.div(s).max(1).log(inc).root(1.25).add(1).floor():E(0)

    tmp.stars.generator_boost_base = E(2)
    if (hasElement(57)) tmp.stars.generator_boost_base = tmp.stars.generator_boost_base.mul(tmp.elements.effect[57])
    if (hasUpgrade('br',5)) tmp.stars.generator_boost_base = tmp.stars.generator_boost_base.mul(upgEffect(4,5))
    tmp.stars.generator_boost_base = tmp.stars.generator_boost_base.softcap(1e13,0.5,0)

    tmp.stars.generator_boost_eff = tmp.stars.generator_boost_base.pow(player.stars.boost.mul(tmp.chal?tmp.chal.eff[11]:1)).softcap('e3e18',0.95,2)
    for (let x = 0; x < 5; x++) tmp.stars.generators_gain[x] = STARS.generators.gain(x)
    tmp.stars.softPower = STARS.softPower()
    tmp.stars.softGain = STARS.softGain()
    tmp.stars.gain = STARS.gain()
    tmp.stars.effect = STARS.effect()
    tmp.stars.effectExpPower = STARS.effectExpPower()
}

function setupStarsHTML() {
    let stars_table = new Element("stars_table")
	let table = ""
	for (let i = 0; i < 5; i++) {
        if (i > 0) table += `<div id="star_gen_arrow_${i}" style="width: 30px; font-size: 30px"><br>←</div>`
        table += `
            <div id="star_gen_div_${i}" style="width: 250px;">
                <img src="images/star_${5-i}.png"><br><br>
                <div id="star_gen_${i}">X</div>
            </div>
        `
	}
	stars_table.setHTML(table)
}

function updateStarsScreenHTML() {
    if ((!tmp.supernova.reached || player.supernova.post_10) && tmp.tab != 5) {
        let g = tmp.supernova.bulk.sub(player.supernova.times).max(0)
        let percent = 0
        if (hasTree("qu_qol4")) {
            let d = SUPERNOVA.req(tmp.supernova.bulk).maxlimit
            let e = SUPERNOVA.req(tmp.supernova.bulk.sub(1)).maxlimit
            percent = player.stars.points.div(e).max(1).log10().div(d.div(e).max(1).log10()).max(0).min(1).toNumber()
        }else if (g.gte(1) && player.supernova.post_10) {
            let d = SUPERNOVA.req(tmp.supernova.bulk).maxlimit
            let e = SUPERNOVA.req(tmp.supernova.bulk.sub(1)).maxlimit
            percent = player.stars.points.div(e).max(1).log10().div(d.div(e).max(1).log10()).max(0).min(1).toNumber()
        }
        else percent = player.stars.points.max(1).log10().div(tmp.supernova.maxlimit.max(1).log10()).max(0).min(1).toNumber()
        let size = Math.min(window.innerWidth, window.innerHeight)*percent*0.9
        let color = `rgb(${percent/0.4*191}, ${percent/0.4*91+133}, 255)`
        if (percent>0.4) color = `rgb(${(percent-0.4)/0.2*64+191}, ${224-(percent-0.4)/0.2*11}, ${255-(percent-0.4)/0.2*255})`
        if (percent>0.6) color = `rgb(255, ${213-(percent-0.6)/0.1*131}, 0)`
        if (percent>0.7) color = `rgb(${255-(percent-0.7)/0.1*102}, ${82-(percent-0.7)/0.1*82}, 0)`
        if (percent>0.8) color = `rgb(153, 0, 0)`
        tmp.el.star.changeStyle('background-color',color)
        tmp.el.star.changeStyle('width',size+"px")
        tmp.el.star.changeStyle('height',size+"px")
		tmp.el.star.setDisplay(player.show_supernova!=1)
    }
}

function updateStarsHTML() {
    tmp.el.starSoft1.setDisplay(tmp.stars.gain.gte(tmp.stars.softGain))
	tmp.el.starSoftStart1.setTxt(format(tmp.stars.softGain))
    tmp.el.starOverflow.setDisplay(tmp.stars.gain.gte("ee43") && !hasUpgrade('exotic',1))
	tmp.el.starOverflow1.setTxt(format(tmp.starOverflow))
    tmp.el.stars_Amt.setTxt(format(player.stars.points,2)+formatGain(player.stars.points,tmp.stars.gain.mul(tmp.preQUGlobalSpeed))+"星辰，成为超新星需要"+format(tmp.supernova.maxlimit,2))
    if (player.supernova.times.gte(SUPERNOVA_GALAXY.req()) || hasElement(291))tmp.el.stars_Amt.setTxt(format(player.stars.points,2)+formatGain(player.stars.points,tmp.stars.gain.mul(tmp.preQUGlobalSpeed)))
    tmp.el.stars_Eff.setTxt(format(tmp.stars.effect)+"x")
	if (player.ranks.hex.gte(36))tmp.el.stars_Eff.setTxt(format(tmp.stars.effect)+"x, ^"+format(tmp.stars.effectPower))
	if (hasElement(530))tmp.el.stars_Eff.setTxt(format(tmp.stars.effect)+"x, ^"+format(tmp.stars.effectPower)+", exponent ^"+format(tmp.stars.effectExpPower,5))
    tmp.el.star_btn.setDisplay(hasTree("s4") || player.stars.unls < 5)
    tmp.el.star_btn.setHTML((player.stars.unls < 5 || !hasTree("s4"))
    ? `Unlock new type of Stars, require ${format(tmp.stars.generator_req)} Quark`
    : `Boost all-Star resources gain, require ${format(tmp.stars.generator_boost_req)} Quark<br>Base: ${format(tmp.stars.generator_boost_base)}x<br>Currently: ${format(tmp.stars.generator_boost_eff)}x`)

    tmp.el.star_btn.setClasses({btn: true, locked: !player.atom.quarks.gte(!hasTree("s4")||player.stars.unls < 5?tmp.stars.generator_req:tmp.stars.generator_boost_req)})

    for (let x = 0; x < 5; x++) {
        let unl = player.stars.unls > x
        tmp.el["star_gen_div_"+x].setDisplay(unl)
        if (tmp.el["star_gen_arrow_"+x]) tmp.el["star_gen_arrow_"+x].setDisplay(unl)
        if (unl) tmp.el["star_gen_"+x].setHTML(format(player.stars.generators[x],2)+"<br>"+formatGain(player.stars.generators[x],tmp.stars.generators_gain[x].mul(tmp.preQUGlobalSpeed)))
    }
}