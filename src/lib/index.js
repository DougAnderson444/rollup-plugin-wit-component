export const plugin = (modules) => ({
    name: "loader",
    resolveId(source) {
        if (modules.hasOwnProperty(source)) {
            return source
        }
    },
    load(id) {
        if (modules.hasOwnProperty(id)) {
            return modules[id]
        }
    },
})
