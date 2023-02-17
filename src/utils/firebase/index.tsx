import firestore from '@react-native-firebase/firestore';
import {LogApp, showAlertMessage} from '@utils';

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

  created: number;
};


class FirebaseSvc {
  public referentCollectionMint: any = null;
  constructor() {
    this.referentCollectionMint = firestore().collection(COLLECTION_FOR_MINT);
  }

  public getListDataOfHealth(callback: (value: dataHealthContent[]) => void) {
    return this.referentCollectionMint
      .onSnapshot((querySnapShot: any) => {
        const dataHeath: any = [];
        querySnapShot.docs.map((doc: any) => {
          if (doc.data()) {
            dataHeath.push({...doc.data()});
          }
        });
        callback(dataHeath);
      });
  }

  public onHandleDataChange = (
    callback: (value: dataHealthContent) => void,
  ) => {
    return this.referentCollectionMint
      .orderBy('created', 'desc')
      .limit(1)
      .onSnapshot(
        (snapshot: any) => {
          snapshot?.docChanges().forEach(function (change: any) {
            const data = change.doc.data();
            if (change.type === 'added') {
              callback(data);
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
    return this.referentCollectionMint.add({
      ...data,
    }).then((dataP: {id: string;}) => {
      callBack(dataP.id);
    }).catch(function () {
      showAlertMessage('Lỗi khi thêm dữ liệu, vui lòng thử lại', 'warning');
    });
  }

}

const firebaseSvc = new FirebaseSvc();

export {firebaseSvc};
