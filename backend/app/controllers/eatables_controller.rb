# frozen_string_literal: true

class EatablesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    options = {}

    items = params[:items] || 100
    page = params[:page] || 1

    # filtered_users = @eatables.ransack(params[:query]).result(distinct: true)

    @pagy, paginated_records = pagy(@eatables, items:, page:)

    options[:meta] = { total: @pagy.count }
    options[:include] = params[:include].split(',').map(&:strip).map(&:to_sym) if params[:include].present?

    render json: EatableSerializer.new(paginated_records, options)
  end

  def create
    if @eatable.save
      render json: EatableSerializer.new(@eatable), status: 201
    else
      errors(@eatable.errors, 'Something went wrong', 422)
    end
  end

  def update
    if @eatable.update(eatable_params)
      render json: EatableSerializer.new(@eatable), status: 200
    else
      errors(@eatable.errors, 'Something went wrong', 422)
    end
  end

  def destroy
    @eatable.destroy
    success({}, 'Eatable deleted Successfully', 204)
  end

  private

  def eatable_params
    params.require(:eatable).permit(:name, :eating_time, :calorie)
  end
end
