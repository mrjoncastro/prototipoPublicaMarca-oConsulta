/*
Template Name: Admin Template
Author: Wrappixel

File: js
*/
// ==============================================================
// Auto select left navbar
// ==============================================================
$(function () {
  "use strict";
  var url = window.location.href;
  var path = url.replace(window.location.protocol + "//" + window.location.host + "/", "");

  // Seleção automática do item de navegação ativo
  var element = $("ul#sidebarnav a").filter(function () {
    // Inclui comparação parcial de URLs
    return this.href === url || this.href === path || url.indexOf(this.href) === 0;
  });

  element.parentsUntil(".sidebar-nav").each(function () {
    if ($(this).is("li") && $(this).children("a").length !== 0) {
      $(this).children("a").addClass("active");
      $(this).parent("ul#sidebarnav").length === 0
        ? $(this).addClass("active")
        : $(this).addClass("selected");
    } else if (!$(this).is("ul") && $(this).children("a").length === 0) {
      $(this).addClass("selected");
    } else if ($(this).is("ul")) {
      $(this).addClass("in");
    }
  });

  element.addClass("active");

  // Controle de expansão/contração de menus
  $("#sidebarnav a").on("click", function (e) {
    if (!$(this).hasClass("active")) {
      // Esconde menus abertos e remove classes
      $("ul", $(this).parents("ul:first")).removeClass("in");
      $("a", $(this).parents("ul:first")).removeClass("active");

      // Expande o novo menu e adiciona classe 'active'
      $(this).next("ul").addClass("in");
      $(this).addClass("active");
    } else {
      // Colapsa o menu ativo
      $(this).removeClass("active");
      $(this).parents("ul:first").removeClass("active");
      $(this).next("ul").removeClass("in");
    }
  });

  // Prevenir comportamento padrão nos links com submenus
  $("#sidebarnav >li >a.has-arrow").on("click", function (e) {
    e.preventDefault();
  });

  // Auto scroll para o item de navegação ativo
  if ($(window).width() > 768 || 'ontouchstart' in window) {
    var activeElement = $("#sidebarnav .sidebar-item.selected");
    if (activeElement.length) {
      $(".scroll-sidebar").animate(
        {
          scrollTop: activeElement.offset().top - 250,
        },
        500
      );
    }
  }
});
