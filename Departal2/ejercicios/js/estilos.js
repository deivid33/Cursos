$('div').hide();
$('.divAzul').show();

$('input').on('click', function() {
	var inputActivo = $('input.activo');
	var divActivo = $('div.activo');
	if ($(this).is(inputActivo)) {
		return;
	} else {
		inputActivo.removeClass('activo');
		divActivo.removeClass('activo');

		divActivo.hide('slow', () => {
			$(this).addClass('activo');
			$('.div'+$(this).val()).show('slow');
			$('.div'+$(this).val()).addClass('activo');
		});
	}
});