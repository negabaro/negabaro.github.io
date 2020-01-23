#https://engineering.huiseoul.com/%EC%9E%91%EC%9D%80-%EC%B0%A8%EC%9D%B4-9612e33838c4

# rails console

pp [].blank?
#true
pp {}.blank?
#true
pp ‘’.blank?
#true
pp ‘ ‘.blank?
#true
pp 0.blank?
#false
pp nil.blank?
#true
pp false.blank?
#true


#blank의 완벽한 반대 present

#class Object
#    def present?
#      !blank?
#    end
#  end