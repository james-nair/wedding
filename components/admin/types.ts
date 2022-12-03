export const category = ["Friend", "Family", "Others"];
export type Category = typeof category[number];

export const invitedBy = ["Bride", "Groom", "Both"];
export type InvitedBy = typeof invitedBy[number];

export class Guest {
  name: string = "";
  url: string = "";
  partyOf: number = 1;
  side: InvitedBy = "Bride";
  type: Category = "Others";
}
