import React from 'react';
import ReactECharts from 'echarts-for-react';

const TrendChart: React.FC = () => {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['公司数量', '投资额'],
      textStyle: { color: '#a0aec0' },
      top: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#a0aec0' },
    },
    yAxis: [
      {
        type: 'value',
        name: '数量',
        position: 'left',
        axisLine: { lineStyle: { color: '#4a5568' } },
        axisLabel: { color: '#a0aec0' },
        splitLine: { lineStyle: { color: '#2d3748' } },
      },
      {
        type: 'value',
        name: '金额(亿)',
        position: 'right',
        axisLine: { lineStyle: { color: '#4a5568' } },
        axisLabel: { color: '#a0aec0' },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '公司数量',
        type: 'bar',
        data: [120, 132, 145, 150, 155, 160, 165, 168, 170, 172, 175, 178],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#3646fc' },
              { offset: 1, color: '#2b35cf' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: '投资额',
        type: 'line',
        yAxisIndex: 1,
        data: [150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400, 420],
        smooth: true,
        itemStyle: { color: '#52c41a' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
              { offset: 1, color: 'rgba(82, 196, 26, 0)' },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="h-64">
      <ReactECharts option={option} style={{ height: '100%' }} />
    </div>
  );
};

export default TrendChart;
