(function() {
    'use strict';

    angular
        .module('javaBlogApp')
        .controller('EntryDetailController', EntryDetailController);

    EntryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Entry', 'Blog', 'User'];

    function EntryDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Entry, Blog, User) {
        var vm = this;

        vm.entry = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('javaBlogApp:entryUpdate', function(event, result) {
            vm.entry = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
