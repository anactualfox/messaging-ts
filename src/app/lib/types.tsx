export type Message = {
  userId: number;
  username: string;
  content: string;
  timestamp: Date;
};

export type User = {
  username: string;
  userId: number;
};

export type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};
