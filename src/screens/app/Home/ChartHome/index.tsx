/* eslint-disable @typescript-eslint/no-explicit-any */
import {DEVICE} from '@utils';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

export enum ENUM_COLORS_CHART {
  BEFORE = '#18d63e',
  AFTER_1h = '#d69018',
  AFTER_2h = '#d618ad',
}

interface ChartHomeProps {
  dataSets: {data: number[]; color: () => ENUM_COLORS_CHART}[];
  labels: string[];
  onDataPointClick?: (index: number) => void;
  onScroll: (x: number) => void;
  refScroll: (_ref: any) => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}

export const ChartHome = (props: ChartHomeProps) => {
  const {
    dataSets,
    labels,
    onDataPointClick,
    onScroll,
    refScroll,
    onTouchStart,
    onTouchEnd,
  } = props;
  const [WidthChart, setWidthChart] = useState(DEVICE.width);
  const dataLengthRatio = dataSets[0].data.length / 7;

  useEffect(() => {
    const _WidthChart =
      dataLengthRatio < 1 ? DEVICE.width : DEVICE.width * dataLengthRatio;
    setWidthChart(_WidthChart);
  }, [dataLengthRatio]);

  const ref = useRef<any>(null);
  const refTimeout = useRef<any>(null);

  useEffect(() => {
    refTimeout.current = setTimeout(() => {
      ref.current?.scrollToEnd?.({animated: true});
    }, 1500);
    return () => {
      clearTimeout(refTimeout.current);
    };
  }, [dataLengthRatio]);

  return (
    <LineChart
      refScroll={(_ref: any) => {
        ref.current = _ref;
        refScroll(ref);
      }}
      onScroll={(e: any) => {
        onScroll(e.nativeEvent.contentOffset.x);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      data={{
        labels: labels,
        datasets: dataSets || [{data: []}],
      }}
      width={WidthChart} // from react-native
      height={220}
      yAxisInterval={1} // optional, defaults to 1
      yBgr="#000"
      chartConfig={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        backgroundGradientFrom: '#rgba(0,0,0,0.2)',
        backgroundGradientTo: 'rgba(0,0,0,0.6)',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '4',
          strokeWidth: '0.5',
          stroke: '#ffa726',
        },
        propsForLabels: {
          fontSize: 12,
        },
      }}
      onDataPointClick={data => {
        onDataPointClick?.(data.index);
      }}
      bezier
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
