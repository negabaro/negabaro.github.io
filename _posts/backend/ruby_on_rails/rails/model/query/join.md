

일단 includes는 특별한 친구이기 때문에 includes를 제외한 나머지에 대한 설명부터 하겠다.

left_joins vs joins vs eager_load vs preload vs references

차이에 대해서

# join을 하기도 안하기도 한다.

includes


# join을 한다

joins,left_joins,eager_load


# join을 안한다.

preload

# left outer join을 한다

left_joins,eager_load

# inner join을 한다.

joins


# 캐싱을 한다

eager_load,preload

# 캐싱을 안한다

joins,left_joins



joins

# where가 가능

includes

# where가 불가능

preload

joins

----------


# left_joins

LEFT OUTER JOIN

Organization.left_joins(:other_parent)
   (3.8ms)  SET NAMES utf8mb4,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
  Organization Load (53.2ms)  SELECT `organizations`.* FROM `organizations` LEFT OUTER JOIN `organizations` `other_parents_organizations` ON `other_parents_organizations`.`id` = `organizations`.`organization_other_parent_id`

 Organization.left_joins(:other_parent).count
   (6.7ms)  SELECT COUNT(*) FROM `organizations` LEFT OUTER JOIN `organizations` `other_parents_organizations` ON `other_parents_organizations`.`id` = `organizations`.`organization_other_parent_id`
=> 4445


# joins

INNER JOIN

Organization.joins(:other_parent)
  Organization Load (24.5ms)  SELECT `organizations`.* FROM `organizations` INNER JOIN `organizations` `other_parents_organizations` ON `other_parents_organizations`.`id` = `organizations`.`organization_other_parent_id`
