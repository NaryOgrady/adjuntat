module.exports.composeMessage = function(activity) {
    let data = activity.data;
    if (data.hasOwnProperty('listAfter') && data.hasOwnProperty('listBefore')) {
        // card moved
        let user = activity.memberCreator.fullName;
        let card = data.card.name;
        let listAfter = data.listAfter.name;
        let listBefore = data.listBefore.name;
        return `${user} moved ${card} from ${listBefore} to ${listAfter}`;
    } else if (activity.type === 'createCard') {
        // card created
        let data = activity.data;
        let user = activity.memberCreator.fullName;
        let card = data.card.name;
        return `${user} create ${card}`;
    }
};
