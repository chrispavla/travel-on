class PointOfInterestsController < ApplicationController
  wrap_parameters format: []
  
  def create 
    pointOfInterest = PointOfInterest.create!(pointOfInterest_params)
    render json: pointOfInterest, status: :created
  end

  private 

  def pointOfInterest_params
    params.permit(:name, :image, :note, :user_id, :location_id, :category)
  end


end
