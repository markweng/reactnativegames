/**
 * Created by wencgheng on 2017/11/13.
 */

import {Dimensions, Platform}from 'react-native';

export default{



    isIos(){
        return Platform.OS === 'ios';
    },

    getStatusBarHeight() {
        if (this.isIos()) {

            return this.isIphoneX()?44:20;
        } else {
            return 0;
        }
    },
    getIOSNavHeight() {
        if (this.isIos()) {
            return this.isIphoneX()?88:64;
        }
    },
    isIphoneX() {
        const dimen = Dimensions.get('window');
        let iPhoneXScreen = (dimen.height === 812 && dimen.width === 375)
        let iPhoneXMaxScreen = (dimen.height === 896 && dimen.width === 414)
        let iPhoneXRScreen = (dimen.height === 1792/3.0 && dimen.width === 828/3.0)

        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            (iPhoneXScreen||iPhoneXMaxScreen||iPhoneXRScreen)
        );
    },
    isIphone5() {
        const dimen = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            (dimen.height === 568 || dimen.width === 320)
        );
    },
    isIpad() {
        return (
            Platform.OS === 'ios' &&
            Platform.isPad
        );
    },
    getScreenScaleWidth(value) {
        const dimen = Dimensions.get('window');

        return dimen.width * value / 375.0
    },
    getLeverName(index) {
        switch (index) {
            case 1:
                return "一"
            case 2:
                return "二"
            case 3:
                return "三"
            case 4:
                return "四"
            case 5:
                return "五"
            case 6:
                return "六"
            case 7:
                return "七"
            case 8:
                return "八"
        }
    }


}
