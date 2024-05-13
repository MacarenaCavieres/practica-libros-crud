export const handleErrors = (error) => {
    if (error.code) {
        switch (error.code) {
            case "23502":
                return {
                    code: 400,
                    msg: "Campo obligatorio",
                };
            case "23505":
                return {
                    code: 400,
                    msg: "el registro ya existe",
                };
            case "22P02":
                return {
                    code: 400,
                    msg: "dato no compatible",
                };
            default:
                return {
                    code: 500,
                    msg: "Falló postgres",
                };
        }
    }
    return {
        code: 500,
        msg: "Error del servidor",
    };
};