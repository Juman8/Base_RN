import {GlobalService} from '@components';
import {goBack} from '@navigation';
import firestore from '@react-native-firebase/firestore';
import {LogApp, showAlertMessage} from '@utils';
import dayjs from 'dayjs';
const COLLECTION_FOR_MINT = "Mint";

export type dataHealthContent = {
  id?: string;

  // SPO2
  // >AM<
  spO2_before_am: string;
  spO2_after_am_1h: string;
  spO2_after_am_2h: string;

  // >PM<
  spO2_before_pm: string;
  spO2_after_pm_1h: string;
  spO2_after_pm_2h: string;

  // PULSE
  // >AM<
  pulse_before_am: string;
  pulse_after_am_1h: string;
  pulse_after_am_2h: string;

  // >PM<
  pulse_before_pm: string;
  pulse_after_pm_1h: string;
  pulse_after_pm_2h: string;

  created: string;
};


class FirebaseSvc {
  public referentCollectionMint: any = null;
  constructor() {
    this.referentCollectionMint = firestore().collection(COLLECTION_FOR_MINT);
  }

  public getListDataOfHealth(callback: (value: dataHealthContent[]) => void, dateFilter: string) {
    const month = dateFilter.split('/')[0];
    const year = dateFilter.split('/')[1];
    const time_1 = dayjs(`01/${month}/${year} 00:01`, 'DD/MM/YYYY HH:mm').valueOf();
    const time_2 = dayjs(`31/${month}/${year} 23:59`, 'DD/MM/YYYY HH:mm').valueOf();

    return this.referentCollectionMint
      .orderBy('created', 'asc')
      .where('created', '>=', time_1)
      .where('created', '<=', time_2)
      .onSnapshot((querySnapShot: any) => {
        const dataHeath: any = [];
        querySnapShot.docs.map((doc: any) => {
          if (doc.data()) {
            dataHeath.push({
              ...doc.data(),
              id: doc.id
            });
          }
        });
        callback(dataHeath);
      });
  }

  public onHandleDataChange = (
    callback: (value: dataHealthContent) => void, dateFilter: string
  ) => {
    const month = dateFilter.split('/')[0];
    const year = dateFilter.split('/')[1];
    const time_1 = dayjs(`01/${month}/${year} 00:01`, 'DD/MM/YYYY HH:mm').valueOf();
    const time_2 = dayjs(`31/${month}/${year} 23:59`, 'DD/MM/YYYY HH:mm').valueOf();

    return this.referentCollectionMint
      .orderBy('created', 'desc')
      .where('created', '>=', time_1)
      .where('created', '<=', time_2)
      .limit(1)
      .onSnapshot(
        (snapshot: any) => {
          snapshot?.docChanges().forEach(function (change: any) {
            const data = change.doc.data();
            if (change.type === 'added') {
              callback({
                ...data,
                id: change.doc.id
              });
            } else if (change.type === 'modified') {
              callback(data);
            }
          });
        },
        (err: any) => {
          LogApp({err});
        },
      );
  };

  public onUpdateDataHeath(data: dataHealthContent, idDocument: string) {
    return this.referentCollectionMint.doc(idDocument).update({
      ...data,
    });
  }

  public onAddDataHeath(data: dataHealthContent, callBack: (id: string) => void) {
    const newRes = {
      ...data,
      created: dayjs(data.created).valueOf(),
    };
    return this.referentCollectionMint.add(newRes).then((dataP: {id: string;}) => {
      GlobalService.hideLoading();
      callBack(dataP.id);
      goBack();
    }).catch(function () {
      GlobalService.hideLoading();
      showAlertMessage('Lỗi khi thêm dữ liệu, vui lòng thử lại', 'warning');
      goBack();
    });
  }

  public onGetDataToday(callBack: (data: any) => void) {
    const dayToDay = dayjs().format('DD');
    const MonthToDay = dayjs().format('MM');
    const YearToDay = dayjs().format('YYYY');

    const time_1 = dayjs(`${dayToDay}/${MonthToDay}/${YearToDay} 00:00`, 'DD/MM/YYYY HH:mm').valueOf();
    const time_2 = dayjs(`${dayToDay}/${MonthToDay}/${YearToDay} 23:59`, 'DD/MM/YYYY HH:mm').valueOf();

    return this.referentCollectionMint
      .where('created', '>=', time_1)
      .where('created', '<=', time_2)
      .onSnapshot(
        (snapshot: any) => {
          console.log({snapshot, time_1, time_2});
          snapshot?.docChanges().forEach(function (change: any) {
            const data = change.doc.data();
            callBack({
              ...data,
              id: change.doc.id
            });
          });
        },
        (err: any) => {
          LogApp({err});
        },
      );
  }

  public onGetDataTodayNotEvent(callBack: (data: any) => void) {
    GlobalService.showLoading();
    const dayToDay = dayjs().format('DD');
    const MonthToDay = dayjs().format('MM');
    const YearToDay = dayjs().format('YYYY');

    const time_1 = dayjs(`${dayToDay}/${MonthToDay}/${YearToDay} 00:01`, 'DD/MM/YYYY HH:mm').valueOf();
    const time_2 = dayjs(`${dayToDay}/${MonthToDay}/${YearToDay} 23:59`, 'DD/MM/YYYY HH:mm').valueOf();


    return this.referentCollectionMint
      .where('created', '>=', time_1)
      .where('created', '<=', time_2)
      .onSnapshot((querySnapShot: any) => {
        const dataHeath: any = [];
        querySnapShot.docs.map((doc: any) => {
          if (doc.data()) {
            dataHeath.push({
              ...doc.data(),
              id: doc.id
            });
          }
        });
        GlobalService.hideLoading();
        callBack(dataHeath[0]);
      },
        (err: any) => {
          GlobalService.hideLoading();
          LogApp({err});
        }
      );
  }
}

const firebaseSvc = new FirebaseSvc();

export {firebaseSvc};
