angular.module('QuizApp', [])
    .controller('QuizCtrl', function ($scope, $http, $window) {
        $scope.answered = false;
        $scope.title = "loading question...";
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


        $scope.answer = function () {
            return $scope.correctAnswer ? 'Correct' : 'Incorrect';
        };

        $scope.checkQuestions = function () {
            $scope.disabled = true;
            

            if ($scope.numQuestions == 0) {
                $scope.tryAgain = "";
                $scope.options = [];
                $scope.title = "End";

                if($scope.score >= 4){
                    $scope.badgeResult = "pass";
                    $scope.title = "Well done! You passed.";
                } else {
                    $scope.badgeResult = "fail";
                    $scope.title = "Uh oh! Looks like you need more practise.";
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
                $scope.title = "Oops... something went wrong inside http.get nextFunction()";
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
                $scope.checkQuestions();
            } else if (option.IsCorrect == false && $scope.attempt < 1) {
                $scope.answered = false;
                $scope.disabled = false;
                $scope.attempt++;
                $scope.correctAnswer = false;
                $scope.tryAgain = "| Try 1 more time!";
            } else {
                $scope.correctAnswer = false;
                $scope.checkQuestions();
            }
        }


        $scope.getRightAnswer = function () {
            //TO:DO Get the correct answer for the current question
            //and display the answer to users who get it wrong
        }








        $scope.sendAnswer = function (result) {
            $scope.disabled = true;
            $scope.answered = true;

            //Users token;
            $scope.token = token;
            //Our API key
            $scope.apiKey = apiKey;

            //iDEA API, production
            //$scope.postUrl = "https://api.idea.org.uk/result?apiKey=" + $scope.apiKey + "&token=" + $scope.token;

            //iDEA API, sandbox
            $scope.postUrl = "http://api-sandbox.idea.org.uk/result?apiKey=" + $scope.apiKey + "&token=" + $scope.token;

            //Placeholder 
            $window.location = "http://microbitquiz.azurewebsites.net?result=" + result;

            //$location.path(url);

            //Send badge result to iDEA API
            //$http.post($scope.postUrl, {"result": result}).success(function (data, status, headers, config) {
            //    $scope.disabled = false;
            //    //redirect to iDEA
            //    $window.location = data.redirectUrl;
            //}).error(function (data, status, headers, config) {
            //    $scope.title = "Oops... something went wrong in htttp.post sendAnswer()";
            //    $scope.disabled = false;
            //});
        };

    });

