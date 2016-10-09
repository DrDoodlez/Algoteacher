define(
    "StepMatrixControl",
    [
        "underscore",
        "jquery",
    ],
    function(
        _,
        $
    ) {
        var StepMatrixControl = function(elements, matrix1, matrix2) {
            this._currentStep = 0;
            this._length = elements.length;
            this._matrix1 = matrix1;
            this._matrix2 = matrix2;
            this._init();
            this._createLayout(elements);
        };

        StepMatrixControl.prototype._init = function() {
            this.nextButton = $("<button class = 'step-control__next-button' >Следующий шаг</button>");
            this.resetButton = $("<button class = 'step-control__reset-button' >Сначала</button>");
            this.stepControlBlock = $("<div class = 'step-control__container'> </div>");
            _.bindAll(this, "showStepHandler", "resetHandler");
        };

        StepMatrixControl.prototype._createLayout = function(elements) {
            var stepNumber = 0;
            var self = this;
            _.each(elements, function(el) {
                var step = $("<div class = 'step-control__item' data-step='" + stepNumber +
                    "' style='visibility:hidden'> </div>");
                step.append(el);
                stepNumber++;
                self.stepControlBlock.append(step);
            });

            this.nextButton.on("click", this.showStepHandler);
            this.resetButton.on("click", this.resetHandler);
            this.stepControlBlock.append(this.nextButton);
            this.stepControlBlock.append(this.resetButton);

            this._layout = this.stepControlBlock;
        };

        StepMatrixControl.prototype.showStepHandler = function() {
            //var nextStep = this._layout.find(".step-control__item [data-step='" + (this._currentStep + 1) + "']")[0];
            var nextStep = this._layout.find(".step-control__item")[(this._currentStep + 1)];
            if (!nextStep) {
                return;
            }
            nextStep.style.visibility = "visible";
            if ((this._currentStep == 0) || (this._currentStep == this._length - 2)) {
                this._matrix1.highlightRow(0);
                this._matrix2.highlightColumn(1);
            }
            else {
                this._matrix1.resetAll();
                this._matrix2.resetAll();
                this._matrix1.highlightCell(0, this._currentStep - 1);
                this._matrix2.highlightCell(this._currentStep - 1, 1);
            };

            this._currentStep ++;
            if (this._currentStep == this._length) {
                this.nextButton.disabled = true;
            }
            this.resetButton.disabled = false;
        };

        StepMatrixControl.prototype.resetHandler = function() {
            var steps = this._layout.find(".step-control__item");
            _.each(steps, function(step) {
                step.style.visibility = "hidden";
            });
            steps[0].style.visibility = "visible";
            this._currentStep = 0;
            this.nextButton.disabled = false;
            this.resetButton.disabled = true;
            this._matrix1.resetAll();
            this._matrix2.resetAll();
        };

        StepMatrixControl.prototype.layout = function() {
            return this._layout;
        };

        return StepMatrixControl;
    }
);
