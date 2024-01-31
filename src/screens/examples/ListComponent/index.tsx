import React from 'react';
import {imageExample, Spacing} from '@assets';
import {AppGallery, AppImage, AppText, VirtualList} from '@components';
import {BORDER_RADIUS, Box, ENUM_COLORS} from '@theme';

export const ListComponentExample = () => {
  return (
    <VirtualList
      data={new Array(10).fill({})}
      renderItem={() => {
        return (
          <Box paddingBottom={'s'} style={{paddingHorizontal: Spacing.width15}}>
            <Box flexDirection={'row'}>
              <AppImage
                uri={imageExample}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'red',
                }}
              />
              <Box marginLeft={'s'}>
                <AppText variant="title3">Andrew Tran</AppText>
                <AppText color={ENUM_COLORS.color_Tab_Unselected}>
                  2 hour ago
                </AppText>
              </Box>
            </Box>
            <AppGallery
              onPress={function (): void {
                // throw new Error('Function not implemented.');
              }}
              file={[{name: imageExample}, {name: imageExample}]}
            />
          </Box>
        );
      }}
    />
  );
};
