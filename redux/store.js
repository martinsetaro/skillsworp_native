import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./authDucks";
import { locationReducer } from "./locationDucks";
import { registerReducer } from "./registerDucks";
import { relationshipReducer } from "./relationshipDucks";
import { skillsReducer } from "./skillsDucks";
import testReducer from "./testDucks";
import { userReducer } from "./userDucks";

const rootReducer = combineReducers({
  // TODO: Reducers creation
  characters: testReducer,
  user: userReducer,
  skills: skillsReducer,
  location: locationReducer,
  auth: authReducer,
  relationship: relationshipReducer,
  register: registerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
