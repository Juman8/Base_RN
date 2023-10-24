// import {en} from '@translations';
// import 'i18next';

// // resources.ts file is generated with `npm run toc`

// declare module 'i18next' {
//   interface CustomTypeOptions {
//     defaultNS: 'common';
//     resources: typeof en;
//   }
// }

import {resources, defaultNS} from './i18n';
import 'i18next';

// before v13.0.0 -> declare module 'react-i18next'
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
