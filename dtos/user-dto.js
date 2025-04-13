/** @format */

export class UserDto {
  constructor(model) {
    this.id = model._id;
    this.userName = model.userName;
    this.avatar = model.avatar;
    this.email = model.email;
    this.backgroundCover = model.backgroundCover;
  }
}
