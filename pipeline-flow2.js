/* ── Pipeline Flow 2 — Floating Tooltip ── */
(function () {
  var tipData = {
    'historical': {
      title: 'Historical Data Sources',
      text: 'Aggregates historical data from past development epics, including pull requests, bug reports, and test cases. This data forms the foundation for deriving evaluation criteria and training the agentic pipeline.',
      links: [['Data Sources', 'https://google.com'], ['Historical Analysis', 'https://google.com']]
    },
    'evals': {
      title: 'Evals Derivation',
      text: 'Derives evaluation benchmarks and quality metrics from historical data. These evaluations are used to measure and validate the automated agentic flow\'s output quality at each pipeline stage.',
      links: [['Evaluation Criteria', 'https://google.com'], ['Metrics Dashboard', 'https://google.com']]
    },
    'jira': {
      title: 'Jira Integration',
      text: 'Entry point for the pipeline. Epic tickets from Jira are ingested and processed to extract requirements, acceptance criteria, and scope definitions for downstream phases.',
      links: [['Jira Integration', 'https://google.com'], ['API Reference', 'https://google.com']]
    },
    'spec': {
      title: 'Spec Validation',
      text: 'Validates OpenAPI specifications against industry standards and project-specific rules. Ensures completeness, correctness, and consistency before proceeding to the planning phase.',
      links: [['Validation Rules', 'https://google.com'], ['Spec Standards', 'https://google.com']]
    },
    'repo-assess': {
      title: 'Repo Assessment',
      text: 'Analyzes the target repository structure, existing codebase patterns, dependencies, and architectural conventions to inform planning decisions for the given epic.',
      links: [['Assessment Criteria', 'https://google.com'], ['Repository Guide', 'https://google.com']]
    },
    'planning': {
      title: 'Planning Phase',
      text: 'Generates a comprehensive development plan based on validated specs and repo assessment. Produces phased implementation strategies with clear milestones and dependencies.',
      links: [['Planning Templates', 'https://google.com'], ['Strategy Guide', 'https://google.com']]
    },
    'tasks': {
      title: 'Task Generation',
      text: 'Decomposes the plan into discrete, actionable tasks organized in phases. Each task includes clear acceptance criteria, estimated complexity, and dependency mapping.',
      links: [['Task Templates', 'https://google.com'], ['Phase Structure', 'https://google.com']]
    },
    'codegen': {
      title: 'Code & Unit Tests Generation',
      text: 'AI-driven code generation and unit test creation. Iterates with the task generation phase to refine outputs. Produces production-ready code with comprehensive test coverage.',
      links: [['Code Standards', 'https://google.com'], ['Test Guidelines', 'https://google.com']]
    },
    'pr': {
      title: 'Pull Request Generation',
      text: 'Automatically creates pull requests for each phase of generated code. PRs include detailed descriptions, test results, and review annotations for human validation.',
      links: [['PR Templates', 'https://google.com'], ['Review Process', 'https://google.com']]
    },
    'repo': {
      title: 'Source Repository',
      text: 'Source code repository containing the target project. Provides codebase context, existing patterns, and architectural information to the pipeline via CURSOR integration.',
      links: [['Repository', 'https://google.com'], ['Codebase Guide', 'https://google.com']]
    },
    'cursor': {
      title: 'CURSOR Integration',
      text: 'AI-powered code editor integration. Processes repository context and generates agents.md configuration files and contextualization documents for the agentic pipeline.',
      links: [['Cursor Docs', 'https://google.com'], ['Integration Guide', 'https://google.com']]
    },
    'agents-md': {
      title: 'Agent Configuration Docs',
      text: 'Agent configuration and contextualization documents generated from the repository analysis. Provides structured context for each pipeline phase to improve output quality.',
      links: [['Configuration', 'https://google.com'], ['Context Format', 'https://google.com']]
    },
    'unit-tests': {
      title: 'Unit Test Execution',
      text: 'Executes the generated unit tests against the produced code. Validates functional correctness and ensures code meets quality thresholds defined in the pipeline.',
      links: [['Test Runner', 'https://google.com'], ['Coverage Reports', 'https://google.com']]
    },
    'e2e': {
      title: 'E2E Tests (Work in Progress)',
      text: 'End-to-end testing framework for operator environments. Triggered from raised PRs to validate integration across the full operator lifecycle. Currently under development.',
      links: [['E2E Framework', 'https://google.com'], ['Roadmap', 'https://google.com']]
    },
    'ai-helpers': {
      title: 'AI-Helpers Agentic Docs',
      text: 'Comprehensive documentation for the ai-helpers agentic framework. Contains guidelines, best practices, and reference materials used by CURSOR for context generation.',
      links: [['Framework Docs', 'https://google.com'], ['API Reference', 'https://google.com']]
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
