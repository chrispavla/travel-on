class PointOfInterestsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  wrap_parameters format: []
  
  def index 
    render json: PointOfInterest.all, status: :ok
  end

  def show 
    pointOfInterest = PointOfInterest.find(params[:id])
    render json: pointOfInterest, status: :ok
  end
  
  def create 
    pointOfInterest = PointOfInterest.create!(pointOfInterest_params)
    render json: pointOfInterest, status: :created
  end

  def update 
    pointOfInterest = PointOfInterest.find(params[:id])
    pointOfInterest.update!(pointOfInterest_params)
    render json: pointOfInterest, status: :accepted
  end

  def destroy
    pointOfInterest = PointOfInterest.find(params[:id])
    pointOfInterest.destroy
    render json: {}, status: :ok
  end

  private 

  def pointOfInterest_params
    params.permit(:name, :image, :note, :user_id, :location_id, :category)
  end

  def record_invalid (invalid)
    render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def record_not_found
    render json: { error: "Place not found" }, status: :not_found
  end

end
