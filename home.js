/**
 * Created by Prateek on 05/01/17.
 */
var app = angular.module("user", []);
app.controller('homeCtrl', function ($scope) {
    $scope.mainDiv = false;
    var email = getParameterByName("email", window.location.href);
    var linkToken = getParameterByName("token", window.location.href);
    var token = getCookie(email);
    if (token != linkToken) {
        window.location = "/usercred/main.html"
    }
    else {
        $scope.mainDiv = true;
    }

    function getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    function getCookie(key) {
        var name = key + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var decodedCokkieArray = decodedCookie.split(';');
        for(var i = 0; i <decodedCokkieArray.length; i++) {
            var cookie_ = decodedCokkieArray[i];
            while (cookie_.charAt(0) == ' ') {
                cookie_ = cookie_.substring(1);
            }
            if (cookie_.indexOf(name) == 0) {
                return cookie_.substring(name.length, cookie_.length);
            }
        }
        return "";
    }
})