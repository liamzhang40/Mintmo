class UsersController < ApplicationController

  before_action :redirect_logged_in_users, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
     log_in_user!(@user)
     flash[:message] = ["Welcome to Mintmo, #{@user.email}! Let's get started"]
     redirect_to root_url
    else
     flash.now[:errors] = @user.errors.full_messages
     render :new
    end
  end

  def destroy
   @user = User.find(params[:id])
   @user.destroy!
  end


  private
  def redirect_logged_in_users
    if logged_in?
      redirect_to root_url
    end
  end

  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :age)
  end

end
