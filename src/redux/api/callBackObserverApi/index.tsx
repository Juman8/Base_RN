/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosError, AxiosResponse} from 'axios';
import {Observable} from 'rxjs';
import {axiosApi} from '../api';

let arrQueue: {key: string; configCall: any}[] = [];

class apiCustomize {
  static callApi = (key: 'get' | 'post' | 'delete', ...args: any[]) => {
    const urlCall = args[0];
    const indexCurrentCall = arrQueue.findIndex(el => el.key === urlCall);
    if (indexCurrentCall >= 0) {
      arrQueue[indexCurrentCall].configCall.unsubscribe();
      arrQueue = arrQueue.filter(el => el.key !== urlCall);
    }
    const subscriber = new Observable(sub =>
      axiosApi
        // eslint-disable-next-line prettier/prettier
        .getApi()[key](...args)
        .then((response: AxiosResponse) => {
          sub.next(response);
          sub.complete();
        })
        .catch((error: AxiosError) => sub.error(error)),
    );

    const _subscribe = subscriber.subscribe.bind(subscriber);
    const index = arrQueue.findIndex(el => el.key === urlCall);
    if (index >= 0) {
      arrQueue[index].configCall?.unsubscribe();
      arrQueue = arrQueue.filter(el => el.key !== urlCall);
    }
    subscriber.subscribe = (...args2: any[]) => {
      const subscription = _subscribe(...args2);

      arrQueue.push({
        key: urlCall,
        configCall: subscription,
      });
      const _unsubscribe = subscription.unsubscribe.bind(subscription);
      subscription.unsubscribe = () => {
        arrQueue = arrQueue.filter(el => el.key !== urlCall);
        _unsubscribe();
      };
      return subscription;
    };

    return subscriber;
  };
}

export {apiCustomize};
