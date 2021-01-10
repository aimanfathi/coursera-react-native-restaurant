import React, { Component } from 'react';
import { View, Text , ScrollView, FlatList, Modal, StyleSheet, Button, LogBox } from 'react-native';
import { Card , Icon, Rating, Input, colors } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}


const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});


function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return(
            <Card>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Image source={{uri: baseUrl + dish.image}} />
                <Text style={{margin: 10}}>{dish.description}</Text>
                <View style={styles.cardIcons}>
                    <Icon raised reverse
                        type='font-awesome' 
                        color='#f50'
                        name={props.favorites ? 'heart' : 'heart-o'}
                        onPress={() => props.favorites ? alert('Already Favorite') : props.onPress()}
                    />
                    <Icon raised reverse
                        type='font-awesome' 
                        color='#512DA8'
                        name='pencil'
                        onPress={() => props.onPencilPress()}
                    />
                </View>
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

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            rating: 0,
            author: '',
            comment: ''
        }
    }


    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    }


    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    
    resetForm() {
        this.setState({
            rating: 0,
            author: '',
            comment: ''
        });
    }
    
    handleComment(dishId, rating, author, comment) {
        this.props.postComment(dishId, rating, author, comment);
        this.toggleModal();
        this.resetForm();
    }


    render(){

        const dishId = this.props.route.params.dishId;

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorites={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    onPencilPress={() => this.toggleModal()}
                />
                <RenderComment comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
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
                    <View style={styles.modalView}>
                    <Rating
                        showRating
                        startingValue={0}
                        fractions={0}
                        onFinishRating={value => this.setState({ rating: value })}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={value => this.setState({ author: value })}
                    />
                    <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        onChangeText={value => this.setState({ comment: value })}
                    />
                    <Button 
                        title='Submit'
                        color='#512DA8'
                        onPress={() => {
                            this.handleComment(dishId, this.state.rating, this.state.author, this.state.comment);
                            this.resetForm()
                        }}
                    />
                    <Button 
                        title='Cancel'
                        color='#080808'
                        onPress={() => {
                            this.toggleModal();
                            this.resetForm()
                        }}
                    />
                    </View>
                </Modal>
            </ScrollView>
            
        );
    }

    // To remove the warning
    componentDidMount() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }

}


const styles = StyleSheet.create({
    cardIcons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center' 
    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);