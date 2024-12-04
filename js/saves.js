function E(x){return new Decimal(x)};

const EINF = Decimal.dInf

function uni(x) { return E(1.5e56).mul(x) }
function mlt(x) { return uni("ee9").pow(x) }
Decimal.prototype.tetraflow = function (number,start,power) { // EXPERIMENTAL FUNCTION - x => 10^^((slog10(x)-slog10(s))*p+slog10(s))
    if(isNaN(number.mag))return new Decimal(0);
	start=E(start);
	if(number.gte(start)){
        let s = start.slog(10)
        // Fun Fact: if 0 < number.slog(10) - start.slog(10) < 1, such like overflow(number,start,power,start.slog(10).sub(1).floor())
		number=Decimal.tetrate(10,number.slog(10).sub(s).mul(power).add(s))
	}
	return number;
}
Decimal.prototype.modular=Decimal.prototype.mod=function (other){
    other=E(other);
    if (other.eq(0)) return E(0);
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
};

Decimal.prototype.softcap = function (start, power, mode) {
    var x = this.clone()
    if (x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start)
    }
    return x
}

Decimal.prototype.scale = function (s, p, mode, rev=false) {
    s = E(s)
    p = E(p)
    var x = this.clone()
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)))
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
    }
    return x
}

Decimal.prototype.scaleName = function (type, id, rev=false) {
    var x = this.clone()
    if (SCALE_START[type][id] && SCALE_POWER[type][id]) {
        let s = getScalingStart(type,id)
        let p = getScalingPower(type,id)
		if(type=="meta"){
			if (x.gte(s)) {
				x = rev ? x.div(s).max(1).log(SCALE_POWER[type][id]).div(p).add(s).min(x) : Decimal.pow(SCALE_POWER[type][id],x.sub(s).mul(p)).mul(s).max(x)
			}
			return x
		}
        let e = Decimal.pow(SCALE_POWER[type][id],p)
        
        x = x.scale(s,e,type=="meta"?1:0,rev)
    }
    return x
}

Decimal.prototype.scaleEvery = function (id, rev=false, fp=SCALE_FP[id]?SCALE_FP[id]():[1,1,1,1]) {
    var x = this.clone()
	if(!rev)x = x.scaleName("exotic",id,rev)
    for (let i = 0; i < 4; i++) {
        let s = rev?i:3-i
        let sc = SCALE_TYPE[s]

        x = rev?x.mul(fp[s]).scaleName(sc,id,rev):x.scaleName(sc,id,rev).div(fp[s])
    }
	if(rev)x = x.scaleName("exotic",id,rev)
    return x
}

Decimal.prototype.format = function (acc=4, max=12) { return format(this.clone(), acc, max) }

Decimal.prototype.formatGain = function (gain, mass=false) { return formatGain(this.clone(), gain, mass) }

function softcapHTML(x, start) { return E(x).gte(start)?`<span class='soft'>(softcapped)</span>`:"" }

Decimal.prototype.softcapHTML = function (start) { return softcapHTML(this.clone(), start) }

