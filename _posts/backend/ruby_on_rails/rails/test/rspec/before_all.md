userを作成するのに非常に長い時間がかかるので、絶対に1回しか実行したくない、という場合は"before :all"を使います。

describe User do
  before :all do
    # 1回しか実行されない
    @user = User.create(name: 'Alice')
  end
  it 'is valid' do
    expect(@user).to be_valid?
  end
  it 'sets name' do
    expect(@user.name).to eq 'Alice'
  end
end

https://blog.jnito.com/entry/2016/09/03/145148

複数のdescribeやcontextにまたがるのであれば、beforeブロックの中でインスタンス変数を作るという手もあります。

describe User do
  before do
    # letをやめてインスタンス変数で宣言してしまう
    @alice = User.create(name: 'Alice')
    @bob = User.create(name: 'Bob')
    @carol = User.create(name: 'Carol')
    @dave = User.create(name: 'Dave')
    @ellen = User.create(name: 'Ellen')
  end

  