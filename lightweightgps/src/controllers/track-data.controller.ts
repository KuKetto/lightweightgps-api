import { authenticate, TokenService } from '@loopback/authentication';
import { MyUserService, TokenServiceBindings, UserServiceBindings } from '@loopback/authentication-jwt';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {inject} from '@loopback/core';
import { repository } from '@loopback/repository';
import { UserDataRepository } from '../repositories/user-data.repository';
import { TrackDataRepository } from '../repositories';
import { get, param, post, requestBody } from '@loopback/rest';
import { trackDataCreateRequestBody } from '../requestSchemas/track-data';
import { TrackData, UserData } from '../models';


export class TrackDataController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserDataRepository) public userDataRepository: UserDataRepository,
    @repository(TrackDataRepository) public trackDataRepository: TrackDataRepository
  ) {}

  @authenticate('jwt')
  @post('/track', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              type: 'boolean',
            },
          },
        },
      },
    },
  })
  async createTrackData(
    @requestBody(trackDataCreateRequestBody) trackData: {'userID': string, 'startTime': string,
     'endTime': string, 'totalDistance': number, 'averageVelocity': number, 'velocities': Array<{
      from: Number,
      to: Number,
      velocity: Number
    }>},
  ): Promise<boolean> {
    return this.trackDataRepository.addTrackData(trackData.userID, trackData.startTime, trackData.endTime,
      trackData.totalDistance, trackData.averageVelocity, trackData.velocities);
  }

  @authenticate('jwt')
  @get('/track/{user}', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'array',
            },
          },
        },
      },
    },
  })
  async getUserTrackData(
    @param.path.string('user') user: typeof UserData.prototype.userID
  ): Promise<Array<{
    trackID: string,
    startTime: string,
    endTime: string,
    totalDistance: Number,
    averageVelocity: Number
  }>> {
    return this.trackDataRepository.getUserTrackData(user);
  }

  @authenticate('jwt')
  @get('/track/data/{trackID}', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'array',
            },
          },
        },
      },
    },
  })
  async getTrackDataVelocities(
    @param.path.string('trackID') trackID: typeof TrackData.prototype.trackID
  ): Promise<Array<{
    from: Number,
    to: Number,
    velocity: Number
  }> | null> {
    return this.trackDataRepository.getVelocities(trackID);
  }
}
