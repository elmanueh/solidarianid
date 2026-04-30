document.addEventListener('DOMContentLoaded', function () {
  const chartsDataElement = document.getElementById('charts-data');
  const chartsData = JSON.parse(chartsDataElement.textContent);

  const charts = new Map();

  const ctx = chartId => document.getElementById(chartId).getContext('2d');

  function applyTheme(isDark) {
    Chart.defaults.color = isDark ? '#D3D3D3' : '#000000';
    charts.forEach(chart => chart.update());
  }

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  applyTheme(mql.matches);

  mql.addEventListener('change', e => applyTheme(e.matches));

  Chart.defaults.font.size = 16;

  const hasData = chartData => {
    if (!chartData || !chartData.data) return false;

    const hasLabels = chartData.data.labels && chartData.data.labels.length > 0;
    const hasDatasets =
      chartData.data.datasets &&
      chartData.data.datasets.length > 0 &&
      chartData.data.datasets.some(ds => ds.data && ds.data.length > 0);

    return hasLabels || hasDatasets;
  };

  const createChartIfDataExists = (elementId, chartData) => {
    const canvas = document.getElementById(elementId);

    let chartInstance;

    if (!chartData) {
      const emptyConfig = {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
          plugins: {
            title: {
              display: true,
              text: canvas.getAttribute('aria-label') || 'Gráfico',
            },
          },
        },
      };

      chartInstance = new Chart(ctx(elementId), emptyConfig);

      const errorDiv = document.createElement('div');
      errorDiv.className = 'alert alert-error d-flex align-items-center justify-content-center';
      errorDiv.style.position = 'absolute';
      errorDiv.style.top = '50%';
      errorDiv.style.left = '50%';
      errorDiv.style.transform = 'translate(-50%, -50%)';
      errorDiv.style.zIndex = '10';
      errorDiv.setAttribute('role', 'alert');
      errorDiv.innerHTML = `
        <span class="icon-[mdi--alert]" role="img" aria-hidden="true"></span>
        <div>Error de conexión</div>
      `;
      canvas.parentElement.style.position = 'relative';
      canvas.parentElement.appendChild(errorDiv);
    } else if (!hasData(chartData)) {
      chartInstance = new Chart(ctx(elementId), ChartsLib.hydrateCallbacks(chartData));

      const infoDiv = document.createElement('div');
      infoDiv.className = 'alert alert-info d-flex align-items-center justify-content-center';
      infoDiv.style.position = 'absolute';
      infoDiv.style.top = '50%';
      infoDiv.style.left = '50%';
      infoDiv.style.transform = 'translate(-50%, -50%)';
      infoDiv.style.zIndex = '10';
      infoDiv.setAttribute('role', 'alert');
      infoDiv.innerHTML = `
        <span class="icon-[mdi--information-outline]" role="img" aria-hidden="true"></span>
        <div>Sin datos</div>
      `;
      canvas.parentElement.style.position = 'relative';
      canvas.parentElement.appendChild(infoDiv);
    } else {
      chartInstance = new Chart(ctx(elementId), ChartsLib.hydrateCallbacks(chartData));
    }

    charts.set(elementId, chartInstance);
  };

  createChartIfDataExists('chart-communities', chartsData.topCommunities);
  createChartIfDataExists('chart-nationalities', chartsData.nationalities);
  createChartIfDataExists('chart-ods', chartsData.ods);
  createChartIfDataExists('chart-joins', chartsData.joins);
});
