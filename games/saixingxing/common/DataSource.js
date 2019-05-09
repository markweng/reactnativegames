import {
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default {

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    getBestScores(grade, callback) {

        AsyncStorage.getItem(grade + '', (error, item) => {
            callback && callback(error, item ? item : null)
        })
    },
    setBestScores(grade, scores, callback) {

        AsyncStorage.setItem(grade + '', scores, () => {
            callback && callback()
        })
    },
    getLevelBest(grade, level, callback) {

        this.getBestScores(grade, (error, item) => {

            if (!item) {
                return
            }
            if (item && item.length > 0) {

                let arr = JSON.parse(value).data
                let bestScores = arr[this.level - 1]
                if (arr.length >= level) {
                    callback && callback(bestScores)
                }
            }

        })

    },
    getPassNumber(callback) {

     AsyncStorage.getItem('passNumber',(err,value)=>{
         callback && callback(value)
     })

    },
    setPassNumber(number,callback) {
        AsyncStorage.setItem('passNumber',number+'',()=>{
            callback && callback()
        })
    }

}
