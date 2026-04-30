/* eslint-disable @typescript-eslint/no-unused-vars */
export type Profile = {
  id?: string;
  emails?: Array<{ value: string }>;
  name?: { givenName?: string; familyName?: string };
};

export type VerifyCallback = (error: unknown, user?: unknown, info?: unknown) => void;

export class Strategy {
  constructor(..._args: unknown[]) {}
}
