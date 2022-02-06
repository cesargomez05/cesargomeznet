/**
 * Start Bootstrap - Freelancer v6.0.4 (https://startbootstrap.com/themes/freelancer)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
(function ($) {
	"use strict"; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - 71)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Scroll to top button appear
	$(document).scroll(function () {
		var scrollDistance = $(this).scrollTop();
		if (scrollDistance > 100) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 80
	});

	// Collapse Navbar
	var navbarCollapse = function () {
		if ($("#mainNav").offset().top > 100) {
			$("#mainNav").addClass("navbar-shrink");
		} else {
			$("#mainNav").removeClass("navbar-shrink");
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);

	// Floating label headings for the contact form
	$(function () {
		$("body").on("input propertychange", ".floating-label-form-group", function (e) {
			$(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
		}).on("focus", ".floating-label-form-group", function () {
			$(this).addClass("floating-label-form-group-with-focus");
		}).on("blur", ".floating-label-form-group", function () {
			$(this).removeClass("floating-label-form-group-with-focus");
		});
	});

	fetch("skills.json").then((response) => response.json()).then(listSkills).catch((error) => {
		listSkills();
	});

	fetch("projects.json").then((response) => response.json()).then(listProjects).catch((error) => {
		listProjects();
	});

	function listSkills(skills) {
		var $skillsList = $("#skillsList");
		if (skills && skills.length) {
			$skillsList.html("");
			for (let skill of skills) {
				$skillsList.append(
					$("<div>").attr("class", "mb-3").append(
						$("<label>").append(skill.title)
					).append(
						$("<div>").attr("class", "progress").append(
							$("<div>").attr({
								"class": "progress-bar progress-bar-striped progress-bar-animated",
								"style": "width: " + skill.percent + "%"
							}).append(skill.percent + " %")
						)
					)
				);
			}
		} else {
			$skillsList.html(
				$("<p>").attr("class", "lead text-center").append("Habilidades en progreso")
			);
		}
	}

	function listProjects(projects) {
		var $projectsList = $("#projectsList"), hasProjects = false;
		if (projects && projects.length) {
			$projectsList.html("");

			for (let project of projects) {
				if (project.enable) {
					hasProjects = true;
					$projectsList.append(
						$("<div>").attr("class", "col-md-6 col-lg-4 mb-5").append(
							$("<div>").attr("class", "portfolio-item mx-auto").append(
								$("<div>").attr("class", "portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100").append(
									$("<div>").attr("class", "portfolio-item-caption-content text-center text-white").append(
										$("<i>").attr("class", "fas fa-plus fa-3x")
									)
								)
							).append(
								$("<img>").attr({ "class": "img-fluid", "src": project.urlImage, "alt": project.title, "width": "332", "height": "240" })
							).click(project, function (ev) {
								showPortfolioModal(ev.data);
							})
						)
					);
				}
			}
		}

		if (!hasProjects) {
			$projectsList.html(
				$("<p>").attr("class", "lead text-center").append("Proyectos en construcción")
			);
		}
	}

	function showPortfolioModal(project) {
		$("#portfolioModalLabel").html(project.title);
		$("#portfolioModalImage").attr("src", project.urlImage);
		$("#portfolioModalDescription").html(project.description ? project.description : $("<i>").append("Sin descripción"));
		$("#portfolioModal").modal("show");

		var $skillsItems = $("#skillsItems");
		$skillsItems.html("");
		if (project.skills && project.skills.length) {
			for (let skill of project.skills) {
				var { title, url, icon } = skill;
				if (title && icon) {
					$skillsItems.append(
						$("<a>").attr({
							"class": "figure",
							"href": url,
							"target": "_blank",
							"rel": "noopener",
							"title": title
						}).append(
							$("<img>").attr({ "class": "figure-img img-fluid", "src": icon })
						).append(
							$("<figurecaption>").attr("class", "figure-caption").append(title)
						)
					);
				}
			}
		}

		var $githubOption = $("#githubOption");
		if (project.githubUrl) {
			$githubOption.attr("href", project.githubUrl).html("<i class='fab fa-github'></i> Ver en GitHub");
		} else {
			$githubOption.html("").attr("href", "");
		}
	}
})(jQuery); // End of use strict