import { StyleSheet } from 'react-native';

const categoryBase = {
  flex: 1,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  height: 60,
  padding: 10,
  minWidth: 90,
  maxWidth: 90,
};

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
              marginRight:16
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

    forumsearch: {
        flex:2,
        marginRight: 20
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
    

    // categories

    selectedCategory: {
      ...categoryBase,
      backgroundColor: "#004a99",
    },

    notSelectedCategory: {
      ...categoryBase,
      backgroundColor: "#121212",
    },

});


