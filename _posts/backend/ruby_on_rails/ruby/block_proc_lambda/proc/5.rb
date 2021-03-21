def sample(&katamari)
  katamari.call
end

sample do p "test" end

proc1 = Proc.new do
  p "hoge"
end


sample proc1