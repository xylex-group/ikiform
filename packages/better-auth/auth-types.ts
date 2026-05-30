// Type helper for Better Auth session with organization plugin
export type SessionWithOrganization = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  activeOrganizationId?: string | null;
};

/** Better Auth user table shape (session.user) */
export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  emailVerified: boolean;
  image?: string | null;
  role?: string | null;
  username?: string | null;
  displayUsername?: string | null;
};

export type AuthSession = {
  session: SessionWithOrganization;
  user: AuthUser;
};
