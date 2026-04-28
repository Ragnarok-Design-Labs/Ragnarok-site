import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const nav = [
  ["Home", "/"],
  ["Audit", "/audit/"],
  ["Sprint", "/sprint/"],
  ["Build", "/build/"],
  ["Cases", "/cases/"],
  ["Contact", "/contact/"],
];

const css = `:root{
  --bg:#ffffff;--ink:#0a0a0b;--ink-2:#1a1a1d;--muted:#6b6b73;--muted-2:#9a9aa3;
  --hair:#e8e8ec;--hair-2:#f0f0f3;--panel:#f5f5f8;--panel-2:#eef0f4;
  --accent:#6b2fe0;--accent-soft:#a78bff;--warn:#d93636;
  --mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  --serif:"Instrument Serif","Times New Roman",serif;
  --sans:"Manrope",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  --footer-reveal:clamp(620px,66vh,820px);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#0a0a0b;color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden}
a{color:inherit;text-decoration:none}button,input,select,textarea{font:inherit}svg{display:block;max-width:100%}
main{position:relative;z-index:2;background:var(--bg);margin-bottom:var(--footer-reveal);box-shadow:0 28px 80px rgba(0,0,0,.18)}
.wrap{max-width:1280px;margin:0 auto;padding:0 32px}.narrow{max-width:880px}.mono{font-family:var(--mono)}
.tag,.kicker{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.tagline{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);display:flex;gap:10px;flex-wrap:wrap}
.h-display{font-family:var(--serif);font-weight:400;font-size:clamp(48px,7vw,100px);line-height:1.02;letter-spacing:-.02em}
.h-display em,.h-section em{font-style:italic;color:var(--muted)}
.h-section{font-family:var(--serif);font-weight:400;font-size:clamp(36px,4.4vw,66px);line-height:1.04;letter-spacing:-.02em}
.h-card{font-family:var(--serif);font-size:clamp(27px,2.4vw,38px);font-weight:400;line-height:1.08;letter-spacing:-.01em}
.body-lg{font-size:17px;line-height:1.55;color:var(--ink-2)}.body{font-size:15px;line-height:1.58;color:var(--ink-2)}.sm{font-size:13px;line-height:1.5;color:var(--muted)}
.scroll-reveal-text .reveal-word{display:inline;opacity:var(--word-opacity,.18);transition:opacity .12s linear,color .12s linear;will-change:opacity}.scroll-reveal-text.is-complete .reveal-word{will-change:auto}.section.dark .scroll-reveal-text .reveal-word,.panel.dark .scroll-reveal-text .reveal-word{--word-opacity:.24}
.motion-reduced .scroll-reveal-text .reveal-word{opacity:1!important;transition:none}
.header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.84);backdrop-filter:saturate(140%) blur(10px);border-bottom:1px solid var(--hair)}
.header-inner{height:64px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.brand{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:11px;letter-spacing:.28em;text-transform:uppercase}
.sigil{width:18px;height:18px;border:1px solid var(--ink);position:relative;flex:0 0 auto}.sigil:before{content:"";position:absolute;left:3px;top:3px;width:12px;height:12px;border-top:1px solid var(--ink);border-left:1px solid var(--ink)}.sigil:after{content:"";position:absolute;left:7px;top:7px;width:4px;height:4px;background:var(--accent)}
.primary{display:flex;gap:24px;align-items:center}.primary a{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);padding:8px 0;position:relative}.primary a.active,.primary a:hover{color:var(--ink)}.primary a.active:after{content:"";position:absolute;left:0;right:0;bottom:-13px;height:2px;background:var(--ink)}.menu-toggle{display:none;width:42px;height:42px;border:1px solid var(--hair);border-radius:999px;background:#fff;align-items:center;justify-content:center;gap:5px;flex-direction:column;cursor:pointer}.menu-toggle span{width:16px;height:1px;background:var(--ink);display:block}.mobile-menu{position:fixed;inset:0;z-index:80;background:rgba(255,255,255,.98);color:var(--ink);opacity:0;pointer-events:none;transition:opacity .2s ease}.mobile-menu.is-open{opacity:1;pointer-events:auto}.menu-close{position:absolute;top:18px;right:20px;border:0;background:transparent;font-size:24px;line-height:1;color:var(--muted);cursor:pointer}.mobile-menu-inner{min-height:100svh;padding:30px 20px 24px;display:grid;align-content:space-between}.mobile-menu nav{display:grid;gap:0;margin-top:18px}.mobile-menu nav a{font-family:var(--serif);font-size:clamp(40px,12vw,64px);line-height:.9;letter-spacing:-.02em}.mobile-menu nav a.active{color:var(--muted)}.mobile-menu-services,.mobile-menu-contact{display:grid;gap:3px;font-size:14px;line-height:1.15}.mobile-menu-services span,.mobile-menu-contact span{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:5px}.mobile-social{display:flex;gap:8px;margin-top:12px}.mobile-social a{width:28px;height:28px;border:1px solid var(--hair);border-radius:999px;display:grid;place-items:center;font-family:var(--mono);font-size:10px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:40px;padding:0 17px;border-radius:999px;border:1px solid var(--ink);background:var(--ink);color:#fff;font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:transform .15s ease,background .15s ease,border-color .15s ease}.btn:hover{transform:translateY(-1px)}.btn.accent{background:var(--accent);border-color:var(--accent)}.btn.ghost{background:transparent;color:var(--ink);border-color:var(--hair)}.btn.secondary{background:transparent;color:var(--ink)}
.hero{position:relative;overflow:hidden;padding:90px 0 70px}.hero .wrap{position:relative;z-index:2}.hero-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.72fr);gap:64px;align-items:start}.home-hero .hero-grid{grid-template-areas:"text visual" "actions visual" "trust trust";gap:0 64px}.home-hero .hero-copy{display:contents}.home-hero .hero-text{grid-area:text;min-width:0}.home-hero .terminal{grid-area:visual;min-width:0}.home-hero .hero-actions{grid-area:actions}.home-hero .hero-trust{grid-area:trust}.hero h1{max-width:15ch}.hero-sub{margin-top:30px;max-width:58ch;color:var(--muted);font-size:clamp(16px,1.45vw,19px);line-height:1.58}.home-hero .h-display{font-size:clamp(44px,6.85vw,98px)}.home-hero .hero-sub{font-size:clamp(16px,1.5vw,19px)}.hero-actions{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-top:34px}.hero-price{margin-top:18px}.hero-trust{margin-top:18px;max-width:72ch;line-height:1.6}.glow{position:absolute;pointer-events:none;width:920px;height:920px;border-radius:50%;background:radial-gradient(closest-side,rgba(107,47,224,.50),rgba(107,47,224,.16) 42%,transparent 70%);filter:blur(10px);top:-260px;right:-190px;z-index:0}.glow.small{width:420px;height:420px;left:-150px;top:290px;right:auto;opacity:.35}
.terminal{border:1px solid var(--hair);border-radius:6px;background:linear-gradient(180deg,#fbfbfd,#fff);box-shadow:0 30px 70px -44px rgba(20,20,40,.45);overflow:hidden}.terminal-bar{height:42px;border-bottom:1px solid var(--hair);display:flex;align-items:center;gap:9px;padding:0 14px;font-family:var(--mono);font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}.terminal-bar i{width:8px;height:8px;border-radius:50%;background:#e1e1e7}.terminal-body{padding:24px}.readout{display:flex;justify-content:space-between;gap:18px;padding:11px 0;border-bottom:1px dashed rgba(0,0,0,.12);font-family:var(--mono);font-size:10px;letter-spacing:.09em;text-transform:uppercase}.readout span:first-child{color:var(--muted)}.big-read{font-family:var(--serif);font-size:54px;line-height:1;letter-spacing:-.02em;margin:26px 0 8px}.big-read em{color:var(--muted-2)}.bars{display:grid;gap:7px;margin-top:22px}.bar{height:3px;background:var(--hair);position:relative}.bar i{position:absolute;inset:0 auto 0 0;background:var(--accent)}
.section{position:relative;padding:94px 0;border-top:1px solid var(--hair)}.section.dark{background:#0a0a0b;color:#fff;border-top:0}.section.dark .body,.section.dark .body-lg{color:#d7d7df}.section.dark .tag,.section.dark .sm{color:#a0a0aa}.section.dark .h-section em{color:#9b8bd2}.section-head{display:flex;gap:28px;align-items:flex-start;margin-bottom:56px}.section-head .num{min-width:132px;padding-top:10px;font-family:var(--mono);font-size:11px;letter-spacing:.17em;text-transform:uppercase;color:var(--muted)}
.stats-grid,.cards-3,.cards-2,.moves,.packages,.steps{display:grid;gap:0}.stats-grid{grid-template-columns:repeat(3,1fr)}.stat{padding:0 28px;border-right:1px solid var(--hair)}.stat:first-child{padding-left:0}.stat:last-child{border-right:0}.stat .n{font-family:var(--serif);font-size:clamp(72px,9vw,124px);line-height:.92;letter-spacing:-.03em}.stat sup{font-size:.38em;color:var(--muted);font-family:var(--mono);letter-spacing:.04em}.stat .caption{margin-top:18px;max-width:32ch}
.moves,.cards-3,.packages{grid-template-columns:repeat(3,1fr);border-top:1px solid var(--ink)}.move,.card,.package{padding:28px 24px 34px;border-right:1px solid var(--hair);min-height:280px}.move:last-child,.card:last-child,.package:last-child{border-right:0}.move h3{font-family:var(--serif);font-size:50px;font-weight:400;letter-spacing:-.02em;margin:24px 0 16px}.meta-row{display:flex;justify-content:space-between;gap:18px;font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}.card h3,.package h3{margin:22px 0 14px}.card ul,.package ul,.clean-list{list-style:none;display:grid;gap:12px;margin-top:20px}.card li,.package li,.clean-list li{display:flex;gap:10px;align-items:baseline;font-size:14px;line-height:1.45;color:var(--ink-2)}.card li:before,.package li:before,.clean-list li:before{content:"";width:5px;height:5px;border-radius:50%;background:var(--accent);flex:0 0 auto;transform:translateY(-2px)}.does-grid{display:grid;grid-template-columns:minmax(0,.92fr) minmax(360px,1.08fr);gap:72px;align-items:start}.does-copy{position:sticky;top:104px}.does-copy .body-lg{max-width:43ch}.signal-stack{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid var(--ink);border-left:1px solid var(--hair)}.signal{min-height:172px;padding:22px 22px 26px;border-right:1px solid var(--hair);border-bottom:1px solid var(--hair);background:linear-gradient(180deg,#fff,#fbfbfd);position:relative;overflow:hidden}.signal:after{content:"";position:absolute;left:22px;right:22px;bottom:16px;height:2px;background:var(--hair)}.signal:before{content:"";position:absolute;left:22px;bottom:16px;width:var(--w,44%);height:2px;background:var(--accent)}.signal .idx{font-family:var(--mono);font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);display:flex;justify-content:space-between;gap:14px}.signal .name{font-family:var(--serif);font-size:clamp(27px,2.6vw,42px);line-height:1;letter-spacing:-.02em;margin-top:44px}.signal.wide{grid-column:1/-1;min-height:150px;background:#0a0a0b;color:#fff}.signal.wide .idx{color:#a0a0aa}.signal.wide:after{background:#24242b}.signal.wide .name{max-width:12ch}.signal:nth-child(1){--w:38%}.signal:nth-child(2){--w:62%}.signal:nth-child(3){--w:54%}.signal:nth-child(4){--w:73%}.signal:nth-child(5){--w:46%}.signal:nth-child(6){--w:82%}
.split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:start}.measure-list{border-top:1px solid var(--hair);margin-top:36px}.measure-list li{list-style:none;display:grid;grid-template-columns:52px 1fr auto;gap:22px;padding:20px 0;border-bottom:1px solid var(--hair)}.measure-list .n{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.17em}.measure-list .name{font-family:var(--serif);font-size:24px}.measure-list .desc{font-size:13px;color:var(--muted);line-height:1.5;margin-top:5px}
.artifact{border:1px solid var(--hair);border-radius:6px;background:linear-gradient(180deg,#fafafc,#fff);overflow:hidden;box-shadow:0 30px 60px -34px rgba(20,20,40,.25)}.artifact-title{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 16px;border-bottom:1px solid var(--hair);font-family:var(--mono);font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}.artifact-body{padding:28px}.curve{height:230px;margin-top:22px}.artifact-grid{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:24px}.hero .artifact-grid{grid-template-columns:1fr}.hero .log{border-left:0;border-top:1px solid var(--hair);padding-top:20px}.log{background:#fbfbfd;border-left:1px solid var(--hair);padding:22px}.patch{margin-top:18px;background:var(--accent);color:#fff;border-radius:6px;padding:16px}.badge{display:inline-flex;align-items:center;min-height:26px;padding:0 9px;border:1px solid var(--hair);border-radius:999px;font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);background:#fff}.badge.accent{background:var(--accent);border-color:var(--accent);color:#fff}.price{font-family:var(--serif);font-size:56px;line-height:1;letter-spacing:-.03em;margin:20px 0 6px}
.panel{background:var(--panel);border:1px solid var(--hair);border-radius:6px;padding:34px}.panel.lav{background:#f4f0ff;border-color:#ded4ff}.panel.dark{background:#0a0a0b;color:#fff;border-color:#1f1f25}.panel.dark .body,.panel.dark li{color:#d9d9e1}.callout{display:grid;grid-template-columns:1fr 1.2fr;gap:48px;align-items:center}.quote{font-family:var(--serif);font-size:clamp(36px,5vw,70px);line-height:1.03;letter-spacing:-.02em}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.field{display:grid;gap:8px}.field.full{grid-column:1/-1}.field label{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}input,select,textarea{width:100%;border:1px solid var(--hair);border-radius:6px;padding:13px 14px;background:#fff;color:var(--ink)}textarea{min-height:132px;resize:vertical}.checks{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.check{display:flex;gap:10px;align-items:center;border:1px solid var(--hair);border-radius:6px;padding:12px;font-size:13px;color:var(--ink-2)}.check input{width:auto}
.pricing-stack{display:grid;gap:14px}.price-card{background:#fff;color:var(--ink);border:1px solid var(--hair);border-radius:8px;padding:22px 26px}.price-card.featured{background:#f4f0ff;border-color:#ded4ff;box-shadow:0 0 0 1px rgba(167,139,255,.2) inset}.price-card-head{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:start;padding-bottom:18px;border-bottom:1px solid var(--hair)}.price-card h3{font-family:var(--sans);font-size:17px;line-height:1.2;color:var(--ink)}.price-card .deck{font-size:13px;color:var(--muted);margin-top:4px}.price-card .amount{font-family:var(--sans);font-weight:700;font-size:30px;line-height:1;color:var(--ink);text-align:right}.price-card .time{font-size:12px;color:var(--muted);text-align:right;margin-top:7px}.pill{display:inline-flex;align-items:center;min-height:24px;padding:0 10px;border-radius:999px;background:var(--panel);color:var(--ink-2);font-size:11px;font-weight:700;margin-bottom:12px}.pill.green{background:var(--accent);color:#fff}.pill.muted{background:var(--panel-2);color:var(--muted)}.price-card ul{list-style:none;display:grid;gap:9px;margin:18px 0}.price-card li{display:flex;gap:10px;color:var(--ink-2);font-size:14px;line-height:1.45}.price-card li:before{content:"";width:5px;height:5px;border-radius:50%;background:var(--accent);flex:0 0 auto;margin-top:.62em}.price-card.featured li:before{background:var(--accent)}.price-card.warm li:before{background:var(--accent)}.why{background:var(--panel);border-radius:7px;padding:14px 16px;color:var(--ink-2);font-size:13px;line-height:1.45;font-weight:600}
.home-hero .hero-trust{width:100%;max-width:none;display:block;white-space:normal}.expertise-section{padding-top:104px;padding-bottom:104px}.expertise-grid{display:grid;grid-template-columns:minmax(220px,.34fr) minmax(0,1fr);gap:64px;align-items:start}.expertise-intro{position:sticky;top:104px}.expertise-intro .body-lg{max-width:48ch;margin-top:24px;color:var(--muted)}.expertise-list{border-top:1px solid var(--hair)}.expertise-row{display:grid;grid-template-columns:86px minmax(220px,.8fr) minmax(0,1.25fr);gap:34px;align-items:start;padding:34px 0;border-bottom:1px solid var(--hair)}.expertise-row .n{font-family:var(--mono);font-size:20px;font-weight:500;color:var(--ink)}.expertise-row h3{font-family:var(--serif);font-size:clamp(30px,3vw,48px);font-weight:400;line-height:1;letter-spacing:-.02em}.expertise-row p{font-size:16px;line-height:1.55;color:var(--muted);max-width:48ch}.measure-list.accordion details{border-bottom:1px solid var(--hair)}.measure-list.accordion summary{list-style:none;display:grid;grid-template-columns:52px 1fr auto;gap:22px;padding:22px 0;cursor:pointer}.measure-list.accordion summary::-webkit-details-marker{display:none}.measure-list.accordion .more{max-width:58ch;color:var(--muted);font-size:14px;line-height:1.55;padding:0 56px 22px 74px}.measure-list.accordion .chev{font-size:26px;line-height:1;transition:transform .18s ease}.measure-list.accordion details[open] .chev{transform:rotate(45deg)}.question-panel{background:var(--panel);border:1px solid var(--hair);border-radius:8px;padding:56px 60px}.question-panel .question-title{font-family:var(--serif);font-size:clamp(46px,5.6vw,86px);line-height:.95;letter-spacing:-.03em;max-width:13ch}.question-list{margin-top:48px;border-top:1px solid rgba(0,0,0,.2)}.question-list li{list-style:none;display:grid;grid-template-columns:44px 1fr;gap:24px;padding:22px 0;border-bottom:1px solid rgba(0,0,0,.16)}.question-list .plus{font-family:var(--mono);font-size:22px;color:var(--accent)}.question-list .body{font-size:18px;color:var(--ink-2)}.restraint-section{background:var(--panel);border-top:1px solid var(--hair)}.restraint-head{display:grid;grid-template-columns:132px 1fr;gap:28px;margin-bottom:58px}.restraint-head .body-lg{margin-top:18px;color:var(--muted)}.restraint-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}.restraint-block:last-child{text-align:right}.restraint-block h3{font-family:var(--serif);font-size:clamp(44px,5vw,78px);line-height:.95;font-weight:400;letter-spacing:-.03em}.restraint-block ul{list-style:none;margin-top:28px;display:grid;gap:7px}.restraint-block li{font-size:15px;line-height:1.45;color:var(--ink-2)}.after-audit-head{align-items:flex-end;justify-content:space-between}.after-audit-head .hero-actions{margin-top:0}.process-row-section{background:var(--panel);border-top:1px solid var(--hair)}.process-row-layout{display:grid;grid-template-columns:minmax(260px,.72fr) minmax(0,1fr);gap:72px;align-items:start}.process-row-copy{position:sticky;top:104px}.process-row-copy .body-lg{margin-top:24px;color:var(--muted);max-width:42ch}.process-list{border-top:1px solid var(--ink)}.process-item{display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:28px;align-items:start;padding:30px 0;border-bottom:1px solid var(--hair)}.process-item .n,.process-item .meta{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}.process-item .body{font-size:17px}.artifact .stats-grid{margin-top:18px}
footer{position:fixed;left:0;right:0;bottom:0;z-index:0;height:auto;border-top:1px solid rgba(255,255,255,.10);padding:72px 0 40px;background:#0a0a0b;color:#fff;overflow:visible}.footer-top{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:48px}.footer-brand .word{font-family:var(--mono);font-size:13px;letter-spacing:.32em;text-transform:uppercase}.footer-brand p{color:#b8b8c0!important}.footer-col h4{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8d8d98;margin-bottom:18px}.footer-col ul{list-style:none;display:grid;gap:12px}.footer-col a,.footer-bottom{font-size:13px;color:#b8b8c0}.wordmark{font-family:var(--serif);font-size:clamp(80px,16vw,210px);line-height:.82;letter-spacing:-.055em;margin-top:56px;color:#fff}.wordmark .accent{color:var(--accent-soft);font-style:italic}.footer-bottom{display:flex;justify-content:space-between;gap:24px;align-items:center;border-top:1px solid rgba(255,255,255,.12);padding-top:22px}.legal{display:flex;gap:24px;flex-wrap:wrap}
@media (max-width:980px){:root{--footer-reveal:820px}.wrap{padding:0 20px;max-width:100%}.primary,.header-cta{display:none}.menu-toggle{display:flex}.hero-grid,.split,.callout,.artifact-grid,.price-card-head,.does-grid,.expertise-grid,.process-row-layout{grid-template-columns:1fr}.hero-grid>*,.split>*,.callout>*,.artifact-grid>*,.does-grid>*,.expertise-grid>*,.process-row-layout>*{min-width:0}.home-hero .hero-grid{grid-template-columns:minmax(0,1fr);grid-template-areas:"text" "visual" "actions" "trust";gap:0}.home-hero .terminal{margin-top:28px}.home-hero .hero-actions{margin-top:28px}.home-hero .hero-trust{margin-top:16px}.stats-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:0}.moves,.cards-3,.packages,.signal-stack{grid-template-columns:1fr}.stat{border-right:1px solid var(--hair);border-bottom:0;padding:0 12px}.stat:first-child{padding-left:0}.stat:last-child{border-right:0;padding-right:0}.stat .n{font-size:clamp(42px,15vw,72px)}.stat .caption{font-size:12px;line-height:1.35;margin-top:10px}.stat .tag{font-size:9px;letter-spacing:.1em}.move,.card,.package{border-right:0;border-bottom:1px solid var(--hair);padding-left:0;padding-right:0}.does-copy,.expertise-intro,.process-row-copy{position:static}.signal-stack{border-left:0}.signal{border-right:0}.signal.wide{grid-column:auto}.section{padding:72px 0}.section-head{display:block}.section-head .num{margin-bottom:18px}.hero{padding:64px 0 58px}.hero h1,.home-hero h1{max-width:100%;font-size:clamp(46px,13.4vw,86px);overflow-wrap:normal}.hero-sub{max-width:100%}.home-hero .hero-sub{max-width:100%;font-size:clamp(16px,4.2vw,18px)}.hero-sub,.tag,.btn{overflow-wrap:anywhere}.hero-price,.hero-trust{line-height:1.6;max-width:100%}.home-hero .hero-trust{max-width:100%;width:100%}.btn{white-space:normal;text-align:center;padding:12px 16px;height:auto}.terminal,.artifact{max-width:100%}.expertise-section{padding-top:72px;padding-bottom:72px}.expertise-row{grid-template-columns:44px 1fr;gap:18px;padding:20px 0}.expertise-row p{grid-column:2;font-size:14px}.expertise-row h3{font-size:clamp(28px,8vw,38px)}.measure-list.accordion summary{grid-template-columns:40px 1fr 26px;gap:14px}.measure-list.accordion .more{padding:0 0 20px 54px}.question-panel{padding:34px 24px}.question-list li{grid-template-columns:32px 1fr;gap:14px}.question-list .body{font-size:15px}.restraint-head{display:block}.restraint-grid{grid-template-columns:1fr;gap:42px}.restraint-block:last-child{text-align:left}.after-audit-head .hero-actions{margin-top:24px}.process-item{grid-template-columns:44px 1fr;gap:16px}.process-item .meta{grid-column:2}.price-card{padding:20px}.price-card .amount,.price-card .time{text-align:left}.checks,.form-grid{grid-template-columns:1fr}.footer-top{grid-template-columns:repeat(auto-fit,minmax(112px,1fr));gap:24px 18px}.footer-brand{grid-column:1/-1}.footer-brand .word{font-size:11px;letter-spacing:.22em}.wordmark{font-size:clamp(66px,22vw,98px);margin-top:30px}.footer-bottom{display:block}.legal{margin-top:12px;gap:14px}.brand{letter-spacing:.18em}footer{padding:34px 0 24px}}
@media (max-width:520px){:root{--footer-reveal:760px}.readout{gap:12px}.readout>*{min-width:0}.readout b{flex:1 1 0;text-align:right;overflow-wrap:anywhere}.wrap{padding:0 16px}.home-hero .h-display,.hero h1{font-size:clamp(42px,12.6vw,58px)}.hero-actions{gap:10px}.hero-actions .btn{width:100%}.stats-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.stat{padding:0 8px}.stat .n{font-size:clamp(34px,12vw,52px)}.stat sup{font-size:.34em}.stat .caption{font-size:11px}.artifact-body{padding:20px}.artifact .stats-grid .stat{padding:0 6px}.artifact .stats-grid .stat .n{font-size:clamp(28px,10vw,42px)!important}.artifact .stats-grid .sm{font-size:10px}.expertise-row{grid-template-columns:36px 1fr}.expertise-row p{grid-column:1/-1}.question-panel{padding:28px 18px}.restraint-block h3{font-size:clamp(38px,12vw,54px)}.footer-top{grid-template-columns:repeat(auto-fit,minmax(104px,1fr));gap:18px 16px}.footer-col h4{margin-bottom:9px}.footer-col ul{gap:7px}.footer-col a,.footer-bottom{font-size:12px}.footer-brand p{margin-top:10px!important}.footer-brand .tag{margin-top:14px!important}.wordmark{font-size:clamp(56px,19vw,78px);margin-top:24px}.footer-bottom{padding-top:14px}footer{padding:24px 0 18px}}`;

