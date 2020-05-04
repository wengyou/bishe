import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Grid, Icon } from '@ant-design/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../home/home';
import Mine from '../mine/mine';
import Detail from '../dedtail/detail';
import Search from '../search/search';

const BottomNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: '首页',
            tabBarLabel: '首页',
            tabBarOptions: {
                labelStyle: {
                  fontSize: 14,
                },
              },
              tabBarIcon:({tintColor,focused})=>(<Ionicons
                name={"md-paper"}
                size={20}
                style={{color:tintColor}}
             />)
        },
    }, 
    Search: {
        screen: Search,
        navigationOptions: {
            title: '搜索',
            tabBarLabel: '搜索',
            tabBarOptions: {
                labelStyle: {
                  fontSize: 14,
                },
              },
            tabBarIcon:({tintColor,focused})=>(<Ionicons
            name={'md-search'} // 全部小写
            size={20}
            style={{color:tintColor}}
            />)
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            title: '我的',
            tabBarLabel: '我的',
            tabBarOptions: {
                labelStyle: {
                  fontSize: 14,
                },
              },
            tabBarIcon:({tintColor,focused})=>(<Ionicons
            name={'md-person-add'} // 全部小写
            size={20}
            style={{color:tintColor}}
            />)
        }
    }
})

export default BottomNavigator;