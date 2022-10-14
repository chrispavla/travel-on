class PointOfInterestsController < ApplicationController
  wrap_parameters format: []
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  
  def index 
    render json: PointOfInterest.all, status: :ok
    # PointOfInterest.where("location_id = '1'")
  end
  
  def create 
    pointOfInterest = PointOfInterest.create!(pointOfInterest_params)
    render json: pointOfInterest, status: :created
  end

  private 

  def pointOfInterest_params
    params.permit(:name, :image, :note, :user_id, :location_id, :category)
  end

  def record_invalid (invalid)
    render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end


end
