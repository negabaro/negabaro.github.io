```
 app/controllers/front/base_controller.rb

class Front::BaseController < ApplicationController
  include Front::ErrorHandler
---
module Front::ErrorHandler
  extend ActiveSupport::Concern
  included do
    unless Rails.env.development?
      rescue_from Exception,                      with: :render_500
      rescue_from ActiveRecord::RecordInvalid,    with: :render_422
      rescue_from ActiveRecord::RecordNotFound,   with: :render_404
    end
```
