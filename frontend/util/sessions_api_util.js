var CurrentUserActions = require("./../actions/current_user_actions");
var SessionsApiUtil = {
  login: function (credentials, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials.user, // {email: "tommy...", password: "14.."}
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
      }

    });
  },

  logout: function (callback) {
    $.ajax({
      url: '/api/session',
      type: 'delete',
      dataType: 'json',
      success: function () {
        CurrentUserActions.removeCurrentUser();
        console.log("logged out");
        callback && callback();
      },
      error: function (data) {

      }
    });
  },

  fetchCurrentUser: function (cb) {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        cb && cb(currentUser);
      }
    });
  }


};

module.exports = SessionsApiUtil;