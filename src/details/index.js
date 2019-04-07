import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { API_DETAILS } from '../../constants';

class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather_details: ''
        };
    }

    async componentDidMount() {
        const { city } = this.props.navigation.state.params;
        const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_DETAILS.api_key_weather}`;
        try {
            let response = await fetch(weather_url);
            let responseJson = await response.json();
            this.setState({
                weather_details: responseJson
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.weather_details ? this.state.weather_details.weather[0].description : ''}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginLeft: 16,
        marginRight: 16
    }
});

// skip this line if using Create React Native App
//AppRegistry.registerComponent('AwesomeProject', () => Touchables);

export default DetailsScreen;