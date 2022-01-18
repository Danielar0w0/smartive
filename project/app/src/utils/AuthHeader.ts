export function authHeader(){

    const u = localStorage.getItem('user');

    if (u) {
        let user = JSON.parse(u);
        if (user && user.accessToken) {
            return {Authorization: 'Bearer ' + user.accessToken};
        } else {
            return {};
        }
    }
}