import React from "react";

export default function(state = {}, action) {
    console.log("inside ther reducer");
    if (action.type == "USER_DATA") {
        state = Object.assign({}, state, {
            newUser: action.newUser
        });
    }
    if (action.type == "REGISTER_USER") {
        state = {
            ...state,
            registeredUser: action.registeredUser
        };
    }
    console.log("state", state);
    return state;
}
