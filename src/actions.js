import axios from "./axios";

export function handleRegistration(e) {
    return {
        type: "USER_DATA",
        newUser: {
            firstname: e.target.value,
            lastname: e.target.value,
            email: e.target.value,
            password: e.target.value
        }
    };
}

export function registerUser(userData) {
    return axios.post("/register", userData).then(function({ data }) {
        console.log("registered user", data);
        return {
            type: "REGISTER_USER",
            registeredUser: data.data
        };
    });
}
