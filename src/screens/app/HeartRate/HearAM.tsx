import React from 'react';
import {ContentView} from './ContentView';
import {LabelView} from './LabelView';

export const HearAM = ({onChangeData, dataDetail}: any) => {
  return (
    <>
      <LabelView title="BEFORE" />
      <ContentView
        setDataDetail1={(value: string) => {
          onChangeData({spO2_before_am: value.trim()});
        }}
        setDataDetail2={(value: string) => {
          onChangeData({pulse_before_am: value.trim()});
        }}
        value1={dataDetail?.spO2_before_am}
        value2={dataDetail?.pulse_before_am}
      />

      {/* AFTER 1h */}
      <LabelView title="AFTER 1H" />
      <ContentView
        setDataDetail1={(value: string) => {
          onChangeData({spO2_after_am_1h: value.trim()});
        }}
        setDataDetail2={(value: string) => {
          onChangeData({pulse_after_am_1h: value.trim()});
        }}
        value1={dataDetail?.spO2_after_am_1h}
        value2={dataDetail?.pulse_after_am_1h}
      />

      {/* AFTER 2h */}
      <LabelView title="AFTER 2H" />
      <ContentView
        setDataDetail1={(value: string) => {
          onChangeData({spO2_after_am_2h: value.trim()});
        }}
        setDataDetail2={(value: string) => {
          onChangeData({pulse_after_am_2h: value.trim()});
        }}
        value1={dataDetail?.spO2_after_am_2h}
        value2={dataDetail?.pulse_after_am_2h}
      />
    </>
  );
};
