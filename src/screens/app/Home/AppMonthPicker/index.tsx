/* eslint-disable react-hooks/exhaustive-deps */
import {LogApp} from '@utils';
import dayjs from 'dayjs';
import React, {useCallback, useImperativeHandle, useState} from 'react';
import MonthPicker, {EventTypes} from 'react-native-month-year-picker';

interface propsAppPicker {
  onChangeDate: (data: Date) => void;
}

export const AppMonthPicker = React.forwardRef((props: propsAppPicker, ref) => {
  const {onChangeDate} = props;

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value: boolean) => setShow(value), []);

  useImperativeHandle(
    ref,
    () => ({
      showPicker,
    }),
    [showPicker],
  );

  const onValueChange = useCallback(
    (event: EventTypes, newDate: Date) => {
      LogApp(event);
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      onChangeDate(selectedDate);
    },
    [date, showPicker],
  );

  if (!show) {
    return null;
  }
  return (
    <MonthPicker
      onChange={onValueChange}
      value={date}
      maximumDate={dayjs().toDate()}
      locale="en"
      mode="number"
    />
  );
});
