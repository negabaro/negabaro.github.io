
/bin/su webapp -c bundle exec rake assets:precompile


2020/05/11 07:50:44.429497 [ERROR] An error occurred during execution of command [app-deploy] - [rake tasks]. Stop running the command. Error: running rake task assets:precompile failed with error command bundle exec rake assets:precompile failed with error Command /bin/su webapp -c bundle exec rake assets:precompile failed with error exit status 1 

tail -f /var/log/eb-engine.log



sudo -i 
su - webapp

LoadError: Could not load the 'listen' gem. Add `gem 'listen'` to the development group of your Gemfile


https://austingwalters.com/rails-6-on-elastic-beanstalk/

---

に変更して対処をするが、Elastic Beanstalk の場合は Hook 処理を書き換えるため、
以下のようなファイルをプロジェクト直下に作って環境をカスタマイズします。
Elastic Beanstalk の拡張については公式ドキュメントを参考に。

$APP_HOME/.ebextentions/01_rails.config



https://qiita.com/lassy423/items/9dea3bf2d8e3f139a72b

```ruby
commands:

  01_install_yarn:
    command: "sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo && curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash - && sudo yum install yarn -y"
  02_download_nodejs:
    command: "curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -"
  03_install_nodejs:
    command: "yum -y install nodejs"
  04_mkdir_webapp_dir:
    command: "mkdir /home/webapp"
    ignoreErrors: true
  05_chown_webapp_dir:
    command: "chown webapp:webapp /home/webapp"
    ignoreErrors: true
  06_chmod_webapp_dir:
    command: "chmod 0744 /home/webapp"
    ignoreErrors: true
  07_chmod_logs:
    command: "chown webapp:webapp -R /var/app/current/log/"
    ignoreErrors: true
  08_create_log_file:
    command: "touch /var/app/current/log/production.log"
    ignoreErrors: true
  09_chown_log_production:
    command: "chown webapp:webapp /var/app/current/log/production.log"
    ignoreErrors: true
  10_chmod_log_dir:
    command: "chmod 0664 -R /var/app/current/log/"
    ignoreErrors: true
  11_update_bundler:
    command: "gem update bundler"
    ignoreErrors: true
  12_config_for_update_nokogiri:
    command: "bundle config build.nokogiri --use-system-libraries"
  13_chown_current:
    command: "chown webapp:webapp -R /var/app/current/"
    ignoreErrors: true
  14_chmod_current:
    command: "chmod 0755 -R /var/app/current/"
    ignoreErrors: true
  15_chown_current:
    command: "chown webapp:webapp -R /var/app/ondeck/"
    ignoreErrors: true
  16_chown_current:
    command: "chmod 0644 -R /var/app/ondeck/"
    ignoreErrors: true
    
container_commands:

  17_install_webpack:
    command: "npm install --save-dev webpack"
  18_config_for_update_nokogiri:
    command: "bundle config build.nokogiri --use-system-libraries"
  19_precompile:
    command: "bundle exec rake assets:precompile"
```


Could not load the 'listen' gem. Add `gem 'listen'` to the development group of your Gemfile (LoadError)