-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 20 2020 г., 13:42
-- Версия сервера: 8.0.12
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `spabd`
--

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `author` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `title`, `text`, `author`) VALUES
(1, 'Инновационные разработки российских программистов на Google IO', 'Петрова Марина и Швец Василий выступили на международной конференции для IT специалистов, где их проекты получили широкий общественный резонанс и заинтересовали руководство компании Google.', 'Journalist'),
(3, 'Встреча президентов', 'Действующие президенты России, США и Франции встретились в Вашингтоне для обсуждения текущей ситуации в мире. Были заключены крупные экономические сделки и партнёрские договоры.', 'Journalist'),
(8, 'Марина Петрова модифицировала приложение!', 'Марина впервые начала работу над web-приложением с использованием базы данных MySQL. Кроме того, в приложении применяется библиотека React и реализована работа с API.', 'SensationMan');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(50) NOT NULL,
  `login` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `photo` varchar(500) DEFAULT 'https://im0-tub-ru.yandex.net/i?id=ed4a2fb1a4afbaaa44b56fe9ea758320&n=13&exp=1',
  `info` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `name`, `password`, `photo`, `info`) VALUES
(1, 'Journalist', 'Фролов Дмитрий', '12345', 'https://mefart.ru/images/portfolio/business/Business-portrait-46.jpg', 'Фролов Дмитрий является главным редактором газеты \"Политический вестник\". Работает в сфере журналистики более 10 лет, имеет награду \"Автор лучшей статьи на политическую тему\" Всероссийского конкурса журналистов. На нашем портале его статьи набирают рекордное количество просмотров и откликов читателей. '),
(2, 'Ann', 'Липченко Анна', '54321', 'https://i.pinimg.com/736x/64/ea/a2/64eaa262e3c5e981a78ed06c871ba0c8--business-outfit-business-portrait.jpg', 'Анна имеет высшее образование по специальности \"Журналистика\" и работает в данной сфере уже 5 лет. Также она автор нашумевшего бестселлера \"Удивительный мир\", который писала, путешествуя вокруг света в течение трёх лет. На нашем портале она работает со дня его основания и её публикации любят и ждут посетители нашего сайта.'),
(3, 'SensationMan', 'Лопатин Евгений', 'artyom', 'http://www.upruda.ru/images/business-portraits/011.jpg', 'Артём 3 года работает главным корреспондентом программы \"Вести России\", и 6 лет автором рубрики \"Мировые новости\" газеты \"Аргументы и факты\" и постоянным сотрудником новостного агентства \"Медуза\". Он недавно вступил в команду нашего портала, но его статьи уже пользуются популярностью у наших пользователей.');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
