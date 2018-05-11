const fetch = require('node-fetch');

module.exports.getActivity = function() {
    return fetch(`https://api.trello.com/1/boards/G81pamxx/actions/?key=9467e7508d3ae0ed9087730e11234d03&token=ddce986547b38aab4459219b3099a876c7e5d6930d84c6211572e7a818c0a16f`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((json) => {
        return json;
    });
};
