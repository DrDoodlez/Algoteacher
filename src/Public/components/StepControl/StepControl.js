define(
    'StepControl',
    function(require) {

        var StepControl = function(elements){
            this._curentStep = 0;
            this._length = elements.length;
            this._init();
            this._createLayout(elements);
        };

        StepControl.prototype._init = function(){
            this.nextButton = $("<button class = 'step-control__next-button' >Следующий шаг</button>");
            this.resetButton = $("<button class = 'step-control__reset-button' >Сначала</button>");
            this.stepControlBlock = $("<div class = 'step-control__container'> </div>");
             _.bindAll(this, "showStepHandler", "resetHandler");
        };
    
        StepControl.prototype._createLayout = function (elements) {
            var stepNumber = 0;
            var self = this;
            _.each(elements, function(el) {
                var step = $("<div class = 'step-control__item' data-step='"+ stepNumber+ "' style='visibility:hidden'> </div>");
                step.append(el)
                stepNumber++;
                self.stepControlBlock.append(step);
            });
           
            this.nextButton.on("click", this.showStepHandler);
            this.resetButton.on("click", this.resetHandler);
            this.stepControlBlock.append(this.nextButton);
            this.stepControlBlock.append(this.resetButton);

            this._layout = this.stepControlBlock;
        };

        StepControl.prototype.showStepHandler = function () {
            //var nextStep = this._layout.find(".step-control__item [data-step='" + (this._curentStep + 1) + "']")[0];
            var nextStep = this._layout.find(".step-control__item")[(this._curentStep + 1)];
            nextStep.style.visibility = "visible";
            this._curentStep ++;
            if (this._curentStep == this._length) {
                this.nextButton.disabled = true;
            }
            this.resetButton.disabled = false;
        };

        StepControl.prototype.resetHandler = function () {
            var steps = this._layout.find(".step-control__item");
            _.each(steps, function(step) {
                step.style.visibility = "hidden"
            });
            steps[0].style.visibility = "visible";
            this._curentStep = 0;
            this.nextButton.disabled = false;    
            this.resetButton.disabled = true;
        };

        StepControl.prototype.layout = function() {
            return this._layout;
        };

        return StepControl;
    }
);