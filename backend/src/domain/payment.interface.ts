import { PaymentMethodENUM } from "@application/enums/payment-method.enum";

export interface IPayment {
  method(method: PaymentMethodENUM, status: string): {status: string, message: string};
}
