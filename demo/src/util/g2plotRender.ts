import * as G2Plot from '@antv/g2plot';

export function g2plotRender(container: string | HTMLElement, type: string, data: any, options: any,) {
  const containerDOM = typeof container === 'string' ? document.getElementById(container) : container;
  if (!containerDOM) return null;
  // console.log(`containerDOM.clientHeight = ${containerDOM.clientHeight}`);
  const plot = new G2Plot[type](containerDOM, {
    height: containerDOM.clientHeight ? containerDOM.clientHeight : 300,
    data,
    ...options,
  });
  plot.render();
  return plot;
}
