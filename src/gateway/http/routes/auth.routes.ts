import {IAuthController} from "@ports";
import {Router} from "../router";
import {CONFIG} from "@config";

export class AuthRoutes {
    static RegisterRoutes(authController: IAuthController, router: Router, cfg: CONFIG): Router {

        const expressRouter = router.getRouter();

        expressRouter.get<string, any, string>("/", authController.verifyToken);

        expressRouter.post("/sms-verification", authController.smsVerification);

        return router;
    }
}