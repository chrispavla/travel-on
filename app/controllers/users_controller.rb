class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  skip_before_action :authorize, only: :create
  
  def show 
    if(params[:id]) 
      user = User.find(params[:id])
      render json: user, status: :ok
     else 
      render json: @current_user
     end
  end

  def create 
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update 
    user = User.find(params[:id])
    user.update!(user_params)
    render json: user, status: :accepted
  end

  def destroy 
    user = User.find(params[:id])
    user.destroy
    render json: {}, status: :ok
  end


  private 

  def user_params
    params.permit(:username, :password, :first_name, :last_name, :profile_image)
  end

  def record_invalid (invalid)
    render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def record_not_found
    render json: { error: "User not found" }, status: :not_found
  end

end
