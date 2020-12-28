<View style={styles.container}>
      
<Button title="Click Me" onPress={() => Alert.alert('Button Alert', 'This is a test text')}/>

<Text>This is my test App !</Text>

<TouchableOpacity
  style={styles.button}
  onPress={() => Alert.alert('Text Alert','This is a test button',
  [
    {text:'Yes'},
    {text:'No'}
  ],
  { cancelable: true }
  )}
>
  <Ionicons name="battery-charging-outline" size={24} color="black" />
</TouchableOpacity>
<Image
  style={styles.logo}
  source={require('./assets/img/ayman.jpg')}
/>

<TextInput
  style={styles.textbox}
  placeholder="type here"
/>

</View>







<Button title={props.dishes[0].label} onPress={() => Alert.alert('hi there !')}/>
