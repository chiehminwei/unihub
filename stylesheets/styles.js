import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    headerTitle: {
        color: '#121212',
        marginLeft: 15,
        marginTop: 5,
        fontSize: 36,
    },

    //homescreen style
    homeheader: {
        flex: 1,
        backgroundColor: '#F3F3F3',
      },
          // header text styles
          browse: {
              color: '#121212',
              marginLeft: 15,
              fontSize: 36,
            },
          // homescreen icon styles
          calendar: {
              position: 'absolute',
              bottom: 10,
              left: 15,
            },
          filter: {
              position: 'absolute',
              bottom: 10,
              right: 20,
            },
          map: {
              position: 'absolute',
              bottom: 10,
              right: 55,
            },
          // plus: {
          //     position: 'absolute',
          //     top: 20,
          //     right: 20,
          //   },
          homesearch: {
              marginLeft: 20,
              height:5,
            },
          
    // forumscreen styles
    search: {
        position: 'absolute',
        top: 20,
        right: 50,
      },
    
    forumheader: {
        flex: 1,
        backgroundColor: '#F3F3F3',
      },
    

    // notificationscreen styles
    notificatoinheader: {
        flex: 1,
        backgroundColor: '#F3F3F3',
      }, 

    notificatoin: {
        color: '#121212',
        alignSelf: 'center',
        marginTop:15,
        fontSize: 24,
      },
    // profilescreen styles
    nameheader: {
        flex: 1,
        backgroundColor: '#F3F3F3',
      }, 

    name: {
        flex:4,
        color: '#121212',
        alignSelf: 'center',
        marginTop:15,
        fontSize: 24,
      },
    
});
