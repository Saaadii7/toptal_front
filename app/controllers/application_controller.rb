# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include Pagy::Backend

  protect_from_forgery with: :null_session
  respond_to :json

  # before_action :underscore_params!
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user

  # Handle authorization exceptions
  rescue_from CanCan::AccessDenied do |exception|
    errors([], "You don't have permission to #{exception.action} #{(exception.subject.class.name || '').pluralize}",
           403)
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    errors([], exception, 404)
  end

  def success(data, message, status = 200)
    render(json: { message:, data: }, status:)
    nil
  end

  def errors(errors, message, status = 400)
    render(json: { message:, errors: }, status:)
    nil
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def authenticate_user!(_options = {})
    head :unauthorized unless signed_in?
  end

  def current_user
    @current_user ||= super || User.find_by_api_token(@token)
  end

  def signed_in?
    @current_user.present?
  end

  def authenticate_user
    return unless request.headers['Authorization'].present?

    @token = request.headers['Authorization'].split(' ').last
    @current_user = User.find_by_api_token(@token)
  end
end
