import {Spacing} from '@theme';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItem, View} from 'react-native';
import {AppText} from '../AppText';
import {styles} from './styles';
interface FlatListHorizontalProps {
  data: {name: string; image: string; id: string}[];
  renderItem: ListRenderItem<any> | null | undefined;
  label?: string;
  isViewMore?: boolean;
  onPressViewMore?: () => void;
}

const FlatlistHorizontal = (props: FlatListHorizontalProps) => {
  const {data, renderItem, isViewMore, label, onPressViewMore} = props;
  const {t} = useTranslation();
  return (
    <>
      {!!label && (
        <View style={[styles.viewText, {marginBottom: Spacing.width15}]}>
          <AppText style={styles.txtLabel}>{label}</AppText>
          {isViewMore && (
            <AppText style={styles.viewMore} onPress={onPressViewMore}>
              {t('common.seeMore')}
            </AppText>
          )}
        </View>
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id || index}`}
      />
    </>
  );
};

export {FlatlistHorizontal};
