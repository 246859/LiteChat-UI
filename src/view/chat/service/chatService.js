import {service} from "@/service/baseService";
import {globalConfig} from "@/config/config";

export const logoutService = () => {
    return service.delete(
        globalConfig.request.serve_url.auth.logout
    )
}