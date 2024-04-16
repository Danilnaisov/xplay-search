import telebot
from telebot import types
from selenium import webdriver
from time import sleep
from bs4 import BeautifulSoup
import requests
import random

from bs4 import BeautifulSoup as bs
import re
from dateutil.parser import parse

bot = telebot.TeleBot("6914023879:AAG95ZaFFuo1LUzXxeA6exl3o2q92-2Eo7U")

API_KEYS = [
    'XSY5ZS1SG5J95GGN', #Денчик 5000/m
    #'GIUES6NNG55GFEBL', #Основа 50/m
    '8GPNNO47GPJIWDA0' #Ferma203 5000/m
]

#https://www.steamwebapi.com/dashboard

markups = types.InlineKeyboardMarkup()
markups.add(types.InlineKeyboardButton('Найти цены', callback_data='getPrice'))

def convert_currency_xe(src, dst, amount):
    def get_digits(text):
        """Returns the digits and dots only from an input `text` as a float
        Args:
            text (str): Target text to parse
        """
        new_text = ""
        for c in text:
            if c.isdigit() or c == ".":
                new_text += c
        return float(new_text)
    
    url = f"https://www.xe.com/currencyconverter/convert/?Amount={amount}&From={src}&To={dst}"
    content = requests.get(url).content
    soup = bs(content, "html.parser")
    exchange_rate_html = soup.find_all("p")[2]
    return get_digits(exchange_rate_html.text)

@bot.message_handler(commands=['start'])
def start(message):

    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton('Найти цены', callback_data='getPrice'))
    
    bot.send_message(message.chat.id, 'Доступные команды:', reply_markup=markup)

@bot.callback_query_handler(func=lambda callback: True)
def callback_message(callback):
    if callback.data == 'getPrice':

        bot.send_message(callback.message.chat.id, 'Начинаю поиск')

        driver = webdriver.Chrome()

        try:
            driver.get("https://xplay.gg/ru/store")

            print('Timer started')
            sleep(3)
            print('Timer finished')

            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            cards = soup.find_all(class_="sc-ifVVRW jGCOhh")

            for card in cards:
                gun = card.find(class_="sc-fiyOEG kzwoKM").get_text(strip=True).replace(' ', '%20')
                skin = card.find(class_="sc-dVraiA jWjAGG").get_text(strip=True).replace(' ', '%20')
                quality = card.find(class_="sc-eRxdlV fYNbaE").get_text(strip=True).replace(' ', '%20')

                points_price = card.find(class_="sc-jOcvlT btmvyu").get_text(strip=True)

                additional_info = ''
                trade_ban = card.find(class_="sc-hynEFL XRHuk")
                premium = card.find(class_="sc-gChBCq imsqti")

                # if trade_ban:
                #     additional_info += f'\n\nДоп Информация: {trade_ban.text}\n'
                # elif premium:
                #     additional_info += f'\n\nДоп Информация: {premium.text}\n'

                skin_name = f'{gun}%20%7C%20{skin}%20%28{quality}%29'

                print(f'{gun} {skin} {quality} {points_price} {additional_info}')

                link = f"https://steamcommunity.com/market/listings/730/{gun}%20%7C%20{skin}%20%28{quality}%29"
                
                KEY = random.choice(API_KEYS) 
                response = requests.get(f"https://www.steamwebapi.com/steam/api/item?key={KEY}&market_hash_name={skin_name}&game=csgo")
                print(KEY)
                data = response.json()

                pricelatest = None
                converted_pricelatest = None
                pricemedian = None
                converted_pricemedian = None
                pricereal = None
                converted_pricereal = None

                if 'pricelatest' in data and 'pricemedian' in data and 'pricereal' in data:
                    pricelatest = data['pricelatest']
                    pricemedian = data['pricemedian']
                    pricereal = data['pricereal']
                    
                if pricelatest is not None:
                    converted_pricelatest = convert_currency_xe("USD", "RUB", pricelatest)
                    pricelatest_text = f"${pricelatest} | \u20bd{round(converted_pricelatest, 2)}"
                else:
                    pricelatest_text = "N/A"

                if pricemedian is not None:
                    converted_pricemedian = convert_currency_xe("USD", "RUB", pricemedian)
                    pricemedian_text = f"${pricemedian} | \u20bd{round(converted_pricemedian, 2)}"
                else:
                    pricemedian_text = "N/A"

                if pricereal is not None:
                    converted_pricereal = convert_currency_xe("USD", "RUB", pricereal)
                    pricereal_text = f"${pricereal} | \u20bd{round(converted_pricereal, 2)}"
                else:
                    pricereal_text = "N/A"                
                
                message_text = f'**Название оружия:** {gun.replace('%20', ' ')}\n**Название скина:** {skin.replace('%20', ' ')}\n**Качество:** {quality.replace('%20', ' ')}\n\n**Цена в баллах:** {points_price}\n\n**Готовая ссылка:** ["тык"]({link})\n\n**Цена последней сделки:** {pricelatest_text}\n**Медианная цена:** {pricemedian_text}\n**Реальная цена:** {pricereal_text}\n{additional_info}\n'

                escaped_message_text = message_text.replace('-', ' ')
                bot.send_message(callback.message.chat.id, escaped_message_text, parse_mode='MarkdownV2')
        finally:
            driver.quit()
            bot.send_message(callback.message.chat.id, 'Поиск завершен')       

@bot.message_handler(commands=['text'])
def text(message): 
    bot.send_message(message.chat.id, 'Команда не найдена')

bot.polling()