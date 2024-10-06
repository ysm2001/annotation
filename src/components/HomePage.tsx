import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";

export const HomePage = () => (
  <div className="w-full">
    <div className="bg-slate-800  h-screen">
      <div className="flex items-center justify-center h-screen  w-9/12 mx-auto">
        <div className="text-white">
          <h1 className="text-white p-4 text-4xl text-center">Welcome</h1>
          <h1 className="text-white text-4xl text-center">
            Crowd-Sourced Online Data Annotation Platform
          </h1>

          <div className="grid grid-cols-2 mt-10 gap-16">
            <div>
              <h2 className="text-center text-2xl">Annotator</h2>
              <p className="mb-5">
                If you have enough spare time, good computer skills and love new
                things <br />
                We have <br />• A variety of massive high-paying tasks waiting
                for you to challenge <br />• A team of like-minded guilds will
                help you grow
              </p>
              <div className="text-center">
                <Button variant="contained">
                  <Link
                    className="text-yellow-500  p-1 text-center"
                    to="/login"
                  >
                    Request an annotator account
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <h2 className="text-center text-2xl">Academic user</h2>
              <p className="mb-5">
                If you are looking for crowd-sourced data delivery solutions
                <br />
                We have
                <br />• Industry/professional solutions covering multiple
                application scenarios
                <br />• Hundreds of millions of massive data such as text,
                images, audio
              </p>
              <div className="text-center">
                <Button variant="contained">
                  <Link
                    className="text-yellow-500  p-1 text-center"
                    to="/login"
                  >
                    Create an academic user account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-40">
            <p className="mt-6">
              Focus on providing data annotation for products in the field of
              artificial intelligence
            </p>
            <p>
              You can use your spare time to earn a lot of money by doing
              crowd-sourced tasks • You can find the most professional
              annotators, reviewers
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
