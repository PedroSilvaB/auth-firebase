import firebase from 'firebase/index';

export type User = firebase.User
export type UserInfo = firebase.UserInfo

export interface UpdateProfile {
    displayName?: string
    photoURL?:string
}
