'use strict';

angular.module('core').service('menu1Service', ['$log', function menu1Service($log) {
    var _selectedTab = 'home';
    var _state = 'show';
    var _loggedUser = {};

    function _updateSelectedTab(type) {
        // $log.log("updateSelectedTab: " + type);
        return _selectedTab = type;
    }

    function _getSelectedTab() {
        // $log.log("getSelectedTab: " + _selectedTab);
        return _selectedTab;
    }

    function _updateState(val) {
        // $log.log("updateState: " + val);
        return _state = val;
    }

    function _getState() {
        // $log.log("getState: " + _state);
        return _state;
    }

    function _updateLoggedUser(u) {
        $log.log("updateLoggedUser: " + u);
        $log.log("service-id: " + u.id);
        return _loggedUser = u;
    }

    function _getLoggedUser() {
        $log.log("getLoggedUser: " + _loggedUser);
        return _loggedUser;
    }

    return {
        updateSelectedTab: _updateSelectedTab,
        getSelectedTab: _getSelectedTab,
        updateState: _updateState,
        getState: _getState,
        updateLoggedUser: _updateLoggedUser,
        getLoggedUser: _getLoggedUser
    }
}]);