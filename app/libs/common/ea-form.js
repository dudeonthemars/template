if (window.jQuery == undefined) {
	document.write("<sc" + "ript src='http://olgayurkovskaya.e-autopay.com/js/jq.js' type='text/javascript'></scr" + "ipt>");
}

function EAcheckForm(form) {
	var charset = document.charset || document.characterSet;
	form.form_charset.value = charset;

	var items_input = form.getElementsByTagName('input');
	var items_select = form.getElementsByTagName('select');
	var items_textarea = form.getElementsByTagName('textarea');

	/*проверка доп. полей (radio, checkbox)*/
	var is_error = false;
	var is_checked = false;
	var all_radio = jQuery('input[name^=additional_field][type=radio][required=required]');
	var tmp_name = '';

	if (all_radio.length > 0) {
		var tmp_radio = [];
		var current_name = '';
		for (var i = 0; i < all_radio.length; i++) {
			current_name = jQuery(all_radio[i]).attr('name');
			if (tmp_name !== current_name) {
				tmp_radio.push(current_name);
				tmp_name = current_name;
			}
		}

		for (i = 0; i < tmp_radio.length; i++) {
			if (!jQuery('input[name="' + tmp_radio[i] + '"][type=radio][required=required]').is(':checked')) {
				is_error = true;
			}
		}

		if (is_error) {
			alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком '*', обязательны для заполнения!");
			return false;
		}
	}

	var is_error = false;
	var is_checked = false;
	var all_checkbox = jQuery('input[name^=additional_field][type=checkbox][required=required]');
	var tmp_name = '';

	if (all_checkbox.length > 0) {
		var tmp_checkbox = [];
		var current_name = '';
		for (var i = 0; i < all_checkbox.length; i++) {
			current_name = jQuery(all_checkbox[i]).attr('name');
			if (tmp_name !== current_name) {
				tmp_checkbox.push(current_name);
				tmp_name = current_name;
			}
		}

		for (i = 0; i < tmp_checkbox.length; i++) {
			if (!jQuery('input[name="' + tmp_checkbox[i] + '"][type=checkbox][required=required]').is(':checked')) {
				is_error = true;
			}
		}

		if (is_error) {
			alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком '*', обязательны для заполнения!");
			return false;
		}
	}

	/*проверка заполнения textarea*/
	for (var i = 0; i < items_textarea.length; i++) {
		var str = items_textarea[i].value;
		if (items_textarea[i].getAttribute('required') == 'required') {

			var name_field = items_textarea[i].getAttribute('name');
			switch (name_field) {
				case 'address':
					if ((typeof form.ea_custom_address === 'undefined' || form.ea_custom_address.checked) && items_textarea[i].value === '') {
						/*alert(name_field);*/
						alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком '*', обязательны для заполнения!");
						return false;
					}
					break;
				default:
					break;
						   }
		}
	}

	/*проверка заполнения селектов*/
	for (var i = 0; i < items_select.length; i++) {
		var str = items_select[i].value;
		if (items_select[i].getAttribute('required') == 'required') {
			var name_field = items_select[i].getAttribute('name');
			switch (name_field) {
				case 'region_id':
					if (!form.ea_custom_region.checked && items_select[i].value == '') {
						/*alert(name_field);*/
						alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком \'*\', обязательны для заполнения!");
						return false;
					}
					break;
				case 'city_id':
					if (!form.ea_custom_city.checked && items_select[i].value == '') {
						/*alert(name_field);*/
						alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком \'*\', обязательны для заполнения!");
						return false;
					}
					break;
				case 'country_id':
				default:
					if (validate(str) || str == '') {
						/*alert(name_field);*/
						alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком \'*\', обязательны для заполнения!");
						return false;
					}
					break;
						   }
		}
	}

	/*проверка заполнения обязательных полей*/
	for (var i = 0; i < items_input.length; i++) {
		var str = items_input[i].value;
		if (items_input[i].getAttribute('required') == 'required') {
			var name_field = items_input[i].getAttribute('name');
			switch (name_field) {
				case 'country':
					if (form.ea_custom_city.checked) {
						if (validate(str) || str == '') {
							/*alert(name_field);*/
							alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком \'*\', обязательны для заполнения!");
							return false;
						}
					}
					break;
				case 'area':
					if (typeof form.ea_custom_region === 'undefined' || form.ea_custom_region.checked) {
						if (validate(str) || str == '') {
							/*alert(name_field);*/
							alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком \'*\', обязательны для заполнения!");
							return false;
						}
					}
					break;
				case 'country':
					if (form.eacustom_city.checked) {
						if (validate(str) || str == '') {
							/*alert(name_field);*/
							alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком \'*\', обязательны для заполнения!");
							return false;
						}
					}
					break;
				case 'required_phone':
					/*проверяем заполнение хотя бы одного номера телефона*/
					var phone1 = true;
					var phone2 = true;


					if (form.cod_oper_mob.value.match(/^[0-9]+$/i) === null || form.phone_mob.value.match(/^[0-9]+$/i) === null) {
						phone1 = false;
					}

					if ((typeof form.cod_oper_dom !== 'undefined' && form.cod_oper_dom.value.match(/^[0-9]+$/i) === null) ||
					    (typeof form.phone_dom !== 'undefined' && form.phone_dom.value.match(/^[0-9]+$/i) === null)) {
						phone2 = false;
					}


					if (typeof form.cod_oper_mob !== 'undefined' && typeof form.cod_oper_dom !== 'undefined') {
						if (!phone1 && !phone2) {
							alert('Введите полностью и корректно (допускаются только цифры) хотя бы один номер телефона!');
							return false;
						}
					} else if (!phone1 || !phone2) {
						alert('Введите полностью и корректно (допускаются только цифры) номер телефона!');
						return false;
					}
					break;
				case 'phone':
					if (str == '') {
						alert('Введите номер Вашего контактного телефона!');
						form.phone.focus();
						return false;
					}
					break;
				case 'email':
					if (!form.email.value.match(/^[\w]{1}[\w\.\-_]*@[\w]{1}[\w\-_\.]*\.[\w]{2,10}$/i)) {
						alert('Введите корректно Ваш E-Mail адрес!');
						form.email.focus();
						return false;
					}
					break;
				case 'city':
					if (typeof form.ea_custom_city === 'undefined' || form.ea_custom_city.checked) {
						if (validate(str) || str == '') {
							/*alert(name_field);*/
							alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком '*', обязательны для заполнения!");
							return false;
						}
					}
					break;
				case 'street':
					if (typeof form.ea_custom_address === 'undefined' || !form.ea_custom_address.checked) {
						if (validate(str) || str == '') {
							/*alert(name_field);*/
							alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком '*', обязательны для заполнения!");
							return false;
						}
					}
					break;
				case 'dom':
					if (typeof form.ea_custom_address === 'undefined' || !form.ea_custom_address.checked) {
						if (validate(str) || str == '') {
							/*alert(name_field);*/
							alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком '*', обязательны для заполнения!");
							return false;
						}
					}
					break;
				case 'kvartira':
					if (typeof form.ea_privatehouse === 'undefined' || (!form.ea_privatehouse.checked && !form.ea_custom_address.checked)) {
						if (validate(str) || str == '') {
							/*alert(name_field);*/
							alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком '*', обязательны для заполнения!");
							return false;
						}
					}
					break;
				default:
					if (validate(str) || str == '') {
						/*alert(name_field);*/
						alert("Вы указали не всю информацию!!!\nВсе поля, отмеченные знаком \'*\', обязательны для заполнения!");
						return false;
					}
					break;
						   }
		}
	}
	//alert('submit!');
	return true;
}

