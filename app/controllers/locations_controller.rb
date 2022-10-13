class LocationsController < ApplicationController

  def index 
    render json: Location.all, status: :ok
  end 

  def show 
    location = Location.find(params[:id])
    render json: location, status: :ok
  end

end
