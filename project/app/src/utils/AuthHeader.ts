export function authHeader() {

    const token = localStorage.getItem('user');
    let authHeader = { 'Authorization': ''};

    if (token)
        authHeader = { 'Authorization': 'Bearer ' + token };

    return authHeader;
}