function calc(dt, dt_offline) {
    let du_gs = tmp.preQUGlobalSpeed.mul(dt)

    if (tmp.pass) {
        player.mass = player.mass.add(tmp.massGain.mul(du_gs))
        if (player.mainUpg.rp.includes(3)) for (let x = 1; x <= UPGS.mass.cols; x++) if (player.autoMassUpg[x] && (player.ranks.rank.gte(x) || player.mainUpg.atom.includes(1))) UPGS.mass.buyMax(x)
        for (let x = 1; x <= UPGS.prestigeMass.cols; x++) if (player.autoprestigeMassUpg[x] &&  UPGS.prestigeMass[x].unl()) UPGS.prestigeMass.buyMax(x)
        for (let x = 1; x <= UPGS.ascensionMass.cols; x++) if (player.autoascensionMassUpg[x] &&  UPGS.ascensionMass[x].unl()) UPGS.ascensionMass.buyMax(x)
		if (FORMS.tickspeed.autoUnl() && player.autoTickspeed) FORMS.tickspeed.buyMax()
        if (FORMS.accel.autoUnl() && player.autoAccel) FORMS.accel.buyMax()
		if (FORMS.prestige_tickspeed.autoUnl() && player.autoPrestigeTickspeed) FORMS.prestige_tickspeed.buyMax()
        if (FORMS.bh.condenser.autoUnl() && player.bh.autoCondenser) FORMS.bh.condenser.buyMax()
		if (FORMS.prestigeBHC.autoUnl() && player.autoPrestigeBHC) FORMS.prestigeBHC.buyMax()
        if (hasElement(18) && player.atom.auto_gr) ATOM.gamma_ray.buyMax()
        if (hasElement(131) && player.qu.auto_cs) QUANTUM.cosmic_str.buyMax()
        if (player.mass.gte(1.5e136)) player.chal.unl = true
        for (let x = 0; x < RANKS.names.length; x++) {
            let rn = RANKS.names[x]
            if (RANKS.autoUnl[rn]() && player.auto_ranks[rn]) RANKS.bulk(rn)
        }
        for (let x = 1; x <= UPGS.main.cols; x++) {
            let id = UPGS.main.ids[x]
            let upg = UPGS.main[x]
            if (upg.auto_unl ? upg.auto_unl() : false) if (player.auto_mainUpg[id]) for (let y = 1; y <= upg.lens; y++) if (upg[y].unl ? upg[y].unl() : true) upg.buy(y)
        }
        if (player.mainUpg.bh.includes(6) || player.mainUpg.atom.includes(6)) player.rp.points = player.rp.points.add(tmp.rp.gain.mul(du_gs))
        if (player.mainUpg.atom.includes(6)) player.bh.dm = player.bh.dm.add(tmp.bh.dm_gain.mul(du_gs))
        if (hasElement(14)) player.atom.quarks = player.atom.quarks.add(tmp.atom.quarkGain.mul(du_gs.mul(tmp.atom.quarkGainSec)))
        if (hasElement(24)) player.atom.points = player.atom.points.add(tmp.atom.gain.mul(du_gs))
        if (hasElement(30) && !(CHALS.inChal(9) || CHALS.inChal(14) || CHALS.inChal(19) || FERMIONS.onActive("12"))) for (let x = 0; x < 3; x++) player.atom.particles[x] = player.atom.particles[x].add(player.atom.quarks.mul(du_gs).div(10))
        if (hasElement(43)) for (let x = 0; x < MASS_DILATION.upgs.ids.length; x++) if ((hasTree("qol3") || player.md.upgs[x].gte(1)) && (MASS_DILATION.upgs.ids[x].unl?MASS_DILATION.upgs.ids[x].unl():true)) MASS_DILATION.upgs.buy(x)
        if (hasElement(312)) for (let x = 0; x < 3; x++) player.galParticles[x] = player.galParticles[x].add(player.galQk.mul(dt))
        if (hasTree("qu_qol13")) for (let x = 0; x < MASS_DILATION.break.upgs.ids.length; x++) MASS_DILATION.break.upgs.buy(x)
        if (player.bh.unl && !player.qu.en.hr[0]) player.bh.mass = player.bh.mass.add(tmp.bh.mass_gain.mul(du_gs))
        if (player.atom.unl) {
            player.atom.atomic = player.atom.atomic.add(tmp.atom.atomicGain.mul(du_gs))
            for (let x = 0; x < 3; x++) player.atom.powers[x] = player.atom.powers[x].add(tmp.atom.particles[x].powerGain.mul(du_gs))
        }
        if (hasTree("qol1")) for (let x = 1; x <= tmp.elements.unl_length && x <= 118; x++) if (x<=tmp.elements.upg_length) ELEMENTS.buyUpg(x,1)
            if (player.sun.shard.gte(1) )for (let x = 1; x <= tmp.elements.unl_length && x <= 362; x++) if (x<=tmp.elements.upg_length) ELEMENTS.buyUpg(x,1)
        player.md.mass = player.md.mass.add(tmp.md.mass_gain.mul(du_gs))
        if (hasTree("qol3")) player.md.particles = player.md.particles.add(player.md.active ? tmp.md.rp_gain.mul(du_gs) : tmp.md.passive_rp_gain.mul(du_gs))
        if (hasTree("qol4")) STARS.generators.unl(true)
        if (hasTree("qol7")) {
            for (let x = 0; x < BOSONS.upgs.ids.length; x++) {
                let id = BOSONS.upgs.ids[x]
                for (let y = 0; y < BOSONS.upgs[id].length; y++) BOSONS.upgs.buy(id,y)
            }
        }
        RADIATION.autoBuyBoosts()
        calcStars(du_gs)
        calcSupernova(dt, dt_offline)
        calcQuantum(dt, dt_offline)

        if (hasTree("qu_qol4")) SUPERNOVA.reset(false,false,true)
        if (hasTree("yebs12")) 	SUPERNOVA_CLUSTER.reset(false,false,true)
        if (hasTree("yebs13")) 	MATTERS.fssReset()(false,false,true)   
        if (hasTree("qol6")) CHALS.exit(true)
        if ((CHALS.inChal(0) || player.chal.active >= 13) && player.chal.active!=17&& player.chal.active!=19) {
    
            if (hasTree("qu_qol3")) for (let x = 1; x <= 4; x++) player.chal.comps[x] = player.chal.comps[x].max(tmp.chal.bulk[x].min(tmp.chal.max[x]))
            if (hasTree("qu_qol5")) for (let x = 5; x <= 8; x++) player.chal.comps[x] = player.chal.comps[x].max(tmp.chal.bulk[x].min(tmp.chal.max[x]))
            if (hasTree("qu_qol7a")) for (let x = 9; x <= 12; x++) player.chal.comps[x] = player.chal.comps[x].max(tmp.chal.bulk[x].min(tmp.chal.max[x]))
        }
		if (hasElement(286)) player.chal.comps[13] = player.chal.comps[13].max(tmp.chal.bulk[13].min(tmp.chal.max[13]))
		if (hasElement(302)) player.chal.comps[14] = player.chal.comps[14].max(tmp.chal.bulk[14].min(tmp.chal.max[14]))
		if (hasElement(302)) player.chal.comps[15] = player.chal.comps[15].max(tmp.chal.bulk[15].min(tmp.chal.max[15]))
		if (hasElement(318)) player.chal.comps[16] = player.chal.comps[16].max(tmp.chal.bulk[16].min(tmp.chal.max[16]))
		if (hasElement(318)) player.chal.comps[17] = player.chal.comps[17].max(tmp.chal.bulk[17].min(tmp.chal.max[17]))
		if (hasElement(318)) player.chal.comps[18] = player.chal.comps[18].max(tmp.chal.bulk[18].min(tmp.chal.max[18]))
		if (hasElement(322)) player.chal.comps[19] = player.chal.comps[19].max(tmp.chal.bulk[19].min(tmp.chal.max[19]))
		if (hasElement(393)) player.chal.comps[20] = player.chal.comps[20].max(CHALS.getChalData(20,E(-1),1).bulk.min(tmp.chal.max[20]))
		calcPrestigeMass(dt, dt_offline)
        calcInfinity(dt, dt_offline)
        calcSupernovaGalaxy(dt, dt_offline)
        calcExotic(dt, dt_offline)
      
    }

    tmp.pass = true

    player.offline.time = Math.max(player.offline.time-tmp.offlineMult*dt_offline,0)
    player.time += dt

	tmp.dt = dt

    tmp.tree_time = (tmp.tree_time+dt_offline) % 3

    if (player.chal.comps[10].gte(1) && !player.supernova.fermions.unl) {
        player.supernova.fermions.unl = true
        addPopup(POPUP_GROUPS.fermions)
    }
}

