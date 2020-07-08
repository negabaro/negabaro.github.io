roles = {"지도자"=>:Leader, "스탭"=>:Staff, "학생"=>:Student, "운영자"=>:Manager, "팬"=>:Fan}

role_list = ["Staff", "Fan"]
pp role_list&.map{|m| roles.key(m.intern)}.join(",")