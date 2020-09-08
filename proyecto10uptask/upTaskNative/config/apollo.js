import { ApolloClient } from '@apollo/client';
import { Platform } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: (Platform.OS === 'ios') ?
        // Para ios
        new HttpLink({
            uri: 'http://localhost:4000/'
        })
        :
        //Para android
        new HttpLink({
            uri: 'http://10.0.2.2:4000/'
        })
});

export default client;