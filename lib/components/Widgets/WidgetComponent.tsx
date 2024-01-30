import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import * as echarts from 'echarts/core';
import {useRef, useEffect} from 'react';
import {BarChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';

// Register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  BarChart,
]);

const E_HEIGHT = 250;
const E_WIDTH = 300;

function ChartComponent({option}: any) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (chartRef.current) {
      // @ts-ignore
      chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SvgChart ref={chartRef} />;
}

function WidgetComponent() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  };
  return <ChartComponent option={option} />;
}

export default WidgetComponent;
