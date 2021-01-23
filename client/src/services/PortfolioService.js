const baseURL = 'http://localhost:3000/api/portfolio/'

export default {
    getPortfolio() {
        return fetch(baseURL)
            .then(res => res.json())
    },

    postShares(share) {
        return fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(share),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
    },

    sellShares(id) {
        return fetch(baseURL + id, {
            method: 'DELETE'
        })
    }
}