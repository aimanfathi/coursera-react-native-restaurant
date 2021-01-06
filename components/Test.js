import React, { Component } from 'react';
import { SafeAreaView , View , Text , StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { Loading } from './LoadingComponent';



function screen1 ({navigation}){
    return(
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate('Call')}>Home</Text>
        </View>
    );
}

function screen2 ({navigation}){
    return(
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate('Mail')}>Call</Text>
            <Loading />
        </View>
    );
}

function screen3 ({navigation}){
    return(
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate('Home')}>Mail</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

class Test extends Component {
    render() {
        return(
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: 'red',
                        inactiveTintColor: 'grey'
                    }}
                >
                    <Tab.Screen 
                        name="Home" component={screen1} 
                        options={{
                            tabBarIcon: ({focused, color, size}) => {
                                return(
                                    <Icon 
                                        type='fontawesome' 
                                        name='home'
                                        color={color}
                                    />
                                )
                            }
                        }}
                    />
                    <Tab.Screen 
                        name="Call" component={screen2} 
                        options={{
                            tabBarIcon: ({focused, color, size}) => {
                                return(
                                    <Icon 
                                        type='fontawesome' 
                                        name='phone'
                                        color={color}
                                    />
                                )
                            }
                        }}
                    />
                    <Tab.Screen 
                        name="Mail" component={screen3}
                        options={{
                            tabBarIcon: ({focused, color, size}) => {
                                return(
                                    <Icon 
                                        type='fontawesome' 
                                        name='mail'
                                        color={color}
                                    />
                                )
                            }
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Test;