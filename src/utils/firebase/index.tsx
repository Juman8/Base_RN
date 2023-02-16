import firestore from '@react-native-firebase/firestore';

const COLLECTION_FOR_MINT = "Mint";

type dataContent = {
  spO2_before_am: number;
  pulse_before_pm: number;

  spO2_after_am_1h: number;
  spO2_after_am_2h: number;
  spO2_after_pm_1h: number;
  spO2_after_pm_2h: number;

  pulse_after_am_1h: number;
  pulse_after_am_2h: number;
  pulse_after_pm_1h: number;
  pulse_after_pm_2h: number;

  heart_data_dateTime: number;
};

export type dataHeath = {
  data: dataContent[];
};

class FirebaseSvc {
  public referentCollectionMint: any = null;
  constructor() {
    this.referentCollectionMint = firestore().collection(COLLECTION_FOR_MINT);
  }

  public getListDataOfHealth(callback: (value: dataHeath) => void) {
    return this.referentCollectionMint
      .onSnapshot((querySnapShot: any) => {
        const dataHeath: any = [];
        querySnapShot.docs.map((doc: any) => {
          if (doc.data().is_chatting) {
            dataHeath.push({...doc.data()});
          }
        });
        callback(dataHeath);
      });
  }

  public onUpdateDataHeath(data: dataContent, idDocument: number) {
    return this.referentCollectionMint.doc(idDocument).update({
      ...data,
    });
  }

  public onAddDataHeath(data: dataContent) {
    return this.referentCollectionMint.add({
      ...data,
    });
  }

}

const firebaseSvc = new FirebaseSvc();

export {firebaseSvc};
