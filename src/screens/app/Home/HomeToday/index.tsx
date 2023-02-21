import {AppText} from "@components";
import {navigate, SCREEN_ROUTE} from "@navigation";
import {Box, ENUM_COLORS, Text} from "@theme";
import {dataHealthContent, firebaseSvc} from "@utils";
import React, {useEffect, useState} from "react";
import {Pressable} from "react-native";

const BtnAngle = () => {
  return (
    <Box width={8} height={8} backgroundColor="primary" borderRadius={"s"} />
  );
};

const ViewLabel = ({label, value, isHide}: any) => {
  return (
    <Box flexDirection={"row"} alignItems="center">
      <BtnAngle />
      <AppText marginLeft="s" width={!isHide && label ? 30 : undefined}
        color={isHide && ENUM_COLORS.red}
        variant={"title3"}>{!label ? '' : label + (isHide ? '' : ' :')}</AppText>
      {!isHide && <AppText marginLeft="m">{value || '--'}</AppText>}
    </Box>
  );
};

export const HomeToday = ({dataToday}: {dataToday?: dataHealthContent;}) => {

  const renderTab = (type: string, valueBefore?: string, valueAfter_1h?: string, valueAfter_2h?: string) => {
    return (
      <>
        <Box marginTop={"s"}>
          <ViewLabel label={type} isHide />
        </Box>
        <Box flexDirection={"row"} marginTop="s">
          <Box flex={1} >
            <AppText marginBottom="s">Before</AppText>
            <ViewLabel label="" value={valueBefore} />
          </Box>
          <Box flex={1} paddingRight={"s"}>
            <AppText marginBottom="s">After</AppText>
            <ViewLabel label="1h" value={valueAfter_1h} />
            <ViewLabel label="2h" value={valueAfter_2h} />
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <Pressable onPress={() => navigate(SCREEN_ROUTE.HEAR_RATE, {dataContent: dataToday, isAM: true})}>
        <Box style={{backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10}}>
          <AppText color={ENUM_COLORS.red} variant="title2" fontWeight={"700"}>AM</AppText>
          <Box marginLeft={"m"}>
            {renderTab("SPO2", dataToday?.spO2_before_am, dataToday?.spO2_after_am_1h, dataToday?.spO2_after_am_2h)}
            {renderTab("PULSE", dataToday?.pulse_before_am, dataToday?.pulse_after_am_1h, dataToday?.pulse_after_am_2h)}
          </Box>
        </Box>
      </Pressable>
      <Pressable onPress={() => navigate(SCREEN_ROUTE.HEAR_RATE, {dataContent: dataToday, isAM: false})}>
        <Box style={{backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10}} marginTop="s">
          <AppText color={ENUM_COLORS.red} variant="title2" fontWeight={"700"}>PM</AppText>
          <Box marginLeft={"m"}>
            {renderTab("SPO2", dataToday?.spO2_before_pm, dataToday?.spO2_after_pm_1h, dataToday?.spO2_after_pm_2h)}
            {renderTab("PULSE", dataToday?.pulse_before_pm, dataToday?.pulse_after_pm_1h, dataToday?.pulse_after_pm_2h)}
          </Box>
        </Box>
      </Pressable>
    </>
  );

};