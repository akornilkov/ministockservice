Тестовое задание

Для запуска нужно:
1. Запустить docker-compose up -d
2. Выполнить команду "DB_HOST=mongodb://root:example@localhost:28000/ TOKEN_SECRET=tokensecret PERIOD=5 npm run start"
где период - время оповещения пользователя о росте цены акции (в секундах)

3. Для "предзагрузки" перейти на localhost:5000/dbfill

4. Для авторизации перейти на страницу localhost:5000/login