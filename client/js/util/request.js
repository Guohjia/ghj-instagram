import axios from "axios";

const signIn = params => {
    return axios.post("/api/signin", params).catch(function (error) {
        console.log(error);
    })
}

const signUp = params => {
    return axios.post("/api/signup", params).catch(function (error) {
        console.log(error);
    })
}


module.exports = {
    signIn,
    signUp
};
