var btnpress_turn = 0;
var turn = 0;
$(document).ready(function () {
    $("#header").load("header.html", function () {
        $('.btn2').click(function () {
            var str = '/getCSV?loc=' + $('.location-text').html() + '&date=' + $('.refresh-text1').html() + '&time=' + $('.refresh-text2').html();
            // $.get('/getCSV', { loc: $('.location-text').html(), date: $('.refresh-text1').html(), time: $('.refresh-text2').html() }, (data) => {
            //     console.log(data)

            // })
            window.open(str)
        })
        $('.username_here').html('Welcome !  &nbsp&nbsp' + $('.username').html())
        setvisibility()

    })
    $("#footer").load("footer.html")
    $('.phases').load('part1.html')

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
        slider = document.getElementById("myRange21");
        slider.disabled = true;
        slider = document.getElementById("myRange22");
        slider.disabled = true;
        slider = document.getElementById("myRange23");
        slider.disabled = true;
        slider = document.getElementById("myRange24");
        slider.disabled = true;
        slider = document.getElementById("myRange25");
        slider.disabled = true;
        slider = document.getElementById("myRange26");
        slider.disabled = true;
        slider = document.getElementById("myRange27");
        slider.disabled = true;
        slider = document.getElementById("myRange28");
        slider.disabled = true;

        if (window.innerWidth <= 1300) {
            $('.phase1_reshape1').attr('class', 'phase1_reshape1 col-sm-12')
            $('#tb_voltage').css('display', 'none')
            $('#tb_voltage').css('visibility', 'hidden')
            $('.tb_voltage_small_1').css('display', 'block')
            $('.tb_voltage_small_2').css('display', 'block')
            $('.tb_voltage_small_1').css('visibility', 'visible')
            $('.tb_voltage_small_2').css('visibility', 'visible')
        }

    })
    refreshData()
    refreshData()
    setInterval(function () {
        refreshData()
        //console.log("imhere--")
    }, 3000)
    $('.configure').load('part3.html', function () {


        $('.btnb').click(function () {
            x = $(this).find('.light').html()
            y = $(this).prev().parent().find('.id_number').html()
            y = parseInt(y)
            if (x == 'Trigger')
                x = 1
            else if (x == 'ON')
                x = 2
            else
                x = 3
            $.post('/putData', { value: x, rowv: y, loc: $('.location-text').html() }, function (data) {
                getData3()
                launch_toast()
            })
        })
    })
    $('.btn-addr').click(function () {
        x = $('#addr').val()
        id_addr = $('#id_addr').val()
        length_addr = $('#length_addr').val()
        $.post('/getResp', { value: x, id: id_addr, length: length_addr }, function (data) {
            //console.log(data)
            if (data.length > 0) {
                $('#resp_here').html(data[0].response)
                $('#resp_here').attr('class', '')
            }
            else {
                $('#resp_here').html("Address Not Found!")
                $('#resp_here').attr('class', 'textarea-danger')
            }
        })
    })

    $.get('/getLocations', function (data) {
        for (t = 0; t < data.length; t++) {
            $('.drpmn').append("<li class='drpmnli'>" + data[t].location + "</li>")
        }
        $('.location-text').html(data[0].location)
        $('.drpmnli').click(function () {
            $('.location-text').html($(this).text().toUpperCase())
        })
        setTimeout(() => { refreshData() }, 200);
    })

    function mediaquery(x) {
        if (x.matches || window.innerWidth <= 1300) {
            $('.phase1_reshape1').attr('class', 'phase1_reshape1 col-sm-12')
            $('#tb_voltage').css('display', 'none')
            $('#tb_voltage').css('visibility', 'hidden')
            $('.tb_voltage_small_1').css('display', 'block')
            $('.tb_voltage_small_2').css('display', 'block')
            $('.tb_voltage_small_1').css('visibility', 'visible')
            $('.tb_voltage_small_2').css('visibility', 'visible')
        } else {
            $('.phase1_reshape1').attr('class', 'phase1_reshape1 col-sm-6')
            $('#tb_voltage').css('display', 'block')
            $('#tb_voltage').css('visibility', 'visible')
            $('.tb_voltage_small_1').css('display', 'none')
            $('.tb_voltage_small_2').css('display', 'none')
            $('.tb_voltage_small_1').css('visibility', 'hidden')
            $('.tb_voltage_small_2').css('visibility', 'hidden')

        }
    }

    var x = window.matchMedia("(max-width: 1300px)")
    mediaquery(x)
    x.addListener(mediaquery)

})

//==========================================================

