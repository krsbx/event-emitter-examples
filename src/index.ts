import EventEmitter from './EventEmitter';

const users = [
  {
    userId: 1,
    username: 'KRSBX',
    isActive: false,
    isOnline: true,
  },
  {
    userId: 2,
    username: 'Games321',
    isActive: true,
    isOnline: false,
  },
];

const eventEmitter = new EventEmitter();

function onActiveChange({
  isActive,
  userId,
}: {
  isActive: boolean;
  userId: number;
}) {
  const index = users.findIndex((user) => user.userId === userId);

  if (index === -1) return;

  users[index].isActive = isActive;

  console.table(users);
}

function onOnlineChange({
  isOnline,
  userId,
}: {
  isOnline: boolean;
  userId: number;
}) {
  const index = users.findIndex((user) => user.userId === userId);

  if (index === -1) return;

  users[index].isOnline = isOnline;

  console.table(users);
}

eventEmitter.on('user:isActive', onActiveChange);

eventEmitter.on('user:isOnline', onOnlineChange);

eventEmitter.emit('user:isActive', {
  isActive: true,
  userId: 1,
});

eventEmitter.emit('user:isActive', {
  isActive: false,
  userId: 2,
});

eventEmitter.emit('user:isOnline', {
  isOnline: true,
  userId: 2,
});

eventEmitter.emit('user:isOnline', {
  isOnline: false,
  userId: 1,
});

eventEmitter.removeListener('user:isOnline', onOnlineChange);

eventEmitter.removeListener('user:isOnline', onOnlineChange);

eventEmitter.emit('user:isOnline', {
  isOnline: true,
  userId: 1,
});
