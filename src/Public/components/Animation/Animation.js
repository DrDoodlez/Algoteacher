// $(document).ready(function() {
//   $.fn.animate_text = function() {
//       var string = this.text();
//       return this.each(function() {
//           var $this = $(this);
//           $this.html(string.replace(/./g, '<span class="new">$&</span>'));
//           $this.find('span.new').each(function(i, el){
//               setTimeout(function(){ $(el).addClass('div_opacity'); }, 10 * i);
//           });
//       });
//   };
//   $("#div1").show();
//   $("#div1").animate_text();
// });

define(
    'Animation',
    function(require) {

        function elementOpacity($name) {
            $name.css({opacity:0});
            $name.fadeTo(5000, 1);
        };

        function animateQuery(query, animateFunc) {
            _.each(query, function(element, i) {
                _.delay(function() {
                    animateFunc($(element));
                }, 1000 * i);
            });
        };

        var Animation = {
            animateElementOpacity: function($name) {
                elementOpacity($name);
            },
            animateQueryOpacity: function(query) {
                animateQuery(query, elementOpacity);
            }
        };

        return Animation;
    }
);