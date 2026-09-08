var SDLC_OPERATORS = {
  certmanager: {
    label: 'Cert Manager',
    epicsJson: 'data/processed/cert_manager_epics.json',
    tabId: 'certmanager'
  },
  ztwim: {
    label: 'ZTWIM',
    epicsJson: 'data/processed/ztwim_epics.json',
    tabId: 'ztwim'
  },
  sscso: {
    label: 'SSCSI',
    epicsJson: 'data/processed/sscsi_epics.json',
    tabId: 'sscso'
  },
  eso: {
    label: 'ESO',
    epicsJson: 'data/processed/eso_epics.json',
    tabId: 'eso'
  }
};

var SDLC_SUMMARY_BY_MONTH = {
  july: {
    storyPoints: 20,
    totalCost: '$25.00',
    totalTokens: '2.2M',
    timeSaved: '36h 15m'
  },
  august: {
    storyPoints: 40,
    totalCost: '$49.50',
    totalTokens: '5.0M',
    timeSaved: '77h 30m'
  },
  september: {
    storyPoints: 50,
    totalCost: '$59.25',
    totalTokens: '7.5M',
    timeSaved: '101h 40m'
  }
};

function escHtml(str) {
  var d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function parseCost(costStr) {
  if (!costStr) return 0;
  return parseFloat(String(costStr).replace(/[^0-9.]/g, '')) || 0;
}

function parseTokens(tokenStr) {
  if (!tokenStr) return 0;
  var s = String(tokenStr).trim().toLowerCase();
  var num = parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
  if (s.indexOf('m') !== -1) return num * 1000000;
  if (s.indexOf('k') !== -1) return num * 1000;
  return num;
}

function formatTokens(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(Math.round(n));
}

function formatCost(n) {
  return '$' + n.toFixed(2);
}

function aggregateOperatorData(data) {
  var epics = data.epics || [];
  var tickets = [];
  var totalCost = 0;
  var totalTokens = 0;

  epics.forEach(function(epic) {
    (epic.tickets || []).forEach(function(ticket) {
      tickets.push(ticket);
      totalCost += parseCost(ticket.health && ticket.health.run_cost);
      totalTokens += parseTokens(ticket.health && ticket.health.total_tokens);
    });
  });

  return {
    epics: epics,
    tickets: tickets,
    epicCount: epics.length,
    ticketCount: tickets.length,
    totalCost: totalCost,
    totalTokens: totalTokens
  };
}

function renderSummaryRow(monthKey) {
  var tbody = document.getElementById('sdlcSummaryBody');
  if (!tbody) return;

  var summary = SDLC_SUMMARY_BY_MONTH[monthKey];
  if (!summary) {
    tbody.innerHTML = '<tr><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td></tr>';
    return;
  }

  tbody.innerHTML = '<tr>' +
    '<td>' + escHtml(String(summary.storyPoints)) + '</td>' +
    '<td>' + escHtml(summary.totalCost) + '</td>' +
    '<td>' + escHtml(summary.totalTokens) + '</td>' +
    '<td>' + escHtml(summary.timeSaved) + '</td>' +
  '</tr>';
}

function loadSDLCSummaryMonth(monthKey) {
  renderSummaryRow(monthKey);
}

function renderAnalytics(agg, operator) {
  var container = document.getElementById('sdlcAnalyticsContent');
  if (!container) return;

  if (!agg.ticketCount) {
    container.innerHTML =
      '<div class="sdlc-empty-state">' +
        '<p style="font-size:1em; font-weight:600; color:#2c3e50; margin:0 0 6px 0;">No metrics available for ' + escHtml(operator.label) + ' yet</p>' +
        '<p style="font-size:0.88em; color:#95a5a6; margin:0;">Pipeline metrics will appear here once agentic runs are completed for this operator.</p>' +
        '<a href="#" class="sdlc-tab-link" onclick="switchTab(\'' + operator.tabId + '\'); return false;">View ' + escHtml(operator.label) + ' tab &rarr;</a>' +
      '</div>';
    return;
  }

  var epicRows = agg.epics.map(function(epic) {
    return '<tr>' +
      '<td><a href="' + escHtml(epic.epic_link) + '" target="_blank">' + escHtml(epic.epic_id) + '</a></td>' +
      '<td>' + escHtml(epic.epic_title) + '</td>' +
      '<td><span class="badge green">' + escHtml(epic.status) + '</span></td>' +
      '<td>' + escHtml(String((epic.tickets || []).length)) + '</td>' +
      '<td>' + escHtml(epic.summary.total_tokens) + '</td>' +
      '<td>' + escHtml(epic.summary.agent_success_pct) + '</td>' +
    '</tr>';
  }).join('');

  var ticketRows = agg.tickets.map(function(ticket) {
    return '<tr>' +
      '<td><a href="' + escHtml(ticket.ticket_link) + '" target="_blank">' + escHtml(ticket.ticket_id) + '</a></td>' +
      '<td>' + escHtml(ticket.ticket_summary) + '</td>' +
      '<td>' + escHtml(ticket.agent_label) + '</td>' +
      '<td>' + escHtml(ticket.health.total_tokens) + '</td>' +
      '<td>' + escHtml(ticket.health.run_cost) + '</td>' +
      '<td>' + escHtml(ticket.health.agent_success_pct) + '</td>' +
    '</tr>';
  }).join('');

  container.innerHTML =
    '<div class="sdlc-kpi-strip">' +
      '<div class="sdlc-kpi"><span class="sdlc-kpi-val">' + agg.epicCount + '</span><span class="sdlc-kpi-lbl">Epics</span></div>' +
      '<div class="sdlc-kpi"><span class="sdlc-kpi-val">' + agg.ticketCount + '</span><span class="sdlc-kpi-lbl">Tickets</span></div>' +
      '<div class="sdlc-kpi"><span class="sdlc-kpi-val">' + escHtml(formatTokens(agg.totalTokens)) + '</span><span class="sdlc-kpi-lbl">Total Tokens</span></div>' +
      '<div class="sdlc-kpi"><span class="sdlc-kpi-val">' + escHtml(formatCost(agg.totalCost)) + '</span><span class="sdlc-kpi-lbl">Total Cost</span></div>' +
    '</div>' +
    '<h5 class="sdlc-subheading">Epic Rollup</h5>' +
    '<table class="tbl">' +
      '<thead><tr><th>Epic</th><th>Title</th><th>Status</th><th>Tickets</th><th>Tokens</th><th>Success</th></tr></thead>' +
      '<tbody>' + epicRows + '</tbody>' +
    '</table>' +
    '<h5 class="sdlc-subheading">Ticket Metrics</h5>' +
    '<table class="tbl">' +
      '<thead><tr><th>Ticket</th><th>Summary</th><th>Agent</th><th>Tokens</th><th>Cost</th><th>Success</th></tr></thead>' +
      '<tbody>' + ticketRows + '</tbody>' +
    '</table>' +
    '<p style="margin-top:14px; font-size:0.85em;">' +
      '<a href="#" class="sdlc-tab-link" onclick="switchTab(\'' + operator.tabId + '\'); return false;">View full ' + escHtml(operator.label) + ' details &rarr;</a>' +
    '</p>';
}

function loadSDLCOperatorAnalytics(operatorId) {
  var operator = SDLC_OPERATORS[operatorId];
  if (!operator) return;

  var container = document.getElementById('sdlcAnalyticsContent');
  if (container) {
    container.innerHTML = '<p style="font-size:0.92em; color:#95a5a6; margin:0;">Loading ' + escHtml(operator.label) + ' metrics&hellip;</p>';
  }

  fetch(operator.epicsJson)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var agg = aggregateOperatorData(data);
      renderAnalytics(agg, operator);
    })
    .catch(function() {
      if (container) {
        container.innerHTML =
          '<div class="sdlc-empty-state">' +
            '<p style="font-size:1em; font-weight:600; color:#c0392b; margin:0 0 6px 0;">Failed to load metrics for ' + escHtml(operator.label) + '</p>' +
            '<p style="font-size:0.88em; color:#95a5a6; margin:0;">Check that processed metrics JSON exists for this operator.</p>' +
          '</div>';
      }
    });
}

function initSDLCDashboard() {
  var monthSelect = document.getElementById('sdlcMonthSelect');
  if (monthSelect) {
    loadSDLCSummaryMonth(monthSelect.value);
  }

  var operatorSelect = document.getElementById('sdlcOperatorSelect');
  if (operatorSelect) {
    loadSDLCOperatorAnalytics(operatorSelect.value);
  }
}
