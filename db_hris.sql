-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2023 at 01:41 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_hris`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `days` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `description`, `days`, `price`) VALUES
(1, 'weq', 100, 99996),
(2, 'aeronautics', 195, 9993),
(4, 'engineering', 30, 333),
(5, 'education', 347, 657),
(6, 'business', 654, 456);

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `course_id`, `link`) VALUES
(0, 234, 'erfsdfss'),
(3, 1, 'http://127.0.0.1:5500/based_mp2-main/pages/services/'),
(4, 53, 'dfghj'),
(22, 234, 'abc'),
(24, 423423, 'ERWERWER'),
(25, 234, 'erfsdfss');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `username`, `password`, `address`, `date_time`) VALUES
(54, 'Jackson Kirkland', 'charles', '$2y$10$BKa.YvDWsWuTpYRX8anuteXt39zPDRVHZ01wpSGZeXJt/N1H3EGHG', 'Deleniti facilis quo', '2023-01-09 11:02:46');

-- --------------------------------------------------------

--
-- Table structure for table `student_course`
--

CREATE TABLE `student_course` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `complete_name` varchar(255) NOT NULL,
  `complete_address` varchar(255) NOT NULL,
  `is_completed` int(11) NOT NULL DEFAULT 0,
  `date_approved` datetime DEFAULT NULL,
  `date_expiry` date NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_course`
--

INSERT INTO `student_course` (`id`, `student_id`, `course_id`, `email`, `complete_name`, `complete_address`, `is_completed`, `date_approved`, `date_expiry`, `date_time`, `status`) VALUES
(20, 0, 0, 'vahit@mailinator.com', 'Lance Nelson', 'Dignissimos velit m', 0, NULL, '0000-00-00', '2023-01-09 11:04:50', 'PENDING');

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `complete_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`id`, `email`, `complete_name`, `address`, `username`, `password`) VALUES
(18, 'jyzoviryh@mailinator.com', 'Hammett Grimes', 'Voluptas voluptatibu', 'ronijak', '$2y$10$LCUsPzQT4cWF5KxulK/j3OfW.Px1zMedgbfTI9bd2KHAhTsUzz64q'),
(19, 'zoxyzycin@mailinator.com', 'Quintessa Mosley', 'Maiores eu vel persp', 'ryryfako', '$2y$10$nUtkLlYNhHuA4LWbgvYlfOf1j9iFodKpLLA.x5YXkhymT9T1GR1gm'),
(20, 'vyzyc@mailinator.com', 'Jerry Rosales', 'Suscipit est molest', 'bolawabafi', '$2y$10$KSHfQnt8h98/JCaji3vnIevRFa8v/9h2pDnZK9/T8IZmztIp8dn2C'),
(22, 'huxy@mailinator.com', 'Tallulah Alvarez', 'Perspiciatis delect', 'hijenixovo', '$2y$10$YoxRH.oQsX0dEXVergtybOWDsv3S/D9d6zIav24tGJ04O9jaqQzm2'),
(23, 'chryslee18@gmail.com', 'balong', 'Block 5 Lot 7 Ledesma Ville Barangay Sicsican', 'charles', '$2y$10$h2MfFkrjauo7gWJBuO1bJObknKJJ4PGiwHznBo/QtjTorlf6HA80S'),
(24, 'vugucuva@mailinator.com', 'Kylynn Vang', 'Ex qui cum voluptate', 'pabuzen', '$2y$10$I4J0toLpBwJBT3OcD/l3QenLgWb5Tj5y9iLlgOJcWkkPfNonYbX2a'),
(25, 'holyniqe@mailinator.com', 'Amena Kennedy', 'Aspernatur dolores a', 'rynawuveg', '$2y$10$4ESMndlN1rMnAjW6gT7GJ.W8KbcujIzl5wEKhMFWo8ihpXr2mRCvW'),
(26, 'fagucamy@mailinator.com', 'Morgan Romero', 'Hic molestias porro ', 'hucadyqe', '$2y$10$1tUcgClpUn6b6rPzSoa5ZONBmv8WRu67gCU55tDl7IR6Il2Eqonjq'),
(42, 'divoqygozi@mailinator.com', 'Ava Olsen', 'Quo quia hic dolorem', 'reqyl', '$2y$10$x9A9djkxg6frOyXwK.x5OOq/UG1kTAOtokHZfdhjRqV0mN/FrnsE.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_course`
--
ALTER TABLE `student_course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `student_course`
--
ALTER TABLE `student_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
