document.addEventListener('DOMContentLoaded', function () {
  const chartsDataElement = document.getElementById('charts-data');
  const chartsData = JSON.parse(chartsDataElement.textContent);

  const ctx = chart => document.getElementById(chart).getContext('2d');

  new Chart(ctx('chart-communities'), ChartsLib.hydrateCallbacks(chartsData.topCommunities));
  new Chart(ctx('chart-nationalities'), ChartsLib.hydrateCallbacks(chartsData.nationalities));
  new Chart(ctx('chart-ods'), ChartsLib.hydrateCallbacks(chartsData.ods));
  new Chart(ctx('chart-joins'), ChartsLib.hydrateCallbacks(chartsData.joins));
});
