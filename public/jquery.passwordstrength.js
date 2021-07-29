(function ($) {
    var calculator = new function() {
        this.countRegexp = function(val, rex) {
            var match = val.match(rex);
            return match ? match.length : 0;
        }

        this.getStrength = function(val, minLength) {
            var len = val.length;

            // To short
            if (len < minLength) {
                return 0;
            }

            // Count each of our character types
            var nums     = this.countRegexp(val, /\d/g),
                lowers   = this.countRegexp(val, /[a-z]/g),
                uppers   = this.countRegexp(val, /[A-Z]/g),
                specials = len - nums - lowers - uppers;

            // A single type of character
            if (nums == len || lowers == len || uppers == len || specials == len) {
                return 1;
            }

            // Build a strength rating by weighting our types
            var strength = 0;
            if (nums)     { strength += 2; }
            if (lowers)   { strength += uppers ? 4 : 3; }
            if (uppers)   { strength += lowers ? 4 : 3; }
            if (specials) { strength += 5; }
            if (len > 12) { strength += 5; }

            return strength;
        }

        this.getStrengthLevel = function(val, minLength) {
            var strength = this.getStrength(val, minLength);
            if (strength <= 4) { return 'weak'; }
            if (strength <= 12) { return 'good'; }
            if (strength > 12) { return 'strong'; }
            return 'error';
        }
    }

    $.fn.passwordstrength = function (options) {
        var settings = $.extend({
            minLength : 8
        }, options);

        return this.each(function () {
            $(this).bind('change keyup', function () {
                var level, val = $(this).val();
                $('.password-strength').hide();
                if (val.length > 0) {
                    level = calculator.getStrengthLevel(val, settings.minLength);
                    $('#password-' + level).show();
                }
            });
        });
    };

})(jQuery);