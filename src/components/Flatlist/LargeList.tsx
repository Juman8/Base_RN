/* eslint-disable @typescript-eslint/no-explicit-any */
import {Spacing, Text, useTheme} from '@theme';
import React, {forwardRef, useEffect} from 'react';
import {
  View,
  RefreshControl,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import {FlashList as FlatList, ListRenderItem} from "@shopify/flash-list";

interface VirtualListProps {
  renderItem: ListRenderItem<any> | null | undefined
  onRefresh?: () => void;
  style?: StyleProp<ViewStyle>;
  data: Array<any>;
  onLoadMore?: () => void;
  isLoading?: boolean;
  emptyText?: string;
  numColumns?: number | undefined;
  scrollEnabled?: boolean;
  horizontal?: boolean;
  onMomentumScrollEnd?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isShort?: boolean;
  onPress?: () => void;
  title?: string;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  rootStyle?: StyleProp<ViewStyle>;
  customViewMore?: StyleProp<ViewStyle>;
  perPage?: number;
  pagingEnabled?: boolean;
  initialScrollIndex?: number;
  onEndReachedThreshold?: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  isOnlyList?: boolean;
  nestedScrollEnabled?: boolean;
}

const RenderContent = ({
  isOnlyList,
  rootStyle,
  isFirst,
  isLoading,
  data,
  children,
}: any) => {
  const {themeColor} = useTheme();

  if (!isOnlyList) {
    return (
      <View style={[styles.contain, rootStyle, {height: 400}]}>
        {isFirst && isLoading && data.length < 1 && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color={themeColor.primary} />
          </View>
        )}
        {children}
      </View>
    );
  }
  return children;
};

const LargeList = React.memo(
  forwardRef((props: VirtualListProps, ref: any) => {
    const {
      rootStyle,
      renderItem,
      onRefresh,
      data = [],
      onLoadMore,
      isLoading,
      isShort,
      perPage = 14,
      pagingEnabled,
      initialScrollIndex,
      onEndReachedThreshold = 0.5,
      emptyText,
      isOnlyList,
      nestedScrollEnabled,
    } = props;
    const [isFirst, setFirst] = React.useState(true);
    const {themeColor} = useTheme();

    useEffect(() => {
      if (isFirst && !isLoading) setFirst(false);
    }, [isFirst, isLoading]);

    const ListHeaderComponent = React.useCallback(() => {
      if (!isLoading && data?.length < 1) {
        return (
          <View style={styles.viewHeader}>
            <Text textAlign="center" color="">
              {emptyText}
            </Text>
          </View>
        );
      }
      return null;
    }, [isLoading, data?.length, emptyText]);

    return (
      <RenderContent
        isOnlyList={isOnlyList}
        rootStyle={rootStyle}
        isFirst={isFirst}
        isLoading={isLoading}
        data={data}
      >
        <FlatList
          ListHeaderComponent={props.ListHeaderComponent || ListHeaderComponent}
          style={[props.style]}
          horizontal={props.horizontal}
          numColumns={props.numColumns}
          scrollEnabled={props.scrollEnabled}
          onMomentumScrollEnd={props.onMomentumScrollEnd}
          data={isShort ? data.slice(0, 5) : data}
          renderItem={renderItem}
          refreshing={isLoading && data.length > 1}
          refreshControl={
            onRefresh && (
              <RefreshControl
                refreshing={false}
                onRefresh={onRefresh}
                tintColor={themeColor.whiteColor}
              />
            )
          }
          onEndReachedThreshold={onEndReachedThreshold}
          onEndReached={onLoadMore}
          keyExtractor={(item: any) => {
            if (typeof (item) === 'string') {
              return item;
            }
            return item.id;
          }}
          ListFooterComponent={
            props.ListFooterComponent ? (
              props.ListFooterComponent
            ) : isShort ? (
              data?.length >= 4 ? null : null // <ViewMore onPress={onPress} customViewMore={customViewMore} />
            ) : data && data?.length > perPage - 1 && isLoading ? (
              <View>
                <ActivityIndicator size={'small'} color={themeColor.primary} />
              </View>
            ) : null
          }
          extraData={props}
          ref={ref}
          // removeClippedSubviews={!isShort}
          decelerationRate={isShort ? 'normal' : 0.6}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled={pagingEnabled}
          initialScrollIndex={initialScrollIndex}
          onScroll={props.onScroll}
          ListEmptyComponent={props.ListEmptyComponent}
          nestedScrollEnabled={nestedScrollEnabled}
          estimatedItemSize={180}

        />
      </RenderContent>
    );
  }),
);

const styles = StyleSheet.create({
  contain: {flex: 1, paddingBottom: 20},
  viewHeader: {
    flex: 1,
    paddingTop: Spacing.height15,
  },
  loading: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export {LargeList};
