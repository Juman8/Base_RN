import {dataHealthContent} from '@utils';
import React from 'react';
import {StyleSheet} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

interface ChartHomeProps {
  dataContent: dataHealthContent[];
}

export const ChartHome = (props: ChartHomeProps) => {
  return (
    <LineChart style={styles.chart}
      data={{dataSets: [{label: "demo", values: [{y: 1}, {y: 2}, {y: 1}]}]}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});