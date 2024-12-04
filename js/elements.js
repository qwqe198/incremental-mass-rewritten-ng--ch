function setupHTML() {
	let sn_stabs = new Element("sn_stabs")
	let tabs = new Element("tabs")
	let stabs = new Element("stabs")
	let table = ""
	let table2 = ""
	let table3 = ""
	for (let x = 0; x < TABS[1].length; x++) {
		table += `<div style="width: 145px">
			<button onclick="TABS.choose(${x})" class="btn_tab" id="tab${x}">${TABS[1][x].id}</button>
		</div>`
		if (TABS[2][x]) {
			let a = `<div id="stabs${x}" class="table_center">`
			for (let y = 0; y < TABS[2][x].length; y++) {
				a += `<div style="width: 145px">
					<button onclick="TABS.choose(${y}, true)" class="btn_tab" id="stab${x}_${y}">${TABS[2][x][y].id}</button>
				</div>`
			}
			a += `</div>`
			if (x == 5) table3 += a
			else table2 += a
		}
	}
	tabs.setHTML(table)
	stabs.setHTML(table2)
	sn_stabs.setHTML(table3)

	let ranks_table = new Element("ranks_table")
	table = ""
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		table += `<div style="width: 300px" id="ranks_div_${x}">
			<button id="ranks_auto_${x}" class="btn" style="width: 80px;" onclick="RANKS.autoSwitch('${rn}')">OFF</button>
			<span id="ranks_scale_${x}""></span><span id="ranks_name_${x}"">${RANKS.fullNames[x]}</span><span id="ranks_amt_${x}">X</span><br><br>
			<button onclick="RANKS.reset('${rn}')" class="btn reset" id="ranks_${x}">
				<span id="ranks_desc1_${x}">重置${x>0?RANKS.fullNames[x-1]+"":'质量和质量升级'}，但</span>提升${RANKS.fullNames[x]}。<span id="ranks_desc_${x}"></span><br>
				Req: <span id="ranks_req_${x}">X</span>
			</button>
		</div>`
	}
	ranks_table.setHTML(table)

	let pres_table = new Element("pres_table")
	table = ""
	for (let x = 0; x < PRES_LEN; x++) {
		table += `<div style="width: 300px" id="pres_div_${x}">
			<button id="pres_auto_${x}" class="btn" style="width: 80px;" onclick="RANKS.autoSwitch(${x})">OFF</button>
			<span id="pres_scale_${x}""></span>${PRESTIGES.fullNames[x]}<span id="pres_amt_${x}">X</span><br><br>
			<button onclick="PRESTIGES.reset(${x})" class="btn reset" id="pres_${x}">
				${x>0?"重置"+PRESTIGES.fullNames[x-1]+"":'强制前往量子'}，但提升${PRESTIGES.fullNames[x]}。<span id="pres_desc_${x}"></span><br>
				Req: <span id="pres_req_${x}">X</span>
			</button>
		</div>`
	}
	pres_table.setHTML(table)

	let as_table = new Element("as_table")
	table = ""
	for (let x = 0; x < AS_LEN; x++) {
		table += `<div style="width: 300px" id="as_div_${x}">
			<button id="as_auto_${x}" class="btn" style="width: 80px;" onclick="RANKS.autoSwitch(${x})">OFF</button>
			<span id="as_scale_${x}""></span>${ASCENSIONS.fullNames[x]} <span id="as_amt_${x}">X</span><br><br>
			<button onclick="ASCENSIONS.reset(${x})" class="btn reset" id="as_${x}">
				${x>0?"重置"+ASCENSIONS.fullNames[x-1]:'强制奇异重置'}, 但提升${ASCENSIONS.fullNames[x]}.<span id="as_desc_${x}"></span><br>
				Req: <span id="as_req_${x}">X</span>
			</button>
		</div>`
	}
	as_table.setHTML(table)

	let mass_upgs_table = new Element("mass_upgs_table")
	table = ""
	for (let x = 1; x <= UPGS.mass.cols; x++) {
		let upg = UPGS.mass[x]
		table += `<div style="width: 100%; margin-bottom: 5px;" class="table_center" id="massUpg_div_${x}">
			<div style="width: 400px">
				<div class="resources">
					<img src="images/mass_upg${x}.png">
					<span style="margin-left: 5px; text-align: left;"><span id="massUpg_scale_${x}"></span>${upg.title} [<span id="massUpg_lvl_${x}">X</span>]</span>
				</div>
			</div><button id="massUpg_btn_${x}" class="btn" style="width: 200px;" onclick="UPGS.mass.buy(${x}, true)">Cost: <span id="massUpg_cost_${x}">X</span></button>
			<button class="btn" style="width: 120px;" onclick="UPGS.mass.buyMax(${x})">Buy Max</button>
			<button id="massUpg_auto_${x}" class="btn" style="width: 80px;" onclick="UPGS.mass.autoSwitch(${x})">OFF</button>
			<div style="margin-left: 5px; text-align: left; width: 400px">
				${upg.title} Power: <span id="massUpg_step_${x}">X</span><br>
				${upg.title} Effect: <span id="massUpg_eff_${x}">X</span>
			</div>
		</div>`
	}
	mass_upgs_table.setHTML(table)

	let prestige_mass_upgs_table = new Element("prestige_mass_upgs_table")
	table = ""
	for (let x = 1; x <= UPGS.prestigeMass.cols; x++) {
		let upg = UPGS.prestigeMass[x]
		table += `<div style="width: 100%; margin-bottom: 5px;" class="table_center" id="prestigeMassUpg_div_${x}">
			<div style="width: 400px">
				<div class="resources">
					<img src="images/mass_upg${x}.png">
					<span style="margin-left: 5px; text-align: left;"><span id="prestigeMassUpg_scale_${x}"></span>${upg.title} [<span id="prestigeMassUpg_lvl_${x}">X</span>]</span>
				</div>
			</div><button id="prestigeMassUpg_btn_${x}" class="btn" style="width: 200px;" onclick="UPGS.prestigeMass.buy(${x}, true)">Cost: <span id="prestigeMassUpg_cost_${x}">X</span></button>
			<button class="btn" style="width: 120px;" onclick="UPGS.prestigeMass.buyMax(${x})">Buy Max</button>
			<button id="prestigeMassUpg_auto_${x}" class="btn" style="width: 80px;" onclick="UPGS.prestigeMass.autoSwitch(${x})">OFF</button>
			<div style="margin-left: 5px; text-align: left; width: 400px">
				${upg.title} Power: <span id="prestigeMassUpg_step_${x}">X</span><br>
				${upg.title} Effect: <span id="prestigeMassUpg_eff_${x}">X</span>
			</div>
		</div>`
	}
	prestige_mass_upgs_table.setHTML(table)

	let ascension_mass_upgs_table = new Element("ascension_mass_upgs_table")
	table = ""
	for (let x = 1; x <= UPGS.ascensionMass.cols; x++) {
		let upg = UPGS.ascensionMass[x]
		table += `<div style="width: 100%; margin-bottom: 5px;" class="table_center" id="ascensionMassUpg_div_${x}">
			<div style="width: 400px">
				<div class="resources">
					<img src="images/mass_upg${x}.png">
					<span style="margin-left: 5px; text-align: left;"><span id="ascensionMassUpg_scale_${x}"></span>${upg.title} [<span id="ascensionMassUpg_lvl_${x}">X</span>]</span>
				</div>
			</div><button id="ascensionMassUpg_btn_${x}" class="btn" style="width: 200px;" onclick="UPGS.ascensionMass.buy(${x}, true)">Cost: <span id="ascensionMassUpg_cost_${x}">X</span></button>
			<button class="btn" style="width: 120px;" onclick="UPGS.ascensionMass.buyMax(${x})">Buy Max</button>
			<button id="ascensionMassUpg_auto_${x}" class="btn" style="width: 80px;" onclick="UPGS.ascensionMass.autoSwitch(${x})">OFF</button>
			<div style="margin-left: 5px; text-align: left; width: 400px">
				${upg.title} Power: <span id="ascensionMassUpg_step_${x}">X</span><br>
				${upg.title} Effect: <span id="ascensionMassUpg_eff_${x}">X</span>
			</div>
		</div>`
	}
	ascension_mass_upgs_table.setHTML(table)

	let ranks_rewards_table = new Element("ranks_rewards_table")
	table = ""
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		table += `<div id="ranks_reward_div_${x}">`
		let keys = Object.keys(RANKS.desc[rn])
		for (let y = 0; y < keys.length; y++) {
			table += `<span id="ranks_reward_${rn}_${y}"><b>${RANKS.fullNames[x]}${keys[y]}:</b>${RANKS.desc[rn][keys[y]]}${RANKS.effect[rn][keys[y]]?`目前效果：<span id='ranks_eff_${rn}_${y}'></span></span>`:""}<br>`
		}
		table += `</div>`
	}
	ranks_rewards_table.setHTML(table)

	let pres_rewards_table = new Element("pres_rewards_table")
	table = ""
	for (let x = 0; x < PRES_LEN; x++) {
		table += `<div id="pres_reward_div_${x}">`
		let keys = Object.keys(PRESTIGES.rewards[x])
		for (let y = 0; y < keys.length; y++) {
			table += `<span id="pres_reward_${x}_${y}"><b>${PRESTIGES.fullNames[x]}${keys[y]}:</b>${PRESTIGES.rewards[x][keys[y]]}${PRESTIGES.rewardEff[x][keys[y]]?`目前效果：<span id='pres_eff_${x}_${y}'></span></span>`:""}<br>`
		}
		table += `</div>`
	}
	pres_rewards_table.setHTML(table)

	let as_rewards_table = new Element("as_rewards_table")
	table = ""
	for (let x = 0; x < AS_LEN; x++) {
		table += `<div id="as_reward_div_${x}">`
		let keys = Object.keys(ASCENSIONS.rewards[x])
		for (let y = 0; y < keys.length; y++) {
			table += `<span id="as_reward_${x}_${y}"><b>${ASCENSIONS.fullNames[x]} ${keys[y]}:</b> ${ASCENSIONS.rewards[x][keys[y]]}${ASCENSIONS.rewardEff[x][keys[y]]?` 目前效果: <span id='as_eff_${x}_${y}'></span></span>`:""}<br>`
		}
		table += `</div>`
	}
	as_rewards_table.setHTML(table)

	let main_upgs_table = new Element("main_upgs_table")
	table = ""
	for (let x = 1; x <= UPGS.main.cols; x++) {
		let id = UPGS.main.ids[x]
		table += `<div id="main_upg_${x}_div" style="width: 230px; margin: 0px 10px;"><b>${UPGS.main[x].title}</b><br><br><div style="font-size: 13px; min-height: 50px" id="main_upg_${x}_res"></div><br><div class="table_center" style="justify-content: start;">`
		for (let y = 1; y <= UPGS.main[x].lens; y++) {
			let key = UPGS.main[x][y]
			table += `<img onclick="UPGS.main[${x}].buy(${y})" onmouseover="UPGS.main.over(${x},${y})" onmouseleave="UPGS.main.reset()"
			style="margin: 3px;" class="img_btn" id="main_upg_${x}_${y}" src="images/main_upg_${(x==7||x==6||y>22)?'placeholder':(id+y)}.png">`
		}
		table += `</div><br><button id="main_upg_${x}_auto" class="btn" style="width: 80px;" onclick="player.auto_mainUpg.${id} = !player.auto_mainUpg.${id}">OFF</button></div>`
	}
	main_upgs_table.setHTML(table)

	let scaling_table = new Element("scaling_table")
	table = ""
	for (let x = 0; x < SCALE_TYPE.length; x++) {
		table += `<div id="scaling_div_${x}">`
		let key = Object.keys(SCALE_START[SCALE_TYPE[x]])
		for (let y = 0; y < key.length; y++) {
			table += `<div id="scaling_${x}_${key[y]}_div" style="margin-bottom: 10px;"><b>${NAME_FROM_RES[key[y]]}</b>(<span id="scaling_${x}_${key[y]}_power"></span>): Starts at <span id="scaling_${x}_${key[y]}_start"></span></div>`
		}
		table += `</div>`
	}
	scaling_table.setHTML(table)

	setupChalHTML()
	setupAtomHTML()
	setupElementsHTML()
	setupMDHTML()
	setupStarsHTML()
	setupTreeHTML()
	setupBosonsHTML()
	setupFermionsHTML()
	setupRadiationHTML()
	setupQuantumHTML()
	setupExoticHTML()

	/*
	function setupTestHTML() {
		let test_table = new Element("test_table")
		let table = ""
		for (let i = 0; i < 5; i++) {
			table += `
				
			`
		}
		test_table.setHTML(table)
	}
	*/

	let confirm_table = new Element("confirm_table")
	table = ""
	for (let x = 0; x < CONFIRMS.length; x++) {
		table += `<div style="width: 100px" id="confirm_div_${x}"><img src="images/${x == 1 ? "dm" : CONFIRMS[x]}.png"><br><button onclick="player.confirms.${CONFIRMS[x]} = !player.confirms.${CONFIRMS[x]}" class="btn" id="confirm_btn_${x}">OFF</button></div>`
	}
	confirm_table.setHTML(table)

    tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}
}

