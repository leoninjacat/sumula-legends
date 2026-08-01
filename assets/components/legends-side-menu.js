(() => {
  const styles = `
    legends-side-menu { display: contents; }
    .legends-menu-toggle { width:46px;min-width:46px;height:46px;padding:0;display:grid;place-content:center;gap:5px;border:1px solid var(--secondary-border);border-radius:11px;background:var(--secondary-bg);color:var(--text);cursor:pointer }
    .legends-menu-toggle span { display:block;width:20px;height:2px;border-radius:2px;background:currentColor }
    .legends-menu-toggle[aria-expanded="true"] { border-color:var(--accent);box-shadow:0 0 0 4px rgba(37,99,235,.12) }
    .legends-side-menu__scrim { position:fixed;inset:0;z-index:4998;background:rgba(13,27,52,.4);backdrop-filter:blur(2px);opacity:0;visibility:hidden;transition:opacity .22s ease,visibility .22s ease }
    .legends-side-menu__drawer { position:fixed;z-index:4999;inset:0 auto 0 0;width:min(330px,88vw);padding:22px;display:flex;flex-direction:column;background:var(--card);color:var(--text);box-shadow:18px 0 60px rgba(13,27,52,.25);transform:translateX(-105%);visibility:hidden;transition:transform .22s ease,visibility .22s ease }
    legends-side-menu[data-open] .legends-side-menu__scrim { opacity:1;visibility:visible }
    legends-side-menu[data-open] .legends-side-menu__drawer { transform:translateX(0);visibility:visible }
    .legends-side-menu__header { min-height:62px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding-bottom:14px;border-bottom:1px solid var(--line) }
    .legends-side-menu__header img { display:block;max-width:170px;max-height:52px;object-fit:contain }
    .legends-side-menu__close { width:42px;height:42px;padding:0;border:0;border-radius:10px;background:transparent;color:var(--text);font-size:30px;line-height:1;cursor:pointer }
    .legends-side-menu__close:hover,.legends-side-menu__close:focus-visible { background:var(--surface-soft) }
    .legends-side-menu__nav { display:grid;gap:6px;margin-top:20px;overflow-y:auto }
    .legends-side-menu__item { width:100%;display:flex;align-items:center;gap:14px;padding:14px;border:0;border-radius:12px;background:transparent;color:var(--text);text-align:left;font:inherit;font-size:14px;font-weight:700;cursor:pointer }
    .legends-side-menu__item:hover,.legends-side-menu__item:focus-visible { background:var(--secondary-bg);color:var(--accent);transform:none }
    .legends-side-menu__item:disabled { opacity:.45;cursor:not-allowed }
    .legends-side-menu__item-icon { width:24px;flex:0 0 24px;text-align:center;font-size:19px }
    .legends-side-menu__item-label { flex:1 }
    .legends-side-menu__shortcut { color:var(--muted);font-size:.74rem;font-weight:500 }
    .legends-side-menu__divider { width:100%;height:1px;margin:8px 0;background:var(--line) }
    .legends-side-menu__submenu { display:grid;gap:4px;padding:2px 0 4px 38px }
    .legends-side-menu__submenu[hidden] { display:none }
    .legends-side-menu__submenu .legends-side-menu__item { padding:11px 12px;font-size:13px }
    @media print { legends-side-menu,.legends-side-menu__scrim,.legends-side-menu__drawer { display:none!important } }
    @media (prefers-reduced-motion:reduce) { .legends-side-menu__scrim,.legends-side-menu__drawer { transition:none } }
  `;
  if (!document.getElementById('legends-side-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'legends-side-menu-styles';
    style.textContent = styles;
    document.head.appendChild(style);
  }
  class LegendsSideMenu extends HTMLElement {
    connectedCallback() {
      if (this.dataset.ready) return;
      this.dataset.ready = 'true';
      const logo = this.getAttribute('logo') || 'assets/img/logo.png';
      const logoAlt = this.getAttribute('logo-alt') || 'Legends';
      this.innerHTML = `
        <button id="moreMenuBtn" class="legends-menu-toggle" type="button" aria-label="Abrir menu" aria-controls="moreMenu" aria-expanded="false"><span></span><span></span><span></span></button>
        <div class="legends-side-menu__scrim" data-menu-close aria-hidden="true"></div>
        <aside id="moreMenu" class="legends-side-menu__drawer" aria-label="Menu principal" aria-hidden="true">
          <header class="legends-side-menu__header"><img src="${logo}" alt="${logoAlt}" data-menu-logo><button class="legends-side-menu__close" type="button" aria-label="Fechar menu" data-menu-close>×</button></header>
          <nav class="legends-side-menu__nav" aria-label="Menu principal">
            <button id="newChampionshipBtn" class="legends-side-menu__item" type="button"><span class="legends-side-menu__item-icon" aria-hidden="true">＋</span><span class="legends-side-menu__item-label">Novo campeonato</span><span class="legends-side-menu__shortcut">Ctrl+N</span></button>
            <button id="openChampionshipBtn" class="legends-side-menu__item" type="button" disabled><span class="legends-side-menu__item-icon" aria-hidden="true">▤</span><span class="legends-side-menu__item-label">Abrir campeonato</span></button>
            <button id="saveChampionshipBtn" class="legends-side-menu__item" type="button"><span class="legends-side-menu__item-icon" aria-hidden="true">↓</span><span class="legends-side-menu__item-label">Salvar campeonato</span><span class="legends-side-menu__shortcut">Ctrl+S</span></button>
            <div class="legends-side-menu__divider" aria-hidden="true"></div>
            <button id="menuImportExcelBtn" class="legends-side-menu__item" type="button"><span class="legends-side-menu__item-icon" aria-hidden="true">⇧</span><span class="legends-side-menu__item-label">Importar Excel</span></button>
            <button id="menuImportTextBtn" class="legends-side-menu__item" type="button"><span class="legends-side-menu__item-icon" aria-hidden="true">≡</span><span class="legends-side-menu__item-label">Importar lista de nomes</span></button>
            <button id="exportMenuBtn" class="legends-side-menu__item" type="button" aria-expanded="false" aria-controls="exportSubmenu"><span class="legends-side-menu__item-icon" aria-hidden="true">⇩</span><span class="legends-side-menu__item-label">Exportar</span><span aria-hidden="true">⌄</span></button>
            <div id="exportSubmenu" class="legends-side-menu__submenu" hidden><button id="exportPdfBtn" class="legends-side-menu__item" type="button">Exportar súmula em PDF</button><button id="exportExcelBtn" class="legends-side-menu__item" type="button">Exportar para Excel</button></div>
            <div class="legends-side-menu__divider" aria-hidden="true"></div>
            <button id="openSettingsBtn" class="legends-side-menu__item" type="button"><span class="legends-side-menu__item-icon" aria-hidden="true">⚙</span><span class="legends-side-menu__item-label">Configurações</span></button>
            <button id="openAboutBtn" class="legends-side-menu__item" type="button"><span class="legends-side-menu__item-icon" aria-hidden="true">ⓘ</span><span class="legends-side-menu__item-label">Sobre</span></button>
          </nav>
        </aside>`;
      this.querySelector('#moreMenuBtn').addEventListener('click', () => this.toggleMenu());
      this.querySelectorAll('[data-menu-close]').forEach(item => item.addEventListener('click', () => this.closeMenu()));
    }
    get isOpen() { return this.hasAttribute('data-open'); }
    openMenu() { this.setAttribute('data-open','');this.querySelector('#moreMenuBtn').setAttribute('aria-expanded','true');this.querySelector('#moreMenu').setAttribute('aria-hidden','false');document.body.style.overflow='hidden'; }
    closeMenu() { this.removeAttribute('data-open');this.querySelector('#moreMenuBtn').setAttribute('aria-expanded','false');this.querySelector('#moreMenu').setAttribute('aria-hidden','true');this.querySelector('#exportSubmenu').hidden=true;this.querySelector('#exportMenuBtn').setAttribute('aria-expanded','false');document.body.style.overflow=''; }
    toggleMenu() { this.isOpen ? this.closeMenu() : this.openMenu(); }
    setLogo(source) { const image=this.querySelector('[data-menu-logo]');if(image) image.src=source; }
  }
  customElements.define('legends-side-menu', LegendsSideMenu);
})();