function header(active) {
  const links = nav.map(([name, href]) => `<a class="${active === name ? "active" : ""}" href="${href}">${name}</a>`).join("");
  return `<header class="header"><div class="wrap header-inner"><a class="brand" href="/"><span class="sigil"></span><span>Ragnarok</span></a><nav class="primary">${links}</nav><a class="btn accent header-cta" href="/audit/">Start With an Audit <span>→</span></a><button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button></div><div class="mobile-menu" id="mobile-menu" aria-hidden="true"><button class="menu-close" type="button" aria-label="Close menu">×</button><div class="mobile-menu-inner"><nav>${links}</nav><div class="mobile-menu-services"><span>Services</span><a href="/audit/">Structural Audit</a><a href="/sprint/">Structural Sprint</a><a href="/build/">Structural Build</a></div><div class="mobile-menu-contact"><span>Let's Talk</span><a href="mailto:hello@ragnarok.design">hello@ragnarok.design</a><div class="mobile-social"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="LinkedIn">IN</a><a href="#" aria-label="Facebook">FB</a></div></div></div></div></header>`;
}

function terminal(mode = "home") {
  const sprint = mode === "sprint";
  return `<div class="terminal"><div class="terminal-bar"><i></i><i></i><i></i><span>SYSTEM_ORIGIN RF · ISO 241</span></div><div class="terminal-body">
    <div class="readout"><span>Diagnostic mode</span><b>${sprint ? "Correction" : "Structural audit"}</b></div>
    <div class="readout"><span>Confidentiality</span><b>Mutual NDA</b></div>
    <div class="big-read">${sprint ? "18.6→7.2" : "−24.8%"} <em>${sprint ? "DWI" : "delta"}</em></div>
    <div class="sm">${sprint ? "Pre-analysis to stabilisation window. FSI 57→83. PRI 0.68→0.29." : "Peak attrition located at the third commitment boundary."}</div>
    <div class="bars"><div class="bar"><i style="width:92%"></i></div><div class="bar"><i style="width:64%"></i></div><div class="bar"><i style="width:48%"></i></div></div>
  </div></div>`;
}

