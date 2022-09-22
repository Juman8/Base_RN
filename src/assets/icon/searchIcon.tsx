import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { iconProps } from '@assets';

const SearchIcon = (props: iconProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M9.5 17.5a8 8 0 100-16 8 8 0 000 16zm9-8a9 9 0 11-18 0 9 9 0 0118 0z"
      fill="#DCE0E5"
      stroke="#DCE0E5"
    />
    <Path
      d="M14.879 15.586l.707-.707 3.76 3.76a.5.5 0 11-.707.707l-3.76-3.76z"
      fill="#DCE0E5"
      stroke="#DCE0E5"
    />
  </Svg>
);

export { SearchIcon };
