proc1 = Proc.new do
  p "hoge"
end

def give_me_block    # (&block)を除去
  yield
end


# give_me_block proc1

def sample(proc)
  #puts sample_proc_3.call(2)
  proc.call
  #yield
end

# sample { |n| n ** 4 }
sample proc1