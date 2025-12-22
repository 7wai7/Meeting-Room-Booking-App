export type MeetingRoomInput = {
  title: string;
  description: string;
};

export type MeetingRoom = {
  id: string;
  bookingsCount?: number;
} & MeetingRoomInput;

export type UpdateMeetingRoomInput = Partial<MeetingRoomInput>;