function updateTabsHTML() {
	for (let x = 0; x < TABS[1].length; x++) {
		if (x != 5 && tmp.tab == 5) continue
		let tab = TABS[1][x]
		tmp.el["tab"+x].setDisplay(tab.unl ? tab.unl() : true)
		tmp.el["tab"+x].setClasses({btn_tab: true, [tab.style ? tab.style : "normal"]: true, choosed: x == tmp.tab})

		if (tmp.el["tab_frame"+x]) tmp.el["tab_frame"+x].setDisplay(x == tmp.tab)
		if (TABS[2][x]) {
			tmp.el["stabs"+x].setDisplay(x == tmp.tab)
			if (x == tmp.tab) for (let y = 0; y < TABS[2][x].length; y++)  {
				let stab = TABS[2][x][y]
				tmp.el["stab"+x+"_"+y].setDisplay(stab.unl ? stab.unl() : true)
				tmp.el["stab"+x+"_"+y].setClasses({btn_tab: true, [stab.style ? stab.style : "normal"]: true, choosed: y == tmp.stab[x]})
				if (tmp.el["stab_frame"+x+"_"+y]) tmp.el["stab_frame"+x+"_"+y].setDisplay(y == tmp.stab[x])
			}
		}
	}
}

function updateUpperHTML() {
	let gs = tmp.preQUGlobalSpeed

	tmp.el.reset_desc.setHTML(player.reset_msg)
	tmp.el.mass.setHTML(formatMass(player.mass)+"<br>"+formatGain(player.mass, tmp.massGain.mul(gs), true))
	
	let unl = (!quUnl() || !hasUpgrade('bh',6))
	tmp.el.rp_div.setDisplay(unl)
	if (unl) tmp.el.rpAmt.setHTML(format(player.rp.points,0)+"<br>"+(player.mainUpg.bh.includes(6)||player.mainUpg.atom.includes(6)?formatGain(player.rp.points, tmp.rp.gain.mul(gs)):"(+"+format(tmp.rp.gain,0)+")"))
	
	unl = FORMS.bh.see() && (!quUnl() || !hasUpgrade('atom',6))
	tmp.el.dm_div.setDisplay(unl)
	if (unl) tmp.el.dmAmt.setHTML(format(player.bh.dm,0)+"<br>"+(player.mainUpg.atom.includes(6)?formatGain(player.bh.dm, tmp.bh.dm_gain.mul(gs)):"(+"+format(tmp.bh.dm_gain,0)+")"))
	
	unl = player.bh.unl
	tmp.el.bh_div.setDisplay(unl)
	tmp.el.atom_div.setDisplay(unl && (!quUnl() || !hasElement(14) || !hasElement(24)))
	if (unl) {
		tmp.el.bhMass.setHTML(formatMass(player.bh.mass)+"<br>"+formatGain(player.bh.mass, tmp.bh.mass_gain.mul(gs), true))
		tmp.el.atomAmt.setHTML(format(player.atom.points,0)+"<br>"+(hasElement(24)?formatGain(player.atom.points,tmp.atom.gain.mul(gs)):"(+"+format(tmp.atom.gain,0)+")"))
	}
	
	unl = !CHALS.inChal(0)
	tmp.el.chal_upper.setVisible(unl)
	if (unl) {
		let data = CHALS.getChalData(player.chal.active, tmp.chal.bulk[player.chal.active].max(player.chal.comps[player.chal.active]))
		tmp.el.chal_upper.setHTML(`您目前正在进行[${CHALS[player.chal.active].title}]挑战！达到${tmp.chal.format(tmp.chal.goal[player.chal.active])+CHALS.getResName(player.chal.active)}以后可以完成1次挑战。
		<br>本次挑战可增加${tmp.chal.gain}次完成次数(到达${tmp.chal.format(data.goal)+CHALS.getResName(player.chal.active)}后可再增加1次)`)
	}
	
	unl = (player.atom.unl && player.superGal.lt(10)) || hasUpgrade("atom",25)
	tmp.el.quark_div.setDisplay(unl)
	if (unl) tmp.el.quarkAmt.setHTML(format(player.atom.quarks,0)+"<br>"+(hasElement(14)?formatGain(player.atom.quarks,tmp.atom?tmp.atom.quarkGain.mul(tmp.atom.quarkGainSec).mul(gs):0):"(+"+format(tmp.atom.quarkGain,0)+")"))
	
	unl = MASS_DILATION.unlocked() && player.superGal.lt(10)
	tmp.el.md_div.setDisplay(unl)
	if (unl) tmp.el.md_massAmt.setHTML(format(player.md.particles,0)+"<br>"+(player.md.active?"(+"+format(tmp.md.rp_gain,0)+")":(hasTree("qol3")?formatGain(player.md.particles,tmp.md.passive_rp_gain.mul(gs)):"(inactive)")))
	
	unl = (player.supernova.post_10 || player.superGal.gte(1))
	tmp.el.sn_div.setDisplay(unl)
	if (unl) tmp.el.supernovaAmt.setHTML(format(player.supernova.times,0)+"<br>(+"+format(tmp.supernova.bulk.sub(player.supernova.times).max(0),0)+")")
	if (hasElement(291)) tmp.el.supernovaAmt.setHTML(format(player.supernova.times,0)+"<br>"+player.supernova.times.formatGain(tmp.supernova.bulk.sub(player.supernova.times).max(0).div(tmp.dt),0))
	
	unl = (player.superGal.gte(10))
	tmp.el.galQk_div.setDisplay(unl)
	if (unl) tmp.el.galQkAmt.setHTML(format(player.galQk,0)+"<br>"+player.galQk.formatGain(SUPERNOVA_GALAXY.galQkGain(),0))	
		
	unl = (hasElement(291))
	tmp.el.superGal_div.setDisplay(unl)
	if (unl) tmp.el.superGalAmt.setHTML(format(player.superGal,0)+"<br>(+"+format(SUPERNOVA_GALAXY.bulk().sub(player.superGal).max(0),0)+")")
		
	unl = (hasElement(359))
	tmp.el.exotic_div.setDisplay(unl)
	if (unl) tmp.el.exoticAmt.setHTML(format(player.exotic.points,0)+"<br>(+"+format(EXOTIC.gain(),0)+")")
	if (hasChargedElement(24)) tmp.el.exoticAmt.setHTML(format(player.exotic.points,0)+"<br>"+player.exotic.points.formatGain(EXOTIC.gain()),0)
		
	unl = player.superCluster.gte(21)
	tmp.el.stardust_div.setDisplay(unl)
	if (unl) tmp.el.stardustAmt.setHTML(format(player.stardust,0)+"<br>"+player.stardust.formatGain(SUPERNOVA_CLUSTER.stardustGain(),0))
	unl = player.prestigeST.gte(1e6)||player.sun.shard.gte(1)
	tmp.el.sunshard_div.setDisplay(unl)
	if (unl) tmp.el.sunAmt.setHTML(format(player.sun.shard,0)+"<br>(+"+format(sunshard.gain(),0)+")")
}

