import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { DISHES } from '../shared/dishes';


class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    }


    render(){

        const renderMenuItem = ({item, index}) => {

            return (
                <ListItem bottomDivider onPress={() => navigate('Dishdetail', { dishId: item.id})}>
                    <Avatar rounded source={require('./images/uthappizza.png')} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            );
    
        };

        const { navigate } = this.props.navigation;

        return(
            <FlatList 
                data={this.state.dishes} 
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }

}


export default Menu;