import {service} from "@/service/baseService";
import {globalConfig} from "@/config/config";

export const registerService = data => {
    return service.post(
        globalConfig.request.serve_url.auth.register,
        data);
};