function getPlayerData() {
    let s = {
        mass: E(0),
        ranks: {
            rank: E(0),
            tier: E(0),
            tetr: E(0),
            pent: E(0),
            hex: E(0),
            hept: E(0),
            oct: E(0),
            enne: E(0),
        },
        auto_ranks: {
            rank: false,
            tier: false,
        },
        prestiges: [],
        ascensions: [],
        prestigeMass: E(0),
        ascensionMass: E(0),
        prestigeMassUpg: [E(0), E(0), E(0), E(0), E(0)],
        ascensionMassUpg: [E(0), E(0), E(0), E(0), E(0)],
		prestigeRP: E(0),
		prestigeTickspeed: E(0),
		prestigeBH: E(0),
		prestigeDM: E(0),
		prestigeBHC: E(0),
        prestigeAT: E(0),
        prestigeQK: E(0),
        prestigeST: E(0),
        auto_mainUpg: {
            
        },
        massUpg: {},
        autoMassUpg: [null,false,false,false],
        autoprestigeMassUpg: [null,false,false,false],
        autoascensionMassUpg: [null,false,false,false],
        autoTickspeed: false,
		autoPrestigeTickspeed: false,
        mainUpg: {
            
        },
        ranks_reward: 0,
        pres_reward: 0,
        as_reward: 0,
        scaling_ch: 0,
        rp: {
            points: E(0),
            unl: false,
        },
        bh: {
            unl: false,
            dm: E(0),
            mass: E(0),
            condenser: E(0),
            autoCondenser: false,
        },
        chal: {
            unl: false,
            active: 0,
            choosed: 0,
            comps: {},
        },
        atom: {
            unl: false,
            points: E(0),
            atomic: E(0),
            auto_gr: false,
            gamma_ray: E(0),
            quarks: E(0),
            particles: [E(0), E(0), E(0)],
            powers: [E(0), E(0), E(0)],
            ratio: 0,
            dRatio: [1,1,1],
            elements: [],
            chargedElements: [],
        },
        md: {
            active: false,
            particles: E(0),
            mass: E(0),
            upgs: [],

            break: {
                active: false,
                energy: E(0),
                mass: E(0),
                upgs: [],
            },
        },
        stars: {
            unls: 0,
            boost: E(0),
            points: E(0),
            generators: [E(0),E(0),E(0),E(0),E(0)],
        },
        supernova: {
            times: E(0),
            post_10: false,
            stars: E(0),
            tree: [],
            chal: {
                noTick: true,
                noBHC: true,
            },
            bosons: {
                pos_w: E(0),
                neg_w: E(0),
                z_boson: E(0),
                photon: E(0),
                gluon: E(0),
                graviton: E(0),
                hb: E(0),
            },
            b_upgs: {
                photon: [],
                gluon: [],
            },
            fermions: {
                unl: false,
                points: [E(0),E(0)],
                tiers: [[E(0),E(0),E(0),E(0),E(0),E(0)],[E(0),E(0),E(0),E(0),E(0),E(0)],[E(0),E(0),E(0),E(0),E(0),E(0)],[E(0),E(0),E(0),E(0),E(0),E(0)]],
                choosed: "",
            },
            radiation: {
                hz: E(0),
                ds: [],
                bs: [],
            },
        },
        reset_msg: "",
        main_upg_msg: [0,0],
        tickspeed: E(0),
        accelerator: E(0),
        options: {
            font: 'Verdana',
            notation: 'sc',
            tree_animation: 0,
        },
        confirms: {},
        offline: {
            active: true,
            current: Date.now(),
            time: 0,
        },
        time: 0,
		inf: {
			reached: false,
			points: E(0),
			times: E(0)
		},
		et: {
			points: E(0),
			times: E(0),
			shards: E(0),
			shard_gen: E(0)
		},
		superGal: E(0),
		galQk: E(0),
		galPow: [E(0),E(0),E(0),E(0),E(0),E(0),E(0)],
		galParticles: [E(0), E(0), E(0)],
		gc: {
			depth: 0,
			trap: 0,
			shard: E(0),
            active: false,
		},
		exotic: {
			points: E(0),
			times: E(0),
			rcb: [E(0), E(0), E(0), E(0)],
			ax: [E(0), E(0), E(0), E(0)],
			axg: [E(0), E(0), E(0), E(0)],
			bp: E(0),
			boosts: [],
			matters: [],
			
			dr: E(0),
			ds: E(0),
			ab: E(0),
			fss: E(0),
			
			dark_run: {
				points: E(0),
            	upgs: [],
			},
            tree: [],
		},
        sun: {
			shard: E(0),
            shardgain: E(0),
			times: E(0),
            tree: [],
		},
		superCluster: E(0),
		stardust: E(0),
		stellar: E(0),
		stellar_gen: E(0),
    }
    for (let x = 0; x < EXOTIC_BOOST_LENGTH; x++) s.exotic.boosts.push(E(0))
    for (let x = 0; x < MATTERS_LENGTH; x++) s.exotic.matters.push(E(0))
    for (let x = 0; x < PRES_LEN; x++) s.prestiges.push(E(0))
    for (let x = 0; x < AS_LEN; x++) s.ascensions.push(E(0))
    for (let x = 1; x <= UPGS.main.cols; x++) {
        s.auto_mainUpg[UPGS.main.ids[x]] = false
        s.mainUpg[UPGS.main.ids[x]] = []
    }
    for (let x = 1; x <= CHALS.cols; x++) s.chal.comps[x] = E(0)
    for (let x = 0; x < CONFIRMS.length; x++) s.confirms[CONFIRMS[x]] = true
    for (let x = 0; x < MASS_DILATION.upgs.ids.length; x++) s.md.upgs[x] = E(0)
    for (let x = 0; x < MASS_DILATION.break.upgs.ids.length; x++) s.md.break.upgs[x] = E(0)
    for (let x = 0; x < DARK_RUN.upgs.ids.length; x++) s.exotic.dark_run.upgs[x] = E(0)
    for (let x in BOSONS.upgs.ids) for (let y in BOSONS.upgs[BOSONS.upgs.ids[x]]) s.supernova.b_upgs[BOSONS.upgs.ids[x]][y] = E(0)
    for (let x = 0; x < 7; x++) {
        s.supernova.radiation.ds.push(E(0))
        s.supernova.radiation.bs.push(E(0),E(0))
    }
    s.qu = getQUSave()
    return s
}

