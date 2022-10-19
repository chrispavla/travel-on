class LocationsController < ApplicationController

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

end
