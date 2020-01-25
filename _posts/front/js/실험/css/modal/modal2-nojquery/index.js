"use strict";
{
  const open = document.getElementById("open");
  const close = document.getElementById("close");
  const modal = document.getElementById("modal");
  const mask = document.getElementById("mask");

  open.addEventListener("click", function() {
    modal.classList.remove("hidden");
    mask.classList.remove("hidden");
  });
  close.addEventListener("click", function() {
    modal.classList.add("hidden");
    mask.classList.add("hidden");
  });
  mask.addEventListener("click", function() {
    modal.classList.add("hidden");
    mask.classList.add("hidden");
  });
}