function updateMassUpgradesHTML() {
	for (let x = 1; x <= UPGS.mass.cols; x++) {
		let upg = UPGS.mass[x]
		tmp.el["massUpg_div_"+x].setDisplay(upg.unl() && tmp.rank_tab == 0)
		if (upg.unl()) {
			tmp.el["massUpg_scale_"+x].setTxt(getScalingName("massUpg", x))
			if(x==4)tmp.el["massUpg_scale_"+x].setTxt(getScalingName("massUpg4", x))
			tmp.el["massUpg_lvl_"+x].setTxt(format(player.massUpg[x]||0,0)+(tmp.upgs.mass[x].bonus.gt(0)?(hasAscension(2,1)?" x ":" + ")+format(tmp.upgs.mass[x].bonus,0):""))
			tmp.el["massUpg_btn_"+x].setClasses({btn: true, locked: player.mass.lt(tmp.upgs.mass[x].cost)})
			tmp.el["massUpg_cost_"+x].setTxt(formatMass(tmp.upgs.mass[x].cost))
			tmp.el["massUpg_step_"+x].setTxt(tmp.upgs.mass[x].effDesc.step)
			tmp.el["massUpg_eff_"+x].setHTML(tmp.upgs.mass[x].effDesc.eff)
			tmp.el["massUpg_auto_"+x].setDisplay(player.mainUpg.rp.includes(3))
			tmp.el["massUpg_auto_"+x].setTxt(player.autoMassUpg[x]?"ON":"OFF")
		}
	}
	for (let x = 1; x <= UPGS.prestigeMass.cols; x++) {
		let upg = UPGS.prestigeMass[x]
		tmp.el["prestigeMassUpg_div_"+x].setDisplay(upg.unl() && tmp.rank_tab == 1)
		if (upg.unl()) {
			tmp.el["prestigeMassUpg_scale_"+x].setTxt("")
			tmp.el["prestigeMassUpg_lvl_"+x].setTxt(format(player.prestigeMassUpg[x]||0,0))
			tmp.el["prestigeMassUpg_btn_"+x].setClasses({btn: true, locked: player.prestigeMass.lt(tmp.upgs.prestigeMass[x].cost)})
			tmp.el["prestigeMassUpg_cost_"+x].setTxt(formatMass(tmp.upgs.prestigeMass[x].cost)+"转生质量")
			tmp.el["prestigeMassUpg_step_"+x].setTxt(tmp.upgs.prestigeMass[x].effDesc.step)
			tmp.el["prestigeMassUpg_eff_"+x].setHTML(tmp.upgs.prestigeMass[x].effDesc.eff)
			tmp.el["prestigeMassUpg_auto_"+x].setDisplay(true)
			tmp.el["prestigeMassUpg_auto_"+x].setTxt(player.autoprestigeMassUpg[x]?"ON":"OFF")
		}
	}
	for (let x = 1; x <= UPGS.ascensionMass.cols; x++) {
		let upg = UPGS.ascensionMass[x]
		tmp.el["ascensionMassUpg_div_"+x].setDisplay(upg.unl() && tmp.rank_tab == 2)
		if (upg.unl()) {
			tmp.el["ascensionMassUpg_scale_"+x].setTxt("")
			tmp.el["ascensionMassUpg_lvl_"+x].setTxt(format(player.ascensionMassUpg[x]||0,0))
			tmp.el["ascensionMassUpg_btn_"+x].setClasses({btn: true, locked: player.ascensionMass.lt(tmp.upgs.ascensionMass[x].cost)})
			tmp.el["ascensionMassUpg_cost_"+x].setTxt(formatMass(tmp.upgs.ascensionMass[x].cost)+" Ascension Mass")
			tmp.el["ascensionMassUpg_step_"+x].setTxt(tmp.upgs.ascensionMass[x].effDesc.step)
			tmp.el["ascensionMassUpg_eff_"+x].setHTML(tmp.upgs.ascensionMass[x].effDesc.eff)
			tmp.el["ascensionMassUpg_auto_"+x].setDisplay(true)
			tmp.el["ascensionMassUpg_auto_"+x].setTxt(player.autoascensionMassUpg[x]?"ON":"OFF")
		}
	}
}

