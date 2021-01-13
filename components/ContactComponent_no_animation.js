import React, { Component } from 'react';
import { View , Text } from 'react-native';
import { Card } from 'react-native-elements';


class Contact extends Component {
    
    static navigationOptions = {
        title: 'Contact'
    }

    render(){
        return(
            <View>
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider/>
                    <Text style={{margin: 10}}>
                        121, Clear Water Bay Road{"\n"}
                        Clear Water Bay, Kowloon{"\n"}
                        HONG KONG{"\n"}
                        Tel: +852 1234 5678{"\n"}
                        Fax: +852 8765 4321{"\n"}
                        Email:confusion@food.net{"\n"}
                    </Text>
                </Card>
            </View>
        );
    }
}

export default Contact;