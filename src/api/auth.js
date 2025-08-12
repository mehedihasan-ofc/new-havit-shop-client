// save a user to mongodb
export const saveUser = userInfo => {

    fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    })
        .then(res => res.json())
        .then(data => console.log(data))
}