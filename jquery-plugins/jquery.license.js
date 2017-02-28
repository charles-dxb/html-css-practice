/**
 * Created by dxb on 15-11-17.
 */
;(function($,undefined)
{
    $.fn.license = function(method){
        if($.fn.license.methods[method]){
            return $.fn.license.methods[method].apply(this, Array.prototype.slice.call(arguments,1));
        }else if(typeof method == "object" || !method){
            return $.fn.license.methods.init.apply(this,arguments);
        }else{
            $.error( 'Method ' +  method + ' does not exist on jQuery.license' );
        }
    };

    $.fn.license.methods ={
        init: function(options){
            var options = $.extend({}, $.fn.license.default,options);
            $.fn.license.options = options;

            return this.each(function(){
                var el = $(this);
                var msDivHtml = "<input class='inputCls form-control input-seq' id='oneSeq'/>"+
                    "<span>"+options.separator+"</span>"+
                    "<input class='inputCls form-control input-seq' id='twoSeq'/>"+
                    "<span>"+options.separator+"</span>"+
                    "<input class='inputCls form-control input-seq' id='threeSeq'/>"+
                    "<span>"+options.separator+"</span>"+
                    "<input class='inputCls form-control input-seq' id='fourSeq'/>";
                el.after(msDivHtml).hide();

                $(".inputCls").keydown(function(event){
                    var code = event.keyCode;

                    // 除了数字键、删除键、左右方向键之外全部不允许输入
                    //最后一个输入框时满足输入长度后不能再输入
                    if((code < 48 && 8 != code && 37 != code && 39 != code)
                        || (code > 57 && code < 96)
                        || (code > 105) || $(this).val().length > options.length-1)
                    {
                        return false;
                    }
                });

                $(".inputCls").keyup(function(event){
                    if($(this).val().length > options.length-1){
                        $(this).nextAll("input[class*=inputCls]").first().focus();
                    }
                });
            });
        },
        getValue:function(){
            return $("#oneSeq").val()+$.fn.license.options.separator+
                   $("#twoSeq").val()+$.fn.license.options.separator+
                   $("#threeSeq").val()+$.fn.license.options.separator+
                   $("#fourSeq").val();
        }
    };

    $.fn.license.default = {
        separator: '-',
        length: 4
    };
})(jQuery);