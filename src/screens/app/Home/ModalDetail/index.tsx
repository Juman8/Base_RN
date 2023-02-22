import {CloseIcon} from "@assets";
import {AppText} from "@components";
import {Box} from "@theme";
import {dataHealthContent, DEVICE} from "@utils";
import {transform} from "lodash";
import React, {useEffect, useRef} from "react";
import {ScrollView, Pressable, Animated} from "react-native";
import {HomeToday} from "../HomeToday";

const NewBoxView = Animated.createAnimatedComponent(Box);

interface ModalProps {
  data: dataHealthContent;
  setIndexActive: (value: number | undefined) => void;
  visible: boolean;
}

export const ModalDetail = (props: ModalProps) => {
  const {data, setIndexActive, visible} = props;
  const refCurrent = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(refCurrent, {
        toValue: 0,
        useNativeDriver: true
      }).start();
    }
  }, [visible]);

  const onClose = () => {
    Animated.timing(refCurrent, {
      toValue: DEVICE.height * 0.6,
      duration: 400,
      useNativeDriver: true
    }).start();
    setTimeout(() => setIndexActive(undefined), 400);
  };

  if (!visible) {
    return null;
  }
  return (
    <NewBoxView position={"absolute"} bottom={0} width="100%" style={{
      backgroundColor: '#000',
      transform: [{
        translateY: refCurrent
      }]
    }} height={DEVICE.height * 0.6} borderTopColor={"textColor"} borderTopWidth={0.5}

    >
      <Box padding="s" pt={"l"}>
        <AppText textAlign={"center"} variant={"title1"}>{data?.created}</AppText></Box>
      <ScrollView>
        <HomeToday dataToday={data} />
        <Box height={54} />
      </ScrollView>
      <Pressable onPress={onClose} style={{
        position: 'absolute',
        right: 30,
        height: 38,
        width: 38
      }}>
        <CloseIcon />
      </Pressable>
    </NewBoxView>
  );
};