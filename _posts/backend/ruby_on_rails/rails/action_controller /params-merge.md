params에 merge붙이는 어프로치


뷰에 넣기 싫은 로직

그런데 이거보다


걍 모델에 넣는게 더 좋은듯

뭔말이냐면

@ouu = xx.build

@ouu.department = 'xx'

---------

def create
Question.create(create_params)
redirect_to :root and return
end

private
def create_params
params.require(:question).permit(:text).merge(user_id: current_user.id, group_id: current_user.group_id)
end

mergeメソッドを使うことによって、ストロングパラメーター(create_params)が生成される際にuser_idとgroup_idのキーと値を持つハッシュを追加することができます。