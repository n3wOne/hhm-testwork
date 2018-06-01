$('input').val('');
$('textarea').val('');

$('body').on('click', '.item', function(){
				var author = $(this).find('div.card-header').text();
				message('Ответ для автора '+author,100);
				$('#comment').val('Ответ для '+author+':\n').css({'color': 'white'}).focus();

			});

function message(mes, delay){
    if (delay == undefined)
    {
        delay=200;
    }
    $m=$('#messages');
    $('#messages').delay(delay).css('display', 'block').animate({opacity: 1, top: '25%'}, 500);
    $m.html(mes);
    $('#messages').delay(1000).animate({opacity: 0, top: '25%'}, 200,
                function(){ 
                    $(this).css('display', 'none'); 
                    $m.html('');
                });  
}


$(document).ready(function(){
	$('div.comments-list').html('<h1>Данные загружаются...</h1>');
	$.ajax({
		url: 'serv.php',
		type: 'POST',
		data: {i: 1},
		success: function(data){
			$('div.comments-list').hide().fadeIn("slow").html(data);
		}
		});




});

$('button.send').click(function(){

var comment = document.getElementById('comment').value;
var email = document.getElementById('email').value;
var nick = document.getElementById('nickname').value;

	$.ajax({
		url: "serv.php",
		type: 'post',
		data: {name: nick, email: email, comment: comment, action: 'add'},
		success: function(data){
			message('Комментарий добавлен!');
			$('div.comments-list').html(data);
			$('.item:last-child').hide().fadeIn("slow");
			$('input').val('');
			$('textarea').val('');
		}

	})
});

var submit = $('button.send');


var valida = {
	email: 'Не валидный email',
	nick: 'Имя должно быть > 3 символов',
	comment: 'Введите > 3 символов' 
};


$(document).on('blur','.field-validation', function(){

	tip = $(this).siblings().find('span.tip');
	data = valida[$(this).data('valid')];
	//tip.html(data);
	if($(this).data('valid')=='nick'){
		if($(this).val().length < 3){
			tip.html(data);
			submit.prop('disabled',true);
			$(this).removeClass('valid');
		}
		else{
			tip.html('');
			$(this).addClass('valid');	
		}
	}

	if($(this).data('valid')=='comment'){
		if($(this).val().length < 3){
			tip.html(data);
			submit.prop('disabled',true);
			$(this).removeClass('valid');
		}
		else{
			tip.html('');
			$(this).addClass('valid');
		}
	}

	if($(this).data('valid')=='email'){
		if(!$(this).val().match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/g)){
			tip.html(data);
			submit.prop('disabled',true);
			$(this).removeClass('valid');
			}
		else{
			tip.html('');
			$(this).addClass('valid');
		}
	}

	var comment = $('#comment').hasClass('valid');
	var email = $('#email').hasClass('valid');
	var nick = $('#nickname').hasClass('valid');
	if(email && nick && comment)
	{
		submit.prop('disabled',false);
	}

});