import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {TrackData, TrackDataRelations} from '../models';
import { uid } from '../services/id_gen';

export class TrackDataRepository extends DefaultCrudRepository<
  TrackData,
  typeof TrackData.prototype.trackID,
  TrackDataRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(TrackData, dataSource);
  }

  async addTrackData(
    userID: string,
    startTime: string,
    endTime: string,
    totalDistance: Number,
    averageVelocity: Number,
    velocities: Array<{
      from: Number,
      to: Number,
      velocity: Number
    }>
  ): Promise<boolean> {
    try {
      await this.create({
        trackID: await this.genTID(),
        userID: userID,
        startTime: startTime,
        endTime: endTime,
        totalDistance: totalDistance,
        averageVelocity: averageVelocity,
        velocities: velocities
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getUserTrackData(userID: string): Promise<Array<{
    trackID: string,
    startTime: string,
    endTime: string,
    totalDistance: Number,
    averageVelocity: Number
  }>> {
    const tracks = await this.find({where: {userID: userID}});
    let tracksToReturn: Array<{
      trackID: string,
      startTime: string,
      endTime: string,
      totalDistance: Number,
      averageVelocity: Number
    }> = [];

    for (let i = 0; i < tracks.length; i++) {
      tracksToReturn.push({
        trackID: tracks[i].trackID,
        startTime: tracks[i].startTime,
        endTime: tracks[i].endTime,
        totalDistance: tracks[i].totalDistance,
        averageVelocity: tracks[i].averageVelocity
      })
    }

    return tracksToReturn;
  }

  async getVelocities(trackID: string): Promise<Array<{
    from: Number,
    to: Number,
    velocity: Number
  }> | null> {
    return (await this.findById(trackID)).velocities;
  }

  async genTID(): Promise<string> {
    const id = uid();
    return await this.checkTID(id) === false ? id : this.genTID();
  }

  async checkTID(id: string): Promise<TrackData | boolean> {
    try {
      return await this.findById(id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return false;
    }
    throw error;
    }
  }
}
