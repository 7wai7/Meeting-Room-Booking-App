export type MeetingRoomInput = {
  title: string;
  description: string;
};

export type MeetingRoom = {
  id: string;
} & MeetingRoomInput;
