/**
 * Created by wengcheng on 2018/12/28 .
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,

} from 'react-native';
import Utils from "../common/Utils";
import DataSource from "../common/DataSource";
import NavigationView from "../views/NavigationView";
// import ToastShow from "../../../common/utils/ToastShow";
const locked_icon = require('../res/drawable/locked_icon.png')

const icon = require('../res/drawable/selected_orange.png')

export default class SelectShapeLevelScreen extends Component {
    static navigationOptions = {
        header: null
        /* No more header config here! */
    };

    constructor(props) {
        super(props)
        this.state = {
            selectIndex: 1,
            levels: [0, 0, 0, 0, 0, 0],
            levelNum: 0,
            averageTime: 0,
            gradeNum: 0,
            isPass: false

        }
        this.refreshData()
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationView title={'图形模式'} navigation={this.props.navigation}/>
                <ScrollView style={{marginTop: 20}}>
                    {this.state.levels.map((data, index) => {
                        return <TouchableOpacity key={index + ''} onPress={this.didSelectedRow.bind(this, index)}>
                            <View style={[styles.levelRow, {height: 74}]}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 43}}>
                                    <Text style={{
                                        color: '#4A4A4A',
                                        fontWeight: 'bold',
                                        fontSize: 18
                                    }}>{"第" + Utils.getLeverName(index + 1) + "关"}</Text>
                                    {data && parseFloat(data) > 0 ?
                                        <Image style={{width: 33, height: 23, marginLeft: 9}} source={icon}/> : null}
                                </View>
                                {data && parseFloat(data) == -1 ? null : ( data && parseFloat(data) > 0 ? <Text style={{
                                    color: '#EE8155',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    marginRight: 17
                                }}>{data + 's'}</Text> : <Image style={{width: 22, height: 17,marginRight:24}} source={locked_icon}/>)}
                            </View>
                        </TouchableOpacity>
                    })}
                </ScrollView>
            </View>
        );
    }

    refreshData() {


        let promises = [1, 2, 3, 4, 5, 6].map((item, index) => {
            return this.getData(item);
        });

        Promise.all(promises).then((allData) => {
            let temp = -1
            allData.map((data,index)=>{
                if (temp<0 && !data) {
                    temp = index
                }
            })
            let levesArr = allData
            levesArr[temp] = "-1"
            this.setState({levels: allData})

        }).catch((err) => {
            console.log(err);
        })
    }


    getData(level) {

        return new Promise((resolve, reject) => {
            DataSource.getBestScores(level + "shape", (err, value) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(value)
                }
            })
        });
    }

    didSelectedRow(index) {

        let data = this.state.levels[index]
        if (!data) {
            // ToastShow.show("只有通过上一关，才能开始下一关哟！",ToastShow.SHORT)
            return
        }

        this.props.navigation && this.props.navigation.navigate('ShapeGameScreen', {
            level: index + 1,
            callback: (() => {
                this.refreshData()
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EECC'
    },
    tab: {
        width: DataSource.width - 34,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Utils.getScreenScaleWidth(20),
        marginLeft: 17
    },
    levelRow: {
        width: DataSource.width - 34,
        marginLeft: 17,
        marginBottom: 16,
        backgroundColor: '#FAF3E5',
        borderRadius: 4,
        borderColor: '#D6CEB3',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
