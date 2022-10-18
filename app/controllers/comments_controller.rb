class CommentsController < ApplicationController
  wrap_parameters format: []

  # def index 
  #   render json: Comment.all, status: :ok
  # end

  def specific_point_of_interest 
    render json: Comment.where(point_of_interest_id: params[:point_of_interest_id]), status: :ok
  end

  def create 
    comment = Comment.create!(comment_params)
    render json: comment, status: :created
  end

  def destroy 
    comment = Comment.find(params[:id])
    comment.destroy
    render json: {}, status: :ok
  end

  private 

  def comment_params 
    params.permit(:comment, :rating, :user_id, :point_of_interest_id)
  end

end
