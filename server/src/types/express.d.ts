declare global {
  namespace Express {
    interface Request {
      clientType: "web" | "mobile";
      deviceId: string;
      auth?: {
        userId: string;
        role?: string;
      };
      id: string;
    }
  }
}

export {};