function updateTickspeedHTML() {
	let unl = player.rp.unl
	tmp.el.tickspeed_div.setDisplay(unl && tmp.rank_tab == 0)
	if (unl) {
		let teff = tmp.tickspeedEffect
		tmp.el.tickspeed_scale.setTxt(getScalingName('tickspeed'))
		tmp.el.tickspeed_lvl.setTxt(format(player.tickspeed,0)+(teff.bonus.gte(1)?(hasAscension(2,1)?" x ":" + ")+format(teff.bonus,0):""))
		tmp.el.tickspeed_btn.setClasses({btn: true, locked: !FORMS.tickspeed.can()})
		tmp.el.tickspeed_cost.setTxt(format(tmp.tickspeedCost,0))
		tmp.el.tickspeed_step.setHTML((teff.step.gte(10)?format(teff.step)+"倍":format(teff.step.sub(1).mul(100))+"%")
		+(teff.step.gte(teff.ss)?"<span class='soft'>(softcapped)</span>":""))
		tmp.el.tickspeed_eff.setTxt(format(teff.eff)+"倍")
		if(hasElement(134)){
			tmp.el.tickspeed_eff.setTxt("^"+format(teff.eff))
		}
		tmp.el.tickspeed_auto.setDisplay(FORMS.tickspeed.autoUnl())
		tmp.el.tickspeed_auto.setTxt(player.autoTickspeed?"ON":"OFF")
	}
	tmp.el.accel_div.setDisplay(unl && hasElement(134) && tmp.rank_tab == 0);
	if(hasElement(134)){
		let eff = tmp.accelEffect
		//tmp.el.accel_scale.setTxt(getScalingName('accel'))
		tmp.el.accel_lvl.setTxt(format(player.accelerator,0))
		tmp.el.accel_btn.setClasses({btn: true, locked: !FORMS.accel.can()})
		tmp.el.accel_cost.setTxt(format(tmp.accelCost,0))
		tmp.el.accel_step.setHTML("+^"+format(eff.step))
		tmp.el.accel_eff.setHTML("^"+format(eff.eff)+"时间速度"+(hasElement(137)?"倍率和":"")+"效果"+(eff.eff.gte(eff.ss)?"<span class='soft'>(softcapped"+(eff.eff.gte(eff.ss2)?"^2":"")+")</span>":""))

		tmp.el.accel_auto.setDisplay(FORMS.accel.autoUnl())
		tmp.el.accel_auto.setTxt(player.autoAccel?"ON":"OFF")
	}
	tmp.el.prestige_tickspeed_div.setDisplay(hasPrestige(2,165) && tmp.rank_tab == 1)
	if(hasPrestige(2,165)){
		
		let teff = tmp.prestigeTickspeedEffect
		tmp.el.prestige_tickspeed_lvl.setTxt(format(player.prestigeTickspeed,0)+(teff.bonus.gte(1)?" + "+format(teff.bonus,0):""))
		tmp.el.prestige_tickspeed_btn.setClasses({btn: true, locked: !FORMS.prestige_tickspeed.can()})
		tmp.el.prestige_tickspeed_cost.setTxt(format(tmp.prestigeTickspeedCost,0))
		tmp.el.prestige_tickspeed_step.setHTML(format(teff.step)+"x"
		+(teff.step.gte(teff.ss)?" <span class='soft'>(softcapped)</span>":""))
		tmp.el.prestige_tickspeed_eff.setTxt(format(teff.eff)+"x")
		tmp.el.prestige_tickspeed_auto.setDisplay(FORMS.prestige_tickspeed.autoUnl())
		tmp.el.prestige_tickspeed_auto.setTxt(player.autoPrestigeTickspeed?"ON":"OFF")
	}
	tmp.el.prestigeBHC_div.setDisplay(hasPrestige(3,37) && tmp.rank_tab == 1)

	
	if(hasPrestige(3,37)){
		
		let teff = tmp.prestigeBHCEffect
		tmp.el.prestigeBHC_lvl.setTxt(format(player.prestigeBHC,0)+(teff.bonus.gte(1)?" + "+format(teff.bonus,0):""))
		tmp.el.prestigeBHC_btn.setClasses({btn: true, locked: !FORMS.prestigeBHC.can()})
		tmp.el.prestigeBHC_cost.setTxt(format(tmp.prestigeBHCCost,0))
		tmp.el.prestigeBHC_step.setHTML(format(teff.step)+"x"
		+(teff.step.gte(teff.ss)?" <span class='soft'>(softcapped)</span>":""))
		tmp.el.prestigeBHC_eff.setTxt(format(teff.eff)+"x")
		tmp.el.prestigeBHC_auto.setDisplay(FORMS.prestigeBHC.autoUnl())
		tmp.el.prestigeBHC_auto.setTxt(player.autoPrestigeBHC?"ON":"OFF")
	}
}

