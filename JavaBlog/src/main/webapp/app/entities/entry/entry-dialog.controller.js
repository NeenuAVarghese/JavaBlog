(function() {
    'use strict';

    angular
        .module('javaBlogApp')
        .controller('EntryDialogController', EntryDialogController);

    EntryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Entry', 'Blog', 'User'];

    function EntryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Entry, Blog, User) {
        var vm = this;

        vm.entry = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.blogs = Blog.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.entry.id !== null) {
                Entry.update(vm.entry, onSaveSuccess, onSaveError);
            } else {
                Entry.save(vm.entry, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('javaBlogApp:entryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
