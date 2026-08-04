export const authConfig = {
    session: {
        strategy: "jwt",
    },
    providers: [
            CredentialsProvider({
                name: "Credentials",
                credentials: {
                    email: {},
                    password: {},
                }
            })
            ],
}