function wipe(reload=false) {
    if (reload) {
        wipe()
		tmp.supernova.reached = false
        save()
        resetTemp()
        loadGame(false)
    }
    else player = getPlayerData()
}

function loadPlayer(load) {
    const DATA = getPlayerData()
	if(load.dim_shard>0){
		alert("Saves from Incremental Mass Rewritten Vanilla 1.0 beta or above is not supported in this NG+ Version!");
		return true;
	}
	if(load.dark){
		let check=false;
		if(new Decimal(load.dark.rays).gt(0))check=true;
		if(new Decimal(load.dark.shadow).gt(0))check=true;
		if(check){
			alert("Saves from Incremental Mass Rewritten Vanilla 0.6 or above is not supported in this NG+ Version!");
			return true;
		}else delete load.dark;
	}
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
    convertStringToDecimal()
    player.qu.qc.presets = player.qu.qc.presets.slice(0,5)
    player.reset_msg = ""
    player.main_upg_msg = [0,0]
    player.chal.choosed = 0
    for (i = 0; i < 2; i++) for (let x = 0; x < FERMIONS.types[i].length; x++) {
        let f = FERMIONS.types[i][x]
        player.supernova.fermions.tiers[i][x] = player.supernova.fermions.tiers[i][x].min(typeof f.maxTier == "function" ? f.maxTier() : f.maxTier||1/0)
    }
    let off_time = (Date.now() - player.offline.current)/1000
    if (off_time >= 60 && player.offline.active) player.offline.time += off_time
}

