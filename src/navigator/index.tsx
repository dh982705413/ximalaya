import React, {Component} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from '@/navigator/BottomTabs';
import Detail from './../pages/Detail';
import {Platform, StatusBar, StyleSheet} from 'react-native';
export type RootStackParamList = {
  BottomTabs: undefined;
  Detail: {
    id: number;
  };
};
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;
let Stack = createStackNavigator<RootStackParamList>();
class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerStatusBarHeight: StatusBar.currentHeight,
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              }),
            },
          }}>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{headerTitle: '首页'}}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{headerTitle: '详情'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
