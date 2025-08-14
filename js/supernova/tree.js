const TREE_TAB = [
    {title: "Main"},
    {title: "Quality of life"},
    {title: "Challenge"},
    {title: "Post-Supernova", unl() { return player.supernova.post_10 } },
    {title: "Quantum", unl() { return quUnl() } },
    {title: "量子+", unl() { return hasChargedElement(118) } },
    {title: "轴子", unl() { return hasElement(556) } },
    {title: "星图", unl() { return false   } },
]

const TREE_IDS = [
    [
        ['c'],
        ['qol1','','','','qu_qol1',''],
        ['chal1'],
        ['bs4','bs1','','qf1','','rad1'],
        ['qu0'],
		['qp17'],
		['ax15','ax8','ax4','ax2','ax1','ax3','ax5','ax7','ax14'],
        ['','','grbs13','',''],
    ],[
        ['s1','m1','rp1','bh1','sn1'],
        ['qol2','qol3','qol4','qu_qol2','qu_qol3','qu_qol4','qu_qol5','qu_qol6'],
        ['chal2','chal4a','chal4b','chal3'],
        ['bs5','bs2','fn1','bs3','qf2','qf3','rad2','rad3'],
        ['qu1','qu2','qu3'],
        ['qp38','qp1','qp10','qp39'],
		['ax25','ax21','ax17','ax10','ax6','ax9','ax16','ax22','ax26'],
        ['','','yedo3','yebs13',''],
    ],[
        ['s2','m2','t1','d1','bh2','gr1','sn2'],
        ['qol5','qol6','qol7','','qu_qol7a','qu_qol7','',''],
        ['chal4','chal7a'],
        ['fn4','fn3','fn9','fn2','fn5','qf4','rad4','rad5'],
        ['prim3a','prim3','prim2','prim1','qu4','qc1','qc2','qc3','qc8'],
        ['qp21','qp6','qp2','qp3','qp4','qp5','qp22'],
		['ax29','ax27','ax18','ax12','ax11','ax13','ax19','ax28','ax30'],
        ['','','rebs13','',''],
    ],[
        ['s3','m3','gr2','sn3'],
        ['qol9','unl1','qol8','unl2','unl3','qu_qol8','qu_qol9','unl4'],
        ['chal5','chal6','chal7','chal8'],
        ['fn12','fn11','fn6','fn10','rad6',''],
        ['','','','prim4','en2','en1','qu5','br1','br2','qc4','qc5','qc6','qc7'],
        ['qp23','qp9','qp7','qp8','qp11','qp24'],
		['ax39','ax34','ax32','ax23','ax20','ax24','ax31','ax35','ax38'],
        ['','','grbs12','',''],
    ],[
        ['s4','sn5','sn4'],
        ['','','','qu_qol10','qu_qol11','qu_qol8a','qu_qol13','qu_qol12'],
        ['chal9','chal10','chal11','chal12'],
        ['fn13','fn14','fn7','fn8','pm1',''],
        ['','','prim5','','','qu6','qu7','qu8','qu9','qu10','qu11'],
        ['qp40','qp16','qp14','qp12','qp13','qp15','qp41'],
		['ax40','ax36','ax33','ax37','ax41'],
        ['','','yedo2','','yebs11'],
    ],[
        ['s5','sn6'],
        [],
        ['chal13','chal14'],
        ['fn18','fn16','fn17','fn15','pm2','im1'],
        ['','','prim6','prim7','prim8','','','','','qu12','br3'],
        ['qp30','qp25','qp19','qp18','qp26','qp33'],
		['ax42'],
        ['yebs12','bldo2','blbs11','yedo1','rebs11','bldo1','grbs11'],
    ],[
        [],
        [],
        [],
        [],
        [],
        ['qp32','qp29','qp27','qp20','qp28','qp31','qp34'],
		[],
        ['blbs13','','blkey1','yekey2','blkey2','',''],
    ],[
        [],
        [],
        [],
        [],
        [],
        ['qp43','qp36','qp35','qp42'],
		[],
        ['blbs12','yekey1','bobo','yekey3','rebs12'],
    ],[
        [],
        [],
        [],
        [],
        [],
        ['qp37'],
		[],
        ['lt'],
    ],
]

var tree_canvas,tree_ctx,tree_update=true

const NO_REQ_SP = ['qol1','qol2','qol3','qol4','qol5',
'qol6','qol7','qol8','qol9','unl1',
'c','s2','s3','s4','sn3',
'sn4','t1','bh2','gr1','chal1',
'chal2','chal3','bs1','fn2','fn3',
'fn5','fn6']
const NO_REQ_QU = ['qu_qol1','qu_qol2','qu_qol4','qu_qol5','qu_qol6',
    'qu_qol7','qu_qol8','qu_qol9','unl2','unl3',
    'qc2','qc3','br1']