function artifact(label = "Friction Map: Onboarding Flow — Sample Output") {
  return `<div class="artifact"><div class="artifact-title"><span>${label}</span><span class="badge">Actual Audit Output</span></div><div class="artifact-body artifact-grid"><div>
    <div class="tag">// step-to-step abandonment delta</div>
    <svg class="curve" viewBox="0 0 640 230" preserveAspectRatio="none" aria-label="Friction curve">
      <g stroke="#e8e8ec"><line x1="0" y1="48" x2="640" y2="48"/><line x1="0" y1="104" x2="640" y2="104"/><line x1="0" y1="160" x2="640" y2="160"/></g>
      <polyline points="38,66 148,88 278,166 416,134 548,188" fill="none" stroke="#0a0a0b" stroke-width="1.5"/>
      <g font-family="JetBrains Mono" font-size="9" letter-spacing="1" fill="#9a9aa3">
        <text x="38" y="58">ENTRY</text><text x="148" y="80">VALUE</text><text x="248" y="152" fill="#6b2fe0">FRICTION STEP 03</text><text x="416" y="126">COMMIT</text><text x="548" y="180">FULFILL</text>
      </g><circle cx="278" cy="166" r="4" fill="#6b2fe0"/>
    </svg>
    <div class="stats-grid" style="margin-top:18px"><div class="stat"><div class="n" style="font-size:58px">27–52</div><p class="sm">Structural points found per system</p></div><div class="stat"><div class="n" style="font-size:58px">10</div><p class="sm">Average days to prioritised diagnosis</p></div><div class="stat"><div class="n" style="font-size:58px">64<sup>%</sup></div><p class="sm">Issues at decision transitions</p></div></div>
  </div><aside class="log"><div class="tag">Diagnostic_log</div><div style="margin-top:18px"><h3 class="h-card">Critical imbalance</h3><p class="sm" style="margin-top:10px">Step 3 shows a higher dropout than baseline. Navigation copy and action hierarchy fail to provide cognitive wayfinding.</p></div><div class="patch"><div class="tag" style="color:rgba(255,255,255,.72)">Suggested patch</div><p class="body" style="color:#fff;margin-top:8px">Re-orient action hierarchy toward an information-first protocol.</p></div></aside></div></div>`;
}

