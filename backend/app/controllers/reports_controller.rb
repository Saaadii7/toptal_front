# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_role, except: [:calorie_intake]

  def calorie_intake
    req = ReportRequest.new(calorie_intake_params)

    if req.valid?(:calorie_intake)
      @grouped_eatables = @current_user
                          .eatables
                          .between(req.start, req.end)
                          .group_by_day(:eating_time)
                          .having("SUM(eatables.calorie) > #{@current_user.daily_calorie_threshold}")
                          .count

      render json: @grouped_eatables
    else
      errors(req.errors, 'Report params are not valid.')
    end
  end

  def eatables_for_last_weeks
    today = DateTime.now
    last_week = today - 7.days
    previous_last_week = last_week - 7.days
    last_eatables = Eatable.between(last_week, today).count
    previous_last_eatables = Eatable.between(previous_last_week, last_week).count
    render json: { last: last_eatables, previous: previous_last_eatables }
  end

  def average_calories
    today = DateTime.now
    last_week = today - 7.days
    last_eatables = Eatable.between(last_week, today).group(:user).average('calorie')
    last_eatables = last_eatables.map do |key, value|
      {
        id: key.id,
        name: key.name,
        email: key.email,
        average: value
      }
    end
    render json: last_eatables
  end

  private

  def authenticate_role
    head :unauthorized unless @current_user.admin?
  end

  def calorie_intake_params
    params.permit(:start, :end)
  end
end
