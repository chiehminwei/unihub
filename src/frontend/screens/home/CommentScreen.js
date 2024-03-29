import React, { Component } from "react";
import { ScrollView, Image, StyleSheet } from "react-native";

// import styles from "./styles";
// import Comments from "react-native-comments";
import * as commentActions from "./ExampleActions";
import moment from "moment";

export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.actions = commentActions;
    this.state = {
      comments: [],
      loadingComments: true,
      lastCommentUpdate: null,
      review: props.review ? props.review : null,
      login: null,
      id: props.id
    };

    this.scrollIndex = 0;
  }

  static navigatorStyle = {};

  componentWillMount() {
    const c = this.actions.getComments();
    this.setState({
      comments: c,
      loadingComments: false,
      lastCommentUpdate: new Date().getTime()
    });
  }

  extractUsername(c) {
    try {
      return c.email !== "" ? c.email : null;
    } catch (e) {
      console.log(e);
    }
  }

  extractBody(c) {
    try {
      return c.body && c.body !== "" ? c.body : null;
    } catch (e) {
      console.log(e);
    }
  }

  extractImage(c) {
    try {
      return c.image_id && c.user.image_id !== "" ? c.user.image_id : "";
    } catch (e) {
      console.log(e);
    }
  }

  extractChildrenCount(c) {
    try {
      return c.childrenCount || 0;
    } catch (e) {
      console.log(e);
    }
  }

  extractEditTime(item) {
    try {
      return item.updated_at;
    } catch (e) {
      console.log(e);
    }
  }

  extractCreatedTime(item) {
    try {
      return item.created_at;
    } catch (e) {
      console.log(e);
    }
  }

  likeExtractor(item) {
    return item.liked;
  }

  reportedExtractor(item) {
    return item.reported;
  }

  likesExtractor(item) {
    return item.likes.map(like => {
      return {
        image: like.image,
        name: like.username,
        user_id: like.user_id,
        tap: username => {
          console.log("Taped: " + username);
        }
      };
    });
  }

  isCommentChild(item) {
    return item.parentId !== null;
  }

  render() {
    const review = this.state.review;
    const data = this.state.comments;

    return (
      /*
       * They should add scroll to end on save action
       *They should not update comments if there are modals opened
       *
       * */
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        onScroll={event => {
          this.scrollIndex = event.nativeEvent.contentOffset.y;
        }}
        ref={"scrollView"}
      >

        {/* {this.state.comments.length ? (
          <Comments
            data={data}
            //To compare is user the owner
            viewingUserName={"Pearline@veda.ca"}
            // is the current user an admin
            userIsAdmin={true}
            // Styles to pass. Search for getStyles to find out what can be overwritten
            styles={{}}
            //how many comments to display on init
            initialDisplayCount={5}
            //How many minutes to pass before locking for editing
            editMinuteLimit={0}
            //What happens when user taps on username or photo
            usernameTapAction={username => {
              console.log("Taped user: " + username);
            }}
            //Where can we find the children within item.
            //Children must be prepared before for pagination sake
            childPropName={"children"}
            isChild={item => this.isCommentChild(item)}
            //We use this for key prop on flat list (i.e. its comment_id)
            keyExtractor={item => item.commentId}
            //Extract the key indicating comments parent
            parentIdExtractor={item => item.parentId}
            //what prop holds the comment owners username
            usernameExtractor={item => this.extractUsername(item)}
            //when was the comment last time edited
            editTimeExtractor={item => this.extractEditTime(item)}
            //When was the comment created
            createdTimeExtractor={item => this.extractCreatedTime(item)}
            //where is the body
            bodyExtractor={item => this.extractBody(item)}
            //where is the user image
            imageExtractor={item => this.extractImage(item)}
            //Where to look to see if user liked comment
            likeExtractor={item => this.likeExtractor(item)}
            //Where to look to see if user reported comment
            reportedExtractor={item => this.reportedExtractor(item)}
            //Where to find array with user likes
            likesExtractor={item => this.likesExtractor(item)}
            //Where to get nr of replies
            childrenCountExtractor={item => this.extractChildrenCount(item)}
            //what to do when user clicks reply. Usually its header height + position (b/c scroll list heights are relative)
            replyAction={offset => {
              this.refs.scrollView.scrollTo({
                x: null,
                y: this.scrollIndex + offset - 300,
                animated: true
              });
            }}
            //what to do when user clicks submits edited comment
            saveAction={(text, parentCommentId) => {
              let date = moment().format("YYYY-MM-DD H:mm:ss");
              let comments = this.actions.save(
                this.state.comments,
                text,
                parentCommentId,
                date,
                "testUser"
              );
              this.setState({
                comments: comments
              });

              if (!parentCommentId) {
                this.refs.scrollView.scrollToEnd();
              }
            }}
            //what to do when user clicks submits edited comment
            editAction={(text, comment) => {
              let comments = this.actions.edit(
                this.state.comments,
                comment,
                text
              );
              this.setState({
                comments: comments
              });
            }}
            //what to do when user clicks report submit
            reportAction={comment => {
              let comments = this.actions.report(this.state.comments, comment);
              this.setState({
                comments: comments
              });
            }}
            //what to do when user clicks like
            likeAction={comment => {
              let comments = this.actions.like(this.state.comments, comment);
              this.setState({
                comments: comments
              });
            }}
            //what to do when user clicks like
            deleteAction={comment => {
              let comments = this.actions.deleteComment(
                this.state.comments,
                comment
              );
              this.setState({
                comments: comments
              });
            }}
            //Must return promise
            paginateAction={(from_comment_id, direction, parent_comment_id) => {
              //Must return array of new comments after pagination

              let newComments = this.actions.paginateComments(
                this.state.comments,
                from_comment_id,
                direction,
                parent_comment_id
              );

              this.setState({
                comments: newComments
              });
              let self = this;
              setTimeout(function() {
                if (direction == "up") {
                  self.refs.scrollView.scrollTo({
                    x: 0,
                    y: 500,
                    animated: true
                  });
                } else {
                  self.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
                }
              }, 3000);
            }}
          />
        ) : null} */}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  commentContainer: {
    padding: 5,
    flexDirection: 'row'
  },
  left: {
    padding: 5
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 40
  },
  right: {
    flex: 1,
    padding: 5
  },
  rightContent: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#f1f3f6'
  },
  rightContentTop: {
    flexDirection: 'row'
  },

  name: {
    fontWeight: 'bold',
    paddingBottom: 5
  },
  editIcon: {
    flex: 1,
    alignItems: 'flex-end',
  },
  body: {
    paddingBottom: 10
  },
  rightActionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  time: {
    fontSize: 12,
    paddingLeft: 5,
    color: '#9B9B9B',
    fontStyle: 'italic'
  },
  actionText: {
    color: '#9B9B9B',
    fontWeight: 'bold'
  },
  repliedSection: {
    width: 180,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  repliedImg: {
    height: 20,
    width: 20,
    borderRadius: 20
  },
  repliedUsername: {
    color: '#9B9B9B',
    fontWeight: 'bold'
  },
  repliedText: {
    color: '#9B9B9B',
  },
  repliedCount: {
    color: '#9B9B9B',
    fontSize: 12
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  submit: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  likeNr: {
    fontWeight: 'normal',
    fontSize: 12
  },
  likeHeader: {
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'

  },
  likeButton: {
    margin: 10,
    alignItems: 'center',

  },
  likeContainer: {
    padding: 10,
    width: 200,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',

  },
  likeImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  likename: {
    fontWeight: 'bold',
    fontSize: 14
  },
  editModalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editModal: {
    backgroundColor: "white",
    width: 400,
    height: 300,
    borderWidth: 2,
    borderColor: "silver"
  },
  editButtons:{
    flexDirection:"row",
    justifyContent: "space-around",
    height: 40,
    width: 80,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 5,
    margin: 10

  }
})