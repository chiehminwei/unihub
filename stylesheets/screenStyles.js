import { StyleSheet } from 'react-native';

export const screenStyles = StyleSheet.create({
    headerTitle: {
        color: '#121212',
        marginLeft: 15,
        marginTop: 5,
        fontSize: 36,
    },

    safeArea: {
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: '#F3F3F3',
    },

    bodyContent: {
        backgroundColor: 'yellow', 
        flex: 1, 
        alignSelf: 'stretch', 
    },
});