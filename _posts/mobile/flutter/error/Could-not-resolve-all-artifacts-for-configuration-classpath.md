
## 에러


Could not resolve all artifacts for configuration 'classpath'


```
FAILURE: Build failed with an exception.
* What went wrong:
A problem occurred configuring root project 'android'.
> Could not resolve all artifacts for configuration ':classpath'.
   > Could not resolve com.android.tools.build:gradle:3.5.0.
     Required by:
         project :
      > Could not resolve com.android.tools.build:gradle:3.5.0.
         > Could not get resource 'https://dl.google.com/dl/android/maven2/com/android/tools/build/gradle/3.5.0/gradle-3.5.0.pom'.
            > Could not GET 'https://dl.google.com/dl/android/maven2/com/android/tools/build/gradle/3.5.0/gradle-3.5.0.pom'.
               > sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
   > Could not resolve com.google.gms:google-services:4.3.3.
     Required by:
         project :
      > Could not resolve com.google.gms:google-services:4.3.3.
         > Could not get resource 'https://dl.google.com/dl/android/maven2/com/google/gms/google-services/4.3.3/google-services-4.3.3.pom'.
            > Could not GET 'https://dl.google.com/dl/android/maven2/com/google/gms/google-services/4.3.3/google-services-4.3.3.pom'.
               > sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
   > Could not resolve com.android.tools.build:gradle:3.5.0.
     Required by:
         project : > com.akaita.android:easylauncher:1.3.1
      > Could not resolve com.android.tools.build:gradle:3.5.0.
         > Could not get resource 'https://dl.google.com/dl/android/maven2/com/android/tools/build/gradle/3.5.0/gradle-3.5.0.pom'.
            > Could not GET 'https://dl.google.com/dl/android/maven2/com/android/tools/build/gradle/3.5.0/gradle-3.5.0.pom'.
               > sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.
* Get more help at https://help.gradle.org
BUILD FAILED in 31s
Running Gradle task 'assembleRelease'...                           33.4s
Gradle task assembleRelease failed with exit code 1
```


## 이걸로 해결?

in the file: .flutter/packages/flutter_tools/gradle/flutter.gradle :
```
buildscript {
    repositories {
        maven {
            url 'https://dl.google.com/dl/android/maven2'
        }
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.2'
    }
}
```

안됨..


You're trying to use actual Gradle. For Android development, there's Android Gradle which is currently on version 3.5.3 which came out this month. Read this article: https://developer.android.com/studio/releases/gradle-plugin#3-5-0.

EDIT: To use the latest version of Android Gradle (3.5.3), you need Gradle versions between 5.4.1-5.6.4 which you can configure in the gradle-wrapper.properties file. I guess Android Gradle doesn't yet support Gradle 6.

https://stackoverflow.com/questions/59482329/flutter-problems-could-not-resolve-all-artifacts-for-configuration-classpath#


The problem probably was caused by updating the gradle. The Android Studio always asks you to update it, but don't do this for flutter apps. I had the same issue and I solved with the following versions:

On build.gradle module level:

```
buildscript {
    ext.kotlin_version = '1.3.50'
    repositories {
        google()
        jcenter()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}
```

---

https://github.com/flutter/flutter/issues/23553