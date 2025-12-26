import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      fullName: string;
      email: string;
      phone: string;
    };
  }
}