function footer() {
  return `<footer><div class="wrap"><div class="footer-top"><div class="footer-brand"><div class="word">R A G N A R O K · L A B S</div><p class="body" style="margin-top:18px;color:var(--muted)">Audit-first design lab. <em>Truth before design.</em></p><p class="tag" style="margin-top:28px">Wrong redesigns cost more.</p></div><div class="footer-col"><h4>Main</h4><ul><li><a href="/audit/">Audit</a></li><li><a href="/sprint/">Sprint</a></li><li><a href="/build/">Build</a></li><li><a href="/cases/">Cases</a></li></ul></div><div class="footer-col"><h4>Resources</h4><ul><li><a href="/principles/">Principles</a></li><li><a href="#">Privacy</a></li><li><a href="#">ISO 241 Compliance</a></li></ul></div><div class="footer-col"><h4>Request</h4><ul><li><a href="/contact/">Submit Request</a></li><li><a href="/audit/">Start With Audit</a></li><li><a href="mailto:hello@ragnarok.design">hello@ragnarok.design</a></li></ul></div></div><div class="wordmark">Ragnarok <span class="accent">Labs.</span></div><div class="footer-bottom"><span>© 2026 Ragnarok Design Labs</span><div class="legal"><a href="/principles/">Principles</a><a href="#">Privacy</a><a href="#">ISO 241 Compliance</a></div></div></div></footer>`;
}

function page({ title, active, body }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&family=Manrope:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/assets/styles.css"></head><body>${header(active)}${body}${footer()}${motionScript()}</body></html>`;
}

function motionScript() {
  return `<script type="module">
import { animate, inView } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const footer = document.querySelector('footer');
  const menu = document.querySelector('.mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const setMenu = (open) => {
    if (!menu || !menuToggle) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };

  menuToggle?.addEventListener('click', () => setMenu(true));
  menuClose?.addEventListener('click', () => setMenu(false));
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  if (prefersReduced) {
    document.documentElement.classList.add('motion-reduced');
    if (footer) {
      document.documentElement.style.setProperty('--footer-reveal', footer.scrollHeight + 'px');
    }
    return;
  }

  const revealSelectors = [
    '.hero .tag, .hero .tagline, .hero h1, .hero .hero-sub, .hero .hero-actions, .hero .hero-price, .hero .hero-trust',
    '.terminal, .artifact',
    '.section-head, .section > .wrap > .tag, .section > .wrap > .h-display, .section > .wrap > .hero-sub',
    '.stat, .move, .card, .package, .price-card, .panel, .measure-list li, .signal, .expertise-row, .process-item, .question-list li, .restraint-block, form'
  ];

  const revealItems = document.querySelectorAll(revealSelectors.join(','));
  revealItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(18px)';
    item.style.willChange = 'opacity, transform';
  });

  inView(revealItems, (element) => {
    const group = element.parentElement ? Array.from(element.parentElement.children).indexOf(element) : 0;
    const animation = animate(
      element,
      { opacity: [0, 1], transform: ['translateY(18px)', 'translateY(0px)'] },
      { duration: 0.72, delay: Math.min(Math.max(group, 0) * 0.045, 0.22), ease: [0.16, 1, 0.3, 1] }
    );
    if (animation.finished) {
      animation.finished.then(() => {
        element.style.willChange = 'auto';
      });
    }
  }, { amount: 0.18, margin: '0px 0px -12% 0px' });

  const textRevealSelectors = [
    '.h-display',
    '.h-section',
    '.h-card',
    '.quote',
    '.hero-sub',
    '.body-lg',
    '.body',
    '.sm',
    '.measure-list .name',
    '.measure-list .desc',
    '.clean-list li',
    '.price-card li',
    '.signal .name',
    '.expertise-row h3',
    '.expertise-row p',
    '.question-list .body'
  ];

  const splitTextNode = (node) => {
    const parts = node.textContent.match(/\\S+\\s*/g);
    if (!parts) return;

    const fragment = document.createDocumentFragment();
    parts.forEach((part) => {
      const word = document.createElement('span');
      word.className = 'reveal-word';
      word.textContent = part;
      fragment.appendChild(word);
    });
    node.replaceWith(fragment);
  };

  const prepareScrollText = (element) => {
    if (element.dataset.scrollRevealText === 'ready') return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest('a, button, input, select, textarea, label, script, style')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(splitTextNode);
    element.dataset.scrollRevealText = 'ready';
    element.classList.add('scroll-reveal-text');
  };

  const textRevealItems = Array.from(document.querySelectorAll(textRevealSelectors.join(','))).filter((element) => {
    return !element.closest('footer, .terminal-bar, .readout, .bars, form, .btn, .badge, .tag, .tagline, .meta-row, .price, .big-read');
  });

  textRevealItems.forEach(prepareScrollText);

  const updateScrollText = () => {
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    textRevealItems.forEach((element) => {
      const words = element.querySelectorAll('.reveal-word');
      if (!words.length) return;

      const rect = element.getBoundingClientRect();
      const start = viewport * 0.92;
      const end = viewport * 0.28;
      const raw = (start - rect.top) / Math.max(start - end, 1);
      const progress = Math.min(Math.max(raw, 0), 1);
      const spread = Math.max(words.length - 1, 1);

      words.forEach((word, index) => {
        const local = Math.min(Math.max((progress * (spread + 8) - index) / 8, 0), 1);
        const eased = 1 - Math.pow(1 - local, 3);
        word.style.setProperty('--word-opacity', (0.18 + eased * 0.82).toFixed(3));
      });

      element.classList.toggle('is-complete', progress >= 0.995);
    });
  };

  let textRevealFrame = 0;
  const requestTextRevealUpdate = () => {
    if (textRevealFrame) return;
    textRevealFrame = window.requestAnimationFrame(() => {
      textRevealFrame = 0;
      updateScrollText();
    });
  };

  window.addEventListener('scroll', requestTextRevealUpdate, { passive: true });
  window.addEventListener('resize', requestTextRevealUpdate);
  updateScrollText();

  document.querySelectorAll('.glow').forEach((glow, index) => {
    animate(
      glow,
      { transform: ['translate3d(0, 0, 0) scale(1)', 'translate3d(0, 24px, 0) scale(1.04)'] },
      { duration: 8 + index * 2, repeat: Infinity, repeatType: 'reverse', ease: 'ease-in-out' }
    );
  });

  document.querySelectorAll('.curve polyline').forEach((line) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
    inView(line.closest('.artifact') || line, () => {
      animate(line, { strokeDashoffset: [length, 0] }, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    }, { amount: 0.35 });
  });

  if (footer) {
    const syncFooterReveal = () => {
      const nextHeight = Math.ceil(footer.scrollHeight);
      document.documentElement.style.setProperty('--footer-reveal', nextHeight + 'px');
    };

    window.addEventListener('resize', syncFooterReveal);
    window.addEventListener('orientationchange', syncFooterReveal);
    syncFooterReveal();
  };
})();
</script>`;
}

