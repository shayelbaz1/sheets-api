import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-easy-icon';
import { AppStackParamList } from 'src/navigators/AppStack';
import { HomePage } from 'src/pages/Home';
import { Pie } from 'src/pages/Pie';
import { SettingsPage } from 'src/pages/Settings';
import { useTheme } from 'styled-components';

const { Navigator, Screen } = createBottomTabNavigator<MainBottomTabParamList>();

export type MainBottomTabParamList = {
  home: undefined;
  pie: undefined;
  settings: undefined;
};

export type MainBottomTabNavigationProp<RouteName extends keyof MainBottomTabParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<MainBottomTabParamList, RouteName>,
    NativeStackNavigationProp<AppStackParamList>
  >;

export type MainBottomTabNavigations = {
  [RouteName in keyof MainBottomTabParamList]: MainBottomTabNavigationProp<RouteName>;
};

export type MainBottomTabRoutes = {
  [RouteName in keyof MainBottomTabParamList]: RouteProp<MainBottomTabParamList, RouteName>;
};

export function LogoTitle() {
  const theme = useTheme();
  return (
    <View style={{ height: 55, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 15, backgroundColor: theme.colors.background }}>
      <Image
        style={{ width: 50, height: 50, backgroundColor: theme.colors.background }}
        source={require('../../assets/sheets.png')}
      />
      <Text style={{ fontWeight: 'bold', color: theme.colors.text }}>Google Sheets API</Text>
    </View>
  );
}

export const MainBottomTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.background,
        },
      }}
    >
      <Screen
        name="home"
        component={HomePage}
        options={{
          header: () => <LogoTitle />,
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => (
            <Icon type="antdesign" name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="pie"
        component={Pie}
        options={{
          headerShown: true,
          headerTitle: t('Pie'),
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.background},
          tabBarLabel: t('Pie'),
          tabBarIcon: ({ color, size }) => (
            <Icon type="feather" name="pie-chart" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="settings"
        component={SettingsPage}
        options={{
          headerShown: true,
          headerTitle: t('Settings'),
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.background},
          tabBarLabel: t('settings'),
          tabBarIcon: ({ color, size }) => (
            <Icon type="antdesign" name="setting" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
