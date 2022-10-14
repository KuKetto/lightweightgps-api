import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {UserData, UserDataRelations} from '../models/user-data.model';

export class UserDataRepository extends DefaultCrudRepository<
  UserData,
  typeof UserData.prototype.username,
  UserDataRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(UserData, dataSource);
  }

  async contructOnNewRegister(
    username: string | undefined,
    userID: string,
    email: string,
    userSalt: string
  ): Promise<UserData> {
    return this.create(
      new UserData({
        userID: userID,
        username: username,
        salt: userSalt,
        email: email
      })
    )
  }

  async getMail(
    username: string
  ): Promise<UserData | null> {
    if (username === undefined) return null;
    return this.findOne({where: {username: username}});
  }

  async usernameUniqueTest(
    username: string
  ): Promise<UserData | null> {
    return this.findOne({where: {username: username}});
  }

  async getUserSalt(
    mail: string
  ): Promise<string | undefined> {
    const user = await this.findOne({where: {
      email: mail
    }})
    return user?.salt;
  }
}