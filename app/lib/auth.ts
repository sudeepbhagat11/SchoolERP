// import db from "@/db/index";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import { SignJWT, importJWK } from "jose";

// const generateJWT = async (payload) => {
//   const secret = process.env.JWT_SECRET || "secret";
//   const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("365d")
//     .sign(jwk);
// };

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "email", type: "text", placeholder: "" },
//         password: { label: "password", type: "password", placeholder: "" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           return null;
//         }

//         const hashedPassword = await bcrypt.hash(credentials.password, 10);

//         const userDb = await db.user.findFirst({
//           where: { email: credentials.username },
//           select: { password: true, id: true, name: true },
//         });

//         if (userDb) {
//           const isValid = await bcrypt.compare(credentials.password, userDb.password);
//           if (isValid) {
//             const jwt = await generateJWT({ id: userDb.id });

//             return {
//               id: userDb.id,
//               name: userDb.name,
//               email: credentials.username,
//               token: jwt,
//             };
//           }
//           return null;
//         }

//         try {
//           if (credentials.username.length < 3 || credentials.password.length < 3) {
//             return null;
//           }

//           const user = await db.user.create({
//             data: {
//               email: credentials.username,
//               name: credentials.username,
//               password: hashedPassword,
//             },
//           });

//           const jwt = await generateJWT({ id: user.id });

//           return {
//             id: user.id,
//             name: credentials.username,
//             email: credentials.username,
//             token: jwt,
//           };
//         } catch {
//           return null;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET || "secr3t",
//   callbacks: {
//     session: async ({ session, token }) => {
//       if (session?.user && token?.uid) {
//         session.user.id = token.uid;
//         session.user.jwtToken = token.jwtToken;
//       }
//       return session;
//     },
//     jwt: async ({ token, user }) => {
//       if (user) {
//         token.uid = user.id;
//         token.jwtToken = user.token;
//       }
//       return token;
//     },
//   },
// };


import db from "@/db/index";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { SignJWT, importJWK } from "jose";

const generateJWT = async (payload: any) => {
  const secret = process.env.JWT_SECRET || "secret";
  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk);
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
        role: { label: "role", type: "text", placeholder: "" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password || !credentials?.role) {
          return null;
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const userDb = await db.user.findFirst({
          where: {
            email: credentials.username,
          },
          select: {
            id: true,
            name: true,
            password: true,
            role: true,
          },
        });

        if (userDb) {
          const isValid = await bcrypt.compare(credentials.password, userDb.password);
          if (isValid && userDb.role === credentials.role) {
            const jwt = await generateJWT({ id: userDb.id, role: userDb.role });

            return {
              id: userDb.id,
              name: userDb.name,
              email: credentials.username,
              token: jwt,
              role: userDb.role,
            };
          }
          return null;
        }

        // Register new user if not found
        try {
          if (credentials.username.length < 3 || credentials.password.length < 3) {
            return null;
          }

          const user = await db.user.create({
            data: {
              email: credentials.username,
              name: credentials.username,
              password: hashedPassword,
              role: credentials.role,
            },
          });

          const jwt = await generateJWT({ id: user.id, role: user.role });

          return {
            id: user.id,
            name: credentials.username,
            email: credentials.username,
            token: jwt,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.uid) {
        session.user.id = token.uid;
        session.user.jwtToken = token.jwtToken;
        session.user.role = token.role;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
        token.jwtToken = user.token;
        token.role = user.role;
      }
      return token;
    },
  },
};