const TREE_UPGS = {
    buy(x, auto=false) {
        if(TREE_UPGS.ids[sunshard]){
           
			if(hasTree(x))return;
			if(tmp.supernova.tree_choosed != x)return;
            if (player.sun.shard.gte(this.ids[x].cost))player.sun.shard=player.sun.shard.sub(this.ids[x].cost).max(0)
            player.sunshard.tree.push(x)
			return;
		}
		if(this.ids[x].ax){
			if(auto)return;
			if(hasTree(x))return;
			if(tmp.supernova.tree_choosed != x)return;
			if (EXOTIC.axsRem().gte(this.ids[x].cost)){
				player.exotic.tree.push(x)
			}
			return;
		}
     
        if ((tmp.supernova.tree_choosed == x || auto) && tmp.supernova.tree_afford[x]) {
           
             if (this.ids[x].qf) player.qu.points = player.qu.points.sub(this.ids[x].cost).max(0)
            else  player.supernova.stars = player.supernova.stars.sub(this.ids[x].cost).max(0)
            player.supernova.tree.push(x)
        }
     
    },
    ids: {
        c: {
            req() { return player.supernova.times.gte(1) },
            reqDesc: `1次超新星。`,
            desc: `每秒产生1中子星（不受离线产能影响）.`,
            cost: E("0"),
        },
        sn1: {
            branch: ["c"],
            desc: `Tickspeed affects Neutron Star gain at a reduced rate.`,
            cost: E(10),
            effect() {
                let x = player.tickspeed.add(1).pow(0.25)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        sn2: {
            branch: ["sn1"],
            desc: `Supernova boosts Neutron Star gain.`,
            cost: E(350),
            effect() {
                let sn = player.supernova.times
                if (!hasTree("qu4")) sn = sn.softcap(15,0.8,0).softcap(25,0.5,0)
                let x = E(2).add(hasTree("sn4")?tmp.supernova.tree_eff.sn4:0).pow(sn)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        sn3: {
            branch: ["sn2"],
            desc: `Blue star boost Neutron star gain at a reduced rate.`,
            req() { return player.supernova.times.gte(6) },
            reqDesc: `6次超新星。`,
            cost: E(50000),
            effect() {
                let x = player.stars.generators[4].max(1).log10().add(1)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        sn4: {
            branch: ["sn3"],
            desc: `Tree “sn2”'s effect base is increased by Supernova.`,
            unl() { return player.supernova.post_10 },
            req() { return player.supernova.times.gte(13) },
            reqDesc: `13次超新星。`,
            cost: E(1e8),
            effect() {
				if (hasChargedElement(112))return Decimal.pow(10,Decimal.pow(10,player.supernova.times.pow(1/2)));
                let x = player.supernova.times.mul(0.1).softcap(1.5,0.75,0)
                if (hasElement(112)) x = x.add(2)
				if(hasTree('sn6'))x = Decimal.pow(10,player.supernova.times.pow(2));
                return x
            },
            effDesc(x) { return "增加"+format(x)+((x.gte(1.5) && !hasTree('sn6'))?"<span class='soft'>(softcapped)</span>":"") },
        },
        sn5: {
            branch: ["sn4"],
            desc: `Mass boosts Neutron Stars gain.`,
            unl() { return quUnl() },
            cost: E('e450'),
            effect() {
                let x = player.mass.add(1).log10().add(1).pow(2)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        sn6: {
            branch: ["sn4"],
            desc: `超新星加成中子星的获取，[sn4]的效果变得更好。`,
            unl() { return hasElement(118) },
            cost: E('e1.35e12'),
            effect() {
                let x = player.supernova.times.add(10).log10();
				if(hasElement(219))x = player.supernova.times.add(1);
                if(hasChargedElement(219))x = x.pow(9e15);
                return x
            },
            effDesc(x) { return "^"+format(x) },
        },
        m1: {
            branch: ["c"],
            desc: `Neutron star multiplies Mass gain.`,
            cost: E(100),
            effect() {
                let x = E(1e100).pow(player.supernova.stars.add(1).log10().pow(5).softcap(1e3,0.25,0))
                return x
            },
            effDesc(x) { return format(x)+"倍"+(x.max(1).log(1e100).gte(1e3)?"<span class='soft'>(softcapped)</span>":"") },
        },
        m2: {
            branch: ["m1"],
            desc: `Multiplies the Mass requirement for softcap^2 by 1.5`,
            cost: E(800),
        },
        m3: {
            branch: ["m2"],
            unl() { return player.supernova.fermions.unl && hasTree("fn1") },
            desc: `Mass gain softcap^2-3 starts later based on Supernovas.`,
            cost: E(1e46),
            effect() {
                let x = player.supernova.times.mul(0.0125).add(1)
                return x
            },
            effDesc(x) { return "延迟^"+format(x)+"" },
        },
        t1: {
            branch: ["m1", 'rp1'],
            req() { return player.supernova.chal.noTick && player.mass.gte(E("1.5e1.650056e6").pow(hasTree('bh2')?1.46:1)) },
            reqDesc() {return `在超新星中，未购买过时间速度的前提下，到达${formatMass(E("1.5e1.650056e6").pow(hasTree('bh2')?1.46:1))}的质量。您仍然可以通过宇宙射线获得免费时间速度升级。`},
            desc: `Tickspeed Power is raised to the 1.15th.`,
            cost: E(1500),
        },
        rp1: {
            branch: ["c"],
            desc: `Neutron Stars multiplies Rage Powers gain`,
            cost: E(200),
            effect() {
                let x = E(1e50).pow(player.supernova.stars.add(1).log10().pow(5).softcap(1e3,0.25,0))
                return x
            },
            effDesc(x) { return format(x)+"倍"+(x.max(1).log(1e50).gte(1e3)?"<span class='soft'>(softcapped)</span>":"") },
        },
        bh1: {
            branch: ["c"],
            desc: `Neutron Star multiplies Dark Matters gain.`,
            cost: E(400),
            effect() {
                let x = E(1e35).pow(player.supernova.stars.add(1).log10().pow(5).softcap(1e3,0.25,0))
                return x
            },
            effDesc(x) { return format(x)+"倍"+(x.max(1).log(1e35).gte(1e3)?"<span class='soft'>(softcapped)</span>":"") },
        },
        bh2: {
            branch: ['bh1'],
            req() { return player.supernova.chal.noBHC && player.bh.mass.gte("1.5e1.7556e4") },
            reqDesc() {return `在超新星中，未购买过黑洞压缩器的前提下，到达${format("e1.75e4")}宇宙的黑洞质量。`},
            desc: `BH Condenser power is raised to the 1.15th.`,
            cost: E(1500),
        },
        s1: {
            branch: ["c"],
            desc: `Neutron Star boosts last star gain.`,
            cost: E(400),
            effect() {
                let x = player.supernova.stars.add(1).pow(1.4)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        feat1: {
            unl() { return (hasUpgrade('st',5)) },
            req() { return CHALS.inChal(23) && player.bh.mass.gte("1e60000")&&player.supernova.times.gte(1) },
            reqDesc() {return `在挑战23中获得1e60000g黑洞质量和1次超新星`},
            desc: `使所有物质获取和黑洞质量变为原来的平方,蓝色物质加成夸克获取(最后生效）.`,
            cost: E("1e2825"),
            effect() {
                let x = player.exotic.matters[6].log10().add(1)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
          
        },
        feat2: {
            unl() { return (hasUpgrade('st',5)) },
            req() { return CHALS.inChal(23) && player.bh.mass.gte("1e120000")&&player.supernova.times.gte(1000) },
            reqDesc() {return `在挑战23中获得1e120000g黑洞质量和1000次超新星`},
            desc: `在黑洞子选项卡下解锁了不稳定黑洞,可以增加黑洞质量获取速度（咕咕咕）`,
            cost: E("1e2835"),
          
        },
        s2: {
            branch: ["s1"],
            req() { return player.supernova.times.gte(3) },
            reqDesc: `3次超新星。`,
            desc: `Star boost's Tetr's softcap is 50% weaker.`,
            cost: E(2500),
        },
        s3: {
            branch: ["s2"],
            req() { return player.supernova.times.gte(4) },
            reqDesc: `4次超新星。`,
            desc: `Star generators are stronger based on Supernova.`,
            cost: E(10000),
            effect() {
                let x = player.supernova.times.max(0).root(10).mul(0.1).add(1)
                return x
            },
            effDesc(x) { return "^"+format(x) },
        },
        s4: {
            branch: ["s3"],
            req() { return player.supernova.times.gte(6) },
            reqDesc: `6次超新星。`,
            desc: `Beyond unlocking stars, Star Unlocker will transform into Booster.`,
            cost: E(1e5),
        },
        s5: {
            unl() { return player.inf.times.gte(1) },
            branch: ["s4"],
            desc: `移除坍缩星辰获取的软上限。`,
            cost: E("ee25"),
        },
        qol1: {
            req() { return player.supernova.times.gte(2) },
            reqDesc: `2次超新星。`,
            desc: `Start with Silicon-14 & Argon-18 unlocked. You can now automatically buy Elements & Atom upgrades.`,
            cost: E(1500),
        },
        qol2: {
            branch: ["qol1"],
            req() { return player.supernova.times.gte(3) },
            reqDesc: `3次超新星。`,
            desc: `Start with Chromium-24 and Atom upgrade 6 unlocked.`,
            cost: E(2000),
        },
        qol3: {
            branch: ["qol2"],
            req() { return player.supernova.times.gte(4) },
            reqDesc: `4次超新星。`,
            desc: `Start with Techntium-43 unlocked, improve their element better. You can automatically gain Relativistic particles from mass.`,
            cost: E(10000),
        },
        qol4: {
            branch: ["qol3"],
            unl() { return player.supernova.post_10 },
            req() { return player.supernova.times.gte(12) },
            reqDesc: `12次超新星。`,
            desc: `You can now automatically buy Star unlockers & boosters.`,
            cost: E(1e8),
        },
        qol5: {
            branch: ["qol4"],
            req() { return player.supernova.times.gte(16) },
            reqDesc: `16次超新星。`,
            desc: `Tetrs no longer resets anything.`,
            cost: E(1e13),
        },
        qol6: {
            branch: ["qol5"],
            req() { return player.supernova.times.gte(17) },
            reqDesc: `17次超新星。`,
            desc: `While in any challenge, you can now automatically complete it before exiting.`,
            cost: E(1e15),
        },
        qol7: {
            branch: ["qol6"],
            unl() { return player.supernova.fermions.unl && hasTree("fn2") },
            req() { return player.supernova.times.gte(40) },
            reqDesc: `40次超新星。`,
            desc: `You can now automatically buy Photon & Gluon upgrades, they no longer spent their amount.`,
            cost: E(1e48),
        },
        qol8: {
            branch: ["unl1"],
            req() { return player.supernova.times.gte(60) },
            reqDesc: `60次超新星。`,
            desc: `You can now automatically Pent up, Pent no longer resets anything.`,
            cost: E(1e78),
        },
        qol9: {
            branch: ["unl1"],
            req() { return player.supernova.times.gte(78) },
            reqDesc: `78次超新星。`,
            desc: `You can now automatically buy Radiation Boosters, they no longer spent.`,
            cost: E(1e111),
        },
        chal1: {
            req() { return player.supernova.times.gte(4) },
            reqDesc: `4次超新星。`,
            desc: `Add 100 more C7 & C8 maximum completions.`,
            cost: E(6000),
        },
        chal2: {
            branch: ["chal1"],
            req() {
                for (let x = 1; x <= 4; x++) if (player.chal.comps[x].gte(1)) return false
                return player.mass.gte(E('e2.05e6').mul(1.5e56))
            },
            reqDesc() { return `在超新星中，未完成过挑战1-挑战4的前提下，到达${format('e2.05e6')}宇宙的质量。` },
            desc: `Keep challenge 1-4 completions on reset.`,
            cost: E(1e4),
        },
        chal3: {
            branch: ["chal1"],
            req() {
                for (let x = 5; x <= 8; x++) if (player.chal.comps[x].gte(1)) return false
                return player.bh.mass.gte(E('e1.75e4').mul(1.5e56))
            },
            reqDesc() { return `在超新星中，未完成过挑战5-挑战8的前提下，到达${format('e1.75e4')}宇宙的黑洞质量。` },
            desc: `Keep challenge 5-8 completions on reset.`,
            cost: E(1e4),
        },
        chal4: {
            branch: ["chal2","chal3"],
            desc: `Unlock new challenge.`,
            cost: E(1.5e4),
        },
        chal4a: {
            unl() { return player.supernova.post_10 },
            branch: ["chal4"],
            desc: `Make 9th Challenges effect better.`,
            cost: E(1e8),
        },
        chal4b: {
            unl() { return quUnl() },
            branch: ["chal4"],
            desc: `Add 100 more C9 completions.`,
            cost: E('e480'),
        },
        chal5: {
            branch: ["chal4"],
            desc: `Unlock new challenge.`,
            cost: E(1e17),
        },
        chal6: {
            unl() { return tmp.radiation.unl },
            branch: ["chal5"],
            desc: `Unlock new challenges.`,
            cost: E(1e88),
        },
        chal7: {
            branch: ["chal6"],
            desc: `Unlock 12th Challenge.`,
            cost: E(1e200),
        },
        chal7a: {
            unl() { return hasTree("unl3") },
            branch: ["chal7"],
            desc: `Make 12th Challenges effect better.`,
            cost: E('e900'),
        },
        chal8: {
            unl() { return player.qu.rip.first },
            branch: ["chal7"],
            desc: `Add 200 more C9-12 completions.`,
            cost: E('e35000'),
        },
        chal9: {
			qf: true,
            unl() { return player.atom.elements.includes(118) },
            branch: ["chal8"],
            desc: `使挑战9的次数上限增加2000次.`,
            cost: E(1e106),
        },
        chal10: {
			qf: true,
            unl() { return player.atom.elements.includes(118) },
            branch: ["chal9"],
            desc: `使挑战10和11的次数上限增加500次.`,
            cost: E(1e120),
        },
        chal11: {
			qf: true,
            unl() { return player.atom.elements.includes(118) },
            branch: ["chal10"],
            desc: `使挑战9到11的次数上限增加500次.`,
            cost: E(1e144),
        },
        chal12: {
			qf: true,
            unl() { return player.atom.elements.includes(118) },
            branch: ["chal11"],
            desc: `使挑战9的次数上限增加1900次,以及使挑战10和11的次数上限增加3500次.`,
            cost: E(1e156),
        },
        chal13: {
			qf: true,
            unl() { return player.inf.times.gte(1) },
            branch: ["chal12"],
            desc: `使挑战9到11的次数上限增加5000次.`,
            cost: E("1e411"),
        },
        chal14: {
			qf: true,
            unl() { return player.inf.times.gte(1) },
            branch: ["chal13"],
            desc: `使挑战12的次数上限增加900次.`,
            cost: E("1e471"),
        },
        gr1: {
            branch: ["bh1"],
            desc: `BH Condensers power boost Cosmic Rays power.`,
            req() { return player.supernova.times.gte(7) },
            reqDesc: `7次超新星。`,
            cost: E(1e6),
            effect() {
                let x = tmp.bh?tmp.bh.condenser_eff.pow.max(1).root(3):E(1)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        gr2: {
            unl() { return player.supernova.fermions.unl },
            branch: ["gr1"],
            desc: `Cosmic Rays Power is raised to 1.25th power.`,
            cost: E(1e20),
        },
        bs1: {
            unl() { return player.supernova.post_10 },
            req() { return player.supernova.times.gte(15) },
            reqDesc: `15次超新星。`,
            desc: `Tickspeed affect Higgs Bosons gain at a reduced rate.`,
            cost: E(1e13),
            effect() {
                let x = player.tickspeed.add(1).pow(0.6)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        bs2: {
            branch: ["bs1"],
            desc: `Photon, Gluon powers up each other.`,
            cost: E(1e14),
            effect() {
                let x = expMult(player.supernova.bosons.photon,hasElement(113) ? 0.95 : 1/2,2).max(1)
                let y = expMult(player.supernova.bosons.gluon,hasElement(113) ? 0.95 : 1/2,2).max(1)
                return [x,y]
            },
            effDesc(x) { return "光子获取速度变为原来的"+format(x[1])+"倍，胶子获取速度变为原来的"+format(x[0])+"倍" },
        },
        bs3: {
            branch: ["bs1"],
            desc: `Neutrons gain is affected by Graviton's effect at a reduced rate.`,
            cost: E(1e14),
            effect() {
                let x = tmp.bosons.effect.graviton[0].add(1).root(2)
                return overflow(x.softcap('e1000',1/3,0),'ee10000',0.5);
            },
            effDesc(x) { return format(x)+"倍"+x.softcapHTML('e1000') },
        },
        bs4: {
            unl() { return player.supernova.fermions.unl },
            branch: ["bs2"],
            desc: `Raise Z Bosons gain to the 1.5th power.`,
            cost: E(1e24),
        },
        bs5: {
            unl() { return player.qu.en.unl },
            branch: ["bs4"],
            desc: `Z Bosons also affect BHC + CR powers.`,
            cost: E('e1100'),
        },
        fn1: {
            unl() { return player.supernova.fermions.unl },
            branch: ["bs1"],
            desc: `Tickspeed affect each Fermions gain at a reduced rate.`,
            cost: E(1e27),
            effect() {
                let x = E(1.25).pow(player.tickspeed.pow(0.4))
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        fn2: {
            branch: ["fn1"],
            req() { return player.mass.div('1.5e56').gte("ee6") && player.md.active && FERMIONS.onActive("01") },
            reqDesc() { return `当选择[下夸克]并进行质量膨胀时，到达${formatMass(E('e1e6').mul(1.5e56))}的质量。` },
            desc: `Unlock 2 new types of U-Quark & U-Fermion.`,
            cost: E(1e33),
        },
        fn3: {
            branch: ["fn1"],
            req() { return player.supernova.fermions.points[0].gte(1e7) || player.supernova.fermions.points[1].gte(1e7) },
            reqDesc() { return `任意费米子到达${format(1e7)}。` },
            desc: `Super Fermion's Tier scaling is 7.5% weaker.`,
            cost: E(1e30),
        },
        fn4: {
            unl() { return hasTree("fn2") },
            branch: ["fn1"],
            desc: `使光子和胶子升级2的效果略微增强。`,
            cost: E(1e39),
        },
        fn5: {
            unl() { return hasTree("fn2") },
            branch: ["fn1"],
            req() { return player.atom.quarks.gte("e12500") && FERMIONS.onActive("10") },
            reqDesc() { return `当选择[电子]时，到达${format("e12500")}的夸克。` },
            desc: `[Electron] max tier is increased by 35. Its effect softcap is weaker.`,
            cost: E(1e42),
        },
        fn6: {
            branch: ["fn2"],
            req() { return player.mass.gte(uni('e4e4')) && FERMIONS.onActive("02") && CHALS.inChal(5) },
            reqDesc() { return `当选择[粲夸克]并进行挑战5时，到达${formatMass(uni("e4e4"))}的质量。` },
            desc: `Unlock 2 new more types of U-Quark & U-Fermion.`,
            cost: E(1e48),
        },
        fn7: {
            branch: ["fn6"],
            desc: `Unlock 2 new more types of U-Quark & U-Fermion.`,
            cost: E(1e90),
        },
        fn8: {
            branch: ["fn7"],
            desc: `Unlock 2 new final types of U-Quark & U-Fermion.`,
            cost: E(1e159),
        },
        fn9: {
            branch: ["fn1"],
            desc: `[Strange] & [Neutrino] max tier is increased by 2.`,
            cost: E(1e166),
        },
        fn10: {
            unl() { return PRIM.unl() },
            branch: ["fn5"],
            req() { return player.atom.points.gte("e1.5e8") && FERMIONS.onActive("10") && CHALS.inChal(9) },
            reqDesc() { return `当选择[电子]并进行挑战9时，到达${format("e1.5e8")}的原子。` },
            desc: `Break [Electron] maximum tier, its effect is overpowered.`,
            cost: E('e600'),
        },
        fn11: {
            unl() { return PRIM.unl() },
            branch: ["fn9"],
            desc: `[Strange], [Top], [Bottom], [Neutrino], [Neut-Muon] max tier is increased by 5.`,
            cost: E('e680'),
        },
        fn12: {
            branch: ["fn3"],
            desc: `Pre-Meta Fermion's Tier is 10% weaker.`,
            cost: E('e960'),
        },
        fn13: {
            unl() { return player.atom.elements.includes(118) },
            branch: ["fn12"],
            desc: `移除[缪中微子]效果的硬上限.`,
            cost: E('1e3500000'),
        },
        fn14: {
            unl() { return player.atom.elements.includes(118) },
            branch: ["fn11"],
            desc: `使[奇夸克],[上夸克],[中微子],[缪中微子]的阶层上限提高69,移除艾普西隆[E]粒子的效果2对[奇夸克],[上夸克],[中微子],[缪中微子]额外阶层增加的硬上限.`,
            cost: E('1e3900000'),
        },
        fn15: {
            unl() { return player.atom.elements.includes(118) },
            branch: ["fn14","fn8"],
            desc: `移除艾普西隆[E]粒子的效果2对[底夸克],[陶中微子]额外阶层增加的硬上限.`,
            cost: E('1e9000000'),
        },
        fn16: {
            unl() { return player.atom.elements.includes(118) },
            branch: ["fn14"],
            desc: `移除[中微子]阶层的硬上限.`,
            cost: E('1e20000000'),
        },
        fn17: {
            unl() { return player.atom.elements.includes(118) },
            branch: ["fn16"],
            desc: `移除[缪中微子]阶层的硬上限.`,
            cost: E('1e32000000'),
        },
        fn18: {
            unl() { return player.atom.elements.includes(118) },
            branch: ["fn13"],
            desc: `使[底夸克]的硬上限变为软上限.`,
            cost: E('e2.5e13'),
        },
        d1: {
            unl() { return hasTree("fn6") },
            branch: ["rp1"],
            desc: `Generating Relativistic particles outside Mass dilation is 25% stronger.`,
            cost: E(1e51),
        },
        rad1: {
            unl() { return tmp.radiation.unl },
            desc: `Gain more frequency based on Supernova, any more radiation if you unlocked next radiation.`,
            cost: E(1e54),
            effect() {
                let x = player.supernova.times.add(1)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        rad2: {
            branch: ["rad1"],
            desc: `Gain x10 any more Radiation.`,
            cost: E(1e72),
        },
        rad3: {
            branch: ["rad1"],
            desc: `Radiation Boosts are 1.1x cheaper.`,
            cost: E(1e86),
        },
        rad4: {
            branch: ["rad2"],
            desc: `All Meta-Boosts are twice effective.`,
            cost: E(1e118),
        },
        rad5: {
            branch: ["rad3"],
            desc: `All Radiation gains are increased by 10% for every Supernovas you have become.`,
            cost: E(1e170),
            effect() {
                let x = E(1.1).pow(player.supernova.times)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        rad6: {
            unl() { return PRIM.unl() },
            branch: ["rad4"],
            desc: `Bonus radiation boosts are stronger based on radiation type.`,
            cost: E('e490'),
        },

        qf1: {
            unl() { return quUnl() },
            desc: `Gain more Quantum Foams based on Supernovas.`,
            cost: E(1e290),
            effect() {
                let x = player.supernova.times.root(2).div(10).add(1)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        qf2: {
            unl() { return PRIM.unl() },
            branch: ["qf1"],
            desc: `Quantum Foams are boosted by Neutron Stars.`,
            cost: E('e735'),
            effect() {
                let x = player.supernova.stars.add(1).log10().add(1).root(3)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        qf3: {
            unl() { return hasTree('unl3') },
            branch: ["qf1"],
            desc: `Quantum Foams are boosted by Blueprint Particles.`,
            cost: E('e850'),
            effect() {
                let x = player.qu.bp.add(1).log10().add(1).pow(2)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        qf4: {
            branch: ["qf3"],
            desc: `Quantum Shard's base is increased by 0.5.`,
            cost: E('e1000'),
        },

        // Quatnum

        qu0: {
            unl() { return quUnl() },
            qf: true,
            desc: `Good luck with new era!`,
            cost: E("0"),
        },
        qu1: {
            qf: true,
            branch: ["qu0"],
            desc: `Fermion's requirement is decreased by 20%.`,
            cost: E(1),
        },
        qu2: {
            qf: true,
            branch: ["qu0"],
            desc: `W+ Boson's 1st effect is overpowered.`,
            cost: E(1),
        },
        qu3: {
            qf: true,
            branch: ["qu0"],
            desc: `From BH the formula's softcap is 30% weaker.`,
            cost: E(1),
        },
        qu4: {
            qf: true,
            branch: ["qu1", 'qu2', 'qu3'],
            desc: `Remove effect's softcaps from [sn2].`,
            cost: E(35),
        },
        qu5: {
            qf: true,
            unl() { return PRIM.unl() },
            branch: ['qu4'],
            desc: `Blueprint Particles & Chromas are affected by Tickspeed Effect at a reduced rate.`,
            cost: E(100),
            effect() {
                let x = tmp.tickspeedEffect?tmp.tickspeedEffect.eff.add(1).log10().add(1).log10().add(1).pow(3):E(1)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        qu6: {
            qf: true,
            branch: ['qu5'],
            desc: `Quantum times boost Cosmic string's power.`,
            cost: E(1e3),
            effect() {
                let x = player.qu.times.add(1).log10().add(1)
				if(hasChargedElement(187))x = x.pow(2)
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        qu7: {
            qf: true,
            unl() { return hasTree("unl3") },
            branch: ['qu6'],
            desc: `Gain more Quantizes based on Quantum Shards.`,
            cost: E(1e15),
            effect() {
                let x = player.qu.qc.shard+1
                return x
            },
            effDesc(x) { return format(x,0)+"倍" },
        },
        qu8: {
            qf: true,
            
            branch: ['qu7'],
            desc: `Chromas are affected by Quantum Shard’s effect.`,
            cost: E(1e21),
            effect() {
                let x = tmp.qu.qc_s_eff.max(1)
                return x
            },
            effDesc(x) { return format(x,1)+"倍" },
        },
        qu9: {
            unl() { return player.qu.en.unl },
            qf: true,
            branch: ['qu8'],
            desc: `Gain more Quantizes based on total Primordium Particles.`,
            cost: E(1e24),
            effect() {
                let x = player.qu.prim.theorems.add(1)
                return x
            },
            effDesc(x) { return format(x,0)+"倍" },
        },
        qu10: {
            qf: true,
            branch: ['qu9'],
            desc: `Higgs Boson's effect is increased by 3.3% for every OoM of Blueprint Particles.`,
            cost: E(1e32),
            effect() {
                let x = E(1.0333).pow(overflow(player.qu.bp.add(1).log10().softcap(70,0.5,0),1e74,0.5))
                return x
            },
            effDesc(x) { return format(x)+"倍" },
        },
        qu11: {
            qf: true,
            branch: ['qu10'],
            desc: `Quantum Foams gain formula is better.`,
            cost: E(1e43),
        },
        qu12: {
            qf: true,
            unl() { return hasElement(118) },
            req() { return player.prestigeMass.gte(1.619e20) },
            reqDesc: `获得1珠峰质量(1.619e20克)的转生质量.`,
            branch: ['br3'],
            desc: `使转生质量的效果变得更强.`,
            cost: E(1e237),
        },
        qu_qol1: {
            qf: true,
            unl() { return quUnl() },
            req() { return player.qu.times.gte(4) },
            reqDesc: `前往量子4次。`,
            desc: `You can now automatically purchase supernova tree except with cost of quantum foam.`,
            cost: E(3),
        },
        qu_qol2: {
            qf: true,
            branch: ["qu_qol1"],
            req() {
                for (let x = 0; x < 6; x++) if (player.supernova.fermions.tiers[0][x].gte(1)) return false
                return player.supernova.times.gte(81)
            },
            reqDesc: `在前往量子后，未获得任何U-夸克阶层的前提下，有81次成为超新星。`,
            desc: `Keep U-Quark Tiers on going Quantum.`,
            cost: E(4),
        },
        qu_qol3: {
            qf: true,
            branch: ["qu_qol1"],
            req() {
                for (let x = 1; x <= 4; x++) if (player.chal.comps[x].gte(1)) return false
                return player.mass.gte(mlt(1e4))
            },
            reqDesc() { return `在前往量子后，未完成过挑战1-挑战4的前提下，到达${formatMass(mlt(1e4))}质量。` },
            desc: `You can now automatically complete Challenges 1-4 any Challenge.`,
            cost: E(4),
        },
        qu_qol4: {
            qf: true,
            branch: ["qu_qol1"],
            desc: `You can now automatically become a supernova, it no longer resets anything.`,
            cost: E(4),
        },
        qu_qol5: {
            qf: true,
            branch: ["qu_qol1"],
            req() {
                for (let x = 5; x <= 8; x++) if (player.chal.comps[x].gte(1) && x != 7) return false
                return player.mass.gte(mlt(1.35e4))
            },
            reqDesc() { return `在前往量子后，未完成过挑战5、挑战6和挑战8的前提下，到达${formatMass(mlt(1.35e4))}质量。` },
            desc: `You can now automatically complete Challenges 5-8 any Challenge.`,
            cost: E(4),
        },
        qu_qol6: {
            qf: true,
            branch: ["qu_qol1"],
            req() {
                for (let x = 0; x < 6; x++) if (player.supernova.fermions.tiers[1][x].gte(1)) return false
                return player.supernova.times.gte(42)
            },
            reqDesc: `在前往量子后，未获得任何U-轻子阶层的前提下，有42次成为超新星。`,
            desc: `Keep U-Lepton Tiers on going Quantum.`,
            cost: E(4),
        },
        qu_qol7a: {
            qf: true,
            branch: ["qu_qol7"],
            unl() { return hasElement(118) },
            desc: `您可以自动完成挑战9-挑战12中的任意挑战。`,
            cost: E(1e147),
        },
        qu_qol7: {
            qf: true,
            branch: ["qu_qol3","qu_qol5"],
            req() {
                for (let x = 9; x <= 12; x++) if (player.chal.comps[x].gte(1)) return false
                return player.mass.gte(mlt(5e3)) && FERMIONS.onActive("05")
            },
            reqDesc() { return `在前往量子后，未完成过挑战9-挑战12，且选择[底夸克]时，到达${formatMass(mlt(5e3))}质量。` },
            desc: `Keep challenge 9-12 completions on going Quantum.`,
            cost: E(25),
        },
        qu_qol8: {
            qf: true,
            branch: ["unl3"],
            req() { return player.qu.qc.shard >= 15 },
            reqDesc() { return `获得15量子碎片。` },
            desc: `You can now automatically get all Fermions Tiers outside any Fermion, except during Quantum Challenge.`,
            cost: E(1e11),
        },
        qu_qol8a: {
            unl() { return player.md.break.active },
            qf: true,
            branch: ["qu_qol8"],
            desc: `Make [qu_qol8] worked inside Quantum Challenge or Big Rip.`,
            cost: E(1e75),
        },
        qu_qol9: {
            qf: true,
            branch: ["qu_qol8"],
            req() { return player.qu.qc.shard >= 24 },
            reqDesc() { return `获得24量子碎片。` },
            desc: `Start with Polonium–84 unlocked when entering in Quantum Challenge.`,
            cost: E(1e17),
        },
        qu_qol10: {
            qf: true,
            branch: ["unl2"],
            unl() { return hasElement(118) },
            desc: `自动消耗资源以获取焓和黑洞辐射（效果比手动消耗资源要强）。`,
            cost: E(1e111),
        },
        qu_qol11: {
            qf: true,
            branch: ["unl3"],
            unl() { return hasElement(118) },
            desc: `自动获取10倍的量子次数和量子泡沫.`,
            cost: E(1e118),
        },
        qu_qol12: {
            qf: true,
            branch: ["unl4"],
            unl() { return hasElement(118) },
            desc: `你可以自动在大撕裂外面获取死寂碎片，但是钚(94Pu)在大撕裂外面失效.`,
            cost: E(5e130),
        },
        qu_qol13: {
            qf: true,
            branch: ["qu_qol12"],
            unl() { return hasElement(118) },
            desc: `你可以自动在大撕裂外面获取相对论能量,自动购买撕裂膨胀升级.`,
            cost: E(5e137),
        },
        prim1: {
            qf: true,
            branch: ["qu5"],
            desc: `Primordium Theorem’s base requirement is reduced by 1.`,
            cost: E(200),
        },
        prim2: {
            qf: true,
            branch: ["prim1"],
            desc: `Theta Particle’s second effect is now added.`,
            cost: E(500),
        },
        prim3: {
            qf: true,
            unl() { return hasTree("unl3") },
            branch: ["prim2"],
            desc: `Epsilon Particle’s second effect is now added, stronger if you are in Quantum Challenge.`,
            cost: E(1e10),
        },
        prim3a: {
            qf: true,
            unl() {  return hasTree("unl3")  },
            branch: ["prim3"],
            desc: `如果你没有进入量子挑战，就使艾普西隆[E]粒子的效果2更强.`,
            cost: E(1e12),
        },
        prim4: {
            qf: true,
            unl() {  return hasTree("unl3")  },
            branch: ["prim3"],
            desc: `您无法通过原基定理获得德尔塔粒子,但您可以根据原基定理的数值获得相同数量的相应粒子.`,
            cost: E(1e16),
        },
        prim5: {
            qf: true,
            unl() {  return hasTree("unl3")  },
            branch: ["prim4"],
            desc: `您无法通过原基定理获得欧米伽粒子,但您可以根据原基定理的数值获得相同数量的相应粒子.`,
            cost: E(1e20),
        },
        prim6: {
            qf: true,
            unl() {  return hasTree("unl3") },
            branch: ["prim5"],
            desc:`您无法通过原基定理获得阿尔法粒子,但您可以根据原基定理的数值获得相同数量的相应粒子.`,
            cost: E(1e30),
        },
        prim7: {
            qf: true,
            unl() {  return hasTree("unl3") },
            branch: ["prim6"],
            desc: `您无法通过原基定理获得西格马粒子,但您可以根据原基定理的数值获得相同数量的相应粒子.`,
            cost: E(1e40),
        },
        prim8: {
            qf: true,
            unl() { return hasTree("unl3") },
            branch: ["prim7"],
            desc: `使原基定理的机制改变.`,
            cost: E(1e50),
        },
        qc1: {
            qf: true,
            unl() { return hasTree("unl3") },
            branch: ['qu5'],
            desc: `Mass gain softcap^4 starts later based on Quantum Shards.`,
            cost: E(1e10),
            effect() {
                let x = (player.qu.qc.shard+1)**0.75
                return x
            },
            effDesc(x) { return "延迟^"+format(x)+"" },
        },
        qc2: {
            unl() { return player.qu.en.unl },
            qf: true,
            branch: ['qc1'],
            req() { return tmp.qu.qc_s >= 70 && player.mass.gte(uni('ee5')) && QCs.active() },
            reqDesc() { return `使用可以获得70量子碎片的挑战限制(升级加成不计入)进入量子挑战，并到达${formatMass(uni('ee5'))}质量。` },
            desc: `Get 1 extra shard when a nerf reach 10.`,
            cost: E(1e27),
        },
        qc3: {
            unl() { return hasTree('unl4') },
            qf: true,
            branch: ['qc2'],
            req() { return player.qu.qc.shard >= 88 },
            reqDesc() { return `获得88量子碎片。` },
            desc: `Quantum Shard's base is increased by Prestige Base.`,
            cost: E(1e78),
            effect() {
                let x = (tmp.prestiges.base||E(1)).add(1).log10().div(10)
                return x
            },
            effDesc(x) { return "+"+format(x) },
        },
        qc4: {
            unl() { return player.atom.elements.includes(118) },
            qf: true,
            branch: ['qc3'],
            desc: `使量子挑战的最大完成次数基于量子碎片的数量增加.`,
            cost: E(1e104),
            effect() {
                let x = Math.min(Math.floor((player.qu.qc.shard-80)/8),40);
                return x
            },
            effDesc(x) { return "+"+format(x,0) },
        },
        qc5: {
            unl() { return player.atom.elements.includes(118) },
            qf: true,
            branch: ['qc4'],
            desc: `使量子之前所有资源获取速度基于量子碎片的数量增加.`,
            cost: E(1e135),
            effect() {
                let x = Decimal.pow(1.07,player.qu.qc.shard);
                return x
            },
            effDesc(x) { return format(x,0)+"x" },
        },
        qc6: {
            unl() { return player.atom.elements.includes(118) },
            qf: true,
            branch: ['qc5'],
            desc: `使量子碎片的基础效果基于转生质量增加.`,
            cost: E(1e158),
            effect() {
                let x = player.prestigeMass.add(1).log10().add(1).log10();
                return x
            },
            effDesc(x) { return "+"+format(x) },
        },
        qc7: {
            unl() { return player.atom.elements.includes(118) },
            qf: true,
            branch: ['qc6'],
            desc: `使转生质量的获取基于量子碎片的数量增加.`,
            cost: E(1e224),
            effect() {
                let x = Decimal.pow(player.qu.qc.shard+1,0.6);
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        qc8: {
            unl() { return player.atom.elements.includes(118) },
            qf: true,
            branch: ['qc3'],
            req() { return player.qu.qc.shard >= 144 },
            reqDesc() { return `获得144量子碎片.` },
            desc: `使转生基础值的指数基于量子碎片的数量增加.`,
            cost: E(1e269),
            effect() {
                let x = (player.qu.qc.shard**2)*4e-7;
                return x
            },
            effDesc(x) { return "+"+format(x) },
        },
        en1: {
            unl() { return player.qu.rip.first },
            qf: true,
            branch: ['qu5'],
            desc: `Evaporating frequency & mass of black hole is twice effective, its effects are stronger.`,
            cost: E(1e55),
        },
        en2: {
            unl() { return player.atom.elements.includes(118) },
            qf: true,
            branch: ['en1'],
            desc: `使量子碎片增加熵获取.`,
            cost: E(1e119),
            effect() {
                let x = (player.qu.qc.shard**2/100+1)
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        br1: {
            unl() { return player.qu.rip.first },
            qf: true,
            branch: ['qu5'],
            req() { return tmp.qu.qc_s >= 76 && player.mass.gte(uni('e7500')) && QCs.active() },
            reqDesc() { return `使用可以获得76量子碎片的挑战限制(升级加成不计入)进入量子挑战，并到达${formatMass(uni('e7500'))}质量。` },
            desc: `Quantum Shard boost Death Shard gain.`,
            cost: E(1e58),
            effect() {
                let x = (player.qu.qc.shard+1)**0.5
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        br2: {
            unl() { return hasElement(118) },
            qf: true,
            branch: ['br1'],
            desc: `你可以在大撕裂里面购买所有元素.`,
            cost: E(1e114),
        },
        br3: {
            unl() { return hasElement(118) },
            qf: true,
            branch: ['qu11'],
            req() { return player.supernova.times.gte(32) && player.qu.rip.active },
            reqDesc() { return `在大撕裂里面获得32超新星次数.` },
            desc: `钚(94Pu)的效果在大撕裂外面生效，但是弱化90%.`,
            cost: E(1e157),
        },
        pm1: {
            unl() { return hasPrestige(1,10) },
            branch: [],
            desc: `使中子星可以加成转生质量获取速度.`,
            cost: E("1e300000000"),
            effect() {
                let x = player.supernova.stars.add(1).log10().add(1).log10();
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        pm2: {
            unl() { return hasPrestige(1,10) },
            branch: ['pm1'],
            desc: `使转生质量的获取速度基于超新星次数而增加.`,
            cost: E("e1e15"),
            effect() {
                let x = player.supernova.times.add(1).log10().add(1).log10().add(1).pow(3);
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        im1: {
            unl() { return player.inf.times.gte(1) },
            branch: ['pm2'],
            desc: `使无限质量的获取速度基于超新星次数而增加.`,
            cost: E("e1e25"),
            effect() {
                let x = player.supernova.times.add(1).log10().add(1).log10().add(1);
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },

        // Other

        unl1: {
            branch: ["qol7"],
            unl() { return hasTree("fn6") },
            req() { return player.supernova.times.gte(44) },
            reqDesc: `44次超新星。`,
            desc: `Unlock Radiation.`,
            cost: E(5e52),
        },
        unl2: {
            qf: true,
            branch: ["qu_qol7"],
            req() { return player.qu.times.gte(20) },
            reqDesc: `前往量子20次。`,
            desc: `Unlock Primordium.`,
            cost: E(50),
        },
        unl3: {
            qf: true,
            branch: ["unl2"],
            req() { return player.qu.times.gte(200) },
            reqDesc: `前往量子200次。`,
            desc: `Unlock Quantum Challenge.`,
            cost: E(1e6),
        },
        unl4: {
            qf: true,
            branch: ["qu_qol9"],
            req() { return player.qu.qc.shard >= 66 },
            reqDesc: `66量子碎片。`,
            desc: `Unlock Big Rip.`,
            cost: E(1e42),
        },
        /*
        x: {
            unl() { return true },
            req() { return true },
            reqDesc: ``,
            desc: `Placeholder.`,
            cost: EINF,
            effect() {
                let x = E(1)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        */
		
		
        qp1: {
            unl() { return hasChargedElement(118) },
            qf: true,
            desc: `量子泡沫的获取公式变得更好`,
            cost: E('ee33'),
        },
        qp2: {
            qf: true,
            branch: ["qp1","qp3"],
            desc: `阿尔法[A]粒子加成奇异推进的'狂怒推进'`,
            cost: E('e2e34'),
            effect() {
                let x = tmp.prim.eff[1][0].add(1).log10().add(1).log10().add(1).log10().add(1).pow(0.2);
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        qp3: {
            qf: true,
            branch: ["qp1"],
            desc: `欧米伽[Ω]粒子加成奇异推进的'暗物质推进'`,
            cost: E('e1e34'),
            effect() {
                let x = tmp.prim.eff[2][0].add(1).log10().add(1).log10().add(1).log10().add(1).pow(0.2);
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        qp4: {
            qf: true,
            branch: ["qp3"],
            desc: `西格玛[∑]粒子加成奇异推进的'原子推进'`,
            cost: E('e1e34'),
            effect() {
                let x = tmp.prim.eff[3][0].add(1).log10().add(1).log10().add(1).log10().add(1).pow(0.2);
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        qp5: {
            qf: true,
            branch: ["qp4"],
            desc: `原子升级18变得更好`,
            cost: E('e1.3e34'),
        },
        qp6: {
            qf: true,
            branch: ["qp2"],
            desc: `狂怒升级18变得更好`,
            cost: E('e3e34'),
        },
        qp7: {
            qf: true,
            branch: ["qp2","qp3"],
            desc: `费米子阶层的元折算延迟10倍出现`,
            cost: E('e7e34'),
        },
        qp8: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp3","qp4","qp7"],
            desc: `超新星次数的一阶元折算削弱50%`,
            cost: E('e5e37'),
        },
        qp9: {
            qf: true,
            branch: ["qp2","qp6","qp7"],
            desc: `费米子阶层的元折算削弱90%，星系费米子阶层的究极折算延迟1.2倍出现。`,
            cost: E('e1e35'),
        },
        qp10: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp1","qp3","qp4"],
            desc: `物质获取公式指数+0.3`,
            cost: E('e5e37'),
        },
        qp11: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp4","qp5","qp8"],
            desc: `超新星次数的一阶元折算基于原子而削弱`,
            cost: E('e2e39'),
            effect() {
                let x = E(0.96).pow(player.atom.points.add(1).log10().add(1).log10().add(1).log10());
                return x
            },
            effDesc(x) { return "削弱"+formatReduction(x) },
        },
        qp12: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp7","qp8"],
            desc: `费米子阶层的元折算和超新星次数的一阶元折算都削弱50%`,
            cost: E('e4e39'),
        },
        qp13: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp8","qp11","qp12"],
            desc: `中子星获取指数^1.1`,
            cost: E('e1e40'),
        },
        qp14: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp7","qp9","qp12"],
            desc: `增强星系辐射波的效果`,
            cost: E('e1e40'),
        },
        qp15: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp11","qp13"],
            desc: `超新星星系加成粉色物质的获取`,
            cost: E('e1e43'),
            effect() {
                let x = player.superGal.add(1)
				if(hasTree('qp24'))x = x.pow(2)
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        qp16: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp9","qp14"],
            desc: `费米子阶层的元折算延迟10倍出现，且削弱90%。`,
            cost: E('e3e43'),
        },
        qp17: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp1","qp10"],
            desc: `量子泡沫加成物质获取公式指数`,
            cost: E('e1e48'),
            effect() {
                let x = player.qu.points.add(1).log10().add(1).log10().add(1).log10().add(1).log10();
                return x
            },
            effDesc(x) { return "+"+format(x) },
        },
        qp18: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp12","qp13"],
            desc: `超新星星系的超级折算延迟15次出现`,
            cost: E('e2.6e49'),
        },
        qp19: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp12","qp14","qp18"],
            desc: `挑战20的效果变得更好`,
            cost: E('e1e50'),
        },
        qp20: {
            unl() { return hasElement(486) },
            qf: true,
            branch: ["qp18","qp19"],
            desc: `坍缩星辰的效果变得更好。`,
            cost: E('e9e53'),
        },
        qp21: {
            unl() { return hasElement(510) },
            qf: true,
            branch: ["qp6"],
            desc: `狂怒能量加成暗射线获取`,
            cost: E('e1e55'),
            effect() {
                let x = player.rp.points.add(1).log10().add(1).log10().add(1).log10();
				if(hasTree('qp38'))x = expMult(x,3);
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        qp22: {
            unl() { return hasElement(510) },
            qf: true,
            branch: ["qp5"],
            desc: `原子加成暗射线获取`,
            cost: E('e1e55'),
            effect() {
                let x = player.atom.points.add(1).log10().add(1).log10().add(1).log10();
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        qp23: {
            unl() { return hasElement(510) },
            qf: true,
            branch: ["qp6","qp9","qp16","qp21"],
            desc: `费米子阶层的元折算延迟100倍出现，且削弱90%。`,
            cost: E('e2e56'),
        },
        qp24: {
            unl() { return hasElement(510) },
            qf: true,
            branch: ["qp5","qp11","qp15","qp22"],
            desc: `[qp15]的效果^2`,
            cost: E('e4e57'),
        },
        qp25: {
            unl() { return hasElement(510) },
            qf: true,
            branch: ["qp14","qp16","qp19"],
            desc: `挑战20的效果变得更好。`,
            cost: E('e6e58'),
        },
        qp26: {
            unl() { return player.superCluster.gte(14) },
            qf: true,
            branch: ["qp13","qp15","qp18"],
            desc: `星尘的效果x8`,
            cost: E('e4e59'),
        },
        qp27: {
            unl() { return hasElement(510) },
            qf: true,
            branch: ["qp19","qp20","qp25"],
            desc: `挑战20的效果变得更好`,
            cost: E('ee63'),
        },
        qp28: {
            unl() { return hasElement(510) },
            qf: true,
            branch: ["qp18","qp20","qp26"],
            desc: `坍缩星辰的效果变得更好`,
            cost: E('ee65'),
        },
        qp29: {
            unl() { return hasElement(554) },
            qf: true,
            branch: ["qp25","qp27"],
            desc: `减少挑战1-挑战23的目标`,
            cost: E('ee127'),
        },
        qp30: {
            unl() { return hasElement(554) },
            qf: true,
            branch: ["qp16","qp25","qp29"],
            desc: `减少挑战1-挑战22的目标`,
            cost: E('e2e128'),
        },
        qp31: {
            unl() { return hasElement(554) },
            qf: true,
            branch: ["qp26","qp28"],
            desc: `星尘加成坍缩星辰获取`,
            cost: E('e2e137'),
            effect() {
                let x = player.stardust.log10().div(100).add(1);
                return x
            },
            effDesc(x) { return "指数^"+format(x) },
        },
        qp32: {
            unl() { return hasElement(554) },
            qf: true,
            branch: ["qp29","qp30"],
            desc: `增加100次挑战21-挑战23的上限。减少挑战21-挑战23的目标。`,
            cost: E('ee153'),
        },
        qp33: {
            unl() { return hasElement(554) },
            qf: true,
            branch: ["qp15","qp26","qp31"],
            desc: `[qp31]将同样加成中子星和星辰发生器`,
            cost: E('e2e163'),
        },
        qp34: {
            unl() { return hasElement(554) },
            qf: true,
            branch: ["qp31","qp33"],
            desc: `粉色物质的效果变得更好`,
            cost: E('e2e166'),
        },
        qp35: {
            unl() { return hasElement(554) },
            qf: true,
            branch: ["qp20","qp28"],
            desc: `星系粒子的效果变得更好`,
            cost: E('ee179'),
        },
        qp36: {
            unl() { return hasElement(554) },
            qf: true,
            branch: ["qp20","qp27","qp35"],
            desc: `挑战20的效果加成星辰发生器`,
            cost: E('ee186'),
        },
        qp37: {
            unl() { return hasElement(554) },
            qf: true,
            branch: ["qp35","qp36"],
            desc: `削弱加速器效果的二重软上限`,
            cost: E('ee187'),
        },
        qp38: {
            unl() { return hasTree('ax42') },
            qf: true,
            branch: ["qp17","qp21"],
            desc: `[qp21]的效果变得更好`,
            cost: E('ee238'),
        },
        qp39: {
            unl() { return hasTree('ax42') },
            qf: true,
            branch: ["qp17","qp22"],
            desc: `弱化黑洞溢出和移除强化器溢出.`,
            cost: E('ee241'),
        },
        qp40: {
            unl() { return hasTree('ax42') },
            qf: true,
            branch: ["qp21","qp32"],
            desc: `解锁挑战24`,
            cost: E('e5e249'),
        },
        qp41: {
            unl() { return hasTree('ax42') },
            qf: true,
            branch: ["qp22","qp34"],
            desc: `粉色物质的效果变得更~好（这很强）`,
            cost: E('e2.5e250'),
        },
        qp42: {
            unl() { return hasTree('ax42') },
            qf: true,
            branch: ["qp28","qp35","qp31"],
            desc: `飞升基础值指数基于星尘而增加，星系费米子的超级折算削弱99%.`,
            cost: E('ee311'),
            effect() {
                let x = player.stardust.add(1).log10().div(7000);
                return x
            },
            effDesc(x) { return "+"+format(x) },
        },        
        qp43: {
            unl() { return hasTree('ax42') },
            qf: true,
            branch: ["qp29","qp36"],
            desc: `飞升质量获取^1.25，解锁奇异之鲨neko（在元素阶层3）.`,
            cost: E('ee320'),
           
        },        		
		
		
        ax1: {
            unl() { return hasElement(556) },
            ax: true,
            branch: [],
            desc: `轴空间的效果加成轴生成器倍率`,
            cost: E(3000),
            effect() {
                let x = EXOTIC.axsEff();
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        ax2: {
            unl() { return hasElement(556) },
            ax: true,
            branch: ["ax1"],
            desc: `前五种奇异推进增强20%`,
            cost: E(1500),
        },
        ax3: {
            unl() { return hasElement(556) },
            ax: true,
            branch: ["ax1"],
            desc: `轴空间的效果变得更强`,
            cost: E(2500),
        },
        ax4: {
            unl() { return hasElement(556) },
            ax: true,
            branch: ["ax2"],
            desc: `最后两种的奇异推进增强2%`,
            cost: E(3500),
        },
        ax5: {
            unl() { return hasElement(556) },
            ax: true,
            branch: ["ax3"],
            desc: `轴空间增加物质获取公式指数`,
            cost: E(3500),
            effect() {
                let x = EXOTIC.axsVal().add(1).log10().div(10);
                return x
            },
            effDesc(x) { return "+"+format(x) },
        },
        ax6: {
            unl() { return (hasTree('ax2')&&hasTree('ax5')) || (hasTree('ax3')&&hasTree('ax4')) },
            ax: true,
            branch: ["ax1"],
            req() { return (hasTree('ax2')&&hasTree('ax5')) || (hasTree('ax3')&&hasTree('ax4')) },
            reqDesc() { return `买4个第一行的轴空间树升级` },
            desc: `获得额外的35%轴空间。使X和Y轴生成器的倍率x10。`,
            cost: E(2500),
        },
        ax7: {
            unl() { return hasTree('ax4')&&hasTree('ax5')&&hasTree('ax6') },
            ax: true,
            branch: ["ax5"],
            req() { return hasTree('ax4')&&hasTree('ax5')&&hasTree('ax6') },
            reqDesc() { return `买5个第一行和1个第二行的的轴空间树升级` },
            desc: `最终星辰碎片的效果基于轴空间而增强（最大增强100%）`,
            cost: E(1500),
            effect() {
                let x = E(2).sub(EXOTIC.axsVal().add(1).pow(-0.01));
                return x
            },
            effDesc(x) { return "增强"+format(x.sub(1).mul(100))+"%" },
        },
        ax8: {
            unl() { return hasTree('ax4')&&hasTree('ax5')&&hasTree('ax6') },
            ax: true,
            branch: ["ax4"],
            req() { return hasTree('ax4')&&hasTree('ax5')&&hasTree('ax6') },
            reqDesc() { return `买5个第一行和1个第二行的的轴空间树升级` },
            desc: `最终星辰碎片加成雕文质量`,
            cost: E(3000),
            effect() {
                let x = E(hasTree('ax25')?5:hasTree('ax15')?3:2).pow(player.exotic.fss);
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        ax9: {
            unl() { return hasTree('ax7')||hasTree('ax8') },
            ax: true,
            branch: ["ax6"],
            req() { return hasTree('ax7')||hasTree('ax8') },
            reqDesc() { return `买6个第一行的轴空间树升级` },
            desc: `奇异物质在'物质'状态栏中的效果变得更好。`,
            cost: E(2000),
        },
        ax10: {
            unl() { return hasTree('ax7')||hasTree('ax8') },
            ax: true,
            branch: ["ax6"],
            req() { return hasTree('ax7')||hasTree('ax8') },
            reqDesc() { return `买6个第一行的轴空间树升级` },
            desc: `奇异推进基于轴空间变得更强（最大：增强100%）`,
            cost: E(2500),
            effect() {
                let x = E(2).sub(EXOTIC.axsVal().add(1).pow(-0.001));
                return x
            },
            effDesc(x) { return "增强"+format(x.sub(1).mul(100))+"%" },
        },
        ax11: {
            unl() { return hasElement(556) },
            ax: true,
            branch: ["ax6"],
            desc: `每一个轴生成器的倍率乘以它们各自的已购数量`,
            cost: E(10000),
        },
        ax12: {
            unl() { return hasElement(556) },
            ax: true,
            branch: ["ax11"],
            desc: `[ax6]中的'35%'变为'90%'`,
            cost: E(7500),
        },
        ax13: {
            unl() { return hasElement(556) },
            ax: true,
            branch: ["ax11"],
            desc: `超新星星团中各个'轴生成器倍率'的效果^2`,
            cost: E(7500),
        },
        ax14: {
            unl() { return player.exotic.tree.length>=13 },
            ax: true,
            branch: ["ax7"],
            req() { return player.exotic.tree.length>=13 },
            reqDesc() { return `买13个轴空间树升级` },
            desc: `轴空间使超新星星系的超级折算延迟出现`,
            cost: E(2500),
            effect() {
                let x = EXOTIC.axsVal().add(1).log10().pow(2).mul(hasTree('ax26')?8.5:4);
                return x
            },
            effDesc(x) { return "延迟"+format(x)+"次出现" },
        },
        ax15: {
            unl() { return player.exotic.tree.length>=13 },
            ax: true,
            branch: ["ax8"],
            req() { return player.exotic.tree.length>=13 },
            reqDesc() { return `买13个轴空间树升级` },
            desc: `[ax8]的效果变得更好`,
            cost: E(4000),
        },
        ax16: {
            unl() { return player.exotic.tree.length>=14 },
            ax: true,
            branch: ["ax9"],
            req() { return player.exotic.tree.length>=14 },
            reqDesc() { return `买14个轴空间树升级` },
            desc: `物质获取公式变得更好`,
            cost: E(5800),
        },
        ax17: {
            unl() { return player.exotic.tree.length>=14 },
            ax: true,
            branch: ["ax6"],
            req() { return player.exotic.tree.length>=14 },
            reqDesc() { return `买14个轴空间树升级` },
            desc: `奇异元推进加成雕文质量获取`,
            cost: E(11000),
            effect() {
                let x = EXOTIC_BOOST.effect(6).add(1);
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        ax18: {
            unl() { return player.exotic.tree.length>=16 },
            ax: true,
            branch: ["ax12"],
            req() { return player.exotic.tree.length>=16 },
            reqDesc() { return `买16个轴空间树升级` },
            desc: `[ax6]中的'90%'变为'125%'`,
            cost: E(4200),
        },
        ax19: {
            unl() { return player.exotic.tree.length>=16 },
            ax: true,
            branch: ["ax13"],
            req() { return player.exotic.tree.length>=16 },
            reqDesc() { return `买16个轴空间树升级` },
            desc: `超新星星团中各个'轴生成器倍率'的效果再一次^2`,
            cost: E(16500),
        },
        ax20: {
            unl() { return player.exotic.tree.length>=19 },
            ax: true,
            branch: ["ax11"],
            req() { return player.exotic.tree.length>=19 },
            reqDesc() { return `买19个轴空间树升级` },
            desc: `解锁W轴`,
            cost: E(10000),
        },
        ax21: {
            unl() { return player.exotic.tree.length>=20 },
            ax: true,
            branch: ["ax17"],
            req() { return player.exotic.tree.length>=20 },
            reqDesc() { return `买20个轴空间树升级` },
            desc: `W轴生成器倍率x12.5`,
            cost: E(200000),
        },
        ax22: {
            unl() { return player.exotic.tree.length>=20 },
            ax: true,
            branch: ["ax16"],
            req() { return player.exotic.tree.length>=20 },
            reqDesc() { return `买20个轴空间树升级` },
            desc: `物质获取公式指数+0.1`,
            cost: E(200000),
        },
        ax23: {
            unl() { return player.exotic.tree.length>=20 },
            ax: true,
            branch: ["ax20"],
            req() { return player.exotic.tree.length>=20 },
            reqDesc() { return `买20个轴空间树升级` },
            desc: `星系粒子的效果变得更好`,
            cost: E(600000),
        },
        ax24: {
            unl() { return player.exotic.tree.length>=20 },
            ax: true,
            branch: ["ax20"],
            req() { return player.exotic.tree.length>=20 },
            reqDesc() { return `买20个轴空间树升级` },
            desc: `挑战20的效果变得更好`,
            cost: E(600000),
        },
        ax25: {
            unl() { return player.exotic.tree.length>=22 },
            ax: true,
            branch: ["ax15","ax21"],
            req() { return player.exotic.tree.length>=22 },
            reqDesc() { return `买22个轴空间树升级` },
            desc: `[ax15]的效果变得更好`,
            cost: E(300000),
        },
        ax26: {
            unl() { return player.exotic.tree.length>=22 },
            ax: true,
            branch: ["ax14","ax22"],
            req() { return player.exotic.tree.length>=22 },
            reqDesc() { return `买22个轴空间树升级` },
            desc: `[ax14]的效果变得更好`,
            cost: E(350000),
        },
        ax27: {
            unl() { return player.exotic.tree.length>=23 },
            ax: true,
            branch: ["ax18"],
            req() { return player.exotic.tree.length>=23 },
            reqDesc() { return `买23个轴空间树升级` },
            desc: `[ax6]中的'125%'变为'200%'`,
            cost: E(100000),
        },
        ax28: {
            unl() { return player.exotic.tree.length>=23 },
            ax: true,
            branch: ["ax19"],
            req() { return player.exotic.tree.length>=23 },
            reqDesc() { return `买23个轴空间树升级` },
            desc: `荣耀的奇异折算削弱25%`,
            cost: E(100000),
        },
        ax29: {
            unl() { return player.exotic.tree.length>=26 },
            ax: true,
            branch: ["ax25","ax27"],
            req() { return player.exotic.tree.length>=26 },
            reqDesc() { return `买26个轴空间树升级` },
            desc: `[ax6]中的'200%'变为'350%'`,
            cost: E(100000),
        },
        ax30: {
            unl() { return player.exotic.tree.length>=26 },
            ax: true,
            branch: ["ax26","ax28"],
            req() { return player.exotic.tree.length>=26 },
            reqDesc() { return `买26个轴空间树升级` },
            desc: `每一个轴生成器的倍率再一次乘以它们各自的已购数量`,
            cost: E(750000),
        },
        ax31: {
            unl() { return player.exotic.tree.length>=30 },
            ax: true,
            branch: ["ax24"],
            req() { return player.exotic.tree.length>=30 },
            reqDesc() { return `买30个轴空间树升级` },
            desc: `挑战20的效果变得更好`,
            cost: E(100000),
        },
        ax32: {
            unl() { return player.exotic.tree.length>=30 },
            ax: true,
            branch: ["ax23"],
            req() { return player.exotic.tree.length>=30 },
            reqDesc() { return `买30个轴空间树升级` },
            desc: `星系粒子的效果变得更好`,
            cost: E(100000),
        },
        ax33: {
            unl() { return player.exotic.tree.length>=32 },
            ax: true,
            branch: ["ax20"],
            req() { return player.exotic.tree.length>=32 },
            reqDesc() { return `买32个轴空间树升级` },
            desc: `转生等级的奇异折算基于轴空间削弱`,
            cost: E(100000),
            effect() {
                let x = EXOTIC.axsVal().add(1).pow(-0.001);
                return x
            },
            effDesc(x) { return "削弱"+format(E(1).sub(x).mul(100))+"%" },
        },
        ax34: {
            unl() { return player.exotic.tree.length>=33 },
            ax: true,
            branch: ["ax32"],
            req() { return player.exotic.tree.length>=33 },
            reqDesc() { return `买33个轴空间树升级` },
            desc: `削弱黑洞溢出`,
            cost: E(200000),
        },
        ax35: {
            unl() { return player.exotic.tree.length>=33 },
            ax: true,
            branch: ["ax31"],
            req() { return player.exotic.tree.length>=33 },
            reqDesc() { return `买33个轴空间树升级` },
            desc: `物质获取公式指数+0.1`,
            cost: E(200000),
        },
        ax36: {
            unl() { return player.exotic.tree.length>=34 },
            ax: true,
            branch: ["ax33"],
            req() { return player.exotic.tree.length>=34 },
            reqDesc() { return `买34个轴空间树升级` },
            desc: `荣耀的奇异折算基于轴空间削弱`,
            cost: E(500000),
            effect() {
                let x = EXOTIC.axsVal().add(1).pow(-0.001);
                return x
            },
            effDesc(x) { return "削弱"+format(E(1).sub(x).mul(100))+"%" },
        },
        ax37: {
            unl() { return player.exotic.tree.length>=34 },
            ax: true,
            branch: ["ax33"],
            req() { return player.exotic.tree.length>=34 },
            reqDesc() { return `买34个轴空间树升级` },
            desc: `W轴获取x250`,
            cost: E(500000),
        },
        ax38: {
            unl() { return player.exotic.tree.length>=36 },
            ax: true,
            branch: ["ax30","ax35"],
            req() { return player.exotic.tree.length>=36 },
            reqDesc() { return `买36个轴空间树升级` },
            desc: `物质获取公式指数+0.1`,
            cost: E(1000000),
        },
        ax39: {
            unl() { return player.exotic.tree.length>=36 },
            ax: true,
            branch: ["ax29","ax34"],
            req() { return player.exotic.tree.length>=36 },
            reqDesc() { return `买36个轴空间树升级` },
            desc: `[ax6]中的'350'变为'400%'`,
            cost: E(1255500),
        },
        ax40: {
            unl() { return player.exotic.tree.length>=38 },
            ax: true,
            branch: ["ax36"],
            req() { return player.exotic.tree.length>=38 },
            reqDesc() { return `买38个轴空间树升级` },
            desc: `超新星星系的超级折算延迟50次出现`,
            cost: E(540000),
        },
        ax41: {
            unl() { return player.exotic.tree.length>=38 },
            ax: true,
            branch: ["ax37"],
            req() { return player.exotic.tree.length>=38 },
            reqDesc() { return `买38个轴空间树升级` },
            desc: `X轴获取x1000.`,
            cost: E(600000),
        },
        ax42: {
            unl() { return player.exotic.tree.length>=41 },
            ax: true,
            branch: ["ax33"],
            req() { return player.mass.gte("eee99") },
            reqDesc() { return `达到eee99g质量` },
            desc: `解锁量子+中最后6个升级。`,
            cost: E(1),
        },

        yekey1: {
            unl() { return true },
            sunshard: true,
          
            desc: `获得1黄钥匙.`,
            cost: E(3),
        },    
        yekey2: {
            unl() { return true },
            sunshard: true,
           
            desc: `获得1黄钥匙.`,
            cost: E(99),
        },    
        yekey3: {
            unl() { return true },
            sunshard: true,
           
            desc: `获得1黄钥匙.`,
            cost: E(99),
        },    
        blkey1: {
            unl() { return true },
            sunshard: true,
         
            desc: `获得1蓝钥匙.`,
            cost: E(99),
        },      
        blkey2: {
            unl() { return true },
            sunshard: true,
         
            desc: `获得1蓝钥匙.`,
            cost: E(99),
        },     
        bldo1: {
            unl() { return true },
            sunshard: true,
            req() { return player.exotic.tree.length>=99 },
            reqDesc() { return `1蓝钥匙.` },
            desc: ``,
            cost: E("eee999"),
        },      
        bldo2: {
            unl() { return true },
            sunshard: true,
            req() { return player.exotic.tree.length>=99 },
            reqDesc() { return `1蓝钥匙.` },
            desc: ``,
            cost: E("0"),
        },   
        yedo1: {
            unl() { return true },
            sunshard: true,
            req() { return player.exotic.tree.length>=99 },
        
            desc: `消耗1黄钥匙`,
            cost: E("eee999"),
        }, 
        yedo2: {
            unl() { return true },
            sunshard: true,

            req() { return player.exotic.tree.length>=99 },
         
            desc: `消耗1黄钥匙`,
            cost: E("eee999"),
        },
        yedo3: {
            unl() { return true },
            sunshard: true,
         
            req() { return player.exotic.tree.length>=99 },
            
            desc: `消耗1黄钥匙`,
            cost: E("eee999"),
        },    
        bobo: {
            unl() { return true },
            sunshard: true,
          
            desc: `如果你第一次获得了11太阳碎片，那么祝贺你，你的前期是比较成功的.`,
            cost: E("0"),
        },  
        rebs11: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('yedo1') },
            reqDesc() { return `开旁边的黄门.` },
            desc: `奇异物质获取x5.`,
            cost: E("eee999"),
        },    
        rebs12: {
            unl() { return true },
            sunshard: true,
            desc: `暗射线获取x2.`,
            cost: E("0"),
        },     
        rebs13: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('yedo2') },
            reqDesc() { return `开下面的黄门.` },
            desc: `雕文质量获取x3.`,
            cost: E("eee999"),
        }, 
        blbs11: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('yedo1') },
            reqDesc() { return `开旁边的黄门.` },
            desc: `超新星的元折算弱化80%.`,
            cost: E("eee999"),
        },    
        blbs12: {
            unl() { return true },
            sunshard: true,
            desc: `六重阶层的元折算延迟1000倍出现.`,
            cost: E("0"),
        },    
        blbs13: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('bldo2') },
            reqDesc() { return `开旁边的蓝门.` },
            desc: `原子能量的软上限弱化2%.`,
            cost: E("eee999"),
        },   
        grbs11: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('bldo1') },
            reqDesc() { return `开旁边的蓝门.` },
            desc: `行星重置时保留1e10奇异物质.`,
            cost: E("eee999"),
        }, 
        grbs12: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('yedo2') },
            reqDesc() { return `开下面的黄门.` },
            desc: `行星重置时保留1e6奇异重置次数.`,
            cost: E("eee999"),
        },    
        grbs13: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('yedo3') },
            reqDesc() { return `开旁边的黄门.` },
            desc: `行星重置时保留1e4暗射线.`,
            cost: E("eee999"),
        },   
        yebs11: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('bldo1') },
            reqDesc() { return `开旁边的蓝门.` },
            desc: `自动购买奇异升级.`,
            cost: E("eee999"),
        }, 
        yebs12: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('bldo2') },
            reqDesc() { return `开旁边的蓝门.` },
            desc: `自动购买奇异推进.`,
            cost: E("eee999"),
        }, 
        yebs13: {
            unl() { return true },
            sunshard: true,
            req() { return  hasTree('yedo3') },
            reqDesc() { return `开旁边的黄门.` },
            desc: `自动获得最终星辰碎片.`,
            cost: E("eee999"),
        }, 
        lt: {
            unl() { return true },
            sunshard: true,
           
            desc: `当前区域黄钥匙消耗3太阳碎片，蓝钥匙消耗5太阳碎片.`,
            cost: E("0"),
        }, 
    },
}

function hasTree(id) { 
   
	if(TREE_UPGS.ids[id].ax)return player.exotic.tree.includes(id)
   
    if(tmp.tree_tab <= 7)return player.supernova.tree.includes(id)  
}

function treeEff(id,def=1) { return tmp.supernova.tree_eff[id]||E(def) }

function setupTreeHTML() {
    let tree_table = new Element("tree_table")
    let tree_tab_table = new Element("tree_tab_table")
	let table = ``
    let table2 = ``
    for (let j = 0; j < TREE_TAB.length; j++) {
        table2 += `
        <div style="width: 145px">
            <button onclick="tmp.tree_tab = ${j}" class="btn_tab" id="tree_tab${j}_btn">${TREE_TAB[j].title}<b id="tree_tab${j}_notify" style="color: red"> [!]</b></button>
        </div>
        `
        table += `<div id="tree_tab${j}_div">`
        for (let i = 0; i < TREE_IDS.length; i++) {
            table += `<div class="tree_table_column">`
            for (let k = 0; k < TREE_IDS[i][j].length; k++) {
                let id = TREE_IDS[i][j][k]
                let option = id == "" ? `style="visibility: hidden"` : ``
let img = (TREE_UPGS.ids[id] && !id.startsWith("ax") && !id.startsWith("qp") && !id.startsWith("pm") && !id.startsWith("im") && !["en2","br2","prim5","prim6","prim7"].includes(id))?`<img src="images/tree/${id}.png">`:`<img src="images/tree/placeholder.png">`
                table += `<button id="treeUpg_${id}" class="btn_tree" onclick="TREE_UPGS.buy('${id}'); tmp.supernova.tree_choosed = '${id}'" ${option}>${img}</button>`
            }
            table += `</div>`
        }
        table += `</div>`
    }

	tree_table.setHTML(table)
    tree_tab_table.setHTML(table2)
}

function retrieveCanvasData() {
	let treeCanv = document.getElementById("tree_canvas")
	if (treeCanv===undefined||treeCanv===null) return false;
    tree_canvas = treeCanv
	tree_ctx = tree_canvas.getContext("2d");
	return true;
}

function resizeCanvas() {
    if (!retrieveCanvasData()) return
	tree_canvas.width = 0;
	tree_canvas.height = 0;
	tree_canvas.width = tree_canvas.clientWidth
	tree_canvas.height = tree_canvas.clientHeight
}

function drawTreeHTML() {
    if (tmp.tab == 5) {
        if (tree_canvas.width == 0 || tree_canvas.height == 0) resizeCanvas()
        drawTree()
    }
}

function drawTree() {
	if (!retrieveCanvasData()) return;
	tree_ctx.clearRect(0, 0, tree_canvas.width, tree_canvas.height);
	for (let x in tmp.supernova.tree_had2[tmp.tree_tab]) {
        let id = tmp.supernova.tree_had2[tmp.tree_tab][x]
        let branch = TREE_UPGS.ids[id].branch||[]
        if (branch.length > 0 && tmp.supernova.tree_unlocked[id]) for (let y in branch) if (tmp.supernova.tree_unlocked[branch[y]]) {
			drawTreeBranch(branch[y], id)
		}
	}
}

function treeCanvas() {
    if (!retrieveCanvasData()) return
    if (tree_canvas && tree_ctx) {
        window.addEventListener("resize", resizeCanvas)

        tree_canvas.width = tree_canvas.clientWidth
        tree_canvas.height = tree_canvas.clientHeight
    }
}

const TREE_ANIM = ["Circle", "Square", "OFF"]
const CR = 5
const SR = 7.0710678118654755

function drawTreeBranch(num1, num2) {
    var start = document.getElementById("treeUpg_"+num1).getBoundingClientRect();
    var end = document.getElementById("treeUpg_"+num2).getBoundingClientRect();
    var x1 = start.left + (start.width / 2) - (document.body.scrollWidth-tree_canvas.width)/2;
    var y1 = start.top + (start.height / 2) - (window.innerHeight-tree_canvas.height);
    var x2 = end.left + (end.width / 2) - (document.body.scrollWidth-tree_canvas.width)/2;
    var y2 = end.top + (end.height / 2) - (window.innerHeight-tree_canvas.height);
    tree_ctx.lineWidth=10;
    tree_ctx.beginPath();
    let color = TREE_UPGS.ids[num2].ax?"#dd0000":TREE_UPGS.ids[num2].qf?"#39FF49":"#00520b"
    let color2 = TREE_UPGS.ids[num2].qf?"#009C15":"#fff"
    tree_ctx.strokeStyle = hasTree(num2)?color:tmp.supernova.tree_afford[num2]?"#fff":"#333";
    tree_ctx.moveTo(x1, y1);
    tree_ctx.lineTo(x2, y2);
    tree_ctx.stroke();

    if (player.options.tree_animation != 2) {
        tree_ctx.fillStyle = hasTree(num2)?color2:"#888";
        let tt = [tmp.tree_time, (tmp.tree_time+1)%3, (tmp.tree_time+2)%3]
        for (let i = 0; i < 3; i++) {
            let [t, dx, dy] = [tt[i], x2-x1, y2-y1]
            let [x, y] = [x1+dx*t/3, y1+dy*t/3]
            tree_ctx.beginPath();
            if (player.options.tree_animation == 1) {
                let a = Math.atan2(y1-y2,dx)-Math.PI/4
                tree_ctx.moveTo(x+SR*Math.cos(a), y-SR*Math.sin(a))
                for (let j = 1; j <= 3; j++) tree_ctx.lineTo(x+SR*Math.cos(a+Math.PI*j/2), y-SR*Math.sin(a+Math.PI*j/2))
            } else if (player.options.tree_animation == 0) {
                tree_ctx.arc(x, y, CR, 0, Math.PI*2, true);
            }
            tree_ctx.fill();
        }
    }
}

function changeTreeAnimation() {
    player.options.tree_animation = (player.options.tree_animation + 1) % 3;
}

function updateTreeHTML() {
    tmp.el.neutronStar.setTxt(format(player.supernova.stars,2)+" "+formatGain(player.supernova.stars,tmp.supernova.star_gain.mul(tmp.preQUGlobalSpeed)))
    tmp.el.treeResName.setTxt("中子星")
    let req = ""
    let t_ch = TREE_UPGS.ids[tmp.supernova.tree_choosed]
    if (tmp.supernova.tree_choosed != "") req = t_ch.req?`<span class="${t_ch.req()?"green":"red"}">${t_ch.reqDesc?"需满足："+(typeof t_ch.reqDesc == "function"?t_ch.reqDesc():t_ch.reqDesc):""}</span>`:""
    tmp.el.tree_desc.setHTML(
        tmp.supernova.tree_choosed == "" ? `<div style="font-size: 12px; font-weight: bold;"><span class="gray">(click any tree upgrade to show)</span></div>`
        : `<div style="font-size: 12px; font-weight: bold;"><span class="gray">(click again to buy if affordable)</span>${req}</div>
        <span class="sky"><b>[${tmp.supernova.tree_choosed}]</b>${t_ch.desc}</span><br>
        <span>Cost: ${t_ch.ax?formatSpace(t_ch.cost):format(t_ch.cost,2)} ${t_ch.sunshard?'太阳碎片':t_ch.ax?'Axionic Space':t_ch.qf?'Quantum foam':'Neutron star'}</span><br>
        <span class="green">${t_ch.effDesc?"目前效果："+t_ch.effDesc(tmp.supernova.tree_eff[tmp.supernova.tree_choosed]):""}</span>
        `
    )

    for (let i = 0; i < TREE_TAB.length; i++) {
        tmp.el["tree_tab"+i+"_btn"].setDisplay(TREE_TAB[i].unl?TREE_TAB[i].unl():true)
        tmp.el["tree_tab"+i+"_notify"].setDisplay(tmp.supernova.tree_afford2[i].length>0)
        tmp.el["tree_tab"+i+"_div"].setDisplay(tmp.tree_tab == i)
        if (tmp.tree_tab == i) for (let x = 0; x < tmp.supernova.tree_had2[i].length; x++) {
            let id = tmp.supernova.tree_had2[i][x]
            let unl = tmp.supernova.tree_unlocked[id]
            tmp.el["treeUpg_"+id].setVisible(unl)
            if (unl) tmp.el["treeUpg_"+id].setClasses({btn_tree: true,sunshard_tree: TREE_UPGS.ids[id].sunshard, ax_tree: TREE_UPGS.ids[id].ax, qu_tree: TREE_UPGS.ids[id].qf, locked: !tmp.supernova.tree_afford[id], bought: hasTree(id), choosed: id == tmp.supernova.tree_choosed})
        }
    }
	if (tmp.tree_tab == 4 || tmp.tree_tab == 5){
        tmp.el.neutronStar.setTxt(format(player.qu.points,2))
        tmp.el.treeResName.setTxt("Quantum foam")
	}
	
     if (tmp.tree_tab == 7){
        tmp.el.neutronStar.setTxt(format(player.sun.shard)),
        tmp.el.treeResName.setTxt("太阳碎片")
    }
    if (tmp.tree_tab == 6){
        tmp.el.neutronStar.setHTML(formatSpace(EXOTIC.axsRem())+" / "+formatSpace(EXOTIC.axsVal()))
        tmp.el.treeResName.setTxt("Axionic Space")
        tmp.el.resetAxionicTree.setDisplay(true)  
	}  
    else  tmp.el.resetAxionicTree.setDisplay(false)
}
