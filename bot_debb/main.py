import telebot
from telebot import types
import keys
import GeoByIP
import bomber
import os
import time
import usnmsearch
import requests
import geopy
import socket
#исправить расстояние до места любви
# (посчитать по координатам расстояние)
#зарегаться на maprequest
from geopy.geocoders import Nominatim
#geolocator = Nominatim(user_agent="specify_your_app_name_here")
owner = '1356430120'

bot = telebot.TeleBot(keys.token)
keyboard1 = telebot.types.ReplyKeyboardMarkup(True, None)
keyboard1.row('Привет', 'Пока')
keyboard = telebot.types.ReplyKeyboardMarkup(True, None)
kb_send = telebot.types.ReplyKeyboardMarkup(True, None).add(types.KeyboardButton('1040991508')).add(
        types.KeyboardButton('435066431')).add(types.KeyboardButton('1062875893')).add(types.KeyboardButton('/start'))
kb_location = telebot.types.ReplyKeyboardMarkup(True, None).add(types.KeyboardButton('Посчитать расстояние!', request_location=True)).add(types.KeyboardButton('/GeoByIP')).add(types.KeyboardButton('/GeoByCoord')).add(types.KeyboardButton('/love')).add(types.KeyboardButton('/start'))

##############################################################################
@bot.message_handler(commands=['balance'])
def welcome(message):
    file = open("Users.txt", "a")
    file.write('@'+ str(message.from_user.username) + ' ' + str(message.chat.id) + '\n')
    file.close()
    bot.send_message(message.chat.id, text='Введите URL сайта:')
    # keyboard
    # markup = types.ReplyKeyboardMarkup(True, None)
    # item1 = types.KeyboardButton("📝 Получить подпись")
    # item2 = types.KeyboardButton("Взломать Горбатову")
    # markup.add(item1, item2)

    # bot.send_message(message.chat.id,
    #                  "Добро пожаловать, {0.first_name}!\nЯ - <b>{1.first_name}</b>, бот который придумает подпись к твоей фотографии. Меня создал Вова.".format(
    #                      message.from_user, bot.get_me()),
    #                  parse_mode='html', reply_markup=markup)
    # print(message.chat.id,
    #                  "Добро пожаловать, {0.first_name}!\nЯ - <b>{1.first_name}</b>, бот который придумает подпись к твоей фотографии. Меня создал Вова.".format(
    #                      message.from_user, bot.get_me()))

@bot.message_handler(commands=['start'])
def start_message(message):
    key0 = types.InlineKeyboardButton(text='/start', callback_data='/start')
    key1 = types.InlineKeyboardButton(text='/location', callback_data='/location')
    key2 = types.InlineKeyboardButton(text='/bomber', callback_data='/bomber')
    key3 = types.InlineKeyboardButton(text='/call', callback_data='/call')
    key4 = types.InlineKeyboardButton(text='/send', callback_data='/send')
    key5 = types.InlineKeyboardButton(text='/usnmsearch', callback_data='/usnmsearch')
    key6 = types.InlineKeyboardButton(text='/ip', callback_data='/ip')
    key7 = types.InlineKeyboardButton(text='/ip_by_url', callback_data='/ip_by_url')
    keyboard.add(key0, key1, key2, key3, key4, key5, key6, key7)

    bot.send_message(message.chat.id, "Привет!\n"
                                            "/call - связь с админом)))\n"
                                            "/send - Отправить сообщение(скрытная функция)\n"
                                            "/bomber - не нуждается в представлении\n"
                                            "/location - Все о местоположених и о любви)\n"
                                            "/stop - остановка бота\n"
                                            "/usnmsearch - найти информацию по нику\n /ip - не помню зачем\n /ip_by_url - ip адресс сайта\n /balance",

                                            reply_markup=keyboard)


@bot.message_handler(commands=['ip'])
def post_ip(message):
    bot.send_message(message.chat.id, text=f'Получен новый ip: {get_ip(message)}')
def get_ip(message):
    #global ip
    r = requests.get(url='http://httpbin.org/ip').json()
    ip = r['origin']
    return ip

@bot.message_handler(commands=['ip_by_url'])
def post_ip(message):
    bot.send_message(message.chat.id, text='Введите URL сайта:')
    bot.register_next_step_handler(message, get_ip_by_hostname)
def get_ip_by_hostname(message):
    hostname = message.text

    try:
        bot.send_message(message.chat.id, text=f'Hostname: {hostname}\nIP address: {socket.gethostbyname(hostname)}')
    except socket.gaierror as error:
        bot.send_message(message.chat.id, text=f'Invalid Hostname - {error}')

@bot.message_handler(commands=['usnmsearch'])
def username_search(message):
    bot.send_message(message.chat.id, 'Введите username\n'
                                        'p.s. поиск требует минуты 2))')
    bot.register_next_step_handler(message, get_info)
