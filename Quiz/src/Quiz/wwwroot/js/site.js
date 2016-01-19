var app = angular.module('QuizApp', [])
    .controller('QuizCtrl', function ($scope, $http, $window, $timeout) {

        app.config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            delete $httpProvider.defaults.headers.common['x-csrftoken'];
            $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
            $httpProvider.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        }]);

        $scope.answered = false;
        $scope.title = "Loading question...";
        $scope.options = [];
        $scope.correctAnswer = false;
        $scope.disabled = false;



        $scope.counter = 0;
        $scope.numQuestions = 5;
        $scope.score = 0;
        $scope.attempt = 0;
        $scope.badgeResult = "";
        $scope.answerHidden = true;
        $scope.tryAgain = "";
        $scope.rightAnswer = "";
        $scope.answerDisabled = true;
        $scope.redirected = "";


        $scope.answer = function () {
            return $scope.correctAnswer ? 'Correct' : 'Incorrect';
        };


        $scope.checkQuestions = function () {
            $scope.disabled = true;


            if ($scope.numQuestions == 0) {
                $scope.tryAgain = "";
                $scope.options = [];
                $scope.title = "End";

                if ($scope.score >= 4) {
                    $scope.badgeResult = "pass";
                    $scope.title = "Well done! You passed."
                    $scope.redirected = "You will be redirect to iDEA.";
                } else {
                    $scope.badgeResult = "fail";
                    $scope.title = "Uh oh, looks like you didn't pass! You need to successfully pass the quiz to achieve the badge.";
                    $scope.redirected = "You will be redirect to iDEA - go on give it another go!";
                }
                $scope.answerHidden = true;
                $scope.sendAnswer($scope.badgeResult);

            } else {
                return $scope.nextQuestion();
            }

            $scope.disabled = false;
        }


        $scope.nextQuestion = function () {
            $scope.tryAgain = "";
            $scope.disabled = true;

            $scope.answered = false;
            $scope.title = "Loading question...";
            $scope.options = [];
            $scope.question = [];

            $http.get("http://cors.io/?u=http://quizapi.azurewebsites.net/api/TriviaQuestions?name=" + quizName).success(function (data, status, headers, config) {
                $scope.question = data[$scope.counter];
                $scope.options = $scope.question.Options;
                $scope.title = $scope.question.Title;

                $scope.answered = false;
                $scope.disabled = false;
                $scope.numQuestions--;
                $scope.counter++;
                $scope.attempt = 0;
            }).error(function (data, status, headers, config) {
                $scope.title = "Oops... something went wrong inside: http.get nextQunction()";
                $scope.disabled = false;
            });
        };


        $scope.checkAnswer = function (option) {
            $scope.disabled = true;
            $scope.answered = true;
            $scope.answerHidden = false;

            if (option.IsCorrect == true) {
                $scope.score++;
                $scope.correctAnswer = true;
                $scope.answerDisabled = true;
                $scope.checkQuestions();
            } else if (option.IsCorrect == false && $scope.attempt < 1) {
                $scope.answered = false;
                $scope.disabled = false;
                $scope.attempt++;
                $scope.correctAnswer = false;
                $scope.tryAgain = "| Try 1 more time!";
            } else {
                $scope.correctAnswer = false;
                $scope.answerDisabled = false;
                $scope.getRightAnswer();
                $scope.checkQuestions();
            }
        }


        $scope.getRightAnswer = function () {
            angular.forEach($scope.options, function (option) {
                if (option.IsCorrect === true) {
                    $scope.rightAnswer = "The correct answer was: " + option.Title;
                    return;
                }
            });
        }


        $scope.sendAnswer = function (result) {
            $scope.disabled = true;
            $scope.answered = true;

            $scope.token = token;
            $scope.apiKey = apiKey;

            //iDEA API, production
            //$scope.postUrl = "https://api.idea.org.uk/api/result?apiKey=" + $scope.apiKey + "&token=" + $scope.token;

            //iDEA API, sandbox
            $scope.postUrl = "http://40.127.184.66/api/result?apiKey=" + $scope.apiKey + "&token=" + $scope.token;



            $http({
                method: 'POST',
                url: $scope.postUrl,
                data: "result=" + result,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data) {
                $timeout(function () {
                    $window.location = data.redirectUrl;
                }, 3000);
            }).error(function () {
                $scope.title = "Oops... something went wrong inside: http.post sendAnswer()";
                $scope.disabled = false;
            });

        };

    });