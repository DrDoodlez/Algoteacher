define([
    "jQuery",
    "lodash"
], function(
    $,
    _
) {
    "use strict";
    class Statistic {
        constructor() {
            this.goodAnswer = 0;
            this.wrongAnswer = 0;
            this.currentWrongAnswers = 0;
            this.questionNumber = 0;
        }

        newQuestion() {
            this.questionNumber++;
            this.refreshWrongAnswerSerias();
        }

        refreshWrongAnswerSerias() {
            this.currentWrongAnswers = 0;
        }

        addGoodAnswer() {
            this.goodAnswer++;
            this.refreshWrongAnswerSerias();
        }

        addWrongAnswer() {
            this.wrongAnswer++;
            this.currentWrongAnswers++;
        }

        // FOR TEST Need more cool logic
        wrongAnswers() {
            return this.currentWrongAnswers;
        }

        logStatistics() {
            console.log("goodAnswer: " + this.goodAnswer);
            console.log("wrongAnswer: " + this.wrongAnswer)
            console.log("currentWrongAnswers: " + this.currentWrongAnswers)
            console.log("questionNumber: " + this.questionNumber)
        }

    }

    return Statistic;
});
