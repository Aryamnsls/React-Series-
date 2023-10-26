import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { Preferences } from '@capacitor/preferences';
import { Subject } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {WeightTrackingService} from '../home/weight-tracker/weight-tracking.service';
import {user} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | null;
  userLogged: boolean;
  userLoggedStatus: Subject<boolean> = new Subject<boolean>();
  uid: string;
  private userStorageKey = 'USER';
  private uidKey = 'uid';

  constructor(public database: AngularFirestore) {
    this.fetchUser().then(async fetchedUser => {
      this.user = fetchedUser;
      this.uid = await this.fetchUID();

      if (!(window.location.href.indexOf('setup') > -1 || window.location.href.indexOf('auth') > -1)) {
        this.userLogged = !!this.user;
        this.userLoggedStatus.next(this.userLogged);
      }
    });
  }

  fetchUserFromDatabase() {
    return this.database.collection('users').doc(this.uid).valueChanges();
  }

  fetchMealHistoryFromDatabase() {
    return this.database.collection('mealHistory').doc(this.uid).valueChanges();
  }

  fetchWeightProgressFromDatabase() {
    return this.database.collection('weightProgress').doc(this.uid).valueChanges();
  }

  async setUID(uid: string) {
    this.uid = uid;
    await Preferences.set({key: this.uidKey, value: uid});
  }

  async fetchUID() {
    const {value} = await Preferences.get({key: this.uidKey});
    return value;
  }

  async createUser(userData: IUser, save = true) {
    await Preferences.set({
      key: this.userStorageKey,
      value: JSON.stringify(userData)
    });

    this.user = userData;

    if (save) {
      console.log(this.uid);
      await this.database.collection('users').doc(this.uid).set(Object.assign({}, this.user));
    }
  }

  async fetchUser(): Promise<IUser> {
    const {value} = await Preferences.get({key: this.userStorageKey});

    return JSON.parse(value);
  }

  async updateUser(field: string, value: string | number) {
    this.user = await this.fetchUser();

    this.user[field] = value;
    await Preferences.set({key: this.userStorageKey, value: JSON.stringify(this.user)});

    await this.updateUserDB();
  }

  async resetUser(): Promise<void> {
    this.user = null;
    await Preferences.remove({key: this.userStorageKey});
  }

  async updateUserDB() {
    await this.database.collection('users').doc(this.uid).set(Object.assign({}, this.user));
  }

  async initUserDB() {
    await this.updateUserDB();
  }
}
