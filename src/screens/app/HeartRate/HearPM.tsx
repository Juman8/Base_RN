import React from "react";
import {ContentView} from "./ContentView";
import {LabelView} from "./LabelView";

export const HearPM = ({onChangeData, dataDetail}: any) => {
  return (
    <>
      <LabelView title="BEFORE" />
      <ContentView
        setDataDetail1={(value: string) => {
          onChangeData({spO2_before_pm: value.trim()});
        }}
        setDataDetail2={(value: string) => {
          onChangeData({pulse_before_pm: value.trim()});
        }}
        value1={dataDetail?.spO2_before_pm}
        value2={dataDetail?.pulse_before_pm}
      />

      {/* AFTER 1h */}
      <LabelView title="AFTER 1H" />
      <ContentView
        setDataDetail1={(value: string) => {
          onChangeData({spO2_after_pm_1h: value.trim()});
        }}
        setDataDetail2={(value: string) => {
          onChangeData({pulse_after_pm_1h: value.trim()});
        }}
        value1={dataDetail?.spO2_after_pm_1h}
        value2={dataDetail?.pulse_after_pm_1h}
      />

      {/* AFTER 2h */}
      <LabelView title="AFTER 2H" />
      <ContentView
        setDataDetail1={(value: string) => {
          onChangeData({spO2_after_pm_2h: value.trim()});
        }}
        setDataDetail2={(value: string) => {
          onChangeData({pulse_after_pm_2h: value.trim()});
        }}
        value1={dataDetail?.spO2_after_pm_2h}
        value2={dataDetail?.pulse_after_pm_2h}
      />
    </>
  );
};