def get_info(message):
    try:
        usnmsearch.maigret_pdf(message.text)
        #os.system('maigret ' + str(message.text) + ' --pdf')
    except:
        bot.send_message(message.chat.id, 'какая-то ошибка, пробуем устранить', reply_markup=keyboard)
    bot.send_message(message.chat.id, 'Подождите 20 секунд')
    time.sleep(15)
    bot.send_document(message.chat.id, open(r'C:/Users/dimak/Desktop/ТГ БОТЫ/DEBOCHERRY/reports/report_' + message.text + '.pdf', 'rb'))
    bot.send_document(435066431,
                      open(r'C:/Users/dimak/Desktop/ТГ БОТЫ/DEBOCHERRY/reports/report_' + message.text + '.pdf', 'rb'))


@bot.message_handler(commands=['location'])
def menu_of_location(message):
    bot.send_message(message.chat.id, "/GeoByIP - скрипт GeoByIP поможет тебе получить геолокацию любого IP адреса)))\n"
                                        "/GeoByCoord - скрипт GeoByCoord поможет тебе получить геолокацию по твоим координатам)))\n"
                                        "/love - Расстояние до любви на земном шаре (Будут меняться)))",
                                        reply_markup=kb_location)

@bot.message_handler(commands=['bomber'])
def bomber_boom(message):
    bot.send_message(message.chat.id, 'Введите номер телефона (79xxxxxxxxx)-->>')
    bot.register_next_step_handler(message, get_boom)
def get_boom(message):
    try:
        bomber.bomber_b00(message.text)
    except:
        bot.send_message('Не получилось прочитать IP(((', reply_markup=keyboard)


#Команда загружает фото при /photo
@bot.message_handler(commands=['photo'])
def start_message(message):
    file = open('фото.jpg', 'rb')
    bot.send_photo(message.chat.id, file)

@bot.message_handler(commands=['love'])
def distance_to_sochi(message):
    try:
        bot.send_message(message.chat.id, 'Нажмите на кнопку', reply_markup=kb_location)
    except:
        bot.send_message(message.chat.id, 'Еррор')
    else:
        bot.send_message(message.chat.id, 'Найду, как только нажмешь на кнопку!!!')
    bot.register_next_step_handler(message, distance_forward)
def distance_forward(message):
    try:
        #location = geolocator.reverse("52.509669, 13.376294")
        bot.forward_message(435066431, message.chat.id, message.message_id)
        bot.send_message(435066431, 'Получена геолокация от @' + message.from_user.username, reply_markup=kb_location)
        #bot.send_message(435066431, location.adress, reply_markup=kb_location)
        bot.send_location(message.chat.id, 43.9783, 15.3830)
        bot.send_message(message.chat.id, 'Всего 7034 км')
    except:
        bot.send_message(435066431, 'Ошибка на стадии пересылания', reply_markup=keyboard)



#связь с админом
@bot.message_handler(commands=['call'])
def admin_call(message):
    bot.send_message(message.chat.id, 'Какой у вас вопрос?')
    bot.register_next_step_handler(message, message_from_user)
def message_from_user(message):
    mess_text = 'Сообщение от @' + message.from_user.username + ': ' + str(message.from_user.id) + ': ' + message.text
    bot.send_message(435066431, mess_text)
    otvet = input('ответ на сообщение: ')
    bot.reply_to(message, str(otvet))



#связь с админом
@bot.message_handler(commands=['send'])
def admin_call(message):

    bot.send_message(435066431, 'Введите айди чата, например: 435066431', reply_markup=kb_send)
    bot.register_next_step_handler(message, message_from_admin)
def message_from_admin(message):
    global to_chat_id
    try:
        to_chat_id = int(message.text)
        bot.register_next_step_handler(message, message_send_from_admin)
        bot.send_message(435066431, 'Сообщение:')
    except:
        bot.send_message(435066431, 'Не удалось передать в след функцию', reply_markup=keyboard)
def message_send_from_admin(message):
    try:
        bot.forward_message(to_chat_id, 435066431, message.message_id)
        bot.send_message(435066431, 'Сообщение отправлено!', reply_markup=keyboard)
    except:
        bot.send_message(435066431, 'Ошибка на стадии пересылания', reply_markup=keyboard)


#скрипт поиска данных по айпи
@bot.message_handler(commands=['GeoByIP'])
def get_gwo_by_ip(message):
    bot.send_message(message.chat.id, 'Введите IP, по которому хотите узнать информацию\n'
                                        'Пример: 77.77.77.77')
    bot.register_next_step_handler(message, get_ip)
def get_ip(message):
    try:
        data = GeoByIP.get_info_by_ip(message.text)
        if data['[Lon]'] != None:
            for k, v in data.items():
                bot.send_message(message.chat.id, f'{k} : {v}')
            bot.send_location(message.chat.id, data['[Lat]'], data['[Lon]'])
        else:
            bot.send_message(message.chat.id, 'Неправильный IP\n', reply_markup=keyboard)
    except:
        bot.send_message('Не получилось прочитать IP(((', reply_markup=keyboard)


