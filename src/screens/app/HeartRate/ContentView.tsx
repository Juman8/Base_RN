import {AppInput} from "@components";
import {Box} from "@theme";
import React from "react";

interface ContentViewProps {
  setDataDetail1: (data: string) => void;
  setDataDetail2: (data: string) => void;
  value1?: string;
  value2?: string;
}

export const ContentView = (props: ContentViewProps) => {
  const {setDataDetail1, setDataDetail2, value1, value2} = props;
  return (
    <Box flexDirection={"row"} mb="l" mt={"s"}>
      <AppInput
        label="SPO2"
        value={value1 || ''}
        onChangeText={setDataDetail1}
        placeholder="0.0"
        keyboardType="numeric"
        style={{flex: 1, marginRight: 20}}
        maxLength={5}
        labelStyle={{textAlign:'center'}}
      />
      <AppInput
        label="Pulse"
        value={value2 || ''}
        onChangeText={setDataDetail2}
        placeholder="0.0"
        keyboardType="numeric"
        style={{flex: 1}}
        maxLength={5}
        labelStyle={{textAlign: 'center'}}
      />
    </Box>
  )
}