function validate(str) {
	if (jQuery.trim(str) != '') {
		return false;
	} else {
		return true;
	}
}

/*Вытягивает по ajax данные списков регионов/городов*/
function getData(action) {
	var form_charset = document.charset || document.characterSet;
	if (action == 'region') {
		var country = document.getElementById('country_id').value;
		if (country == '') return;
		var url = 'http://olgayurkovskaya.e-autopay.com/adminka/form_generator/get_form_list.php?country=' + country + '&form_charset=' + form_charset;
	} else if (action == 'city') {
		var region = document.getElementById('region_id').value;
		if (region == '') return;
		var url = 'http://olgayurkovskaya.e-autopay.com/adminka/form_generator/get_form_list.php?region=' + region + '&form_charset=' + form_charset;
	} else {
		return;
	}


	jQuery.ajax({
		url: url,
		async: true,
		dataType: 'jsonp',
		crossDomain: true
	});
}

function jsonpCallback(data) {
	if (typeof data.country != 'undefined') {
		if (data.country == 'ok') {
			jQuery('select#region_id').html(data.list);
		} else if (data.country == 'error') {
			alert('Список регионов и городов временно не доступен! Укажите регион и город вручную!');
			jQuery('select#region_id,select#city_id').html('<option value="">Укажите регион и город вручную!</option>');
		}
	} else if (typeof data.region != 'undefined') {
		if (data.region == 'ok') {
			jQuery('select#city_id').html(data.list);
		} else if (data.region == 'error') {
			alert('Список городов временно не доступен! Укажите город вручную!');
			jQuery('select#city_id').html('<option value="">Укажите регион и город вручную!</option>');
		}
	}
}

