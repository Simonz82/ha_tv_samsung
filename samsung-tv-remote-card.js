/* samsung-tv-remote-card - Remote card for Samsung TVs (samsungtv_smart / samsungtv). No dependencies. */
const STRINGS = {
  it: { on: "Acceso", off: "Spento", unavailable: "Non disponibile", playing: "IN RIPRODUZIONE", source: "SORGENTE", apps: "APP", volume: "VOLUME",
        picture: "IMMAGINE E AUDIO", modes: "MODALITA", pic: "Immagine", snd: "Audio", art: "Art Mode", ambient: "Ambient", poweroff: "Spegni",
        keypad: "TASTIERINO NUMERICO", nothing: "Nessun contenuto", name: "Nome", entity: "Entita TV (media_player)", remote: "Entita remote (facoltativa)",
        power: "Sensore potenza (facoltativo)", script: "Script accensione (facoltativo)", layout: "Layout", auto: "Automatico", remoteL: "Telecomando", panelL: "Pannello",
        sp: "Mostra immagine", ss: "Mostra audio", sa: "Mostra Art Mode", sm: "Mostra Ambient", apps_note: "Le app si configurano in YAML (apps:)" },
  en: { on: "On", off: "Off", unavailable: "Unavailable", playing: "NOW PLAYING", source: "SOURCE", apps: "APPS", volume: "VOLUME",
        picture: "PICTURE & SOUND", modes: "MODES", pic: "Picture", snd: "Sound", art: "Art Mode", ambient: "Ambient", poweroff: "Turn off",
        keypad: "NUMBER PAD", nothing: "Nothing playing", name: "Name", entity: "TV entity (media_player)", remote: "Remote entity (optional)",
        power: "Power sensor (optional)", script: "Turn-on script (optional)", layout: "Layout", auto: "Automatic", remoteL: "Remote", panelL: "Panel",
        sp: "Show picture", ss: "Show sound", sa: "Show Art Mode", sm: "Show Ambient", apps_note: "Apps are configured in YAML (apps:)" },
};
const DEFAULT_APPS = [
  { name: "Netflix", color: "#e50914" }, { name: "YouTube", color: "#ff0000" },
  { name: "Prime Video", color: "#00a8e1" }, { name: "Disney+", color: "#1f3a8a" },
];
const CSS = `
:host{display:block}
*{box-sizing:border-box;margin:0}
.card{position:relative;font-family:var(--paper-font-body1_-_font-family,Inter,system-ui,Roboto,sans-serif);color:#e5edf7;background:linear-gradient(160deg,#172033,#0e1626);border:1px solid #ffffff14;border-radius:26px;padding:16px;box-shadow:0 14px 40px #0009}
.hdr{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.hdr .ic{width:42px;height:42px;border-radius:14px;background:#1d4ed822;display:grid;place-items:center;--mdc-icon-size:24px;color:#93c5fd}
.hdr h3{font-size:15px;font-weight:700}.hdr small{color:#8fa3bd;font-size:12px}
.hdr .w{margin-left:auto;font-size:12px;color:#8fa3bd}
.dot{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 10px #22c55e}
.off .dot,.unavailable .dot{background:#64748b;box-shadow:none}
.split{display:block}
.panel-wide .split{display:grid;grid-template-columns:290px 1fr;gap:18px;align-items:start}
.remote{width:100%;max-width:300px;margin:0 auto;padding:18px 16px 22px;border-radius:44px;background:linear-gradient(145deg,#2b3140,#14181f 55%,#1d222c);box-shadow:inset 0 1px 0 #ffffff26,inset 0 -2px 6px #0008,0 18px 30px #000a,0 0 0 1px #000;position:relative}
.remote:before{content:"";position:absolute;inset:0;border-radius:44px;background:repeating-linear-gradient(90deg,#ffffff05 0 1px,transparent 1px 3px);pointer-events:none}
.solar{height:14px;margin:0 auto 12px;width:60%;border-radius:8px;background:repeating-linear-gradient(90deg,#0b0f17 0 6px,#161c29 6px 8px);border:1px solid #000}
.mic{width:11px;height:11px;border-radius:50%;margin:0 auto 12px;background:radial-gradient(#334155,#05080d)}
.row{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:10px 0;position:relative}
button{font-family:inherit}
.b{border:0;cursor:pointer;color:#e8eef7;font-size:11px;font-weight:700;background:linear-gradient(180deg,#3a4152,#232834);border-radius:50%;width:46px;height:46px;display:grid;place-items:center;--mdc-icon-size:21px;position:relative;box-shadow:0 2px 0 #0009,0 5px 8px #0007,inset 0 1px 0 #ffffff30;transition:transform .08s,filter .15s}
.b:active{transform:translateY(2px);filter:brightness(1.25)}
.sm{width:40px;height:40px;--mdc-icon-size:19px}
.pwr{background:linear-gradient(180deg,#ef4444,#b91c1c);width:44px;height:44px}
.pwr.on{box-shadow:0 0 14px #ef444488,0 5px 8px #0007}
.dpad{width:216px;height:216px;max-width:100%;border-radius:50%;margin:14px auto;position:relative;background:radial-gradient(circle,#10141c 0 38%,#262c3a 39% 100%);box-shadow:inset 0 2px 4px #ffffff22,inset 0 -6px 12px #0009,0 6px 14px #0009}
.dpad button{position:absolute;border:0;background:none;color:#cbd5e1;cursor:pointer;--mdc-icon-size:30px;width:64px;height:48px;display:grid;place-items:center}
.dpad button:active{color:#fff}
.dpad .u{top:6px;left:50%;transform:translateX(-50%)}.dpad .d{bottom:6px;left:50%;transform:translateX(-50%)}
.dpad .l{left:4px;top:50%;transform:translateY(-50%);width:48px;height:64px}.dpad .r{right:4px;top:50%;transform:translateY(-50%);width:48px;height:64px}
.dpad .ok{position:absolute;inset:34%;width:auto;height:auto;transform:none;border-radius:50%;background:radial-gradient(circle at 40% 30%,#4b5568,#1b2029);font-weight:800;font-size:13px;color:#fff;box-shadow:0 3px 8px #000a,inset 0 1px 0 #fff3}
.rock{display:flex;flex-direction:column;width:52px;border-radius:26px;background:linear-gradient(90deg,#2b3140,#1b202a);box-shadow:0 2px 0 #0009,0 6px 10px #0008,inset 0 1px 0 #fff2;overflow:hidden}
.rock button{border:0;background:none;color:#e5edf7;height:46px;cursor:pointer;display:grid;place-items:center;--mdc-icon-size:22px}
.rock button:active{background:#ffffff18}
.rock .mid{font-size:10px;text-align:center;color:#8fa3bd;letter-spacing:.08em;padding:2px 0}
.col{display:flex;flex-direction:column;gap:10px;align-items:center;padding-top:6px}
.colors{display:flex;justify-content:space-between;margin:12px 0}
.cb{width:62px;height:11px;border-radius:6px;border:0;cursor:pointer;box-shadow:0 2px 4px #0008}
.apps{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:12px 0 4px}
.app{border:0;border-radius:14px;height:38px;font-weight:800;font-size:12px;color:#fff;cursor:pointer;box-shadow:0 3px 6px #0008,inset 0 1px 0 #ffffff33;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:0 6px}
.app:active{filter:brightness(1.25)}
.panel h2{font-size:12px;color:#8fa3bd;letter-spacing:.1em;margin:14px 0 8px;font-weight:600}
.chips{display:flex;gap:6px;flex-wrap:wrap}
.chip{border:1px solid #ffffff22;background:#ffffff0d;color:#dbe6f5;border-radius:999px;padding:7px 13px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}
.chip.on{background:#2563eb;border-color:#60a5fa;color:#fff}
select.chip{appearance:none;-webkit-appearance:none;background-image:none;max-width:100%}
select.chip option{background:#0e1626;color:#fff}
.mods{display:flex;gap:8px;flex-wrap:wrap}.mods>*{flex:1;text-align:center;min-width:110px}
.hero{border-radius:20px;min-height:110px;background:linear-gradient(120deg,#0f172a,#1e3a8a 60%,#312e81) center/cover;display:flex;align-items:flex-end;padding:12px;position:relative;overflow:hidden}
.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#000a,transparent 70%)}
.hero div{position:relative;z-index:1}.hero small{color:#93c5fd;font-size:11px;letter-spacing:.08em}.hero b{display:block;font-size:17px}.hero span{font-size:12px;color:#cbd5e1}
.vol{display:flex;align-items:center;gap:10px;color:#8fa3bd;font-size:13px;--mdc-icon-size:20px}
.vol input{flex:1;accent-color:#3b82f6;height:6px}
.pop{display:none;position:absolute;left:50%;transform:translateX(-50%);bottom:70px;width:230px;background:#0b1220f5;border:1px solid #ffffff22;border-radius:22px;padding:12px;box-shadow:0 14px 30px #000b;z-index:5}
.pop.show{display:block}
.pop h4{font-size:11px;color:#8fa3bd;margin-bottom:8px;letter-spacing:.1em}
.pop .g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.pop .b{width:100%;border-radius:14px;height:42px;font-size:16px}
.remwrap{position:relative}
.off .dis-off,.unavailable .dis-off{opacity:.38;pointer-events:none;filter:grayscale(.6)}
.wide-only{display:none}.panel-wide .wide-only{display:block}
.panel-wide .narrow-only{display:none}
.narrow-only{margin-top:14px}
`;
const ICO = (n) => `<ha-icon icon="mdi:${n}"></ha-icon>`;

class SamsungTvRemoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._built = false;
  }
  static getStubConfig(hass) {
    const e = Object.keys(hass.states).find((k) => k.startsWith("media_player.") && hass.states[k].attributes.device_class === "tv");
    return { entity: e || "media_player.tv" };
  }
  static getConfigElement() { return document.createElement("shc-samsung-tv-remote-card-editor"); }
  setConfig(config) {
    if (!config || !config.entity) throw new Error("entity is required");
    this._config = { layout: "auto", ...config };
    this._built = false;
    if (this._hass) this._build();
  }
  getCardSize() { return 12; }
  set hass(h) {
    this._hass = h;
    if (!this._config) return;
    if (!this._built) this._build();
    this._update();
  }
  get _t() {
    const l = ((this._hass && (this._hass.locale?.language || this._hass.language)) || "en").slice(0, 2);
    return STRINGS[l] || STRINGS.en;
  }
  _applyLayout() {
    const w = this.getBoundingClientRect().width || this.offsetWidth;
    const lay = this._config.layout;
    const wide = lay === "panel" || (lay !== "remote" && w >= 600);
    this._card.classList.toggle("panel-wide", wide);
  }
  _build() {
    const c = this._config, t = this._t;
    this._built = true;
    const apps = (c.apps && c.apps.length ? c.apps : DEFAULT_APPS);
    this._apps = apps;
    const sr = this.shadowRoot;
    sr.innerHTML = `<style>${CSS}</style><div class="card unavailable">
<div class="hdr"><div class="ic">${ICO("television-classic")}</div><div><h3 id="nm"></h3><small id="st"></small></div><span class="w" id="w"></span><div class="dot" style="margin-left:${c.power_entity ? "8px" : "auto"}"></div></div>
<div class="split"><div class="remwrap">
<div class="remote">
 <div class="mic"></div><div class="solar"></div>
 <div class="row"><button class="b pwr" id="pw" data-act="power">${ICO("power")}</button><button class="b sm dis-off" data-k="KEY_SOURCE">${ICO("import")}</button><button class="b sm dis-off" data-k="KEY_AMBIENT" id="ambk">${ICO("white-balance-sunny")}</button></div>
 <div class="dis-off"><div class="row"><button class="b sm" data-act="pad">${ICO("dialpad")}</button><button class="b sm" data-k="KEY_MENU">${ICO("cog")}</button><button class="b sm" data-k="KEY_GUIDE" style="width:54px">${ICO("television-guide")}</button></div>
 <div class="dpad"><button class="u" data-k="KEY_UP">${ICO("chevron-up")}</button><button class="d" data-k="KEY_DOWN">${ICO("chevron-down")}</button><button class="l" data-k="KEY_LEFT">${ICO("chevron-left")}</button><button class="r" data-k="KEY_RIGHT">${ICO("chevron-right")}</button><button class="ok" data-k="KEY_ENTER">OK</button></div>
 <div class="row"><button class="b" data-k="KEY_RETURN">${ICO("arrow-u-left-top")}</button><button class="b" data-k="KEY_HOME">${ICO("home")}</button><button class="b" data-k="KEY_INFO">${ICO("information-outline")}</button></div>
 <div class="row" style="align-items:flex-start;margin-top:14px">
  <div class="rock"><button data-s="volume_up">${ICO("plus")}</button><div class="mid">VOL</div><button data-s="volume_down">${ICO("minus")}</button></div>
  <div class="col"><button class="b sm" data-s="volume_mute" id="mute">${ICO("volume-high")}</button><button class="b sm" data-k="KEY_CH_LIST">${ICO("format-list-numbered")}</button></div>
  <div class="rock"><button data-k="KEY_CHUP">${ICO("chevron-up")}</button><div class="mid">CH</div><button data-k="KEY_CHDOWN">${ICO("chevron-down")}</button></div></div>
 <div class="colors"><button class="cb" style="background:#ef4444" data-k="KEY_RED"></button><button class="cb" style="background:#22c55e" data-k="KEY_GREEN"></button><button class="cb" style="background:#eab308" data-k="KEY_YELLOW"></button><button class="cb" style="background:#3b82f6" data-k="KEY_BLUE"></button></div>
 <div class="row" style="justify-content:center;gap:8px"><button class="b sm" data-k="KEY_REWIND">${ICO("rewind")}</button><button class="b sm" data-s="media_play">${ICO("play")}</button><button class="b sm" data-s="media_pause">${ICO("pause")}</button><button class="b sm" data-s="media_stop">${ICO("stop")}</button><button class="b sm" data-k="KEY_FF">${ICO("fast-forward")}</button></div>
 <div class="apps">${apps.slice(0, 4).map((a, i) => `<button class="app" data-app="${i}" style="background:linear-gradient(180deg,${a.color || "#334155"},${a.color || "#334155"}99)">${a.name}</button>`).join("")}</div></div>
</div>
<div class="pop" id="pop"><h4>${t.keypad}</h4><div class="g">${[1,2,3,4,5,6,7,8,9].map((n) => `<button class="b" data-k="KEY_${n}">${n}</button>`).join("")}<button class="b" data-k="KEY_MINUS">${ICO("minus")}</button><button class="b" data-k="KEY_0">0</button><button class="b" data-k="KEY_ENTER">${ICO("check")}</button></div></div>
</div>
<div class="panel dis-off">
 <div class="wide-only"><div class="hero" id="hero"><div><small>${t.playing}</small><b id="ht"></b><span id="hs"></span></div></div></div>
 <div id="sec-src"><h2>${t.source}</h2><div class="chips" id="srcs"></div></div>
 <div class="wide-only"><h2>${t.apps}</h2><div class="chips">${apps.map((a, i) => `<button class="chip" data-app="${i}">${a.name}</button>`).join("")}</div>
 <h2>${t.volume}</h2><div class="vol">${ICO("volume-high")}<input type="range" min="0" max="100" id="vs"><b id="vv"></b></div></div>
 <div id="sec-pic"><h2>${t.picture}</h2><div class="mods"><select class="chip" id="pm"></select><select class="chip" id="sm"></select></div></div>
 <div id="sec-mod"><h2>${t.modes}</h2><div class="mods"><button class="chip" id="artb" data-act="art">${t.art}</button><button class="chip" id="ambb" data-k="KEY_AMBIENT">${t.ambient}</button><button class="chip" data-act="off">${t.poweroff}</button></div></div>
</div></div></div></div>`;
    this._card = sr.querySelector(".card");
    this._q = (s) => sr.querySelector(s);
    sr.addEventListener("click", (e) => this._click(e));
    const vs = this._q("#vs");
    vs.addEventListener("change", () => this._svc("media_player", "volume_set", { volume_level: vs.value / 100 }));
    vs.addEventListener("input", () => (this._q("#vv").textContent = vs.value));
    this._q("#pm").addEventListener("change", (e) => this._hass.callService("samsungtv_smart", "select_picture_mode", { entity_id: this._config.entity, picture_mode: e.target.value }));
    this._q("#sm").addEventListener("change", (e) => this._svc("media_player", "select_sound_mode", { sound_mode: e.target.value }));
    if (this._ro) this._ro.disconnect();
    this._ro = new ResizeObserver(() => this._applyLayout());
    this._ro.observe(this);
    this._applyLayout();
  }
  connectedCallback() { if (this._ro) this._ro.observe(this); }
  disconnectedCallback() { if (this._ro) this._ro.disconnect(); }
  _svc(domain, service, data = {}) {
    this._hass.callService(domain, service, { entity_id: this._config.entity, ...data });
  }
  _key(k) {
    const c = this._config;
    if (navigator.vibrate) navigator.vibrate(8);
    if (c.remote_entity) this._hass.callService("remote", "send_command", { entity_id: c.remote_entity, command: k });
    else this._svc("media_player", "play_media", { media_content_type: "send_key", media_content_id: k });
  }
  _click(e) {
    const el = e.target.closest("button,.chip");
    const pop = this._q("#pop");
    if (!el) { pop.classList.remove("show"); return; }
    if (el.tagName === "SELECT" || el.tagName === "OPTION") return;
    const st = this._hass.states[this._config.entity];
    if (el.dataset.k) return this._key(el.dataset.k);
    if (el.dataset.s) {
      if (el.dataset.s === "volume_mute") return this._svc("media_player", "volume_mute", { is_volume_muted: !(st && st.attributes.is_volume_muted) });
      return this._svc("media_player", el.dataset.s);
    }
    if (el.dataset.app !== undefined) return this._launch(this._apps[+el.dataset.app]);
    if (el.dataset.src) return this._svc("media_player", "select_source", { source: el.dataset.src });
    const act = el.dataset.act;
    if (act === "pad") pop.classList.toggle("show");
    else if (act === "power") {
      const on = st && !["off", "unavailable", "unknown"].includes(st.state);
      if (on) this._svc("media_player", "turn_off");
      else if (this._config.turn_on_script) this._hass.callService("script", "turn_on", { entity_id: this._config.turn_on_script });
      else this._svc("media_player", "turn_on");
    } else if (act === "off") this._svc("media_player", "turn_off");
    else if (act === "art") this._hass.callService("samsungtv_smart", "set_art_mode", { entity_id: this._config.entity });
  }
  _launch(a) {
    if (!a) return;
    const st = this._hass.states[this._config.entity];
    const sl = (st && st.attributes.source_list) || [];
    if (a.source || sl.includes(a.name)) return this._svc("media_player", "select_source", { source: a.source || a.name });
    this._svc("media_player", "play_media", { media_content_type: "app", media_content_id: a.app_id || a.name });
  }
  _update() {
    const c = this._config, t = this._t, h = this._hass, st = h.states[c.entity];
    const q = this._q;
    this._applyLayout();
    const state = st ? st.state : "unavailable";
    const on = !["off", "unavailable", "unknown"].includes(state);
    this._card.classList.toggle("off", state === "off");
    this._card.classList.toggle("unavailable", state === "unavailable" || state === "unknown" || !st);
    const a = st ? st.attributes : {};
    q("#nm").textContent = c.name || a.friendly_name || "TV";
    const src = a.source ? ` · ${a.source}` : "";
    q("#st").textContent = (state === "off" ? t.off : on ? t.on : t.unavailable) + (on ? src : "");
    q("#pw").classList.toggle("on", on);
    q("#w").textContent = "";
    if (c.power_entity && h.states[c.power_entity]) {
      const p = h.states[c.power_entity];
      q("#w").textContent = `${p.state} ${p.attributes.unit_of_measurement || "W"}`;
    }
    // hero
    q("#ht").textContent = on ? (a.media_title || a.app_name || a.source || t.nothing) : t.off;
    q("#hs").textContent = on ? [a.source, a.media_artist || a.media_series_title].filter(Boolean).join(" · ") : "";
    q("#hero").style.backgroundImage = on && a.entity_picture ? `url("${a.entity_picture}")` : "";
    // volume
    const vl = a.volume_level != null ? Math.round(a.volume_level * 100) : 0;
    const vs = q("#vs");
    if (this.shadowRoot.activeElement !== vs) { vs.value = vl; q("#vv").textContent = vl; }
    q("#mute").innerHTML = ICO(a.is_volume_muted ? "volume-off" : "volume-high");
    q("#mute").style.color = a.is_volume_muted ? "#f87171" : "";
    // sources
    const srcs = (c.sources && c.sources.length ? c.sources : (a.source_list || []));
    const sk = srcs.join("|") + "|" + (a.source || "");
    if (this._sk !== sk) {
      this._sk = sk;
      q("#srcs").innerHTML = srcs.map((s) => `<button class="chip${s === a.source ? " on" : ""}" data-src="${s}">${s}</button>`).join("");
    }
    q("#sec-src").style.display = srcs.length ? "" : "none";
    // picture / sound
    const fill = (sel, list, cur) => {
      const k = (list || []).join("|") + "|" + cur;
      if (sel._k === k) return;
      sel._k = k;
      sel.innerHTML = (list || []).map((x) => `<option value="${x}"${x === cur ? " selected" : ""}>${x}</option>`).join("");
    };
    const pl = a.picture_mode_list, sl = a.sound_mode_list;
    const showP = c.show_picture !== false && pl && pl.length, showS = c.show_sound !== false && sl && sl.length;
    fill(q("#pm"), pl, a.picture_mode); fill(q("#sm"), sl, a.sound_mode);
    q("#pm").style.display = showP ? "" : "none"; q("#sm").style.display = showS ? "" : "none";
    q("#sec-pic").style.display = showP || showS ? "" : "none";
    const hasArt = c.show_art !== false && a.art_mode_status !== undefined;
    q("#artb").style.display = hasArt ? "" : "none";
    q("#artb").classList.toggle("on", a.art_mode_status === "on");
    const amb = c.show_ambient !== false;
    q("#ambb").style.display = amb ? "" : "none"; q("#ambk").style.display = amb ? "" : "none";
    // power button always enabled
    q("#pw").style.pointerEvents = "auto";
  }
}
// Nome univoco (prefisso shc-): evita il conflitto con altre card che usano "samsung-tv-remote-card".
if (!customElements.get("shc-samsung-tv-remote-card")) customElements.define("shc-samsung-tv-remote-card", SamsungTvRemoteCard);
// Alias del vecchio nome, registrato SOLO se nessun'altra card lo ha gia' preso (controllo dopo un attimo,
// cosi' un'altra card caricata subito dopo non viene sovrascritta). Le config "custom:samsung-tv-remote-card" esistenti continuano a funzionare.
setTimeout(() => {
  if (!customElements.get("samsung-tv-remote-card")) customElements.define("samsung-tv-remote-card", class extends SamsungTvRemoteCard {});
}, 1500);

class SamsungTvRemoteCardEditor extends HTMLElement {
  setConfig(c) { this._config = c; this._render(); }
  set hass(h) { this._hass = h; if (this._form) this._form.hass = h; else this._render(); }
  _render() {
    if (!this._hass || !this._config) return;
    const l = (this._hass.locale?.language || this._hass.language || "en").slice(0, 2);
    const t = STRINGS[l] || STRINGS.en;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.addEventListener("value-changed", (e) => {
        this._config = e.detail.value;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
      const n = document.createElement("div");
      n.style.cssText = "font-size:12px;opacity:.7;margin-top:8px";
      n.textContent = t.apps_note;
      this.appendChild(n);
    }
    this._form.hass = this._hass;
    this._form.data = { layout: "auto", show_picture: true, show_sound: true, show_art: true, show_ambient: true, ...this._config };
    this._form.schema = [
      { name: "entity", required: true, selector: { entity: { domain: "media_player" } } },
      { name: "name", selector: { text: {} } },
      { name: "remote_entity", selector: { entity: { domain: "remote" } } },
      { name: "power_entity", selector: { entity: { domain: "sensor" } } },
      { name: "turn_on_script", selector: { entity: { domain: "script" } } },
      { name: "layout", selector: { select: { mode: "dropdown", options: [{ value: "auto", label: t.auto }, { value: "remote", label: t.remoteL }, { value: "panel", label: t.panelL }] } } },
      { name: "show_picture", selector: { boolean: {} } },
      { name: "show_sound", selector: { boolean: {} } },
      { name: "show_art", selector: { boolean: {} } },
      { name: "show_ambient", selector: { boolean: {} } },
    ];
    this._form.computeLabel = (s) => ({ entity: t.entity, name: t.name, remote_entity: t.remote, power_entity: t.power, turn_on_script: t.script, layout: t.layout, show_picture: t.sp, show_sound: t.ss, show_art: t.sa, show_ambient: t.sm }[s.name] || s.name);
  }
}
if (!customElements.get("shc-samsung-tv-remote-card-editor")) customElements.define("shc-samsung-tv-remote-card-editor", SamsungTvRemoteCardEditor);
window.customCards = window.customCards || [];
window.customCards.push({ type: "shc-samsung-tv-remote-card", name: "Samsung TV Remote Card (shc)", description: "Samsung-style remote for samsungtv_smart / samsungtv", preview: false });
console.info("%c SAMSUNG-TV-REMOTE-CARD %c 1.0.1", "background:#2563eb;color:#fff", "");
