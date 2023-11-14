import { prisma } from "@/prisma/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import nodemailer from "nodemailer";
//eslint import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userInfo: User = req.body.values;
    const salt = bcrypt.genSaltSync(10);
    const userDetails = {
      email: userInfo.email,
      fullName: userInfo.fullName,
      password: bcrypt.hashSync(`${userInfo.fullName}2023`, salt),
      role: "staff",
      image: "",
    };

    const transporter = nodemailer.createTransport({
      port: 465,
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });
    const mailData = {
      from: process.env.SMTP_USER,
      to: userDetails.email,
      subject: `New Account`,
      html: `<div>
        This is an automated reply from BBCS System. Please do not reply.
        You are receiving this email because your email was just registered to an account on BBCS-System.
        Login to the system portal through <a href="${process.env.NEXTAUTH_URL}">link</a>.
        <div>Temporary Password Credential
            <div>${userInfo.fullName}2023</div>
        </div>
    <div>`,
    };

    const checkEmail = await prisma.user.findFirst({
      where: {
        email: userDetails.email,
        deletedAt: null,
      },
    });

    if (checkEmail) {
      res.status(409).send({ message: "Email already exist" });
    } else {
      await prisma.user.create({
        data: {
          ...userDetails,
        },
      });
    }
    await transporter.sendMail(mailData);
    res.status(200).send({ message: "Success!" });

    await prisma.$disconnect();
  }
}
