import dayjs from 'dayjs';
import React, {useCallback, useImperativeHandle, useState} from 'react';
import MonthPicker from 'react-native-month-year-picker';

interface propsAppPicker {
  onChangeDate: (data: Date) => void;
}

export const AppMonthPicker = React.forwardRef((props: propsAppPicker, ref) => {

  const {onChangeDate} = props;

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value) => setShow(value), []);

  useImperativeHandle(
    ref,
    () => ({
      showPicker
    }),
    [showPicker],
  );

  const onValueChange = useCallback(
    (event, newDate) => {
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
