# OpenSpec Run Dashboard

A comprehensive dashboard for visualizing OpenSpec AI pipeline metrics, following the design theme of the CodeRabbit Dashboard.

## Overview

This dashboard provides real-time insights into the OpenSpec pipeline execution, tracking:

- **Run Status**: Overall pipeline progress and completion status
- **Phase Analysis**: Detailed breakdown of each pipeline phase with quality scores
- **Task Execution**: Individual task performance and token usage
- **Global Health**: Compliance, quality, and agent performance metrics
- **Artifact Edits**: Quality refinement iterations across artifacts
- **Event Timeline**: Real-time pipeline events and state transitions

## Features

### 📊 Key Metrics (KPI Cards)
- Pipeline status (Running/Passed/Failed)
- Phases completed
- Tasks passed
- Average quality score
- Compliance index
- Total tokens consumed and cost

### 📈 Visualizations
- **Pipeline Progress Bar**: Visual representation of completion status
- **Phase Timeline**: Chronological view of phase execution
- **Token Usage Chart**: Bar chart showing token consumption by phase
- **Quality Score Chart**: Line chart tracking quality across phases
- **Artifact Edit Distribution**: Analysis of refinement iterations

### 📋 Detailed Tables
- **Phase Details**: Complete phase metrics including duration, tokens, iterations
- **Task Summary**: Task-level performance with correction loops
- **Artifact Edits**: Quality refinement tracking
- **Event Log**: Last 20 pipeline events with timestamps

### 🎯 Health Metrics
- **Compliance & Quality**: Compliance index, gate passing rate, rejection rate
- **Agent Performance**: Success rate, task completion, refinements
- **Resource Utilization**: Token consumption, cost tracking, wall time

## Data Format

The dashboard expects a JSON file at `data/run-report.json` with the following structure:

```json
{
  "exported_at": "ISO-8601 timestamp",
  "run": {
    "id": "run-id",
    "change_name": "change description",
    "jira_key": "JIRA-KEY",
    "branch": "feature/branch-name",
    "status": "running|passed|failed",
    "started_at": "ISO-8601 timestamp",
    "completed_at": "ISO-8601 timestamp or null"
  },
  "phases": [...],
  "tasks": [...],
  "events": [...],
  "global_health": {...},
  "artifact_edits": {...}
}
```

## Usage

### Start the Web Server

```bash
cd /home/anankuma/Desktop/thunder/dashboard/open-spec-dashboard
python3 -m http.server 8080
```

### Open the Dashboard

Navigate to **http://localhost:8080/index.html** in your browser.

### Update with New Data

1. Copy your new OpenSpec run report to `data/run-report.json`:
   ```bash
   cp /path/to/new-run-report.json data/run-report.json
   ```

2. Refresh your browser (Ctrl+R or Cmd+R)

## Design Theme

This dashboard follows the same design principles as the CodeRabbit Dashboard:

- **Color Palette**:
  - Red (#e74c3c): Errors, critical issues
  - Orange (#f39c12): Warnings, in-progress items
  - Green (#27ae60): Success, completed items
  - Blue (#2980b9): Information, primary actions
  - Purple (#8e44ad): Special metrics
  - Teal (#1abc9c): Secondary success metrics

- **Components**:
  - Gradient header with key information
  - KPI cards with large numbers and labels
  - Clean tables with hover effects
  - Badge system for status indicators
  - Responsive grid layouts
  - Chart.js visualizations

## Source Data

- **GitHub Repository**: https://github.com/sujkini/openspec
- **Pipeline**: AI-powered specification analysis and code generation
- **Metrics**: Generated from OpenSpec project runs

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported

## Dependencies

- [Chart.js](https://www.chartjs.org/) v4.4.0 (loaded via CDN)

## License

This dashboard is part of the OpenSpec project visualization suite.
