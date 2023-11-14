import { prisma } from "@/prisma/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

//eslint import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      values,
      userId,
    }: {
      values: {
        fullName: string;
        email: string;
        dob: string;
        contactNumber: string;
        newPassword: string;
      };
      userId: string;
    } = req.body;

    // Find the user by userId.
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);

    // Update the user's password with the new password.
    await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        password: bcrypt.hashSync(values.newPassword, salt),
      },
    });

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
      to: user.email,
      subject: `Password Updated`,
      html: `<div>Your password has been successfully updated.
      New Password: ${values.newPassword}
      </div>`,
    };

    await transporter.sendMail(mailData);
    res.status(200).send({ message: "Password updated successfully!" });

    await prisma.$disconnect();
  }
}
