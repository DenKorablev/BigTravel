import AbstractView from './abstract.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

export const getUniqueTypes = (points) => {
  const allTypes = points.map((point) => point.type);
  const uniqueTypes = Array.from(new Set(allTypes));
  return uniqueTypes;
};

const renderMoneyChart = (moneyCtx, points, types) => {
  const data = {};
/*   types.forEach((type) => data[type] = 0);
  points.forEach((point) => data[point.type] += point.price); */
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: Object.values(data),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTransportChart = (transportCtx, points, types) => {
  console.log(types);
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: [4, 3, 2, 1, 1, 1],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TRANSPORT',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points, types) => {
  console.log(types);
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: [4, 3, 2, 1, 1, 1],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = () => `
  <section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;


export default class Statistics extends AbstractView {
  constructor(points) {
    super();
    this._pointsData = points;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  removeElement() {
    super.removeElement();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeChart !== null) {
      this._colorsCart = null;
      this._transportChart = null;
      this._timeChart = null;
    }

    const uniqueTypes = getUniqueTypes(this._pointsData);
    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const transportCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');

    this._moneyChart = renderMoneyChart(moneyCtx, this._pointsData, uniqueTypes);
    this._transportChart = renderTransportChart(transportCtx, this._pointsData, uniqueTypes);
    this._timeChart = renderTimeChart(timeCtx, this._pointsData, uniqueTypes);

    moneyCtx.height = BAR_HEIGHT * 5;
    transportCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;
  }
}
