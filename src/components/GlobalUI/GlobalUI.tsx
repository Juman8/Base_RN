import React, {useImperativeHandle, useState} from 'react';
import {Loading} from './Loading';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppText} from '../AppText';
import {Box, Colors, deviceWidth, Spacing} from '@theme';
import {AppButton} from '../AppButton';
import {t} from 'i18next';

type optionsType = {
  isAlert?: boolean;
  title?: string;
  message?: string;
  onPress?: () => void;

}

export const GlobalUI = React.forwardRef((props, ref) => {
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<optionsType>({isAlert: false});
  const {isAlert, title, message, onPress} = options;

  useImperativeHandle(
    ref,
    () => ({
      showLoading,
      hideLoading,
      showAlert,
      hideAlert,
    }),
    [],
  );

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const showAlert = (values: {
    title?: string;
    message: string;
    onPress?: () => void;
  }) => {
    setOptions({
      isAlert: true,
      ...values,
    });
  };
  const hideAlert = () => {
    setOptions({
      isAlert: false,
    });
  };

  if (isAlert) {
    return (
      <Modal isVisible={true} style={styles.styleMargin}>
        <TouchableOpacity style={styles.btn} activeOpacity={1}>
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <AppText style={styles.title}>{title || t('common.btnNotification')}</AppText>
            <AppText style={styles.message}>{message}</AppText>
            <Box flexDirection="row" justifyContent="space-between">
              <AppButton
                label={onPress ? t('common.btnCancel') : t('common.btnConfirm')}
                style={[
                  styles.btnCancel,
                  !!onPress && {backgroundColor: Colors.gray},
                ]}
                onPress={() => {
                  setOptions({
                    isAlert: false,
                  });
                }}
              />
              {!!onPress && (
                <AppButton
                  label={t('common.btnConfirm')}
                  style={styles.btn2}
                  onPress={() => {
                    onPress?.();
                    setOptions({
                      isAlert: false,
                    });
                  }}
                />
              )}
            </Box>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  return (
    <>
      <Loading isLoading={isLoading} />
    </>
  );
});

const styles = StyleSheet.create({
  title: {textAlign: 'center', fontSize: 18, fontWeight: '500', color: '#000'},
  message: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    marginTop: Spacing.width20 / 2,
    marginBottom: Spacing.width20,
    color: '#000',
  },
  container: {
    padding: Spacing.width20,
    backgroundColor: 'white',
    width: deviceWidth - Spacing.width40,
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  btn: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  btnCancel: {flex: 1, marginRight: Spacing.width20},
  styleMargin: {margin: 0},
  btn2: {flex: 1},
});

export default GlobalUI;
