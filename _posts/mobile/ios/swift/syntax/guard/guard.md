  func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    // Use this method to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`.
    // If using a storyboard, the `window` property will automatically be initialized and attached to the scene.
    // This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead).
    guard let _ = (scene as? UIWindowScene) else { return }
  }

Guardはファイルの変更を監視して特定のタスクを実行するためのツールです。

https://qiita.com/idotatsuki/items/2a31302e225cae6214e2

저는 개인적으로 간단한 처리를 할 때에는 if let을, 하나 뿐 아니라 여러가지의 변수 연산이 필요할 때에는 guard let을 사용하고 있습니다

출처: https://herohjk.com/33 [HEROHJK Document]