const channels = [{
  id: '1',
  name: 'soccer',
}, {
  id: '2',
  name: 'baseball',
}];
let nextId = 3;

const messages = [{
  id: '1',
  channelId: '1',
  text: 'soccer is awesome',
}, {
  id: '2',
  channelId: '1',
  text: 'hello soccer world',
}, {
  id: '3',
  channelId: '2',
  text: 'baseball is life',
}, {
  id: '4',
  channelId: '2',
  text: 'hello baseball world series',
}];
let nextMessageId = 5;

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId++), name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
  },
};
