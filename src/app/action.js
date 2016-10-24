/**
 * Created by Eugene on 16/10/14.
 */
var Reflux = require('reflux');

var Actions = Reflux.createActions([
    'addItem',
    'deleteItem',
    'toggleAllItems',
    'toggleItem'
]);
module.exports = Actions;