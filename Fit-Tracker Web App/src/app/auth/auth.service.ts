import {Injectable, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import {
  Auth, GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signInWithPopup,
  signOut
} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: Auth,
              private afAuth: AngularFireAuth,
              private platform: Platform) {
    this.platform.ready().then(() => {
      Plugins.GoogleAuth.initialize();
    });
  }

  async authWithGoogle() {
    try {
      if (this.platform.is('mobile')) {
        const googleUser = await Plugins.GoogleAuth.signIn();
        const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);
        return await this.afAuth.signInAndRetrieveDataWithCredential(credential);
      } else {
        return await signInWithPopup(this.auth, new GoogleAuthProvider());
      }
    } catch (e) {
      throw new Error(e);
      return null;
    }
  }

  async register({email, password}) {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (e) {
      return null;
    }
  }

  async login({email, password}) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (e) {
      return null;
    }
  }

  async logout() {
    return await signOut(this.auth);
  }
}
