/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Animated,
  TouchableOpacity,
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {AppText} from '@components';
import {styles} from './styles';
import {Pagination} from '../Pagination';
import {Box, Spacing} from '@theme';
import {AppImage} from '../AppImage/AppImage';
import {IconLiked} from '@assets';
import {useTranslation} from 'react-i18next';
interface HeaderPropsType {
  onDoubleTap?: (item: any) => void;
  onPress: () => void;
  file: {name: string}[];
}

export const AppGallery = (props: HeaderPropsType) => {
  const {file = [], onDoubleTap, onPress} = props;
  const scaleAnimation = useMemo(() => new Animated.Value(0), []);
  const [page, setPage] = React.useState(1);
  const scrollX = new Animated.Value(0);
  const refNumTap = useRef(0);
  const timer = useRef<NodeJS.Timeout>();
  const {t} = useTranslation();

  const startScaleView = useCallback(() => {
    Animated.sequence([
      Animated.spring(scaleAnimation, {
        toValue: 1,
        bounciness: 15,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnimation]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageNumber = Math.min(
      Math.max(
        Math.round(e.nativeEvent.contentOffset.x / Spacing.width335) + 1,
        0,
      ),
      file?.length,
    );
    setPage(pageNumber);
  };

  const onDoublePressTap = (item: any) => {
    refNumTap.current += 1;
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (refNumTap.current >= 2) {
      onDoubleTap?.(item);
      startScaleView();
      refNumTap.current = 0;
    }

    timer.current = setTimeout(() => {
      if (refNumTap.current === 1) {
        onPress?.();
        refNumTap.current = 0;
      }
    }, 300);
  };

  const onPressItem = (item: any) => {
    if (!onDoubleTap) {
      onPress?.();
    } else {
      onDoublePressTap(item);
    }
  };

  return (
    <Box>
      <FlatList
        onMomentumScrollEnd={onScrollEnd}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        style={styles.scroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={file}
        scrollEnabled={file?.length > 1}
        pagingEnabled
        nestedScrollEnabled
        renderItem={({item}) => {
          return (
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => onPressItem(item)}
                activeOpacity={1}
              >
                <Box alignItems={'center'} justifyContent="center">
                  <AppImage
                    style={styles.blurImage}
                    uri={item?.name}
                    resizeMode={'cover'}
                  />
                  <Animated.View
                    style={[
                      {
                        transform: [
                          {
                            scale: scaleAnimation,
                          },
                        ],
                      },
                      styles.viewIconLike,
                    ]}
                  >
                    <IconLiked />
                  </Animated.View>
                </Box>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      {file?.length > 1 && (
        <View style={styles.indexImageContainer}>
          {<AppText>{`${page} ${t('common:of')} ${file?.length}`}</AppText>}
        </View>
      )}
      {file?.length > 1 && (
        <Box position="absolute" bottom={Spacing.width16} alignSelf="center">
          <Pagination
            size={file?.length}
            scrollX={scrollX}
            windowWidth={Spacing.width335}
          />
        </Box>
      )}
    </Box>
  );
};
