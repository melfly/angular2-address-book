///*
// * Angular bootstraping
// */
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
////import { decorateModuleRef } from './app/environment';
////import { bootloader } from '@angularclass/hmr';
///*
// * App Module
// * our top level module that holds all of our components
// */
//import { ReezeModule } from './reeze';
//
//
///*
// * Bootstrap our Angular app with a top level NgModule
// */
//export function main(): Promise<any> {
//  return platformBrowserDynamic()
//    .bootstrapModule(ReezeModule)
//    .then(sucess => console.log('App started.'))
//    .catch(err => console.error(err));
//}
//
//// needed for hmr
//// in prod this is replace for document ready
//bootloader(main);
//# sourceMappingURL=main.browser.js.map