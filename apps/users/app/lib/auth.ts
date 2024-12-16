import CredentialsProvider from "../../../../node_modules/next-auth/providers/credentials";
import db from "@repo/db/client";

export const authOptions = {
    providers: [
        CredentialsProvider ({
            name: "Credentials",
            credentials: {
                email : {label: "Email", type: "text", placeholder: "abc@xyz.com", required: true},
                password: {label: "Password", type: "password", required: true}
            },
            async authorize(credentials: any) {
                const existingUser = await db.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                })


                if(existingUser){
                    const isSameUser = credentials.password == existingUser.password
                    if(isSameUser){
                        return {
                            id: existingUser.id.toString(),
                            email: existingUser.email,
                            name: existingUser?.name || ""
                        }
                    }
                    return null
                }

                try {
                    const user = await db.user.create({
                        data: {
                            email: credentials.email,
                            password: credentials.password
                        }
                    })

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
                }catch(e){
                    console.error("error-->", e)
                }

                return null
            }
        })
        
    ],
    secret: process.env.JWT_SECRET || "secret"
}