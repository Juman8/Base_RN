/* eslint-disable react-hooks/exhaustive-deps */
import {CloseIcon} from '@assets';
import {AppText} from '@components';
import {ENUM_APP_CHART} from '@constants';
import {Box} from '@theme';
import {dataHealthContent, DEVICE} from '@utils';
import dayjs from 'dayjs';
import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, ScrollView, StyleSheet} from 'react-native';
import {HomeToday} from '../HomeToday';

const NewBoxView = Animated.createAnimatedComponent(Box);

interface ModalProps {
  data: dataHealthContent;
  setIndexActive: (value: number | undefined) => void;
  visible: boolean;
  typeOfChart: string | undefined;
}

export const ModalDetail = (props: ModalProps) => {
  const {data, setIndexActive, visible, typeOfChart} = props;
  const refCurrent = useRef(new Animated.Value(0)).current;

  const refHeightAM = useRef<any>();
  const refScroll = useRef<any>();

  useEffect(() => {
    if (visible) {
      Animated.spring(refCurrent, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    if (
      typeOfChart === ENUM_APP_CHART.SP02_PM ||
      typeOfChart === ENUM_APP_CHART.PULSE_PM
    ) {
      setTimeout(() => {
        refScroll.current?.scrollTo({
          animated: true,
          y: refHeightAM.current?.onGetOffset(),
        });
      }, 500);
    }
  }, [typeOfChart, visible]);

  const onClose = () => {
    Animated.timing(refCurrent, {
      toValue: DEVICE.height * 0.6,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setTimeout(() => setIndexActive(undefined), 400);
  };

  if (!visible) {
    return null;
  }
  return (
    <NewBoxView
      position={'absolute'}
      bottom={0}
      width="100%"
      style={[
        styles.boxContainer,
        {
          transform: [
            {
              translateY: refCurrent,
            },
          ],
        },
      ]}
      height={DEVICE.height * 0.6}
      borderTopColor={'textColor'}
      borderTopWidth={0.5}
    >
      <Box padding="s" pt={'l'}>
        <AppText textAlign={'center'} variant={'title1'}>
          {dayjs(data?.created).format('DD/MM/YYYY')}
        </AppText>
      </Box>
      <ScrollView ref={refScroll}>
        <HomeToday dataToday={data} ref={refHeightAM} />
        <Box height={54} />
      </ScrollView>
      <Pressable onPress={onClose} style={styles.btnClose}>
        <CloseIcon />
      </Pressable>
    </NewBoxView>
  );
};
const styles = StyleSheet.create({
  btnClose: {
    position: 'absolute',
    right: 30,
    height: 38,
    width: 38,
  },
  boxContainer: {
    backgroundColor: '#000',
  },
});