function deepNaN(obj, data) {
    for (let x = 0; x < Object.keys(obj).length; x++) {
        let k = Object.keys(obj)[x]
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let x = 0; x < Object.keys(data).length; x++) {
        let k = Object.keys(data)[x]
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function convertStringToDecimal() {
    for (let x = 1; x <= UPGS.mass.cols; x++) if (player.massUpg[x] !== undefined) player.massUpg[x] = E(player.massUpg[x])
    for (let x = 1; x <= CHALS.cols; x++) player.chal.comps[x] = E(player.chal.comps[x])
    for (let x = 0; x < MASS_DILATION.upgs.ids.length; x++) player.md.upgs[x] = E(player.md.upgs[x]||0)
    for (let x = 0; x < MASS_DILATION.break.upgs.ids.length; x++) player.md.break.upgs[x] = E(player.md.break.upgs[x]||0)
    for (let x in BOSONS.upgs.ids) for (let y in BOSONS.upgs[BOSONS.upgs.ids[x]]) player.supernova.b_upgs[BOSONS.upgs.ids[x]][y] = E(player.supernova.b_upgs[BOSONS.upgs.ids[x]][y]||0)
}

function cannotSave() { return tmp.supernova.reached && player.supernova.times.lt(1) && !quUnl() }

function save(){
    let str = btoa(JSON.stringify(player))
    if (cannotSave() || findNaN(str, true)) return
    if (localStorage.getItem("testSave") == '') wipe()
    localStorage.setItem("testSave",str)
    tmp.prevSave = localStorage.getItem("testSave")
    if (tmp.saving < 1) {addNotify("Game Saved", 3); tmp.saving++}
}

function load(x){
    if(typeof x == "string" & x != ''){
        return loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
		return false
    }
}

function exporty() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }
    save();
    let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Incremental Mass Rewritten 22222's NG+2 Save - "+new Date().toGMTString()+".txt"
    a.click()
}

