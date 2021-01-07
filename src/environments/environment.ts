// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// 0b0ba0fd-9f37-4d32-97f7-6d89c5775137; note-app
export const environment = {
  production: false,
  // remote
  clientId: "6ccb8af7-4ab4-484e-8b93-e67262e0d288",
  authority: "https://a-ci.labshare.org/_api/auth/ls",
  service: "https://local.mylocal.org:4200"
  // local
  // clientId: "note-app",
  // authority: "https://local.mylocal.org:4200/_api/auth/ls",
  // service: "https://local.mylocal.org:4200"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
