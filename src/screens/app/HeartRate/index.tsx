import {
  AppButton,
  AppHeader,
  AppInput,
  AppText,
  GlobalService,
} from '@components';
import {goBack} from '@navigation';
import {useRoute} from '@react-navigation/native';
import {Box, useTheme} from '@theme';
import {dataHealthContent, firebaseSvc, showAlertMessage} from '@utils';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Masks} from 'react-native-mask-input';
import {HearAM} from './HearAM';
import {HearPM} from './HearPM';

export const HeartRate = () => {
  const route = useRoute();

  const {dataContent, isAM, isToday} = route?.params || ({} as any);
  const [dataDetail, setDataDetail] = useState<dataHealthContent>(
    dataContent
      ? {
          ...dataContent,
          created: dayjs(dataContent.created).format('DD/MM/YYYY'),
        }
      : undefined,
  );
  const [isAm, setIsAm] = useState<boolean>(isAM === undefined ? true : isAM);
  const [isChanged, setChanged] = useState<boolean>(false);
  const {themeColor} = useTheme();

  useEffect(() => {
    if (isToday) {
      firebaseSvc.onGetDataTodayNotEvent(data => {
        setDataDetail({
          ...data,
          created: dayjs(data?.created).format('DD/MM/YYYY'),
        });
      });
    }
  }, [isToday]);

  const onChangeData = (data: any) => {
    setChanged(true);
    setDataDetail(prv => {
      return {
        ...prv,
        ...data,
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
    GlobalService.showLoading();
    if (dataDetail.created && dataDetail.created.length < 10) {
      return showAlertMessage(
        'Định dạng ngày không đúng, vui lòng nhập lại đi mẹ Mint',
        'danger',
      );
    }
    const newData: any = {
      ...dataDetail,
      created: dayjs(dataDetail.created, 'DD/MM/YYYY').valueOf(),
    };

    const valueData = formatDataHearth(newData);

    if (!dataDetail?.id) {
      firebaseSvc.onAddDataHeath(valueData, (id: number | string) => {
        showAlertMessage('Add successfully', 'success');
        setDataDetail((prv: any) => {
          return {
            ...prv,
            id,
          };
        });
      });
    } else {
      firebaseSvc.onUpdateDataHeath(valueData, dataDetail.id);
      showAlertMessage('Update successfully', 'success');
      GlobalService.hideLoading();
      goBack();
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
    <KeyboardAwareScrollView>
      <AppHeader title="Heart Rate Data" isBack />
      <Box padding="l" flex={1}>
        <Box flexDirection={'row'} alignItems={'center'} mb="l">
          <Pressable
            onPress={() => {
              onPressChange(true);
            }}
            style={styles.btnAM}
          >
            <Box
              style={[
                styles.viewContentRadio,
                {borderColor: themeColor.divider},
                isAm && {backgroundColor: 'white'},
              ]}
            />
            <AppText marginLeft={'s'}>AM</AppText>
          </Pressable>
          <Pressable
            onPress={() => {
              onPressChange(false);
            }}
            style={styles.btnPM}
          >
            <Box
              style={[
                styles.viewContentRadio,
                {borderColor: themeColor.divider},
                !isAm && {backgroundColor: 'white'},
              ]}
              ml="l"
            />
            <AppText marginLeft={'s'}>PM</AppText>
          </Pressable>
        </Box>

        {isAm ? (
          <HearAM dataDetail={dataDetail} onChangeData={onChangeData} />
        ) : (
          <HearPM dataDetail={dataDetail} onChangeData={onChangeData} />
        )}
        <AppInput
          isMasked
          value={dataDetail?.created || dayjs().format('DD/MM/YYYY')}
          onChangeText={masked => {
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
      <AppButton
        label="Confirm"
        style={styles.btnConfirm}
        disabled={!isChanged}
        onPress={onHandleConfirm}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  viewContentRadio: {width: 30, height: 30, borderWidth: 2, borderRadius: 15},
  btnConfirm: {marginHorizontal: 20, marginBottom: 20},
  btnAM: {flexDirection: 'row', alignItems: 'center'},
  btnPM: {flexDirection: 'row', alignItems: 'center'},
});
