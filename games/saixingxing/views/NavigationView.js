/**
 * Created by wengcheng on 2018/11/27 .
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import DataSource from "../common/DataSource";
import Utils from "../common/Utils";

const icon = require('../res/drawable/back_left.png')

export default class NavigationView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', fontSize: 24, color: '#4A4A4A'}}>{this.props.title}</Text>
                <TouchableOpacity style={styles.leftitem} onPress={()=>{
                    this.props.navigation && this.props.navigation.goBack()
                    this.props.goBack && this.props.goBack()
                }}>
                    <View style={styles.leftitem}>
                        <Image style={{width: 12, height: 20}} source={icon}/>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: DataSource.width,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Utils.getStatusBarHeight() + 18
    },
    leftitem: {
        position: 'absolute',
        left: 14,
        paddingRight: 10,
        height: 20,
        width: 32
    }
});
