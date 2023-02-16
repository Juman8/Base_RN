import React, {useEffect, useState} from 'react';
import {Box, useTheme} from "@theme";
import {AppButton, AppHeader, AppInput, AppText, GlobalService} from '@components';
import {ContentView} from './ContentView';
import {Pressable, StyleSheet} from 'react-native';
import {dataHealthContent, showAlertMessage} from '@utils';

export type dataHealthContentProps = {
  id?: string;

  // SPO2
  // >AM<
  spO2_before: string;
  spO2_after_1h: string;
  spO2_after_2h: string;

  // PULSE
  // >AM<
  pulse_before: string;
  pulse_after_1h: string;
  pulse_after_2h: string;

};


export const HeartRate = (props: {dataContent: dataHealthContent;}) => {
  const { dataContent } = props;
  const [dataDetail, setDataDetail] = useState<dataHealthContentProps>();
  const [isAm, setIsAm] = useState<boolean>(true);
  const [isChanged, setChanged] = useState<boolean>(false);
  const {themeColor} = useTheme();

  const LabelView = ({title}: {title: string;}) => {
    return (
      <Box flexDirection="row" alignItems={"center"} >
        <Box flex={1} justifyContent={'center'}>
          <Box height={4} width={4} backgroundColor="red" position={"absolute"} borderRadius="xl" left={0} zIndex={99} />
          <Box backgroundColor={"divider"} height={1} />
          {/* <Box height={4} width={4} backgroundColor="red" position={"absolute"} borderRadius="xl" right={0} /> */}
        </Box>
        <AppText paddingHorizontal={"m"} style={{minWidth: 80}} textAlign="center">{title}</AppText>
        <Box flex={1} justifyContent={'center'}>
          {/* <Box height={4} width={4} backgroundColor="red" position={"absolute"} borderRadius="xl" left={0} zIndex={99} /> */}
          <Box backgroundColor={"divider"} height={1} />
          <Box height={4} width={4} backgroundColor="red" position={"absolute"} borderRadius="xl" right={0} />
        </Box>
      </Box>
    );
  };

  const onChangeData = (data: any) => {
    setChanged(true);
    setDataDetail((prv: any) => {
      return {
        ...prv,
        ...data
      };
    });
  };

  useEffect(() => {
    if (!dataContent) {
      setDataDetail(undefined);
      setChanged(false);
      return () =>{} 
    }
    let obj = undefined;
    if (isAm) {
      obj = {
        spO2_before: dataContent.spO2_before_am,
        spO2_after_1h: dataContent.spO2_after_am_1h,
        spO2_after_2h: dataContent.spO2_after_am_2h,

        // PULSE
        // >AM<
        pulse_before: dataContent.pulse_before_am,
        pulse_after_1h: dataContent.pulse_after_am_1h,
        pulse_after_2h: dataContent.pulse_after_am_2h,
      }
    } else {
      obj = {
        spO2_before: dataContent.spO2_before_pm,
        spO2_after_1h: dataContent.spO2_after_pm_1h,
        spO2_after_2h: dataContent.spO2_after_pm_2h,

        // PULSE
        // >pm<
        pulse_before: dataContent.pulse_before_pm,
        pulse_after_1h: dataContent.pulse_after_pm_1h,
        pulse_after_2h: dataContent.pulse_after_pm_2h,
      }
    }
    setDataDetail(obj)
  }, [isAm, dataContent])

  const onPressChange = (status: boolean) => {
    if (isChanged){
      GlobalService.showAlert({
        message: 'Dữ liệu thay đổi sẽ mất bạn có muốn thay đổi không',
        onPress: () => {
          setChanged(false);
          setIsAm(prv => !prv)
        }
      })
      return null;
    }
    setIsAm(status)
  }

  return (
    <Box flex={1}>
      <AppHeader title="Heart Rate Data" isBack />
      <Box padding="l" flex={1} >
        <Box flexDirection={"row"} alignItems={"center"} mb="l"> 
          <Pressable onPress={() => {onPressChange(true)}} style={{flexDirection:'row', alignItems:'center'}}>
            <Box style={[styles.viewContentRadio, {borderColor: themeColor.divider, }, isAm && {backgroundColor: 'white'}]} 
          /> 
          <AppText marginLeft={"s"}>AM</AppText>
          </Pressable>
          <Pressable onPress={() => {onPressChange(false);}} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Box style={[styles.viewContentRadio, {borderColor: themeColor.divider, }, !isAm && {backgroundColor: 'white'}]} ml="l" />
          <AppText marginLeft={"s"}>PM</AppText>
          </Pressable>
        </Box>

        {/* BEFORE */}
        <LabelView title="BEFORE" />
        <ContentView
          setDataDetail1={(value: string) => {
            onChangeData({spO2_before: value.trim()});
          }}
          setDataDetail2={(value: string) => {
            onChangeData({pulse_before: value.trim()});
          }}
          value1={dataDetail?.spO2_before}
          value2={dataDetail?.pulse_before}
        />

        {/* AFTER 1h */}
        <LabelView title="AFTER 1H" />
        <ContentView
          setDataDetail1={(value: string) => {
            onChangeData({spO2_after_1h: value.trim()});
          }}
          setDataDetail2={(value: string) => {
            onChangeData({pulse_after_1h: value.trim()});
          }}
          value1={dataDetail?.spO2_after_1h}
          value2={dataDetail?.pulse_after_1h}
        />

        {/* AFTER 2h */}
        <LabelView title="AFTER 2H" />
        <ContentView
          setDataDetail1={(value: string) => {
            onChangeData({spO2_after_2h: value.trim()});
          }}
          setDataDetail2={(value: string) => {
            onChangeData({pulse_after_2h: value.trim()});
          }}
          value1={dataDetail?.spO2_after_2h}
          value2={dataDetail?.pulse_after_2h}
        />
      </Box>
      <AppButton label='Confirm' style={{marginHorizontal: 20, marginBottom: 20}} disabled={!isChanged} />
    </Box>
  );
};

const styles = StyleSheet.create({
  viewContentRadio: {width: 30, height: 30,  borderWidth: 2, borderRadius: 15}
})
