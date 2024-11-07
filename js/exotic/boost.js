const EXOTIC_BOOST_LENGTH = 7;

const EXOTIC_BOOST = {
    gain() {
		let x = player.exotic.points.add(1).log(1000);
		x = x.add(EXOTIC_BOOST.fgain())
		
        return x.floor()
    },
    fgain() {
		let x = SUPERNOVA_CLUSTER.effects.eff3()
		if (player.exotic.times.gte(1000))x = x.add(1)
		if (player.exotic.times.gte(1000000))x = x.add(1)
		if (player.exotic.times.gte(1e10))x = x.add(1)	
        return x
    },
    used_bp() {
		let x = E(0);
		for(let i=0;i<EXOTIC_BOOST_LENGTH;i++){
			player.exotic.boosts[i] = player.exotic.boosts[i].floor().max(0);
			x = x.add(player.exotic.boosts[i]);
		}
        return x
    },
	effect(i) {
		let meta_pow = 0.6
		let meta_div = 3
		if(hasElement(458))meta_pow+=0.1,meta_div-=0.5
		if(hasElement(480))meta_pow+=0.05,meta_div-=0.5
		if(hasElement(494))meta_div-=0.2
		if(hasElement(500))meta_pow+=0.03
		if(hasElement(506))meta_pow+=0.07,meta_div-=0.2
		let ret = (i == 6 && hasElement(390))?player.exotic.boosts[i].pow(meta_pow).div(meta_div):(i == 6)?player.exotic.boosts[i].add(1).log10():player.exotic.boosts[i].add(EXOTIC_BOOST.effect(6)).sqrt().softcap(16.4,0.25,0).mul(0.01);
		if(hasElement(366))ret = ret.mul(1.2);
		if(hasElement(384))ret = ret.mul(1.1);
		if(hasElement(408))ret = ret.mul(1.1);
		if(hasElement(416) && i == 6)ret = ret.mul(1.5);
		if(hasElement(432))ret = ret.mul(1.1);
		if(hasElement(446) && i == 6)ret = ret.mul(1.2);
		if(hasElement(486) && i == 2)ret = ret.mul(MATTERS.eff(5));
		if(hasElement(486) && i == 4)ret = ret.mul(MATTERS.eff(6));
		if(hasElement(486) && i == 1)ret = ret.mul(MATTERS.eff(9));
		if(hasElement(550) && i == 6)ret = ret.mul(hasAscension(1,200)?0.7:player.ranks.enne.gte(2400)?0.6:0.5);
		if(hasElement(550) && i != 6)ret = ret.mul(tmp.elements.effect[550]||1);
			
        if (hasTree("qp2") && i == 0)ret = ret.mul(treeEff("qp2"))
        if (hasTree("qp3") && i == 1)ret = ret.mul(treeEff("qp3"))
        if (hasTree("qp4") && i == 2)ret = ret.mul(treeEff("qp4"))
		if(hasTree("ax2") && i <= 4)ret = ret.mul(1.2);
		if(hasTree("ax4") && i >= 5)ret = ret.mul(1.02);
		if(hasTree("ax10"))ret = ret.mul(treeEff("ax10"))
		if(player.exotic.dark_run.upgs[11].gte(1))ret = ret.mul(tmp.dark_run?(tmp.dark_run.upgs[11].eff||1):1);
		ret = ret.mul(EXOTIC.abEff().exb);
		if(player.gc.active && player.gc.noeb)ret = new Decimal(0);
		if(i == 6)return ret;
		return E(1).add(ret);
	},
	buy(i) {
		tmp.ex.exb_can = player.exotic.bp.gt(EXOTIC_BOOST.used_bp());
		if(tmp.ex.exb_can)player.exotic.boosts[i]=player.exotic.boosts[i].add(1);
	},
	buyMax(i) {
		tmp.ex.exb_can = player.exotic.bp.gt(EXOTIC_BOOST.used_bp());
		if(tmp.ex.exb_can)player.exotic.boosts[i]=player.exotic.boosts[i].add(player.exotic.bp.sub(EXOTIC_BOOST.used_bp()));
	},
	respec() {
		if (!confirm("Are you sure you want to respec all Exotic Boosts?"))return;
		for(let i=0;i<EXOTIC_BOOST_LENGTH;i++){
			player.exotic.boosts[i]=E(0);
		}
		EXOTIC.doReset(true);
	},
	refund(i) {
		if(player.exotic.boosts[i].lte(0))return;
		player.exotic.boosts[i]=player.exotic.boosts[i].sub(1);
		EXOTIC.doReset(true);
	},
	refundMax(i) {
		if(player.exotic.boosts[i].lte(0))return;
		player.exotic.boosts[i]=E(0);
		EXOTIC.doReset(true);
	},
	export(){
		let str = player.exotic.boosts[0].toString()
		for (let i = 1; i < EXOTIC_BOOST_LENGTH; i++)str+="/"+player.exotic.boosts[i].toString();
		let copyText = document.getElementById('copy')
		copyText.value = str
		copyText.style.visibility = "visible"
		copyText.select();
		document.execCommand("copy");
		copyText.style.visibility = "hidden"
		addNotify("Exported to Clipboard")
	},
	import(){
		let preset = prompt('Import your Exotic Boost Setup.').split('/');
		if(preset.length!=EXOTIC_BOOST_LENGTH){
			alert('Your Exotic Boost Setup is invalid.');
			return
		}
		let copied_mods = []
		for (let x = 0; x < EXOTIC_BOOST_LENGTH; x++){
			copied_mods.push(E(preset[x]).floor())
			if (copied_mods[x].lt(0) || Number.isNaN(copied_mods[x].mag) || Number.isNaN(copied_mods[x].layer) || Number.isNaN(copied_mods[x].sign)){
				alert('Your Exotic Boost Setup is invalid.');
				return
			}
		}
		for (let x = 0; x < EXOTIC_BOOST_LENGTH; x++){
			if(player.exotic.boosts[x].gte(copied_mods[x]))continue;
			player.exotic.boosts[x]=player.exotic.boosts[x].sub(EXOTIC_BOOST.used_bp()).add(EXOTIC_BOOST.gain()).min(copied_mods[x]);
		}
	},
	importrespec(){
		let preset = prompt('Import your Exotic Boost Setup.').split('/');
		if(preset.length!=EXOTIC_BOOST_LENGTH){
			alert('Your Exotic Boost Setup is invalid.');
			return
		}
		let copied_mods = []
		for (let x = 0; x < EXOTIC_BOOST_LENGTH; x++){
			copied_mods.push(E(preset[x]).floor())
			if (copied_mods[x].lt(0) || Number.isNaN(copied_mods[x].mag) || Number.isNaN(copied_mods[x].layer) || Number.isNaN(copied_mods[x].sign)){
				alert('Your Exotic Boost Setup is invalid.');
				return
			}
		}
		for(let i=0;i<EXOTIC_BOOST_LENGTH;i++){
			player.exotic.boosts[i]=E(0);
		}
		EXOTIC.doReset(true);
		for (let x = 0; x < EXOTIC_BOOST_LENGTH; x++){
			if(player.exotic.boosts[x].gte(copied_mods[x]))continue;
			player.exotic.boosts[x]=player.exotic.boosts[x].sub(EXOTIC_BOOST.used_bp()).add(EXOTIC_BOOST.gain()).min(copied_mods[x]);
		}
		setTimeout(function(){console.log(player.mass.format());},5000);
	}
}