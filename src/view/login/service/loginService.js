import {service} from "@/service/baseService";

export const loginService = data => {
    return service.post(
        "/auth/login",
        data
    );
}