export default function() {
  function prepareSendMail(e) {
    e.preventDefault();
    const data = {
      name: formMail.name.value,
      email: formMail.email.value,
      text: formMail.text.value
    };

    let resultContainer = document.querySelector(".status");
    resultContainer.innerHTML = "Sending...";
    $(".status-overlay").fadeIn("slow");
    sendJson("/", data, "POST", data => {
      formMail.reset();
      resultContainer.innerHTML = data.msg;
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
  const formMail = document.querySelector("#mail");
  formMail.addEventListener("submit", prepareSendMail);
}
