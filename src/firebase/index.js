import Firebase, { auth } from "./firebase";
import { FirebaseProvider, withFirebaseHOC } from "./context";

export default Firebase;

export { FirebaseProvider, withFirebaseHOC, auth };
