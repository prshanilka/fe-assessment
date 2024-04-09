
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface IChartProps {
  options: Highcharts.Options;
}

const Chart: React.FC<IChartProps> = ({ options }) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
