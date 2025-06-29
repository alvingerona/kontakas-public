import { OrganizationEntity } from "../types/entities/OrganizationEntity";

export default class Organization {
  id: number;
  name: string;
  adminEmail: string;

  constructor({ id, name, adminEmail }: OrganizationEntity) {
    this.id = id;
    this.name = name;
    this.adminEmail = adminEmail;
  }
}
