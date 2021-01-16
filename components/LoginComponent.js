import React, { Component } from 'react';
import { View, Button , StyleSheet , Text } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';


class Login extends Component {

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
                        title='Login'
                        color='#512DA8'
                        onPress={() => this.handleLogin()}
                    />
                </View>      
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20        
    },
    formInput: {
        margin: 40
    },
    formCheckBox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;