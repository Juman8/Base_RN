import React, {useEffect, useState} from 'react';
import {Box, useTheme} from "@theme";
import {AppButton, AppHeader, AppInput, AppText, GlobalService} from '@components';
import {ContentView} from './ContentView';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {dataHealthContent, firebaseSvc, showAlertMessage} from '@utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LabelView} from './LabelView';
import {HearAM} from './HearAM';
import {HearPM} from './HearPM';
import {useRoute} from '@react-navigation/native';
import MaskInput, {Masks} from 'react-native-mask-input';
import dayjs from 'dayjs';

export const HeartRate = () => {
  const route = useRoute();

  const {dataContent, isAM, isToday} = route?.params || {} as any;
  const [dataDetail, setDataDetail] = useState<dataHealthContent>(dataContent);
  const [isAm, setIsAm] = useState<boolean>(isAM === undefined ? true : isAM);
  const [isChanged, setChanged] = useState<boolean>(false);
  const {themeColor} = useTheme();


  useEffect(() => {
    if (isToday) {
      firebaseSvc.onGetDataTodayNotEvent((data) => {
        setDataDetail(data);
      });
    }
  }, [isToday]);

  const onChangeData = (data: any) => {
    setChanged(true);
    setDataDetail((prv: any) => {
      return {
        ...prv,
        ...data
      };
    });
  };

  const onPressChange = (status: boolean) => {
    GlobalService.showLoading();
    setTimeout(() => {
      GlobalService.hideLoading();
      setIsAm(status);
    }, 50);
  };

  const onHandleConfirm = () => {
    if (dataDetail.created && dataDetail.created.length < 10) {
      return showAlertMessage("Định dạng ngày không đúng, vui lòng nhập lại đi mẹ Mint", "danger");
    }
    const newData: any = {
      ...dataDetail,
    };

    const valueData = formatDataHearth(newData);

    if (!dataDetail?.id) {
      firebaseSvc.onAddDataHeath(valueData, (id: number | string) => {
        showAlertMessage("Add successfully", "success");
        setDataDetail((prv: any) => {
          return {
            ...prv,
            id,
          };
        });
      });
    } else {
      firebaseSvc.onUpdateDataHeath(valueData, dataDetail.id);
      showAlertMessage("Update successfully", "success");
    }
  };

  const formatDataHearth = (data: dataHealthContent) => {
    const objValues = Object.values(data);
    const objKeys = Object.keys(data);

    const newObj: any = {};
    objValues.forEach((el, index) => {
      if (el) {
        newObj[objKeys[index]] = el;
      }
    });

    return newObj;
  };

  return (
    <KeyboardAwareScrollView >
      <AppHeader title="Heart Rate Data" isBack />
      <Box padding="l" flex={1} >
        <Box flexDirection={"row"} alignItems={"center"} mb="l">
          <Pressable onPress={() => {onPressChange(true);}} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Box style={[styles.viewContentRadio, {borderColor: themeColor.divider, }, isAm && {backgroundColor: 'white'}]}
            />
            <AppText marginLeft={"s"}>AM</AppText>
          </Pressable>
          <Pressable onPress={() => {onPressChange(false);}} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Box style={[styles.viewContentRadio, {borderColor: themeColor.divider, }, !isAm && {backgroundColor: 'white'}]} ml="l" />
            <AppText marginLeft={"s"}>PM</AppText>
          </Pressable>
        </Box>

        {isAm ? <HearAM dataDetail={dataDetail} onChangeData={onChangeData} /> :
          <HearPM dataDetail={dataDetail} onChangeData={onChangeData} />}
        <AppInput
          isMasked
          value={dataDetail?.created || dayjs().format('DD/MM/YYYY')}
          onChangeText={(masked) => {
            setChanged(true);
            setDataDetail(prv => {
              return {
                ...prv,
                created: masked,
              };
            });
          }}
          placeholder="DD/MM/YYYY"
          mask={Masks.DATE_DDMMYYYY}
          keyboardType="numeric"
        />
      </Box>
      <AppButton label='Confirm' style={{marginHorizontal: 20, marginBottom: 20}} disabled={!isChanged}
        onPress={onHandleConfirm}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  viewContentRadio: {width: 30, height: 30, borderWidth: 2, borderRadius: 15}
});
