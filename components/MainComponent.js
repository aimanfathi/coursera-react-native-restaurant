import React, { Component } from 'react';
import Home from './HomeComponent';
import { View, Platform , Image , StyleSheet , Text } from 'react-native';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator , DrawerContentScrollView , DrawerItemList  } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes , fetchComments , fetchPromos , fetchLeaders } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
    }
}


const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
});

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
              },
          }}
      >
          <MenuNavigator.Screen
              name="Menu"
              component={Menu}
              options={{
                headerLeft: ({ navigation }) => (
                    <Icon name='menu' size={24} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                ),
              }} 
          />
          <MenuNavigator.Screen
              name="Dishdetail"
              component={Dishdetail}
              options={{ headerTitle: "Dish Detail"}}
          />            
      </MenuNavigator.Navigator>
  );
}


const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }) {
  return(
      <HomeNavigator.Navigator
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
          <HomeNavigator.Screen
              name="Home"
              component={Home}
              options={{
                headerLeft: ({ navigation }) => (
                    <Icon name='menu' size={24} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                ),
              }} 
          />        
      </HomeNavigator.Navigator>
  );
}


const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen({ navigation }) {
  return(
      <ContactNavigator.Navigator
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
          <ContactNavigator.Screen
              name="Contact"
              component={Contact}
              options={{
                headerLeft: ({ navigation }) => (
                    <Icon name='menu' size={24} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                ),
              }} 
          />        
      </ContactNavigator.Navigator>
  );
}


const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen({ navigation }) {
  return(
      <AboutNavigator.Navigator
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
          <AboutNavigator.Screen
              name="About"
              component={About}
              options={{
                headerLeft: ({ navigation }) => (
                    <Icon name='menu' size={24} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                ),
              }} 
          />        
      </AboutNavigator.Navigator>
  );
}



const ReservationNavigator = createStackNavigator();

function ReservationNavigatorScreen({ navigation }) {
  return(
      <ReservationNavigator.Navigator
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
          <ReservationNavigator.Screen
              name="Reservation"
              component={Reservation}
              options={{
                headerLeft: ({ navigation }) => (
                    <Icon name='menu' size={24} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                ),
              }} 
          />        
      </ReservationNavigator.Navigator>
  );
}


const FavoritesNavigator = createStackNavigator();

function FavoritesNavigatorScreen({ navigation }) {
  return(
      <FavoritesNavigator.Navigator
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
          <FavoritesNavigator.Screen
              name="My Favorites"
              component={Favorites}
              options={{
                headerLeft: ({ navigation }) => (
                    <Icon name='menu' size={24} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                ),
              }} 
          />        
      </FavoritesNavigator.Navigator>
  );
}



const LoginNavigator = createStackNavigator();

function LoginNavigatorScreen({ navigation }) {
  return(
      <LoginNavigator.Navigator
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
          <LoginNavigator.Screen
              name="Login"
              component={Login}
              options={{
                headerLeft: ({ navigation }) => (
                    <Icon name='menu' size={24} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                ),
              }} 
          />        
      </LoginNavigator.Navigator>
  );
}


function CustomDrawerContentComponent(props) {
    return (
        <DrawerContentScrollView {...props}
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}
            >
            <View style={styles.drawerHeader} >
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante ConFusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
  }

const Drawer = createDrawerNavigator();

function MainNavigator() {
  return(

      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{
          backgroundColor: '#D1C4E9',
        }}
        drawerContentOptions={{
            activeTintColor: '#512DA8'
        }}
        drawerContent={props => <CustomDrawerContentComponent  {...props} />}
        >
          <Drawer.Screen name="Login" component={LoginNavigatorScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Icon name='sign-in' size={24} type='font-awesome' color={color}/>
                )
            }}
          />
          <Drawer.Screen name="Home" component={HomeNavigatorScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Icon name='home' size={24} type='font-awesome' color={color}/>
                )
            }}
          />
          <Drawer.Screen name="About" component={AboutNavigatorScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Icon name='info-circle' size={24} type='font-awesome' color={color}/>
                )
            }}
            />
          <Drawer.Screen name="Menu" component={MenuNavigatorScreen} 
            options={{
                drawerIcon: ({color}) => (
                    <Icon name='list' size={24} type='font-awesome' color={color}/>
                )
            }}
          />
          <Drawer.Screen name="Contact" component={ContactNavigatorScreen} 
            options={{
                drawerIcon: ({color}) => (
                    <Icon name='address-card' size={24} type='font-awesome' color={color}/>
                )
            }}
          />
          <Drawer.Screen name="My Favorites" component={FavoritesNavigatorScreen} 
            options={{
                drawerIcon: ({color}) => (
                    <Icon name='heart' size={24} type='font-awesome' color={color}/>
                )
            }}
          />
          <Drawer.Screen name="Reservation" component={ReservationNavigatorScreen} 
            options={{
                drawerIcon: ({color}) => (
                    <Icon name='cutlery' size={24} type='font-awesome' color={color}/>
                )
            }}
          />
      </Drawer.Navigator>

  );
}


class Main extends Component {
    
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() { 
        return (  
          <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </View>
          
        );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
    }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);