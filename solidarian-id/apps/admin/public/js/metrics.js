document.addEventListener('DOMContentLoaded', function () {
  const chartsDataElement = document.getElementById('charts-data');
  const chartsData = JSON.parse(chartsDataElement.textContent);

  const ctx = chart => document.getElementById(chart).getContext('2d');

  const createChartIfDataExists = (elementId, chartData) => {
    const canvas = document.getElementById(elementId);

    if (chartData) {
      new Chart(ctx(elementId), ChartsLib.hydrateCallbacks(chartData));
    } else {
      // Ocultar canvas y mostrar alerta centrada
      const errorDiv = document.createElement('div');
      errorDiv.className = 'alert alert-error d-flex align-items-center justify-content-center';
      errorDiv.setAttribute('role', 'alert');
      errorDiv.innerHTML = `
        <span class="icon-[mdi--alert]" role="img" aria-hidden="true"></span>
        <div>Error al recuperar los datos del gráfico</div>
      `;
      canvas.parentElement.appendChild(errorDiv);
    }
  };

  createChartIfDataExists('chart-communities', chartsData.topCommunities);
  createChartIfDataExists('chart-nationalities', chartsData.nationalities);
  createChartIfDataExists('chart-ods', chartsData.ods);
  createChartIfDataExists('chart-joins', chartsData.joins);
});
