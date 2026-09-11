import { useReducer, useEffect } from "react";
import { AuthContext } from "./auth-context";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const INITIALIZE = "INITIALIZE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

// reducer receives current state and an actions, then returns a new state
const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      try {
        // if a username exist, the user is considered authenticated
        const username = window.localStorage.getItem("username");

        if (username) {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user: { username } },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  //The username is saved, authentication state is updated, and the callback navigates the user to the intended page. only demonstration authentication. no password or secure server validation.
  const login = async (username, callback) => {
    window.localStorage.setItem("username", username);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: { username } },
    });
    callback();
  };

  //Logout removes the stored username and sets the authentication state to false:
  const logout = async (callback) => {
    window.localStorage.removeItem("username");
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
