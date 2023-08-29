import {AppText} from '@components';
import {Box, MIN_WIDTH} from '@theme';
import React from 'react';

export const LabelView = ({title}: {title: string}) => {
  return (
    <Box flexDirection="row" alignItems={'center'}>
      <Box flex={1} justifyContent={'center'}>
        <Box
          height={4}
          width={4}
          backgroundColor="red"
          position={'absolute'}
          borderRadius="xl"
          left={0}
          zIndex={99}
        />
        <Box backgroundColor={'divider'} height={1} />
        {/* <Box height={4} width={4} backgroundColor="red" position={"absolute"} borderRadius="xl" right={0} /> */}
      </Box>
      <AppText
        paddingHorizontal={'m'}
        style={{minWidth: MIN_WIDTH}}
        textAlign="center"
      >
        {title}
      </AppText>
      <Box flex={1} justifyContent={'center'}>
        {/* <Box height={4} width={4} backgroundColor="red" position={"absolute"} borderRadius="xl" left={0} zIndex={99} /> */}
        <Box backgroundColor={'divider'} height={1} />
        <Box
          height={4}
          width={4}
          backgroundColor="red"
          position={'absolute'}
          borderRadius="xl"
          right={0}
        />
      </Box>
    </Box>
  );
};
