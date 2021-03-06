var React = require('react');
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/users_api_util');

var UserShow = React.createClass({
  getInitialState: function() {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      user: UsersStore.findUserById(parseInt(this.props.params.id))
    };
  },

  componentDidMount: function() {
    this.listener = UsersStore.addListener(this._onChange);
    UsersApiUtil.fetchUser(this.props.params.id);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {
    var user = this.state.user;
    if (!user) {
      return (
        <div>DONT HAVE A USER TO RENDER</div>
      );
    }

    var posts = [];
    if (user) {
      user.posts && user.posts.forEach(function (post) {
        posts.push(
          <li key={post.id}>{ post.title }</li>
        );
      });
    }

    return (
      <div>
        <h1 className="title">UserShow: { user.email }</h1>

        <h3>Users posts:</h3>
        <ul className="users-index">{ posts }</ul>
        <a href={"#/"}>All Users</a>
      </div>
    );
  },

  _onChange: function() {
    this.setState(this.getStateFromStore());
  }
});

module.exports = UserShow;
