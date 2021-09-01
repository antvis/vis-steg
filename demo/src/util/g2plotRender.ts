import * as G2Plot from '@antv/g2plot';

export type G2PlotType = 'Line' | 'Area' | 'Column' | 'Bar' | 'Pie' | 'Rose' | 'Scatter' | 'Histogram' | 'Heatmap';

export function g2plotRender(container: string | HTMLElement, type: string, data: any, options: any) {
  const containerDOM = typeof container === 'string' ? document.getElementById(container) : container;
  if (!containerDOM) return null;
  const plot = new G2Plot[type as G2PlotType](containerDOM, {
    height: containerDOM.clientHeight ? containerDOM.clientHeight : 300,
    data,
    ...options,
  });
  plot.render();
  return plot;
}
