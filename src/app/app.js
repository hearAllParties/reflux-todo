/**
 * Created by Eugene on 16/10/14.
 */
var Reflux = require('reflux');
var Action = require('./action');
var Store = require('./store');

//ToDoHeader
var ToDoHeader = React.createClass({
    onKeyUp: function (e) {
        var text = e.target.value;
        if (text && e.which == 13) {
            Action.addItem(text);
            e.target.value = "";
        }
    },
    render: function () {
        return (
            <header id="header">
                <h1>todos</h1>
                <input id="new-todo" placeholder="What needs to be done?" onKeyUp={this.onKeyUp}/>
            </header>
        );
    }
});

//ToDoItem
var ToDoItem = React.createClass({
    handleDestroy: function () {
        Action.deleteItem(this.props.id)
    },
    handleToggle: function () {
        Action.toggleItem(this.props.id)
    },
    render: function () {
        return (
            <li className={!!this.props.isComplete ? "completed" : ""}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={!!this.props.isComplete}
                           onChange={this.handleToggle}/>
                    <label >{this.props.label}</label>
                    <button className="destroy" onClick={this.handleDestroy}></button>
                </div>
                <input ref="editInput" className="edit"/>
            </li>
        )
    }
});

//ToDoWrap
var ToDoWrap = React.createClass({
    toggleAll: function (e) {
        Action.toggleAllItems(e.target.checked)
    },
    render: function () {
        var list = this.props.list;
        return (
            <section id="main" className={list.length > 0 ? "" : "hidden"}>
                <input id="toggle-all" type="checkbox" onChange={this.toggleAll}/>
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul id="todo-list">
                    {
                        list.map(function (item) {
                            return <ToDoItem label={item.label} isComplete={item.isComplete} id={item.key}
                                             key={item.key}/>
                        })
                    }
                </ul>
            </section>
        )
    }
});

//主入口
var App = React.createClass({
    mixins: [Reflux.connect(Store)],
    getInitialState: function () {
        return {}
    },
    componentWillMount: function () {
        //console.log('componentWillMount',this.state)
    },
    componentDidMount: function () {
        //console.log('componentDidMount',this.state)
    },
    render: function () {
        return (
            <div>
                <ToDoHeader />
                <ToDoWrap list={this.state.list}/>
            </div>
        )
    }
});

ReactDOM.render(<App />, document.getElementById("app_container"));
