Terraform で AWS provider を利用していると AMI ID をハードコードしなければならない場面があります。その都度 AMC から「最新の AMI ID なんだっけ」と探さなければならず地味に面倒でした。CloudFormation の場合は Lambda-Backed Custom Resources を使うことによって、EC2 インスタンス起動時に Lambda 関数を起動し最新 AMI ID を取得するという手法でこの問題を解決できます。詳細は以下のエントリを参照してください。
https://dev.classmethod.jp/cloud/aws/launch-ec2-from-latest-ami-by-terraform/
