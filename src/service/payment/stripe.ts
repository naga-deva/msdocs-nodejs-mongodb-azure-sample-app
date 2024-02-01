import stripe from "@src/third-party/stripe";
import logger from "@src/helpers/logger";
import { ErrorMessageCode } from "@src/utilities";

export const createPaymentIntents = async (payload) => {
  console.log("Enter payment");
  try {
    const paymentLinkParams: any = {
      amount: payload.amount,
      currency: payload.currency,
      payment_method: payload.paymentMethod,
      payment_method_types: ['card'],
      confirm: false,
      automatic_payment_methods: {
        enabled: false,
      },
    };

    const response = await stripe.paymentIntents.create(paymentLinkParams).catch((error) => {
      console.log("PAAAAYMENT +", error)
      throw new Error(ErrorMessageCode.PAYMENT_INTENT_CREATION_FAILED);
    });

    if (!response?.id) {
      logger.error(
        `Error while creating ${"John"} payment intent for user PAYMENT_INTENT_CREATION_FAILED - No response.`,
      );
      throw new Error(ErrorMessageCode.PAYMENT_INTENT_CREATION_FAILED);
    }

    const _id = response.id;
    // const url = response.url;
    const client_secret = response.client_secret

    return { _id, client_secret };
  } catch (error) {
    logger.error(
      `Error while creating payment link
            Payment Intent: 
            Error:`,
      error,
    );
    throw error;
  }
};
