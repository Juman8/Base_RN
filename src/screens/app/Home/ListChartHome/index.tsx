import {AppText} from '@components';
import {ENUM_APP_CHART} from '@constants';
import React, {useRef} from 'react';
import {ScrollView} from 'react-native';
import {ChartHome, ENUM_COLORS_CHART} from '../ChartHome';
type dataChart = {data: number[]; color: () => ENUM_COLORS_CHART};

interface ListChartHomeProps {
  labels: string[];
  dataDashboardPULSE_AM: dataChart[];
  dataDashboardPULSE_PM: dataChart[];
  dataDashboardSPO2_AM: dataChart[];
  dataDashboardSPO2_PM: dataChart[];
  onDataPointClick: (index: number, type: string) => void;
}

export const ListChartHome = (props: ListChartHomeProps) => {
  const {
    dataDashboardPULSE_AM,
    onDataPointClick,
    labels,
    dataDashboardPULSE_PM,
    dataDashboardSPO2_AM,
    dataDashboardSPO2_PM,
  } = props;

  const refScrollView = useRef<ScrollView[]>([]);
  const refNumberTouch = useRef<number>(-1);
  const refTouchToScroll = useRef<boolean>(false);

  const onScroll = (x: number) => {
    if (!refTouchToScroll.current) {
      return;
    }
    refScrollView.current.map((it: any, i) => {
      if (i !== refNumberTouch.current) {
        it.current?.scrollTo?.({animated: false, x});
      }
    });
  };

  const refScroll = (_ref: any, index: number) => {
    refScrollView.current[index] = _ref;
  };

  const onTouch = (numOfTouch: number) => {
    refTouchToScroll.current = numOfTouch !== -1;
    refNumberTouch.current = numOfTouch;
  };

  return (
    <>
      <AppText variant="title2">{ENUM_APP_CHART.PULSE_AM}</AppText>
      <ChartHome
        dataSets={dataDashboardPULSE_AM}
        labels={labels}
        onDataPointClick={(index: number) => {
          onDataPointClick(index, ENUM_APP_CHART.PULSE_AM);
        }}
        onScroll={onScroll}
        refScroll={_ref => refScroll(_ref, 0)}
        onTouchStart={() => onTouch(0)}
        onTouchEnd={() => onTouch(-1)}
      />
      <AppText marginVertical={'s'} variant="title2">
        {ENUM_APP_CHART.PULSE_PM}
      </AppText>
      <ChartHome
        dataSets={dataDashboardPULSE_PM}
        labels={labels}
        onDataPointClick={(index: number) => {
          onDataPointClick(index, ENUM_APP_CHART.PULSE_PM);
        }}
        onScroll={onScroll}
        refScroll={_ref => refScroll(_ref, 1)}
        onTouchStart={() => onTouch(1)}
        onTouchEnd={() => onTouch(-1)}
      />

      <AppText marginVertical={'s'} variant="title2">
        {ENUM_APP_CHART.SP02_AM}
      </AppText>
      <ChartHome
        dataSets={dataDashboardSPO2_AM}
        labels={labels}
        onDataPointClick={(index: number) => {
          onDataPointClick(index, ENUM_APP_CHART.SP02_AM);
        }}
        onScroll={onScroll}
        refScroll={_ref => refScroll(_ref, 2)}
        onTouchStart={() => onTouch(2)}
        onTouchEnd={() => onTouch(-1)}
      />
      <AppText marginVertical={'s'} variant="title2">
        {ENUM_APP_CHART.SP02_PM}
      </AppText>
      <ChartHome
        dataSets={dataDashboardSPO2_PM}
        labels={labels}
        onDataPointClick={(index: number) => {
          onDataPointClick(index, ENUM_APP_CHART.SP02_PM);
        }}
        onScroll={onScroll}
        refScroll={_ref => refScroll(_ref, 3)}
        onTouchStart={() => onTouch(3)}
        onTouchEnd={() => onTouch(-1)}
      />
    </>
  );
};
