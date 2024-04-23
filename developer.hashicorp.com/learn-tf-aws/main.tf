terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_cognito_user_pool" "pool" {
  name = "pool_from_tf"
}

# # https://cloud-images.ubuntu.com/locator/ec2/
# # https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#AMICatalog:
# resource "aws_instance" "app_server" {
#   ami           = "ami-0a1179631ec8933d7"
#   instance_type = "t2.micro"

#   tags = {
#     Name = "ExampleAppServerInstance"
#   }
# }

# data "aws_caller_identity" "current" {}

# data "aws_iam_user" "current_user" {
#     user_name = "Arata"
# }

# output "iam_user_name" {
#   value = data.aws_iam_user.current_user.user_name
# }

# output "iam_user_arn" {
#   value = data.aws_iam_user.current_user.arn
# }

# output "iam_user_id" {
#   value = data.aws_iam_user.current_user.user_id
# }

# output "iam_user_path" {
#   value = data.aws_iam_user.current_user.path
# }
