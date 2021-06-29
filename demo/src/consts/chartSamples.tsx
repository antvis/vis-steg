type ChartType = 'Heatmap' | 'Area' | 'Pie' | 'Column' | 'Line';
export interface Chart {
  id: string;
  type: ChartType;
  data: string;
  config?: any;
  span?: number;
}
export interface ChartInfo {
  name: string;
  charts: Chart[];
}

const CHART_SAMPLES: ChartInfo[] = [
  {
    name: 'Categorical',
    charts: [
      {
        id: '1',
        type: 'Area',
        data: 'https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json',
        config: {
          xField: 'date',
          yField: 'value',
          seriesField: 'country',
        },
      },
      {
        id: '2',
        type: 'Column',
        data: 'https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json',
        config: {
          xField: 'city',
          yField: 'value',
          seriesField: 'type',
          isGroup: 'true',
        },
      },
      {
        id: '3',
        type: 'Line',
        data: 'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json',
        config: {
          xField: 'year',
          yField: 'value',
          seriesField: 'category',
          xAxis: {
            type: 'time',
          },
          yAxis: {
            label: {
              formatter: (v: string) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
          },
        },
      },
      {
        id: '4',
        type: 'Column',
        data: 'https://gw.alipayobjects.com/os/antfincdn/jSRiL%26YNql/percent-column.json',
        config: {
          xField: 'year',
          yField: 'value',
          seriesField: 'type',
          isPercent: true,
          isStack: true,
          meta: {
            value: {
              min: 0,
              max: 1,
            },
          },
          label: {
            position: 'middle',
            content: (item: { value: number }) => {
              return `${(item.value * 100).toFixed(2)}%`;
            },
            style: {
              fill: '#fff',
            },
          },
          tooltip: false,
          interactions: [{ type: 'element-highlight-by-color' }, { type: 'element-link' }],
        },
      },
    ],
  },
  {
    name: 'Heatmap',
    charts: [
      {
        id: '1',
        type: 'Heatmap',
        data: 'https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json',
        config: {
          xField: 'Month of Year',
          yField: 'District',
          colorField: 'AQHI',
          meta: {
            'Month of Year': {
              type: 'cat',
            },
          },
        },
        span: 24,
      },
      {
        id: '2',
        type: 'Heatmap',
        data: 'https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json',
        config: {
          xField: 'name',
          yField: 'country',
          colorField: 'value',
          shape: 'circle',
          sizeRatio: 0.5,
          label: {
            style: {
              fill: '#fff',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)',
            },
          },
        },
      },
      {
        id: '3',
        type: 'Heatmap',
        data: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/polar-heatmap.json',
        config: {
          xField: 'time',
          yField: 'week',
          colorField: 'value',
          legend: true,
          coordinate: {
            type: 'polar',
            cfg: {
              innerRadius: 0.2,
            },
          },
          heatmapStyle: {
            stroke: '#f5f5f5',
            opacity: 0.8,
          },
          meta: {
            time: {
              type: 'cat',
            },
            value: {
              min: 0,
              max: 1,
            },
          },
          xAxis: {
            line: null,
            grid: null,
            tickLine: null,
            label: {
              offset: 12,
              style: {
                fill: '#666',
                fontSize: 12,
                textBaseline: 'top',
              },
            },
          },
          yAxis: {
            top: true,
            line: null,
            grid: null,
            tickLine: null,
            label: {
              offset: 0,
              style: {
                fill: '#fff',
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)',
              },
            },
          },
          tooltip: {
            showMarkers: false,
          },
        },
      },
    ],
  },
];

export default CHART_SAMPLES;
