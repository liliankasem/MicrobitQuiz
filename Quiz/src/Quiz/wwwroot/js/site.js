angular.module('QuizApp', [])
    .controller('QuizCtrl', function ($scope, $http) {
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




        $scope.answer = function () {
            return $scope.correctAnswer ? 'correct' : 'incorrect';
        };

        $scope.checkQuestions = function () {
            $scope.disabled = true;

            if ($scope.numQuestions == 0) {
                
                $scope.options = [];
                $scope.title = "End";

                if($scope.score >= 4){
                    $scope.badgeResult = "pass";
                    $scope.title = "Well done! You passed.";
                } else {
                    $scope.badgeResult = "fail";
                    $scope.title = "Uh oh! Looks like you need more practise.";
                }

                $scope.sendAnswer($scope.badgeResult);

            } else {
                return $scope.nextQuestion();
            }

            $scope.disabled = false;
        }

        $scope.nextQuestion = function () {

            $scope.disabled = true;

            $scope.answered = false;
            $scope.title = "loading question...";
            $scope.options = [];
            $scope.question = [];

            $http.get("http://quizapi.azurewebsites.net/api/TriviaQuestions?name=snowflake").success(function (data, status, headers, config) {
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

            if (option.IsCorrect == true) {
                $scope.score++;
                $scope.checkQuestions();
            } else if (option.IsCorrect == false && $scope.attempt < 1) {
                $scope.answered = false;
                $scope.disabled = false;
                $scope.attempt++;
            } else {
                $scope.checkQuestions();
            }
        }











        $scope.sendAnswer = function (result) {
            $scope.disabled = true;
            $scope.answered = true;

            //Send badge result to iDEA API
            $http.post('/api/trivia', { 'questionId': option.questionId, 'optionId': option.id }).success(function (data, status, headers, config) {
                $scope.disabled = false;
            }).error(function (data, status, headers, config) {
                $scope.title = "Oops... something went wrong in htttp.post sendAnswer()";
                $scope.disabled = false;
            });
        };
    });