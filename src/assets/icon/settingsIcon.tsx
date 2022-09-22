import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { iconProps } from '@assets';

const SettingsIcon = (props: iconProps) => {
  const { strokeColor } = props;
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M10.5 20a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
        stroke={strokeColor}
        strokeWidth={2}
      />
      <Path
        d="M6.5 11.5a1 1 0 100-2 1 1 0 000 2zM10.5 11.5a1 1 0 100-2 1 1 0 000 2zM14.5 11.5a1 1 0 100-2 1 1 0 000 2z"
        fill="#D8D8D8"
        stroke={strokeColor}
      />
    </Svg>
  );
};

export { SettingsIcon };
