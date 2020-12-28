import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';


const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }) {
  return(
      <MenuNavigator.Navigator
          initialRouteName='Menu'
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                  color: "#fff"            
              }
          }}
      >
          <MenuNavigator.Screen
              name="Menu"
              component={Menu}
          />
          <MenuNavigator.Screen
              name="Dishdetail"
              component={Dishdetail}
              options={{ headerTitle: "Dish Detail"}}
          />            
      </MenuNavigator.Navigator>
  );
}


class Main extends Component {
    
    render() { 
        return (  
          <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <NavigationContainer>
              <MenuNavigatorScreen />
            </NavigationContainer>
          </View>
          
        );
  }
}
  
export default Main;