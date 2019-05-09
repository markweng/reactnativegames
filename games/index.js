/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class index extends Component {
    static navigationOptions = {
        header: null
        /* No more header config here! */
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.gotoGame(1)}>
                    <View style={styles.saixingxing}>
                        <Text style={styles.text}>HouSaiLei</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.gotoGame(2)}>
                    <View style={styles.lajifenlei}>
                        <Text style={styles.text}>LaJiFenLei</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    gotoGame(index) {
        switch(index) {
            case 1 : {
                this.props.navigation && this.props.navigation.navigate("Housailei")
                break;
            };
            case 2 : {
                this.props.navigation && this.props.navigation.navigate("Lajifenlei")
                break;
            };
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    saixingxing: {
        width: 120,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#EE8155',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lajifenlei: {
        width: 120,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#3BD7B4',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color:'#fff'
    }
});