function updateRanksRewardHTML() {
	tmp.el["ranks_reward_name"].setTxt(RANKS.fullNames[player.ranks_reward])
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		tmp.el["ranks_reward_div_"+x].setDisplay(player.ranks_reward == x)
		if (player.ranks_reward == x) {
			let keys = Object.keys(RANKS.desc[rn])
			for (let y = 0; y < keys.length; y++) {
				let unl = player.ranks[rn].gte(keys[y])
				tmp.el["ranks_reward_"+rn+"_"+y].setDisplay(unl)
				if (unl) if (tmp.el["ranks_eff_"+rn+"_"+y]) tmp.el["ranks_eff_"+rn+"_"+y].setTxt(RANKS.effDesc[rn][keys[y]](RANKS.effect[rn][keys[y]]()))
			}
		}
	}
}

function updatePrestigesRewardHTML() {
	tmp.el["pres_reward_name"].setTxt(PRESTIGES.fullNames[player.pres_reward])
	for (let x = 0; x < PRES_LEN; x++) {
		tmp.el["pres_reward_div_"+x].setDisplay(player.pres_reward == x)
		if (player.pres_reward == x) {
			let keys = Object.keys(PRESTIGES.rewards[x])
			for (let y = 0; y < keys.length; y++) {
				let unl = player.prestiges[x].gte(keys[y])
				tmp.el["pres_reward_"+x+"_"+y].setDisplay(unl)
				if (unl) if (tmp.el["pres_eff_"+x+"_"+y]) {
					let eff = PRESTIGES.rewardEff[x][keys[y]]
					tmp.el["pres_eff_"+x+"_"+y].setTxt(eff[1](tmp.prestiges.eff[x][keys[y]]))
				}
			}
		}
	}
	tmp.el["as_reward_name"].setTxt(ASCENSIONS.fullNames[player.as_reward])
	for (let x = 0; x < AS_LEN; x++) {
		tmp.el["as_reward_div_"+x].setDisplay(player.as_reward == x)
		if (player.as_reward == x) {
			let keys = Object.keys(ASCENSIONS.rewards[x])
			for (let y = 0; y < keys.length; y++) {
				let unl = player.ascensions[x].gte(keys[y])
				tmp.el["as_reward_"+x+"_"+y].setDisplay(unl)
				if (unl) if (tmp.el["as_eff_"+x+"_"+y]) {
					let eff = ASCENSIONS.rewardEff[x][keys[y]]
					tmp.el["as_eff_"+x+"_"+y].setTxt(eff[1](tmp.ascensions.eff[x][keys[y]]))
				}
			}
		}
	}
}

