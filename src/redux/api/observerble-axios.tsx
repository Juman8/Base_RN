/* eslint-disable @typescript-eslint/no-explicit-any */
import {Observable} from 'rxjs';
import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  CancelTokenSource,
  AxiosResponse,
} from 'axios';

export type AxiosObservable<T> = Observable<AxiosResponse<T>>;

let arrQueue: {key: string; configCall: any}[] = [];

export function createObservable<T>(
  promiseFactory: (...args: any[]) => AxiosPromise<T>,
  ...args: any[]
): AxiosObservable<T> {
  let config: AxiosRequestConfig = args[args.length - 1];
  config = config ? {...config} : {};
  args[args.length - 1] = config;
  const urlCall = args[0];

  let cancelSource: CancelTokenSource;
  const hasCancelToken = !!config.cancelToken;
  if (hasCancelToken) {
    console.warn(
      'No need to use cancel token, just unsubscribe the subscription would cancel the http request automatically',
    );
  }

  const observable: AxiosObservable<T> = new Observable((subscriber: any) => {
    if (!hasCancelToken) {
      cancelSource = axios.CancelToken.source();
      config.cancelToken = cancelSource.token;
    }

    setTimeout(() => {
      promiseFactory(...args)
        .then(response => {
          subscriber.next(response);
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    }, 1000);
  });

  const _subscribe = observable.subscribe.bind(observable);
  const index = arrQueue.findIndex(el => el.key === urlCall);
  if (index >= 0) {
    arrQueue[index].configCall?.unsubscribe();
    removeQueue(urlCall);
  }
  observable.subscribe = (...args2: any[]) => {
    const subscription = _subscribe(...args2);

    arrQueue.push({
      key: urlCall,
      configCall: subscription,
    });
    const _unsubscribe = subscription.unsubscribe.bind(subscription);
    subscription.unsubscribe = () => {
      if (cancelSource) {
        cancelSource.cancel();
      }
      removeQueue(urlCall);
      _unsubscribe();
    };
    return subscription;
  };

  return observable;
}

const removeQueue = (urlCall: string) => {
  arrQueue = arrQueue.filter((el: any) => el.key !== urlCall);
};
