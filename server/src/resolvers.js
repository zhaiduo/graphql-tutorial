const channels = [{
  id: 1,
  name: 'Channel 1',
}, {
  id: 2,
  name: 'Channel 2',
}];


export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
  },
};
