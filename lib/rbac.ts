export type Role = "lender" | "partner" | "counsel" | "admin";

export const ROLES: Role[] = ["lender", "partner", "counsel", "admin"];

export function hasRole(userRoles: Role[] | undefined, required: Role | Role[]): boolean {
  if (!userRoles || userRoles.length === 0) return false;
  const req = Array.isArray(required) ? required : [required];
  return req.some((r) => userRoles.includes(r));
}

export function requireRole(userRoles: Role[] | undefined, required: Role | Role[]): void {
  if (!hasRole(userRoles, required)) {
    const needed = Array.isArray(required) ? required.join(", ") : required;
    throw Object.assign(new Error(`Forbidden: requires role ${needed}`), { status: 403 });
  }
}
