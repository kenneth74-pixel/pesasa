export const isAuthenticated = (state) => {
    console.log('user role: ',state.auth.auth.userType);
    if (state.auth.auth.idToken) return true;
    return false;
};

export const userRole = (state) =>{
    if(state.auth.auth.userType === 'ROOT') return true;
    return false;
}