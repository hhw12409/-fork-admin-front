import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import * as Sentry from "@sentry/react";

export const signup = createAsyncThunk<
  { token: string; name: string; email: string } | undefined,
  { email: string; password: string; name: string }
>("user/signup", async (data, thunkAPI) => {
  try {
    // const errPercent = Math.floor(Math.random() * 10000) < 10
    // if (errPercent) {
    //   const err = {
    //     response: {
    //       data: {
    //         message: "그냥 에러"
    //       }
    //     }
    //   }
    //   throw err
    // }
    const response = {
      state: 200,
      data: {
        ok: true,
      },
    };
    // const response = await userApi.signup(data);
    if (response.state === 200) {
      return {
        token: "123123123",
        name: "ssul",
        email: "ssul@perfume.com",
      };
    } else {
      const err = {
        response: {
          data: {
            message: "200 아님",
          },
        },
      };
      throw err;
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (!err.response) {
      Sentry.captureException(`error, 회원가입 통신 : ${err}`);
    } else {
      Sentry.captureException(`error, 회원가입 통신 : ${err}`);
    }
    Swal.fire("에러", "회원가입에 실패하였습니다. 다시 시도해주세요!", "error");
  }
});
