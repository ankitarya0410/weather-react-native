import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ImageBackground, ScrollView } from 'react-native';
import search from '../../assets/search.png';
import { ListItem } from 'react-native-elements';
import { API_DETAILS } from '../../constants';
import { COUNTRY_CODES } from '../../codes';
import helper from '../../helper';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedText: '',
            cities: []
        };
    }

    searchCities = async (text) => {
        const mapsAPI = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=(cities)&language=en_CA&key=${API_DETAILS.api_key_google}`;
        if(text.length > 2) {
            try {
                let response = await fetch(mapsAPI);
                let responseJson = await response.json();
                this.setState({
                    cities: responseJson.predictions
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            this.setState({
                cities: []
            });
        }
    }

    showWeather = (navigate, city) => {
        let cityString = city.split(',');
        const country = cityString[cityString.length - 1];
        const countryCode = helper(COUNTRY_CODES, country.trim());
        cityString[cityString.length - 1] = countryCode;
        cityString = cityString.join().replace(/\s/g, '').toString();
        navigate('Details', {city: cityString} );
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <TextInput
                    style={{height: 40, fontSize: 18, borderColor: '#d6d6d6', borderWidth: 1, borderRadius: 5, paddingLeft: 40, paddingRight: 40, paddingTop: 10, paddingBottom: 10, textAlign: 'left'}}
                    placeholder='Search for a city'
                    onChangeText={(text) => this.searchCities(text)}
                    value={this.state.text}>
                </TextInput>
                <ImageBackground
                    source={search} style={{width: 18, height: 18, position: 'absolute', top: 13, left: 12}}>
                </ImageBackground>
                <ScrollView>
                    { this.state.cities ?
                        this.state.cities.map((city, index) => (
                            <ListItem
                                key={index}
                                title={city.description}
                                titleStyle={{ color: '#08c' }}
                                containerStyle={{borderBottomWidth: 1, borderBottomColor: '#d6d6d6'}}
                                onPress={() => this.showWeather(navigate, city.description)}
                            />
                        ))
                        :
                        null
                    }
                </ScrollView>
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

export default HomeScreen;
