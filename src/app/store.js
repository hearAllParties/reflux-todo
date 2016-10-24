/**
 * Created by Eugene on 16/10/14.
 */
var Reflux = require('reflux');
var _ = require('lodash');
var Action = require('./action');

var todoCounter = 0;
var Store = Reflux.createStore({
    listenables: [Action],
    getInitialState: function () {
        this.list = [{
            key: todoCounter++,
            created: new Date(),
            isComplete: false,
            label: 'Rule the web'
        }];
        return {list: this.list}
    },
    onAddItem: function (text) {
        this.list.push({
            key: todoCounter++,
            created: new Date(),
            isComplete: false,
            label: text
        });
        this.updateList(this.list);
    },
    onDeleteItem: function (id) {
        this.list = _.filter(this.list, function (item) {
            return item.key !== id
        });
        this.updateList(this.list)
    },
    onToggleAllItems: function (checked) {
        this.list = _.map(this.list, function (item) {
            item.isComplete = checked;
            return item;
        });
        this.updateList(this.list)
    },
    onToggleItem: function (id) {
        var toggleItem = _.find(this.list, function (item) {
            return item.key == id
        });
        toggleItem.isComplete = !toggleItem.isComplete;
        this.updateList(this.list)
    },
    updateList: function (list) {
        this.trigger({list: list}); //更新state中的值
    }
});

module.exports = Store;