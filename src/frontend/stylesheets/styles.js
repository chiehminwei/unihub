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
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      },
          // header text styles
          browse: {
              color: '#121212',
              marginLeft: 15,
              fontSize: 36,
            },
          // homescreen icon styles
          calendar: {
               marginLeft:20
            },
          filter: {
              marginRight:20
            },
          map: {
              marginLeft:20, 
              marginRight:20
            },
          plus: {
              marginRight:20
            },
          homesearch: {
              flex:1,
              marginLeft:20
            },
          
    // forumscreen styles
    forum:{
        color: '#121212',
        marginLeft: 15,
        fontSize: 36,
        flex: 7
    },

    search: {
        flex:1
      },

    creategroup:{
        flex:1,
        marginRight:20
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
        color: '#121212',
        alignSelf: 'center',
        fontSize: 24,
      },
    
});
