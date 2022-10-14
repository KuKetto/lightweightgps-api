import {SchemaObject} from '@loopback/rest';

const trackDataCreateSchema: SchemaObject = {
  type: 'object',
  required: ['userID', 'startTime', 'endTime', 'totalDistance', 'averageVelocity', 'velocities'],
  properties: {
    userID: {
        type: 'string',
    },
    startTime: {
        type: 'string',
    },
    endTime: {
        type: 'string',
    },
    totalDistance: {
        type: 'number'
    },
    averageVelocity: {
        type: 'number'
    },
    velocities: {
        type: 'array'
    }
  },
};

export const trackDataCreateRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: trackDataCreateSchema},
  },
};

const getUserTrackDataSchema: SchemaObject = {
    type: 'object',
    required: ['userID'],
    properties: {
      userID: {
          type: 'string',
      }
    },
  };
  
export const getUserTrackDataRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': {schema: getUserTrackDataSchema},
    },
};

const getTrackDataVelocitiesSchema: SchemaObject = {
    type: 'object',
    required: ['trackID'],
    properties: {
      trackID: {
          type: 'string',
      }
    },
  };
  
export const getTrackDataVelocitiesRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': {schema: getTrackDataVelocitiesSchema},
    },
};