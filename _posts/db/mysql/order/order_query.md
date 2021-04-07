Organization.all_sports_club.page(1).per(30)

 Organization Load (106.8ms)  SELECT `organizations`.* FROM `organizations` INNER JOIN `roles` ON `roles`.resource_type IN ('Organization') AND
                                    (`roles`.resource_id IS NULL OR `roles`.resource_id = `organizations`.`id`) WHERE (`roles`.name IN ('SportsClub') AND `roles`.resource_type IN ('Organization')) ORDER BY `organizations`.`name_kana` ASC LIMIT 30 OFFSET 0

`ORDER BY `organizations`.`name_kana` ASC`

order_by가 있는차인데..

이차이는 ??

 Organization.all.with_role(:SportsClub).page(1).per(30)
  Organization Load (364.8ms)  SELECT `organizations`.* FROM `organizations` INNER JOIN `roles` ON `roles`.resource_type IN ('Organization') AND
                                    (`roles`.resource_id IS NULL OR `roles`.resource_id = `organizations`.`id`) WHERE (`roles`.name IN ('SportsClub') AND `roles`.resource_type IN ('Organization')) LIMIT 30 OFFSET 0


얼래 변한건가?? 잘모르겠네

Organization.all.with_role(:SportsClub).order(name_kana: 'ASC')
  Organization Load (1494.5ms)  SELECT `organizations`.* FROM `organizations` INNER JOIN `roles` ON `roles`.resource_type IN ('Organization') AND
                                    (`roles`.resource_id IS NULL OR `roles`.resource_id = `organizations`.`id`) WHERE (`roles`.name IN ('SportsClub') AND `roles`.resource_type IN ('Organization')) ORDER BY `organizations`.`name_kana` ASC


rails g migration AddIndexToUser

def change
  add_index(:accounts, [:branch_id, :party_id, :surname], order: {branch_id: :desc, party_id: :asc})
end


지워봤다


Organization.all.with_role(:SportsClub).order(name_kana: 'ASC')
   (1.8ms)  SET NAMES utf8mb4,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
  Organization Load (1396.2ms)  SELECT `organizations`.* FROM `organizations` INNER JOIN `roles` ON `roles`.resource_type IN ('Organization') AND
                                    (`roles`.resource_id IS NULL OR `roles`.resource_id = `organizations`.`id`) WHERE (`roles`.name IN ('SportsClub') AND `roles`.resource_type IN ('Organization')) ORDER BY `organizations`.`name_kana` ASC


다시실행해본 결과

별차이가없다는 사실발견