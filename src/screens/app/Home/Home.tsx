/* eslint-disable react-hooks/exhaustive-deps */
import {IconCalendar, IconMenu} from '@assets';
import {
  AppHeader,
  AppScrollWrapBottomTab,
  AppText,
  GlobalService,
} from '@components';
import {setStatus} from '@redux';
import {Box, ENUM_COLORS} from '@theme';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {AppMonthPicker} from './AppMonthPicker';
import {ENUM_COLORS_CHART} from './ChartHome';
import {useHookHome} from './Home.hook';
import {HomeToday} from './HomeToday';
import {ListChartHome} from './ListChartHome';
import {ModalDetail} from './ModalDetail';
dayjs.extend(customParseFormat);

type dataChart = {data: number[]; color: () => ENUM_COLORS_CHART};

const Home = () => {
  const {
    ListFooterComponent,
    dataToday,
    dataContent,
    monthFilter,
    setMonFilter,
  } = useHookHome();
  const dispatch = useDispatch();
  const [dataDashboardPULSE_AM, setDataDashboardPULSE_AM] = useState<
    dataChart[]
  >([{data: [0], color: () => ENUM_COLORS_CHART.BEFORE}]);
  const [dataDashboardPULSE_PM, setDataDashboardPULSE_PM] = useState<
    dataChart[]
  >([{data: [0], color: () => ENUM_COLORS_CHART.BEFORE}]);
  const [dataDashboardSPO2_AM, setDataDashboardSPO2_AM] = useState<dataChart[]>(
    [{data: [0], color: () => ENUM_COLORS_CHART.BEFORE}],
  );
  const [dataDashboardSPO2_PM, setDataDashboardSPO2_PM] = useState<dataChart[]>(
    [{data: [0], color: () => ENUM_COLORS_CHART.BEFORE}],
  );
  const [labels, setLabels] = useState<string[]>([]);
  const [indexActive, setIndexActive] = useState<number | undefined>();
  const [typeOfChart, setTypeOfChart] = useState<string>();

  const refMonthPicker = useRef() as any;

  // SPO2
  useEffect(() => {
    if (dataContent && dataContent.length > 0) {
      // spo2
      const arr_am_spO2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.BEFORE,
      };
      const arr_am_spO2_1: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_1h,
      };
      const arr_am_spO2_2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_2h,
      };
      const arr_pm_spO2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.BEFORE,
      };
      const arr_pm_spO2_1: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_1h,
      };
      const arr_pm_spO2_2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_2h,
      };

      const label: string[] = [];

      dataContent.forEach((el, index) => {
        arr_am_spO2.data[index] = +el.spO2_before_am || 0;
        arr_am_spO2_1.data[index] = +(el.spO2_after_am_1h || 0);
        arr_am_spO2_2.data[index] = +(el.spO2_after_am_2h || 0);

        arr_pm_spO2.data[index] = +(el.spO2_before_pm || 0);
        arr_pm_spO2_1.data[index] = +(el.spO2_after_pm_1h || 0);
        arr_pm_spO2_2.data[index] = +(el.spO2_after_pm_2h || 0);
        label.push(dayjs(el.created).format('DD/MM'));
      });
      const dataChartSPO2_AM = [arr_am_spO2, arr_am_spO2_1, arr_am_spO2_2];
      const dataChartSPO2_PM = [arr_pm_spO2, arr_pm_spO2_1, arr_pm_spO2_2];
      setDataDashboardSPO2_AM(dataChartSPO2_AM);
      setDataDashboardSPO2_PM(dataChartSPO2_PM);
      setLabels(label);
    } else {
      const mData = [{data: [0], color: () => ENUM_COLORS_CHART.BEFORE}];
      setDataDashboardSPO2_AM(mData);
      setDataDashboardSPO2_PM(mData);
      setDataDashboardPULSE_AM(mData);
      setDataDashboardPULSE_PM(mData);
      setLabels([]);
    }
  }, [dataContent]);
  //PULSE
  useEffect(() => {
    if (dataContent && dataContent.length > 0) {
      // spo2
      const arr_am_spO2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.BEFORE,
      };
      const arr_am_spO2_1: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_1h,
      };
      const arr_am_spO2_2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_2h,
      };
      const arr_pm_spO2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.BEFORE,
      };
      const arr_pm_spO2_1: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_1h,
      };
      const arr_pm_spO2_2: dataChart = {
        data: [0],
        color: () => ENUM_COLORS_CHART.AFTER_2h,
      };

      dataContent.forEach((el, index) => {
        arr_am_spO2.data[index] = +el.pulse_before_am || 0;
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

  const onDataPointClick = (index: number, type: string) => {
    setTypeOfChart(type);
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
        ListHeaderComponent={
          <>
            <AppHeader title="Dashboard" />
            <Box
              flexDirection={'row'}
              justifyContent="space-between"
              paddingVertical={'s'}
              paddingRight="s"
            >
              <Box flexDirection={'row'} alignItems="center">
                <FastImage source={IconCalendar} style={styles.img1} />
                <AppText
                  variant={'title3'}
                  color={ENUM_COLORS.placeHolderColor}
                >
                  {monthFilter}
                </AppText>
              </Box>
              <Pressable
                style={styles.btn12}
                onPress={() => {
                  refMonthPicker.current.showPicker(true);
                }}
              >
                <FastImage source={IconMenu} style={styles.img2} />
              </Pressable>
            </Box>
          </>
        }
        isHeightStatus={false}
      >
        <>
          <ListChartHome
            labels={labels}
            dataDashboardPULSE_AM={dataDashboardPULSE_AM}
            dataDashboardPULSE_PM={dataDashboardPULSE_PM}
            dataDashboardSPO2_AM={dataDashboardSPO2_AM}
            dataDashboardSPO2_PM={dataDashboardSPO2_PM}
            onDataPointClick={onDataPointClick}
          />

          <Box paddingHorizontal={'s'}>
            <AppText marginVertical={'s'} variant="title2">
              TODAY
            </AppText>
            <HomeToday dataToday={dataToday} />
          </Box>
        </>
      </AppScrollWrapBottomTab>
      <ModalDetail
        visible={indexActive !== undefined}
        data={dataContent[indexActive || 0]}
        setIndexActive={setIndexActive}
        typeOfChart={typeOfChart}
      />
      <AppMonthPicker
        ref={refMonthPicker}
        onChangeDate={date => {
          setMonFilter(dayjs(date).format('MM/YYYY'));
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  img1: {width: 15, height: 18, marginRight: 10},
  img2: {width: 18, height: 22},
  btn12: {flexDirection: 'row', alignItems: 'center'},
});

export {Home};