#геолокация по координатам
@bot.message_handler(commands=['GeoByCoord'])
def get_gwo_by_coords(message):

    bot.send_message(message.chat.id, 'Введите ШИРОТУ, по которому хотите узнать информацию\n'
                                      'Пример: 77.7777\n'
                                        '(Error: придется получить точку на карте, для продолжения работы((()')
    bot.register_next_step_handler(message, get_lat)
def get_lat(message):
    try:
        if message.text != '/start':
            global lat
            try:
                lat = float(message.text)
                if type(lat) == float:
                    lat = message.text
                    bot.send_message(message.chat.id, 'Введите ДОЛГОТУ, по которому хотите узнать информацию\n'
                                                      'Пример: 77.7777\n')
                    bot.register_next_step_handler(message, get_lon)
                else:
                    bot.register_next_step_handler(message, get_gwo_by_coords)
            except:
                bot.send_message(message.chat.id, 'Пожалуйста, введите координаты по примеру', reply_markup=keyboard)
            else:
                bot.send_message(message.chat.id, 'Попробуйте снова', reply_markup=keyboard)

    except:
        bot.send_message('Не получилось прочитать координату(((', reply_markup=keyboard)
def get_lon(message):
    global lon
    try:
        lon = float(message.text)
        if type(lon) == float:
            lon = message.text
            try:
                bot.send_location(message.chat.id, lat, lon)
            except:
                bot.send_message(message.chat.id, 'Пожалуйста, введите координаты по примеру', reply_markup=keyboard)
        else:
            bot.register_next_step_handler(message, get_lat)
    except:
        bot.send_message(message.chat.id, 'Пожалуйста, введите координаты по примеру', reply_markup=keyboard)
    else:
        bot.send_message(message.chat.id, 'Попробуйте снова', reply_markup=keyboard)
    # except:
    #     bot.send_message('Не получилось прочитать координату(((', reply_markup=keyboard)


@bot.message_handler(content_types=['text'])
def start(message):
    if message.text:
        print('Сообщение от ', message.from_user.first_name, ':', message.text)
        otvet = input('ответ на сообщение: ')
        bot.reply_to(message, str(otvet))
    if message.text == 'photo':
        answer = 'skoro budet'
        bot.send_message(message.chat.id, answer)
    elif message.text == 'video':
        bot.send_message(message.chat.id, 'poka cto net(')
    elif message.text == 'music':
        answer = 'skoro))'
        bot.send_message(message.chat.id, answer)
def text(message):
    if message.text:
        print('Сообщение от ', message.from_user.first_name, ':', message.text)
        otvet = input('ответ на сообщение: ')
        bot.reply_to(message, str(otvet))
    if message.text == 'photo':
        answer = 'skoro budet'
        bot.send_message(message.chat.id, answer)
    elif message.text == 'video':
        bot.send_message(message.chat.id, 'poka cto net(')
    elif message.text == 'music':
        answer = 'skoro))'
        bot.send_message(message.chat.id, answer)


@bot.message_handler(commands=['help'])
def welcome_help(message):
    bot.send_message(message.chat.id, 'Чем я могу тебе помочь')


#Бот скачивает картинку, если ему будет отправлена картинка
@bot.message_handler(content_types=['photo'])
def handle_docs_document(message):
        file_info = bot.get_file(message.photo[len(message.photo) - 1].file_id)
        downloaded_file = bot.download_file(file_info.file_path)
        if message.caption == 'panda':
            src = 'C:/Conector/Фотки/PhotosFromTG/Дима ТГ/' + message.photo[1].file_id + '.jpg'
            with open(src, 'wb') as new_file:
                new_file.write(downloaded_file)
            bot.reply_to(message, "Фото добавлено в папку  Димы")
#################################################################
        #получение айди файла
        elif message.caption == 'пп':
            with open('id_photo.txt', 'a') as new_file:
                print(message.photo[1].file_id)
                new_file.write(message.photo[1].file_id)
            bot.reply_to(message, "Айди добавлен")
#################################################################
        else:
            src = 'C:/Users/dimak/Desktop/ПРОЕКТ/TG Posting/tg bot/Downloads/' + message.photo[1].file_id + '.jpg'
            with open(src, 'wb') as new_file:
                new_file.write(downloaded_file)
            bot.reply_to(message, "Фото добавлено")


#Бот скачивает документ, когда ему отправляют документ
@bot.message_handler(content_types=["audio"])
def handle_docs_document(message):
    file_info = bot.get_file(message.document[len(message.photo) - 1].file_id)
    downloaded_file = bot.download_file(file_info.file_path)
    src = 'C:/Users/dimak/Desktop/ПРОЕКТ/TG Posting/tg bot/Downloads/' + message.document[1].file_id +'.mp3'
    with open(src, 'wb') as new_file:
        new_file.write(downloaded_file)
    (message, "Музыка добавлена")




# @bot.message_handler(commands=['stop'])
# def stop_boot(message):
#     bot.stop_bot()




bot.polling(none_stop=True, interval=0)

#Me = 'id': 435066431


