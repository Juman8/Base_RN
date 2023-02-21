import {AppButton, AppHeader, AppScrollWrapBottomTab, AppText, GlobalService} from '@components';
import {Box} from '@theme';
import {LogApp} from '@utils';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ChartHome, ENUM_COLORS_CHART} from './ChartHome';
import {useHookHome} from './Home.hook';
import {HomeToday} from './HomeToday';
import {setStatus} from '@redux';
import customParseFormat from "dayjs/plugin/customParseFormat";
import {useDispatch} from 'react-redux';
dayjs.extend(customParseFormat);

type dataChart = {data: number[]; color: () => ENUM_COLORS_CHART;};

const Home = () => {

  const {ListFooterComponent, dataToday, dataContent} = useHookHome();
  const dispatch = useDispatch();


  const [dataDashboardPULSE_AM, setDataDashboardPULSE_AM] = useState<dataChart[]>([{data: [0], color: () => ENUM_COLORS_CHART.BEFORE}]);
  const [dataDashboardPULSE_PM, setDataDashboardPULSE_PM] = useState<dataChart[]>([{data: [0], color: () => ENUM_COLORS_CHART.BEFORE}]);
  const [dataDashboardSPO2_AM, setDataDashboardSPO2_AM] = useState<dataChart[]>([{data: [0], color: () => ENUM_COLORS_CHART.BEFORE}]);
  const [dataDashboardSPO2_PM, setDataDashboardSPO2_PM] = useState<dataChart[]>([{data: [0], color: () => ENUM_COLORS_CHART.BEFORE}]);
  const [labels, setLabels] = useState<string[]>([]);
  const [indexActive, setIndexActive] = useState<number | undefined>();
  LogApp({dataDashboardSPO2_AM, dataDashboardPULSE_AM});

  // SPO2
  useEffect(() => {
    if (dataContent && dataContent.length > 0) {
      // spo2
      const arr_am_spO2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.BEFORE
      };
      const arr_am_spO2_1: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_1h
      };
      const arr_am_spO2_2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_2h
      };
      const arr_pm_spO2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.BEFORE
      };
      const arr_pm_spO2_1: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_1h
      };
      const arr_pm_spO2_2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_2h
      };

      const label: string[] = [];

      dataContent.forEach((el, index) => {
        arr_am_spO2.data[index] = (+el.spO2_before_am || 0);
        arr_am_spO2_1.data[index] = +(el.spO2_after_am_1h || 0);
        arr_am_spO2_2.data[index] = +(el.spO2_after_am_2h || 0);

        arr_pm_spO2.data[index] = +(el.spO2_before_pm || 0);
        arr_pm_spO2_1.data[index] = +(el.spO2_after_pm_1h || 0);
        arr_pm_spO2_2.data[index] = +(el.spO2_after_pm_2h || 0);
        label.push(dayjs(el.created, 'DD/MM/YYYY').format('DD/MM'));
      });
      const dataChartSPO2_AM = [arr_am_spO2, arr_am_spO2_1, arr_am_spO2_2];
      const dataChartSPO2_PM = [arr_pm_spO2, arr_pm_spO2_1, arr_pm_spO2_2];
      setDataDashboardSPO2_AM(dataChartSPO2_AM);
      setDataDashboardSPO2_PM(dataChartSPO2_PM);
      setLabels(label);
    }
  }, [dataContent]);
  //PULSE
  useEffect(() => {
    if (dataContent && dataContent.length > 0) {
      // spo2
      const arr_am_spO2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.BEFORE
      };
      const arr_am_spO2_1: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_1h
      };
      const arr_am_spO2_2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_2h
      };
      const arr_pm_spO2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.BEFORE
      };
      const arr_pm_spO2_1: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_1h
      };
      const arr_pm_spO2_2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_2h
      };


      dataContent.forEach(el => {
        arr_am_spO2.data = arr_am_spO2.data.concat([(+el.pulse_before_am || 0)]);
        arr_am_spO2_1.data = arr_am_spO2_1.data.concat([+(el.pulse_after_am_1h || 0)]);
        arr_am_spO2_2.data = arr_am_spO2_2.data.concat([+(el.pulse_after_am_2h || 0)]);

        arr_pm_spO2.data = arr_pm_spO2.data.concat([+(el.pulse_before_pm || 0)]);
        arr_pm_spO2_1.data = arr_pm_spO2_1.data.concat([+(el.pulse_after_pm_1h || 0)]);
        arr_pm_spO2_2.data = arr_pm_spO2_2.data.concat([+(el.pulse_after_pm_2h || 0)]);
      });
      const dataChartSPO2_AM = [arr_am_spO2, arr_am_spO2_1, arr_am_spO2_2];
      const dataChartSPO2_PM = [arr_pm_spO2, arr_pm_spO2_1, arr_pm_spO2_2];

      setDataDashboardPULSE_AM(dataChartSPO2_AM);
      setDataDashboardPULSE_PM(dataChartSPO2_PM);
    }
  }, [dataContent]);

  const onDataPointClick = (index: number) => {
    GlobalService.showLoading();
    setTimeout(() => {
      setIndexActive(index);
      GlobalService.hideLoading();
    }, 500);
  };

  useEffect(() => {
    if (indexActive) {
      dispatch(setStatus(false));
    }
  }, [indexActive]);

  return (
    <>
      <AppScrollWrapBottomTab isHeightStatus
        ListFooterComponent={ListFooterComponent}
      >
        <>
          <AppHeader title="Dashboard" />
          <AppText marginVertical={"s"} variant="title2">PULSE_AM</AppText>
          <ChartHome dataSets={dataDashboardPULSE_AM} labels={labels}
            onDataPointClick={onDataPointClick}
          />
          <AppText marginVertical={"s"} variant="title2">PULSE_PM</AppText>
          <ChartHome dataSets={dataDashboardPULSE_PM} labels={labels}
            onDataPointClick={onDataPointClick}
          />

          <AppText marginVertical={"s"} variant="title2">SP02_AM</AppText>
          <ChartHome dataSets={dataDashboardSPO2_AM} labels={labels}
            onDataPointClick={onDataPointClick}
          />
          <AppText marginVertical={"s"} variant="title2">SP02_PM</AppText>
          <ChartHome dataSets={dataDashboardSPO2_PM} labels={labels}
            onDataPointClick={onDataPointClick}
          />

          <Box paddingHorizontal={"s"}>
            <AppText marginVertical={"s"} variant="title2">TODAY</AppText>
            <HomeToday dataToday={dataToday} />
          </Box>

        </>
      </AppScrollWrapBottomTab>
      {indexActive !== undefined &&
        <Box position={"absolute"} bottom={0} width="100%" style={{backgroundColor: '#000'}} height="90%" >
          <Box padding="s" pt={"l"}>
            <AppText textAlign={"center"} variant={"title1"}>{dataContent[indexActive]?.created}</AppText></Box>
          <ScrollView>
            <HomeToday dataToday={dataContent[indexActive]} />
          </ScrollView>
          <Box alignItems={"center"} paddingBottom="s" style={{backgroundColor: 'transparent'}}>
            <AppButton label="Close" isWrap
              onPress={() => setIndexActive(undefined)}
            />
          </Box>
        </Box>
      }
    </>
  );
};

const styles = StyleSheet.create({
  btn1: {marginBottom: 20},
});

export {Home};
