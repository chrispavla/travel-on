class LocationsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  wrap_parameters format: []
  
  skip_before_action :authorize, only: :index
  skip_before_action :authorize, only: :show

  def index 
    render json: Location.all, status: :ok
  end 

  def show 
    location = Location.find(params[:id])
    render json: location, status: :ok
  end

  def create 
    location = Location.create!(location_params)
    render json: location, status: :created
  end

  private 

  def location_params 
    params.permit(:city, :country, :latitude, :longitude)
  end

  def record_invalid (invalid)
    render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def record_not_found
    render json: { error: "Location not found" }, status: :not_found
  end

end
