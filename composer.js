module.exports.composeMessage = function(activity) {
    console.log('Test');
};

let sorter = new Sorter();

/**
 * Sort activity by type
 * @constructor
 */
class Sorter {
    moveCard(activity) {
        let data = activity.data;
        return (data.hasOwnProperty('listAfter')
            && data.hasOwnProperty('listBefore'));
    }

    createCart(activity) {
        return (activity.type === 'createCard');
    }
}
