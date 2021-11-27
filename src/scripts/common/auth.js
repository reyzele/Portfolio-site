import { setTimeout } from "core-js";

export default function() {
  const formAuth = document.querySelector("#auth");
  formAuth.addEventListener("submit", prepareAuthorization);

  function prepareAuthorization(e) {
    e.preventDefault();
    const data = {
      login: formAuth.login.value,
      password: formAuth.password.value,
      isHuman: formAuth.isHuman.checked,
      isRealHuman: formAuth.isRealHuman.value
    };
    var resultContainer = document.querySelector(".status");

    resultContainer.innerHTML = "Sending...";
    $(".status-overlay").fadeIn("slow");
    sendJson("/login", data, "POST", data => {
      formAuth.reset();
      resultContainer.innerHTML = data.msg;
      if (data.msg == "Go to the admin panel...") {
        setTimeout(() => {
          window.location.replace("/admin");
        }, 2000);
      }
    });
  }

  function sendJson(url, data, method, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function(e) {
      let result;
      try {
        result = JSON.parse(xhr.responseText);
      } catch (e) {
        cb({ msg: "Sorry, data error", status: "Error" });
      }
      cb(result);
    };
    xhr.send(JSON.stringify(data));
  }
}
