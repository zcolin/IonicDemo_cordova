/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-8-21 上午10:39
 * ********************************************************
 */

import {StorageUtil} from "../utils/storage.util";
import {NavController} from "ionic-angular";
import {UserInfo} from "../../models/user-info";

/**
 * 用户相关信息管理类
 */
export class UserService {
    static USER: UserInfo;

    /**
     * 重新登录
     * @param navCtrl
     */
    static reLogin(navCtrl: NavController) {
        navCtrl.setRoot('LoginPage');
        StorageUtil.remove('lx_token');
    }

    /**
     * 登录
     * @param {UserInfo} user
     */
    static login(user: UserInfo) {
        this.USER = user;
        StorageUtil.set('lx_loginname', user.loginname);
        StorageUtil.set('lx_token', user.token);
    }

    /**
     * 获取token
     * @returns {Promise<string | null>}
     */
    static getTokenFromFile(): Promise<string | null> {
        return StorageUtil.get('lx_token');
    }

    /**
     * 获取自动记忆的登录名
     * @returns {Promise<string | null>}
     */
    static getLoginNameFromFile(): Promise<string | null> {
        return StorageUtil.get('lx_loginname');
    }

    /**
     * 获取token
     * @returns {Promise<string | null>}
     */
    static getToken(): string {
        return this.USER ? this.USER.token : null;
    }

    /**
     * 退出登录
     */
    static logout() {
        this.USER = null;
        StorageUtil.remove('lx_token');
    }

    /**
     * 用户是否登录
     * @returns {boolean}
     */
    static isLogin(): boolean {
        return !!this.USER;
    }
}
