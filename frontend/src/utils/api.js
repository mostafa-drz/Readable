export function getAllPostsServer(order = 'vote') {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3001/posts", { headers: { 'Authorization': 'mostafa' } }).then((res) => {
            res.json().then((data) => {
                resolve(data)
            }).catch(() => {
                reject("failed")
            })
        })
    })
}

export function getAllCategoriesServer() {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3001/categories", { headers: { 'Authorization': 'mostafa' } }).then((res) => {
            res.json().then((data) => {
                resolve(data.categories);
            }).catch(() => {
                reject("failed")
            })
        })
    })
}

export function changeVote(id, score, value) {
    let newScore = score + value
    const data = JSON.stringify({ voteScore: newScore })
    const request = new Request(`http://localhost:3001/posts/${id}`, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'mostafa',
            'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: data
    })
    return new Promise((resolve, reject) => {
        fetch(request).then((res) => {
            if (res.status === 200) {
                resolve(res)
            }
        }).catch(() => {
            reject("failed")
        })
    })
}

export function updatePostServer(id, updatedData) {
    const data = JSON.stringify(updatedData)
    const request = new Request(`http://localhost:3001/posts/${id}`, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'mostafa',
            'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: data
    })
    return new Promise((resolve, reject) => {
        fetch(request).then((res) => {
            if (res.status === 200) {
                resolve(res.json())
            } else {
                reject(res)
            }
        }).catch((e) => {
            reject('failed')
        })
    })
}

export function addPostServer(title, category, body, author) {
    const data = {
        title: title,
        category: category,
        body: body,
        author: author,
        voteScore: 1,
        deleted: false,
        commentCount: 0,
        timestamp: Date.now(),
        id: Math.random().toString(36).slice(2, 10)
    }
    const request = new Request('http://localhost:3001/posts', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'mostafa',
            'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: JSON.stringify(data)
    });
    return new Promise((resolve, reject) => {
        fetch(request).then((res) => {
            if (res.status === 200) {
                resolve(data)
            } else {
                reject(res)
            }
        }).catch(() => {
            reject('failed')
        })
    })
}

export function getAllPostComments(id) {
    const request = new Request(`http://localhost:3001/posts/${id}/comments`, {
        headers: new Headers({
            'Authorization': 'mostafa'
        }),
        mode: 'cors',
    });
    return new Promise((resolve, reject) => {
        fetch(request).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    resolve(data)
                })
            } else {
                reject(res)
            }
        }).catch(() => {
            reject('failed')
        })
    })

}

export function voteComment(id, vote) {
    const request = new Request(`http://localhost:3001/comments/${id}`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'mostafa',
            'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: JSON.stringify({
            option: vote
        })
    })
    return new Promise((resolve, reject) => {
        fetch(request).then((res) => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        }).catch(() => {
            reject('failed')
        })
    })
}

export function addNewComment(comment) {
    const request = new Request('http://localhost:3001/comments', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'mostafa',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(comment),
        mode: 'cors',
    })

    return new Promise((resolve, reject) => {
        fetch(request).then((res) => {
            if (res.status === 200) {
                resolve(res.json())
            } else {
                reject(res)
            }
        }).catch(() => {
            reject('failed')
        })
    })
}

export function removeComment(id) {
    const request = new Request(`http://localhost:3001/comments/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'mostafa',
        }),
        mode: 'cors'
    })

    return new Promise((resolve, reject) => {
        fetch(request).then((res) => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        }).catch(() => {
            reject('failed')
        })
    })
}

export function editComment(id, props) {
    const request = new Request(`http://localhost:3001/comments/${id}`, {
        headers: new Headers({
            'Authorization': 'mostafa',
            'Content-Type': 'application/json'
        }),
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(props)
    })

    return new Promise((resolve, reject) => {
        fetch(request).then((res) => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        }).catch(() => {
            reject('failed')
        })
    })
}

export function deletePostServer(id) {
    const request = new Request(`http://localhost:3001/posts/${id}`, {
        headers: new Headers({
            'Authorization': 'mostafa',
        }),
        method: 'DELETE',
        mode: 'cors',
    })

    return new Promise((resolve, reject) => {
        fetch(request).then((res) => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        }).catch(() => {
            reject('failed')
        })
    })
}