function updateMainUpgradesHTML() {
	if (player.main_upg_msg[0] != 0) {
		let upg1 = UPGS.main[player.main_upg_msg[0]]
		let upg2 = UPGS.main[player.main_upg_msg[0]][player.main_upg_msg[1]]
		let msg = "<span class='sky'>"+(typeof upg2.desc == "function" ? upg2.desc() : upg2.desc)+"</span><br><span>Cost: "+(upg1.res == "Infinity Mass"?formatMass:format)(upg2.cost.pow(player.main_upg_msg[1] >= 13 && player.main_upg_msg[1] <= 15 && player.prestiges[0].gte(50) && upg1.res == "Atom"?1/20000:1),0)+" "+upg1.res+"</span>"
		if (upg2.effDesc !== undefined) msg += "<br><span class='green'>Currently: "+tmp.upgs.main[player.main_upg_msg[0]][player.main_upg_msg[1]].effDesc+"</span>"
		tmp.el.main_upg_msg.setHTML(msg)
	} else tmp.el.main_upg_msg.setTxt("")
	for (let x = 1; x <= UPGS.main.cols; x++) {
		let id = UPGS.main.ids[x]
		let upg = UPGS.main[x]
		let unl = upg.unl()
		tmp.el["main_upg_"+x+"_div"].changeStyle("visibility", unl?"visible":"hidden")
		tmp.el["main_upg_"+x+"_res"].setTxt(`You have ${x==5?formatMass(upg.getRes()):upg.getRes().format(0)} ${upg.res}`)
		if (unl) {
			for (let y = 1; y <= upg.lens; y++) {
				let unl2 = upg[y].unl ? upg[y].unl() : true
				tmp.el["main_upg_"+x+"_"+y].changeStyle("visibility", unl2?"visible":"hidden")
				if (unl2) tmp.el["main_upg_"+x+"_"+y].setClasses({img_btn: true, locked: !upg.can(y), bought: player.mainUpg[id].includes(y)})
			}
			tmp.el["main_upg_"+x+"_auto"].setDisplay(upg.auto_unl ? upg.auto_unl() : false)
			tmp.el["main_upg_"+x+"_auto"].setTxt(player.auto_mainUpg[id]?"ON":"OFF")
		}
	}
}

