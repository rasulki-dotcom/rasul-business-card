const telegramLink = document.querySelector("[data-telegram-link]");

if (telegramLink) {
  telegramLink.addEventListener("click", () => {
    document.title = "Расул | Telegram";
  });
}
