class CommentsController < ApplicationController

  # def create
  #   @comment = Comment.new(comments_params)
  #   if @comment.save
  #     render json: @comment
  #   else
  #     render json: @comment.errors, status: :unprocessable_entity
  #   end
  # end

  def create
      @photo = Photo.find(params[:photo_id])
      @comment = @photo.comments.new
      if @comment.save
          render json: @comment
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
    end

  private
  def comments_params
    params.require(:comment).permit(:body)
  end

end
