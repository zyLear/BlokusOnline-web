//获取值
//生成列表
//获取选择 给输入框赋值
//ver 1.1


var SelecterInit = function () {

    var iSelecter = new Object();
    iSelecter.init = function (params, requeyCallbak) {
        //生成弹窗
        var input = $("" + params);
        iSelecter.input = input;
        input.after("<div class='q-dropdown-select s-hide'></div>");
        var selecter = $(".q-dropdown-select");
        $(document).click(function () {
            iSelecter.hide();
        });


        //监听 输入框数字改变
        iSelecter.input.keyup(function () {

            if ($("#need-select").val() == "") {
                //隐藏
                iSelecter.hide();
            } else {
                //do some query..
                if (typeof requeyCallbak == 'function') {
                    requeyCallbak(iSelecter.input.val());
                }

            }

        });

    };

    iSelecter.showOutSide = function (data) {
        //赋值
        iSelecter.fresh(data);
        //展示
        iSelecter.show();
    };

    iSelecter.show = function () {
        $(".q-dropdown-select").removeClass("s-hide").addClass('s-show');
    };
    iSelecter.hide = function () {
        $(".q-dropdown-select").removeClass("s-show").addClass('s-hide');
    };
    iSelecter.fresh = function (data) {
        $(".q-dropdown-select").empty();
        var array = data;
        var outerHTML = "<ol>";
        for (var i = 0; i < array.length; i++) {
            var ele = "" + array[i].wechatAccount +
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                array[i].nickName;
            outerHTML += "<li ><span data-obj=" + JSON.stringify(array[i]) + " onclick=SelecterInit.clickItem('" + array[i].wechatAccount + "')>" + ele + "</span></li>";


        }
        outerHTML += "</ol>";
        //生成弹窗
        $(".q-dropdown-select").append(outerHTML);

    };

    SelecterInit.clickItem = function (wechatAccount) {
        iSelecter.input.focus();
        iSelecter.input.val(wechatAccount);
        iSelecter.hide();
    };


    return iSelecter;
};