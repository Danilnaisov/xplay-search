const { Markup } = require("telegraf");

module.exports = function getStartMessage(ctx) {
  return ctx.reply(
    "Поиск завершен\nНажми на кнопку, чтобы найти цены.",
    Markup.keyboard([["Найти цены"]]).resize()
  );
};
