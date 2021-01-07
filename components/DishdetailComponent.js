import React, { Component } from 'react';
import { View, Text , ScrollView, FlatList } from 'react-native';
import { Card , Icon, Rating } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}


const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
});


function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return(
            <Card>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Image source={{uri: baseUrl + dish.image}} />
                <Text style={{margin: 10}}>{dish.description}</Text>
                <Icon raised reverse
                    type='font-awesome' 
                    color='#f50'
                    name={props.favorites ? 'heart' : 'heart-o'}
                    onPress={() => props.favorites ? alert('Already Favorite') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return(<View></View>)
    }
}


function RenderComment(props){
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                {/*<Text style={{fontSize: 12}}>{item.rating} Stars</Text>*/}
                <Rating imageSize={15} readonly startingValue={item.rating} style={{ marginRight: 'auto'}} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Card>
            <Card.Title>Comments</Card.Title>
            <Card.Divider/>
            <FlatList 
                data={comments} 
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}


class Dishdetail extends Component{


    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    }


    render(){

        const dishId = this.props.route.params.dishId;

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorites={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                />
                <RenderComment comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
            
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);