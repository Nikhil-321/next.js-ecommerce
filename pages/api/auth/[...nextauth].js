import NextAuth from "next-auth";
import User from "../../../models/userModel";
import db from "../../../utils/connect";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },

    async session({ session, token }) {
      if (token.id) session.id = token.id;
      if (token.isAdmin) session.isAdmin = token.isAdmin;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("credentials", credentials);
        await db.connect();
        const user = await User.findOne({ email: credentials.email });
        console.log("user", user);
        await db.disconnect();

        if (user && credentials.password === user.password) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
});
