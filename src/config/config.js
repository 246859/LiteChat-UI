export const globalConfig = {
    request: {
        base_url: "/api",
        serve_url: {
            dev: "http://localhost:8088",
            pro: "",
            auth: {
                login: "/auth/login",
                register: "/auth/register",
                logout: "/auth/logout"
            }
        }
    },
    tokenAddress: "94a2776e7bd6f611462bc4344e17773c65fc4c486401643b724d102a8936dff4",
}