const auditOffers = [
  {
    name: "Snapshot Audit",
    deck: "One flow. One focused investigation. Rapid structural clarity.",
    price: "€990",
    time: "5–7 working days",
    pill: "Start here",
    tone: "",
    bullets: [
      "Friction Map of the audited flow",
      "Decision conflict heatmap",
      "Structural layer breakdown",
      "Step-by-step friction curve",
      "Weighted fix priority recommendation (P0 / P1 / P2)",
      "Next-step classification: Stop, Sprint, or Build",
      "Loom walkthrough video of findings",
    ],
    why: "Most teams use this to stop an argument and start a decision. €990 is below the CFO-escalation threshold, but above the credibility floor.",
  },
  {
    name: "Flow Audit",
    deck: "One full user journey, completely mapped and measured.",
    price: "€2,400",
    time: "10–14 working days",
    pill: "Main offer — best fit",
    tone: "featured",
    bullets: [
      "Everything in Snapshot",
      "Full funnel segmentation across the journey",
      "Behavioral evidence analysis",
      "Decision delay timing map",
      "Cross-flow instability report",
      "Structural Correction Protocol",
      "30-minute findings readout call",
      "Implementation guidance for your development team",
    ],
    why: "The right choice when you know something is wrong but cannot isolate the source. It gives the team one corrective brief instead of another debate.",
  },
  {
    name: "Structural Sprint",
    deck: "Diagnosis and correction, delivered together.",
    price: "€6,500",
    time: "2 weeks",
    pill: "Audit + correction",
    tone: "warm",
    bullets: [
      "Complete Flow Audit",
      "Structural alignment implementation",
      "Architecture and design deliverables",
      "Before/after measurement: DWI, FSI, PRI indices",
      "Friction point resolution artifacts",
      "Implementation handoff for internal team",
      "2× 30-minute calls (brief + review)",
    ],
    why: "For teams that need the fix, not just the finding. Scope is locked before work begins. No additions after scope confirmation.",
  },
];

const sprintOffers = [
  {
    name: "2-Week Sprint",
    deck: "Contained correction for one validated structural break.",
    price: "€6,500",
    time: "2 weeks",
    pill: "Audit-defined correction",
    tone: "featured",
    bullets: ["Audit-defined correction scope", "Structural alignment implementation", "Architecture deliverables", "1–3 decision analytics targets", "Friction point resolution"],
    why: "Best when the audit already confirms a specific flow-level break and the foundation is still viable.",
  },
  {
    name: "4-Week Sprint",
    deck: "Multi-flow correction after structural validation.",
    price: "€10,000–15,000",
    time: "4 weeks",
    pill: "Multi-flow correction",
    tone: "warm",
    bullets: ["Wider correction window", "Scope confirmed only after validation", "Correction protocol", "Before/after metrics", "Implementation handoff"],
    why: "Not available without Audit. The point is correction, not speculation.",
  },
];

function expertiseSection() {
  const items = [
    ["01", "Decision friction", "We locate the moments where intent slows down, splits, or reverses before action."],
    ["02", "Hierarchy conflict", "We expose competing priorities that make the next decision harder than it should be."],
    ["03", "Signal overload", "We reduce excess inputs so users can read the system without defensive scanning."],
    ["04", "Trust breakdown", "We identify where confidence drops because proof, timing, or context arrives too late."],
    ["05", "Flow collapse", "We trace where sequence logic fails and momentum stops carrying the user forward."],
    ["06", "Cognitive switching cost", "We map the jumps between contexts that force users to re-orient repeatedly."],
  ];
  return `<section class="section expertise-section"><div class="wrap expertise-grid"><div class="expertise-intro"><div class="tag">// what ragnarok does</div><h2 class="h-section" style="margin-top:22px">We do not start with redesign. <em>We start with diagnosis.</em></h2><p class="body-lg">We examine decision paths across digital products, service flows, automotive interfaces, mobile apps, SaaS platforms, and complex systems.</p></div><div class="expertise-list">${items.map(([n, title, text]) => `<div class="expertise-row"><div class="n">${n}</div><h3>${title}</h3><p>${text}</p></div>`).join("")}</div></div></section>`;
}

function frictionAccordion() {
  const items = [
    ["01", "Funnel segmentation", "Split drop-off by intent cohort, channel, and decision depth.", "Shows which users hesitate and whether the break belongs to intent, timing, or flow structure."],
    ["02", "Decision delay analysis", "Measure hesitation latency at each commitment boundary.", "Finds the exact step where confidence slows before the user abandons or backtracks."],
    ["03", "Cognitive load hotspots", "Locate screens where signal density exceeds processing capacity.", "Separates useful information from noise so the action path becomes readable again."],
    ["04", "Hierarchy conflict detection", "Expose competing signals that dilute clarity and suppress conversion.", "Reveals when several messages fight for the same decision moment."],
    ["05", "Cross-flow instability mapping", "Trace how upstream decisions destabilise later steps.", "Connects early uncertainty to downstream abandonment instead of treating each screen alone."],
  ];
  return `<div class="measure-list accordion">${items.map(([n, title, desc, more], index) => `<details ${index === 0 ? "open" : ""}><summary><span class="n">${n}</span><div><div class="name">${title}</div><div class="desc">${desc}</div></div><span class="chev">+</span></summary><div class="more">${more}</div></details>`).join("")}</div>`;
}

function questionPanel() {
  const items = [
    "What decision in our product is creating the most user hesitation?",
    "Where is the friction: interface, flow, or hierarchy?",
    "How will we measure whether the redesign actually worked?",
    "What is the cost of doing nothing for the next 30 days?",
  ];
  return `<section class="section"><div class="wrap"><div class="question-panel"><div class="tag">// before you hire</div><h2 class="question-title">Before you hire anyone; including us, ask this.</h2><ul class="question-list">${items.map(text => `<li><span class="plus">+</span><span class="body">${text}</span></li>`).join("")}</ul></div></div></section>`;
}

