document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
  document.querySelector('.tab-btn[data-tab="' + tabId + '"]').classList.add('active');
  document.getElementById('tab-' + tabId).classList.add('active');
}

function toggleInline(el) {
  el.closest('.epic-inline').classList.toggle('open');
}

function toggle(el, selector) {
  el.closest(selector).classList.toggle('open');
}

function toggleQuantView(view) {
  var tableView = document.getElementById('quantTableView');
  var chartView = document.getElementById('quantChartView');
  var btns = document.querySelectorAll('#quantViewToggle .view-toggle-btn');
  btns.forEach(function(b) { b.classList.remove('active'); });
  document.querySelector('#quantViewToggle .view-toggle-btn[data-view="' + view + '"]').classList.add('active');
  if (view === 'chart') {
    tableView.style.display = 'none';
    chartView.style.display = 'block';
  } else {
    tableView.style.display = 'block';
    chartView.style.display = 'none';
  }
}

function switchChartType(type, btn) {
  var map = { barH: 'chartBarH', barV: 'chartBarV', donut: 'chartDonut' };
  var container = document.getElementById('quantChartView');
  container.querySelectorAll('.chart-type-panel').forEach(function(p) { p.classList.remove('active'); });
  container.querySelectorAll('.chart-type-btn').forEach(function(b) { b.classList.remove('active'); });
  document.getElementById(map[type]).classList.add('active');
  btn.classList.add('active');
}

function toggleEpicView(epic, view) {
  var tableView = document.getElementById(epic + 'TableView');
  var chartView = document.getElementById(epic + 'ChartView');
  var toggle = document.getElementById(epic + 'ViewToggle');
  toggle.querySelectorAll('.view-toggle-btn').forEach(function(b) { b.classList.remove('active'); });
  toggle.querySelector('.view-toggle-btn[data-view="' + view + '"]').classList.add('active');
  if (view === 'chart') {
    tableView.style.display = 'none';
    chartView.style.display = 'block';
  } else {
    tableView.style.display = 'block';
    chartView.style.display = 'none';
  }
}

function switchEpicChart(epic, type, btn) {
  var container = document.getElementById(epic + 'ChartView');
  container.querySelectorAll('.chart-type-panel').forEach(function(p) { p.classList.remove('active'); });
  container.querySelectorAll('.chart-type-btn').forEach(function(b) { b.classList.remove('active'); });
  document.getElementById(epic + '-' + type).classList.add('active');
  btn.classList.add('active');
}

function loadTabContent(tabId, url) {
  return fetch(url)
    .then(function(r) { return r.text(); })
    .then(function(html) {
      document.getElementById('tab-' + tabId).innerHTML = html;
    });
}

window.addEventListener('scroll', function() {
  var btn = document.getElementById('backToTop');
  if (window.scrollY > 300) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

(function init() {
  var tabs = [
    { id: 'certmanager', url: 'tabs/certmanager.html' },
    { id: 'ztwim', url: 'tabs/ztwim.html' },
    { id: 'sscso', url: 'tabs/sscso.html' },
    { id: 'mustgather', url: 'tabs/mustgather.html' },
    { id: 'eso', url: 'tabs/eso.html' },
    { id: 'linksrepos', url: 'tabs/linksrepos.html' }
  ];

  tabs.forEach(function(tab) {
    loadTabContent(tab.id, tab.url);
  });

  loadTabContent('overview', 'tabs/overview.html').then(function() {
    fetch('layered-architecture.html')
      .then(function(r) { return r.text(); })
      .then(function(html) {
        var container = document.getElementById('layeredArchitectureContainer');
        if (container) container.innerHTML = html;
      });

    fetch('pipeline-flow2.html?v=6')
      .then(function(r) { return r.text(); })
      .then(function(html) {
        var container = document.getElementById('pf2Container');
        if (container) {
          container.innerHTML = html;
          var s = document.createElement('script');
          s.src = 'pipeline-flow2.js?v=5';
          document.body.appendChild(s);
        }
      });
  });
})();
