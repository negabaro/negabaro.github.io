list = ["ezMail@gmail.com"],
["eMail1@gmail.com"],
["eMail2@gmail.com"]


list2 =  ["eMail1@gmail.com"],
["ezMail@gmail.com"],
["eMail2@gmail.com"]

newary = list.sort{|a,b| (-1)*(a <=> b)}
pp newary