function processRowSection({ kicker, title, body, items }) {
  return `<section class="section process-row-section"><div class="wrap process-row-layout"><div class="process-row-copy"><div class="tag">${kicker}</div><h2 class="h-section" style="margin-top:20px">${title}</h2><p class="body-lg">${body}</p></div><div class="process-list">${items.map(([n, meta, text]) => `<div class="process-item"><span class="n">${n}</span><p class="body">${text}</p><span class="meta">${meta}</span></div>`).join("")}</div></div></section>`;
}

function afterAuditSection() {
  return `<section class="section"><div class="wrap"><div class="section-head after-audit-head"><div class="num">// after audit</div><div><h2 class="h-section">What happens after the Audit?</h2><div class="hero-actions"><a class="btn accent" href="/contact/">Request Audit <span>→</span></a><a class="btn ghost" href="/build/">Request Evaluation</a></div></div></div><div class="cards-3"><div class="card"><div class="meta-row"><span>01</span><span>STOP</span></div><h3 class="h-card">System is stable</h3><p class="body">Structural friction identified and resolved. No further work needed.</p></div><div class="card"><div class="meta-row"><span>02</span><span>SPRINT</span></div><h3 class="h-card">Correction required</h3><p class="body">Targeted 2-week sprint fixes the identified break.</p></div><div class="card"><div class="meta-row"><span>03</span><span>BUILD</span></div><h3 class="h-card">Rebuild needed</h3><p class="body">Scope confirmed and structural brief prepared.</p></div></div></div></section>`;
}

function pricingStack(items, enterprise = false) {
  return `<div class="pricing-stack">${items.map(item => `<article class="price-card ${item.tone || ""}"><div class="price-card-head"><div><span class="pill ${item.tone === "featured" ? "green" : item.tone === "warm" ? "" : "muted"}">${item.pill}</span><h3>${item.name}</h3><p class="deck">${item.deck}</p></div><div><div class="amount">${item.price}</div><div class="time">${item.time}</div></div></div><ul>${item.bullets.map(b => `<li>${b}</li>`).join("")}</ul><div class="why">${item.why}</div></article>`).join("")}${enterprise ? `<article class="price-card"><div class="price-card-head"><div><span class="pill muted">Enterprise — not sold cold</span><h3>System Reconstruction</h3><p class="deck">Full architectural rebuild with structural integrity as the foundation.</p></div><div><div class="amount">Enquiry</div><div class="time">4–12 weeks</div></div></div><div class="why">Targeted Implementation: €25,000–80,000. System-Level Reconstruction: €70,000–160,000+. This comes through prior structural validation, referral, or existing Audit/Sprint clients.</div><a class="btn ghost" style="margin-top:18px;color:#fff;border-color:rgba(255,255,255,.24)" href="/build/">View Build →</a></article>` : ""}</div>`;
}

function doNothingBlock() {
  return `<section class="section restraint-section"><div class="wrap"><div class="restraint-head"><div class="num">// restraint</div><div><h2 class="h-section">Doing nothing is a valid option.</h2><p class="body-lg">Audit clarifies which situation you are in: action, or restraint.</p></div></div><div class="restraint-grid"><div class="restraint-block"><h3>When doing nothing is correct</h3><ul><li>The structure is stable</li><li>The change is seasonal</li><li>The problem is discomfort, not measurable friction</li></ul></div><div class="restraint-block"><h3>When doing nothing compounds loss</h3><ul><li>Hesitation sits inside a revenue path</li><li>Paid traffic scales inefficiency</li><li>Teams patch symptoms instead of structure</li></ul></div></div></div></section>`;
}

