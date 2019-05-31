//$("#header").load("header.html")
//$("#footer").load("footer.html")
$('.phases').load('part1.html')

$(document).ready(function () {

    $('.noncout').load('part2.html', function () {
        var slider = document.getElementById("myRange1");
        slider.oninput = function () {
            output.innerHTML = this.value;
        }
        slider.disabled = true;
        slider = document.getElementById("myRange2");
        slider.disabled = true;
        slider = document.getElementById("myRange3");
        slider.disabled = true;
        slider = document.getElementById("myRange4");
        slider.disabled = true;
        slider = document.getElementById("myRange5");
        slider.disabled = true;
        slider = document.getElementById("myRange6");
        slider.disabled = true;
        slider = document.getElementById("myRange7");
        slider.disabled = true;
        slider = document.getElementById("myRange8");
        slider.disabled = true;
    })
    refreshData()
    setInterval(function () {
        refreshData()
    }, 5000)
    $('.configure').load('part3.html', function () {


        $('.btnb').click(function () {
            x = $(this).html()
            y = $(this).prev().parent().find('.id').html()
            y = parseInt(y)
            if (x == 'Pulse')
                x = 1
            else if (x == 'Low')
                x = 2
            else
                x = 3
            $.post('/putData', { value: x, rowv: (y + 32) }, function (data) {
                //console.log(data)
                getData3()
                launch_toast()
            })
        })
    })
    $('.btn-addr').click(function () {
        x = $('#addr').val()
        $.post('/getResp', { value: x }, function (data) {
            //console.log(data[0].response)
            $('#resp_here').html(data[0].response)
        })
    })


})

function getData3() {
    $.post('/getData3', function (data) {
        //console.log(data)
        t = 0
        $('#tb_configure tr').each(function () {
            i = 0
            $(this).find('.btnb').each(function () {
                //console.log($(this).html())
                if ($(this).html() == 'ON')
                    $(this).attr('class', 'btnb btn bon')
                if ($(this).html() == 'OFF')
                    $(this).attr('class', 'btnb btn boff')
                if (i + 1 == data[t].status) {
                    $(this).attr('class', 'btnb btn bactive')
                }
                i = i + 1
            })
            t = t + 1
        })
    })
}

function launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
}





function refreshData() {

    $.post('/getData1', (data) => {
        var t = 0, i = 1
        $('#3phase_tb1 tr').each(function () {
            if ($(this)[0].childNodes.length == 11 || $(this)[0].childNodes.length == 7) {
                if (data[t].status == 1) {
                    if ($(this).find('.phase_status').length) {
                        $(this).find('.phase_status').removeClass('phase_inactive')
                    }
                }
                else {
                    if ($(this).find('.phase_status').length) {
                        $(this).find('.phase_status').addClass('phase_inactive')
                    }
                }
                if (t % 3 == 0 && t < 23) {
                    if ($(this).find('.status').length) {
                        if (data[t].status == 1 && data[t + 1].status == 1 && data[t + 2].status == 1) {
                            $(this).find('.status').attr('class', 'status active')
                        } else if (data[t].status == 0 && data[t + 1].status == 0 && data[t + 2].status == 0) {
                            $(this).find('.status').attr('class', 'status inactive')
                        } else {
                            $(this).find('.status').attr('class', 'status trip')
                        }
                    }
                }
                t = t + 1
            }
        })

        $('#3phase_tb2 tr').each(function () {
            if ($(this)[0].childNodes.length == 11 || $(this)[0].childNodes.length == 7) {
                if (data[t].status == 1) {
                    if ($(this).find('.phase_status').length) {
                        $(this).find('.phase_status').removeClass('phase_inactive')
                    }
                }
                else {
                    if ($(this).find('.phase_status').length) {
                        $(this).find('.phase_status').addClass('phase_inactive')
                    }
                }
                if (t % 3 == 0 && t < 23) {
                    if ($(this).find('.status').length) {
                        if (data[t].status == 1 && data[t + 1].status == 1 && data[t + 2].status == 1) {
                            $(this).find('.status').attr('class', 'status active')
                        } else if (data[t].status == 0 && data[t + 1].status == 0 && data[t + 2].status == 0) {
                            $(this).find('.status').attr('class', 'status inactive')
                        } else {
                            $(this).find('.status').attr('class', 'status trip')
                        }
                    }
                }
                t = t + 1
            }
        })

    })


    $.post('/getData2', function (data) {
        t = 0
        $('.slider').each(function () {
            if (data[t].status == 0)
                $(this).attr('value', '1')
            if (data[t].status == 2)
                $(this).attr('value', '2')
            if (data[t].status == 1)
                $(this).attr('value', '3')
            i = 0
            $('.range-img').each(function () {
                if (i == t) {
                    if (data[t].status == 0)
                        $(this).attr('src', './images/bulboff.png')
                    if (data[t].status == 2)
                        $(this).attr('src', './images/partial.jpg')
                    if (data[t].status == 1)
                        $(this).attr('src', './images/bulbon.png')
                }
                i = i + 1
            })
            //./images/bulboff.png
            t = t + 1
        })
    })
    getData3()


}