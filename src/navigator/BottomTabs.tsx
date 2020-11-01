import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Account from '@/pages/Account';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import {RouteProp, TabNavigationState} from '@react-navigation/native';
import {RootStackParamList, RootStackNavigation} from '@/navigator/index';
import IconFont from '@/assets/iconfont';
import HomeTabs from './HomeTabs';

export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState<BottomTabParamList>;
};

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

function getHeaderTitle(route: Route) {
  const routeName = route.state?.routeNames[route.state.index] || 'Home';
  switch (routeName) {
    case 'HomeTabs':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '我的';
    default:
      return '首页';
  }
}

export class BottomTabs extends Component<IProps> {
  componentDidUpdate() {
    const {navigation, route} = this.props;
    getHeaderTitle(route);
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
    });
  }
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({color, size}) => (
              <IconFont name="icon-shouye" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Listen"
          component={Listen}
          options={{
            tabBarLabel: '我听',
            tabBarIcon: ({color, size}) => (
              <IconFont name="icon-shoucang" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Found"
          component={Found}
          options={{
            tabBarLabel: '发现',
            tabBarIcon: ({color, size}) => (
              <IconFont name="icon-faxian" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({color, size}) => (
              <IconFont name="icon-user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabs;
