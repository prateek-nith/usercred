/**
 * Created by Prateek on 04/01/17.
 */
var app = angular.module("user", ['ngMaterial', 'ngMessages']);
app.controller('userCtrl', function ($scope, $mdToast) {
    var db = {};
    var resetAll = function () {
        $scope.user = {
            email: "",
            password: "",
            newPassword: "",
            confirmPassword: "",
            newEmail: ""
        }
        $scope.currentNavItem = 'login';
        $scope.passwordAlert = false;
        $scope.confirmPasswordAlert = false;
        $scope.signupDivValue = false;
        $scope.loginDivValue = true;
    };

    resetAll();
    $scope.goto = function (type) {
        if (type == "1") {
            $scope.signupDivValue = false;
            $scope.loginDivValue = true;
        }
        else {
            $scope.signupDivValue = true;
            $scope.loginDivValue = false;
        }
    };

    $scope.confirmPasswordChange = function () {
        confirmPasswordFunc();
    };

    var confirmPasswordFunc = function () {
        if ($scope.user.newPassword == $scope.user.confirmPassword) {
            $scope.confirmPasswordAlert = false;
        }
        else {
            $scope.confirmPasswordAlert = true;
        }
    }

    $scope.submitSignUp = function () {
        var nameRegex = new RegExp("^flexiple_([a-z_]*$)");
        var emailRegex = new RegExp("^[a-zA-z0-9_.]+@[a-zA-z]+.in$");
        var passwordRegex = new RegExp("(?=^.{4,8}$)(?=^[^A-Z]*([A-Z][^A-Z]*){2}$)(?=^[^!@#$%^&*()_+]*([!@#$%^&*()_+][^!@#$%^&*()_+]*){2}$)");
        if (nameRegex.test($scope.user.name) && emailRegex.test($scope.user.newEmail)
            && passwordRegex.test($scope.user.newPassword) && $scope.user.newPassword == $scope.user.confirmPassword) {
            var dataToSubmit = {
                email: $scope.user.newEmail,
                name: $scope.user.name,
                password: $scope.user.newPassword,
                token: randomId(10)
            };
            /**
             * Submit this dataToSubmit to API and write the corresponding function
             * in .then() of the promise
             */
            if (db[dataToSubmit.email] == null || typeof db[dataToSubmit.email] == 'undefined') {
                db[dataToSubmit.email] = dataToSubmit;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Data submited successfully')
                        .position(getToastPosition())
                        .hideDelay(3000)
                );
                setTimeout(function () {
                    resetAll();
                }, 1500);
            }
            else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('User with this email already exists')
                        .position(getToastPosition())
                        .hideDelay(3000)
                );
            }
        }
        else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Please enter correct details')
                    .position(getToastPosition())
                    .hideDelay(3000)
            );
        }
    };

    $scope.submitLogIn = function () {
        var dataToSubmit = {
            email: $scope.user.email,
            password: $scope.user.password
        };
        /**
         * Submit this dataToSubmit to API and write the corresponding function
         * in .then() of the promise
         */
        var user = db[dataToSubmit.email];
        if (dataToSubmit.password == user.password) {
            var newToken = randomId(10);
            db[dataToSubmit.email].token = newToken;
            setCookie(dataToSubmit.email, newToken, 60 * 1000);
            window.location = "/userCred/home.html?email=" + dataToSubmit.email + "&token=" + newToken;
        }
        else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Invalid email or password')
                    .position(getToastPosition())
                    .hideDelay(3000)
            );
        }
    }

    var getToastPosition = function () {
        var position = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        var obj = angular.extend({}, position);

        return Object.keys(obj)
            .filter(function (pos) {
                return obj[pos];
            })
            .join(' ');
    }

    function setCookie(key, value, millis) {
        var current = new Date();
        current.setTime(current.getTime() + millis);
        var expiry = "expires="+ current.toUTCString();
        document.cookie = key + "=" + value + ";" + expiry + ";path=/userCred/home.html";
    }

    function randomId(count) {
        var id = "";
        var store = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < count; i++) {
            id += store.charAt(Math.floor(Math.random() * store.length));
        }
        return id;
    }

})