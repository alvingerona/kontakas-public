import Organization from "../models/Organization";
import organizationsData from "../data/organizations";

export class Organizations {
  async findById(id: number): Promise<Organization | null> {
    const organizations = organizationsData;
    const rawOrg = organizations.find((org: any) => org.id === id);

    return rawOrg ? new Organization(rawOrg) : null;
  }
}
