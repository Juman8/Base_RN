// import {en} from '@translations';
// import 'i18next';

// // resources.ts file is generated with `npm run toc`

// declare module 'i18next' {
//   interface CustomTypeOptions {
//     defaultNS: 'common';
//     resources: typeof en;
//   }
// }

import {resources} from '@translations';
import 'i18next';

// before v13.0.0 -> declare module 'react-i18next'
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: (typeof resources)['en'];
  }
}
