const routes = {
  lan: {
    pageGetter: 'getLanMenuPage',
    submenus: {
      boliglan: { pageGetter: 'getBoliganSubMenuPage', open: 'openBoliglan' }
    }
  },
  kort: {
    pageGetter: 'getKortMenuPage',
    submenus: {                                                     
      kredittkort: { pageGetter: 'getKredittkortSubMenuPage', open: 'openKredittKort' }
    }
  },
  sparing: {
    pageGetter: 'getSparingMenuPage',
    submenus: {
      fond: { pageGetter: 'getFondSubMenuPage', open: 'openFond' }
    }
  }
};

module.exports = routes;