=> [#<Organization:0x00007fb8f59709e0

join대상이 

Organization.joins(:other_parent).count
   (7.3ms)  SELECT COUNT(*) FROM `organizations` INNER JOIN `organizations` `other_parents_organizations` ON `other_parents_organizations`.`id` = `organizations`.`organization_other_parent_id`
=> 3184


  # preload
上のincludesの説明を読んで欲しい。whereを使うことのできないincludes。
eager_loadと違って、JOINしたくない大きいテーブルを扱うときはpreloadを使うのがいい。

指定したassociationを複数のクエリに分けて引いてキャッシュする。
複数のassociationをeager loadingするときとか、あまりJOINしたくないでかいテーブルを扱うときはpreloadを使うのがよさそう。
preloadしたテーブルによって絞り込もうとすると、例外を投げる

   Organization.preload(:other_parent)
  Organization Load (15.4ms)  SELECT `organizations`.* FROM `organizations`
  Organization Load (10.4ms)  SELECT `organizations`.* FROM `organizations` WHERE `organizations`.`id` IN (29, 32, 6, 8, 35, 52, 50, 69, 40, 77, 70, 43, 63, 64, 56, 279, 47, 203, 204, 91, 206, 211, 210, 330, 329, 217, 221, 224, 227, 229, 236, 237, 241, 246, 248, 170, 152, 250, 92, 252, 183, 312, 260, 140, 184, 269, 270, 191, 274, 277, 142, 285, 287, 144, 192, 292, 294, 297, 299, 298, 301, 326, 302, 303, 306, 449, 439, 452, 453, 447, 414, 489, 463, 464, 466, 482, 484, 473, 478, 441, 487, 378, 358, 404, 355, 406, 373, 388, 570, 602, 568, 513, 516, 518, 514, 504, 508, 573, 607, 606, 584, 609, 593, 618, 576, 552, 553, 554, 555, 557, 540, 538, 541, 544, 636, 637, 587, 527, 582, 597, 532, 533, 650, 655, 659, 676, 677, 679, 680, 667, 701, 687, 648, 693, 790, 724, 714, 759, 729, 780, 766, 750, 730, 734, 757, 756, 751, 740, 738, 771, 333, 213, 243, 265, 267, 569, 773, 781, 560, 627, 395, 15, 2, 3, 28, 31, 11, 27, 5, 9, 4, 18, 7, 20, 17, 33, 34, 819, 61, 85, 83, 53, 57, 42, 86, 59, 54, 60, 51, 68, 90, 796, 84, 383, 384, 385, 386, 380, 387, 374, 391, 393, 411, 353, 362, 365, 195, 101, 207, 181, 129, 110, 159, 219, 220, 223, 125, 194, 228, 120, 231, 234, 137, 138, 239, 242, 244, 113, 245, 169, 398, 341, 186, 188, 258, 190, 259, 263, 316, 344, 202, 106, 284, 108, 196, 147, 295, 175, 403, 397, 325, 99, 176, 418, 467, 494, 427, 442, 454, 491, 445, 475, 429, 421, 440, 443, 436, 457, 472, 424, 465, 461, 459, 539, 558, 556, 549, 564, 502, 599, 496, 638, 631, 506, 600, 642, 641, 580, 612, 616, 604, 586, 529, 624, 528, 621, 572, 575, 588, 565, 628, 498, 630, 626, 530, 505, 595, 562, 547, 594, 614, 669, 678, 670, 673, 685, 668, 684, 683, 688, 1242, 645, 646, 657, 660, 651, 665, 663, 705, 708, 697, 698, 699, 710, 712, 715, 782, 722, 727, 752, 716, 763, 720, 742, 731, 1092, 739, 760, 768, 749, 14, 10, 12, 16, 22, 39, 13, 26, 71, 212, 829, 832, 81, 66, 82, 75, 58, 394, 410, 855, 95, 155, 156, 209, 332, 158, 160, 334, 226, 310, 133, 163, 335, 134, 164, 171, 1241, 93, 313, 343, 185, 187, 256, 910, 881, 273, 275, 278, 100, 345, 197, 1243, 871, 198, 455, 420, 801, 432, 493, 462, 992, 425, 598, 511, 601, 535, 522, 523, 1004, 525, 611, 615, 617, 995, 577, 578, 579, 1014, 623, 534, 531, 542, 658, 662, 696, 649, 664, 691, 694, 682, 671, 666, 689, 690, 1240, 711, 704, 700, 709, 792, 1115, 717, 721, 761, 776, 728, 1087, 1102, 784, 1089, 1116, 754, 758, 1105, 1107, 735, 736, 770, 719, 1179, 777, 775, 774, 789, 772, 786, 44, 174, 165, 214, 347, 199, 328, 409, 377, 450, 481, 497, 509, 546, 567, 633, 1100, 474, 635, 654, 785, 753, 675, 503, 764, 124, 583, 423, 30, 65, 72, 79, 281, 232, 354, 251, 105, 361, 112, 369, 200, 230, 311, 103, 271, 1244, 399, 477, 486, 479, 605, 571, 656, 703, 652, 762, 162, 280, 300, 130, 123, 121, 153, 151, 1246, 366, 360, 428, 448, 1247, 1248, 625, 1245, 1060, 681, 707, 661, 1110, 1091, 19, 21, 23, 24, 25, 36, 37, 38, 41, 45, 46, 48, 49, 55, 62, 67, 73, 74, 76, 78, 80, 87, 88, 89, 94, 96, 97, 98, 102, 104, 107, 109, 111, 114, 115, 116, 117, 118, 119, 122, 126, 127, 128, 131, 132, 135, 136, 139, 141, 143, 145, 146, 148, 149, 150, 154, 157, 161, 166, 167, 168, 172, 173, 177, 178, 179, 180, 182, 189, 193, 201, 205, 208, 215, 216, 218, 222, 225, 233, 235, 238, 240, 247, 249, 253, 254, 255, 257, 261, 262, 264, 266, 268, 272, 276, 282, 283, 286, 288, 289, 290, 291, 293, 296, 304, 305, 307, 308, 309, 314, 315, 317, 318, 319, 320, 321, 322, 323, 324, 327, 331, 336, 337, 338, 339, 340, 342, 346, 348, 349, 350, 351, 352, 356, 357, 359, 363, 364, 367, 368, 370, 371, 372, 375, 376, 379, 381, 382, 389, 390, 392, 396, 400, 401, 402, 405, 407, 408, 412, 413, 415, 416, 417, 419, 422, 426, 430, 431, 433, 434, 435, 437, 438, 444, 446, 451, 456, 458, 460, 468, 469, 470, 471, 476, 480, 483, 485, 488, 490, 492, 495, 499, 500, 501, 507, 510, 512, 515, 517, 519, 520, 521, 524, 526, 536, 537, 543, 545, 548, 550, 551, 559, 561, 563, 566, 574, 581, 585, 589, 590, 591, 592, 596, 603, 608, 610, 613, 619, 620, 622, 629, 632, 634, 639, 640, 643, 644, 647, 653, 672, 674, 686, 692, 695, 702, 706, 713, 718, 723, 725, 726, 732, 733, 737, 741, 743, 744, 745, 746, 747, 748, 755, 765, 767, 769, 778, 779, 783, 787, 788, 791, 793, 794, 795, 797, 798, 799, 800, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 820, 821, 822, 823, 824, 825, 826, 827, 828, 830, 831, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 872, 873, 874, 875, 876, 877, 878, 879, 880, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 993, 994, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1088, 1090, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1101, 1103, 1104, 1106, 1108, 1109, 1111, 1112, 1113, 1114, 1117, 1118, 184400, 185532)
=> [#<Organization:0x00007fb8f3e304c8


[61] pry(main)> Organization.preload(:other_parent).count
   (3.7ms)  SELECT COUNT(*) FROM `organizations`
=> 4445


# includes

includesしたテーブルでwhereによる絞り込みを行っている
includesしたassociationに対してjoinsかreferencesも呼んでいる
任意のassociationに対してeager_loadも呼んでいる
のうちいずれかを満たす場合、eager_loadと同じ挙動(LEFT JOIN)を行い、
そうでなければpreloadと同じ挙動(クエリを分けて実行)をする。
絞り込みが必要な時に例外を投げずeager_loadにfallbackするpreload。

Organization.includes(:other_parent).count
   (3.0ms)  SELECT COUNT(*) FROM `organizations`
=> 4445

whereで絞り込みができるpreload。


# references

Works only with includes, makes includes behaves like eager_load

 Organization.references(:other_parent)
  Organization Load (15.3ms)  SELECT `organizations`.* FROM `organizations`

# eager_load

正直、includesの説明と被ってしまうと思うが、includes+referenceの動きをする。
eager_loadは指定したアソシエーションをLEFT OUTER JOINで取得し、キャシュする。
また、preloadとは違いは、指定したテーブルに対しての絞り込み（where）が行える。

指定したassociationをLEFT OUTER JOINで引いてキャッシュする。
クエリの数が1個で済むので場合によってはpreloadより速い。
JOINしているので、preloadと違って、joinsと同じようにJOINしたテーブルで絞込ができる。

[59] pry(main)> Organization.eager_load(:other_parent)
  SQL (31.8ms)  SELECT `organizations`.`id` AS t0_r0, `organizations`.`entity_id` AS t0_r1, `organizations`.`invite_code` AS t0_r2, `organizations`.`parent_id` AS t0_r3, `organizations`.`organization_other_parent_id` AS t0_r4, `organizations`.`name` AS t0_r5, `organizations`.`name_kana` AS t0_r6, `organizations`.`name_eng` AS t0_r7, `organizations`.`address_zipcode` AS t0_r8, `organizations`.`address_prefecture_code` AS t0_r9, `organizations`.`address_city` AS t0_r10, `organizations`.`address_street` AS t0_r11, `organizations`.`address_building` AS t0_r12, `organizations`.`tel` AS t0_r13, `organizations`.`fax` AS t0_r14, `organizations`.`representative_first_name` AS t0_r15, `organizations`.`representative_last_name` AS t0_r16, `organizations`.`representative_first_name_kana` AS t0_r17, `organizations`.`representative_last_name_kana` AS t0_r18, `organizations`.`representative_first_name_eng` AS t0_r19, `organizations`.`representative_last_name_eng` AS t0_r20, `organizations`.`representative_position` AS t0_r21, `organizations`.`official_url` AS t0_r22, `organizations`.`univas_membership_type` AS t0_r23, `organizations`.`k_code` AS t0_r24, `organizations`.`org_type` AS t0_r25, `organizations`.`corporation_type` AS t0_r26, `organizations`.`university_type` AS t0_r27, `organizations`.`sports_club_league_branch` AS t0_r28, `organizations`.`management_number` AS t0_r29, `organizations`.`membership_registration_date` AS t0_r30, `organizations`.`corporation_char_position` AS t0_r31, `organizations`.`foundation_type` AS t0_r32, `organizations`.`ancestry` AS t0_r33, `organizations`.`created_at` AS t0_r34, `organizations`.`updated_at` AS t0_r35, `other_parents_organizations`.`id` AS t1_r0, `other_parents_organizations`.`entity_id` AS t1_r1, `other_parents_organizations`.`invite_code` AS t1_r2, `other_parents_organizations`.`parent_id` AS t1_r3, `other_parents_organizations`.`organization_other_parent_id` AS t1_r4, `other_parents_organizations`.`name` AS t1_r5, `other_parents_organizations`.`name_kana` AS t1_r6, `other_parents_organizations`.`name_eng` AS t1_r7, `other_parents_organizations`.`address_zipcode` AS t1_r8, `other_parents_organizations`.`address_prefecture_code` AS t1_r9, `other_parents_organizations`.`address_city` AS t1_r10, `other_parents_organizations`.`address_street` AS t1_r11, `other_parents_organizations`.`address_building` AS t1_r12, `other_parents_organizations`.`tel` AS t1_r13, `other_parents_organizations`.`fax` AS t1_r14, `other_parents_organizations`.`representative_first_name` AS t1_r15, `other_parents_organizations`.`representative_last_name` AS t1_r16, `other_parents_organizations`.`representative_first_name_kana` AS t1_r17, `other_parents_organizations`.`representative_last_name_kana` AS t1_r18, `other_parents_organizations`.`representative_first_name_eng` AS t1_r19, `other_parents_organizations`.`representative_last_name_eng` AS t1_r20, `other_parents_organizations`.`representative_position` AS t1_r21, `other_parents_organizations`.`official_url` AS t1_r22, `other_parents_organizations`.`univas_membership_type` AS t1_r23, `other_parents_organizations`.`k_code` AS t1_r24, `other_parents_organizations`.`org_type` AS t1_r25, `other_parents_organizations`.`corporation_type` AS t1_r26, `other_parents_organizations`.`university_type` AS t1_r27, `other_parents_organizations`.`sports_club_league_branch` AS t1_r28, `other_parents_organizations`.`management_number` AS t1_r29, `other_parents_organizations`.`membership_registration_date` AS t1_r30, `other_parents_organizations`.`corporation_char_position` AS t1_r31, `other_parents_organizations`.`foundation_type` AS t1_r32, `other_parents_organizations`.`ancestry` AS t1_r33, `other_parents_organizations`.`created_at` AS t1_r34, `other_parents_organizations`.`updated_at` AS t1_r35 FROM `organizations` LEFT OUTER JOIN `organizations` `other_parents_organizations` ON `other_parents_organizations`.`id` = `organizations`.`organization_other_parent_id`




https://qiita.com/akishin/items/36dba4b2ccdaefb53dc6
https://qiita.com/k0kubun/items/80c5a5494f53bb88dc58
https://qiita.com/ostk0069/items/23beb870adf785506be2