const pages = {
  "index.html": page({ title:"Ragnarok Design Labs", active:"Home", body:`<main><section class="hero home-hero"><div class="glow"></div><div class="glow small"></div><div class="wrap hero-grid"><div class="hero-copy"><div class="hero-text"><div class="tagline"><span>// decisions</span><span>v.016</span><span>iso 241</span></div><h1 class="h-display" style="margin-top:42px">We diagnose why digital products lose conversion, and redesign the decision architecture. <em>not the interface.</em></h1><p class="hero-sub">When users hesitate or abandon, the issue is rarely visual. It is structural. We identify where decisions break inside your flows so you do not redesign blind.</p></div>${terminal()}<div class="hero-actions"><a class="btn accent" href="/audit/">Start With an Audit <span>→</span></a><a class="btn ghost" href="/cases/">View Investigations <span>→</span></a></div><div class="hero-trust tag">Confidential by default · No public client logos · Audit-first engagements</div></div></div></section>
  <section class="section" style="padding-top:74px"><div class="wrap stats-grid"><div class="stat"><div class="n">92<sup>%</sup></div><p class="caption body">Of trust perception is set by hierarchy and signal alignment before conversion logic is tested.</p><span class="tag">01 / Trust perception</span></div><div class="stat"><div class="n">64<sup>%</sup></div><p class="caption body">Abandonment happens at flow transitions, not because users lack intent, but because the sequence breaks momentum.</p><span class="tag">02 / Abandonment</span></div><div class="stat"><div class="n">50<sup>ms</sup></div><p class="caption body">One hesitation moment at a decision point is enough to double drop-off downstream.</p><span class="tag">03 / Cognitive delay</span></div></div></section>
  ${expertiseSection()}
  <section class="section" id="moves"><div class="wrap"><div class="section-head"><div class="num">// outcomes</div><div><h2 class="h-section">Clarity does not happen by accident. <em>It happens when structure is diagnosed, corrected, and reconstructed.</em></h2><p class="body-lg" style="margin-top:24px;color:var(--muted)">There are only three moves. Most teams start with the third.</p></div></div><div class="moves"><div class="move"><div class="meta-row"><span>Audit</span><span>01 / [ Diagnose ]</span></div><h3>Audit</h3><p class="body">Locate the decision break. Map the system. Remove assumption.</p></div><div class="move"><div class="meta-row"><span>Sprint</span><span>02 / [ Decide ]</span></div><h3>Sprint</h3><p class="body">Define the correction. Protect momentum. Eliminate friction.</p></div><div class="move"><div class="meta-row"><span>Build</span><span>03 / [ Execute ]</span></div><h3>Build</h3><p class="body">Implement with constraint. Measure impact. Refine deliberately.</p></div></div></div></section>
  <section class="section"><div class="wrap split"><div><div class="tag">// friction</div><h2 class="h-section" style="margin-top:22px">How we measure <em>decision friction.</em></h2><p class="body-lg" style="margin-top:26px;color:var(--muted)">Behavioral drop-off analysis and hierarchy conflict detection are applied against critical decision points.</p>${frictionAccordion()}<a class="btn accent" style="margin-top:30px" href="/audit/">Start With an Audit <span>→</span></a></div><div>${artifact("Diagnostic preview · abandonment delta")}</div></div></section>
  <section class="section"><div class="wrap"><div class="section-head"><div class="num">// process</div><h2 class="h-section">Most structural work happens inside sensitive systems. <em>Instead of logos, we show process artifacts and measurable outcomes.</em></h2></div><div class="cards-3"><div class="card"><div class="meta-row"><span>01 / Depth</span></div><h3 class="h-card">Structural Depth Identified</h3><p class="body">We uncover 27–52 structural friction points per system.</p></div><div class="card"><div class="meta-row"><span>02 / Privacy</span></div><h3 class="h-card">Confidential by Default</h3><p class="body">Mutual NDA. No logos. Artifacts anonymised.</p></div><div class="card"><div class="meta-row"><span>03 / Speed</span></div><h3 class="h-card">Rapid Time-to-Clarity</h3><p class="body">Within 10 days, you receive a prioritised diagnosis.</p></div></div></div></section>
  <section class="section"><div class="wrap"><div class="panel lav callout"><div><div class="tag">You may not need us</div><h2 class="h-section" style="margin-top:18px">Clarity Before Change.</h2></div><div><p class="body-lg">If your numbers are stable and your flow is controlled, you may not need us. If conversion rates are structurally sound and growth is not friction-bound, continue.</p><p class="tag" style="margin-top:20px;color:var(--accent)">→ If decisions are unclear or redesign feels like guesswork, proceed below.</p><a class="btn accent" style="margin-top:26px" href="/audit/">Start With Audit <span>→</span></a></div></div></div></section>
  <section class="section dark"><div class="wrap callout"><h2 class="h-section">Built for products where structural clarity directly impacts performance, revenue, or risk.</h2><div><a class="btn accent" href="/audit/">Unlock insights with an audit <span>→</span></a><a class="btn ghost" style="color:#fff;margin-left:10px" href="#moves">See decision levels</a></div></div></section></main>` }),
  "audit/index.html": page({ title:"Structural Product Audit · Ragnarok", active:"Audit", body:`<main><section class="hero"><div class="glow"></div><div class="wrap hero-grid"><div><div class="tag">RAGNAROK DESIGN · 1–01 · LABS</div><h1 class="h-display" style="margin-top:40px">Structural Product Audit</h1><p class="hero-sub"><b>Redesign is a reaction. Diagnosis is a decision.</b><br>Most digital problems are not visual. They are structural. Ragnarok examines digital systems, identifies where decisions create unnecessary friction, and delivers a prioritised structural action plan.</p><div class="hero-actions"><a class="btn accent" href="/contact/">Request Audit <span>→</span></a><a class="btn ghost" href="#packages">Start with Audit (recommended)</a></div><div class="hero-price tag">Most engagements begin with structural diagnosis.</div></div>${artifact()}</div></section><section class="section"><div class="wrap split"><div><div class="tag">// deliverables</div><h2 class="h-section" style="margin-top:20px">What you actually get</h2><p class="body-lg" style="margin-top:22px;color:var(--muted)">This is probably different from what you are expecting. The audit does not produce design concepts. It produces a ranked structural action plan.</p></div><div class="panel"><ul class="clean-list"><li>Friction Map of the audited flow or system</li><li>Decision conflict heatmap</li><li>Structural layer breakdown</li><li>Step-by-step friction curve</li><li>Weighted fix priority recommendation</li><li>Next-step classification: Stop, Sprint, or Build</li></ul><div class="tag" style="margin-top:28px">Timeline: 7–10 days · From €990</div><a class="btn accent" style="margin-top:22px" href="/contact/">Request Audit <span>→</span></a></div></div></section><section class="section"><div class="wrap">${artifact("Friction Map: Onboarding Flow — Sample Output")}<div class="panel" style="margin-top:28px"><div class="tag">Artifact Fixture · Actual Audit Output [Document]</div><p class="body-lg" style="margin-top:14px">Past observations: shows all 27–52 structural points per system. Expected time: 7–10 days. Entry: €990.</p></div></div></section><section class="section"><div class="wrap"><div class="section-head"><div class="num">// archive</div><h2 class="h-section">Diagnostic Archive</h2></div><div class="cards-3"><div class="card"><span class="badge">Anonymised engagement</span><h3 class="h-card">Structural Breakdown: Onboarding Collapse</h3><p class="body">Decision sequence failure inside account creation.</p></div><div class="card"><span class="badge">Illustrative</span><h3 class="h-card">Structural Breakdown: Checkout Collapse</h3><p class="body">Commitment pressure before value confirmation.</p></div><div class="card"><span class="badge">Illustrative</span><h3 class="h-card">Structural Breakdown: Hierarchy Confusion</h3><p class="body">Competing anchors suppress primary action.</p></div></div></div></section>${questionPanel()}<section class="section" id="packages"><div class="wrap"><div class="section-head"><div class="num">// packages</div><div><h2 class="h-section">Receive a ranked structural action plan in 7–10 days.</h2><p class="body-lg" style="margin-top:18px;color:var(--muted)">We identify where decisions break — before you redesign blind.</p></div></div>${pricingStack(auditOffers, false)}<div class="panel lav" style="margin-top:18px"><div class="tag">Default path</div><h3 class="h-card" style="margin-top:10px">Not sure? Start with Snapshot.</h3><p class="body" style="margin-top:10px;color:var(--muted)">System Reconstruction is handled on the Build page, not as an Audit-page package.</p><a class="btn accent" style="margin-top:18px" href="/contact/">Start with Snapshot <span>→</span></a><a class="btn ghost" style="margin-top:18px;margin-left:8px" href="/build/">System Reconstruction enquiry</a></div></div></section>${doNothingBlock()}${afterAuditSection()}</main>` }),
  "sprint/index.html": page({ title:"Structural Sprint · Ragnarok", active:"Sprint", body:`<main><section class="hero"><div class="glow"></div><div class="wrap hero-grid"><div><div class="tag">RAGNAROK DESIGN · 2–01 · LABS</div><h1 class="h-display" style="margin-top:40px">Structural Sprint</h1><p class="hero-sub"><b>Correction, not redesign.</b> Sprint targets the highest structural friction, removes it, and validates the result. Scope is defined by audit findings only.</p><div class="hero-actions"><a class="btn accent" href="/contact/">Request Sprint Evaluation <span>→</span></a><a class="btn ghost" href="/audit/">Start with Audit (recommended)</a></div><div class="hero-price tag">If structural friction is not yet confirmed, start with Audit.</div></div>${terminal("sprint")}</div></section><section class="section"><div class="wrap stats-grid"><div class="stat"><div class="n">18.6</div><p class="caption body">Pre-analysis DWI</p><span class="tag">DWI / high friction</span></div><div class="stat"><div class="n">7.2</div><p class="caption body">Stabilisation DWI</p><span class="tag">–60% DWI</span></div><div class="stat"><div class="n">83</div><p class="caption body">FSI after correction, with PRI contained at 0.29.</p><span class="tag">FSI / PRI contained</span></div></div></section>${processRowSection({ kicker:"// correction window", title:"One system. One targeted fix.", body:"We implement validated structural change, measure behavioural difference, and stabilise the system.", items:[["01","Scope lock","Scope defined from audit. No additions."],["02","Implement","Structural change applied with precision."],["03","Validate","Before/after measurement confirms impact."]] })}<section class="section"><div class="wrap"><div class="section-head"><div class="num">// packages</div><h2 class="h-section">Sprint packages</h2></div>${pricingStack(sprintOffers, false)}<div class="panel lav" style="margin-top:18px"><p class="body"><b>Sprint scope is determined only after Audit.</b> If no Audit has been completed, start with Audit first.</p><a class="btn accent" style="margin-top:18px" href="/audit/">Start with Audit <span>→</span></a></div></div></section><section class="section"><div class="wrap split"><div class="panel"><h2 class="h-card">When you need Sprint</h2><ul class="clean-list"><li>Audit confirmed structural friction in a specific flow</li><li>Foundation is viable but correction is needed</li><li>Validated friction exists and full rebuild is not required</li></ul></div><div class="panel"><h2 class="h-card">Sprint is not right when</h2><ul class="clean-list"><li>No audit has been done</li><li>Problem appears brand- or copy-level</li><li>Architecture is fundamentally broken</li></ul></div></div></section><section class="section dark"><div class="wrap callout"><h2 class="h-section">We do not sell aesthetics. We implement coherent systems.</h2><div><a class="btn accent" href="/contact/">Request Structural Evaluation <span>→</span></a><a class="btn ghost" style="color:#fff;margin-left:10px" href="/audit/">Request Audit</a></div></div></section></main>` }),
  "build/index.html": page({ title:"Structural Build · Ragnarok", active:"Build", body:`<main><section class="hero"><div class="glow"></div><div class="wrap hero-grid"><div><div class="tag">RAGNAROK DESIGN · 3–01 · LABS</div><h1 class="h-display" style="margin-top:40px">Structural Build</h1><p class="hero-sub">What separates design growth from systemic failure is the architectural foundation systems are built upon. We design and build web platforms, web systems, and mobile applications with structural integrity as the foundation.</p><div class="hero-actions"><a class="btn accent" href="/contact/">Request Structural Evaluation <span>→</span></a><a class="btn ghost" href="/audit/">Not sure yet? Start with Audit</a></div></div>${terminal()}</div></section><section class="section"><div class="wrap split"><div class="panel lav"><h2 class="h-card">Build is for</h2><ul class="clean-list"><li>Complex digital products</li><li>Enterprise web systems</li><li>SaaS platforms needing full structural redesign</li></ul></div><div class="panel"><h2 class="h-card">Build is not for</h2><ul class="clean-list"><li>Aesthetic redesigns</li><li>Products where Audit or Sprint would solve the problem</li></ul></div></div></section><section class="section"><div class="wrap">${packages(["Targeted Implementation","€25,000–80,000","Scoped build","Validated foundation",["Defined implementation path","Structural design system","Platform delivery","Measurement handoff"]],["System-Level Reconstruction","€70,000–€160,000+","4–12 weeks","Enterprise",["Architecture rebuild","Multi-flow reconstruction","System-wide decision logic","Governed delivery"]],["Evaluation","Enquiry","Before scope","Route first",["We review context before quoting","Most teams begin with Audit","Sprint may be enough"]])}<div class="hero-actions"><a class="btn accent" href="/contact/">Request Structural Evaluation <span>→</span></a></div></div></section></main>` }),
  "cases/index.html": page({ title:"Investigation Reports · Ragnarok", active:"Cases", body:`<main><section class="hero"><div class="glow"></div><div class="wrap narrow"><div class="tag">Real systems · Real failures · Structural analysis</div><h1 class="h-display" style="margin-top:40px">Investigation Reports</h1><p class="hero-sub">Each report documents a system investigation, identifying where interaction structures collapse and how they can be corrected.</p></div></section><section class="section"><div class="wrap callout"><blockquote class="quote">“Most case studies show finished designs. These reports show how digital systems fail and what structural changes improve them.”</blockquote><div><ul class="measure-list"><li><span class="n">01</span><div class="body">Decision structure</div><span></span></li><li><span class="n">02</span><div class="body">Interaction flow</div><span></span></li><li><span class="n">03</span><div class="body">System complexity</div><span></span></li><li><span class="n">04</span><div class="body">Measurable outcomes</div><span></span></li></ul></div></div></section><section class="section"><div class="wrap"><div class="section-head"><div class="num">// archive</div><h2 class="h-section">Report Archive</h2></div><div class="cards-3"><div class="card"><span class="badge accent">Anonymised engagement</span><h3 class="h-card">Checkout did not fail. The decision did.</h3><p class="body">Industry: Commerce. System: Checkout. Commitment pressure before trust signal completion.</p><a class="btn ghost" style="margin-top:24px" href="/audit/">Read Investigation →</a></div><div class="card"><span class="badge">Primary research</span><h3 class="h-card">Cupra blind spot detection</h3><p class="body">Industry: Automotive. System: Safety interaction. Signal priority and response timing.</p><a class="btn ghost" style="margin-top:24px" href="/audit/">Read Investigation →</a></div><div class="card"><span class="badge">Illustrative case</span><h3 class="h-card">SaaS onboarding collapse</h3><p class="body">Industry: SaaS. System: Onboarding. Competing anchors caused early re-evaluation.</p><a class="btn ghost" style="margin-top:24px" href="/audit/">Read Investigation →</a></div></div></div></section><section class="section dark"><div class="wrap callout"><h2 class="h-section">Each report focuses on structural insights, not design aesthetics.</h2><div><p class="body-lg">Most interface problems originate from deeper architectural decisions. Understanding these patterns helps prevent expensive redesign cycles.</p><div class="hero-actions"><a class="btn accent" href="/audit/">Start With Structural Audit <span>→</span></a><a class="btn ghost" style="color:#fff" href="/contact/">Request Structural Evaluation</a></div></div></div></section></main>` }),
  "principles/index.html": page({ title:"Principles · Ragnarok", active:"", body:`<main><section class="hero"><div class="wrap narrow"><div class="tag">RAGNAROK DESIGN · Principles</div><h1 class="h-display" style="margin-top:40px">Truth before design.</h1><p class="hero-sub">Ragnarok is audit-first. We diagnose structure before changing interface, protect confidentiality by default, and only recommend depth that the evidence supports.</p></div></section><section class="section"><div class="wrap cards-3"><div class="card"><div class="meta-row"><span>01</span><span>Diagnosis</span></div><h3 class="h-card">No redesign blind</h3><p class="body">Every intervention begins with a defined decision break.</p></div><div class="card"><div class="meta-row"><span>02</span><span>Constraint</span></div><h3 class="h-card">Smallest viable correction</h3><p class="body">We correct the structural layer that causes measurable friction.</p></div><div class="card"><div class="meta-row"><span>03</span><span>Confidentiality</span></div><h3 class="h-card">No logo theatre</h3><p class="body">Sensitive systems stay private. Public artifacts are anonymised.</p></div></div></section></main>` }),
  "contact/index.html": page({ title:"Request Structural Evaluation · Ragnarok", active:"Contact", body:`<main><section class="hero"><div class="glow"></div><div class="wrap narrow"><div class="tag">Contact · Structural Review</div><h1 class="h-display" style="margin-top:40px">Request Structural Evaluation</h1><p class="hero-sub">If structural friction is affecting your product, flows, or system architecture, describe your situation. We review each request and determine the appropriate intervention level.</p></div></section><section class="section"><div class="wrap cards-3"><div class="card"><div class="meta-row"><span>01</span><span>Structural review</span></div><p class="body">We review your system context and identify where instability likely originates.</p></div><div class="card"><div class="meta-row"><span>02</span><span>Depth determination</span></div><p class="body">We determine the appropriate intervention level: AUDIT / SPRINT / BUILD.</p></div><div class="card"><div class="meta-row"><span>03</span><span>Recommendation</span></div><p class="body">You receive a recommended next step and engagement scope.</p></div></div></section><section class="section"><div class="wrap split"><form class="panel"><div class="form-grid"><div class="field"><label>Company / Product name</label><input placeholder="Company name"></div><div class="field"><label>Company website</label><input placeholder="https://"></div><div class="field full"><label>Describe the system briefly</label><textarea placeholder="Describe flow issue e.g. users drop at checkout... decision hierarchy confusion..."></textarea></div><div class="field"><label>System type</label><select><option>SaaS</option><option>E-commerce</option><option>Mobile app</option><option>Automotive</option><option>Web platform</option><option>Other</option></select></div><div class="field"><label>Product scale</label><select><option>Early growth</option><option>Scaling</option><option>Enterprise</option><option>Unknown</option></select></div><div class="field full"><label>Current structural concern</label><div class="checks">${["Conversion instability","Flow breakdown","Structural redesign required","Product scaling challenges","Decision hierarchy confusion","System architecture complexity"].map(x=>`<label class="check"><input type="checkbox"> ${x}</label>`).join("")}</div></div><div class="field full"><label>What are you considering?</label><div class="checks">${["Structural Audit","Structural Sprint","Structural Build"].map(x=>`<label class="check"><input type="checkbox"> ${x}</label>`).join("")}</div></div><div class="field"><label>Timeline</label><select><option>Immediate</option><option>Next 30 days</option><option>This quarter</option><option>Exploring</option></select></div><div class="field"><label>Name + Email</label><input placeholder="Name · email@company.com"></div></div><p class="sm" style="margin-top:18px">We review requests personally. Response within 1–2 business days.</p><button class="btn accent" style="margin-top:22px" type="button">Submit Structural Request <span>→</span></button></form><div><div class="tag">// before reaching out</div><h2 class="h-section" style="margin-top:18px">Make sure this is the right fit.</h2><p class="body-lg" style="margin-top:22px;color:var(--muted)">We work best with teams operating complex digital products where friction is measurable and structural decisions affect performance, revenue, or system stability.</p><div class="panel" style="margin-top:28px"><div class="tag">We typically do not provide</div><div class="hero-actions"><span class="badge">Surface-level visual redesign</span><span class="badge">Speculative concept exploration</span><span class="badge">Unpaid discovery or analysis</span></div></div><p class="body" style="margin-top:28px">Not sure where to start? Most teams begin with Structural Audit to determine the correct depth.</p><a class="btn accent" style="margin-top:18px" href="/audit/">Start With Audit <span>→</span></a></div></div></section></main>` }),
};

