import React, { Component } from 'react';
import { Text , View , ScrollView , StyleSheet , Switch , Button , Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';


class Reservation extends Component {

    constructor(props){
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }


    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        //this.toggleModal();

        let notifyDate = this.state.date;

        Alert.alert('Your Reservation OK?', 
            'Number of Guests: ' + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and time: ' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotification(notifyDate)
                        .catch(e => console.log(e));                       
                    },
                    style: 'default'
                }
            ],
            {cancelable: false}
        );
    }


    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            let permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                alert('Permission not granted to show notification');
            }
        }
        return permission;
    }

    
    async presentLocalNotification(date) {
        let permission = await this.obtainNotificationPermission();
        if (permission.status === 'granted') {

            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: true,
                  shouldSetBadge: false,
                }),
            });
            
            Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Your Reservation',
                  body: 'Reservation for ' + date + ' requested.',
                },
                trigger: null,
            });
           
        }
        else {
            console.log('Notification permission not granted');
        }
        
    }


    render() {
        return(
            <Animatable.View style={{flex: 1}} animation="zoomIn" duration={2000} useNativeDriver={true}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}                        
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
                    >
                        <Picker.Item label='1' value='1'></Picker.Item>
                        <Picker.Item label='2' value='2'></Picker.Item>
                        <Picker.Item label='3' value='3'></Picker.Item>
                        <Picker.Item label='4' value='4'></Picker.Item>
                        <Picker.Item label='5' value='5'></Picker.Item>
                        <Picker.Item label='6' value='6'></Picker.Item>
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}                    
                        thumbColor={'#512DA8'}
                        onValueChange={(value) => this.setState({smoking: value})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode='datetime'
                        placeholder='select date and time'
                        minDate='2021-01-01'
                        maxDate='2021-01-31'
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'                        
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36
                          }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />        
                </View>
                <View style={styles.formRow}>
                    <Button
                        title='Reserve'
                        color='#512DA8'
                        onPress={() => this.handleReservation()}
                        accessibilityLabel= 'Learn more about this label'
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {
                        this.toggleModal();
                        this.resetForm()
                    }}
                    onRequestClose={() => {
                        this.toggleModal();
                        this.resetForm()
                    }}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking? : {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                        <Button 
                            title='Close'
                            color='#512DA8'
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm()
                            }}
                        />
                    </View>
                </Modal>
            </Animatable.View>
        )
    }

}


const styles = StyleSheet.create({
    formRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;