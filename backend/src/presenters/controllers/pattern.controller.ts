import { PaymentMethodENUM } from "@application/enums/payment-method.enum";
import { IPayment } from "@domain/payment.interface";
import { PatternType } from "@infra/types/pattern.type";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class PatternsController {
  constructor(
    @inject(PatternType.PaymentService)
    private readonly paymentService: IPayment
  ) {}
  factory(req: Request, res: Response) {
    const { method, status } = req.body;
    const isInvalidMethod = Object.values(PaymentMethodENUM).includes(method);
    if (!req.body || !isInvalidMethod) {
      res.status(400).json({
        error: "Method input Not Fount",
        allowed: PaymentMethodENUM,
      });
    }

    const message = this.paymentService.method(method, status);

    res.json({
      pattern: "Factory",
      method,
      paymentResponse: message,
    });
  }
}