function export_copy() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }

    let copyText = document.getElementById('copy')
    copyText.value = str
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
    addNotify("Copied to Clipboard")
}

function importy() {
    let loadgame = prompt("在方框内输入您的存档代码。注意：会覆盖现有游戏的进度。")
    if (ssf[2](loadgame)) return
    if (loadgame == 'monke') {
        addNotify('monke<br><img style="width: 100%; height: 100%" src="./images/cbc.jpg">')
        return
    }
    if (loadgame == 'matt parker') {
        addNotify('2+2=5<br><img src="./images/106175au.jpg">')
        return
    }
    if (loadgame == 'SUPERNOVA.get()') {
        addNotify('<img src="./images/22687C6536A50ADB3489A721A264E0EF506A89B3.gif">',6)
        return
    }
    if (loadgame != null) {
        let keep = player
        try {
            setTimeout(_=>{
                if (findNaN(loadgame, true)) {
                    addNotify("Error Importing, because it got NaNed")
                    return
                }
                if(load(loadgame))return;
                save()
                resetTemp()
                loadGame(false)
                location.reload()
            }, 200)
        } catch (error) {
            addNotify("Error Importing")
            player = keep
        }
    }
}

function loadGame(start=true, gotNaN=false) {
    if (!gotNaN) tmp.prevSave = localStorage.getItem("testSave")
    wipe()
    load(tmp.prevSave)
    setupHTML()
    updateQCModPresets()
    
    if (start) {
        setInterval(save,60000)
        for (let x = 0; x < 50; x++) updateTemp()
        updateHTML()
        for (let x = 0; x < 3; x++) {
            let r = document.getElementById('ratio_d'+x)
			let gr = document.getElementById('gratio_d'+x)
            r.value = player.atom.dRatio[x]
            gr.value = player.atom.dRatio[x]
            r.addEventListener('input', e=>{
                let n = Number(e.target.value)
                if (n < 1) {
                    player.atom.dRatio[x] = 1
                    r.value = 1
                    gr.value = 1
                } else {
                    if (Math.floor(n) != n) r.value = Math.floor(n)
					gr.value = r.value
                    player.atom.dRatio[x] = Math.floor(n)
                }
            })
            gr.addEventListener('input', e=>{
                let n = Number(e.target.value)
                if (n < 1) {
                    player.atom.dRatio[x] = 1
                    r.value = 1
                    gr.value = 1
                } else {
                    if (Math.floor(n) != n) gr.value = Math.floor(n)
					r.value = gr.value
                    player.atom.dRatio[x] = Math.floor(n)
                }
            })
        }
        document.getElementById('auto_qu_input').value = player.qu.auto.input
        document.getElementById('auto_qu_input').addEventListener('input', e=>{
            player.qu.auto.input = e.target.value
        })
        document.onmousemove = e => {
            tmp.cx = e.clientX
            tmp.cy = e.clientY
        }
        setInterval(loop, 50)
        setInterval(updateStarsScreenHTML, 50)
        treeCanvas()
        setInterval(drawTreeHTML, 10)
        setInterval(checkNaN,1)
    }
}

function checkNaN() {
    if (findNaN(player)) {
        addNotify("Game Data got NaNed")
		playerCopy = JSON.parse(JSON.stringify(player));
        resetTemp()
        loadGame(false, true)
    }
}

function findNaN(obj, str=false, data=getPlayerData()) {
    if (str ? typeof obj == "string" : false) obj = JSON.parse(atob(obj))
    for (let x = 0; x < Object.keys(obj).length; x++) {
        let k = Object.keys(obj)[x]
        if (typeof obj[k] == "number") if (isNaN(obj[k])) return true
        if (str) {
            if (typeof obj[k] == "string") if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return true
        } else {
            if (obj[k] == null || obj[k] == undefined ? false : Object.getPrototypeOf(obj[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return true
        }
        if (typeof obj[k] == "object") return findNaN(obj[k], str, data[k])
    }
    return false
}

function overflow(number, start, power){
	if(isNaN(number.mag))return new Decimal(0);
	start=E(start);
	if(number.gte(start)){
		number=number.log10().div(start.log10()).pow(power).mul(start.log10());
		number=Decimal.pow(10,number);
	}
	return number;
}