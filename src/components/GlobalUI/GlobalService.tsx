import React from 'react';

const globalUIRef = React.createRef<any>();

function showLoading() {
  globalUIRef.current?.showLoading();
}

function hideLoading() {
  globalUIRef.current?.hideLoading();
}

function showAlert(values: {
  title?: string;
  message: string;
  onPress?: () => void;
}) {
  globalUIRef.current?.showAlert(values);
}

function hideAlert() {
  globalUIRef.current?.hideAlert();
}

export const GlobalService = {
  showLoading,
  hideLoading,
  globalUIRef,
  showAlert,
  hideAlert,
};
