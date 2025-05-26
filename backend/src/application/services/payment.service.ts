import { PaymentMethodENUM } from "@application/enums/payment-method.enum";
import { IPayment } from "@domain/payment.interface";
import { injectable } from "inversify";

export interface PaymentDTO {
    status: string, message: string
}

@injectable()
export class PaymentService implements IPayment{
    method(method: PaymentMethodENUM, statusPayment: string): PaymentDTO {
        const paymentFactory = {
            [PaymentMethodENUM.CREDIT_CARD]: new CreditCardPay(),
            [PaymentMethodENUM.PIX]: new PixPay(),
            [PaymentMethodENUM.DEBIT_CARD]: new DebitCardPay(),
        }

        const selectPaymentMethod = paymentFactory[method];

        if(!selectPaymentMethod){
            throw new Error("Payment Not Found")
        }

        const status = this.sendMessageApprovePayment(statusPayment)

        return selectPaymentMethod.executePayment(status)
    }

    sendMessageApprovePayment(status: string){
        return status === 'success' ? "Pagamento Aprovado" : "Pagamento Reprovado"
    }
}

class CreditCardPay{
    // todos os metodos para validar o pagamento por cartão de credito
    executePayment(status: string){
        return {
            message: "Pagamento com Cartão de Crédito realizado.", 
            status
        }
    }
}

class DebitCardPay{
    executePayment(status: string){
        return {
            message: "Pagamento com Cartão de Debito realizado.", 
            status
        }
    }
}

class PixPay{
    executePayment(status: string){
         return {
            message: "Pagamento com Pix realizado.", 
            status
        }
    }
}