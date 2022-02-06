$(function () {
	$("#contactForm input,#contactForm textarea,#contactForm button").jqBootstrapValidation({
		preventSubmit: true,
		submitError: function ($form, event, errors) {
			// additional error messages or events
		},
		submitSuccess: function ($form, event) {
			event.preventDefault(); // prevent default submit behaviour

			grecaptcha.ready(function() {
				grecaptcha.execute('6LdsM3AbAAAAADIEJPmkES8ectULBu1GqY7M2rvf', {action: 'form'}).then(function(token) {
					// get values from FORM
					var formObject = {
						name: $("input#name").val(),
						email: $("input#email").val(),
						message: $("textarea#message").val(),
						token: token
					};

					var firstName = formObject.name; // For Success/Failure Message
					// Check for white space in name for Success/Fail message
					if (firstName.indexOf(" ") >= 0) {
						firstName = formObject.name.split(" ").slice(0, -1).join(" ");
					}

					let $this = $("#sendMessageButton");
					$this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
					$.ajax({
						url: "assets/mail/contact_me.php",
						type: "POST",
						data: formObject,
						cache: false,
						success: function () {
							// Success message
							$("#success").html(
								$("<div>").attr("class", "alert alert-success").append(
									"<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
								).append(
									"<strong>Tu mensaje ha sido enviado con éxito. Estaremos en contacto lo mas pronto posible.</strong>"
								)
							);

							// Se resetea el formulario de contacto
							$("#contactForm").trigger("reset");
						},
						error: function () {
							// Fail message
							$("#success").html(
								$("<div>").attr("class", "alert alert-danger").append(
									"<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
								).append(
									$("<strong>").text(
										"Lo sentimos " + firstName + ", estamos teniendo algunos inconvenientes. Por favor, intenta nuevamente!"
									)
								)
							);
						},
						complete: function () {
							setTimeout(function () {
								// Se habilita el botón SUBMIT del formulario, una vez finalizado el llamado a la petición AJAX
								$this.prop("disabled", false);
							}, 1000);
						},
					});
				});
			});
		},
		filter: function () {
			return $(this).is(":visible");
		},
	});

	$('a[data-toggle="tab"]').click(function (e) {
		e.preventDefault();
		$(this).tab("show");
	});
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
	$("#success").html("");
});
