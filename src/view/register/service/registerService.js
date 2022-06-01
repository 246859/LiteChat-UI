import {service} from "@/service/baseService";

export const registerService = data => {
    return service.post(
        "/auth/register",
        data);
};
