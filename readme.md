# Плагин для валидации форм

## Как использовать:
- Устанавливаем пакет - npm install form-validate --save
- Импортируем в js файле - import Form from 'form-validate'
- Инициализируем - const form = new Form(document.querySelectorAll('form'), {PARAMS})

## Пример вызова:
    const form = new Form(document.querySelectorAll('.form'), {
			focusValidate: true,
			fields: [
				{
					selector: '[name="name"]',
					maxLength: 32,
					realTimeRegExp: 'text',
					realTime: true,
					required: true
				},
				{
					selector: '[name="phone"]',
					realTimeRegExp: 'phone',
					realTime: true,
					required: true,
					mask: '+7 (***) ***-**-**'
				},
				{
					selector: '[name="checkbox"]',
					required: true
				}
			]
		});

		form.on('submit', function(e) {
			e.preventDefault()
		})

## Параметры:
### Общие
<table>
  <tr>
    <td><b>Параметр</b></td>
    <td><b>Тип</b></td>
    <td><b>Дефолтное значение</b></td>
    <td><b>Описание</b></td>
  </tr>
  <tr>
    <td>focusValidate</td>
    <td>boolean</td>
    <td>false</td>
    <td>Включение\выключение валидации поля при потере фокуса</td>
  </tr>
</table>

### fields
Передаем массив с объектами для каждого поля, вида field: [{fieldName: 'name', ...}, {fieldName: 'phone', ...}]
<table>
  <tr>
    <td><b>Параметр</b></td>
    <td><b>Тип</b></td>
    <td><b>Дефолтное значение</b></td>
    <td><b>Описание</b></td>
  </tr>
  <tr>
    <td>selector</td>
    <td>string</td>
    <td>-</td>
    <td>Селектор поля.</td>
  </tr>
  <tr>
    <td>maxLength</td>
    <td>integer</td>
    <td>-</td>
    <td>Максимально допустимое количество символов</td>
  </tr>
  <tr>
    <td>realTimeRegExp</td>
    <td>string, regExp</td>
    <td>-</td>
    <td>Допустимые символы для ввода в поле. Передаем либо название пресета, либо свое регулярное выражения формата <br> /[^a-zA-Zа-яА-я]+/g 
<br><br>
Пресеты:<br>
text - Буквы, цифры, без спецсимволов<br>
phone - Телефон (цифры, тире, подчеркивание, скобки, пробелы)<br>
num - Только цифры<br>
letters - Только буквы (латиница и русские)<br>
email - Email (буквы, цифры, собака, точка, тире, подчеркивание)<br>
    </td>
  </tr>
  <tr>
    <td>realTime</td>
    <td>boolean</td>
    <td>-</td>
    <td>Включение\выключение ограничения на ввод лишних символов в реальном времени. Для работы требует передачи realTimeRegExp</td>
  </tr>
  <tr>
    <td>required</td>
    <td>boolean</td>
    <td>false</td>
    <td>Обязательно ли поле к заполнению. При обязательном проверяется на пустоту.</td>
  </tr>
  <tr>
    <td>regExp</td>
    <td>string, regExp</td>
    <td>-</td>
    <td>Регулярное выражения для проверки поля перед отправкой формы. Передаем либо название пресета, либо свое регулярное выражения формата /[^a-zA-Zа-яА-я]+/ 
<br><br>
Пресеты:
phone, email</td>
  </tr>
  <tr>
    <td>mask</td>
    <td>string</td>
    <td>-</td>
    <td>Шаблон для маски поля. Пример: '+7 (***) ***-**-**'.</td>
  </tr>
  <tr>
    <td>maskRegExp</td>
    <td>regExp</td>
    <td>/\D/g (только цифры)</td>
    <td>Регулярное выражение, определяющее, какие символы доступны для подставления в маску.</td>
  </tr>
</table>

### classes
<p>Передаем объект вида: classes: {empty: 'someEmptyClass', ...}</p>
<table>
  <tr>
    <td><b>Параметр</b></td>
    <td><b>Тип</b></td>
    <td><b>Дефолтное значение</b></td>
    <td><b>Описание</b></td>
  </tr>
  <tr>
    <td>empty</td>
    <td>string</td>
    <td>empty</td>
    <td>Класс, назначаемый при пустом поле.</td>
  </tr>
  <tr>
    <td>error</td>
    <td>string</td>
    <td>error</td>
    <td>Класс, назначаемый при неверно заполненном поле.</td>
  </tr>
  <tr>
    <td>correct</td>
    <td>string</td>
    <td>correct</td>
    <td>Класс, назначаемый при корректно заполенном поле.</td>
  </tr>
</table>

<br>

## События
<p>Вешается на созданный объект формы form.on('eventName', function(e) {})</p>
<table>
  <tr>
    <td><b>Событие</b></td>
    <td><b>Принимаемые параметры</b></td>
    <td><b>Описание</b></td>
  </tr>
  <tr>
    <td>submit</td>
    <td>event</td>
    <td>Функция, вызываемая при отправке формы.</td>
  </tr>
  <tr>
    <td>empty</td>
    <td>elem</td>
    <td>Функция, срабатывающая при пустом поле.</td>
  </tr>
  <tr>
    <td>error</td>
    <td>elem</td>
    <td>Функция, срабатывающая при неверно заполненном поле.</td>
  </tr>
  <tr>
    <td>correct</td>
    <td>elem</td>
    <td>Функция, срабатывающая при корректно заполенном поле.</td>
  </tr>
</table>
