import {service} from "@/service/baseService";
import {globalConfig} from "@/config/config";

export const loginService = data => {
    return service.post(
        globalConfig.request.serve_url.auth.login,
        data
    );
}