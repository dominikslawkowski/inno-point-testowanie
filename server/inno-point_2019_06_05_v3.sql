-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 05 Cze 2019, 22:28
-- Wersja serwera: 10.1.38-MariaDB
-- Wersja PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `inno-point`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project`
--

CREATE TABLE `project` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` char(50) DEFAULT NULL,
  `short_description` text,
  `long_description` text,
  `team_id` int(10) UNSIGNED DEFAULT NULL,
  `goals` char(255) DEFAULT 'undefined',
  `scopes` char(255) DEFAULT 'undefined',
  `number_of_members` int(10) UNSIGNED DEFAULT NULL,
  `technology` char(255) DEFAULT 'undefined',
  `tags` char(255) DEFAULT 'undefined',
  `mentor_id` int(11) UNSIGNED DEFAULT NULL,
  `requirements` char(255) DEFAULT 'undefined',
  `academic_contact_id` int(10) UNSIGNED DEFAULT NULL,
  `theme_color` char(11) DEFAULT NULL,
  `verified` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `project`
--

INSERT INTO `project` (`id`, `name`, `short_description`, `long_description`, `team_id`, `goals`, `scopes`, `number_of_members`, `technology`, `tags`, `mentor_id`, `requirements`, `academic_contact_id`, `theme_color`, `verified`) VALUES
(1, 'InnoPoint', 'Platform to projects management.', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.', 1, 'Suspendisse faucibus interdum posuere lorem ipsum,Nulla porttitor massa id neque aliquam,Ultrices dui sapien eget mi proin sed', 'Molestie at elementum eu facilisis sed odio morbi quis commodo. Mattis nunc,Fringilla est ullamcorper eget nulla,Vulputate odio ut enim blandit volutpat maecenas', 5, 'React.js,JavaScript,Node.js,CSS,HTML', 'Platforma,Projekty,WebDev', NULL, 'asdasdas', NULL, '#3f51b5', 1),
(2, 'ReportApp', 'Bugs reporting and cataloging application', 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.', 2, 'Molestie at elementum eu facilisis sed odio morbi quis commodo. Mattis nunc,Fringilla est ullamcorper eget nulla,Vulputate odio ut enim blandit volutpat maecenas', 'Dignissim suspendisse in est ante in nibh,Fames ac turpis egestas integer. Sagittis eu volutpat odio facilisis mauris sit amet,In pellentesque massa placerat', 3, 'Angular,JavaScript,TypeScript,CSS,HTML', 'Bugs,Reporting,App', NULL, 'asdasdas', NULL, '#05bbd4', 1),
(3, 'LiveForms', 'LiveForms', 'undefined', 3, 'undefined', 'undefined', 4, 'undefined', 'super projekt, tomek na leadera', NULL, 'undefined', NULL, '#2196f3', 0),
(4, 'abvc', 'asd', 'undefined', NULL, 'undefined', 'undefined', 2, 'undefined', 'nie,fajny projekt', NULL, 'undefined', NULL, '#f44336', 0),
(5, 'asdasd', 'asdads', 'undefined', NULL, 'undefined', 'undefined', 2, 'undefined', 'taki,sobie projekt', NULL, 'undefined', NULL, '#00bcd4', 0),
(15, 'rrr', 'fgh', NULL, NULL, '', 'undefined', 5, 'undefined', '', NULL, 'undefined', NULL, '#f44336', 1),
(20, 'dddd', 'wqer', NULL, NULL, '', 'undefined', 5, 'undefined', 'tq,sdf,sd,f,fff,ffff,fffffffff', NULL, 'undefined', NULL, '#9c27b0', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `team`
--

CREATE TABLE `team` (
  `id` int(11) UNSIGNED NOT NULL,
  `leader_id` int(10) UNSIGNED DEFAULT NULL,
  `project_id` int(11) UNSIGNED DEFAULT NULL,
  `open` tinyint(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `team`
--

INSERT INTO `team` (`id`, `leader_id`, `project_id`, `open`) VALUES
(1, 28977211, 1, 0),
(2, 5, NULL, 0),
(3, 7, 2, 1),
(4, NULL, NULL, NULL),
(5, NULL, NULL, NULL),
(6, NULL, NULL, NULL),
(7, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` char(25) DEFAULT NULL,
  `surname` char(25) DEFAULT NULL,
  `email` char(50) DEFAULT NULL,
  `team_id` int(10) UNSIGNED DEFAULT NULL,
  `role` varchar(30) NOT NULL,
  `token` text,
  `github_picture` char(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `email`, `team_id`, `role`, `token`, `github_picture`) VALUES
(2, 'Kamil', 'Kucharski', NULL, 1, 'DEVELOPER', '0000000000000000000000000000000000000000', 'https://avatars2.githubusercontent.com/u/37478328?v=4'),
(3, 'Jakub', 'Pawłowski', NULL, 2, 'DEVELOPER', '0000000000000000000000000000000000000000', 'https://avatars2.githubusercontent.com/u/37478328?v=4'),
(4, 'Artur', 'Frącala', NULL, 2, 'DEVELOPER', '0000000000000000000000000000000000000000', 'https://avatars2.githubusercontent.com/u/37478328?v=4'),
(5, 'Karol', 'Maśluch', NULL, 2, 'DEVELOPER', '0000000000000000000000000000000000000000', 'https://avatars2.githubusercontent.com/u/37478328?v=4'),
(6, 'Mateusz', 'Witkowski', NULL, 2, 'LEADER', '0000000000000000000000000000000000000000', 'https://avatars2.githubusercontent.com/u/37478328?v=4'),
(7, 'Wojciech', 'Dunaj', NULL, 3, 'DEVELOPER', '0000000000000000000000000000000000000000', 'https://avatars2.githubusercontent.com/u/37478328?v=4'),
(8, 'Daria', 'Łabaj', NULL, 3, 'DEVELOPER', '0000000000000000000000000000000000000000', 'https://avatars2.githubusercontent.com/u/37478328?v=4'),
(9, 'Alicja', 'Zalewska', NULL, 3, 'LEADER', '0000000000000000000000000000000000000000', 'https://avatars0.githubusercontent.com/u/31382349?v=4'),
(3074083, 'Jakub Sikora', NULL, 'null', NULL, 'MENTOR', '0000000000000000000000000000000000000000', 'https://avatars0.githubusercontent.com/u/31382349?v=4'),
(26376261, 'Karol Maśluch', NULL, NULL, NULL, 'ADMIN', '5555555555555555555555555555555555555555', 'https://avatars1.githubusercontent.com/u/26376261?v=4'),
(28977211, 'Dominik', 'Slawkowski', 'dominik.slawkowski@gmail.com', 1, 'LEADER', '0000000000000000000000000000000000000000', 'https://avatars0.githubusercontent.com/u/28977211?v=4'),
(31382349, 'Tomasz Przybył', NULL, 'tomasz.przybyl.it@gmail.com', NULL, 'MENTOR', '0000000000000000000000000000000000000000', 'https://avatars0.githubusercontent.com/u/31382349?v=4'),
(37478328, 'Artur', 'Frącala', 'null', NULL, 'ADMIN', '0000000000000000000000000000000000000000', 'https://avatars2.githubusercontent.com/u/37478328?v=4'),
(48491260, 'Janusz', 'Biznesu', NULL, NULL, 'ADMIN', '0000000000000000000000000000000000000000', 'https://avatars1.githubusercontent.com/u/48491260?v=4');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team` (`team_id`),
  ADD KEY `mentor` (`mentor_id`),
  ADD KEY `academic_contact` (`academic_contact_id`);

--
-- Indeksy dla tabeli `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leader` (`leader_id`),
  ADD KEY `project` (`project_id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_team` (`team_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT dla tabeli `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48491261;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `academic_contact` FOREIGN KEY (`academic_contact_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `mentor` FOREIGN KEY (`mentor_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);

--
-- Ograniczenia dla tabeli `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `leader` FOREIGN KEY (`leader_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

--
-- Ograniczenia dla tabeli `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
