import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';
import { LogBox } from 'react-native';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';


class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }


    componentDidMount() {
        SecureStore.getItemAsync('userInfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true});
                }
            })
    }

    static navigationOptions = {
        title: 'Login'
    };


    handleLogin() {
        console.log(JSON.stringify(this.state));

        //Save State to SecureStore
        if (this.state.remember) {
            SecureStore.setItemAsync('userInfo',
                JSON.stringify({username: this.state.username, password: this.state.password}))
            .then(console.log('Secure State saved'))
            .catch((error) => console.log('Could not save user info', error));
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .then(console.log('Secure State deleted'))
            .catch((error) => console.log('Could not delete user info', error));
        }
    }

    render() {
        return(
            
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{type:'font-awesome', name:'user-o'}}
                    onChangeText={(username) => this.setState({username: username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    secureTextEntry={true}
                    placeholder='Password'
                    leftIcon={{type:'font-awesome', name:'key'}}
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckBox}
                />
                <View style={styles.formButton}>
                    <Button
                        title=' Login'
                        buttonStyle={{backgroundColor: '#512DA8'}}
                        icon={<Icon name='sign-in' type='font-awesome' color='white' />}
                        onPress={() => this.handleLogin()}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        type='clear'
                        title=' Register'                        
                        titleStyle={{color: 'blue'}}
                        icon={<Icon name='user-plus' type='font-awesome' color='blue' />}
                        onPress={() => this.props.navigation.navigate('Register')}
                    />
                </View> 
            </View>
            
        );
    }
}



class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        };
    }


    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }


    getImagefromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

        if (cameraRollPermission.status === 'granted') {
            let selectedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if (!selectedImage.cancelled) {
                console.log(selectedImage);
                this.processImage(selectedImage.uri);
            }
        }
    }


    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {format: ImageManipulator.SaveFormat.PNG}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });

    }


    handleRegister() {
        console.log(JSON.stringify(this.state));

        if (this.state.remember) {
            SecureStore.setItemAsync('userInfo',
                JSON.stringify({username: this.state.username, password: this.state.password}))
            .then(console.log('Secure State saved'))
            .catch((error) => console.log('Could not save user info', error));
        }

    }

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: this.state.imageUrl}}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image}
                    />
                    <Button
                        title='Camera'
                        onPress={this.getImageFromCamera}
                    />
                    <Button
                        title='Gallery'
                        onPress={this.getImagefromGallery}
                    />
                </View>
                <Input
                    placeholder='Username'
                    leftIcon={{type:'font-awesome', name:'user-o'}}
                    onChangeText={(username) => this.setState({username: username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    secureTextEntry={true}
                    placeholder='Password'
                    leftIcon={{type:'font-awesome', name:'key'}}
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='First Name'
                    leftIcon={{type:'font-awesome', name:'user-o'}}
                    onChangeText={(firstname) => this.setState({firstname: firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='Email'
                    leftIcon={{type:'font-awesome', name:'envelope-o'}}
                    onChangeText={(email) => this.setState({email: email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='Last Name'
                    leftIcon={{type:'font-awesome', name:'user-o'}}
                    onChangeText={(lastname) => this.setState({lastname: lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckBox}
                />
                <View style={styles.formButton}>
                    <Button
                        title='Register'
                        buttonStyle={{backgroundColor: '#512DA8'}}
                        icon={<Icon name='user-plus' type='font-awesome' color='white' />}
                        onPress={() => this.handleRegister()}
                    />
                </View>      
            </View>
            </ScrollView>
        );
    }

}


const Tab = createBottomTabNavigator();

class Login extends Component {
    render() {
        return(
                <Tab.Navigator
                    tabBarOptions={{
                        activeBackgroundColor: '#9575CD',
                        inactiveBackgroundColor: '#D1C4E9',
                        activeTintColor: 'white',
                        inactiveTintColor: 'gray'
                    }}
                >
                    <Tab.Screen 
                        name="Login" component={LoginTab} 
                        options={{
                            tabBarIcon: ({focused, color, size}) => {
                                return(
                                    <Icon 
                                        type='font-awesome' 
                                        name='sign-in'
                                        color={color}
                                    />
                                )
                            }
                        }}
                    />
                    <Tab.Screen 
                        name="Register" component={RegisterTab} 
                        options={{
                            tabBarIcon: ({focused, color, size}) => {
                                return(
                                    <Icon 
                                        type='font-awesome' 
                                        name='user-plus'
                                        color={color}
                                    />
                                )
                            }
                        }}
                    />
                </Tab.Navigator>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20        
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'      
    },
    image: {
        //margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        //margin: 40
    },
    formCheckBox: {
        //margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 10
    }
});

export default Login;