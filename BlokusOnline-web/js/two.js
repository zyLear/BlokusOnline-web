var chessa = new Chess(1, new Array(1), 2, 3);

function rotation() {

    var i = (chessa.rotationFlag++ * 90);
    if (chessa.rotationFlag >= 4) {
        chessa.rotationFlag = 0;
    }
    // alert($('#ccc').css('transform'));
    $('#ccc').css('-webkit-transform', 'rotate(' + i + 'deg)');
}