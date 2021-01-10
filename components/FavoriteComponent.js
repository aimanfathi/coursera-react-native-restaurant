import React, { Component } from 'react';
import { View, Text , FlatList } from 'react-native';
import { ListItem , Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render(){
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            return (
                <ListItem key={index}
                    bottomDivider
                    onPress={() => navigate('Dishdetail', { dishId: item.id})}
                >
                    <Avatar source={{uri: baseUrl + item.image}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };
    };
}

export default connect(mapStateToProps)(Favorites);