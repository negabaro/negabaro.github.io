self.classで呼ぶと参照し直しになって遅くなる面もありますね」「20%速くなるってスゲエ😳」「それだけ呼び出し回数が多いということか😳」

PR: PERF: 20% faster pk attribute access by kamipo · Pull Request #36052 · rails/rails
# 同PRより
      def pk_attribute?(name)
-       name == self.class.primary_key
+       name == @primary_key
      end

      https://github.com/rails/rails/pull/36052