function updateBlackHoleHTML() {
	tmp.el.bhMass2.setHTML(formatMass(player.bh.mass)+formatGain(player.bh.mass, tmp.bh.mass_gain.mul(tmp.preQUGlobalSpeed), true))
	tmp.el.bhMassPower.setTxt(format(tmp.bh.massPowerGain))
	tmp.el.bhFSoft1.setDisplay(tmp.bh.f.gte(tmp.bh.fSoftStart))
	if(hasUpgrade('bh',17))tmp.el.bhFSoft1.setDisplay(false)
	tmp.el.bhFSoftStart1.setTxt(format(tmp.bh.fSoftStart))
	tmp.el.bhMassPower2.setTxt(format(tmp.bh.massPowerGain))
	tmp.el.massSoft2.setDisplay(tmp.bh.mass_gain.gte(tmp.bh.massSoftGain))
	tmp.el.massSoftStart2.setTxt(formatMass(tmp.bh.massSoftGain))

	tmp.el.bhOverflow.setDisplay(tmp.bh.mass_gain.gte(tmp.bhOverflowStart))
	tmp.el.bhOverflow3.setDisplay(hasElement(327));
	tmp.el.bhOverflow2.setTxt(format(tmp.bhOverflow))
	tmp.el.bhEffect.setTxt(format(tmp.bh.effect))

	tmp.el.bhCondenser_lvl.setTxt(format(player.bh.condenser,0)+(hasAscension(0,26)?" x "+format((tmp.bh.condenser_bonus||E(0)).add(1),0):(tmp.bh.condenser_bonus.gte(1)?" + "+format(tmp.bh.condenser_bonus,0):"")))
	tmp.el.bhCondenser_btn.setClasses({btn: true, locked: !FORMS.bh.condenser.can()})
	tmp.el.bhCondenser_scale.setTxt(getScalingName('bh_condenser'))
	tmp.el.bhCondenser_cost.setTxt(format(tmp.bh.condenser_cost,0))
	tmp.el.bhCondenser_pow.setTxt(format(tmp.bh.condenser_eff.pow))
	tmp.el.bhCondenserEffect.setHTML(format(tmp.bh.condenser_eff.eff))
	tmp.el.bhCondenser_auto.setDisplay(FORMS.bh.condenser.autoUnl())
	tmp.el.bhCondenser_auto.setTxt(player.bh.autoCondenser?"ON":"OFF")
	
}

function updateOptionsHTML() {
	for (let x = 0; x < CONFIRMS.length; x++) {
		let unl = 
		CONFIRMS[x] == "sn"
		?(player.supernova.times.gte(1) || quUnl() || player.superGal.gte(1))
		:CONFIRMS[x] == "qu"
		?(quUnl() || player.superGal.gte(1))
		:CONFIRMS[x] == "br"
		?(player.qu.rip.first || player.superGal.gte(1))
		:CONFIRMS[x] == "inf"
		?(player.inf.times.gte(1) || player.superGal.gte(1))
		:CONFIRMS[x] == "et"
		?(player.et.times.gte(1) || player.superGal.gte(1))
		:CONFIRMS[x] == "sg"
		?(player.superGal.gte(1))
		:CONFIRMS[x] == "exotic"
		?(player.exotic.times.gte(1))
		:(player.sun.shard.gte(1))	
		?(player.superGal.gte(1))
		:CONFIRMS[x] == "sunshard"

		tmp.el["confirm_div_"+x].setDisplay(unl)
		tmp.el["confirm_btn_"+x].setTxt(player.confirms[CONFIRMS[x]] ? "ON":"OFF")
	}
	tmp.el.total_time.setTxt(formatTime(player.time))
	tmp.el.offline_active.setTxt(player.offline.active?"ON":"OFF")
	tmp.el.mass_display.setTxt(player.mass_display==1?"始终显示克":player.mass_display==2?"始终显示宇宙":player.mass_display==3?"始终显示多宇宙":"正常显示")
	tmp.el.show_supernova.setTxt(player.show_supernova==1?"隐藏":"显示")
	tmp.el.tree_anim_btn.setDisplay(player.supernova.times.gte(1) || quUnl())
	tmp.el.tree_anim.setTxt(TREE_ANIM[player.options.tree_animation])

	tmp.el.omega_badge.setDisplay(localStorage.getItem("imr_secret_badge1") == "1")
}

