/* ── Pipeline Flow 2 — Floating Tooltip ── */
(function () {
  var tipData = {
    'spec': {
      title: 'Spec Validation',
      text: '',
      links: [['Prompt and result', 'https://github.com/anandkuma77/open-spec-dashboard/tree/main/prompt_examples/spec-generation']]
    },
    'repo-assess': {
      title: 'Repo Assessment',
      text: '',
      links: [['Prompt and result', 'https://github.com/anandkuma77/open-spec-dashboard/tree/main/prompt_examples/Repo-Assessment']]
    },
    'planning': {
      title: 'Planning Phase',
      text: '',
      links: [['Prompt and result', 'https://github.com/anandkuma77/open-spec-dashboard/tree/main/prompt_examples/Planning']]
    },
    'tasks': {
      title: 'Task Generation',
      text: '',
      links: [['Prompt and result', 'https://github.com/anandkuma77/open-spec-dashboard/tree/main/prompt_examples/Tasks']]
    },
    'codegen': {
      title: 'Code & Unit Tests Generation',
      text: '',
      links: [['Prompt and result', 'https://github.com/anandkuma77/open-spec-dashboard/tree/main/prompt_examples/Code-Generation-evals-example-ztwim']]
    }
  };

  var tip = document.createElement('div');
  tip.id = 'pf2Tip';
  document.body.appendChild(tip);
  var hideTimer;

  function showTip(node, key) {
    var d = tipData[key];
    if (!d) return;
    clearTimeout(hideTimer);
    var linksHtml = d.links.map(function (l) {
      return '<a href="' + l[1] + '" target="_blank">' + l[0] + '</a>';
    }).join('');
    tip.innerHTML = '<h4>' + d.title + '</h4><p>' + d.text + '</p><div class="pf2-links">' + linksHtml + '</div>';
    tip.style.display = 'block';
    tip.style.pointerEvents = 'auto';
    var rect = node.getBoundingClientRect();
    var left = rect.left + rect.width / 2 - 160;
    var top = rect.bottom + 6;
    if (left < 12) left = 12;
    if (left + 320 > window.innerWidth - 12) left = window.innerWidth - 332;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
    if (top + tip.offsetHeight > window.innerHeight - 12) {
      tip.style.top = (rect.top - tip.offsetHeight - 6) + 'px';
    }
    requestAnimationFrame(function () { tip.classList.add('visible'); });
  }

  function hideTip() {
    hideTimer = setTimeout(function () {
      tip.classList.remove('visible');
      setTimeout(function () {
        tip.style.display = 'none';
        tip.style.pointerEvents = 'none';
      }, 200);
    }, 250);
  }

  document.querySelectorAll('[data-tip]').forEach(function (node) {
    node.addEventListener('mouseenter', function () {
      showTip(node, node.getAttribute('data-tip'));
    });
    node.addEventListener('mouseleave', hideTip);
  });

  tip.addEventListener('mouseenter', function () {
    clearTimeout(hideTimer);
    tip.classList.add('visible');
    tip.style.pointerEvents = 'auto';
  });
  tip.addEventListener('mouseleave', function () {
    tip.classList.remove('visible');
    setTimeout(function () {
      tip.style.display = 'none';
      tip.style.pointerEvents = 'none';
    }, 200);
  });
})();
