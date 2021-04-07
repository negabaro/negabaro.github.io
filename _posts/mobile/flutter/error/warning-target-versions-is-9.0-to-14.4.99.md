
fvm flutter build ios




Xcode's output:
↳
    note: Using new build system
    note: Building targets in parallel
    note: Planning build
    note: Constructing build description
    warning: The iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'FirebaseAuth' from project 'Pods')
    warning: The iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'Mantle' from project 'Pods')
    warning: The iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'FirebaseAnalyticsInterop' from project 'Pods')
    warning: The iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'FirebaseFirestore' from project 'Pods')
    warning: The iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'firebase_storage' from project 'Pods')
    warning: The iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'cloud_firestore_web' from project 'Pods')
    warning: The iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'leveldb-library' from project 'Pods')
```






---


CocoaPodsでインストールしたライブラリを Xcode12 でビルドすると次のような警告が出る場合があります。

The iOS Simulator deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.0.99.
これは Xcode12 がサポートする Deployment Target から iOS8 がドロップされたことが原因です。現状提供されている多くのライブラリが Deployment Target を iOS8 としているため、この警告が表示されることになります。

この警告には実害はないため、ライブラリ側の Deployment Target が Xcode12 に合わせて iOS9 に更新されるのを待ちましょう。

ただ、インストールしているライブラリが多い場合、Xcode の Issue Navigator に多くの警告が出てしまい、他の修正すべき警告に気付きにくくなってしまいます。これを回避するためには、次のように CocoaPods でのインストールの後処理で、ライブラリの Deployment Target を iOS9 に変更しておきましょう。

Podfile
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '9.0'
    end
  end
end
