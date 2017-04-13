define([
    "jQuery",
    "lodash",
    "drop"
], function(
    $,
    _,
    drop
) {
    "use strict";

    var DEFAULT_OPTIONS = {
        position: "bottom center",
        remove: true,
        openOn: undefined,
        classes: "drop-theme-arrows"
    };

    class PopupManager {
        constructor() {

        }

        //event.target
        openPopup(target, content) {
            if (this.activePopup) {
                //$(".drop").remove();
                this.closePopup();
                return;
            }
            this.activePopup = this._createPopup(content, target);
            this.activePopup.open();
            return;
        }

        _createPopup(content, target, options) {
            if (content && target) {
                options = options || {};
                options.content = content;
                options.target = target;
                options = _.extend(_.clone(DEFAULT_OPTIONS), options);

                // Create Tether element
                var popover = new drop(options);
                return popover;
            } else {
                console.warn("Tried to open popover with insufficient parameters.");
            }
        }

        closePopup(event) {
            this.activePopup.close(event);
            this.activePopup.remove();
            this.activePopup = null;
            $(document).find(".drop").remove();
        }

        getElement() {
            if (this.activePopup) {
                return $(this.activePopup.drop);
            }
        }

        isOpen() {
            return !!this.activePopup;
        }

        // getPopupInput() {
        //     var input = $(this.activePopup.drop).find("input");
        //     // TODO: Расширить текс!!!
        //     var attentionText = $(this.activePopup.drop).find(".question-input_attention");
        //     var self = this;
        //     input.on("change", e => {
        //         var curValue = e.currentTarget.value;
        //         //TODO: Можно использовать метод из rpn Calculate
        //         if (self._campare(curValue, self.calculateNode(node))) {
        //             //TODO: ПРОВЕРИТЬ КАК РАБОТАЕТ ДЛЯ ПРИМЕРОВ
        //             self.changeNode(node, curValue);
        //             self.activePopup.close();
        //             self.activePopup.remove();
        //             self.activePopup = null;
        //             self.statistic.addGoodAnswer();
        //         } else {
        //             self.statistic.addWrongAnswer();
        //             attentionText.show();
        //             input.val("");
        //         }
        //         self._updateDebagStatistic();
        //     });
        // }

    }

    return PopupManager;
});
