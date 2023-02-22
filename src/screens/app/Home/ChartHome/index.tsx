import {DEVICE} from '@utils';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  LineChart
} from "react-native-chart-kit";

export enum ENUM_COLORS_CHART {
  BEFORE = "#18d63e",
  AFTER_1h = "#d69018",
  AFTER_2h = "#d618ad"
}

interface ChartHomeProps {
  dataSets: {data: number[]; color: () => ENUM_COLORS_CHART;}[];
  labels: string[];
  onDataPointClick?: (index: number) => void;
}

export const ChartHome = (props: ChartHomeProps) => {
  const {dataSets, labels, onDataPointClick} = props;
  const [WidthChart, setWidthChart] = useState(DEVICE.width);
  const dataLengthRatio = dataSets[0].data.length / 7;

  useEffect(() => {
    const _WidthChart = dataLengthRatio < 1 ? DEVICE.width : (DEVICE.width * dataLengthRatio);
    setWidthChart(_WidthChart);
  }, [dataLengthRatio]);

  return (
    <LineChart
      data={{
        labels: labels,
        datasets: dataSets || [{data: []}]
      }}
      width={WidthChart} // from react-native
      height={220}
      yAxisInterval={1} // optional, defaults to 1
      yBgr="#000"
      chartConfig={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backgroundGradientFrom: "#rgba(0,0,0,0.2)",
        backgroundGradientTo: "rgba(0,0,0,0.6)",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "4",
          strokeWidth: "0.5",
          stroke: "#ffa726"
        },
        propsForLabels: {
          fontSize: 12
        }
      }}
      onDataPointClick={(data) => {
        onDataPointClick?.(data.index);
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1,
    width: '100%',
    height: 280,
    backgroundColor: 'white'
  }
});