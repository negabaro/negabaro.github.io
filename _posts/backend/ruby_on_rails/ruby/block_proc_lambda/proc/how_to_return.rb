def return_two(&p)
  pp p.call
  return 2
end

return_two(&Proc.new { return pp 1 })
# LocalJumpError: unexpected return

#def return_two()
#  p = Proc.new { return pp 1 }
#  pp p.call
#  return 2
#end
#
#return_two