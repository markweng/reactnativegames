/**
 * Created by wengcheng on 2018/11/27 .
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const close = require("../res/drawable/close_modal_img.png")
const hbzsimg = require("../res/drawable/hbzs_modal.png")

import DataSource from '../common/DataSource';
import Utils from '../common/Utils';

export default class HBZSModal extends Component {

    constructor(props) {
        super(props)
        let date = new Date();

        var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
        var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
        let dateStr = date.getFullYear() + "." + month + "." + strDate
        this.state = {
            visible: false,
            rightNum:0,
            rightValue:0,
            currentDate:dateStr
        }
     
    }
   componentWillMount() {
    AsyncStorage.getItem("score",(error,value)=>{
        if(value) {
             let json = JSON.parse(value)
             let anum = (json.rightNum / json.totalNum) * 100 
             anum = anum.toFixed(2)
             this.setState({
                rightNum: json.rightNum,
                rightValue: anum + "%",
             })

        }
    })
   }
    show() {
        AsyncStorage.getItem("score",(error,value)=>{
            if(value) {
                 let json = JSON.parse(value)
                 let anum = (json.rightNum / json.totalNum) * 100 
                 anum = anum.toFixed(2)
                 this.setState({
                    rightNum: json.rightNum,
                    rightValue: anum + "%",
                    visible: true
                 })
    
            } else {
                this.setState({
                    visible: true
                 })
            }
        })
    }

    hide() {
        this.setState({
            visible: false
        })
    }

    render() {

        return (
            <Modal style={{ flex: 1 }}
                visible={this.state.visible}
                transparent={true}
                animationType={'fade'}>
                <View style={styles.container}>
                    <View style={{ backgroundColor: '#3BD7B4', width: DataSource.width - Utils.getScreenScaleWidth(108), alignItems: 'center', borderRadius: 4 ,paddingLeft:20,paddingRight:20,paddingBottom:20}}>
                       <Image style={{width:Utils.getScreenScaleWidth(349),height:Utils.getScreenScaleWidth(95)}} source={hbzsimg}/>

                        <View style={{alignItems:'stretch'}}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: "500"}}>亲爱的用户</Text>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: "500", marginTop: 33 ,lineHeight:20}}>{this.state.rightNum > 0?("恭喜您在垃圾分类学习中，总计分对了"+ this.state.rightNum +"种垃圾，正确率"+ this.state.rightValue+"！") : "环保成绩计算中，请先答题吧!"}</Text>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: "500", marginTop: 84 ,textAlign:'right'}}>{this.state.currentDate}</Text>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => {
                        this.hide()
                    }}>
                        <Image style={{
                            width: Utils.getScreenScaleWidth(40),
                            height: Utils.getScreenScaleWidth(40),
                            marginTop: Utils.getScreenScaleWidth(40)
                        }} source={close} /></TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
