import {AppButton, AppHeader, AppScrollWrapBottomTab, AppText, GlobalService} from '@components';
import {Box, ENUM_COLORS} from '@theme';
import {LogApp} from '@utils';
import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {ChartHome, ENUM_COLORS_CHART} from './ChartHome';
import {useHookHome} from './Home.hook';
import {HomeToday} from './HomeToday';
import {setStatus} from '@redux';
import customParseFormat from "dayjs/plugin/customParseFormat";
import {useDispatch} from 'react-redux';
import {CloseIcon, IconCalendar, IconMenu} from '@assets';
import {ModalDetail} from './ModalDetail';
import FastImage from 'react-native-fast-image';
import {AppMonthPicker} from './AppMonthPicker';
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

  const refMonthPicker = useRef() as any;

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


      dataContent.forEach((el, index) => {
        arr_am_spO2.data[index] = (+el.pulse_before_am || 0);
        arr_am_spO2_1.data[index] = +(el.pulse_after_am_1h || 0);
        arr_am_spO2_2.data[index] = +(el.pulse_after_am_2h || 0);

        arr_pm_spO2.data[index] = +(el.pulse_before_pm || 0);
        arr_pm_spO2_1.data[index] = +(el.pulse_after_pm_1h || 0);
        arr_pm_spO2_2.data[index] = +(el.pulse_after_pm_2h || 0);
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
      <AppScrollWrapBottomTab
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={<>
          <AppHeader title="Dashboard" />
          <Box flexDirection={"row"} justifyContent="space-between" paddingVertical={"s"} paddingRight="s">
            <Box flexDirection={"row"} alignItems="center">
              <FastImage source={IconCalendar} style={{width: 15, height: 18, marginRight: 10, }} />
              <AppText variant={"title3"} color={ENUM_COLORS.placeHolderColor} >01/2023</AppText>
            </Box>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
              refMonthPicker.current.showPicker(true);
            }}>
              <FastImage source={IconMenu} style={{width: 18, height: 22}} />
            </Pressable>
          </Box>
        </>}
        isHeightStatus={false}
      >
        <>
          <AppText variant="title2">PULSE_AM</AppText>
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
      <ModalDetail visible={indexActive !== undefined}
        data={dataContent[indexActive || 0]}
        setIndexActive={setIndexActive}
      />
      <AppMonthPicker ref={refMonthPicker} />
    </>
  );
};

const styles = StyleSheet.create({
  btn1: {marginBottom: 20},
});

export {Home};
