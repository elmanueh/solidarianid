document.addEventListener('DOMContentLoaded', function () {
  const chartsDataElement = document.getElementById('charts-data');
  const chartsData = JSON.parse(chartsDataElement.textContent);

  const ctx = chart => document.getElementById(chart).getContext('2d');

  const hasData = chartData => {
    if (!chartData || !chartData.data) return false;

    // Verificar si tiene labels o datasets con datos
    const hasLabels = chartData.data.labels && chartData.data.labels.length > 0;
    const hasDatasets =
      chartData.data.datasets &&
      chartData.data.datasets.length > 0 &&
      chartData.data.datasets.some(ds => ds.data && ds.data.length > 0);

    return hasLabels || hasDatasets;
  };

  const createChartIfDataExists = (elementId, chartData) => {
    const canvas = document.getElementById(elementId);

    if (!chartData) {
      // Empty chart configuration
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
      new Chart(ctx(elementId), emptyConfig);

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
      new Chart(ctx(elementId), ChartsLib.hydrateCallbacks(chartData));

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
      new Chart(ctx(elementId), ChartsLib.hydrateCallbacks(chartData));
    }
  };

  createChartIfDataExists('chart-communities', chartsData.topCommunities);
  createChartIfDataExists('chart-nationalities', chartsData.nationalities);
  createChartIfDataExists('chart-ods', chartsData.ods);
  createChartIfDataExists('chart-joins', chartsData.joins);
});