function updateHTML() {
	document.documentElement.style.setProperty('--font', player.options.font)
	document.documentElement.style.setProperty('--cx', tmp.cx)
	document.documentElement.style.setProperty('--cy', tmp.cy)
	
	tmp.el.offlineSpeed.setTxt(format(tmp.offlineMult))
	tmp.el.loading.setDisplay(tmp.offlineActive)
    tmp.el.app.setDisplay(tmp.offlineActive ? false : ((player.supernova.times.lte(0) && !player.supernova.post_10 ? !tmp.supernova.reached : true) && tmp.tab != 5))
	updateSupernovaEndingHTML()
	updateTabsHTML()
	if ((!tmp.supernova.reached || player.supernova.post_10) && tmp.tab != 5) {
		updateUpperHTML()
		updateInfinityHTML()
		updateQuantumHTML()
		if (tmp.tab == 0) {
			if (tmp.stab[0] == 0) {
				updateRanksHTML()
				updateMassUpgradesHTML()
				updateTickspeedHTML()
				
				tmp.el.mass_softcaps.setDisplay(tmp.rank_tab == 0);
				tmp.el.massSoft1.setDisplay(tmp.massGain.gte(tmp.massSoftGain) && player.ranks.hex.lt(1))
				tmp.el.massSoftStart1.setTxt(formatMass(tmp.massSoftGain))
				tmp.el.massSoft3.setDisplay(tmp.massGain.gte(tmp.massSoftGain2) && player.ranks.hex.lt(4))
				tmp.el.massSoftStart3.setTxt(formatMass(tmp.massSoftGain2))
				tmp.el.massSoft4.setDisplay(tmp.massGain.gte(tmp.massSoftGain3) && player.ranks.hex.lt(8))
				tmp.el.massSoftStart4.setTxt(formatMass(tmp.massSoftGain3))
				tmp.el.massSoft5.setDisplay(tmp.massGain.gte(tmp.massSoftGain4) && player.ranks.hex.lt(13))
				tmp.el.massSoftStart5.setTxt(formatMass(tmp.massSoftGain4))
				tmp.el.massSoft6.setDisplay(tmp.massGain.gte(tmp.massSoftGain5) && player.ranks.hex.lt(21))
				tmp.el.massSoftStart6.setTxt(formatMass(tmp.massSoftGain5))
				tmp.el.massSoft7.setDisplay(tmp.massGain.gte(tmp.massSoftGain6) && player.ranks.hex.lt(33))
				tmp.el.massSoftStart7.setTxt(formatMass(tmp.massSoftGain6))
				tmp.el.massSoft8.setDisplay(tmp.massGain.gte(tmp.massSoftGain7) && player.ranks.hex.lt(54))
				tmp.el.massSoftStart8.setTxt(formatMass(tmp.massSoftGain7))
				tmp.el.massSoft9.setDisplay(tmp.massGain.gte(tmp.massSoftGain8) && player.ranks.hex.lt(64))
				tmp.el.massSoftStart9.setTxt(formatMass(tmp.massSoftGain8))
				tmp.el.massSoft10.setDisplay(tmp.massGain.gte(tmp.massSoftGain9) && player.ranks.hex.lt(75))
				tmp.el.massSoftStart10.setTxt(formatMass(tmp.massSoftGain9))
				
				
				tmp.el.massOverflow.setDisplay(tmp.massGain.gte(tmp.massOverflowStart) && !hasUpgrade('exotic',1))
				tmp.el.massOverflow2.setTxt(format(tmp.massOverflow))
				tmp.el.massOverflow2.setTxt(format(tmp.massOverflow))
				tmp.el.rankCollapse.setDisplay(tmp.rankCollapse.gt(1))
				tmp.el.rankCollapse2.setTxt(format(tmp.rankCollapse))
				tmp.el.strongerOverflow.setDisplay(tmp.strongerOverflow.lt(1))
				tmp.el.strongerOverflow2.setTxt(format(tmp.strongerOverflow))
				tmp.el.masscholestasispower.setTxt(format(tmp.masscholestasispower))
				tmp.el.masscholestasis.setDisplay(player.mass.gte("eee100"))
			}
			if (tmp.stab[0] == 1) {
				updateBlackHoleHTML()
			}
			if (tmp.stab[0] == 2) {
				updateAtomicHTML()
			}
			if (tmp.stab[0] == 3) {
				updateStarsHTML()
			}
			if (tmp.stab[0] == 6) {
				if(player.superCluster.gte(21)){
					tmp.el.stellarAmt.setHTML(formatMass(player.stellar,0)+player.stellar.formatGain(tmp.stellar.gain,1));
					tmp.el.stellarEff.setHTML(format(tmp.stellar.eff));
					tmp.el.stellar_gen_lvl.setTxt(format(player.stellar_gen,0))
					tmp.el.stellar_gen_btn.setClasses({btn: true, locked: !tmp.stellar.can})
					tmp.el.stellar_gen_cost.setTxt(format(tmp.stellar.cost,0))
					tmp.el.stellar_gen_pow.setTxt(format(tmp.stellar.pow))
					tmp.el.stellar_gen_eff.setHTML(format(tmp.stellar.gen_eff))
				}
			}
		}
		if (tmp.tab == 1) {
			if (tmp.stab[1] == 0) updateRanksRewardHTML()
			if (tmp.stab[1] == 1) updateScalingHTML()
			if (tmp.stab[1] == 2) updatePrestigesRewardHTML()
			if (tmp.stab[1] == 3) updatePrestigesRewardHTML()
		}
		if (tmp.tab == 2) {
			updateMainUpgradesHTML()
		}
		if (tmp.tab == 3) {
			updateChalHTML()
		}
		if (tmp.tab == 4) {
			if (tmp.stab[4] == 0) updateAtomHTML()
			if (tmp.stab[4] == 1) updateElementsHTML()
			if (tmp.stab[4] == 2) updateMDHTML()
			if (tmp.stab[4] == 3) updateBDHTML()
			if (tmp.stab[4] == 4) updateAtomHTML()
		}
		if (tmp.tab == 7) {
			updateExoticHTML()
		}
		if (tmp.tab == 8) {
			updateOptionsHTML()
		}
	}
}