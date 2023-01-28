export const state = () => ({
    user: {
        username: '',
        authenticated: false
    },
    credentials: {
        username: 'newtown',
        password: 'gw@2668'
    }
})

export const mutations = {
    login(state, data) {
        // Check user Valid

        // Authenticate User
        // console.log('data' , data);
        // console.log('cred' , state.credentials);

        // console.log('validated or not :' , (state.credentials === data));

        var a = (state.credentials.username == data.username && state.credentials.password === data.password)
        console.log('validation', a);
        if (a) {
            state.user = {
                username: data.username,
                authenticated: true
            }
        }
        return 'loggin Proccess';
    },
    logout(state) {
        state.user.authenticated = false;
    }



}
export const getters = {

    auth_status: (state) => {
        return state.user.authenticated;
    }
}