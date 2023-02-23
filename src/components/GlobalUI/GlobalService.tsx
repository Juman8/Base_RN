import React from 'react';

const globalUIRef = React.createRef<any>();
let numOfTime = 0;
let refTimer: any = null;
const MINIUM_OF_HIDE = 800;

function showLoading() {
  globalUIRef.current?.showLoading();
  refTimer = setInterval(() => {
    numOfTime += 1;
  }, 100);
  setTimeout(() => {
    clearInterval(refTimer);
  }, 800);
}

function hideLoading() {
  clearInterval(refTimer);
  if (numOfTime < MINIUM_OF_HIDE) {
    setTimeout(() => {
      globalUIRef.current?.hideLoading();
    }, MINIUM_OF_HIDE - numOfTime);
  } else {
    globalUIRef.current?.hideLoading();
  }
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
