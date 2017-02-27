/**
 * Created by dxb on 15-9-22.
 */
;(function($,undefined)
{
    $.fn.multiselect = function(method){
        if($.fn.multiselect.methods[method]){
            return $.fn.multiselect.methods[method].apply(this, Array.prototype.slice.call(arguments,1));
        }else if(typeof method == "object" || !method){
            return $.fn.multiselect.methods.init.apply(this,arguments);
        }else{
            $.error( 'Method ' +  method + ' does not exist on jQuery.multiselect' );
        }
    };

    $.fn.multiselect.methods ={
        init: function(options){
            var options = $.extend({}, $.fn.multiselect.default,options);

            return this.each(function(){
                var el = $(this);
                var msDivHtml = "<div class='ms2side_div'>" +
                                    "<div class='ms2side_select'>" +
                                        "<select title='"+options.labelsx+"' size='5' multiple='multiple'></select>"+
                                    "</div>"+
                                    "<div class='ms2side_options'>" +
                                        "<p class='AddOne' title='增加选择项'>&rsaquo;</p>"+
                                        "<p class='AddAll' title='增加所有可选项'>&raquo;</p>"+
                                        "<p class='RemoveOne' title='移除选择项'>&lsaquo;</p>" +
                                        "<p class='RemoveAll' title='移除所有已选项'>&laquo;</p>"+
                                    "</div>"+
                                    "<div class='ms2side_select'>" +
                                        "<select title='"+options.labeldx+"' size='5' multiple='multiple'></select>"+
                                    "</div>"+
                                "</div>";
                el.after(msDivHtml).hide();

                var allSel = el.next().children(".ms2side_select").children("select");
                var leftSel = allSel.eq(0);
                var rightSel =allSel.eq(1);

                for(var i in options.data){
                    var opt = options.data[i];
                    var optStr = "<option value='"+ opt.value +"'>"+ opt.name +"</option>";
                    opt.selected ? rightSel.append(optStr) : leftSel.append(optStr);
                }

                leftSel.dblclick(function(){
                    $(this).find("option:selected").each(function(){
                       $(this).remove().appendTo(rightSel).prop("selected","");
                    });
                });

                rightSel.dblclick(function(){
                    $(this).find("option:selected").each(function(){
                        $(this).remove().appendTo(leftSel).prop("selected","");
                    });
                });

                $(this).next().find('.ms2side_options').children().click(function(){
                    if ($(this).hasClass("AddOne")) {
                        leftSel.find("option:selected").each(function(){
                            $(this).remove().appendTo(rightSel).prop("selected","");
                        });
                    }else if ($(this).hasClass("AddAll")) {	// All SELECTED
                        leftSel.children().each(function(){
                            $(this).remove().appendTo(rightSel).prop("selected","");
                        });
                    }else if($(this).hasClass("RemoveOne")){
                        rightSel.find("option:selected").each(function(){
                            $(this).remove().appendTo(leftSel).prop("selected","");
                        });
                    }else if ($(this).hasClass("RemoveAll")) {	// All Removed
                        rightSel.children().each(function(){
                            $(this).remove().appendTo(leftSel).prop("selected","");
                        });
                    }
                });
            });
        },
        //增加下拉项，selected默认为false，加到左边；
        addOption:function(options){
            var optDefault = {
                name : "",
                value : "",
                selected : false
            };

            return this.each(function(){
               var el = $(this);
               if(options)
                   var opt = $.extend({},optDefault,options);

               var optStr = "<option value='"+ opt.value +"'>"+ opt.name +"</option>";

               var allSel = el.next().children(".ms2side_select").children("select");
               var leftSel = allSel.eq(0);
               var rightSel =allSel.eq(1);

                opt.selected ? rightSel.append(optStr) : leftSel.append(optStr);
            });
        },
        //获取右边select中的所有value值
        getSelectedValues : function(){
            var selectedVal = [];
            var	el = $(this);
            var data = el.data('multiselect2side');
            var allSel = el.next().children(".ms2side_select").children("select");
            var	rightSel = allSel.eq(1);
            $('option',rightSel).each(function(){
                selectedVal.push($(this).val());
            });

            return selectedVal;
        }
    };

    $.fn.multiselect.default = {
        labelsx: '可选项',
        labeldx: '已选项',
        data:[]
    };
})(jQuery);