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
  text: 'baseball is awesome',
}, {
  id: '4',
  channelId: '2',
  text: 'hello baseball world',
}];
let nextMessageId = 5;

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    messages: (root, { channelId }) => {
      if(!channels.find(channel => channel.id === channelId))
        return null;

      return messages.filter(message => message.channelId === channelId);
    },
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId++), name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, args) => {
      if(!channels.find(channel => channel.id === args.input.channelId))
        throw new Error("Channel does not exist");

      const newMessage = { id: String(nextMessageId++), channelId: args.input.channelId, text: args.input.text };
      messages.push(newMessage);
      return newMessage;
    },
  },
};