function packages(...items) {
  return `<div class="packages">${items.map(([name, price, time, badge, bullets]) => `<div class="package"><span class="badge ${badge.includes("Start") || badge.includes("Most") || badge.includes("Recommended") ? "accent" : ""}">${badge}</span><h3 class="h-card">${name}</h3><div class="price">${price}</div><div class="tag">${time}</div><ul>${bullets.map(b => `<li>${b}</li>`).join("")}</ul><a class="btn ghost" style="margin-top:24px" href="/contact/">Request <span>→</span></a></div>`).join("")}</div>`;
}

function needUs(cta) {
  return `<section class="section"><div class="wrap"><div class="panel lav callout"><div><div class="tag">You may not need us</div><h2 class="h-section" style="margin-top:18px">Evidence before engagement.</h2></div><div><p class="body-lg">If your product is not experiencing measurable friction, unclear drop-off patterns, or structural uncertainty, you may not need an audit. We work best with teams where decisions have measurable consequences.</p><a class="btn accent" style="margin-top:24px" href="/contact/">${cta}</a></div></div></div></section>`;
}

writeFileSync(join(root, "assets", "styles.css"), css);
writeFileSync(join(root, "assets", "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" fill="#fff" stroke="#0a0a0b" stroke-width="2"/><path d="M10 10h14v2H12v10h-2z" fill="#0a0a0b"/><rect x="14" y="14" width="6" height="6" fill="#6b2fe0"/></svg>`);
for (const [file, html] of Object.entries(pages)) {
  const dir = file.includes("/") ? file.split("/").slice(0, -1).join("/") : "";
  if (dir) mkdirSync(join(root, dir), { recursive: true });
  writeFileSync(join(root, file), html);
}