function getData3() {
    $.post('/getData3', { loc: $('.location-text').html() }, function (data) {
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
                if ($(this).html() == 'Trigger')
                    $(this).attr('class', 'btnb btn btrigger')
                $(this).find('.light').each(function () {
                    $(this).attr('class', 'light lightoff')
                })
                if (i + 1 == data[t].status) {
                    $(this).find('.light').each(function () {
                        $(this).attr('class', 'light lighton')
                    })
                }
                i = i + 1
            })
            if ($(this).find('.labeldb').length) {
                $(this).find('.labeldb').html(data[t].label)
                //console.log($(this).find('.labeldb').html())
            }
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
    getData3()

    $.post('/getData1', { loc: $('.location-text').html() }, (data) => {
        var t = 0, i = 1
        //console.log(data)
        $('#3phase_tb1 tr').each(function () {
            if ($(this)[0].childNodes.length == 13 || $(this)[0].childNodes.length == 9) {
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
                if ($(this).find('.labeldb').length) {
                    $(this).find('.labeldb').html(data[t].label)
                    //console.log($(this).find('.labeldb').html())
                }
                t = t + 1
            }
        })

        $('#3phase_tb2 tr').each(function () {
            if ($(this)[0].childNodes.length == 13 || $(this)[0].childNodes.length == 9) {
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
                if ($(this).find('.labeldb').length) {
                    $(this).find('.labeldb').html(data[t].label)
                    //console.log($(this).find('.labeldb').html())
                }
                t = t + 1
            }
        })

    })


    $.post('/getData2', { loc: $('.location-text').html() }, function (data) {
        t = 0
        $('.slider').each(function () {
            if (data[t].status == 0) {
                $(this).attr('value', '1')
                $(this).attr('class', 'slider slider_black')
            }
            if (data[t].status == 2) {
                $(this).attr('value', '2')
                $(this).attr('class', 'slider slider_partial')
            }
            if (data[t].status == 1) {
                $(this).attr('value', '3')
                $(this).attr('class', 'slider slider_green')
            }
            $(this).text($(this).val())
            //console.log($(this).val())
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
        t = 0
        $('.labeldb2').each(function () {
            $(this).html(data[t].label)
            t = t + 1
        })
    })
    var cur_timestamp;
    $.post('/getData2', { loc: $('.location-text').html() }, function (data) {
        t = 0
        $('.slider1').each(function () {
            if (data[t].status == 0) {
                $(this).attr('value', '1')
                $(this).attr('class', 'slider1 slider_black')
            }
            if (data[t].status == 2) {
                $(this).attr('value', '2')
                $(this).attr('class', 'slider1 slider_partial')
            }
            if (data[t].status == 1) {
                $(this).attr('value', '3')
                $(this).attr('class', 'slider1 slider_green')
            }
            $(this).text($(this).val())
            //console.log($(this).val())
            i = 0
            $('.range-img1').each(function () {
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
            t = t + 1
        })
        t = 0
        $('.labeldb21').each(function () {
            $(this).html(data[t].label)
            t = t + 1
        })
    })
    var today = new Date()
    var tempmonth = '' + (today.getMonth() + 1)
    if ((tempmonth).length == 1) {
        tempmonth = '0' + tempmonth
    }
    var tempdate = '' + today.getDate()
    if ((tempdate).length == 1) {
        tempdate = '0' + tempdate
    }
    var tempminutes = '' + today.getMinutes()
    if ((tempminutes).length == 1) {
        tempminutes = '0' + tempminutes
    }
    var tempseconds = '' + today.getSeconds()
    if ((tempseconds).length == 1) {
        tempseconds = '0' + tempseconds
    }
    var temphours = '' + today.getHours()
    if ((temphours).length == 1) {
        temphours = '0' + temphours
    }
    var date = today.getFullYear() + '-' + tempmonth + '-' + tempdate;
    var time = temphours + ':' + tempminutes + ':' + tempseconds;
    //console.log(toString(today))
    $('.refresh-text1').html(date)
    $('.refresh-text2').html(time)
}


var socket = io()
socket.on('trydata', function (data) {
    refreshData();
    setTimeout(() => {
        refreshData()
    }, 1000)
})

$('#tb_voltage').css('display', 'block')
$('#tb_voltage').css('visibility', 'visible')
$('.tb_voltage_small_1').css('display', 'none')
$('.tb_voltage_small_2').css('display', 'none')
$('.tb_voltage_small_1').css('visibility', 'hidden')
$('.tb_voltage_small_2').css('visibility', 'hidden')
$('.tb_voltage_small_1').css('background', 'black')
$('.tb_voltage_small_2').css('background', 'black')

$('.btnpress_toggle').click(function () {
    increasebtnpress()
})

function increasebtnpress() {
    btnpress_turn += 1
    setvisibility()
}

function setvisibility() {
    if (btnpress_turn % 2 == 0) {
        $('.btngrps').css('display', 'none')
    }
    else {
        $('.btngrps').css('display', 'block')
    }
}

document.getElementsByClassName('bg-cnf_det')[0].offsetWidth = document.getElementsByClassName('bg-address')[0].offsetWidth;

