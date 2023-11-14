import {apiCustomize} from '@redux';

const apiCustomev2 = (url: string) => {
  const response = apiCustomize.callApi('get', url).subscribe(v => {
    console.log(v);
  });
};
