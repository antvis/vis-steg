import React, { useEffect } from 'react';
import { g2plotRender } from '../util';
import { Chart } from '../consts/chartSamples';
import './index.less';

const ChartView = ({ curChartSamp, getChartObj }: { curChartSamp: Chart, getChartObj: (chartObj: any) => void }) => {

  useEffect(() => {
    // console.log(`chart.type = ${curChartSamp.type}`);
    let plot: any;
    fetch(curChartSamp.data)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        plot = g2plotRender('chart_container', curChartSamp.type, data, curChartSamp.config);
        getChartObj(plot.chart);
      });
    return function cleanup() {
      plot.destroy();
    };
  }, [curChartSamp]);

  return (
    <div id={'chart_container'} style={{ height: '300px' }}></div>
  );
};

export default ChartView;
