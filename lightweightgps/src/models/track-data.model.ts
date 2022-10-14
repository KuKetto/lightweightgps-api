import {Entity, model, property} from '@loopback/repository';

@model()
export class TrackData extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  trackID: string;

  @property({
    type: 'string',
    required: true,
  })
  userID: string;

  @property({
    type: 'string',
    required: true,
  })
  startTime: string;

  @property({
    type: 'string',
    required: true,
  })
  endTime: string;

  @property({
    type: 'number',
    required: true,
  })
  totalDistance: Number;

  @property({
    type: 'number',
    required: true,
  })
  averageVelocity: Number;

  @property({
    type: 'array',
    required: true,
    itemType: 'object'
  })
  velocities: Array<{
    from: Number,
    to: Number,
    velocity: Number
  }>;


  constructor(data?: Partial<TrackData>) {
    super(data);
  }
}

export interface TrackDataRelations {
  // describe navigational properties here
}

export type TrackDataWithRelations = TrackData & TrackDataRelations;
