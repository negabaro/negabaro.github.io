def proc_method
  proc = Proc.new { return p "다현"}
  proc.call
  p "채영"
end

proc_method