(function() {
    'use strict';

    angular
        .module('javaBlogApp')
        .controller('VoteUpController', VoteUpController);

    VoteUpController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Post', 'Blog'];
   
    function VoteUpController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Post, Blog) {
        var vm = this;

        vm.post = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.blogs = Blog.query();

        
        
        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
        	save();
        }
        
        

        function save () {
            vm.isSaving = true;
            if (vm.post.id !== null) {
                Post.update(vm.post, onSaveSuccess, onSaveError);
            } else {
                Post.save(vm.post, onSaveSuccess, onSaveError);
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