function hideElement(obj) {
	var type = obj.name;
	switch (type) {
		case 'ea_custom_region':
			if (obj.checked) {
				jQuery('#ea_product_form_29503 #ea_normal_region select').val('');
				document.getElementById('ea_normal_region').style.display = 'none';
				document.getElementById('ea_special_region').style.display = 'inline';
			} else {
				jQuery('#ea_product_form_29503 #ea_special_region input').val('');
				document.getElementById('ea_normal_region').style.display = 'inline';
				document.getElementById('ea_special_region').style.display = 'none';
			}
			break;
		case 'ea_custom_city':
			if (obj.checked) {
				jQuery('#ea_product_form_29503 #ea_normal_city select').val('');
				document.getElementById('ea_normal_city').style.display = 'none';
				document.getElementById('ea_special_city').style.display = 'inline';
			} else {
				jQuery('#ea_product_form_29503 #ea_special_city input').val('');
				document.getElementById('ea_normal_city').style.display = 'inline';
				document.getElementById('ea_special_city').style.display = 'none';
			}
			break;
		case 'ea_custom_address':
			if (obj.checked) {
				document.getElementById('ea_address_1').style.display = 'none';
				document.getElementById('ea_address_2').style.display = 'none';
				document.getElementById('ea_address_3').style.display = 'none';

				document.getElementById('ea_special_address').style.display = 'table-row';
			} else {
				document.getElementById('ea_address_1').style.display = 'table-row';
				document.getElementById('ea_address_2').style.display = 'table-row';
				document.getElementById('ea_address_3').style.display = 'table-row';

				document.getElementById('ea_special_address').style.display = 'none';
			}
			break;
		default:
			break;
			  }
}

window.onload = function() {
	var current_domain = window.location.hostname;
	if (current_domain !== 'olgayurkovskaya.e-autopay.com') {
		document.getElementById('order_page_referer').value = document.referrer;
	}

	jQuery(function() {
		jQuery('.ea_privatehouse').change(function() {
			if (jQuery(this).attr('checked')) {
				jQuery('#ea_korpus_kvartira').hide();
				jQuery('#special_address').val('Ул. ' + jQuery('.ea_street').val() + ', Д. ' + jQuery('.ea_dom').val());
			} else {
				jQuery('#ea_korpus_kvartira').show();
				jQuery('#special_address').val('Ул. ' + jQuery('.ea_street').val() + ', Д. ' + jQuery('.ea_dom').val() + ', Корп. ' + jQuery('.ea_korpus').val() + ', Кв. ' + jQuery('.ea_kvartira').val());
			}
		});
		//************************************
		jQuery('.ea_street,.ea_dom,.ea_korpus,.ea_kvartira').change(function() {
			if (jQuery('.ea_privatehouse').attr('checked'))
				jQuery('#special_address').val('Ул. ' + jQuery('.ea_street').val() + ', Д. ' + jQuery('.ea_dom').val());
			else {
				if (jQuery('.ea_korpus').val() != '')
					jQuery('#special_address').val('Ул. ' + jQuery('.ea_street').val() + ', Д. ' + jQuery('.ea_dom').val() + ', Корп. ' + jQuery('.ea_korpus').val() + ', Кв. ' + jQuery('.ea_kvartira').val());
				else
					jQuery('#special_address').val('Ул. ' + jQuery('.ea_street').val() + ', Д. ' + jQuery('.ea_dom').val() + ', Кв. ' + jQuery('.ea_kvartira').val());
			}
		});
	});
}