import Form from "../models/Form";
import formData from "../data/forms";

export class Forms {
  async findById(id: number): Promise<Form | null> {
    const raw = formData.find((form: any) => form.id === id);

    return raw ? new Form(raw) : null;
  }
}
