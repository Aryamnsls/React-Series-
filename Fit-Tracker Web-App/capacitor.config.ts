import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fit.keeper',
  appName: 'fit-keeper',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: [
        'profile',
        'email'
      ],
      serverClientId: '796792034085-p3ut7338emlh34vmt72828ggle6fu5ki.apps.googleusercontent.com',
      iosClientId: '796792034085-0emg47drs3ak44nho0q9drj1215b8lff.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  },
  cordova: {}
};

export default config;
