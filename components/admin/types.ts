export const category = ["Friend", "Family", "Others"];
export type Category = typeof category[number];

export const invitedBy = ["Bride", "Groom", "Both"];
export type InvitedBy = typeof invitedBy[number];

export class Guest {
  name: string = "";
  url: string = "";
  estimated: number = 1;
  partyOf: number = 1;
  side: InvitedBy = "Bride";
  type: Category = "Others";
  confirmed: boolean = false;
  going: boolean = false;

  constructor(guest?: Guest) {
    if (guest) {
      this.name = guest.name;
      this.url = guest.url;
      this.estimated = guest.estimated;
      this.partyOf = guest.partyOf;
      this.side = guest.side;
      this.type = guest.type;
      this.confirmed = guest.confirmed;
      this.going = guest.going;
    }
  }
}
