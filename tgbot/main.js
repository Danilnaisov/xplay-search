const { Telegraf, Markup } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf("6914023879:AAG95ZaFFuo1LUzXxeA6exl3o2q92-2Eo7U", {
  polling: true,
});

const getCorrectWordForm = require("./modules/getCorrectWordForm");
const generateSkinMessage = require("./modules/generateSkinMessage");
const getPriceInfo = require("./modules/getPriceInfo");
const getStartMessage = require("./modules/getStartMessage");
bot.start((ctx) => {
  return ctx.reply(
    "Привет! Нажми на кнопку, чтобы найти цены.",
    Markup.keyboard([["Найти цены"]]).resize()
  );
});

bot.hears("Найти цены", async (ctx) => {
  try {
    ctx.reply(`Поиск...`, {
      reply_markup: { remove_keyboard: true },
    });

    const apiUrl = "https://xplay.gg/api/items/getList";
    const response = await axios.get(apiUrl);
    const data = response.data.items.filter((item) => item.IsDrop === 0);

    let premiumItems = 0;
    let defaultItems = 0;
    let banItems = 0;

    for (const item of data) {
      premiumItems += item.ForPremium === 1 ? 1 : 0;
      defaultItems += item.ForPremium === 1 ? 0 : 1;
      banItems += item.TradeBan === 1 ? 1 : 0;
    }

    const skinsWordForm = getCorrectWordForm(
      data.length,
      "скин",
      "скина",
      "скинов"
    );
    const searchWordForm = getCorrectWordForm(
      data.length,
      "Найден",
      "Найдено",
      "Найдено"
    );

    ctx.reply(
      `${searchWordForm} ${data.length} ${skinsWordForm}\nВыбери действие:\nБез премиума | Премиум | С трейд баном`,
      Markup.inlineKeyboard([
        Markup.button.callback(`${defaultItems}`, "defaultButton"),
        Markup.button.callback(`${premiumItems}`, "premiumButton"),
        Markup.button.callback(`${banItems}`, "banButton"),
      ])
    );

    bot.action("defaultButton", async (ctx) => {
      await handleButtonClick(
        ctx,
        data.filter((item) => item.ForPremium === 0),
        "Не премиум скины"
      );
      getStartMessage(ctx);
    });

    bot.action("premiumButton", async (ctx) => {
      await handleButtonClick(
        ctx,
        data.filter((item) => item.ForPremium === 1),
        "Премиум скины"
      );
      getStartMessage(ctx);
    });

    bot.action("banButton", async (ctx) => {
      await handleButtonClick(
        ctx,
        data.filter((item) => item.TradeBan === 1),
        "Скины с баном"
      );
      getStartMessage(ctx);
    });

    async function handleButtonClick(ctx, filteredData, replyMessage) {
      await ctx.reply(replyMessage);
      await ctx.deleteMessage();

      for (const item of filteredData) {
        const message = generateSkinMessage(item);
        await ctx.reply(message);
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    ctx.reply("Произошла ошибка при получении данных из API.");
  }
});

bot.launch();
