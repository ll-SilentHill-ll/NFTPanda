$(document).ready(function(){
	$('.js-tab_trigger').on('click', function() {
		var tabName = $(this).attr('data-tab');
		tab = $('.js-tab_contant[data-tab="'+tabName+'"]');

	$('.js-tab_contant.active_trigger').removeClass('active_trigger')

	tab.addClass('active_trigger');


  $('.js-tab_trigger.active_bottom_tabs').removeClass('active_bottom_tabs')

  $(this).addClass('active_bottom_tabs');

	})
})


$('.wallet_close').click(function(){
  $('.wallet_variant.active_variant').removeClass('active_variant')
})

$('.header__button').click(function(){
  $('.wallet_variant').addClass('active_variant')
})

$('.wallet_variant').click(function(){
  $('.wallet_variant.active_variant').removeClass('active_variant')
})


$(document).ready(function(){
	$('.pruduct-tab_trigger_btn').on('click', function() {
		var tabName = $(this).attr('data-tab');
		tab = $('.product-tab_contant[data-tab="'+tabName+'"]');

	$('.product-tab_contant.product-tab_contant_active').removeClass('product-tab_contant_active')

	tab.addClass('product-tab_contant_active');


  $('.pruduct-tab_trigger_btn.ptab_active').removeClass('ptab_active')

  $(this).addClass('ptab_active');

	})
})
